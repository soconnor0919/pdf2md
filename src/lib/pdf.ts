
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';
import path from 'path';

if (typeof window === 'undefined') {
    // In Node.js, we need to point to the worker file on the filesystem
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
    (pdfjsLib.GlobalWorkerOptions as any).workerSrc = path.join(process.cwd(), 'node_modules/pdfjs-dist/legacy/build/pdf.worker.mjs');
}

interface TextItem {
    str: string;
    dir?: string;
    transform: number[]; // [scaleX, skewY, skewX, scaleY, x, y]
    width?: number;
    height?: number;
    fontName?: string;
    hasEOL?: boolean;
}

export async function extractTextFromPdf(buffer: Buffer): Promise<string> {
    const data = new Uint8Array(buffer);

    try {
        const loadingTask = pdfjsLib.getDocument({
            data,
            useSystemFonts: true,
            verbosity: 0,
        });

        const pdfDocument = await loadingTask.promise;
        const numPages = pdfDocument.numPages;
        let fullText = '';

        for (let i = 1; i <= numPages; i++) {
            const page = await pdfDocument.getPage(i);
            const textContent = await page.getTextContent();

            // First pass: Analyze font sizes to heuristically detect body text vs headers
            const heightMap = new Map<number, number>();
            const items = textContent.items as unknown as TextItem[];

            // Filter empty items
            const contentItems = items.filter(item => item.str.trim().length > 0);

            if (contentItems.length === 0) continue;

            for (const item of contentItems) {
                // Approximate height from transform matrix (scaleY is index 3) or height prop
                // item.height might be 0 in some pdf modes, use transform[3] which is usually font point size
                const height = Math.abs(item.transform[3] ?? 0);
                const roundedHeight = Math.round(height * 10) / 10;
                heightMap.set(roundedHeight, (heightMap.get(roundedHeight) || 0) + item.str.length);
            }

            // Find the most common height -> assume this is body text
            let bodyHeight = 0;
            let maxCount = 0;
            for (const [height, count] of heightMap.entries()) {
                if (count > maxCount) {
                    maxCount = count;
                    bodyHeight = height;
                }
            }

            let lastY: number | null = null;
            let pageMarkdown = '';

            // Sort items by Y (descending) then X (ascending) to ensure reading order 
            // TextContent usually gives them in order but sometimes not
            contentItems.sort((a, b) => {
                const yA = a.transform[5] ?? 0;
                const yB = b.transform[5] ?? 0;
                if (Math.abs(yA - yB) > 5) { // Threshold for same line
                    return yB - yA; // Top to bottom
                }
                const xA = a.transform[4] ?? 0;
                const xB = b.transform[4] ?? 0;
                return xA - xB; // Left to right
            });

            for (const item of contentItems) {
                const currentY = item.transform[5] ?? 0;
                const currentHeight = Math.abs(item.transform[3] ?? 0);
                const txt = item.str;

                // Logic for new line / paragraph
                if (lastY !== null) {
                    const diffY = lastY - currentY;
                    if (diffY > currentHeight * 1.5) {
                        // New paragraph
                        pageMarkdown += '\n\n';
                    } else if (diffY > currentHeight * 0.5) {
                        // potential new line in same block, but if we are converting to markdown
                        // we usually want text to flow. 
                        // Check if the previous line ended with a hyphen or if it's a list.
                        pageMarkdown += ' ';
                    } else {
                        // Same line (or super close)
                        // Check gap for space
                    }
                }

                // Logic for Headers
                // If significantly larger than body text
                if (currentHeight > bodyHeight * 1.5) {
                    pageMarkdown += '\n# ' + txt; // H1
                } else if (currentHeight > bodyHeight * 1.2) {
                    pageMarkdown += '\n## ' + txt; // H2
                } else {
                    // Body text
                    // Check if it starts with bullet like characters
                    if (/^[•\-\*]\s/.test(txt)) {
                        pageMarkdown += '\n- ' + txt.replace(/^[•\-\*]\s/, '');
                    } else {
                        pageMarkdown += txt;
                    }
                }

                lastY = currentY;
            }

            // Clean up: collapse multiple newlines, fix hyphenation if we joined lines
            // (Simple cleanup)
            pageMarkdown = pageMarkdown.replace(/\n{3,}/g, '\n\n');

            fullText += `\n\n${pageMarkdown}\n\n`;
        }

        return fullText.trim();
    } catch (error) {
        console.error("Internal PDF extraction error:", error);
        throw error;
    }
}
