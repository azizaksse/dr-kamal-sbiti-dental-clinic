"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Suspense, useState, type ReactElement } from "react";
import { siteConfig } from "@/config/site";
import Container from "@/components/Container";
import Section from "@/components/Section";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import Reveal from "@/components/Reveal";
import { Phone, MessageSquare, Instagram, Crown, Mail, MapPin, Clock, CheckCircle, Send } from "lucide-react";

const bookingSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  pickup: z.string().min(2),
  dropoff: z.string().min(2),
  datetime: z.string().min(2),
  message: z.string().optional(),
  service: z.string().optional(),
  type: z.string().optional(),
});

type BookingForm = z.infer<typeof bookingSchema>;

const contactMethods = [
  {
    icon: Phone,
    title: "TÉLÉPHONE",
    subtitle: "Disponible 24/7",
    value: siteConfig.phone,
    href: `tel:${siteConfig.phone}`,
    primary: true
  },
  {
    icon: MessageSquare,
    title: "WHATSAPP",
    subtitle: "Réponse immédiate",
    value: "Nous contacter",
    href: siteConfig.whatsappLink,
    primary: false
  },
  {
    icon: Instagram,
    title: "INSTAGRAM",
    subtitle: "Suivez nos actualités",
    value: "@granturismoriviera",
    href: siteConfig.instagramLink,
    primary: false
  }
];

export default function ContactPage(): ReactElement {
  return (
    <Suspense fallback={
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-32 text-center">
        <div className="luxury-card inline-block px-8 py-4 rounded-lg">
          <span className="text-accent-gold font-medium">Chargement...</span>
        </div>
      </div>
    }>
      <ContactInner />
    </Suspense>
  );
}

function ContactInner(): ReactElement {
  const search = useSearchParams();
  const defaultService = search.get("service") ?? undefined;
  const defaultType = search.get("type") ?? undefined;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BookingForm>({
    resolver: zodResolver(bookingSchema),
    defaultValues: { service: defaultService, type: defaultType },
  });

  const [isSent, setIsSent] = useState(false);

  async function handleSubmitBooking(values: BookingForm): Promise<void> {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    if (res.ok) setIsSent(true);
  }

  return (
    <>
      {/* Hero Section */}
      <Section className="relative overflow-hidden pt-32 pb-20 film-grain">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background-secondary to-background" />
        <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-radial from-accent-gold/6 to-transparent opacity-40" />
        <div className="absolute bottom-0 right-0 w-1/3 h-2/3 bg-gradient-radial from-accent-burgundy/8 to-transparent opacity-30" />
        
        <Container>
          <div className="relative z-10 max-w-5xl mx-auto text-center">
            <Reveal>
              <div className="mb-8">
                <span className="luxury-card mafia-glow px-6 py-3 text-accent-gold text-sm font-semibold tracking-widest uppercase">
                  Votre Demande, Notre Priorité
                </span>
              </div>
            </Reveal>
            
            <Reveal delay={200}>
              <h1 className="mafia-heading text-6xl sm:text-7xl lg:text-8xl text-white leading-[0.9] mb-8">
                <span className="block">NOUS</span>
                <span className="block golden-accent">CONTACTER</span>
              </h1>
            </Reveal>
            
            <Reveal delay={400}>
              <p className="text-2xl sm:text-3xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light">
                Réservez votre expérience d&apos;exception en quelques instants.
                <span className="golden-accent font-medium block mt-2"> Notre équipe vous répond dans l&apos;heure.</span>
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Contact Methods */}
      <Section className="relative bg-background-secondary">
        <div className="absolute inset-0 bg-gradient-to-b from-accent-smoke/5 via-transparent to-accent-steel/5" />
        
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
                    <div className="w-16 h-16 mx-auto mb-6 luxury-card rounded-full flex items-center justify-center group-hover:bg-accent-gold/20 transition-colors duration-300">
                      <method.icon className="w-8 h-8 text-accent-gold" />
                    </div>
                    <h3 className="mafia-heading text-xl text-white mb-2 group-hover:text-accent-gold transition-colors duration-300">
                      {method.title}
                    </h3>
                    <p className="text-accent-gold text-sm font-medium mb-2">
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

      {/* Contact Form */}
      <Section className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-background to-background-secondary" />
        
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2">
              <Reveal>
                <div className="mb-8">
                  <h2 className="mafia-heading text-4xl lg:text-5xl text-white mb-4">
                    Formulaire de 
                    <span className="golden-accent block">Réservation</span>
                  </h2>
                  <div className="w-24 h-1 bg-gradient-to-r from-accent-gold to-accent-gold-bright rounded-full mb-6" />
                  <p className="text-lg text-white/85 leading-relaxed">
                    Complétez ce formulaire et recevez votre confirmation dans l&apos;heure. 
                    Chaque détail compte pour nous.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={200}>
                <div className="luxury-card rounded-2xl p-8">
                  {isSent ? (
                    <div className="text-center py-12">
                      <div className="w-20 h-20 mx-auto mb-6 luxury-card rounded-full flex items-center justify-center">
                        <CheckCircle className="w-10 h-10 text-accent-gold" />
                      </div>
                      <h3 className="mafia-heading text-2xl text-white mb-4">Demande Reçue</h3>
                      <p className="text-white/80 mb-6">
                        Merci pour votre confiance. Notre équipe vous recontacte dans l&apos;heure 
                        pour confirmer votre réservation.
                      </p>
                      <Button 
                        variant="gold" 
                        size="lg" 
                        asChild 
                        className="premium-shadow"
                      >
                        <Link href="/">RETOUR À L&apos;ACCUEIL</Link>
                      </Button>
                    </div>
                  ) : (
                    <form className="space-y-6" onSubmit={handleSubmit(handleSubmitBooking)}>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-white font-medium mb-2 tracking-wide">
                            NOM COMPLET *
                          </label>
                          <Input 
                            className="luxury-card border-accent-gold/30 bg-background-tertiary text-white placeholder-white/40 focus:border-accent-gold" 
                            placeholder="Votre nom et prénom"
                            {...register("name")} 
                          />
                          {errors.name && (
                            <p className="text-red-400 text-xs mt-1">Nom requis</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-white font-medium mb-2 tracking-wide">
                            EMAIL *
                          </label>
                          <Input 
                            className="luxury-card border-accent-gold/30 bg-background-tertiary text-white placeholder-white/40 focus:border-accent-gold" 
                            type="email" 
                            placeholder="votre@email.com"
                            {...register("email")} 
                          />
                          {errors.email && (
                            <p className="text-red-400 text-xs mt-1">Email valide requis</p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-white font-medium mb-2 tracking-wide">
                            TÉLÉPHONE
                          </label>
                          <Input 
                            className="luxury-card border-accent-gold/30 bg-background-tertiary text-white placeholder-white/40 focus:border-accent-gold" 
                            placeholder="+33 6 XX XX XX XX"
                            {...register("phone")} 
                          />
                        </div>
                        <div>
                          <label className="block text-white font-medium mb-2 tracking-wide">
                            SERVICE SOUHAITÉ
                          </label>
                          <Input 
                            className="luxury-card border-accent-gold/30 bg-background-tertiary text-white placeholder-white/40 focus:border-accent-gold" 
                            placeholder="Transfert, Événement, Tour..."
                            {...register("service")} 
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-white font-medium mb-2 tracking-wide">
                            POINT DE DÉPART *
                          </label>
                          <Input 
                            className="luxury-card border-accent-gold/30 bg-background-tertiary text-white placeholder-white/40 focus:border-accent-gold" 
                            placeholder="Adresse de prise en charge"
                            {...register("pickup")} 
                          />
                          {errors.pickup && (
                            <p className="text-red-400 text-xs mt-1">Point de départ requis</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-white font-medium mb-2 tracking-wide">
                            DESTINATION *
                          </label>
                          <Input 
                            className="luxury-card border-accent-gold/30 bg-background-tertiary text-white placeholder-white/40 focus:border-accent-gold" 
                            placeholder="Adresse de destination"
                            {...register("dropoff")} 
                          />
                          {errors.dropoff && (
                            <p className="text-red-400 text-xs mt-1">Destination requise</p>
                          )}
                        </div>
                      </div>

                      <div>
                        <label className="block text-white font-medium mb-2 tracking-wide">
                          DATE & HEURE *
                        </label>
                        <Input 
                          className="luxury-card border-accent-gold/30 bg-background-tertiary text-white focus:border-accent-gold" 
                          type="datetime-local" 
                          {...register("datetime")} 
                        />
                        {errors.datetime && (
                          <p className="text-red-400 text-xs mt-1">Date et heure requises</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-white font-medium mb-2 tracking-wide">
                          DEMANDES SPÉCIALES
                        </label>
                        <Textarea 
                          className="luxury-card border-accent-gold/30 bg-background-tertiary text-white placeholder-white/40 focus:border-accent-gold min-h-[120px]" 
                          rows={4} 
                          placeholder="Bagages spéciaux, arrêts intermédiaires, préférences..."
                          {...register("message")} 
                        />
                      </div>

                      <Button 
                        type="submit" 
                        disabled={isSubmitting} 
                        variant="gold"
                        size="lg"
                        className="w-full mafia-glow premium-shadow text-lg py-5"
                      >
                        <Send className="w-5 h-5 mr-3" />
                        {isSubmitting ? "ENVOI EN COURS..." : "ENVOYER LA DEMANDE"}
                      </Button>
                    </form>
                  )}
                </div>
              </Reveal>
            </div>

            {/* Contact Info Sidebar */}
            <div className="lg:col-span-1">
              <Reveal delay={300}>
                <div className="luxury-card rounded-2xl p-8 sticky top-8">
                  <h3 className="mafia-heading text-2xl text-white mb-6">
                    Informations 
                    <span className="golden-accent block">Pratiques</span>
                  </h3>

                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 luxury-card rounded-full flex items-center justify-center flex-shrink-0">
                        <Clock className="w-6 h-6 text-accent-gold" />
                      </div>
                      <div>
                        <h4 className="text-white font-semibold mb-1">Disponibilité</h4>
                        <p className="text-white/80 text-sm">24h/24 - 7j/7</p>
                        <p className="text-accent-gold text-xs">Service d&apos;urgence inclus</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 luxury-card rounded-full flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-6 h-6 text-accent-gold" />
                      </div>
                      <div>
                        <h4 className="text-white font-semibold mb-1">Zone de Service</h4>
                        <p className="text-white/80 text-sm">Côte d&apos;Azur & Italie du Nord</p>
                        <p className="text-accent-gold text-xs">Extensions possibles</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 luxury-card rounded-full flex items-center justify-center flex-shrink-0">
                        <Mail className="w-6 h-6 text-accent-gold" />
                      </div>
                      <div>
                        <h4 className="text-white font-semibold mb-1">Temps de Réponse</h4>
                        <p className="text-white/80 text-sm">Moins d&apos;1 heure</p>
                        <p className="text-accent-gold text-xs">Confirmation garantie</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-accent-gold/20">
                    <div className="luxury-card rounded-xl overflow-hidden aspect-square relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-accent-gold/10 via-background-tertiary to-accent-burgundy/10" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <Crown className="w-12 h-12 text-accent-gold mx-auto mb-4" />
                          <h4 className="text-white font-semibold mb-2">QR Code</h4>
                          <p className="text-white/60 text-xs">Accès direct au site</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}


