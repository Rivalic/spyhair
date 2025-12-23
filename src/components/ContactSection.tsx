import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const ContactSection = () => {
  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-background">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_hsl(43_74%_49%_/_0.05)_0%,_transparent_70%)]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - CTA */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-primary uppercase tracking-widest text-sm font-medium">
              Get Started
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mt-4 mb-6">
              Ready to Transform{" "}
              <span className="text-gradient-gold italic">Your Look?</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Book a free, private consultation with our hair specialists. We'll help
              you find the perfect hair system that matches your style, lifestyle,
              and budget.
            </p>

            {/* Features */}
            <div className="space-y-4 mb-10">
              {[
                "Free private consultation",
                "No obligation assessment",
                "Custom matching service",
                "Financing options available",
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                    <ArrowRight className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-foreground">{feature}</span>
                </motion.div>
              ))}
            </div>

            <Button variant="gold" size="xl" className="group">
              Book Free Consultation
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>

          {/* Right - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-3xl p-8 md:p-10"
          >
            <h3 className="font-display text-2xl font-bold mb-8">Contact Information</h3>

            <div className="space-y-6">
              {/* Phone */}
              <a
                href="tel:+919876543210"
                className="flex items-start gap-4 group hover:bg-secondary/30 p-4 rounded-xl transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Call Us</div>
                  <div className="font-medium text-foreground">+91 98765 43210</div>
                  <div className="text-sm text-muted-foreground">Mon-Sat, 10am-7pm</div>
                </div>
              </a>

              {/* Email */}
              <a
                href="mailto:info@crownhairsystems.com"
                className="flex items-start gap-4 group hover:bg-secondary/30 p-4 rounded-xl transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Email Us</div>
                  <div className="font-medium text-foreground">info@crownhairsystems.com</div>
                  <div className="text-sm text-muted-foreground">We reply within 24 hours</div>
                </div>
              </a>

              {/* Location */}
              <div className="flex items-start gap-4 p-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Visit Our Studio</div>
                  <div className="font-medium text-foreground">
                    123, Linking Road, Bandra West
                  </div>
                  <div className="text-sm text-muted-foreground">Mumbai, Maharashtra 400050</div>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-4 p-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Working Hours</div>
                  <div className="font-medium text-foreground">Mon - Sat: 10:00 AM - 7:00 PM</div>
                  <div className="text-sm text-muted-foreground">Sunday: By Appointment</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
