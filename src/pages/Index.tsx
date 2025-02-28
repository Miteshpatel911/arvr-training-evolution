
import { useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Benefits from "@/components/Benefits";
import ProductDemo from "@/components/ProductDemo";
import Testimonials from "@/components/Testimonials";
import Features from "@/components/Features";
import FAQ from "@/components/FAQ";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";

const Index = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Initialize parallax scroll effect
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const scrollY = window.scrollY;
      const parallaxLayers = containerRef.current.querySelectorAll('.parallax-layer');
      const bgParallaxLayers = containerRef.current.querySelectorAll('.bg-parallax');
      
      parallaxLayers.forEach((layer, index) => {
        const speed = index % 2 === 0 ? 0.1 : -0.1;
        (layer as HTMLElement).style.transform = `translateY(${scrollY * speed}px)`;
      });
      
      bgParallaxLayers.forEach((layer, index) => {
        const speed = (index % 3 + 1) * 0.05;
        (layer as HTMLElement).style.transform = `translateY(${scrollY * speed}px)`;
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <div className="relative min-h-screen" ref={containerRef}>
      {/* Global background - subtle pattern */}
      <div className="fixed inset-0 bg-[radial-gradient(rgba(0,80,50,0.03)_1px,transparent_1px)] bg-[length:20px_20px] opacity-30 pointer-events-none"></div>
      
      <Navbar />
      <Hero />
      <Benefits />
      <Features />
      <ProductDemo />
      <Testimonials />
      <FAQ />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Index;
