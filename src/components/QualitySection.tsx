import { motion } from "framer-motion";

const features = [
  {
    title: "VIRGIN HUMAN HAIR",
    badge: "ULTRA REAL LOOK",
    description:
      "100% Virgin Human Hair weaved strand-by-strand to produce an undetectable appearance that resembles your own natural hair.",
    image: "/quality/quality-1.png",
    bg: "bg-primary",
    rotate: "-rotate-1",
  },
  {
    title: "DURABLE MATERIALS",
    badge: "INCOGNITO YOU",
    description:
      "Durable PU coating, breathable net base, natural hairline, comfortable feel. Odourless, tangle and shedding free.",
    image: "/quality/quality-2.png",
    bg: "bg-accent",
    rotate: "rotate-1",
  },
  {
    title: "BALANCED DENSITY",
    badge: "INVISIBLE LOOK",
    description:
      "Density wisely balanced from medium to high. 5-6 inches trim-able length from the vertex for any hairstyle.",
    image: "/quality/quality-3.png",
    bg: "bg-secondary",
    rotate: "-rotate-1",
  },
];

const QualitySection = () => {
  return (
    <section className="py-24 bg-background border-y-[5px] border-border relative">
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
            Engineered for you
          </span>
          <h2 className="font-display text-4xl md:text-6xl mt-6 text-foreground">
            QUALITY &{" "}
            <span className="inline-block bg-accent text-accent-foreground px-3 border-[4px] border-border shadow-brutal -rotate-1">
              COMFORT
            </span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-card border-[4px] border-border shadow-brutal hover:shadow-brutal-lg hover:-translate-x-1 hover:-translate-y-1 transition-all duration-150"
            >
              {/* Image */}
              <div className="relative aspect-square overflow-hidden border-b-[4px] border-border bg-background">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  width={768}
                  height={768}
                />
                <span
                  className={`absolute top-3 left-3 ${feature.bg} text-foreground font-bold text-xs uppercase border-[3px] border-border px-2 py-1 shadow-brutal-sm ${feature.rotate}`}
                >
                  {feature.badge}
                </span>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-display text-xl mb-3 text-foreground uppercase">
                  {feature.title}
                </h3>
                <p className="text-foreground/80 text-sm leading-relaxed font-medium">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QualitySection;
