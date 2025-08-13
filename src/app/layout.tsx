import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Analytics from "@/components/Analytics";
import { siteConfig } from "@/config/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} — Chauffeur Privé`,
    template: `%s — ${siteConfig.name}`,
  },
  description: "Chauffeur privé premium sur la Côte d'Azur et en Italie du Nord. Transferts en berline ou van, aéroports, événements, tours.",
  metadataBase: new URL(siteConfig.baseUrl),
  alternates: { canonical: "/" },
  openGraph: {
    title: `${siteConfig.name} — Chauffeur Privé`,
    description:
      "Chauffeur privé premium sur la Côte d'Azur et en Italie du Nord. Transferts en berline ou van, aéroports, événements, tours.",
    url: "/",
    siteName: siteConfig.name,
    type: "website",
    locale: "fr_FR",
    images: [
      {
        url: "/og-default.jpg",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — Chauffeur Privé`,
    description:
      "Chauffeur privé premium sur la Côte d'Azur et en Italie du Nord. Transferts en berline ou van, aéroports, événements, tours.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${cormorant.variable} antialiased pt-20`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
