import type { ReactElement } from "react";
import Link from "next/link";
import Image from "next/image";
import Container from "@/components/Container";
import Section from "@/components/Section";
import Hero from "@/components/Hero";
import Button from "@/components/ui/Button";
import Reveal from "@/components/Reveal";
import AppointmentBookingSection from "@/components/AppointmentBookingSection";
import { Crown, Shield, ArrowRight, CheckCircle, Star } from "lucide-react";

const advantages = [
  { 
    title: "ORTHODONTIE MODERNE", 
    desc: "Techniques avancées avec aligneurs invisibles et systèmes céramiques.", 
    icon: Star,
    premium: true 
  },
  { 
    title: "SOINS COMPLETS", 
    desc: "Prise en charge dentaire complète: implants, esthétique et prévention.", 
    icon: CheckCircle,
    premium: false 
  },
  { 
    title: "EXPERTISE RECONNUE", 
    desc: "Équipe de spécialistes formés aux dernières innovations dentaires.", 
    icon: Crown,
    premium: false 
  },
  { 
    title: "TECHNOLOGIE DE POINTE", 
    desc: "Équipements modernes et techniques non-invasives pour votre confort.", 
    icon: Shield,
    premium: true 
  },
];

const treatmentPricing = [
  { treatment: "Consultation", price: "2,500", description: "Examen complet + plan de traitement", premium: false },
  { treatment: "Aligneurs Invisibles", price: "120,000", description: "Traitement orthodontique discret", premium: true },
  { treatment: "Implant Dentaire", price: "80,000", description: "Implant + couronne céramique", premium: true },
  { treatment: "Facettes Céramique", price: "45,000", description: "Par dent - esthétique premium", premium: true },
  { treatment: "Blanchiment Laser", price: "15,000", description: "Séance professionnelle", premium: false },
  { treatment: "Détartrage", price: "4,000", description: "Nettoyage dentaire complet", premium: false },
];

const orthodontieTreatments = [
  {
    title: "Aligneurs",
    description: "Les gouttières transparentes Invisalign représentent la solution idéale pour un traitement orthodontique discret. Amovibles et confortables, elles s'adaptent parfaitement à votre mode de vie.",
    image: "/dentalog-222-1930.jpg"
  },
  {
    title: "Pitts 21",
    description: "Le système Pitts 21 est une technique orthodontique avancée à faible friction, qui permet un meilleur contrôle du mouvement des dents et un traitement plus rapide, avec des résultats esthétiques optimisés.",
    image: "/tibaoui-pitts21.png"
  },
  {
    title: "Céramique",
    description: "L'orthodontie céramique allie efficacité et esthétique grâce à des attaches transparentes qui se fondent avec la couleur naturelle des dents. Une solution discrète et performante pour corriger votre alignement dentaire.",
    image: "/dentalog-187-1930.jpg"
  }
];

const stats = [
  { number: "2016", label: "Année de Fondation", suffix: "" },
  { number: "3000", label: "Patients Satisfaits", suffix: "+" },
  { number: "30", label: "Pays de Conférences", suffix: "+" },
  { number: "98", label: "Taux de Réussite", suffix: "%" },
];

const services = [
  {
    title: "ORTHODONTIE",
    description: "Correction de l'alignement dentaire avec les techniques les plus modernes",
    features: ["Aligneurs invisibles", "Système céramique", "Pitts 21"],
    href: "/services"
  },
  {
    title: "IMPLANTOLOGIE", 
    description: "Remplacement dentaire permanent avec implants de dernière génération",
    features: ["Implants titanium", "Chirurgie guidée", "Prothèses sur mesure"],
    href: "/services"
  },
  {
    title: "ESTHÉTIQUE DENTAIRE",
    description: "Sourire parfait grâce aux facettes et blanchiment professionnel",
    features: ["Facettes céramique", "Blanchiment laser", "Design du sourire"],
    href: "/services"
  }
];

export default function Home(): ReactElement {
  return (
    <>
      <Hero />

      {/* Advantages Section */}
      <Section className="relative bg-background-secondary">
        <div className="absolute inset-0 bg-gradient-to-b from-accent-primary/5 via-transparent to-accent-secondary/5" />
        
        <Container>
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="mafia-heading text-5xl lg:text-6xl text-accent-text mb-6">
                Nos <span className="golden-accent">Spécialités</span>
              </h2>
              <p className="text-xl text-accent-text-light max-w-3xl mx-auto">
                Quatre domaines d&apos;excellence pour votre santé bucco-dentaire
              </p>
            </div>
          </Reveal>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {advantages.map((item, idx) => (
              <Reveal key={item.title} delay={idx * 150}>
                <div className={`luxury-card p-8 rounded-xl group hover:scale-105 transition-all duration-500 text-center ${item.premium ? 'border-2 border-accent-primary/20' : ''}`}>
                  <div className="w-16 h-16 mx-auto mb-6 luxury-card rounded-full flex items-center justify-center group-hover:bg-accent-primary/20 transition-colors duration-300">
                    <item.icon className="w-8 h-8 text-accent-primary" />
                  </div>
                  <h3 className="mafia-heading text-lg text-accent-text mb-4 group-hover:text-accent-primary transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-accent-text-light text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Services Preview */}
      <Section className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-background to-background-secondary" />
        
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <Reveal>
              <div>
                <h2 className="mafia-heading text-5xl lg:text-6xl text-accent-text mb-8">
                  Soins 
                  <span className="golden-accent block">Dentaires</span>
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-full mb-8" />
                <p className="text-lg text-accent-text-light leading-relaxed mb-12">
                  De l&apos;orthodontie à l&apos;implantologie, 
                  nous orchestrons chaque traitement avec la précision d&apos;un spécialiste expert.
                </p>
                <Button 
                  variant="gold" 
                  size="lg" 
                  asChild 
                  className="premium-shadow"
                >
                  <Link href="/services" className="flex items-center gap-3">
                    <Crown className="w-5 h-5" />
                    DÉCOUVRIR NOS SOINS
                  </Link>
                </Button>
              </div>
            </Reveal>
            
            <Reveal delay={300}>
              <div className="space-y-6">
                {services.map((service) => (
                  <div key={service.title} className="luxury-card p-6 rounded-xl group hover:scale-105 transition-all duration-500">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="mafia-heading text-xl text-accent-text group-hover:text-accent-primary transition-colors duration-300">
                        {service.title}
                      </h3>
                      <ArrowRight className="w-5 h-5 text-accent-primary group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                    <p className="text-accent-text-light text-sm mb-4">
                      {service.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {service.features.map((feature) => (
                        <span key={feature} className="text-xs px-3 py-1 bg-accent-primary/20 text-accent-primary rounded-full">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Pricing Preview */}
      <Section className="relative bg-background-secondary">
        <div className="absolute inset-0 bg-gradient-to-r from-accent-primary/5 via-transparent to-accent-secondary/5" />
        
        <Container>
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="mafia-heading text-5xl lg:text-6xl text-accent-text mb-6">
                Tarifs <span className="golden-accent">Transparents</span>
              </h2>
              <p className="text-xl text-accent-text-light max-w-3xl mx-auto">
                Des prix clairs pour des soins dentaires d&apos;exception à Alger
              </p>
            </div>
          </Reveal>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {treatmentPricing.map((treatment, idx) => (
              <Reveal key={treatment.treatment} delay={idx * 100}>
                <div className="luxury-card p-6 rounded-xl group hover:scale-105 transition-all duration-500">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${treatment.premium ? 'bg-accent-primary' : 'bg-accent-secondary'}`} />
                      <h3 className="mafia-heading text-lg text-accent-text group-hover:text-accent-primary transition-colors duration-300">
                        {treatment.treatment}
                      </h3>
                      {treatment.premium && <Crown className="w-4 h-4 text-accent-primary" />}
                    </div>
                    <div className="mafia-heading text-2xl text-accent-primary">
                      {treatment.price} DA
                    </div>
                  </div>
                  <p className="text-accent-text-light text-sm">
                    {treatment.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
          
          <Reveal delay={600}>
            <div className="text-center">
              <Button 
                variant="outline" 
                size="lg" 
                asChild 
                className="luxury-card border-accent-primary/40 text-accent-text hover:bg-accent-primary/10"
              >
                <Link href="/pricing">
                  VOIR TOUS NOS TARIFS
                </Link>
              </Button>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* Statistics */}
      <Section className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background to-background-secondary" />
        
        <Container>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <Reveal key={stat.label} delay={idx * 150}>
                <div className="text-center group">
                  <div className="luxury-card p-8 rounded-xl hover:scale-105 transition-all duration-500">
                    <div className="mafia-heading text-4xl lg:text-5xl text-accent-primary mb-2 group-hover:scale-110 transition-transform duration-300">
                      {stat.number}{stat.suffix}
                    </div>
                    <p className="text-accent-text-light font-medium tracking-wide uppercase text-sm">
                      {stat.label}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Orthodontie Treatments */}
      <Section className="relative bg-background-secondary">
        <div className="absolute inset-0 bg-gradient-to-r from-accent-primary/3 via-transparent to-accent-secondary/3" />
        
        <Container>
          <Reveal>
            <div className="text-center mb-16">
              <div className="text-accent-primary text-sm tracking-widest uppercase font-semibold mb-4">notre signature</div>
              <h2 className="mafia-heading text-5xl lg:text-6xl text-accent-text mb-6">
                L&apos;orthodontie de <span className="golden-accent">dernière génération</span>
              </h2>
            </div>
          </Reveal>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {orthodontieTreatments.map((treatment, idx) => (
              <Reveal key={treatment.title} delay={idx * 200}>
                <div className="luxury-card p-8 rounded-xl group hover:scale-105 transition-all duration-500">
                  <div className="mb-6 overflow-hidden rounded-lg">
                    <Image 
                      src={treatment.image} 
                      alt={treatment.title}
                      width={400}
                      height={192}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="mafia-heading text-2xl text-accent-text mb-4 group-hover:text-accent-primary transition-colors duration-300">
                    {treatment.title}
                  </h3>
                  <p className="text-accent-text-light leading-relaxed">
                    {treatment.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Integrated Appointment Booking Section */}
      <AppointmentBookingSection />
    </>
  );
}
