import type { Metadata } from "next";
import "./reset.css";
import "@/styles/globals.scss";

export const metadata: Metadata = {
  title: "Card Fit",
  description: "card fit",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        
        {children}
        
      </body>
    </html>
  );
}
