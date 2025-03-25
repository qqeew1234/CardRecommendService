import type { Metadata } from "next";
import "./reset.css";


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
