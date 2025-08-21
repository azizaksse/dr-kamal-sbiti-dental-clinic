export const metadata = { title: "Tarifs - Soins Dentaires Transparents" };

import Container from "@/components/Container";
import Section from "@/components/Section";
import Button from "@/components/ui/Button";
import Reveal from "@/components/Reveal";
import { Crown, CheckCircle, Star, Shield, ArrowRight } from "lucide-react";
import type { ReactElement } from "react";

const services: Array<{ treatment: string; price: string; category: string; description?: string; premium?: boolean }> = [
  { treatment: "Consultation", price: "2,500 DA", category: "Diagnostic", description: "Examen complet + plan de traitement" },
  { treatment: "Détartrage", price: "4,000 DA", category: "Hygiène", description: "Nettoyage dentaire professionnel" },
  { treatment: "Plombage simple", price: "6,000 DA", category: "Soins", description: "Restoration composite" },
  { treatment: "Plombage complexe", price: "9,000 DA", category: "Soins", description: "Restoration multi-faces" },
  { treatment: "Dévitalisation", price: "15,000 DA", category: "Soins", description: "Traitement endodontique" },
  { treatment: "Couronne céramique", price: "35,000 DA", category: "Prothèse", premium: true, description: "Couronne E-max esthétique" },
  { treatment: "Implant dentaire", price: "80,000 DA", category: "Implantologie", premium: true, description: "Implant + pilier + couronne" },
  { treatment: "Blanchiment", price: "15,000 DA", category: "Esthétique", description: "Séance professionnelle" },
  { treatment: "Facettes céramique", price: "45,000 DA", category: "Esthétique", premium: true, description: "Par dent - esthétique premium" },
  { treatment: "Extraction simple", price: "4,000 DA", category: "Chirurgie", description: "Extraction non-chirurgicale" },
  { treatment: "Extraction complexe", price: "8,000 DA", category: "Chirurgie", description: "Extraction chirurgicale" },
  { treatment: "Urgence", price: "5,000 DA", category: "Urgence", description: "Prise en charge immédiate" },
];

const packages = [
  {
    name: "CONSULTATION COMPLÈTE",
    subtitle: "Diagnostic Approfondi",
    duration: "1 séance",
    price: "2,500 DA",
    features: [
      "Examen clinique complet",
      "Radiographie numérique",
      "Plan de traitement personnalisé",
      "Conseils de prévention",
      "Devis détaillé"
    ],
    popular: false
  },
  {
    name: "PACK HYGIÈNE", 
    subtitle: "Prévention Optimale",
    duration: "2 séances",
    price: "7,500 DA",
    features: [
      "Consultation + détartrage",
      "Polissage des dents", 
      "Application de fluor",
      "Conseils d'hygiène personnalisés",
      "Contrôle à 6 mois offert",
      "Kit d'hygiène inclus"
    ],
    popular: true
  },
  {
    name: "SOURIRE PARFAIT",
    subtitle: "Transformation Esthétique",
    duration: "Sur mesure",
    price: "Sur devis",
    features: [
      "Design du sourire numérique",
      "Blanchiment professionnel",
      "Facettes céramiques",
      "Suivi post-traitement",
      "Garantie esthétique",
      "Photos avant/après"
    ],
    popular: false
  }
];

const categories = [
  { name: "Diagnostic", icon: Shield, color: "text-blue-500" },
  { name: "Hygiène", icon: Star, color: "text-green-500" },
  { name: "Soins", icon: CheckCircle, color: "text-indigo-500" },
  { name: "Prothèse", icon: Crown, color: "text-purple-500" },
  { name: "Implantologie", icon: Crown, color: "text-red-500" },
  { name: "Esthétique", icon: Star, color: "text-pink-500" },
  { name: "Chirurgie", icon: Shield, color: "text-orange-500" },
  { name: "Urgence", icon: CheckCircle, color: "text-red-600" }
];

export default function PricingPage(): ReactElement {
  return (
    <>
      {/* Hero Section */}
      <Section className="relative overflow-hidden pt-32 pb-20 film-grain">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background-secondary to-background" />
        <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-radial from-accent-primary/8 to-transparent opacity-40" />
        <div className="absolute bottom-0 right-0 w-1/3 h-2/3 bg-gradient-radial from-accent-secondary/6 to-transparent opacity-30" />
        
        <Container>
          <div className="relative z-10 max-w-5xl mx-auto text-center">
            <Reveal>
              <div className="mb-8">
                <span className="luxury-card mafia-glow px-6 py-3 text-accent-primary text-sm font-semibold tracking-widest uppercase">
                  Tarifs Transparents
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
                Des prix justes pour des soins dentaires d&apos;excellence.
                <span className="golden-accent font-medium block mt-2">Qualité et transparence garanties.</span>
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Services Pricing */}
      <Section className="relative bg-background-secondary">
        <div className="absolute inset-0 bg-gradient-to-b from-accent-primary/5 via-transparent to-accent-secondary/5" />
        
        <Container>
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="mafia-heading text-5xl lg:text-6xl text-white mb-6">
                Tarifs par <span className="golden-accent">Service</span>
              </h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto">
                Tous nos tarifs incluent la consultation et les soins associés
              </p>
            </div>
          </Reveal>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {services.map((service, idx) => {
              const categoryInfo = categories.find(cat => cat.name === service.category);
              const Icon = categoryInfo?.icon || CheckCircle;
              
              return (
                <Reveal key={service.treatment} delay={idx * 50}>
                  <div className={`luxury-card p-6 rounded-xl group hover:scale-105 transition-all duration-500 ${service.premium ? 'border-2 border-accent-primary/30' : ''}`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <Icon className={`w-5 h-5 ${categoryInfo?.color || 'text-accent-primary'}`} />
                        <div>
                          <h3 className="mafia-heading text-lg text-white group-hover:text-accent-primary transition-colors duration-300">
                            {service.treatment}
                          </h3>
                          <span className="text-xs text-accent-primary font-medium tracking-wide uppercase">
                            {service.category}
                          </span>
                        </div>
                      </div>
                      {service.premium && <Crown className="w-4 h-4 text-accent-primary" />}
                    </div>
                    <div className="mafia-heading text-2xl text-accent-primary mb-2">
                      {service.price}
                    </div>
                    <p className="text-white/70 text-sm">
                      {service.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Packages Section */}
      <Section className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-background to-background-secondary" />
        
        <Container>
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="mafia-heading text-5xl lg:text-6xl text-white mb-6">
                Nos <span className="golden-accent">Packs</span>
              </h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto">
                Formules complètes pour un suivi optimal de votre santé dentaire
              </p>
            </div>
          </Reveal>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {packages.map((pkg, idx) => (
              <Reveal key={pkg.name} delay={idx * 200}>
                <div className={`luxury-card rounded-2xl p-8 group hover:scale-105 transition-all duration-500 relative overflow-hidden ${pkg.popular ? 'border-2 border-accent-primary/40 mafia-glow' : ''}`}>
                  {pkg.popular && (
                    <div className="absolute top-4 right-4">
                      <div className="luxury-card px-3 py-1 rounded-full">
                        <Star className="w-4 h-4 text-accent-primary inline mr-1" />
                        <span className="text-accent-primary text-xs font-semibold tracking-wide">POPULAIRE</span>
                      </div>
                    </div>
                  )}
                  
                  <div className="relative z-10">
                    <div className="text-center mb-8">
                      <h3 className="mafia-heading text-2xl text-white mb-2 group-hover:text-accent-primary transition-colors duration-300">
                        {pkg.name}
                      </h3>
                      <p className="text-accent-primary text-sm font-medium tracking-wide mb-4">
                        {pkg.subtitle}
                      </p>
                      <div className="mafia-heading text-4xl text-accent-primary mb-2">
                        {pkg.price}
                      </div>
                      <span className="text-white/60 text-sm">{pkg.duration}</span>
                    </div>
                    
                    <div className="space-y-3 mb-8">
                      {pkg.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-accent-primary flex-shrink-0" />
                          <span className="text-white/80 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <Button 
                      variant="gold" 
                      size="lg" 
                      asChild 
                      className="w-full premium-shadow group/btn"
                    >
                      <a 
                        href={`/contact?service=${encodeURIComponent(pkg.name)}`}
                        className="flex items-center justify-center gap-2"
                      >
                        CHOISIR CE PACK
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                      </a>
                    </Button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section className="relative bg-background-secondary">
        <div className="absolute inset-0 bg-gradient-to-r from-accent-primary/20 via-transparent to-accent-secondary/10" />
        
        <Container>
          <Reveal>
            <div className="text-center max-w-4xl mx-auto">
              <h2 className="mafia-heading text-5xl lg:text-6xl text-white mb-8">
                Questions sur
                <span className="golden-accent block">Nos Tarifs ?</span>
              </h2>
              <p className="text-xl text-white/85 mb-12 max-w-2xl mx-auto">
                Contactez-nous pour un devis personnalisé et découvrez nos facilités de paiement.
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
                    DEMANDER UN DEVIS
                  </a>
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  asChild 
                  className="luxury-card border-accent-primary/40 text-white hover:bg-accent-primary/10 hover:border-accent-primary/60 text-lg px-12 py-5"
                >
                  <a href="/services">
                    DÉCOUVRIR NOS SOINS
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