'use server';

import { extractTextFromPdf } from '~/lib/pdf';

export async function convertPdf(formData: FormData): Promise<{ success: boolean; data?: string; error?: string }> {
    try {
        const file = formData.get('file') as File;
        if (!file) {
            return { success: false, error: 'No file uploaded' };
        }

        if (file.type !== 'application/pdf') {
            return { success: false, error: 'Invalid file type. Please upload a PDF.' };
        }

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const markdown = await extractTextFromPdf(buffer);
        return { success: true, data: markdown };
    } catch (error) {
        console.error('PDF Conversion failed:', error);
        return { success: false, error: 'Failed to process PDF' };
    }
}
