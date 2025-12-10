import { UploadForm } from "~/components/upload-form";
import { Navbar } from "~/components/navbar";

export default function HomePage() {
  return (
    <main className="relative min-h-screen w-full bg-background selection:bg-primary/10">
      {/* Background Pattern */}
      {/* Background Pattern */}
      <div className="fixed inset-0 -z-10 h-full w-full bg-white dark:bg-neutral-950 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        
        {/* Animated Blobs */}
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-purple-300 dark:bg-purple-600 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-70 dark:opacity-40 animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-yellow-300 dark:bg-yellow-600 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-70 dark:opacity-40 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/3 w-72 h-72 bg-pink-300 dark:bg-pink-600 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-70 dark:opacity-40 animate-blob animation-delay-4000"></div>
      </div>
      
      <Navbar />
      
      <div className="container mx-auto px-4 pt-32 pb-12">
        <div className="flex flex-col items-center justify-center gap-12">
          <div className="text-center space-y-6 max-w-5xl">
              <h1 className="text-5xl font-extrabold tracking-tight lg:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 to-neutral-500 dark:from-neutral-100 dark:to-neutral-400">
                  PDF to Markdown
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                  Start extracting content from your documents in seconds. <br className="hidden sm:inline" />
                  Simply upload your PDF and get clean, formatted Markdown instantly.
              </p>
          </div>
          
          <div className="w-full max-w-6xl mt-8">
              <UploadForm />
          </div>
        </div>
      </div>
    </main>
  );
}