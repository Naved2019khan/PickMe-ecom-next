import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/components/providers/ReduxProvider";
import CartDrawer from "@/components/ui/CartDrawer";
import AuthDrawer from "@/components/ui/AuthDrawer";
import LocationDrawer from "@/components/ui/LocationDrawer";
import WishlistDrawer from "@/components/ui/WishlistDrawer";
import MobileCheckoutBar from "@/components/ui/MobileCheckoutBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LocationInitializer from "@/components/location/LocationInitializer";

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
      <body>
        <ReduxProvider>
          <Header />
          {children}
          <Footer />
          <CartDrawer />
          <AuthDrawer />
          <LocationDrawer />
          <WishlistDrawer />
          <MobileCheckoutBar />
          <LocationInitializer />
        </ReduxProvider>
      </body>
    </html>
  );
}
