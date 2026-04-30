import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-image.jpg";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-background border-b-[5px] border-border pt-24">
      {/* Decorative dot grid */}
      <div className="absolute inset-0 bg-dots opacity-40 pointer-events-none" />

      {/* Background image clipped in a brutalist block */}
      <div className="absolute right-0 top-24 bottom-0 w-1/2 hidden lg:block">
        <div className="relative h-full m-8 border-[5px] border-border shadow-brutal-xl bg-primary overflow-hidden">
          <img
            src={heroImage}
            alt="Premium hair system showcase - Natural looking hair replacement for men"
            className="w-full h-full object-cover object-center mix-blend-multiply"
            loading="eager"
            width={1920}
            height={1080}
          />
          <div className="absolute top-4 right-4 bg-accent border-[3px] border-border px-3 py-1 font-display text-sm rotate-3">
            NEW DROP
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 bg-champagne text-champagne-foreground border-[3px] border-border px-4 py-2 mb-8 shadow-brutal-sm -rotate-1"
          >
            <Star className="w-4 h-4 fill-champagne-foreground" />
            <span className="text-sm font-bold uppercase">
              India's Most Trusted Hair Solutions
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display text-5xl md:text-6xl lg:text-7xl leading-[0.95] mb-6 text-foreground"
          >
            RECLAIM YOUR{" "}
            <span className="inline-block bg-primary text-primary-foreground px-3 border-[4px] border-border shadow-brutal -rotate-2">CONFIDENCE</span>
            <br />
            WITH PREMIUM HAIR
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-foreground mb-10 max-w-xl leading-relaxed font-medium bg-card border-[3px] border-border p-4 shadow-brutal-sm"
          >
            Experience undetectable, luxurious hair systems crafted for the discerning
            Indian gentleman. 100% natural hair, custom-fitted to perfection.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button variant="gold" size="xl" className="group">
              Explore Collection
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="goldOutline" size="xl">
              Book Free Consultation
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-16 grid grid-cols-3 gap-8 max-w-lg"
          >
            {[
              { value: "10,000+", label: "Happy Clients" },
              { value: "15+", label: "Years Experience" },
              { value: "100%", label: "Natural Hair" },
            ].map((stat, index) => {
              const palette = [
                "bg-gold text-gold-foreground",
                "bg-burgundy text-burgundy-foreground",
                "bg-emerald text-emerald-foreground",
              ];
              return (
                <div key={index} className={`text-center p-3 border-[3px] border-border shadow-brutal-sm ${palette[index]}`}>
                  <div className="font-display text-2xl md:text-3xl">
                    {stat.value}
                  </div>
                  <div className="text-xs font-bold uppercase mt-1">{stat.label}</div>
                </div>
              );
            })}
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
          <span className="text-xs font-bold uppercase tracking-widest text-foreground bg-card border-[3px] border-border px-2 py-1 shadow-brutal-sm">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 border-[3px] border-border bg-accent flex items-start justify-center p-1 shadow-brutal-sm"
          >
            <div className="w-1.5 h-3 bg-foreground" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
