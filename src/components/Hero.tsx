"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, type ReactElement } from "react";
import { motion } from "framer-motion";
import Container from "@/components/Container";
import Button from "@/components/ui/Button";

export default function Hero(): ReactElement {
  const configuredSrc = useMemo(() => process.env.NEXT_PUBLIC_HERO_VIDEO_URL, []);
  const [videoError, setVideoError] = useState(false);

  // Use herovideo.mp4 as primary source for the mafia vibe
  const [sourceList, setSourceList] = useState<string[]>([]);
  useEffect(() => {
    const candidates = [configuredSrc, "/herovideo.mp4", "/hero.mp4"].filter(Boolean) as string[];
    setSourceList(candidates);
  }, [configuredSrc]);

  return (
    <section className="relative isolate overflow-hidden">
      <div className="relative h-screen w-full flex items-center film-grain" aria-label="Premium chauffeur service">
        {!videoError && (
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            onError={() => setVideoError(true)}
            className="absolute inset-0 h-full w-full object-cover scale-105"
            poster="/hero.jpg"
            aria-hidden
            disablePictureInPicture
          >
            {sourceList.map((src) => (
              <source key={src} src={src} type="video/mp4" />
            ))}
          </video>
        )}
        
        {/* Enhanced cinematic overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/30 to-black/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Sophisticated lighting effects */}
        <div className="absolute top-0 left-1/3 w-2/3 h-1/2 bg-gradient-radial from-accent-gold/8 to-transparent opacity-40" />
        <div className="absolute bottom-0 right-1/3 w-1/2 h-2/3 bg-gradient-radial from-accent-burgundy/12 to-transparent opacity-30" />
        <div className="absolute top-1/4 left-0 w-1/3 h-1/2 bg-gradient-radial from-accent-smoke/6 to-transparent opacity-25" />
        
        {/* Enhanced vignette with golden accent */}
        <div className="absolute inset-0 shadow-[inset_0_0_300px_rgba(0,0,0,0.9)]" />
        <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(255,215,0,0.03)]" />
        
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
              <span className="inline-block px-6 py-3 luxury-card mafia-glow text-accent-gold text-sm font-semibold tracking-widest uppercase">
                SERVICES EXCLUSIFS
              </span>
            </motion.div>
            
            <motion.h1 
              className="mafia-heading text-5xl sm:text-7xl lg:text-9xl text-white tracking-tight leading-[0.85] mb-10"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <span className="block relative">
                GRAN TURISMO
                <div className="absolute -inset-2 bg-gradient-to-r from-accent-gold/5 via-transparent to-accent-gold/5 blur-xl" />
              </span>
              <span className="block golden-accent text-4xl sm:text-6xl lg:text-7xl font-light italic mt-2">
                Chauffeur Privé
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-xl sm:text-2xl text-white/95 max-w-3xl leading-relaxed mb-14 font-light"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7 }}
            >
              Service premium de chauffeur privé sur la Côte d&apos;Azur et l&apos;Italie du Nord. 
              <br className="hidden sm:block" />
              <span className="golden-accent font-medium"> Discrétion absolue. Confort suprême. Excellence garantie.</span>
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.9 }}
            >
              <Button variant="gold" size="lg" asChild className="premium-shadow mafia-glow">
                <Link href="/contact" className="text-lg px-10 py-5 font-semibold tracking-wide">
                  RÉSERVER MAINTENANT
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="luxury-card border-accent-gold/40 text-white hover:bg-accent-gold/10 hover:border-accent-gold/60 transition-all duration-300">
                <Link href="/contact?type=quote" className="text-lg px-10 py-5 font-medium tracking-wide">
                  DEVIS PERSONNALISÉ
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
              <p className="smoke-text text-sm tracking-[0.2em] uppercase font-medium">
                Découvrir nos services exclusifs
              </p>
              <motion.div
                className="w-px h-20 bg-gradient-to-b from-accent-gold via-accent-gold/50 to-transparent mx-auto mt-6 relative"
                animate={{ 
                  scaleY: [1, 0.3, 1],
                  opacity: [0.8, 0.4, 0.8]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-accent-gold rounded-full animate-pulse" />
              </motion.div>
            </motion.div>
          </motion.div>
        </Container>
      </div>
    </section>
  );
}


