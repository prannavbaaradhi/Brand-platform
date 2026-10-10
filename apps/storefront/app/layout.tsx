import type { Metadata } from "next";
import "./globals.css";
import { StorefrontIntro } from "./storefront-intro";

export const metadata: Metadata = {
  title: "Brand — Storefront",
  description: "Made-to-order clothing storefront"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body><StorefrontIntro>{children}</StorefrontIntro></body>
    </html>
  );
}
