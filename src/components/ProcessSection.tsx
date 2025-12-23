import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Consultation",
    description: "Book a free, private session with our specialists to discuss your needs.",
  },
  {
    number: "02",
    title: "Custom Fitting",
    description: "Precise measurements and perfect color matching for an undetectable result.",
  },
  {
    number: "03",
    title: "Styling",
    description: "Professional attachment and styling to achieve your desired look.",
  },
  {
    number: "04",
    title: "Aftercare",
    description: "Ongoing support, maintenance tips, and regular touch-up services.",
  },
];

const ProcessSection = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-primary uppercase tracking-widest text-sm font-medium">
            How It Works
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-4">
            Simple <span className="text-gradient-gold italic">Process</span>
          </h2>
        </motion.div>

        {/* Steps - Horizontal Layout */}
        <div className="grid md:grid-cols-4 gap-8 md:gap-4">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center md:text-left"
            >
              {/* Number */}
              <span className="font-display text-6xl font-bold text-primary/20">
                {step.number}
              </span>

              {/* Title */}
              <h3 className="font-display text-xl font-bold mt-2 mb-3">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-muted-foreground text-sm leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
