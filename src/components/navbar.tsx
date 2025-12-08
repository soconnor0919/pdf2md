import Link from "next/link";
import { FileText, Github } from "lucide-react";
import { Button } from "./ui/button";

export function Navbar() {
    return (
        <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
            <nav className="flex items-center justify-between w-full max-w-4xl px-4 py-2 bg-background/80 backdrop-blur-md border border-border/50 rounded-full shadow-lg">
                <Link href="/" className="flex items-center gap-2 px-2 hover:opacity-80 transition-opacity">
                    <FileText className="w-5 h-5 text-primary" />
                    <span className="font-semibold tracking-tight">PDF2MD</span>
                </Link>
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" asChild className="rounded-full">
                        <Link href="https://github.com/soconnor0919/pdf2md" target="_blank" rel="noopener noreferrer">
                            <Github className="w-5 h-5" />
                            <span className="sr-only">GitHub</span>
                        </Link>
                    </Button>
                </div>
            </nav>
        </div>
    );
}
