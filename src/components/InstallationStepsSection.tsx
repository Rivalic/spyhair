import { motion } from "framer-motion";

const steps = [
  { number: 1, title: "SHAVE THE BALD AREA", image: "/install/step-1.png", bg: "bg-primary" },
  { number: 2, title: "WASH THE SCALP", image: "/install/step-2.png", bg: "bg-accent" },
  { number: 3, title: "ATTACH HAIR SYSTEM", image: "/install/step-3.png", bg: "bg-secondary" },
  { number: 4, title: "YOU'RE YOUNG AGAIN", image: "/install/step-4.png", bg: "bg-card" },
];

const InstallationStepsSection = () => {
  return (
    <section className="py-24 bg-secondary border-y-[5px] border-border relative">
      <div className="absolute inset-0 bg-dots opacity-30 pointer-events-none" />
      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block bg-primary text-primary-foreground border-[3px] border-border px-4 py-1 font-bold uppercase tracking-widest text-sm shadow-brutal-sm rotate-1">
            Step-by-Step
          </span>
          <h2 className="font-display text-4xl md:text-6xl mt-6 text-foreground">
            HOW TO{" "}
            <span className="inline-block bg-accent text-accent-foreground px-3 border-[4px] border-border shadow-brutal -rotate-1">
              INSTALL
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              viewport={{ once: true }}
              className={`group ${step.bg} border-[4px] border-border shadow-brutal hover:shadow-brutal-lg hover:-translate-x-1 hover:-translate-y-1 transition-all duration-150`}
            >
              {/* Number badge */}
              <div className="flex items-center justify-between p-3 border-b-[3px] border-border bg-foreground text-background">
                <span className="font-display text-3xl">
                  {String(step.number).padStart(2, "0")}
                </span>
                <span className="text-xs font-bold uppercase tracking-widest">Step</span>
              </div>

              {/* Image */}
              <div className="relative aspect-square overflow-hidden border-b-[3px] border-border bg-background">
                <img
                  src={step.image}
                  alt={step.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  width={768}
                  height={768}
                />
              </div>

              {/* Title */}
              <div className="p-4">
                <h3 className="font-display text-lg md:text-xl text-foreground uppercase leading-tight">
                  {step.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstallationStepsSection;
