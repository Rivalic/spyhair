import { motion } from "framer-motion";
import { MessageSquare, Ruler, Sparkles, HeartHandshake, ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: MessageSquare,
    title: "Free Consultation",
    description: "Book a private, no-obligation consultation with our hair specialists. We'll discuss your needs, lifestyle, and expectations.",
    details: ["Understand your hair loss pattern", "Discuss styling preferences", "Answer all your questions"],
  },
  {
    number: "02",
    icon: Ruler,
    title: "Custom Fitting",
    description: "Our experts take precise measurements and match your hair color, texture, and density for a perfect, undetectable fit.",
    details: ["Scalp measurements & template", "Hair color & density matching", "Style customization"],
  },
  {
    number: "03",
    icon: Sparkles,
    title: "Professional Styling",
    description: "Your hair system is expertly attached and styled by our trained professionals to achieve your desired look.",
    details: ["Secure & comfortable attachment", "Professional styling & cutting", "Natural hairline blending"],
  },
  {
    number: "04",
    icon: HeartHandshake,
    title: "Ongoing Aftercare",
    description: "We provide comprehensive support including maintenance guidance, styling tips, and regular check-ups.",
    details: ["Maintenance training", "24/7 support access", "Regular touch-up services"],
  },
];

const ProcessSection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-background">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
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
            How It Works
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-4 mb-6">
            Your Journey to <span className="text-gradient-gold italic">Confidence</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            A simple, personalized process designed to give you the most natural-looking 
            hair system with complete peace of mind.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line - Desktop */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="relative"
              >
                {/* Step Card */}
                <div className="group bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 hover:border-primary/50 transition-all duration-500 h-full">
                  {/* Step Number & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-display text-5xl font-bold text-primary/20 group-hover:text-primary/40 transition-colors">
                      {step.number}
                    </span>
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <step.icon className="w-7 h-7 text-primary" />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="font-display text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {step.description}
                  </p>

                  {/* Details List */}
                  <ul className="space-y-2">
                    {step.details.map((detail, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {detail}
                      </li>
                    ))}
                  </ul>

                  {/* Hover Accent */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-b-2xl" />
                </div>

                {/* Arrow - Desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:flex absolute -right-4 top-24 z-10 w-8 h-8 rounded-full bg-primary/20 items-center justify-center">
                    <ArrowRight className="w-4 h-4 text-primary" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-muted-foreground mb-6">
            Ready to start your transformation journey?
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-gradient-gold text-primary-foreground font-semibold px-8 py-4 rounded-md shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
          >
            Book Your Free Consultation
            <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ProcessSection;
