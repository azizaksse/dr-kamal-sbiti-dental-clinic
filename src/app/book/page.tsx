import { Metadata } from "next";
import Container from "@/components/Container";
import AppointmentBooking from "@/components/AppointmentBooking";

export const metadata: Metadata = {
  title: "Book Appointment | Dental Clinic",
  description: "Schedule your dental appointment online. Quick and easy booking with instant confirmation.",
};

export default function BookingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background-primary via-background-secondary to-background-tertiary pt-20">
      <Container>
        <div className="py-16">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Book Your{" "}
              <span className="bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent">
                Dental Appointment
              </span>
            </h1>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Schedule your visit with our experienced dental professionals. 
              Choose your preferred date and time, and receive instant confirmation.
            </p>
          </div>

          {/* Booking Form */}
          <AppointmentBooking />

          {/* Information Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <div className="bg-background-secondary/60 backdrop-blur-sm rounded-xl p-6 border border-accent-gold/10">
              <div className="w-12 h-12 bg-accent-primary/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-accent-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Flexible Scheduling</h3>
              <p className="text-white/60">
                Choose from available time slots that work best for your schedule. 
                We offer appointments Monday through Friday.
              </p>
            </div>

            <div className="bg-background-secondary/60 backdrop-blur-sm rounded-xl p-6 border border-accent-gold/10">
              <div className="w-12 h-12 bg-accent-primary/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-accent-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Instant Confirmation</h3>
              <p className="text-white/60">
                Receive immediate confirmation of your appointment via email. 
                Your appointment will be automatically added to our calendar.
              </p>
            </div>

            <div className="bg-background-secondary/60 backdrop-blur-sm rounded-xl p-6 border border-accent-gold/10">
              <div className="w-12 h-12 bg-accent-primary/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-accent-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Automatic Reminders</h3>
              <p className="text-white/60">
                Get reminded about your upcoming appointment via email. 
                We&apos;ll send you a friendly reminder 24 hours before your visit.
              </p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="text-center mt-16 p-8 bg-background-secondary/40 backdrop-blur-sm rounded-xl border border-accent-gold/10">
            <h3 className="text-xl font-semibold text-white mb-4">Need Help?</h3>
            <p className="text-white/70 mb-6">
              If you have any questions or need to make special arrangements, 
              please don&apos;t hesitate to contact us directly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href="tel:+1234567890" 
                className="flex items-center gap-2 text-accent-primary hover:text-accent-secondary transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call Us: (123) 456-7890
              </a>
              <span className="text-white/40 hidden sm:block">•</span>
              <a 
                href="mailto:info@dentalclinic.com" 
                className="flex items-center gap-2 text-accent-primary hover:text-accent-secondary transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Email: info@dentalclinic.com
              </a>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}