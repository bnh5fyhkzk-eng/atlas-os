import type { Metadata } from "next";
import NavBar from "@/components/NavBar";
import ArmsDock from "@/components/ArmsDock";
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
      <body className="min-h-screen bg-zinc-950 text-zinc-100 antialiased">
        <header className="sticky top-0 z-50">
          <NavBar />
        </header>
        <main className="md:pl-80">{children}</main>
        <ArmsDock />
      </body>
    </html>
  );
}