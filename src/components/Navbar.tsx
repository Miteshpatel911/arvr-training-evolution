
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled ? "py-3 bg-black/90 backdrop-blur-xl border-b border-white/10" : "py-6"
      )}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <a 
          href="#" 
          className="text-xl font-semibold tracking-tight"
        >
          <span className="gradient-text">AR/VR</span> Training
        </a>

        <div className="hidden md:flex space-x-8">
          {["Solutions", "Benefits", "Demo", "Case Studies", "FAQ"].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase().replace(/\s/g, '-')}`}
              className="text-sm text-muted-foreground hover-underline transition-colors duration-300 hover:text-white"
            >
              {item}
            </a>
          ))}
        </div>

        <a 
          href="#contact" 
          className="rounded-full px-4 py-2 text-sm font-medium bg-primary text-primary-foreground transition-all duration-300 hover:scale-105 active:scale-95"
        >
          Contact Us
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
