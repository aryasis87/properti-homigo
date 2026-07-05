import "./globals.css";
import { Space_Grotesk, Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const grotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-grotesk", weight: ["500", "600", "700"], display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata = {
  title: "Homigo — Cari Properti Jadi Mudah",
  description: "Marketplace properti modern: jual, beli, dan sewa rumah, apartemen, ruko, tanah, dan villa di seluruh Indonesia.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className={`${grotesk.variable} ${inter.variable} antialiased`}>
        <div className="grain" aria-hidden="true" />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
