import Link from "next/link";
import type { ReactElement } from "react";
import { siteConfig } from "@/config/site";
import { Crown, Phone, MessageSquare, Instagram, Mail, MapPin, Shield, Clock } from "lucide-react";
import Container from "./Container";

const footerLinks = {
  services: [
    { name: "Transferts Aéroport", href: "/services" },
    { name: "Mise à Disposition", href: "/services" },
    { name: "Événements Prestige", href: "/services" },
    { name: "Tours & Excursions", href: "/services" },
  ],
  company: [
    { name: "À Propos", href: "/about" },
    { name: "Nos Tarifs", href: "/pricing" },
    { name: "Contact", href: "/contact" },
    { name: "Confidentialité", href: "/privacy" },
  ],
  contact: [
    { name: siteConfig.phone, href: `tel:${siteConfig.phone}`, icon: Phone },
    { name: "WhatsApp", href: siteConfig.whatsappLink, icon: MessageSquare },
    { name: "Instagram", href: siteConfig.instagramLink, icon: Instagram, external: true },
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
                <Crown className="w-8 h-8 text-accent-gold" />
                <span className="mafia-heading text-2xl text-white">
                  Gran Turismo Riviera
                </span>
              </div>
              <p className="text-white/80 leading-relaxed mb-6">
                Depuis 15 ans, nous cultivons l&apos;art du service de chauffeur privé 
                sur la Côte d&apos;Azur et l&apos;Italie du Nord.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-white/70 text-sm">
                  <Shield className="w-4 h-4 text-accent-gold" />
                  <span>Discrétion absolue garantie</span>
                </div>
                <div className="flex items-center gap-3 text-white/70 text-sm">
                  <Clock className="w-4 h-4 text-accent-gold" />
                  <span>Service 24h/24 - 7j/7</span>
                </div>
                <div className="flex items-center gap-3 text-white/70 text-sm">
                  <MapPin className="w-4 h-4 text-accent-gold" />
                  <span>Côte d&apos;Azur & Italie du Nord</span>
                </div>
              </div>
            </div>

            {/* Services Links */}
            <div>
              <h3 className="mafia-heading text-lg text-white mb-6">
                Nos <span className="golden-accent">Services</span>
              </h3>
              <nav className="space-y-3">
                {footerLinks.services.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="block text-white/70 hover:text-accent-gold transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="mafia-heading text-lg text-white mb-6">
                <span className="golden-accent">Entreprise</span>
              </h3>
              <nav className="space-y-3">
                {footerLinks.company.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="block text-white/70 hover:text-accent-gold transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="mafia-heading text-lg text-white mb-6">
                <span className="golden-accent">Contact</span>
              </h3>
              <div className="space-y-4">
                {footerLinks.contact.map((contact) => (
                  <a
                    key={contact.name}
                    href={contact.href}
                    target={contact.external ? "_blank" : undefined}
                    rel={contact.external ? "noreferrer noopener" : undefined}
                    className="flex items-center gap-3 text-white/70 hover:text-accent-gold transition-colors duration-300 text-sm group"
                  >
                    <contact.icon className="w-4 h-4 text-accent-gold group-hover:scale-110 transition-transform duration-300" />
                    <span>{contact.name}</span>
                  </a>
                ))}
                
                <div className="mt-6 pt-6 border-t border-accent-gold/20">
                  <p className="text-white/60 text-xs mb-3">Réservation immédiate</p>
                  <a
                    href="/contact"
                    className="luxury-card inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-accent-gold/30 text-accent-gold hover:bg-accent-gold/10 transition-all duration-300 text-sm group"
                  >
                    <Mail className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                    Réserver en ligne
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Separator */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-accent-gold/30 to-transparent mb-8" />

          {/* Bottom Section */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-center gap-6 text-white/60 text-sm">
              <p>© {new Date().getFullYear()} Gran Turismo Riviera</p>
              <span className="hidden sm:block">•</span>
              <p>Tous droits réservés</p>
              <span className="hidden sm:block">•</span>
              <p className="golden-accent">Excellence depuis 2009</p>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-white/40 text-xs">Suivez-nous</span>
              <a 
                href={siteConfig.instagramLink}
                target="_blank"
                rel="noreferrer noopener"
                className="w-10 h-10 luxury-card rounded-full flex items-center justify-center text-accent-gold hover:bg-accent-gold/20 transition-all duration-300 group"
              >
                <Instagram className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              </a>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}


