import "~/styles/globals.css";

import { Inter, Playfair_Display } from "next/font/google";
import { type Metadata } from "next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
});

export const metadata: Metadata = {
  title: "PDF2MD",
  description: "Convert PDF documents to clean Markdown format in seconds.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} `} suppressHydrationWarning>
      <head>

      </head>
      <body>{children}</body>
    </html>
  );
}
