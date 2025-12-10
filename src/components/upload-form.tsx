'use client';

import { useState } from 'react';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '~/components/ui/card';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Textarea } from '~/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '~/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';
import { convertPdf } from '~/app/actions';
import { Loader2, Upload, FileText, File as FileIcon, X, Check, Clipboard, Sparkles, RotateCcw } from 'lucide-react';

export function UploadForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [markdown, setMarkdown] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<string>('upload');
    const [fileName, setFileName] = useState<string | null>(null);
    const [isCopied, setIsCopied] = useState(false);

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true);
        setError(null);
        setMarkdown('');

        const formData = new FormData(event.currentTarget);

        try {
            const result = await convertPdf(formData);
            if (result.success && result.data) {
                setMarkdown(result.data);
                setActiveTab('output');
            } else {
                setError(result.error ?? 'An unknown error occurred');
            }
        } catch {
            setError('Failed to communicate with the server');
        } finally {
            setIsLoading(false);
        }
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setFileName(file.name);
        } else {
            setFileName(null);
        }
    };

    const clearFile = () => {
        setFileName(null);
        // Reset the input value if needed, but since it's uncontrolled effectively in the form submission it's tricky.
        // For a controlled input we'd need a ref. 
        // For now just clearing visual state is enough if the user re-selects.
        // Actually, to properly clear we should reset the form or input.
        // Let's just keep it simple: showing the name. logic to clear requires ref.
        const input = document.getElementById('file') as HTMLInputElement;
        if (input) input.value = '';
    };

    return (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-2xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 mb-4 h-auto p-1 bg-background/80 backdrop-blur-md border border-border/50 shadow-sm rounded-full">
                <TabsTrigger
                    value="upload"
                    className="flex items-center gap-2 rounded-full data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-none py-2.5 transition-all"
                >
                    <Upload className="w-4 h-4" /> Upload
                </TabsTrigger>
                <TabsTrigger
                    value="output"
                    disabled={!markdown}
                    className="flex items-center gap-2 rounded-full data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-none py-2.5 transition-all"
                >
                    <FileText className="w-4 h-4" /> Output
                </TabsTrigger>
            </TabsList>

            <TabsContent value="upload">
                <Card className="bg-background/60 backdrop-blur-xl border-border/50 shadow-sm rounded-3xl">
                    <CardHeader>
                        <CardTitle>Upload PDF</CardTitle>
                        <CardDescription>Select a PDF file to convert to Markdown</CardDescription>
                    </CardHeader>
                    <form onSubmit={onSubmit}>
                        <CardContent className="grid w-full items-center gap-4 p-6">
                            <div className="flex flex-col space-y-4">
                                {!fileName ? (
                                    <Label htmlFor="file" className="text-center cursor-pointer border-2 border-dashed border-muted-foreground/25 rounded-xl p-8 hover:bg-muted/50 transition-colors flex flex-col items-center gap-4">
                                        <div className="p-4 rounded-full bg-primary/10 text-primary">
                                            <Upload className="w-8 h-8" />
                                        </div>
                                        <div className="space-y-1 text-center">
                                            <span className="font-medium">Click to upload</span> or drag and drop
                                            <span className="block text-xs text-muted-foreground">PDF files only</span>
                                        </div>
                                    </Label>
                                ) : (
                                    <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/20">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 rounded-full bg-primary/10 text-primary">
                                                <FileIcon className="w-5 h-5" />
                                            </div>
                                            <span className="font-medium truncate max-w-[200px] sm:max-w-md">{fileName}</span>
                                        </div>
                                        <Button type="button" variant="ghost" size="icon" onClick={clearFile} aria-label="Remove file" className="rounded-full">
                                            <X className="w-4 h-4" />
                                        </Button>
                                    </div>
                                )}
                                <Input
                                    id="file"
                                    name="file"
                                    type="file"
                                    accept="application/pdf"
                                    required
                                    className="hidden"
                                    onChange={handleFileChange}
                                />
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-end">
                            <Button
                                type="submit"
                                variant="outline"
                                disabled={isLoading || !fileName}
                                className="w-full sm:w-auto rounded-xl border-2 hover:bg-muted/50"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Converting...
                                    </>
                                ) : (
                                    <>
                                        <Sparkles className="mr-2 h-4 w-4" />
                                        Convert to Markdown
                                    </>
                                )}
                            </Button>
                        </CardFooter>
                    </form>
                </Card>

                {error && (
                    <Alert variant="destructive" className="mt-6">
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}
            </TabsContent>

            <TabsContent value="output">
                <Card className="h-full bg-background/60 backdrop-blur-xl border-border/50 shadow-sm rounded-3xl">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle>Markdown Output</CardTitle>
                        <Button variant="outline" size="sm" onClick={() => {
                            void navigator.clipboard.writeText(markdown);
                            setIsCopied(true);
                            setTimeout(() => setIsCopied(false), 2000);
                        }} className="min-w-[40px] rounded-xl">
                            {isCopied ? <Check className="w-4 h-4" /> : <Clipboard className="w-4 h-4" />}
                            {!isCopied && <span className="ml-2">Copy</span>}
                        </Button>
                    </CardHeader>
                    <CardContent className="pt-4">
                        <Textarea
                            className="min-h-[500px] font-mono text-sm leading-relaxed resize-none p-4"
                            value={markdown}
                            readOnly
                        />
                    </CardContent>
                    <CardFooter>
                        <Button
                            variant="outline"
                            onClick={() => {
                                setActiveTab('upload');
                                setFileName(null);
                                // Optional: clear file input if we verified it works above
                                const input = document.getElementById('file') as HTMLInputElement;
                                if (input) input.value = '';
                            }}
                            className="w-full rounded-xl border-2 hover:bg-muted/50"
                        >
                            <RotateCcw className="mr-2 h-4 w-4" />
                            Convert another file
                        </Button>
                    </CardFooter>
                </Card>
            </TabsContent>
        </Tabs>
    );
}
