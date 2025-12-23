const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 border-t border-border/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-1">
            <span className="font-display text-xl font-bold text-gradient-purple">
              SPY
            </span>
            <span className="font-display text-xl font-light text-foreground">
              HAIR
            </span>
          </div>

          {/* Copyright */}
          <p className="text-muted-foreground text-sm">
            © {currentYear} SPYHAIR. All rights reserved.
          </p>

          {/* Contact */}
          <a
            href="https://wa.me/919876543210"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors text-sm"
          >
            Contact via WhatsApp
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
