import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets:  ["latin"],
  variable: "--font-inter",
  display:  "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets:  ["latin"],
  variable: "--font-plus-jakarta",
  display:  "swap",
});

export const metadata: Metadata = {
  title:       "MegaMart – Best Deals Online",
  description: "Shop millions of products at the best prices. Free shipping on orders above ₹499.",
  keywords:    ["ecommerce", "shopping", "deals", "megamart"],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${plusJakarta.variable}`}>
      <body>{children}</body>
    </html>
  );
}
