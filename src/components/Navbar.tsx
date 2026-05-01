import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

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

  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const navLinks = [
    { name: "Home", href: isHomePage ? "#home" : "/", isRoute: !isHomePage },
    { name: "Products", href: isHomePage ? "#products" : "/#products", isRoute: !isHomePage },
    { name: "Why Us", href: isHomePage ? "#benefits" : "/#benefits", isRoute: !isHomePage },
    { name: "Blog", href: "/blog", isRoute: true },
    { name: "Contact", href: isHomePage ? "#contact" : "/#contact", isRoute: !isHomePage },
    { name: "Admin", href: "/admin/orders", isRoute: true },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 border-b-[3px] border-border ${
        isScrolled
          ? "bg-accent py-3"
          : "bg-background py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2 bg-primary text-primary-foreground px-3 py-1.5 border-[3px] border-border shadow-brutal-sm">
          <span className="font-display text-2xl">
            HAIRLAYER
          </span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            link.isRoute ? (
              <Link
                key={link.name}
                to={link.href}
                className="text-foreground hover:bg-primary hover:text-primary-foreground px-2 py-1 transition-colors duration-150 font-bold text-sm uppercase tracking-wider"
              >
                {link.name}
              </Link>
            ) : (
              <a
                key={link.name}
                href={link.href}
                className="text-foreground hover:bg-primary hover:text-primary-foreground px-2 py-1 transition-colors duration-150 font-bold text-sm uppercase tracking-wider"
              >
                {link.name}
              </a>
            )
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden lg:flex items-center gap-4">
          <a href="tel:+917014512123" className="flex items-center gap-2 text-foreground hover:bg-accent px-2 py-1 border-[3px] border-transparent hover:border-border transition-colors font-bold">
            <Phone className="w-4 h-4" />
            <span className="text-sm">+91 70145 12123</span>
          </a>
          <Button variant="gold" size="lg">
            Book Consultation
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden text-foreground p-2 border-[3px] border-border bg-accent shadow-brutal-sm"
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
          className="lg:hidden bg-background border-b-[3px] border-border"
        >
          <div className="container mx-auto px-4 py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              link.isRoute ? (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-foreground hover:text-primary transition-colors py-2 font-medium"
                >
                  {link.name}
                </Link>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-foreground hover:text-primary transition-colors py-2 font-medium"
                >
                  {link.name}
                </a>
              )
            ))}
            <Button variant="gold" size="lg" className="mt-4 w-full">
              Book Consultation
            </Button>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
