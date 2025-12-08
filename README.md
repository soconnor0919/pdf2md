# PDF2MD

A modern, fast, and secure PDF to Markdown converter built with the T3 Stack.

## Features

- **Instant Conversion**: Convert PDF documents to clean Markdown format in seconds.
- **Privacy Focused**: Files are processed in memory and never stored on disk.
- **Smart Formatting**: Heuristic-based detection for headers, paragraphs, and lists to preserve document structure.
- **Modern UI**: Built with Shadcn/UI for a beautiful and accessible interface.
- **Dark Mode**: Fully supported out of the box.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org) (App Router)
- **Runtime**: [Bun](https://bun.sh)
- **Styling**: [Tailwind CSS](https://tailwindcss.com) v4
- **UI Components**: [Shadcn/UI](https://ui.shadcn.com)
- **PDF Parsing**: [PDF.js](https://mozilla.github.io/pdf.js/)

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) installed on your machine.

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/soconnor0919/pdf2md.git
    cd pdf2md
    ```

2.  Install dependencies:
    ```bash
    bun install
    ```

3.  Start the development server:
    ```bash
    bun dev
    ```

4.  Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

This application is optimized for deployment on Vercel or any platform supporting Next.js.

## License

MIT
