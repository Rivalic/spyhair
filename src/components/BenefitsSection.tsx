import { motion } from "framer-motion";
import { Shield, Award, Users, Clock, Sparkles, Heart } from "lucide-react";

const benefits = [
  { icon: Shield, title: "UNDETECTABLE QUALITY", description: "So natural, even your closest friends won't know the difference." },
  { icon: Award, title: "PREMIUM MATERIALS", description: "100% human hair sourced ethically with medical-grade base materials." },
  { icon: Users, title: "EXPERT CONSULTATION", description: "Specialists provide personalized guidance to find your perfect match." },
  { icon: Clock, title: "LONG-LASTING", description: "With proper care, our systems last 6-12 months for excellent value." },
  { icon: Sparkles, title: "CUSTOM FITTING", description: "Tailored to your head shape, hairline, and style preferences." },
  { icon: Heart, title: "AFTERCARE SUPPORT", description: "Comprehensive guidance on maintenance, styling, and care." },
];

const cardBgs = ["bg-primary", "bg-accent", "bg-secondary", "bg-card", "bg-primary", "bg-accent"];

const BenefitsSection = () => {
  return (
    <section id="benefits" className="py-24 bg-secondary border-y-[5px] border-border relative">
      <div className="absolute inset-0 bg-dots opacity-30 pointer-events-none" />

      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block bg-primary text-primary-foreground border-[3px] border-border px-4 py-1 font-bold uppercase tracking-widest text-sm shadow-brutal-sm rotate-1">
            Why Choose Us
          </span>
          <h2 className="font-display text-4xl md:text-6xl mt-6 mb-6 text-foreground">
            THE{" "}
            <span className="inline-block bg-accent text-accent-foreground px-3 border-[4px] border-border shadow-brutal -rotate-1">
              HAIRLAYER
            </span>{" "}
            DIFFERENCE
          </h2>
          <p className="text-foreground max-w-2xl mx-auto text-lg font-medium bg-card border-[3px] border-border p-4 shadow-brutal-sm inline-block">
            Helping thousands of Indian men regain their confidence.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className={`${cardBgs[index]} border-[4px] border-border shadow-brutal hover:shadow-brutal-lg hover:-translate-x-1 hover:-translate-y-1 transition-all duration-150 p-6`}
            >
              <div className="w-14 h-14 bg-foreground text-background flex items-center justify-center mb-4 border-[3px] border-border">
                <benefit.icon className="w-7 h-7" />
              </div>
              <h3 className="font-display text-xl mb-3 text-foreground uppercase">
                {benefit.title}
              </h3>
              <p className="text-foreground/80 leading-relaxed font-medium">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 bg-card border-[4px] border-border shadow-brutal p-6"
        >
          <div className="flex flex-wrap items-center justify-around gap-6 text-foreground">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary border-[3px] border-border flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="font-bold uppercase">ISO Certified</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-accent border-[3px] border-border flex items-center justify-center">
                <Award className="w-6 h-6 text-accent-foreground" />
              </div>
              <span className="font-bold uppercase">Award Winning</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-secondary border-[3px] border-border flex items-center justify-center">
                <Users className="w-6 h-6 text-foreground" />
              </div>
              <span className="font-bold uppercase">10,000+ Clients</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BenefitsSection;
