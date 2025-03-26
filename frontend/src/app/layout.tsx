import type { Metadata } from "next";
import "@/styles/reset.css";
import "@/styles/globals.scss";

export const metadata: Metadata = {
  title: "카드핏",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
