import { motion } from "framer-motion";

const steps = [
  {
    number: 1,
    title: "Shave the bald area",
    image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=400&h=500&fit=crop"
  },
  {
    number: 2,
    title: "Wash the scalp nicely",
    image: "https://images.unsplash.com/photo-1560869713-7d0a29430803?w=400&h=500&fit=crop"
  },
  {
    number: 3,
    title: "Attach your new hair system",
    image: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=400&h=500&fit=crop"
  },
  {
    number: 4,
    title: "And you're young again",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop"
  }
];

const InstallationStepsSection = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl font-bold text-foreground mb-12 text-center md:text-left"
        >
          HOW TO INSTALL HAIR SYSTEM
        </motion.h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative group"
            >
              {/* Step number */}
              <span className="absolute -top-2 -right-2 md:top-2 md:right-2 text-6xl md:text-8xl font-display text-primary/20 z-10 pointer-events-none">
                {step.number}
              </span>

              {/* Image container */}
              <div className="relative h-48 md:h-64 lg:h-80 overflow-hidden rounded-lg">
                <img
                  src={step.image}
                  alt={step.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                {/* Step title */}
                <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
                  <p className="text-white text-sm md:text-base font-medium leading-tight">
                    {step.title}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstallationStepsSection;
