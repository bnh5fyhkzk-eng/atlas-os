import type { Metadata } from "next";
import NavBar from "@/components/NavBar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Atlas OS",
  description: "Agentic operating system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-stone-50 antialiased">
        <header className="sticky top-0 z-50">
          <NavBar />
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}