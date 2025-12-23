import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border/50 py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-1">
          <span className="font-display text-2xl font-bold text-gradient-purple">
            SPY
          </span>
          <span className="font-display text-2xl font-light text-foreground">
            HAIR
          </span>
        </a>

        {/* Desktop - Contact */}
        <div className="hidden md:flex items-center gap-6">
          <a
            href="#products"
            className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium"
          >
            Collection
          </a>
          <a
            href="https://wa.me/919876543210"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-purple text-primary-foreground font-semibold px-6 py-2.5 rounded-md hover:opacity-90 transition-opacity"
          >
            Contact Us
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-foreground p-2"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-background/98 backdrop-blur-md border-b border-border"
        >
          <div className="container mx-auto px-4 py-6 flex flex-col gap-4">
            <a
              href="#products"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-foreground hover:text-primary transition-colors py-2 font-medium"
            >
              Collection
            </a>
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-purple text-primary-foreground font-semibold px-6 py-3 rounded-md text-center"
            >
              Contact Us
            </a>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
