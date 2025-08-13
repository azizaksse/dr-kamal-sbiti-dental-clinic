export const metadata = {
  title: "Services - Excellence Sur Mesure",
};

type Service = {
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  premium: boolean;
  price: string;
};

const services: Service[] = [
  {
    title: "TRANSFERTS AÉROPORT",
    subtitle: "La Première Impression Compte",
    description: "De l&apos;élégance de Nice à la sophistication de Monaco, nous orchestrons vos arrivées et départs avec une précision horlogère.",
    features: ["Suivi de vol en temps réel", "Accueil personnalisé avec panneau", "Assistance bagages incluse", "Véhicules premium climatisés"],
    premium: false,
    price: "À partir de 80€",
  },
  {
    title: "MISE À DISPOSITION",
    subtitle: "Votre Temps, Notre Expertise",
    description: "Un chauffeur dévoué à votre service, prêt à s&apos;adapter à vos besoins les plus exigeants avec une discrétion absolue.",
    features: ["Flexibilité totale d&apos;horaires", "Temps d&apos;attente inclus", "Itinéraires personnalisés", "Chauffeur polyglotte"],
    premium: true,
    price: "150€/heure",
  },
  {
    title: "ÉVÉNEMENTS PRESTIGE",
    subtitle: "L&apos;Art de l&apos;Exception",
    description: "Mariages royaux, MIPIM, Cannes Lions, Grand Prix de Monaco - nous élevons chaque événement au rang de légende.",
    features: ["Coordination événementielle", "Flotte berline & van luxe", "Chauffeurs en livrée", "Service multi-véhicules"],
    premium: true,
    price: "Sur devis",
  },
  {
    title: "TOURS & EXCURSIONS",
    subtitle: "Révélateur de Merveilles",
    description: "De Monaco à Milan, de Saint-Tropez à San Remo, découvrez la Riviera à travers le regard d&apos;un connaisseur.",
    features: ["Itinéraires secrets exclusifs", "Arrêts photographiques premium", "Recommandations d&apos;initiés", "Guide culturel inclus"],
    premium: false,
    price: "280€/demi-journée",
  },
];

import Container from "@/components/Container";
import Section from "@/components/Section";
import Button from "@/components/ui/Button";
import Reveal from "@/components/Reveal";
import { Car, Clock, Crown, MapPin, Star, Shield, CheckCircle, ArrowRight } from "lucide-react";
import type { ReactElement } from "react";

const getServiceIcon = (idx: number) => {
  const icons = [Car, Clock, Crown, MapPin];
  return icons[idx];
};

export default function ServicesPage(): ReactElement {
  return (
    <>
      {/* Hero Section */}
      <Section className="relative overflow-hidden pt-32 pb-20 film-grain">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background-secondary to-background" />
        <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-radial from-accent-burgundy/8 to-transparent opacity-40" />
        <div className="absolute bottom-0 right-0 w-1/3 h-2/3 bg-gradient-radial from-accent-gold/6 to-transparent opacity-30" />
        
        <Container>
          <div className="relative z-10 max-w-5xl mx-auto text-center">
            <Reveal>
              <div className="mb-8">
                <span className="luxury-card mafia-glow px-6 py-3 text-accent-gold text-sm font-semibold tracking-widest uppercase">
                  Excellence Sur Mesure
                </span>
              </div>
            </Reveal>
            
            <Reveal delay={200}>
              <h1 className="mafia-heading text-6xl sm:text-7xl lg:text-8xl text-white leading-[0.9] mb-8">
                <span className="block">NOS</span>
                <span className="block golden-accent">SERVICES</span>
              </h1>
            </Reveal>
            
            <Reveal delay={400}>
              <p className="text-2xl sm:text-3xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light">
                Quatre domaines d&apos;excellence où chaque détail compte.
                <span className="golden-accent font-medium block mt-2"> Où l&apos;art du service rencontre la perfection.</span>
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Services Grid */}
      <Section className="relative bg-background-secondary">
        <div className="absolute inset-0 bg-gradient-to-b from-accent-smoke/5 via-transparent to-accent-steel/5" />
        
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, idx) => {
              const Icon = getServiceIcon(idx);
              return (
                <Reveal key={service.title} delay={idx * 150}>
                  <div className={`luxury-card rounded-2xl p-8 group hover:scale-105 transition-all duration-500 relative overflow-hidden ${service.premium ? 'mafia-glow' : ''}`}>
                    {service.premium && (
                      <div className="absolute top-4 right-4">
                        <div className="luxury-card px-3 py-1 rounded-full">
                          <Star className="w-4 h-4 text-accent-gold inline mr-1" />
                          <span className="text-accent-gold text-xs font-semibold tracking-wide">PRESTIGE</span>
                        </div>
                      </div>
                    )}
                    
                    <div className="relative z-10">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 luxury-card rounded-xl flex items-center justify-center group-hover:bg-accent-gold/20 transition-colors duration-300">
                          <Icon className="w-8 h-8 text-accent-gold" />
                        </div>
                        <div>
                          <h3 className="mafia-heading text-2xl text-white group-hover:text-accent-gold transition-colors duration-300">
                            {service.title}
                          </h3>
                          <p className="text-accent-gold text-sm font-medium tracking-wide">
                            {service.subtitle}
                          </p>
                        </div>
                      </div>
                      
                      <p className="text-white/85 text-lg leading-relaxed mb-6">
                        {service.description}
                      </p>
                      
                      <div className="space-y-3 mb-8">
                        {service.features.map((feature) => (
                          <div key={feature} className="flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-accent-gold flex-shrink-0" />
                            <span className="text-white/80 text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-text-muted text-sm tracking-wide uppercase">Tarif</span>
                          <div className="mafia-heading text-2xl text-accent-gold">
                            {service.price}
                          </div>
                        </div>
                        
                        <Button 
                          variant="gold" 
                          size="lg" 
                          asChild 
                          className="premium-shadow group/btn"
                        >
                          <a 
                            href={`/contact?service=${encodeURIComponent(service.title)}`}
                            className="flex items-center gap-2"
                          >
                            RÉSERVER
                            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Premium Guarantees */}
      <Section className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-background to-background-secondary" />
        
        <Container>
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="mafia-heading text-5xl lg:text-6xl text-white mb-6">
                Nos <span className="golden-accent">Garanties</span>
              </h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto">
                L&apos;engagement d&apos;une excellence sans compromis
              </p>
            </div>
          </Reveal>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "DISCRÉTION ABSOLUE",
                description: "Vos trajets, vos conversations, vos secrets restent entre nous. Parole d'honneur."
              },
              {
                icon: Clock,
                title: "PONCTUALITÉ SUISSE",
                description: "Nous arrivons toujours 5 minutes avant l'heure convenue. Sans exception."
              },
              {
                icon: Crown,
                title: "EXCELLENCE TOTALE",
                description: "Véhicules immaculés, chauffeurs irréprochables, service sans faille."
              }
            ].map((guarantee, idx) => (
              <Reveal key={guarantee.title} delay={idx * 200}>
                <div className="luxury-card text-center p-8 rounded-xl group hover:scale-105 transition-all duration-500">
                  <div className="w-20 h-20 mx-auto mb-6 luxury-card rounded-full flex items-center justify-center group-hover:bg-accent-gold/20 transition-colors duration-300">
                    <guarantee.icon className="w-10 h-10 text-accent-gold" />
                  </div>
                  <h3 className="mafia-heading text-xl text-white mb-4 group-hover:text-accent-gold transition-colors duration-300">
                    {guarantee.title}
                  </h3>
                  <p className="text-white/80 leading-relaxed">
                    {guarantee.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section className="relative bg-background-secondary">
        <div className="absolute inset-0 bg-gradient-to-r from-accent-burgundy-dark/20 via-transparent to-accent-gold/10" />
        
        <Container>
          <Reveal>
            <div className="text-center max-w-4xl mx-auto">
              <h2 className="mafia-heading text-5xl lg:text-6xl text-white mb-8">
                Prêt pour 
                <span className="golden-accent block">L&apos;Excellence ?</span>
              </h2>
              <p className="text-xl text-white/85 mb-12 max-w-2xl mx-auto">
                Rejoignez notre cercle exclusif de clients privilégiés et découvrez 
                ce que signifie vraiment voyager avec style.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button 
                  variant="gold" 
                  size="lg" 
                  asChild 
                  className="mafia-glow premium-shadow text-lg px-12 py-5"
                >
                  <a href="/contact" className="flex items-center gap-3">
                    <Crown className="w-5 h-5" />
                    RÉSERVER MAINTENANT
                  </a>
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  asChild 
                  className="luxury-card border-accent-gold/40 text-white hover:bg-accent-gold/10 hover:border-accent-gold/60 text-lg px-12 py-5"
                >
                  <a href="/pricing">
                    VOIR NOS TARIFS
                  </a>
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}


