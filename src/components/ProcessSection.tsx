import { motion } from "framer-motion";

const steps = [
  { number: "01", title: "CONSULTATION", description: "Free private session with our specialists to discuss your needs.", bg: "bg-primary" },
  { number: "02", title: "CUSTOM FITTING", description: "Precise measurements and perfect color matching for an undetectable result.", bg: "bg-accent" },
  { number: "03", title: "STYLING", description: "Professional attachment and styling to achieve your desired look.", bg: "bg-secondary" },
  { number: "04", title: "AFTERCARE", description: "Ongoing support, maintenance tips, and regular touch-up services.", bg: "bg-card" },
];

const ProcessSection = () => {
  return (
    <section className="py-24 bg-background border-y-[5px] border-border relative">
      <div className="absolute inset-0 bg-dots opacity-30 pointer-events-none" />
      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block bg-accent text-accent-foreground border-[3px] border-border px-4 py-1 font-bold uppercase tracking-widest text-sm shadow-brutal-sm -rotate-1">
            How It Works
          </span>
          <h2 className="font-display text-4xl md:text-6xl mt-6 text-foreground">
            SIMPLE{" "}
            <span className="inline-block bg-primary text-primary-foreground px-3 border-[4px] border-border shadow-brutal rotate-1">
              PROCESS
            </span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className={`${step.bg} border-[4px] border-border shadow-brutal hover:shadow-brutal-lg hover:-translate-x-1 hover:-translate-y-1 transition-all duration-150 p-6`}
            >
              <div className="font-display text-5xl text-foreground mb-3 leading-none">
                {step.number}
              </div>
              <div className="h-[3px] bg-foreground w-12 mb-4" />
              <h3 className="font-display text-xl text-foreground uppercase mb-3">
                {step.title}
              </h3>
              <p className="text-foreground/80 text-sm leading-relaxed font-medium">
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
