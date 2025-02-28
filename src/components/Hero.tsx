
import { useEffect, useRef } from "react";

const Hero = () => {
  const parallaxRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (!parallaxRef.current) return;
      const scrollY = window.scrollY;
      parallaxRef.current.style.transform = `translateY(${scrollY * 0.4}px)`;
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden flex items-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-background z-10"></div>
        <div 
          ref={parallaxRef}
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1605810230434-7631ac76ec81')] bg-cover bg-center opacity-50"
        ></div>
      </div>
      
      {/* Hero Content */}
      <div className="container mx-auto px-4 relative z-20 mt-10">
        <div className="max-w-3xl animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <h1 className="text-4xl sm:text-5xl md:text-[44px] lg:text-[48px] font-semibold leading-tight tracking-tight mb-4">
            Enhancing Workforce Training with
            <span className="gradient-text block mt-2">AR, VR & AI-Powered Solutions</span>
          </h1>
          
          <p className="text-lg text-white/80 mb-8 max-w-2xl">
            Boost efficiency, reduce training costs, and improve knowledge retention with 
            immersive digital training solutions tailored for manufacturing and industrial processes.
          </p>

          <div className="flex flex-wrap gap-4">
            <button className="primary-button">
              Request a Demo
            </button>
            <button className="secondary-button">
              Learn More
            </button>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-pulse-slow">
        <span className="text-sm text-white/60 mb-2">Scroll to explore</span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 5V19M12 19L19 12M12 19L5 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
  );
};

export default Hero;
