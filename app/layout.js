import "./globals.css";
import { Space_Grotesk, Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const grotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-grotesk", weight: ["500", "600", "700"], display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

const __jsonld = {"@context":"https://schema.org","@type":"RealEstateAgent","name":"Homigo","description":"Cari rumah pertama, apartemen, dan kost, lalu bandingkan berdampingan: harga per meter persegi, estimasi cicilan KPR, dan sewa yang disetarakan per bulan.","url":"https://properti-homigo.vercel.app","areaServed":"ID"};

export const metadata = {
  metadataBase: new URL("https://properti-homigo.vercel.app"),
  title: { default: "Homigo — Rumah pertama & tempat sewa", template: "%s — Homigo" },
  description: "Cari rumah pertama, apartemen, dan kost, lalu bandingkan berdampingan: harga per meter persegi, estimasi cicilan KPR, dan sewa yang disetarakan per bulan.",
  applicationName: "Homigo",
  keywords: ["rumah pertama", "sewa apartemen", "kost", "bandingkan rumah", "cicilan KPR"],
  authors: [{ name: "Homigo" }],
  creator: "Homigo",
  publisher: "Homigo",
  alternates: { canonical: "https://properti-homigo.vercel.app" },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://properti-homigo.vercel.app",
    siteName: "Homigo",
    title: "Homigo — Rumah pertama & tempat sewa",
    description: "Cari rumah pertama, apartemen, dan kost, lalu bandingkan berdampingan: harga per meter persegi, estimasi cicilan KPR, dan sewa yang disetarakan per bulan.",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Homigo — Rumah pertama & tempat sewa" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Homigo — Rumah pertama & tempat sewa",
    description: "Cari rumah pertama, apartemen, dan kost, lalu bandingkan berdampingan: harga per meter persegi, estimasi cicilan KPR, dan sewa yang disetarakan per bulan.",
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
    <html lang="id" className={`${grotesk.variable} ${inter.variable}`}>
      <body className="antialiased">
        <div className="grain" aria-hidden="true" />
        <Navbar />
        {children}
        <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(__jsonld) }} />
        </body>
    </html>
  );
}
