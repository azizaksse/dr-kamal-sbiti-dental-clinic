"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format, addDays } from "date-fns";
import { Calendar, Clock, User, Phone, Mail, FileText, CheckCircle2, AlertCircle } from "lucide-react";
import Button from "./ui/Button";
import Input from "./ui/Input";
import { TimeSlot } from "@/lib/google-calendar";

// Form validation schema
const appointmentSchema = z.object({
  patientName: z.string().min(2, "Name must be at least 2 characters"),
  patientEmail: z.string().email("Please enter a valid email address"),
  patientPhone: z.string().min(10, "Please enter a valid phone number"),
  serviceType: z.string().min(1, "Please select a service"),
  date: z.string().min(1, "Please select a date"),
  time: z.string().min(1, "Please select a time"),
  notes: z.string().optional(),
});

type AppointmentForm = z.infer<typeof appointmentSchema>;

interface AppointmentBookingProps {
  className?: string;
}

const serviceTypes = [
  "General Consultation",
  "Teeth Cleaning",
  "Tooth Filling",
  "Root Canal",
  "Dental Crown",
  "Tooth Extraction",
  "Teeth Whitening",
  "Orthodontic Consultation",
  "Emergency Appointment",
];

export default function AppointmentBooking({ className }: AppointmentBookingProps) {
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [checkingAvailability, setCheckingAvailability] = useState(false);
  const [bookingStatus, setBookingStatus] = useState<"idle" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

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

  // Generate available dates (next 30 days, excluding weekends)
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 1; i <= 30; i++) {
      const date = addDays(today, i);
      const dayOfWeek = date.getDay();
      
      // Skip weekends (0 = Sunday, 6 = Saturday)
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        dates.push({
          value: format(date, "yyyy-MM-dd"),
          label: format(date, "MMMM dd, yyyy (EEEE)"),
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
        throw new Error("Failed to check availability");
      }
      
      const slots: TimeSlot[] = await response.json();
      setAvailableSlots(slots);
    } catch (error) {
      console.error("Error checking availability:", error);
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
        throw new Error(errorData.message || "Failed to book appointment");
      }

      await response.json();
      
      setBookingStatus("success");
      setStatusMessage("Your appointment has been successfully booked! You'll receive a confirmation email shortly.");
      reset();
      setAvailableSlots([]);
      setSelectedDate("");
    } catch (error) {
      console.error("Error booking appointment:", error);
      setBookingStatus("error");
      setStatusMessage(error instanceof Error ? error.message : "An error occurred while booking your appointment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const formatTimeSlot = (slot: TimeSlot) => {
    const startTime = new Date(slot.start);
    const endTime = new Date(slot.end);
    return `${format(startTime, "h:mm a")} - ${format(endTime, "h:mm a")}`;
  };

  return (
    <div className={`max-w-2xl mx-auto p-6 bg-background-secondary/80 backdrop-blur-sm rounded-2xl border border-accent-gold/20 ${className}`}>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Book Your Appointment</h2>
        <p className="text-white/60">Schedule your dental visit in just a few simple steps</p>
      </div>

      {bookingStatus === "success" && (
        <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center gap-3">
          <CheckCircle2 className="h-5 w-5 text-green-400" />
          <p className="text-green-400">{statusMessage}</p>
        </div>
      )}

      {bookingStatus === "error" && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3">
          <AlertCircle className="h-5 w-5 text-red-400" />
          <p className="text-red-400">{statusMessage}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Personal Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <User className="h-5 w-5" />
            Personal Information
          </h3>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Full Name *
              </label>
              <Input
                {...register("patientName")}
                placeholder="Enter your full name"
                className={errors.patientName ? "border-red-500" : ""}
              />
              {errors.patientName && (
                <p className="mt-1 text-sm text-red-400">{errors.patientName.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Phone Number *
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/40" />
                <Input
                  {...register("patientPhone")}
                  placeholder="(123) 456-7890"
                  className={`pl-10 ${errors.patientPhone ? "border-red-500" : ""}`}
                />
              </div>
              {errors.patientPhone && (
                <p className="mt-1 text-sm text-red-400">{errors.patientPhone.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Email Address *
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/40" />
              <Input
                {...register("patientEmail")}
                type="email"
                placeholder="your.email@example.com"
                className={`pl-10 ${errors.patientEmail ? "border-red-500" : ""}`}
              />
            </div>
            {errors.patientEmail && (
              <p className="mt-1 text-sm text-red-400">{errors.patientEmail.message}</p>
            )}
          </div>
        </div>

        {/* Service Selection */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Service Selection
          </h3>
          
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Type of Service *
            </label>
            <select
              {...register("serviceType")}
              className={`block w-full rounded-lg border border-accent-gold/20 bg-background-tertiary/50 backdrop-blur-sm px-4 py-3 text-sm text-white outline-none transition-all duration-300 focus:border-accent-gold focus:bg-background-tertiary focus:shadow-lg focus:shadow-accent-gold/10 hover:border-accent-gold/40 ${errors.serviceType ? "border-red-500" : ""}`}
            >
              <option value="">Select a service</option>
              {serviceTypes.map((service) => (
                <option key={service} value={service} className="bg-background-tertiary text-white">
                  {service}
                </option>
              ))}
            </select>
            {errors.serviceType && (
              <p className="mt-1 text-sm text-red-400">{errors.serviceType.message}</p>
            )}
          </div>
        </div>

        {/* Date and Time Selection */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Date & Time Selection
          </h3>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Preferred Date *
              </label>
              <select
                {...register("date")}
                className={`block w-full rounded-lg border border-accent-gold/20 bg-background-tertiary/50 backdrop-blur-sm px-4 py-3 text-sm text-white outline-none transition-all duration-300 focus:border-accent-gold focus:bg-background-tertiary focus:shadow-lg focus:shadow-accent-gold/10 hover:border-accent-gold/40 ${errors.date ? "border-red-500" : ""}`}
              >
                <option value="">Select a date</option>
                {getAvailableDates().map((date) => (
                  <option key={date.value} value={date.value} className="bg-background-tertiary text-white">
                    {date.label}
                  </option>
                ))}
              </select>
              {errors.date && (
                <p className="mt-1 text-sm text-red-400">{errors.date.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Available Times *
              </label>
              {checkingAvailability ? (
                <div className="flex items-center justify-center py-3 text-white/60">
                  <Clock className="h-4 w-4 animate-spin mr-2" />
                  Checking availability...
                </div>
              ) : (
                <select
                  {...register("time")}
                  className={`block w-full rounded-lg border border-accent-gold/20 bg-background-tertiary/50 backdrop-blur-sm px-4 py-3 text-sm text-white outline-none transition-all duration-300 focus:border-accent-gold focus:bg-background-tertiary focus:shadow-lg focus:shadow-accent-gold/10 hover:border-accent-gold/40 ${errors.time ? "border-red-500" : ""}`}
                  disabled={!selectedDate || availableSlots.length === 0}
                >
                  <option value="">
                    {selectedDate ? "Select a time" : "Select a date first"}
                  </option>
                  {availableSlots
                    .filter((slot) => slot.available)
                    .map((slot) => (
                      <option
                        key={slot.start}
                        value={format(new Date(slot.start), "HH:mm")}
                        className="bg-background-tertiary text-white"
                      >
                        {formatTimeSlot(slot)}
                      </option>
                    ))}
                </select>
              )}
              {errors.time && (
                <p className="mt-1 text-sm text-red-400">{errors.time.message}</p>
              )}
              {selectedDate && availableSlots.filter(slot => slot.available).length === 0 && !checkingAvailability && (
                <p className="mt-1 text-sm text-yellow-400">No available times for this date. Please select another date.</p>
              )}
            </div>
          </div>
        </div>

        {/* Additional Notes */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Additional Notes (Optional)
            </label>
            <textarea
              {...register("notes")}
              rows={3}
              placeholder="Any specific concerns or requests..."
              className="block w-full rounded-lg border border-accent-gold/20 bg-background-tertiary/50 backdrop-blur-sm px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none transition-all duration-300 focus:border-accent-gold focus:bg-background-tertiary focus:shadow-lg focus:shadow-accent-gold/10 hover:border-accent-gold/40 resize-none"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <Button
            type="submit"
            variant="gold"
            size="lg"
            className="w-full"
            disabled={loading}
          >
            {loading ? (
              <>
                <Clock className="h-4 w-4 animate-spin mr-2" />
                Booking Appointment...
              </>
            ) : (
              <>
                <Calendar className="h-4 w-4 mr-2" />
                Book Appointment
              </>
            )}
          </Button>
        </div>

        <div className="text-center text-sm text-white/60">
          <p>
            By booking an appointment, you agree to our terms of service and privacy policy.
            You&apos;ll receive a confirmation email once your appointment is scheduled.
          </p>
        </div>
      </form>
    </div>
  );
}