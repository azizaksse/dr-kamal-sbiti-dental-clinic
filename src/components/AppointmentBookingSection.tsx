"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format, addDays, addWeeks } from "date-fns";
import { motion } from "framer-motion";
import { Calendar, Clock, User, Phone, Mail, FileText, CheckCircle2, AlertCircle, Star } from "lucide-react";
import Container from "./Container";
import Section from "./Section";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Reveal from "./Reveal";

// Form validation schema
const appointmentSchema = z.object({
  patientName: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  patientEmail: z.string().email("Veuillez entrer une adresse email valide"),
  patientPhone: z.string().min(10, "Veuillez entrer un numéro de téléphone valide"),
  serviceType: z.string().min(1, "Veuillez sélectionner un service"),
  date: z.string().min(1, "Veuillez sélectionner une date"),
  time: z.string().min(1, "Veuillez sélectionner un horaire"),
  notes: z.string().optional(),
});

type AppointmentForm = z.infer<typeof appointmentSchema>;

interface TimeSlot {
  start: string;
  end: string;
  available: boolean;
}

const dentalServices = [
  { value: "consultation", label: "Consultation", price: "2,500 DA", icon: "👨‍⚕️" },
  { value: "cleaning", label: "Détartrage", price: "4,000 DA", icon: "🦷" },
  { value: "filling", label: "Plombage", price: "6,000 DA", icon: "🔧" },
  { value: "crown", label: "Couronne", price: "35,000 DA", icon: "👑" },
  { value: "whitening", label: "Blanchiment", price: "15,000 DA", icon: "✨" },
  { value: "implant", label: "Implant", price: "80,000 DA", icon: "🔩" },
  { value: "orthodontics", label: "Orthodontie", price: "120,000 DA", icon: "🦷" },
  { value: "emergency", label: "Urgence", price: "Variable", icon: "🚨" },
];

export default function AppointmentBookingSection() {
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [checkingAvailability, setCheckingAvailability] = useState(false);
  const [bookingStatus, setBookingStatus] = useState<"idle" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [selectedService, setSelectedService] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<AppointmentForm>({
    resolver: zodResolver(appointmentSchema),
  });

  const watchedDate = watch("date");

  // Generate available dates (next 2 weeks, excluding weekends)
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    const twoWeeksFromNow = addWeeks(today, 2);
    
    for (let i = 1; i <= 14; i++) {
      const date = addDays(today, i);
      const dayOfWeek = date.getDay();
      
      if (date <= twoWeeksFromNow && dayOfWeek !== 0 && dayOfWeek !== 6) {
        dates.push({
          value: format(date, "yyyy-MM-dd"),
          label: format(date, "EEEE dd MMMM"),
          shortLabel: format(date, "dd/MM"),
        });
      }
    }
    
    return dates;
  };

  // Check availability when date changes
  useEffect(() => {
    if (watchedDate && watchedDate !== selectedDate) {
      checkAvailability(watchedDate);
      setSelectedDate(watchedDate);
    }
  }, [watchedDate, selectedDate]);

  const checkAvailability = async (date: string) => {
    setCheckingAvailability(true);
    try {
      const response = await fetch(`/api/appointments/availability?date=${date}`);
      if (!response.ok) {
        throw new Error("Impossible de vérifier la disponibilité");
      }
      
      const slots: TimeSlot[] = await response.json();
      setAvailableSlots(slots);
    } catch (error) {
      console.error("Erreur lors de la vérification de disponibilité:", error);
      setAvailableSlots([]);
    } finally {
      setCheckingAvailability(false);
    }
  };

  const onSubmit = async (data: AppointmentForm) => {
    setLoading(true);
    setBookingStatus("idle");
    
    try {
      const response = await fetch("/api/appointments/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Échec de la réservation");
      }

      await response.json();
      
      setBookingStatus("success");
      setStatusMessage("Votre rendez-vous a été réservé avec succès ! Vous recevrez un email de confirmation sous peu.");
      reset();
      setAvailableSlots([]);
      setSelectedDate("");
      setSelectedService("");
    } catch (error) {
      console.error("Erreur lors de la réservation:", error);
      setBookingStatus("error");
      setStatusMessage(error instanceof Error ? error.message : "Une erreur s'est produite. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  const formatTimeSlot = (slot: TimeSlot) => {
    const startTime = new Date(slot.start);
    const endTime = new Date(slot.end);
    return `${format(startTime, "HH:mm")} - ${format(endTime, "HH:mm")}`;
  };

  const getSelectedServiceDetails = () => {
    return dentalServices.find(service => service.value === selectedService);
  };

  return (
    <Section className="relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/10 via-transparent to-accent-secondary/10" />
        <div className="film-grain" />
      </div>
      
      <Container>
        <div className="relative z-10">
          {/* Section Header */}
          <Reveal className="text-center mb-16">
            <div className="inline-block px-6 py-3 luxury-card text-accent-primary text-sm font-semibold tracking-widest uppercase mb-6">
              PRENDRE RENDEZ-VOUS
            </div>
            <h2 className="mafia-heading text-4xl md:text-5xl lg:text-6xl text-accent-text tracking-tight leading-tight mb-6">
              Réservez Votre{" "}
              <span className="relative">
                <span className="bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent">
                  Consultation
                </span>
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-accent-primary to-accent-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </span>
            </h2>
            <p className="text-lg text-accent-text-light max-w-2xl mx-auto">
              Planifiez votre visite en quelques clics. Choisissez votre service, 
              votre créneau préféré et recevez une confirmation instantanée.
            </p>
          </Reveal>

          {/* Status Messages */}
          {bookingStatus === "success" && (
            <Reveal>
              <motion.div 
                className="mb-8 p-6 bg-accent-success/10 border border-accent-success/20 rounded-2xl luxury-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-6 w-6 text-accent-success" />
                  <p className="text-accent-success font-medium">{statusMessage}</p>
                </div>
              </motion.div>
            </Reveal>
          )}

          {bookingStatus === "error" && (
            <Reveal>
              <motion.div 
                className="mb-8 p-6 bg-red-500/10 border border-red-500/20 rounded-2xl luxury-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-center gap-3">
                  <AlertCircle className="h-6 w-6 text-red-500" />
                  <p className="text-red-500 font-medium">{statusMessage}</p>
                </div>
              </motion.div>
            </Reveal>
          )}

          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Services Selection */}
            <Reveal className="lg:col-span-1">
              <div className="luxury-card p-6 h-fit sticky top-8">
                <h3 className="lux-heading text-2xl font-bold text-accent-text mb-6 flex items-center gap-3">
                  <Star className="h-6 w-6 text-accent-primary" />
                  Nos Services
                </h3>
                
                <div className="space-y-3">
                  {dentalServices.map((service) => (
                    <motion.div
                      key={service.value}
                      className={`p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer ${
                        selectedService === service.value
                          ? "border-accent-primary bg-accent-primary/5"
                          : "border-accent-border hover:border-accent-primary/50"
                      }`}
                      onClick={() => setSelectedService(service.value)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{service.icon}</span>
                          <div>
                            <p className="font-medium text-accent-text">{service.label}</p>
                            <p className="text-sm text-accent-text-light">{service.price}</p>
                          </div>
                        </div>
                        {selectedService === service.value && (
                          <CheckCircle2 className="h-5 w-5 text-accent-primary" />
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {selectedService && (
                  <motion.div 
                    className="mt-6 p-4 bg-accent-primary/5 rounded-xl border border-accent-primary/20"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{getSelectedServiceDetails()?.icon}</span>
                      <div>
                        <p className="font-medium text-accent-primary">
                          {getSelectedServiceDetails()?.label}
                        </p>
                        <p className="text-sm text-accent-text-light">
                          Prix: {getSelectedServiceDetails()?.price}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </Reveal>

            {/* Booking Form */}
            <Reveal className="lg:col-span-2">
              <div className="luxury-card p-8">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                  
                  {/* Personal Information */}
                  <div className="space-y-6">
                    <h3 className="lux-heading text-xl font-bold text-accent-text flex items-center gap-3">
                      <User className="h-5 w-5 text-accent-primary" />
                      Informations Personnelles
                    </h3>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-accent-text mb-2">
                          Nom Complet *
                        </label>
                        <Input
                          {...register("patientName")}
                          placeholder="Votre nom complet"
                          className={`glass-morphism border-accent-border focus:border-accent-primary ${errors.patientName ? "border-red-500" : ""}`}
                        />
                        {errors.patientName && (
                          <p className="mt-1 text-sm text-red-500">{errors.patientName.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-accent-text mb-2">
                          Téléphone *
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-accent-text-light" />
                          <Input
                            {...register("patientPhone")}
                            placeholder="06 12 34 56 78"
                            className={`glass-morphism border-accent-border focus:border-accent-primary pl-10 ${errors.patientPhone ? "border-red-500" : ""}`}
                          />
                        </div>
                        {errors.patientPhone && (
                          <p className="mt-1 text-sm text-red-500">{errors.patientPhone.message}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-accent-text mb-2">
                        Adresse Email *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-accent-text-light" />
                        <Input
                          {...register("patientEmail")}
                          type="email"
                          placeholder="votre.email@example.com"
                          className={`glass-morphism border-accent-border focus:border-accent-primary pl-10 ${errors.patientEmail ? "border-red-500" : ""}`}
                        />
                      </div>
                      {errors.patientEmail && (
                        <p className="mt-1 text-sm text-red-500">{errors.patientEmail.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Service Selection */}
                  <div className="space-y-6">
                    <h3 className="lux-heading text-xl font-bold text-accent-text flex items-center gap-3">
                      <FileText className="h-5 w-5 text-accent-primary" />
                      Type de Service
                    </h3>
                    
                    <div>
                      <label className="block text-sm font-semibold text-accent-text mb-2">
                        Service Souhaité *
                      </label>
                      <select
                        {...register("serviceType")}
                        className={`w-full glass-morphism border border-accent-border focus:border-accent-primary rounded-lg px-4 py-3 text-accent-text bg-white/80 ${errors.serviceType ? "border-red-500" : ""}`}
                        value={selectedService}
                        onChange={(e) => setSelectedService(e.target.value)}
                      >
                        <option value="">Sélectionnez un service</option>
                        {dentalServices.map((service) => (
                          <option key={service.value} value={service.value}>
                            {service.label} - {service.price}
                          </option>
                        ))}
                      </select>
                      {errors.serviceType && (
                        <p className="mt-1 text-sm text-red-500">{errors.serviceType.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Date and Time Selection */}
                  <div className="space-y-6">
                    <h3 className="lux-heading text-xl font-bold text-accent-text flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-accent-primary" />
                      Date & Heure
                    </h3>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-accent-text mb-2">
                          Date Préférée *
                        </label>
                        <select
                          {...register("date")}
                          className={`w-full glass-morphism border border-accent-border focus:border-accent-primary rounded-lg px-4 py-3 text-accent-text bg-white/80 ${errors.date ? "border-red-500" : ""}`}
                        >
                          <option value="">Choisir une date</option>
                          {getAvailableDates().map((date) => (
                            <option key={date.value} value={date.value}>
                              {date.label}
                            </option>
                          ))}
                        </select>
                        {errors.date && (
                          <p className="mt-1 text-sm text-red-500">{errors.date.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-accent-text mb-2">
                          Créneaux Disponibles *
                        </label>
                        {checkingAvailability ? (
                          <div className="flex items-center justify-center py-3 text-accent-text-light bg-white/80 rounded-lg border border-accent-border">
                            <Clock className="h-4 w-4 animate-spin mr-2" />
                            Vérification...
                          </div>
                        ) : (
                          <select
                            {...register("time")}
                            className={`w-full glass-morphism border border-accent-border focus:border-accent-primary rounded-lg px-4 py-3 text-accent-text bg-white/80 ${errors.time ? "border-red-500" : ""}`}
                            disabled={!selectedDate || availableSlots.length === 0}
                          >
                            <option value="">
                              {selectedDate ? "Choisir un horaire" : "Sélectionner d'abord une date"}
                            </option>
                            {availableSlots
                              .filter((slot) => slot.available)
                              .map((slot) => (
                                <option
                                  key={slot.start}
                                  value={format(new Date(slot.start), "HH:mm")}
                                >
                                  {formatTimeSlot(slot)}
                                </option>
                              ))}
                          </select>
                        )}
                        {errors.time && (
                          <p className="mt-1 text-sm text-red-500">{errors.time.message}</p>
                        )}
                        {selectedDate && availableSlots.filter(slot => slot.available).length === 0 && !checkingAvailability && (
                          <p className="mt-1 text-sm text-amber-600">Aucun créneau disponible pour cette date.</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Additional Notes */}
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-accent-text mb-2">
                        Notes Supplémentaires (Optionnel)
                      </label>
                      <textarea
                        {...register("notes")}
                        rows={4}
                        placeholder="Décrivez vos préoccupations ou demandes spéciales..."
                        className="w-full glass-morphism border border-accent-border focus:border-accent-primary rounded-lg px-4 py-3 text-accent-text bg-white/80 resize-none"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-6">
                    <Button
                      type="submit"
                      variant="gold"
                      size="lg"
                      className="w-full premium-shadow"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Clock className="h-5 w-5 animate-spin mr-2" />
                          Réservation en cours...
                        </>
                      ) : (
                        <>
                          <Calendar className="h-5 w-5 mr-2" />
                          Confirmer le Rendez-vous
                        </>
                      )}
                    </Button>

                    <p className="mt-4 text-center text-sm text-accent-text-light">
                      En confirmant, vous acceptez nos conditions d&apos;utilisation et notre politique de confidentialité.
                      Vous recevrez un email de confirmation immédiatement.
                    </p>
                  </div>
                </form>
              </div>
            </Reveal>
          </div>

          {/* Additional Information */}
          <Reveal className="mt-16">
            <div className="grid md:grid-cols-3 gap-6">
              <motion.div 
                className="luxury-card p-6 text-center"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-12 h-12 bg-accent-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-6 w-6 text-accent-primary" />
                </div>
                <h3 className="lux-heading text-lg font-bold text-accent-text mb-2">Horaires Flexibles</h3>
                <p className="text-accent-text-light">
                  Du lundi au vendredi, 9h-17h. Choisissez le créneau qui vous convient le mieux.
                </p>
              </motion.div>

              <motion.div 
                className="luxury-card p-6 text-center"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-12 h-12 bg-accent-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="h-6 w-6 text-accent-primary" />
                </div>
                <h3 className="lux-heading text-lg font-bold text-accent-text mb-2">Confirmation Instantanée</h3>
                <p className="text-accent-text-light">
                  Recevez immédiatement votre confirmation par email avec tous les détails.
                </p>
              </motion.div>

              <motion.div 
                className="luxury-card p-6 text-center"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-12 h-12 bg-accent-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="h-6 w-6 text-accent-primary" />
                </div>
                <h3 className="lux-heading text-lg font-bold text-accent-text mb-2">Soins d&apos;Excellence</h3>
                <p className="text-accent-text-light">
                  Équipe de spécialistes et équipements modernes pour votre confort.
                </p>
              </motion.div>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}