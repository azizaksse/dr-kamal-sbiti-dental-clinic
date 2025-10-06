"use client";

import Link from "next/link";
import { useState, type ReactElement } from "react";
import { Menu, Phone, X } from "lucide-react";
import CircularLogoUploader from "@/components/CircularLogoUploader";

export default function Navbar(): ReactElement {
  const [isOpen, setIsOpen] = useState(false);
  const [customLogo, setCustomLogo] = useState<string>("/logo.jpg");
  const [showLogoUploader, setShowLogoUploader] = useState(false);

  function handleToggleMenu(): void {
    setIsOpen((prev) => !prev);
  }

  function handleCloseMenu(): void {
    setIsOpen(false);
  }

  function handleLogoUpload(imageUrl: string, file: File) {
    setCustomLogo(imageUrl);
    setShowLogoUploader(false);
    console.log("Custom logo uploaded:", { imageUrl, file });
  }

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-all duration-500 modern-header"
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between relative" aria-label="Primary">
        <div className="flex items-center gap-4 header-brand">
          <Link href="/" className="group flex items-center gap-4">
            <div className="relative">
              {customLogo ? (
                <img
                  src={customLogo}
                  alt="One Smile Lab Logo"
                  className="w-12 h-12 rounded-full object-cover group-hover:scale-110 transition-all duration-300 group-hover:rotate-3 cursor-pointer shadow-lg"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowLogoUploader(!showLogoUploader);
                  }}
                />
              ) : (
                <div
                  className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-primary/20 to-accent-gold/20 border-2 border-dashed border-accent-primary/40 flex items-center justify-center cursor-pointer group-hover:scale-110 transition-all duration-300 group-hover:border-accent-primary"
                  onClick={() => setShowLogoUploader(!showLogoUploader)}
                >
                  <span className="text-accent-primary text-xs font-semibold">LOGO</span>
                </div>
              )}
              <div className="absolute -inset-2 bg-gradient-to-r from-accent-primary/10 via-accent-gold/20 to-accent-primary/10 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="flex flex-col">
              <span className="mafia-heading text-2xl brand-text tracking-wide transition-colors duration-300 group-hover:text-accent-gold">
                ONE SMILE
              </span>
              <span className="mafia-heading text-xl text-accent-golden-grey font-light tracking-wider transition-colors duration-300 group-hover:text-accent-primary">
                LAB
              </span>
            </div>
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-10">
          <Link className="text-sm header-nav-link tracking-widest uppercase" href="/about">
            À propos
          </Link>
          <Link className="text-sm header-nav-link tracking-widest uppercase" href="/services">
            Services
          </Link>
          <Link className="text-sm header-nav-link tracking-widest uppercase" href="/pricing">
            Tarifs
          </Link>
          <Link className="text-sm header-nav-link tracking-widest uppercase" href="/contact">
            Contact
          </Link>
          
          <div className="h-8 w-px bg-gradient-to-b from-transparent via-accent-golden-grey/40 to-transparent mx-3" />
          
          <Link
            href="/contact"
            className="group header-cta-button inline-flex items-center gap-2 px-8 py-3 text-sm font-bold rounded-lg transition-all duration-300 tracking-widest uppercase"
          >
            <Phone size={16} className="group-hover:rotate-12 transition-transform duration-300" />
            RENDEZ-VOUS
          </Link>
        </div>

        <button
          aria-label="Ouvrir le menu"
          onClick={handleToggleMenu}
          className="md:hidden inline-flex items-center justify-center rounded-lg p-2 text-accent-golden-grey hover:text-accent-gold hover:bg-accent-golden-grey/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold transition-all duration-300"
        >
          {isOpen ? <X aria-hidden size={24} /> : <Menu aria-hidden size={24} />}
        </button>
      </nav>

      {isOpen && (
        <div className="md:hidden mobile-menu" role="dialog" aria-modal="true">
          <div className="px-6 py-8 space-y-6">
            <Link 
              onClick={handleCloseMenu} 
              className="block py-4 mobile-menu-link text-lg font-semibold tracking-wide" 
              href="/about"
            >
              À PROPOS
            </Link>
            <Link 
              onClick={handleCloseMenu} 
              className="block py-4 mobile-menu-link text-lg font-semibold tracking-wide" 
              href="/services"
            >
              SERVICES
            </Link>
            <Link 
              onClick={handleCloseMenu} 
              className="block py-4 mobile-menu-link text-lg font-semibold tracking-wide" 
              href="/pricing"
            >
              TARIFS
            </Link>
            <Link 
              onClick={handleCloseMenu} 
              className="block py-4 mobile-menu-link text-lg font-semibold tracking-wide" 
              href="/contact"
            >
              CONTACT
            </Link>
            <Link
              onClick={handleCloseMenu}
              href="/contact"
              className="mt-8 header-cta-button inline-flex w-full items-center justify-center gap-3 px-8 py-5 text-lg font-bold rounded-lg tracking-widest uppercase"
            >
              <Phone size={20} />
              PRENDRE RENDEZ-VOUS
            </Link>
          </div>
        </div>
      )}

      {/* Logo Uploader Modal */}
      {showLogoUploader && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="luxury-card p-8 rounded-2xl max-w-md w-full">
            <div className="flex items-center justify-between mb-6">
              <h2 className="mafia-heading text-2xl text-accent-text">
                Télécharger votre Logo
              </h2>
              <button
                onClick={() => setShowLogoUploader(false)}
                className="text-accent-text-light hover:text-accent-primary transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="text-center mb-6">
              <CircularLogoUploader
                onImageUpload={handleLogoUpload}
                maxFileSize={5}
                initialImage={customLogo}
              />
              <p className="text-sm text-accent-text-light mt-4">
                Glissez-déposez votre image ou cliquez pour télécharger
              </p>
            </div>

            <div className="space-y-2 text-sm text-accent-text-light">
              <p><strong>Formats supportés:</strong> JPG, PNG, WebP</p>
              <p><strong>Taille max:</strong> 5MB</p>
              <p><strong>Recommandé:</strong> Image carrée, fond transparent</p>
            </div>

            <div className="mt-6 text-center">
              <button
                onClick={() => setShowLogoUploader(false)}
                className="px-6 py-2 bg-accent-primary text-white rounded-lg hover:bg-accent-primary-light transition-colors"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}


