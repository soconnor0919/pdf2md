import { UploadForm } from "~/components/upload-form";
import { Navbar } from "~/components/navbar";

export default function HomePage() {
  return (
    <main className="relative min-h-screen w-full bg-background selection:bg-primary/10">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-black bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] dark:bg-[radial-gradient(#ffffff33_1px,transparent_1px)]" />
      
      <Navbar />
      
      <div className="container mx-auto px-4 pt-32 pb-12">
        <div className="flex flex-col items-center justify-center gap-12">
          <div className="text-center space-y-6 max-w-3xl">
              <h1 className="text-5xl font-extrabold tracking-tight lg:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 to-neutral-500 dark:from-neutral-100 dark:to-neutral-400">
                  PDF to Markdown
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                  Start extracting content from your documents in seconds. <br className="hidden sm:inline" />
                  Simply upload your PDF and get clean, formatted Markdown instantly.
              </p>
          </div>
          
          <div className="w-full max-w-4xl mt-8">
              <UploadForm />
          </div>
        </div>
      </div>
    </main>
  );
}