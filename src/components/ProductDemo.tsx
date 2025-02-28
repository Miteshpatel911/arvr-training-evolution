
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const ProductDemo = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const slides = [
    {
      title: "VR Assembly Training",
      description: "Learn complex assembly procedures in a virtual environment before applying skills in the real world.",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    },
    {
      title: "AR Maintenance Guide",
      description: "Real-time augmented reality overlays that guide technicians through maintenance procedures.",
      image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
    },
    {
      title: "AI Training Assistant",
      description: "Intelligent virtual assistants that provide contextual help and answer questions in real-time.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
    }
  ];
  
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const parallaxBgRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [slides.length]);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (titleRef.current) observer.observe(titleRef.current);
    if (contentRef.current) observer.observe(contentRef.current);
    
    return () => {
      if (titleRef.current) observer.unobserve(titleRef.current);
      if (contentRef.current) observer.unobserve(contentRef.current);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !parallaxBgRef.current) return;
      const { top } = sectionRef.current.getBoundingClientRect();
      const scrollPosition = window.innerHeight - top;
      
      if (scrollPosition > 0 && top < window.innerHeight) {
        const scrollValue = scrollPosition * 0.08;
        parallaxBgRef.current.style.transform = `translateY(-${scrollValue}px)`;
        
        const slideElements = sectionRef.current.querySelectorAll('.demo-slide');
        slideElements.forEach((el) => {
          const rotate = scrollPosition * 0.002; // Subtle rotation
          const scale = 1 + scrollPosition * 0.0002; // Subtle scale
          (el as HTMLElement).style.transform = `rotate(${rotate}deg) scale(${scale})`;
        });
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="demo" className="section bg-gradient-to-b from-black to-background" ref={sectionRef}>
      <div 
        ref={parallaxBgRef}
        className="bg-parallax bg-[url('https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d')]"
      ></div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-background/90 z-0"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,80,50,0.1)_0%,rgba(0,0,0,0)_70%)] z-0"></div>
      
      <div className="section-inner">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 
            ref={titleRef}
            className="text-3xl md:text-4xl font-medium mb-4 opacity-0"
          >
            See Our Training Solutions <span className="gradient-text">in Action</span>
          </h2>
          <p className="text-lg text-white/70 opacity-0" ref={contentRef}>
            Experience how companies are using AR, VR, and AI to upskill employees, reduce errors, and streamline complex processes.
          </p>
        </div>
        
        <div className="relative max-w-4xl mx-auto glass-morphism rounded-2xl overflow-hidden">
          <div className="aspect-[16/9] relative overflow-hidden">
            {slides.map((slide, index) => (
              <div 
                key={index}
                className={cn(
                  "demo-slide absolute inset-0 transition-all duration-1000 ease-in-out",
                  index === activeSlide ? "opacity-100 z-20" : "opacity-0 z-10"
                )}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10"></div>
                <img 
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 z-20 p-8">
                  <h3 className="text-2xl font-medium mb-2">{slide.title}</h3>
                  <p className="text-white/80 mb-4 max-w-lg">{slide.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-30">
            {slides.map((_, index) => (
              <button
                key={index}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  index === activeSlide ? "bg-primary w-8" : "bg-white/30 hover:bg-white/50"
                )}
                onClick={() => setActiveSlide(index)}
              />
            ))}
          </div>
        </div>
        
        <div className="text-center mt-8">
          <button className="primary-button">
            Try the Demo
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductDemo;
