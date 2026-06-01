import type { Metadata } from "next";
import { JetBrains_Mono, Spectral } from "next/font/google";
import { AmbientMoneyBar } from "@/components/AmbientMoneyBar";
import { AxisNav } from "@/components/AxisNav";
import { Heartbeat } from "@/components/Heartbeat";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const spectral = Spectral({
  variable: "--font-spectral",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "atlas.os",
  description: "living shape · brother + atlas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${jetbrainsMono.variable} ${spectral.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0a0a0a] text-[#f5f1e8] font-mono">
        <Heartbeat />
        <AxisNav />
        <div className="flex-1">{children}</div>
        <AmbientMoneyBar />
      </body>
    </html>
  );
}
