import { motion } from "framer-motion";
import { Shield, Award, Users, Clock, Sparkles, Heart } from "lucide-react";

const benefits = [
  {
    icon: Shield,
    title: "Undetectable Quality",
    description: "Our hair systems are so natural, even your closest friends won't know the difference.",
  },
  {
    icon: Award,
    title: "Premium Materials",
    description: "100% human hair sourced ethically, with bases made from medical-grade materials.",
  },
  {
    icon: Users,
    title: "Expert Consultation",
    description: "Our specialists provide personalized guidance to find your perfect match.",
  },
  {
    icon: Clock,
    title: "Long-Lasting Durability",
    description: "With proper care, our systems last 6-12 months, providing excellent value.",
  },
  {
    icon: Sparkles,
    title: "Custom Fitting",
    description: "Every system is tailored to your head shape, hairline, and style preferences.",
  },
  {
    icon: Heart,
    title: "Aftercare Support",
    description: "Comprehensive guidance on maintenance, styling, and care for your investment.",
  },
];

const BenefitsSection = () => {
  return (
    <section id="benefits" className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-background">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-primary/5 blur-3xl rounded-full transform translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-primary/5 blur-3xl rounded-full transform -translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-primary uppercase tracking-widest text-sm font-medium">
            Why Choose Us
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-4 mb-6">
            The <span className="text-gradient-gold italic">Crown</span> Difference
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            We've helped thousands of Indian men regain their confidence with our
            premium hair solutions and exceptional service.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative p-8 rounded-2xl bg-card/50 border border-border/50 hover:border-primary/50 hover:bg-card transition-all duration-500"
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                <benefit.icon className="w-7 h-7 text-primary" />
              </div>

              {/* Content */}
              <h3 className="font-display text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                {benefit.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {benefit.description}
              </p>

              {/* Hover Accent */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-b-2xl" />
            </motion.div>
          ))}
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 py-12 border-t border-b border-border/30"
        >
          <div className="flex flex-wrap items-center justify-center gap-12 text-muted-foreground">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <span className="font-medium">ISO Certified</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Award className="w-6 h-6 text-primary" />
              </div>
              <span className="font-medium">Award Winning</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <span className="font-medium">10,000+ Clients</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BenefitsSection;
