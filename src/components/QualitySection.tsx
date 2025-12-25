import { motion } from "framer-motion";

const features = [
  {
    title: "Virgin Human Hair",
    subtitle: "THE ULTRA REAL LOOK",
    badge: "IMPECCABLE QUALITY",
    description: "We process 100% Virgin Human Hair weaved strand-by-strand alike original Remy Hair to produce an Undetectable Appearance that resembles your very own natural hair.",
    image: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?w=500&h=400&fit=crop",
    highlight: "Natural Black with greater than 95% match to Indian Hair with tones between Jet Black and Darkest Brown."
  },
  {
    title: "Durable Materials",
    subtitle: "THE INCOGNITO YOU",
    badge: null,
    description: "Our hair systems have a Durable PU coating (where applicable), high grade Breathable Net base, natural hairline, comfortable feel and are odourless, tangle and shedding free.",
    image: "https://images.unsplash.com/photo-1559825481-12a05cc00344?w=500&h=400&fit=crop",
    highlight: null
  },
  {
    title: "Balanced Density",
    subtitle: "BE YOURSELF AGAIN",
    badge: "INVISIBLE LOOK",
    description: "Density in our hair pieces is wisely balanced from Medium to High basis universal distribution of Real Human Hair vis-à-vis scalpscapes of most common DNA's.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&h=400&fit=crop",
    highlight: "Ample Density to achieve any hairstyle with 5-6 inches trim-able length from the vertex."
  }
];

const QualitySection = () => {
  return (
    <section className="py-20 bg-muted/20">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl font-bold text-foreground mb-12"
        >
          QUALITY AND COMFORT
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="group"
            >
              {/* Image Card */}
              <div className={`relative h-72 md:h-80 overflow-hidden mb-6 ${index === 1 ? 'border-4 border-primary' : ''}`}>
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                
                {/* Content overlay */}
                <div className="absolute inset-0 p-5 flex flex-col justify-between">
                  {/* Top section */}
                  <div>
                    <h3 className="text-white text-lg font-bold mb-1">{feature.subtitle}</h3>
                    {feature.highlight && (
                      <p className="text-white/80 text-xs leading-relaxed max-w-[180px]">
                        {feature.highlight}
                      </p>
                    )}
                  </div>
                  
                  {/* Badge */}
                  {feature.badge && (
                    <div className="self-start">
                      <span className="text-white/90 text-xs tracking-wider uppercase">
                        {feature.badge}
                      </span>
                    </div>
                  )}
                  
                  {/* Center accent for middle card */}
                  {index === 1 && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="border border-white/50 p-6">
                        <span className="text-white text-xl font-display tracking-wider text-center block">
                          THE<br />INCOGNITO<br />YOU
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Text Content */}
              <h4 className="text-xl font-bold text-foreground mb-3">{feature.title}</h4>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QualitySection;
