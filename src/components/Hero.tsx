"use client";

import Link from "next/link";
import { type ReactElement } from "react";
import { motion } from "framer-motion";
import Container from "@/components/Container";
import Button from "@/components/ui/Button";

export default function Hero(): ReactElement {

  return (
    <section className="relative isolate overflow-hidden -mt-20">
      <div 
        className="relative min-h-screen w-full flex items-center justify-center pt-20" 
        aria-label="Clinique dentaire moderne"
        style={{
          backgroundImage: 'url(/heroima.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        
        {/* Enhanced overlay for better text readability under transparent header */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/30" />
        
        <Container>
          <motion.div 
            className="relative z-10 max-w-4xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="mb-8"
            >
              <span className="inline-block px-6 py-3 luxury-card text-accent-primary text-sm font-semibold tracking-widest uppercase">
                CLINIQUE DENTAIRE MODERNE
              </span>
            </motion.div>
            
            <motion.h1 
              className="mafia-heading text-5xl sm:text-7xl lg:text-8xl text-accent-text tracking-tight leading-[0.85] mb-10"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <span className="block relative">
                CLINIQUE
                <div className="absolute -inset-2 bg-gradient-to-r from-accent-primary/5 via-transparent to-accent-primary/5 blur-xl" />
              </span>
              <span className="block golden-accent text-4xl sm:text-6xl lg:text-7xl font-light italic mt-2">
                Harmony
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-xl sm:text-2xl text-accent-text-light max-w-3xl leading-relaxed mb-14 font-light"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7 }}
            >
              Orthodontie, soins dentaires et esthétique du sourire à Alger. 
              <br className="hidden sm:block" />
              <span className="golden-accent font-medium">Expertise reconnue. Technologies modernes. Résultats exceptionnels.</span>
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.9 }}
            >
              <Button variant="gold" size="lg" asChild className="premium-shadow">
                <Link href="/contact" className="text-lg px-10 py-5 font-semibold tracking-wide">
                  PRENDRE RENDEZ-VOUS
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="luxury-card border-accent-primary/40 text-accent-text hover:bg-accent-primary/10 hover:border-accent-primary/60 transition-all duration-300">
                <Link href="/services" className="text-lg px-10 py-5 font-medium tracking-wide">
                  DÉCOUVRIR NOS SOINS
                </Link>
              </Button>
            </motion.div>
            
            {/* Enhanced call to action */}
            <motion.div
              className="mt-20 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.5 }}
            >
              <p className="text-accent-text-light text-sm tracking-[0.2em] uppercase font-medium">
                Découvrir nos soins dentaires
              </p>
              <motion.div
                className="w-px h-20 bg-gradient-to-b from-accent-primary via-accent-primary/50 to-transparent mx-auto mt-6 relative"
                animate={{ 
                  scaleY: [1, 0.3, 1],
                  opacity: [0.8, 0.4, 0.8]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-accent-primary rounded-full animate-pulse" />
              </motion.div>
            </motion.div>
          </motion.div>
        </Container>
      </div>
    </section>
  );
}


