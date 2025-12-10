import { UploadForm } from "~/components/upload-form";
import { Navbar } from "~/components/navbar";

export default function HomePage() {
  return (
    <main className="relative min-h-screen w-full selection:bg-primary/10">
      {/* Background Pattern */}
      <div className="fixed inset-0 z-0 h-full w-full bg-white dark:bg-neutral-950 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#6366f11a_1px,transparent_1px),linear-gradient(to_bottom,#6366f11a_1px,transparent_1px)] bg-[size:24px_24px]"></div>

        {/* Animated Blob */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-neutral-300 dark:bg-neutral-500 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-40 dark:opacity-30 animate-blob"></div>
      </div>

      <div className="relative z-10">
        <Navbar />

        <div className="container mx-auto px-4 pt-32 pb-8">
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="text-center space-y-4 max-w-5xl">
              <h1 className="font-heading text-5xl font-extrabold tracking-tight lg:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 to-neutral-500 dark:from-neutral-100 dark:to-neutral-400">
                PDF to Markdown
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Start extracting content from your documents in seconds. <br className="hidden sm:inline" />
                Simply upload your PDF and get clean, formatted Markdown instantly.
              </p>
            </div>

            <div className="w-full max-w-6xl mt-4">
              <UploadForm />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}