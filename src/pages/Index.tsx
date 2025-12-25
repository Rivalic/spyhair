import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import LifestyleGallerySection from "@/components/LifestyleGallerySection";
import { ChatWidget } from "@/components/ChatWidget";
import ProductsSection from "@/components/ProductsSection";
import ProcessSection from "@/components/ProcessSection";
import BenefitsSection from "@/components/BenefitsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>3S Golden Hair | Premium Hair Solutions for Men in India</title>
        <meta
          name="description"
          content="India's leading provider of premium, undetectable hair systems for men. Custom-fitted, 100% natural hair solutions. Book your free consultation today."
        />
        <meta
          name="keywords"
          content="hair systems India, men's hair replacement, toupee, hair solutions Mumbai, premium wigs for men, 3S Golden Hair"
        />
        <link rel="canonical" href="https://3sgoldenhair.com" />
      </Helmet>

      <main className="min-h-screen bg-background overflow-x-hidden">
        <Navbar />
        <HeroSection />
        <LifestyleGallerySection />
        <ProductsSection />
        <ProcessSection />
        <BenefitsSection />
        <TestimonialsSection />
        <ContactSection />
        <Footer />
        <ChatWidget />
      </main>
    </>
  );
};

export default Index;
