import { motion, type Easing } from "framer-motion";

const images = [
  { src: "/lifestyle/lifestyle-1.png", alt: "Man with styled hair - bold portrait" },
  { src: "/lifestyle/lifestyle-2.png", alt: "Professional man with hair system" },
  { src: "/lifestyle/lifestyle-3.png", alt: "Confident man outdoors" },
  { src: "/lifestyle/lifestyle-4.png", alt: "Athletic man with modern hairstyle" },
  { src: "/lifestyle/lifestyle-5.png", alt: "Business professional" },
  { src: "/lifestyle/lifestyle-6.png", alt: "Casual lifestyle" },
];

const LifestyleGallerySection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] as Easing },
    },
  };

  return (
    <section className="py-20 bg-background border-y-[5px] border-border relative">
      <div className="absolute inset-0 bg-dots opacity-30 pointer-events-none" />
      <div className="container mx-auto px-4 relative">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[180px] md:auto-rows-[200px]"
        >
          {/* Image 1 - Tall left */}
          <motion.div
            variants={itemVariants}
            className="relative row-span-2 overflow-hidden border-[4px] border-border shadow-brutal bg-card"
          >
            <img
              src={images[0].src}
              alt={images[0].alt}
              className="w-full h-full object-cover"
              loading="lazy"
              width={768}
              height={768}
            />
          </motion.div>

          {/* Text Box 1 */}
          <motion.div
            variants={itemVariants}
            className="bg-primary border-[4px] border-border shadow-brutal flex items-center justify-center p-6 -rotate-1"
          >
            <p className="text-primary-foreground font-display text-xl md:text-2xl text-center leading-tight uppercase">
              FLAUNT YOUR STYLES
            </p>
          </motion.div>

          {/* Image 2 */}
          <motion.div
            variants={itemVariants}
            className="relative overflow-hidden border-[4px] border-border shadow-brutal bg-card"
          >
            <img
              src={images[1].src}
              alt={images[1].alt}
              className="w-full h-full object-cover"
              loading="lazy"
              width={768}
              height={768}
            />
          </motion.div>

          {/* Image 3 - Tall right */}
          <motion.div
            variants={itemVariants}
            className="relative row-span-2 overflow-hidden border-[4px] border-border shadow-brutal bg-card"
          >
            <img
              src={images[2].src}
              alt={images[2].alt}
              className="w-full h-full object-cover"
              loading="lazy"
              width={768}
              height={768}
            />
          </motion.div>

          {/* Image 4 */}
          <motion.div
            variants={itemVariants}
            className="relative overflow-hidden border-[4px] border-border shadow-brutal bg-card"
          >
            <img
              src={images[3].src}
              alt={images[3].alt}
              className="w-full h-full object-cover"
              loading="lazy"
              width={768}
              height={768}
            />
          </motion.div>

          {/* Image 5 */}
          <motion.div
            variants={itemVariants}
            className="relative overflow-hidden border-[4px] border-border shadow-brutal bg-card"
          >
            <img
              src={images[4].src}
              alt={images[4].alt}
              className="w-full h-full object-cover"
              loading="lazy"
              width={768}
              height={768}
            />
          </motion.div>

          {/* Image 6 */}
          <motion.div
            variants={itemVariants}
            className="relative overflow-hidden border-[4px] border-border shadow-brutal bg-card"
          >
            <img
              src={images[5].src}
              alt={images[5].alt}
              className="w-full h-full object-cover"
              loading="lazy"
              width={768}
              height={768}
            />
          </motion.div>

          {/* Text Box 2 */}
          <motion.div
            variants={itemVariants}
            className="bg-accent border-[4px] border-border shadow-brutal flex items-center justify-center p-6 rotate-1"
          >
            <p className="text-accent-foreground font-display text-xl md:text-2xl text-center leading-tight uppercase">
              WEAR YOUR FREEDOM
            </p>
          </motion.div>

          {/* Tagline Box - spans 2 columns */}
          <motion.div
            variants={itemVariants}
            className="col-span-2 bg-secondary border-[4px] border-border shadow-brutal flex items-center justify-center p-6"
          >
            <p className="text-foreground font-display text-lg md:text-2xl text-center uppercase">
              MANY HAIRSTYLES.{" "}
              <span className="bg-primary text-primary-foreground px-2 border-[3px] border-border shadow-brutal-sm inline-block">
                MORE CONFIDENCE
              </span>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default LifestyleGallerySection;
