import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProductsSection from "@/components/ProductsSection";
import BenefitsSection from "@/components/BenefitsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Crown Hair Systems | Premium Hair Solutions for Men in India</title>
        <meta
          name="description"
          content="India's leading provider of premium, undetectable hair systems for men. Custom-fitted, 100% natural hair solutions. Book your free consultation today."
        />
        <meta
          name="keywords"
          content="hair systems India, men's hair replacement, toupee, hair solutions Mumbai, premium wigs for men"
        />
        <link rel="canonical" href="https://crownhairsystems.com" />
      </Helmet>

      <main className="min-h-screen bg-background overflow-x-hidden">
        <Navbar />
        <HeroSection />
        <ProductsSection />
        <BenefitsSection />
        <TestimonialsSection />
        <ContactSection />
        <Footer />
      </main>
    </>
  );
};

export default Index;
