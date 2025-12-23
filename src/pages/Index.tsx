import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProductsSection from "@/components/ProductsSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>SPYHAIR | Premium Hair Systems Collection</title>
        <meta
          name="description"
          content="Explore SPYHAIR's collection of premium, undetectable hair systems for men. 100% natural hair, custom-fitted solutions."
        />
        <meta
          name="keywords"
          content="hair systems India, men's hair replacement, toupee, hair solutions Mumbai, premium wigs for men, spyhair"
        />
        <link rel="canonical" href="https://spyhair.com" />
      </Helmet>

      <main className="min-h-screen bg-background">
        <Navbar />
        <HeroSection />
        <ProductsSection />
        <Footer />
      </main>
    </>
  );
};

export default Index;