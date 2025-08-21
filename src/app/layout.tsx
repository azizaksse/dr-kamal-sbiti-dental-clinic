import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Playfair_Display, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Analytics from "@/components/Analytics";
import { siteConfig } from "@/config/site";

const interSans = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  fallback: ["system-ui", "arial"],
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  fallback: ["ui-monospace", "Menlo", "Monaco", "Consolas", "monospace"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  fallback: ["Georgia", "Times New Roman", "serif"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  fallback: ["Georgia", "Times New Roman", "serif"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} — Clinique Dentaire`,
    template: `%s — ${siteConfig.name}`,
  },
  description: "Clinique dentaire moderne à Alger. Soins dentaires de qualité, orthodontie, implants, esthétique dentaire. Prise de rendez-vous en ligne.",
  metadataBase: new URL(siteConfig.baseUrl),
  alternates: { canonical: "/" },
  openGraph: {
    title: `${siteConfig.name} — Clinique Dentaire`,
    description:
      "Clinique dentaire moderne à Alger. Soins dentaires de qualité, orthodontie, implants, esthétique dentaire. Prise de rendez-vous en ligne.",
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
    title: `${siteConfig.name} — Clinique Dentaire`,
    description:
      "Clinique dentaire moderne à Alger. Soins dentaires de qualité, orthodontie, implants, esthétique dentaire. Prise de rendez-vous en ligne.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${interSans.variable} ${jetBrainsMono.variable} ${playfair.variable} ${cormorant.variable} antialiased pt-20`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
