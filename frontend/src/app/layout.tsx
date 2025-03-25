import type { Metadata } from "next";
import "./reset.css";
import "@/src/styles/globals.scss"


export const metadata: Metadata = {
  title: "카드핏",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
