import type { Metadata } from "next";
// import { JetBrains_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Analytics from "@/components/Analytics";
import { siteConfig } from "@/config/site";


// const jetBrainsMono = JetBrains_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
//   fallback: ["ui-monospace", "Menlo", "Monaco", "Consolas", "monospace"],
//   display: "swap",
// });

// const playfair = Playfair_Display({
//   variable: "--font-playfair",
//   subsets: ["latin"],
//   fallback: ["Georgia", "Times New Roman", "serif"],
//   display: "swap",
// });


export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} — Laboratoire Dentaire`,
    template: `%s — ${siteConfig.name}`,
  },
  description: "Laboratoire dentaire moderne en Algérie. Prothèses dentaires de qualité, couronnes, bridges, implants. Services de laboratoire dentaire professionnels.",
  metadataBase: new URL(siteConfig.baseUrl),
  alternates: { canonical: "/" },
  openGraph: {
    title: `${siteConfig.name} — Laboratoire Dentaire`,
    description:
      "Laboratoire dentaire moderne en Algérie. Prothèses dentaires de qualité, couronnes, bridges, implants. Services de laboratoire dentaire professionnels.",
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
    title: `${siteConfig.name} — Laboratoire Dentaire`,
    description:
      "Laboratoire dentaire moderne en Algérie. Prothèses dentaires de qualité, couronnes, bridges, implants. Services de laboratoire dentaire professionnels.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased pt-20">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
