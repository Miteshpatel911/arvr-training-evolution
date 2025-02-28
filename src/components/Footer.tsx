
import { useEffect, useRef } from "react";

const Footer = () => {
  const footerRef = useRef<HTMLDivElement>(null);
  const parallaxBgRef = useRef<HTMLDivElement>(null);
  
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
    
    if (footerRef.current) {
      observer.observe(footerRef.current);
    }
    
    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, []);
  
  useEffect(() => {
    const handleScroll = () => {
      if (!footerRef.current || !parallaxBgRef.current) return;
      const { top } = footerRef.current.getBoundingClientRect();
      const scrollPosition = window.innerHeight - top;
      
      if (scrollPosition > 0 && top < window.innerHeight) {
        const scrollValue = scrollPosition * 0.02;
        parallaxBgRef.current.style.transform = `translateY(${scrollValue}px)`;
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <footer className="w-full py-16 bg-black relative" ref={footerRef}>
      <div 
        ref={parallaxBgRef}
        className="bg-parallax bg-[url('https://images.unsplash.com/photo-1636953056323-9c09fdd74fa6')]"
      ></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-black/80 z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10 opacity-0">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <a href="#" className="text-xl font-semibold tracking-tight block mb-4">
              <span className="gradient-text">AR/VR</span> Training
            </a>
            <p className="text-white/70 mb-6">
              Enhancing workforce training with immersive AR, VR & AI-powered solutions.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/40 mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {["About Us", "Solutions", "Case Studies", "Pricing", "Blog"].map((item) => (
                <li key={item}>
                  <a 
                    href="#" 
                    className="text-white/70 hover:text-primary transition-colors duration-300"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/40 mb-4">Solutions</h3>
            <ul className="space-y-3">
              {["VR Training", "AR Maintenance", "Mobile Apps", "Desktop Apps", "AI Assistants"].map((item) => (
                <li key={item}>
                  <a 
                    href="#" 
                    className="text-white/70 hover:text-primary transition-colors duration-300"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/40 mb-4">Contact</h3>
            <ul className="space-y-3 text-white/70">
              <li>123 Training Blvd, Suite 456</li>
              <li>San Francisco, CA 94107</li>
              <li>info@example.com</li>
              <li>+1 (234) 567-890</li>
            </ul>
            
            <div className="flex space-x-4 mt-6">
              {["Twitter", "LinkedIn", "Facebook", "YouTube"].map((platform) => (
                <a 
                  key={platform} 
                  href="#" 
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/70 hover:bg-primary/20 hover:text-primary transition-all duration-300"
                >
                  {platform.charAt(0)}
                </a>
              ))}
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/50 text-sm">
            © {new Date().getFullYear()} AR/VR Training Solutions. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-white/50 hover:text-primary text-sm transition-colors duration-300">
              Privacy Policy
            </a>
            <a href="#" className="text-white/50 hover:text-primary text-sm transition-colors duration-300">
              Terms of Service
            </a>
            <a href="#" className="text-white/50 hover:text-primary text-sm transition-colors duration-300">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
