"use client";

import { Suspense, type ReactElement } from "react";
import { siteConfig } from "@/config/site";
import Container from "@/components/Container";
import Section from "@/components/Section";
import Reveal from "@/components/Reveal";
import AppointmentBookingSection from "@/components/AppointmentBookingSection";
import { Phone, Mail, MapPin } from "lucide-react";

// Removed form schema as we're using the AppointmentBookingSection component

const contactMethods = [
  {
    icon: Phone,
    title: "TÉLÉPHONE",
    subtitle: "Prise de rendez-vous",
    value: siteConfig.phone,
    href: `tel:${siteConfig.phone}`,
    primary: true
  },
  {
    icon: Mail,
    title: "EMAIL",
    subtitle: "Contact direct",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
    primary: false
  },
  {
    icon: MapPin,
    title: "ADRESSE",
    subtitle: "Nous trouver",
    value: siteConfig.address,
    href: `https://maps.google.com/?q=${encodeURIComponent(siteConfig.address)}`,
    primary: false
  }
];

export default function ContactPage(): ReactElement {
  return (
    <Suspense fallback={
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-32 text-center">
        <div className="luxury-card inline-block px-8 py-4 rounded-lg">
          <span className="text-accent-primary font-medium">Chargement...</span>
        </div>
      </div>
    }>
      <ContactInner />
    </Suspense>
  );
}

function ContactInner(): ReactElement {

  return (
    <div 
      className="min-h-screen w-full relative -mt-20 pt-20"
      style={{
        backgroundImage: 'url(/aboutback.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Removed dark overlay for brighter background */}
      
      {/* Hero Section */}
      <Section className="relative overflow-hidden pt-32 pb-20">
        {/* Removed gradient overlay for brighter background */}
        
        <Container>
          <div className="relative z-10 max-w-5xl mx-auto text-center">
            <Reveal>
              <div className="mb-8">
                <span className="luxury-card px-6 py-3 text-accent-primary bg-white/90 text-sm font-semibold tracking-widest uppercase">
                  PRENDRE RENDEZ-VOUS
                </span>
              </div>
            </Reveal>
            
            <Reveal delay={200}>
              <h1 className="mafia-heading text-6xl sm:text-7xl lg:text-8xl text-white leading-[0.9] mb-8">
                <span className="block">Réservez Votre</span>
                <span className="block text-accent-primary">Consultation</span>
              </h1>
            </Reveal>
            
            <Reveal delay={400}>
              <p className="text-2xl sm:text-3xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light">
                Planifiez votre visite en quelques clics. Choisissez votre service, votre créneau préféré et recevez une confirmation instantanée.
                <span className="text-accent-primary-light font-medium block mt-2">Notre équipe vous accompagne dans tous vos soins.</span>
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Contact Methods */}
      <Section className="relative">
        {/* Removed dark overlay for brighter background */}
        
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {contactMethods.map((method, idx) => (
              <Reveal key={method.title} delay={idx * 150}>
                <a 
                  href={method.href}
                  target={method.title === "INSTAGRAM" ? "_blank" : undefined}
                  rel={method.title === "INSTAGRAM" ? "noreferrer noopener" : undefined}
                  className={`luxury-card p-8 rounded-xl group hover:scale-105 transition-all duration-500 block ${method.primary ? 'mafia-glow' : ''}`}
                >
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-6 luxury-card rounded-full flex items-center justify-center group-hover:bg-accent-primary/20 transition-colors duration-300">
                      <method.icon className="w-8 h-8 text-accent-primary" />
                    </div>
                    <h3 className="mafia-heading text-xl text-white mb-2 group-hover:text-accent-primary-light transition-colors duration-300">
                      {method.title}
                    </h3>
                    <p className="text-accent-primary text-sm font-medium mb-2">
                      {method.subtitle}
                    </p>
                    <p className="text-white/80 text-sm">
                      {method.value}
                    </p>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Appointment Booking Section */}
      <AppointmentBookingSection />
    </div>
  );
}


