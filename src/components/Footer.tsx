import Link from "next/link";
import Image from "next/image";
import type { ReactElement } from "react";
import { siteConfig } from "@/config/site";
import { Phone, Mail, MapPin, Shield, Clock } from "lucide-react";
import Container from "./Container";

const footerLinks = {
  services: [
    { name: "Orthodontie", href: "/services" },
    { name: "Implants Dentaires", href: "/services" },
    { name: "Esthétique Dentaire", href: "/services" },
    { name: "Soins Préventifs", href: "/services" },
  ],
  company: [
    { name: "À Propos", href: "/about" },
    { name: "Nos Tarifs", href: "/pricing" },
    { name: "Contact", href: "/contact" },
    { name: "Confidentialité", href: "/privacy" },
  ],
  contact: [
    { name: siteConfig.phone, href: `tel:${siteConfig.phone}`, icon: Phone },
    { name: siteConfig.email, href: `mailto:${siteConfig.email}`, icon: Mail },
    { name: "Location", href: `https://maps.google.com/?q=${encodeURIComponent(siteConfig.address)}`, icon: MapPin, external: true },
  ]
};

export default function Footer(): ReactElement {
  return (
    <footer className="relative bg-background-secondary border-t border-accent-gold/20">
      <div className="absolute inset-0 bg-gradient-to-b from-accent-smoke/5 via-transparent to-accent-burgundy/5" />
      
      <Container>
        <div className="relative z-10 py-16">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-12">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <Image
                  src="/logo.jpg"
                  alt="One Smile Lab Logo"
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full object-cover shadow-lg"
                />
                <div className="flex flex-col">
                  <span className="mafia-heading text-2xl text-accent-primary">
                    ONE SMILE
                  </span>
                  <span className="mafia-heading text-lg text-accent-golden-grey font-light">
                    LAB
                  </span>
                </div>
              </div>
              <p className="text-accent-primary/80 leading-relaxed mb-6">
                Prothèses dentaires, couronnes et services de laboratoire en Algérie.
                Expertise reconnue depuis 2025.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-accent-primary/70 text-sm">
                  <Shield className="w-4 h-4 text-accent-primary" />
                  <span>Soins de qualité garantis</span>
                </div>
                <div className="flex items-center gap-3 text-accent-primary/70 text-sm">
                  <Clock className="w-4 h-4 text-accent-primary" />
                  <span>Rendez-vous flexibles</span>
                </div>
                <div className="flex items-center gap-3 text-accent-primary/70 text-sm">
                  <MapPin className="w-4 h-4 text-accent-primary" />
                  <span>Algérie</span>
                </div>
              </div>
            </div>

            {/* Services Links */}
            <div>
              <h3 className="mafia-heading text-lg text-accent-primary mb-6">
                Nos <span className="text-accent-primary-light">Services</span>
              </h3>
              <nav className="space-y-3">
                <Link href="/services" className="block text-accent-primary/70 hover:text-accent-primary-light transition-colors duration-300 text-sm">
                  Couronnes dentaires
                </Link>
                <Link href="/services" className="block text-accent-primary/70 hover:text-accent-primary-light transition-colors duration-300 text-sm">
                  Bridges
                </Link>
                <Link href="/services" className="block text-accent-primary/70 hover:text-accent-primary-light transition-colors duration-300 text-sm">
                  Prothèses partielles
                </Link>
                <Link href="/services" className="block text-accent-primary/70 hover:text-accent-primary-light transition-colors duration-300 text-sm">
                  Prothèses complètes
                </Link>
              </nav>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="mafia-heading text-lg text-accent-primary mb-6">
                <span className="text-accent-primary-light">Laboratoire</span>
              </h3>
              <nav className="space-y-3">
                {footerLinks.company.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="block text-accent-primary/70 hover:text-accent-primary-light transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="mafia-heading text-lg text-accent-primary mb-6">
                <span className="text-accent-primary-light">Contact</span>
              </h3>
              <div className="space-y-4">
                {footerLinks.contact.map((contact) => (
                  <a
                    key={contact.name}
                    href={contact.href}
                    target={contact.external ? "_blank" : undefined}
                    rel={contact.external ? "noreferrer noopener" : undefined}
                    className="flex items-center gap-3 text-accent-primary/70 hover:text-accent-primary-light transition-colors duration-300 text-sm group"
                  >
                    <contact.icon className="w-4 h-4 text-accent-primary group-hover:scale-110 transition-transform duration-300" />
                    <span>{contact.name}</span>
                  </a>
                ))}
                
                <div className="mt-6 pt-6 border-t border-accent-primary/20">
                  <p className="text-accent-primary/60 text-xs mb-3">Prise de rendez-vous</p>
                  <a
                    href="/contact"
                    className="luxury-card inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-accent-primary/30 text-accent-primary hover:bg-accent-primary/10 transition-all duration-300 text-sm group"
                  >
                    <Mail className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                    Prendre rendez-vous
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Separator */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-accent-primary/30 to-transparent mb-8" />

          {/* Bottom Section */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-center gap-6 text-accent-primary/60 text-sm">
              <p>© {new Date().getFullYear()} ONE SMILE LAB</p>
              <span className="hidden sm:block">•</span>
              <p>Tous droits réservés</p>
              <span className="hidden sm:block">•</span>
              <p className="text-accent-primary-light">Excellence depuis 2025</p>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-accent-primary/40 text-xs">Prendre RDV</span>
              <Link 
                href={siteConfig.bookingUrl}
                className="w-10 h-10 luxury-card rounded-full flex items-center justify-center text-accent-primary hover:bg-accent-primary/20 transition-all duration-300 group"
              >
                <Clock className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}


