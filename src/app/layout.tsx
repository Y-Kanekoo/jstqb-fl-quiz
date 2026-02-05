import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "JSTQB FL 学習アプリ",
  description: "JSTQB Foundation Level 試験対策クイズ",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={notoSansJP.className}>
      <body className="min-h-screen bg-gray-50">
        {/* ヘッダー */}
        <header className="bg-blue-600 text-white">
          <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
            <Link href="/" className="text-lg font-bold hover:opacity-80 transition-opacity">
              JSTQB FL 学習
            </Link>
            <nav>
              <Link
                href="/glossary"
                className="text-sm font-medium hover:opacity-80 transition-opacity"
              >
                用語集
              </Link>
            </nav>
          </div>
        </header>

        {/* メインコンテンツ */}
        <main>{children}</main>
      </body>
    </html>
  );
}
