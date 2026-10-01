import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Brand Platform Admin",
  description: "Internal commerce and production dashboard"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
