
import { useEffect, useRef } from "react";

const CallToAction = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
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
    
    if (contentRef.current) {
      observer.observe(contentRef.current);
    }
    
    return () => {
      if (contentRef.current) {
        observer.unobserve(contentRef.current);
      }
    };
  }, []);

  return (
    <section id="contact" className="section bg-gradient-to-b from-background to-black" ref={sectionRef}>
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1473091534298-04dcbce3278c')] bg-cover bg-center opacity-10 z-0"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/80 to-background z-0"></div>
      
      <div className="section-inner">
        <div 
          ref={contentRef}
          className="max-w-3xl mx-auto text-center glass-morphism p-12 rounded-2xl opacity-0"
        >
          <h2 className="text-3xl md:text-4xl font-medium mb-4">
            Ready to <span className="gradient-text">Upgrade Your Training Process?</span>
          </h2>
          <p className="text-white/70 mb-8 max-w-xl mx-auto">
            Join the companies who have transformed their workforce training with our immersive AR, VR & AI solutions.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <button className="primary-button">
              Request a Demo
            </button>
            <button className="secondary-button">
              Get Started Now
            </button>
          </div>
          
          <div className="mt-8 pt-8 border-t border-white/10">
            <p className="text-white/50 mb-4">Or contact us directly</p>
            <div className="flex justify-center gap-6">
              <a href="mailto:info@example.com" className="text-white/70 hover:text-primary transition-colors duration-300">
                info@example.com
              </a>
              <a href="tel:+1234567890" className="text-white/70 hover:text-primary transition-colors duration-300">
                +1 (234) 567-890
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
