export const metadata = {
  title: "Nos Services - Soins Dentaires Complets",
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
    title: "ORTHODONTIE MODERNE",
    subtitle: "Alignement Parfait de Votre Sourire",
    description: "Correction de l&apos;alignement dentaire avec les techniques les plus avancées: aligneurs invisibles, soins dentaires et prothèses fixes pour des résultats esthétiques optimaux.",
    features: ["Aligneurs invisibles Invisalign"],
    premium: true,
    price: "À partir de 120,000 DA",
  },
  {
    title: "IMPLANTOLOGIE",
    subtitle: "Remplacement Dentaire Permanent",
    description: "Solutions d&apos;implants dentaires de dernière génération pour remplacer vos dents manquantes avec des matériaux biocompatibles et une chirurgie guidée par ordinateur.",
    features: ["Chirurgie radical", "Prothèses sur mesure", "Prothèse dentaire provisoire"],
    premium: true,
    price: "80,000 DA par implant",
  },
  {
    title: "ESTHÉTIQUE DENTAIRE",
    subtitle: "Sourire de Rêve Garanti",
    description: "Transformez votre sourire avec nos traitements esthétiques: facettes céramiques, blanchiment laser professionnel et design du sourire personnalisé.",
    features: ["Facettes céramiques E-max", "Design du sourire numérique", "Résultats immédiats"],
    premium: true,
    price: "Sur devis",
  },
  {
    title: "SOINS MODERNES",
    subtitle: "Prévention et Traitement",
    description: "Soins dentaires complets pour toute la famille: détartrage, soins des caries, traitements de canal et prévention bucco-dentaire.",
    features: ["Détartrage ultrasonique", "Soins conservateurs", "Endodontie moderne", "Prévention personnalisée"],
    premium: false,
    price: "À partir de 2,500 DA",
  },
];

import Container from "@/components/Container";
import Section from "@/components/Section";
import Button from "@/components/ui/Button";
import Reveal from "@/components/Reveal";
import { Activity, Clock, Crown, Heart, Star, Shield, CheckCircle, ArrowRight } from "lucide-react";
import type { ReactElement } from "react";

const getServiceIcon = (idx: number) => {
  const icons = [Activity, Heart, Crown, Shield];
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
                  Soins Dentaires Complets
                </span>
              </div>
            </Reveal>
            
            <Reveal delay={200}>
              <h1 className="mafia-heading text-6xl sm:text-7xl lg:text-8xl text-white leading-[0.9] mb-8">
                <span className="block">NOS</span>
                <span className="block golden-accent">SOINS</span>
              </h1>
            </Reveal>
            
            <Reveal delay={400}>
              <p className="text-2xl sm:text-3xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light">
                Quatre spécialités dentaires où l&apos;excellence médicale rencontre l&apos;innovation.
                <span className="golden-accent font-medium block mt-2">Votre sourire, notre passion.</span>
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
                  <div className={`luxury-card rounded-2xl p-8 group hover:scale-105 transition-all duration-500 relative overflow-hidden h-full flex flex-col ${service.premium ? 'mafia-glow' : ''}`}>
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
                      
                      <div className="space-y-3 mb-8 flex-grow">
                        {service.features.map((feature) => (
                          <div key={feature} className="flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-accent-gold flex-shrink-0" />
                            <span className="text-white/80 text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between mt-auto">
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
                title: "TECHNOLOGIE AVANCÉE",
                description: "Equipements de dernière génération et techniques mini-invasives pour votre confort."
              },
              {
                icon: Clock,
                title: "PRISE EN CHARGE RAPIDE",
                description: "Rendez-vous dans les meilleurs délais."
              },
              {
                icon: Crown,
                title: "EXPERTISE RECONNUE",
                description: "Spécialistes diplômés et formés aux dernières innovations dentaires."
              }
            ].map((guarantee, idx) => (
              <Reveal key={guarantee.title} delay={idx * 200}>
                <div className="luxury-card text-center p-8 rounded-xl group hover:scale-105 transition-all duration-500 h-full flex flex-col">
                  <div className="w-20 h-20 mx-auto mb-6 luxury-card rounded-full flex items-center justify-center group-hover:bg-accent-gold/20 transition-colors duration-300">
                    <guarantee.icon className="w-10 h-10 text-accent-gold" />
                  </div>
                  <h3 className="mafia-heading text-xl text-white mb-4 group-hover:text-accent-gold transition-colors duration-300">
                    {guarantee.title}
                  </h3>
                  <p className="text-white/80 leading-relaxed flex-grow">
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
                Prêt pour votre
                <span className="golden-accent block">Nouveau Sourire ?</span>
              </h2>
              <p className="text-xl text-white/85 mb-12 max-w-2xl mx-auto">
                Rejoignez nos milliers de patients satisfaits et découvrez 
                ce que signifie vraiment avoir un sourire parfait.
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
                    PRENDRE RENDEZ-VOUS
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


