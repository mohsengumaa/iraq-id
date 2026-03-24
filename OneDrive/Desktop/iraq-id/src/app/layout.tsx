import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import { AppProviders } from "@/components/providers/app-providers";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "إدارة المجمع السكني",
  description: "الفواتير، الاشتراكات، وتواصل السكان",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={`${cairo.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[var(--rm-surface)]">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
