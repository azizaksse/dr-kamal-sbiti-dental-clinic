export const metadata = { title: "Tarifs - Transparence & Excellence" };

const routes: Array<{ city: string; price: number; premium?: boolean; description?: string }> = [
  { city: "Monaco", price: 60, description: "Principauté de classe mondiale" },
  { city: "Nice", price: 80, description: "Perle de la Côte d'Azur" },
  { city: "Nice Aéroport", price: 100, premium: true, description: "Service aéroportuaire premium" },
  { city: "Cannes", price: 130, description: "Ville du festival international" },
  { city: "Saint-Tropez", price: 320, premium: true, description: "Destination mythique" },
  { city: "Ventimiglia", price: 50, description: "Charme italien authentique" },
  { city: "San Remo", price: 100, description: "Riviera italienne" },
  { city: "Milan", price: 600, premium: true, description: "Capitale de la mode" },
];

const packages = [
  {
    name: "PRESTIGE",
    subtitle: "L'Essentiel Raffiné",
    duration: "Demi-journée",
    price: "280",
    features: [
      "Véhicule berline premium",
      "Chauffeur expérimenté",
      "Eau & rafraîchissements",
      "Itinéraire personnalisé",
      "4h de service incluses"
    ],
    popular: false
  },
  {
    name: "EXCELLENCE", 
    subtitle: "Le Choix des Connaisseurs",
    duration: "Journée complète",
    price: "650",
    features: [
      "Véhicule haut de gamme",
      "Chauffeur guide bilingue", 
      "Service traiteur inclus",
      "Arrêts photographiques",
      "8h de service incluses",
      "Assistance concierge"
    ],
    popular: true
  },
  {
    name: "MAJESTÉ",
    subtitle: "L'Art de l'Exception",
    duration: "Sur mesure",
    price: "Sur devis",
    features: [
      "Flotte véhicules d'exception",
      "Équipe dédiée 24/7",
      "Service personnalisé intégral",
      "Coordination événementielle",
      "Accès privilèges exclusifs",
      "Conciergerie de luxe illimitée"
    ],
    popular: false
  }
];

import Container from "@/components/Container";
import Section from "@/components/Section";
import Button from "@/components/ui/Button";
import Reveal from "@/components/Reveal";
import { MapPin, Crown, Star, Check, ArrowRight, Clock, Shield } from "lucide-react";
import type { ReactElement } from "react";

export default function PricingPage(): ReactElement {
  return (
    <>
      {/* Hero Section */}
      <Section className="relative overflow-hidden pt-32 pb-20 film-grain">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background-secondary to-background" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-radial from-accent-gold/6 to-transparent opacity-40" />
        <div className="absolute bottom-0 left-0 w-1/3 h-2/3 bg-gradient-radial from-accent-burgundy/8 to-transparent opacity-30" />
        
        <Container>
          <div className="relative z-10 max-w-5xl mx-auto text-center">
            <Reveal>
              <div className="mb-8">
                <span className="luxury-card mafia-glow px-6 py-3 text-accent-gold text-sm font-semibold tracking-widest uppercase">
                  Transparence & Excellence
                </span>
              </div>
            </Reveal>
            
            <Reveal delay={200}>
              <h1 className="mafia-heading text-6xl sm:text-7xl lg:text-8xl text-white leading-[0.9] mb-8">
                <span className="block">NOS</span>
                <span className="block golden-accent">TARIFS</span>
              </h1>
            </Reveal>
            
            <Reveal delay={400}>
              <p className="text-2xl sm:text-3xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light">
                Des prix justes pour un service d&apos;exception.
                <span className="golden-accent font-medium block mt-2"> Depuis Menton, vers toutes les destinations de prestige.</span>
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Packages Section */}
      <Section className="relative bg-background-secondary">
        <div className="absolute inset-0 bg-gradient-to-b from-accent-smoke/5 via-transparent to-accent-steel/5" />
        
        <Container>
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="mafia-heading text-5xl lg:text-6xl text-white mb-6">
                Nos <span className="golden-accent">Formules</span>
              </h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto">
                Trois niveaux d&apos;excellence pour répondre à tous vos besoins
              </p>
            </div>
          </Reveal>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {packages.map((pkg, idx) => (
              <Reveal key={pkg.name} delay={idx * 150}>
                <div className={`luxury-card rounded-2xl p-8 relative overflow-hidden group hover:scale-105 transition-all duration-500 ${pkg.popular ? 'mafia-glow border-2 border-accent-gold/50' : ''}`}>
                  {pkg.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="luxury-card px-6 py-2 rounded-full border border-accent-gold/50">
                        <Star className="w-4 h-4 text-accent-gold inline mr-2" />
                        <span className="text-accent-gold text-sm font-semibold tracking-wide">PLUS POPULAIRE</span>
                      </div>
                    </div>
                  )}
                  
                  <div className="text-center mb-8">
                    <h3 className="mafia-heading text-3xl text-white mb-2 group-hover:text-accent-gold transition-colors duration-300">
                      {pkg.name}
                    </h3>
                    <p className="text-accent-gold text-sm font-medium tracking-wide mb-4">
                      {pkg.subtitle}
                    </p>
                    <div className="mb-6">
                      <div className="mafia-heading text-5xl text-accent-gold mb-2">
                        {pkg.price === "Sur devis" ? pkg.price : `€${pkg.price}`}
                      </div>
                      <p className="text-white/60 text-sm">{pkg.duration}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4 mb-8">
                    {pkg.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-3">
                        <Check className="w-5 h-5 text-accent-gold flex-shrink-0" />
                        <span className="text-white/80 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    variant={pkg.popular ? "gold" : "outline"} 
                    size="lg" 
                    asChild 
                    className={`w-full ${pkg.popular ? 'premium-shadow' : 'luxury-card border-accent-gold/40 text-white hover:bg-accent-gold/10'}`}
                  >
                    <a href="/contact" className="flex items-center justify-center gap-2">
                      {pkg.price === "Sur devis" ? "NOUS CONTACTER" : "RÉSERVER"}
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </Button>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Routes & Destinations */}
      <Section className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-background to-background-secondary" />
        
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <Reveal>
              <div>
                <h2 className="mafia-heading text-5xl lg:text-6xl text-white mb-8">
                  Destinations 
                  <span className="golden-accent block">Privilégiées</span>
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-accent-gold to-accent-gold-bright rounded-full mb-8" />
                <p className="text-lg text-white/85 leading-relaxed mb-8">
                  Depuis notre base de Menton, nous desservons les destinations 
                  les plus prestigieuses de la Riviera française et italienne.
                </p>
                <div className="luxury-card rounded-2xl overflow-hidden aspect-[4/3] relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent-gold/10 via-background-tertiary to-accent-burgundy/10" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-6 h-6 text-accent-gold" />
                      <div>
                        <h3 className="mafia-heading text-xl text-white">Menton Centre</h3>
                        <p className="text-white/80 text-sm">Point de départ de toutes nos courses</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
            
            <Reveal delay={300}>
              <div className="luxury-card rounded-2xl overflow-hidden">
                <div className="bg-gradient-to-r from-accent-gold/20 via-background-tertiary to-accent-burgundy/20 p-6 border-b border-accent-gold/20">
                  <h3 className="mafia-heading text-2xl text-white mb-2">Grille Tarifaire</h3>
                  <p className="text-white/80 text-sm">Tarifs indicatifs depuis Menton centre</p>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {routes.map((route) => (
                    <div 
                      key={route.city} 
                      className="flex items-center justify-between p-4 border-b border-accent-gold/10 last:border-none hover:bg-accent-gold/5 transition-colors duration-300"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${route.premium ? 'bg-accent-gold' : 'bg-accent-steel'}`} />
                        <div>
                          <div className="text-white font-medium">{route.city}</div>
                          {route.description && (
                            <div className="text-white/60 text-xs">{route.description}</div>
                          )}
                        </div>
                        {route.premium && (
                          <Crown className="w-4 h-4 text-accent-gold" />
                        )}
                      </div>
                      <div className="mafia-heading text-xl text-accent-gold">
                        €{route.price}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 bg-accent-gold/5 border-t border-accent-gold/20">
                  <div className="flex items-center gap-2 text-white/70 text-xs">
                    <Clock className="w-4 h-4" />
                    <span>Tarifs de jour. Majoration nuit/jours fériés : +30%</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Guarantees */}
      <Section className="relative bg-background-secondary">
        <div className="absolute inset-0 bg-gradient-to-r from-accent-burgundy-dark/10 via-transparent to-accent-gold/5" />
        
        <Container>
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="mafia-heading text-5xl lg:text-6xl text-white mb-6">
                Nos <span className="golden-accent">Engagements</span>
              </h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto">
                La promesse d&apos;un service irréprochable, sans surprise
              </p>
            </div>
          </Reveal>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "PRIX FIXES",
                description: "Aucune surprise. Le prix annoncé est le prix payé, quelles que soient les conditions de circulation."
              },
              {
                icon: Crown,
                title: "QUALITÉ PREMIUM",
                description: "Véhicules entretenus quotidiennement, chauffeurs formés à l'excellence du service."
              },
              {
                icon: Clock,
                title: "PONCTUALITÉ ABSOLUE",
                description: "Nous arrivons toujours à l'heure. En cas de retard de notre part, le trajet est offert."
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
      <Section className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-gold/5 via-background to-accent-burgundy-dark/10" />
        
        <Container>
          <Reveal>
            <div className="text-center max-w-4xl mx-auto">
              <h2 className="mafia-heading text-5xl lg:text-6xl text-white mb-8">
                Prêt à 
                <span className="golden-accent block">Réserver ?</span>
              </h2>
              <p className="text-xl text-white/85 mb-12 max-w-2xl mx-auto">
                Contactez-nous pour un devis personnalisé ou réservez directement 
                votre trajet vers la destination de votre choix.
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
                  <a href="/services">
                    DÉCOUVRIR NOS SERVICES
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


