import "./globals.css";
import { Space_Grotesk, Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const grotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-grotesk", weight: ["500", "600", "700"], display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

const __jsonld = {"@context":"https://schema.org","@type":"RealEstateAgent","name":"Homigo","description":"Marketplace properti modern","url":"https://properti-homigo.vercel.app","areaServed":"ID"};

export const metadata = {
  metadataBase: new URL("https://properti-homigo.vercel.app"),
  title: "Homigo — Cari Properti Jadi Mudah",
  description: "Marketplace properti modern: jual, beli, dan sewa rumah, apartemen, ruko, tanah, dan villa di seluruh Indonesia.",
  applicationName: "Homigo",
  keywords: ["marketplace properti", "sewa rumah", "jual properti", "ruko", "tanah"],
  authors: [{ name: "Homigo" }],
  creator: "Homigo",
  publisher: "Homigo",
  alternates: { canonical: "https://properti-homigo.vercel.app" },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://properti-homigo.vercel.app",
    siteName: "Homigo",
    title: "Homigo — Cari Properti Jadi Mudah",
    description: "Marketplace properti modern: jual, beli, dan sewa rumah, apartemen, ruko, tanah, dan villa di seluruh Indonesia.",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Homigo — Cari Properti Jadi Mudah" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Homigo — Cari Properti Jadi Mudah",
    description: "Marketplace properti modern: jual, beli, dan sewa rumah, apartemen, ruko, tanah, dan villa di seluruh Indonesia.",
    images: ["/og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className={`${grotesk.variable} ${inter.variable} antialiased`}>
        <div className="grain" aria-hidden="true" />
        <Navbar />
        {children}
        <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(__jsonld) }} />
        </body>
    </html>
  );
}
