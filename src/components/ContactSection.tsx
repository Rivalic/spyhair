import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const ContactSection = () => {
  return (
    <section id="contact" className="py-24 bg-secondary border-y-[5px] border-border relative overflow-hidden">
      <div className="absolute inset-0 bg-dots opacity-30 pointer-events-none" />

      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left - CTA */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block bg-accent text-accent-foreground border-[3px] border-border px-4 py-1 font-bold uppercase tracking-widest text-sm shadow-brutal-sm -rotate-1">
              Get Started
            </span>
            <h2 className="font-display text-4xl md:text-6xl mt-6 mb-6 text-foreground leading-[0.95]">
              READY TO{" "}
              <span className="inline-block bg-primary text-primary-foreground px-3 border-[4px] border-border shadow-brutal rotate-1">
                TRANSFORM
              </span>{" "}
              YOUR LOOK?
            </h2>
            <p className="text-foreground text-lg mb-8 leading-relaxed font-medium bg-card border-[3px] border-border p-4 shadow-brutal-sm">
              Book a free private consultation with our hair specialists. We'll help you
              find the perfect hair system that matches your style, lifestyle, and budget.
            </p>

            <div className="space-y-3 mb-10">
              {["Free private consultation", "No obligation assessment", "Custom matching service", "Financing options available"].map(
                (feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.08 }}
                    className="flex items-center gap-3 bg-card border-[3px] border-border p-3 shadow-brutal-sm"
                  >
                    <div className="w-7 h-7 bg-primary border-[2px] border-border flex items-center justify-center flex-shrink-0">
                      <ArrowRight className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <span className="text-foreground font-bold uppercase text-sm">{feature}</span>
                  </motion.div>
                )
              )}
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
            transition={{ duration: 0.6 }}
            className="bg-card border-[4px] border-border shadow-brutal-lg p-6 md:p-8"
          >
            <h3 className="font-display text-2xl md:text-3xl mb-6 text-foreground uppercase border-b-[3px] border-border pb-4">
              Contact Info
            </h3>

            <div className="space-y-4">
              {/* Phone */}
              <a
                href="tel:+917014512123"
                className="flex items-start gap-4 bg-primary border-[3px] border-border p-4 shadow-brutal-sm hover:-translate-x-1 hover:-translate-y-1 hover:shadow-brutal transition-all duration-150"
              >
                <div className="w-12 h-12 bg-foreground text-background border-[3px] border-border flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase text-foreground mb-1">Call Us</div>
                  <div className="font-display text-lg text-foreground">+91 70145 12123</div>
                  <div className="text-xs font-bold uppercase text-foreground/70">Mon-Sat, 10am-7pm</div>
                </div>
              </a>

              {/* Email */}
              <a
                href="mailto:info@3sgoldenhair.com"
                className="flex items-start gap-4 bg-accent border-[3px] border-border p-4 shadow-brutal-sm hover:-translate-x-1 hover:-translate-y-1 hover:shadow-brutal transition-all duration-150"
              >
                <div className="w-12 h-12 bg-foreground text-background border-[3px] border-border flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase text-foreground mb-1">Email Us</div>
                  <div className="font-display text-base text-foreground break-all">
                    info@3sgoldenhair.com
                  </div>
                  <div className="text-xs font-bold uppercase text-foreground/70">Reply within 24 hours</div>
                </div>
              </a>

              {/* Location */}
              <div className="flex items-start gap-4 bg-secondary border-[3px] border-border p-4 shadow-brutal-sm">
                <div className="w-12 h-12 bg-foreground text-background border-[3px] border-border flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase text-foreground mb-1">Visit Studio</div>
                  <div className="font-display text-base text-foreground">
                    123 Linking Road, Bandra West
                  </div>
                  <div className="text-xs font-bold uppercase text-foreground/70">Mumbai 400050</div>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-4 bg-card border-[3px] border-border p-4 shadow-brutal-sm">
                <div className="w-12 h-12 bg-foreground text-background border-[3px] border-border flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase text-foreground mb-1">Hours</div>
                  <div className="font-display text-base text-foreground">Mon-Sat 10am-7pm</div>
                  <div className="text-xs font-bold uppercase text-foreground/70">Sun: By Appointment</div>
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
