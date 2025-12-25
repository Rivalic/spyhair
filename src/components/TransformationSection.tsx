import { motion } from "framer-motion";

const TransformationSection = () => {
  return (
    <section className="py-20 bg-card relative overflow-hidden">
      {/* Gold accent line at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary" />
      
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Images Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative flex justify-center items-end gap-4"
          >
            {/* Before Image */}
            <div className="relative">
              <div className="absolute -top-2 -left-2 -right-2 -bottom-2 border border-primary/50" />
              <div className="w-56 h-72 md:w-64 md:h-80 bg-muted overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=500&fit=crop&crop=face"
                  alt="Before transformation"
                  className="w-full h-full object-cover grayscale"
                />
                <span className="absolute bottom-4 left-1/2 -translate-x-1/2 font-display text-4xl md:text-5xl text-primary/70 tracking-wider">
                  BEFORE
                </span>
              </div>
            </div>

            {/* After Image */}
            <div className="relative -ml-8 mt-12">
              <div className="absolute -top-2 -left-2 -right-2 -bottom-2 border border-primary" />
              <div className="w-56 h-72 md:w-64 md:h-80 bg-muted overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=face"
                  alt="After transformation"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-4 left-1/2 -translate-x-1/2 font-display text-4xl md:text-5xl text-primary tracking-wider">
                  AFTER
                </span>
              </div>
            </div>
          </motion.div>

          {/* Text Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center lg:text-left"
          >
            <p className="text-lg md:text-xl text-muted-foreground mb-2">
              Those who have
            </p>
            <p className="text-lg md:text-xl text-muted-foreground mb-2">
              made their life
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-8">
              CONFIDENT
            </h2>
            
            <div className="space-y-1">
              <h3 className="text-4xl md:text-5xl font-display text-foreground tracking-wide">
                TRANSFORMATION
              </h3>
              <p className="text-2xl md:text-3xl font-script text-primary italic">
                by 3S Golden Hair
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TransformationSection;
