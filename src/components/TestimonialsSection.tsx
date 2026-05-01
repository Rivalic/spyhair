import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonials = [
  { id: 1, name: "Rajesh Kumar", location: "Mumbai", rating: 5, text: "Absolutely life-changing! The hair system is so natural that even my close friends couldn't tell. The confidence boost is incredible." },
  { id: 2, name: "Amit Sharma", location: "Delhi", rating: 5, text: "Best investment I've ever made. The quality is outstanding and the customer service is top-notch. Highly recommend HairLayer!" },
  { id: 3, name: "Vikram Patel", location: "Bangalore", rating: 5, text: "I was skeptical at first, but HairLayer exceeded all my expectations. Comfortable, natural-looking, and easy to maintain." },
  { id: 4, name: "Arjun Mehta", location: "Pune", rating: 5, text: "The transformation is amazing! I look 10 years younger. The team at HairLayer is professional and caring." },
  { id: 5, name: "Karan Singh", location: "Hyderabad", rating: 5, text: "Undetectable and comfortable. I can swim, exercise, and live my life without any worries. Thank you HairLayer!" },
  { id: 6, name: "Rohit Desai", location: "Chennai", rating: 5, text: "Premium quality at its finest. The attention to detail and customization options are impressive. Worth every rupee!" },
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((p) => (p + 1) % testimonials.length);
  const prev = () => setCurrentIndex((p) => (p - 1 + testimonials.length) % testimonials.length);

  return (
    <section id="testimonials" className="py-24 bg-background border-y-[5px] border-border relative overflow-hidden">
      <div className="absolute inset-0 bg-dots opacity-30 pointer-events-none" />
      <div className="absolute top-10 left-10 text-foreground/10 pointer-events-none">
        <Quote className="w-32 h-32" />
      </div>
      <div className="absolute bottom-10 right-10 text-foreground/10 rotate-180 pointer-events-none">
        <Quote className="w-32 h-32" />
      </div>

      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-block bg-primary text-primary-foreground border-[3px] border-border px-4 py-1 font-bold uppercase tracking-widest text-sm shadow-brutal-sm -rotate-1">
            Testimonials
          </span>
          <h2 className="font-display text-4xl md:text-6xl mt-6 mb-6 text-foreground">
            WHAT CUSTOMERS{" "}
            <span className="inline-block bg-accent text-accent-foreground px-3 border-[4px] border-border shadow-brutal rotate-1">
              SAY
            </span>
          </h2>
        </motion.div>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-12">
          {[
            { v: "20+", l: "Testimonials", bg: "bg-primary" },
            { v: "4.9/5", l: "Avg Rating", bg: "bg-accent" },
            { v: "98%", l: "Satisfaction", bg: "bg-secondary" },
          ].map((s, i) => (
            <div
              key={i}
              className={`${s.bg} border-[3px] border-border shadow-brutal-sm px-6 py-3 text-foreground`}
            >
              <div className="font-display text-3xl">{s.v}</div>
              <div className="text-xs font-bold uppercase mt-1">{s.l}</div>
            </div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
              className="bg-card border-[4px] border-border shadow-brutal-lg p-8 md:p-12"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-foreground fill-foreground" />
                ))}
              </div>

              <blockquote className="font-display text-xl md:text-2xl text-foreground leading-relaxed mb-8 uppercase">
                "{testimonials[currentIndex].text}"
              </blockquote>

              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-primary text-primary-foreground border-[3px] border-border shadow-brutal-sm flex items-center justify-center font-display text-2xl">
                  {testimonials[currentIndex].name.charAt(0)}
                </div>
                <div>
                  <div className="font-display text-lg text-foreground uppercase">
                    {testimonials[currentIndex].name}
                  </div>
                  <div className="text-foreground/70 text-sm font-bold uppercase">
                    {testimonials[currentIndex].location}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <Button variant="gold" size="icon" onClick={prev}>
              <ChevronLeft className="w-5 h-5" />
            </Button>

            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  aria-label={`Go to testimonial ${index + 1}`}
                  className={`h-3 border-[2px] border-border transition-all duration-150 ${
                    index === currentIndex ? "bg-primary w-10" : "bg-card w-3 hover:bg-accent"
                  }`}
                />
              ))}
            </div>

            <Button variant="gold" size="icon" onClick={next}>
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
