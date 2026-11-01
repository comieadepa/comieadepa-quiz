import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "COMIEADEPA | Pesquisa Institucional AGO",
  description: "Sistema de Pesquisa Institucional Anônima da COMIEADEPA - Totem de Coleta de Opinião",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="h-full">
      <body className={`${inter.className} min-h-full flex flex-col bg-slate-950 text-slate-100 antialiased selection:bg-amber-500 selection:text-slate-900`}>
        {children}
      </body>
    </html>
  );
}
