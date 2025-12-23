import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    id: 1,
    name: "Rajesh Sharma",
    location: "Mumbai",
    rating: 5,
    text: "After years of trying different solutions, Crown Hair Systems finally gave me what I was looking for. The quality is exceptional, and no one can tell it's not my natural hair. My confidence has completely transformed.",
    occupation: "Business Executive",
  },
  {
    id: 2,
    name: "Vikram Patel",
    location: "Delhi",
    rating: 5,
    text: "The consultation process was so thorough. They matched my hair color and texture perfectly. I was nervous at first, but the team made me feel comfortable. Best decision I ever made for myself.",
    occupation: "Software Engineer",
  },
  {
    id: 3,
    name: "Arjun Mehta",
    location: "Bangalore",
    rating: 5,
    text: "I've been using Crown's Royal Crown system for 8 months now. The durability is impressive, and it styles exactly like natural hair. The investment was worth every rupee.",
    occupation: "Film Producer",
  },
  {
    id: 4,
    name: "Suresh Kumar",
    location: "Chennai",
    rating: 5,
    text: "What impressed me most was their aftercare support. Whenever I had questions about maintenance, they were always available. Truly a premium experience from start to finish.",
    occupation: "Doctor",
  },
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-24 bg-gradient-dark relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 text-primary/10">
        <Quote className="w-32 h-32" />
      </div>
      <div className="absolute bottom-20 right-10 text-primary/10 rotate-180">
        <Quote className="w-32 h-32" />
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
            Testimonials
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-4 mb-6">
            Real <span className="text-gradient-gold italic">Transformations</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Hear from our satisfied clients who have experienced the life-changing
            impact of our premium hair systems.
          </p>
        </motion.div>

        {/* Testimonial Carousel */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-3xl p-8 md:p-12"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-primary fill-primary" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="font-display text-xl md:text-2xl text-foreground leading-relaxed mb-8 italic">
                "{testimonials[currentIndex].text}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-gold flex items-center justify-center text-primary-foreground font-display text-xl font-bold">
                  {testimonials[currentIndex].name.charAt(0)}
                </div>
                <div>
                  <div className="font-display text-lg font-bold text-foreground">
                    {testimonials[currentIndex].name}
                  </div>
                  <div className="text-muted-foreground text-sm">
                    {testimonials[currentIndex].occupation} • {testimonials[currentIndex].location}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <Button
              variant="elegant"
              size="icon"
              onClick={prevTestimonial}
              className="rounded-full"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-primary w-8"
                      : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                />
              ))}
            </div>

            <Button
              variant="elegant"
              size="icon"
              onClick={nextTestimonial}
              className="rounded-full"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
