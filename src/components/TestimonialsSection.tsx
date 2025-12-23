import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    id: 1,
    name: "Rajesh Kumar",
    location: "Mumbai",
    rating: 5,
    text: "Absolutely life-changing! The hair system is so natural that even my close friends couldn't tell. The confidence boost is incredible.",
  },
  {
    id: 2,
    name: "Amit Sharma",
    location: "Delhi",
    rating: 5,
    text: "Best investment I've ever made. The quality is outstanding and the customer service is top-notch. Highly recommend SpyHair!",
  },
  {
    id: 3,
    name: "Vikram Patel",
    location: "Bangalore",
    rating: 5,
    text: "I was skeptical at first, but SpyHair exceeded all my expectations. Comfortable, natural-looking, and easy to maintain.",
  },
  {
    id: 4,
    name: "Arjun Mehta",
    location: "Pune",
    rating: 5,
    text: "The transformation is amazing! I look 10 years younger. The team at SpyHair is professional and caring.",
  },
  {
    id: 5,
    name: "Karan Singh",
    location: "Hyderabad",
    rating: 5,
    text: "Undetectable and comfortable. I can swim, exercise, and live my life without any worries. Thank you SpyHair!",
  },
  {
    id: 6,
    name: "Rohit Desai",
    location: "Chennai",
    rating: 5,
    text: "Premium quality at its finest. The attention to detail and customization options are impressive. Worth every rupee!",
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
            What Our <span className="text-gradient-gold italic">Customers Say</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Join thousands of satisfied customers who have transformed their lives with SpyHair
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center gap-8 md:gap-16 mb-16"
        >
          <div className="text-center">
            <div className="font-display text-4xl font-bold text-gradient-gold">20+</div>
            <div className="text-muted-foreground text-sm mt-1">Testimonials</div>
          </div>
          <div className="text-center">
            <div className="font-display text-4xl font-bold text-gradient-gold">4.9/5</div>
            <div className="text-muted-foreground text-sm mt-1">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="font-display text-4xl font-bold text-gradient-gold">98%</div>
            <div className="text-muted-foreground text-sm mt-1">Satisfaction Rate</div>
          </div>
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
                    {testimonials[currentIndex].location}
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
