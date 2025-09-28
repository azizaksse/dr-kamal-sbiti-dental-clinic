"use client";

import Link from "next/link";
import { useState, type ReactElement } from "react";
import { Menu, Phone, X } from "lucide-react";
import ToothIcon from "@/components/icons/ToothIcon";

export default function Navbar(): ReactElement {
  const [isOpen, setIsOpen] = useState(false);

  function handleToggleMenu(): void {
    setIsOpen((prev) => !prev);
  }

  function handleCloseMenu(): void {
    setIsOpen(false);
  }

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-all duration-500 modern-header"
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between relative" aria-label="Primary">
        <div className="flex items-center gap-3 header-brand">
          <Link href="/" className="group flex items-center gap-3">
            <ToothIcon className="w-7 h-7 text-accent-primary group-hover:rotate-12 transition-transform duration-300" />
            <span className="mafia-heading text-2xl brand-text tracking-wide transition-colors duration-300">
              DR. KAMAL SBITI
            </span>
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
    </header>
  );
}


