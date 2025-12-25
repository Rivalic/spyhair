import { motion, type Easing } from "framer-motion";

const LifestyleGallerySection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] as Easing },
    },
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[180px] md:auto-rows-[200px]"
        >
          {/* Image 1 - Tall left */}
          <motion.div
            variants={itemVariants}
            className="relative row-span-2 rounded-2xl overflow-hidden group"
          >
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&crop=faces"
              alt="Man with styled hair - casual look"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </motion.div>

          {/* Gold Text Box 1 */}
          <motion.div
            variants={itemVariants}
            className="bg-primary rounded-2xl flex items-center justify-center p-6"
          >
            <p className="text-primary-foreground font-display text-xl md:text-2xl font-semibold text-center leading-tight">
              FLAUNT YOUR STYLES
            </p>
          </motion.div>

          {/* Image 2 */}
          <motion.div
            variants={itemVariants}
            className="relative rounded-2xl overflow-hidden group"
          >
            <img
              src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&h=400&fit=crop&crop=faces"
              alt="Professional man with hair system"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </motion.div>

          {/* Image 3 - Tall right */}
          <motion.div
            variants={itemVariants}
            className="relative row-span-2 rounded-2xl overflow-hidden group"
          >
            <img
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=600&fit=crop&crop=faces"
              alt="Confident man outdoors"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </motion.div>

          {/* Image 4 */}
          <motion.div
            variants={itemVariants}
            className="relative rounded-2xl overflow-hidden group"
          >
            <img
              src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=faces"
              alt="Athletic man with modern hairstyle"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </motion.div>

          {/* Image 5 */}
          <motion.div
            variants={itemVariants}
            className="relative rounded-2xl overflow-hidden group"
          >
            <img
              src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=faces"
              alt="Business professional"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </motion.div>

          {/* Image 6 */}
          <motion.div
            variants={itemVariants}
            className="relative rounded-2xl overflow-hidden group"
          >
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=faces"
              alt="Casual lifestyle"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </motion.div>

          {/* Gold Text Box 2 */}
          <motion.div
            variants={itemVariants}
            className="bg-primary rounded-2xl flex items-center justify-center p-6"
          >
            <p className="text-primary-foreground font-display text-xl md:text-2xl font-semibold text-center leading-tight">
              WEAR YOUR FREEDOM
            </p>
          </motion.div>

          {/* Tagline Box - spans 2 columns */}
          <motion.div
            variants={itemVariants}
            className="col-span-2 bg-secondary rounded-2xl flex items-center justify-center p-6"
          >
            <p className="text-foreground font-display text-lg md:text-xl italic text-center">
              Many Hairstyles... <span className="text-primary font-semibold not-italic">More Confidence</span>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default LifestyleGallerySection;
