import { motion } from "framer-motion";

const TransformationSection = () => {
  return (
    <section className="py-24 bg-background border-y-[5px] border-border relative overflow-hidden">
      <div className="absolute inset-0 bg-dots opacity-30 pointer-events-none" />

      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Images */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative flex justify-center items-end gap-4"
          >
            {/* Before */}
            <div className="relative -rotate-2">
              <div className="w-56 h-72 md:w-64 md:h-80 bg-card border-[4px] border-border shadow-brutal overflow-hidden relative">
                <img
                  src="/transform/before.png"
                  alt="Before transformation"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  width={768}
                  height={768}
                />
                <span className="absolute bottom-3 left-1/2 -translate-x-1/2 font-display text-2xl md:text-3xl bg-foreground text-background px-3 py-1 border-[3px] border-border shadow-brutal-sm">
                  BEFORE
                </span>
              </div>
            </div>

            {/* After */}
            <div className="relative -ml-6 mt-12 rotate-2">
              <div className="w-56 h-72 md:w-64 md:h-80 bg-card border-[4px] border-border shadow-brutal-lg overflow-hidden relative">
                <img
                  src="/transform/after.png"
                  alt="After transformation"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  width={768}
                  height={768}
                />
                <span className="absolute top-3 left-1/2 -translate-x-1/2 font-display text-2xl md:text-3xl bg-primary text-primary-foreground px-3 py-1 border-[3px] border-border shadow-brutal-sm">
                  AFTER
                </span>
              </div>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            viewport={{ once: true }}
            className="text-center lg:text-left"
          >
            <span className="inline-block bg-accent text-accent-foreground border-[3px] border-border px-4 py-1 font-bold uppercase tracking-widest text-sm shadow-brutal-sm -rotate-1 mb-6">
              Real Results
            </span>
            <h2 className="font-display text-4xl md:text-6xl leading-[0.95] text-foreground mb-4">
              CONFIDENT{" "}
              <span className="inline-block bg-primary text-primary-foreground px-3 border-[4px] border-border shadow-brutal rotate-1">
                TRANSFORMATION
              </span>
            </h2>
            <p className="text-lg md:text-xl text-foreground bg-card border-[3px] border-border p-4 shadow-brutal-sm font-medium inline-block">
              by HAIRLAYER
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TransformationSection;
