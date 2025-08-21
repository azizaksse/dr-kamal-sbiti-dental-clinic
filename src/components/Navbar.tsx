"use client";

import Link from "next/link";
import { useState, type ReactElement } from "react";
import { Menu, Phone, X, Crown } from "lucide-react";

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
      className="fixed inset-x-0 top-0 z-50 transition-all duration-500 bg-transparent"
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between" aria-label="Primary">
        <div className="flex items-center gap-3">
          <Link href="/" className="group flex items-center gap-3">
            <Crown className="w-7 h-7 text-accent-primary group-hover:rotate-12 transition-transform duration-300" />
            <span className="mafia-heading text-2xl text-accent-primary tracking-wide group-hover:text-accent-primary-light transition-colors duration-300">
              Clinique Tibaoui
            </span>
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-10">
          <Link className="text-sm text-accent-primary hover:text-accent-primary-light transition-colors duration-300 tracking-widest uppercase font-semibold hover:drop-shadow-lg" href="/about">
            À propos
          </Link>
          <Link className="text-sm text-accent-primary hover:text-accent-primary-light transition-colors duration-300 tracking-widest uppercase font-semibold hover:drop-shadow-lg" href="/services">
            Services
          </Link>
          <Link className="text-sm text-accent-primary hover:text-accent-primary-light transition-colors duration-300 tracking-widest uppercase font-semibold hover:drop-shadow-lg" href="/pricing">
            Tarifs
          </Link>
          <Link className="text-sm text-accent-primary hover:text-accent-primary-light transition-colors duration-300 tracking-widest uppercase font-semibold hover:drop-shadow-lg" href="/contact">
            Contact
          </Link>
          
          <div className="h-8 w-px bg-gradient-to-b from-transparent via-accent-primary/40 to-transparent mx-3" />
          
          <Link
            href="/contact"
            className="group premium-shadow inline-flex items-center gap-2 bg-gradient-to-r from-accent-primary to-accent-secondary text-white px-8 py-3 text-sm font-bold rounded-lg hover:shadow-xl hover:shadow-accent-primary/30 transform hover:scale-105 transition-all duration-300 tracking-widest uppercase"
          >
            <Phone size={16} className="group-hover:rotate-12 transition-transform duration-300" />
            RENDEZ-VOUS
          </Link>
        </div>

        <button
          aria-label="Ouvrir le menu"
          onClick={handleToggleMenu}
          className="md:hidden inline-flex items-center justify-center rounded-lg p-2 text-accent-primary hover:text-accent-primary-light hover:bg-accent-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary transition-all duration-300"
        >
          {isOpen ? <X aria-hidden size={24} /> : <Menu aria-hidden size={24} />}
        </button>
      </nav>

      {isOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-accent-primary/30" role="dialog" aria-modal="true">
          <div className="px-6 py-8 space-y-6">
            <Link 
              onClick={handleCloseMenu} 
              className="block py-4 text-accent-primary hover:text-accent-primary-light transition-colors duration-300 text-lg font-semibold tracking-wide border-b border-accent-primary/20 hover:border-accent-primary/50" 
              href="/about"
            >
              À PROPOS
            </Link>
            <Link 
              onClick={handleCloseMenu} 
              className="block py-4 text-accent-primary hover:text-accent-primary-light transition-colors duration-300 text-lg font-semibold tracking-wide border-b border-accent-primary/20 hover:border-accent-primary/50" 
              href="/services"
            >
              SERVICES
            </Link>
            <Link 
              onClick={handleCloseMenu} 
              className="block py-4 text-accent-primary hover:text-accent-primary-light transition-colors duration-300 text-lg font-semibold tracking-wide border-b border-accent-primary/20 hover:border-accent-primary/50" 
              href="/pricing"
            >
              TARIFS
            </Link>
            <Link 
              onClick={handleCloseMenu} 
              className="block py-4 text-accent-primary hover:text-accent-primary-light transition-colors duration-300 text-lg font-semibold tracking-wide border-b border-accent-primary/20 hover:border-accent-primary/50" 
              href="/contact"
            >
              CONTACT
            </Link>
            <Link
              onClick={handleCloseMenu}
              href="/contact"
              className="mt-8 premium-shadow inline-flex w-full items-center justify-center gap-3 bg-gradient-to-r from-accent-primary to-accent-secondary text-white px-8 py-5 text-lg font-bold rounded-lg shadow-xl shadow-accent-primary/30 tracking-widest uppercase"
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


