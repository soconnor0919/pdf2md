import { type PDFPageProxy } from 'pdfjs-dist';
import { createWorker } from 'tesseract.js';
import { createCanvas } from 'canvas';

export async function performOcrOnPage(page: PDFPageProxy): Promise<string> {
    try {
        const viewport = page.getViewport({ scale: 2.0 }); // Scale up for better OCR accuracy
        const canvas = createCanvas(viewport.width, viewport.height);
        const context = canvas.getContext('2d');

        // Render PDF page to canvas
        await page.render({
            canvasContext: context as any, // Type mismatch between node-canvas and DOM canvas
            viewport: viewport,
        }).promise;

        // Convert canvas to image buffer
        const buffer = canvas.toBuffer('image/png');

        // Perform OCR
        const worker = await createWorker('eng');
        const ret = await worker.recognize(buffer);
        const text = ret.data.text;
        await worker.terminate();

        return text;
    } catch (error) {
        console.error('OCR failed for page:', error);
        return '';
    }
}
