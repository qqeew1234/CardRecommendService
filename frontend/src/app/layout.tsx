import type { Metadata } from "next";
import "@/styles/globals.scss";
import PageHeader from "@/components/globals/PageHeader";


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
    <html lang="en">
      <body className={""}>
        <PageHeader>
          <button>BUTTON</button>
        </PageHeader>
        {children}
      </body>
    </html>
  );
}
