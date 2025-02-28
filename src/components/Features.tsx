
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const features = [
  {
    title: "Immersive VR & AR Simulations",
    description: "Realistic, interactive training experiences that simulate real-world scenarios with accuracy and detail.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 17.25C9 18.4926 5.96243 19.5 2.25 19.5C1.85218 19.5 1.47064 19.342 1.18934 19.0607C0.908035 18.7794 0.75 18.3978 0.75 18V6C0.75 5.60218 0.908035 5.22064 1.18934 4.93934C1.47064 4.65804 1.85218 4.5 2.25 4.5C5.96243 4.5 9 5.5074 9 6.75M9 17.25V6.75M9 17.25C9 18.4926 12.0376 19.5 15.75 19.5C19.4624 19.5 22.5 18.4926 22.5 17.25V6.75C22.5 5.5074 19.4624 4.5 15.75 4.5C12.0376 4.5 9 5.5074 9 6.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    title: "Step-by-Step Industrial Process Training",
    description: "Reduce errors with guided virtual training that breaks complex procedures into easy-to-follow steps.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 5.25H15.75M9 9.75H15.75M9 14.25H12M21 11.9999C21 13.7991 20.5407 15.5649 19.6747 17.1371C18.8087 18.7094 17.5622 19.9302 16.0794 20.7534C14.5967 21.5765 12.9223 21.9756 11.2202 21.9105C9.51817 21.8454 7.88349 21.3186 6.47588 20.387C5.06828 19.4553 3.94227 18.1522 3.21464 16.6239C2.487 15.0957 2.18691 13.4055 2.34856 11.7329C2.51021 10.0603 3.12726 8.47233 4.13162 7.12743C5.13599 5.78254 6.4825 4.73756 8.0099 4.1079" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    title: "AI-Powered Knowledge Assistants",
    description: "Instant answers and troubleshooting for technicians, providing expert knowledge exactly when needed.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.75 13.5L14.25 2.25L20.25 8.25L9 19.5H3.75V13.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M14.25 2.25L20.25 8.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 5.25L18 11.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    title: "Multi-Device Compatibility",
    description: "Works seamlessly on mobile, tablets, desktop, and VR headsets for maximum accessibility and flexibility.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.5 1.5H8.25C7.00736 1.5 6 2.50736 6 3.75V20.25C6 21.4926 7.00736 22.5 8.25 22.5H15.75C16.9926 22.5 18 21.4926 18 20.25V3.75C18 2.50736 16.9926 1.5 15.75 1.5H13.5M10.5 1.5V3H13.5V1.5M10.5 1.5H13.5M10.5 18.75H13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    title: "Customizable for Any Industry",
    description: "Tailored solutions for automotive, healthcare, oil & gas, and more with industry-specific content.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.59 14.58L12 12.17L14.41 14.58L13 16L12 15L11 16L9.59 14.58Z" fill="currentColor"/>
        <path d="M12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20Z" fill="currentColor"/>
        <path d="M7 14L8 9L12 7L16 9L17 14L12 17L7 14ZM9.62 13.16L12 12.17L14.38 13.16L13.84 10.76L12 10L10.16 10.76L9.62 13.16Z" fill="currentColor"/>
      </svg>
    )
  }
];

const FeatureCard = ({ 
  title, 
  description, 
  icon, 
  index 
}: { 
  title: string; 
  description: string; 
  icon: React.ReactNode;
  index: number;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
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
    
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    
    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);
  
  return (
    <div 
      ref={cardRef}
      className="glass-morphism p-8 rounded-xl opacity-0 transition-all duration-500 hover:bg-white/10"
      style={{ animationDelay: `${index * 0.15}s` }}
    >
      <div className="mb-4 text-primary">{icon}</div>
      <h3 className="text-xl font-medium mb-3">{title}</h3>
      <p className="text-white/70">{description}</p>
    </div>
  );
};

const Features = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  
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
    
    if (titleRef.current) {
      observer.observe(titleRef.current);
    }
    
    return () => {
      if (titleRef.current) {
        observer.unobserve(titleRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const { top } = sectionRef.current.getBoundingClientRect();
      
      if (top < window.innerHeight && top > -sectionRef.current.clientHeight) {
        const scrollProgress = 1 - (top / window.innerHeight);
        sectionRef.current.style.backgroundPosition = `center ${scrollProgress * 20}%`;
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="solutions" className="section" ref={sectionRef}>
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d')] bg-cover bg-center opacity-5 z-0"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/90 to-background z-0"></div>
      
      <div className="section-inner">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 
            ref={titleRef}
            className="text-3xl md:text-4xl font-medium mb-4 opacity-0"
          >
            Advanced Features for <span className="gradient-text">Scalable, Effective Training</span>
          </h2>
          <p className="text-white/70">
            Our comprehensive suite of training tools designed to meet the needs of modern industrial workforces.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
