export const metadata = {
  title: "À propos - DR. KAMAL SBITI",
};

import Container from "@/components/Container";
import Section from "@/components/Section";
import Reveal from "@/components/Reveal";
import { Crown, Shield, Star, Clock, Users } from "lucide-react";
import type { ReactElement } from "react";

const stats = [
  { number: "2025", label: "Année de Fondation", icon: Crown },
  { number: "3000+", label: "Patients Satisfaits", icon: Users },
  { number: "98%", label: "Taux de Réussite", icon: Star },
  { number: "25+", label: "Pays de Formation", icon: Clock },
];

const values = [
  {
    title: "SOINS PERSONNALISÉS",
    description: "Chaque patient reçoit un traitement adapté à ses besoins spécifiques.",
    icon: Shield,
  },
  {
    title: "EXPERTISE RECONNUE",
    description: "Formation continue et technologies de pointe pour des résultats optimaux.",
    icon: Crown,
  },
  {
    title: "ÉQUIPEMENTS MODERNES", 
    description: "Matériel de dernière génération pour votre confort et sécurité.",
    icon: Star,
  },
];

export default function AboutPage(): ReactElement {
  return (
    <>
      {/* Hero Section */}
      <div 
        className="relative min-h-screen w-full -mt-20 pt-20"
        style={{
          backgroundImage: 'url(/page2.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        
        <Section className="relative overflow-hidden min-h-screen flex items-center bg-transparent">
        
        <Container>
          <div className="relative z-10 max-w-4xl">
            <Reveal>
              <div className="mb-8">
                <span className="luxury-card px-6 py-3 text-accent-primary bg-white/90 text-sm font-semibold tracking-widest uppercase">
                  Excellence Dentaire
                </span>
              </div>
            </Reveal>
            
            <Reveal delay={200}>
              <h1 className="mafia-heading text-6xl sm:text-7xl lg:text-8xl text-white leading-[0.9] mb-8">
                <span className="block">CLINIQUE</span>
                <span className="block text-accent-primary">DR. KAMAL SBITI</span>
              </h1>
            </Reveal>
            
            <Reveal delay={400}>
              <p className="text-2xl sm:text-3xl text-white/90 max-w-3xl leading-relaxed font-light">
                Depuis 2025, nous redéfinissons les prothèses dentaires en Algérie. 
                <span className="text-accent-primary-light font-medium"> Une expertise reconnue au service de votre sourire.</span>
              </p>
            </Reveal>
          </div>
        </Container>
        </Section>
      </div>

      {/* Stats Section */}
      <Section className="relative bg-background-secondary">
        <div className="absolute inset-0 bg-gradient-to-r from-accent-burgundy/5 via-transparent to-accent-gold/5" />
        
        <Container>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <Reveal key={stat.label} delay={idx * 150}>
                <div className="text-center group">
                  <div className="luxury-card p-8 rounded-xl border-2 border-transparent hover:border-accent-primary/30 transition-all duration-500">
                    <stat.icon className="w-12 h-12 text-accent-primary mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                    <div className="mafia-heading text-4xl lg:text-5xl text-white mb-2 group-hover:text-accent-primary transition-colors duration-300">
                      {stat.number}
                    </div>
                    <p className="text-text-muted font-medium tracking-wide uppercase text-sm">
                      {stat.label}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Story Section */}
      <Section className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background to-background-secondary" />
        
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <Reveal>
              <div className="space-y-8">
                <div>
                  <h2 className="mafia-heading text-5xl lg:text-6xl text-accent-primary mb-6">
                    L&apos;Art du 
                    <span className="text-accent-primary-light block">Sourire</span>
                  </h2>
                  <div className="w-24 h-1 bg-gradient-to-r from-accent-primary to-accent-primary-light rounded-full mb-8" />
                </div>
                
                <div className="space-y-6 text-lg text-white/85 leading-relaxed">
                  <p>
                    Au cœur d&apos;Annaba, DR. KAMAL SBITI s&apos;est imposé comme une référence 
                    en prothèses dentaires d&apos;excellence depuis 2025.
                  </p>
                  <p>
                    Nous ne sommes pas simplement une clinique dentaire. Nous sommes les 
                    artisans de votre sourire, les gardiens de votre santé bucco-dentaire, 
                    les partenaires de confiance de votre bien-être.
                  </p>
                  <p className="text-accent-primary-light font-medium">
                    Chaque soin est personnalisé. Chaque patient, une priorité absolue.
                  </p>
                </div>
              </div>
            </Reveal>
            
            <Reveal delay={300}>
              <div className="relative">
                <div className="luxury-card rounded-2xl overflow-hidden aspect-[4/5] relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/10 via-background-tertiary to-accent-primary-light/10" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-8 left-8 right-8">
                    <h3 className="mafia-heading text-2xl text-white mb-2">Équipements d&apos;Exception</h3>
                    <p className="text-white/80 text-sm">Technologies modernes et matériel de pointe</p>
                  </div>
                  <div className="absolute top-8 right-8">
                    <Crown className="w-8 h-8 text-accent-primary" />
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Values Section */}
      <Section className="relative bg-background-secondary">
        <div className="absolute inset-0 bg-gradient-to-r from-accent-smoke/10 via-transparent to-accent-steel/10" />
        
        <Container>
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="mafia-heading text-5xl lg:text-6xl text-accent-primary mb-6">
                Nos <span className="text-accent-primary-light">Valeurs</span>
              </h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto">
                Les piliers inébranlables de notre excellence
              </p>
            </div>
          </Reveal>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {values.map((value, idx) => (
              <Reveal key={value.title} delay={idx * 200}>
                <div className="luxury-card p-8 rounded-xl group hover:scale-105 transition-all duration-500 border-2 border-transparent hover:border-accent-primary/30">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-6 luxury-card rounded-full flex items-center justify-center group-hover:bg-accent-primary/20 transition-colors duration-300">
                      <value.icon className="w-8 h-8 text-accent-primary" />
                    </div>
                    <h3 className="mafia-heading text-xl text-accent-primary mb-4 group-hover:text-accent-primary-light transition-colors duration-300">
                      {value.title}
                    </h3>
                    <p className="text-white/80 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-burgundy-dark/20 via-background to-accent-gold/5" />
        
        <Container>
          <Reveal>
            <div className="text-center max-w-4xl mx-auto">
              <h2 className="mafia-heading text-5xl lg:text-6xl text-accent-primary mb-8">
                Rejoignez nos 
                <span className="text-accent-primary-light block">Patients Satisfaits</span>
              </h2>
              <p className="text-xl text-white/85 mb-12 max-w-2xl mx-auto">
                Découvrez pourquoi plus de 3000 patients nous font confiance 
                pour leurs soins dentaires les plus importants.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <a 
                  href="/contact" 
                  className="premium-shadow inline-flex items-center justify-center gap-3 bg-gradient-to-r from-accent-primary to-accent-primary-light text-white px-12 py-5 text-lg font-bold rounded-lg hover:scale-105 transition-all duration-300 tracking-widest uppercase"
                >
                  <Crown className="w-5 h-5" />
                  PRENDRE RENDEZ-VOUS
                </a>
                <a 
                  href="/pricing" 
                  className="luxury-card border-accent-primary/40 text-white hover:bg-accent-primary/10 hover:border-accent-primary/60 inline-flex items-center justify-center px-12 py-5 text-lg font-medium rounded-lg transition-all duration-300 tracking-wide"
                >
                  VOIR NOS TARIFS
                </a>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}


