import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-image.jpg";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-24">
      {/* Ambient aurora orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute top-1/3 -right-40 w-[600px] h-[600px] rounded-full bg-burgundy/20 blur-3xl" />
        <div className="absolute -bottom-40 left-1/3 w-[500px] h-[500px] rounded-full bg-emerald/15 blur-3xl" />
      </div>

      {/* Floating glass image panel */}
      <div className="absolute right-0 top-24 bottom-0 w-1/2 hidden lg:flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative h-[80%] w-[85%] glass-strong rounded-[2.5rem] overflow-hidden glow-soft"
        >
          <img
            src={heroImage}
            alt="Premium hair system showcase - Natural looking hair replacement for men"
            className="w-full h-full object-cover object-center"
            loading="eager"
            width={1920}
            height={1080}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="absolute top-6 right-6 glass-gold rounded-full px-4 py-2 text-sm font-medium text-primary"
          >
            ✨ New Collection
          </motion.div>
        </motion.div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8"
          >
            <Star className="w-4 h-4 text-primary fill-primary" />
            <span className="text-sm font-medium text-foreground/90">
              India's Most Trusted Hair Solutions
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="font-display text-5xl md:text-6xl lg:text-7xl leading-[1.05] mb-6 text-foreground"
          >
            Reclaim Your{" "}
            <span className="text-gradient-gold italic">Confidence</span>
            <br />
            With Premium Hair
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg md:text-xl text-foreground/75 mb-10 max-w-xl leading-relaxed font-light"
          >
            Experience undetectable, luxurious hair systems crafted for the discerning
            Indian gentleman. 100% natural hair, custom-fitted to perfection.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button variant="gold" size="xl" className="group rounded-full">
              Explore Collection
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="goldOutline" size="xl" className="rounded-full">
              Book Free Consultation
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-16 grid grid-cols-3 gap-4 max-w-lg"
          >
            {[
              { value: "10,000+", label: "Happy Clients" },
              { value: "15+", label: "Years Experience" },
              { value: "100%", label: "Natural Hair" },
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center glass rounded-2xl p-4 transition-glass hover:bg-white/10"
              >
                <div className="font-display text-2xl md:text-3xl text-gradient-gold">
                  {stat.value}
                </div>
                <div className="text-xs text-foreground/70 mt-1 font-medium">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-foreground/60 uppercase tracking-widest">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity }}
            className="w-6 h-10 rounded-full glass flex items-start justify-center p-1.5"
          >
            <div className="w-1 h-2.5 bg-primary rounded-full" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
