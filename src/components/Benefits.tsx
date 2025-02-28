
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type BenefitCardProps = {
  title: string;
  description: string;
  stat: string;
  index: number;
};

const BenefitCard = ({ title, description, stat, index }: BenefitCardProps) => {
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
      className={cn(
        "stats-card opacity-0",
        "flex flex-col h-full"
      )}
      style={{ animationDelay: `${index * 0.1 + 0.2}s` }}
    >
      <h3 className="font-medium text-lg mb-2">{title}</h3>
      <p className="text-white/70 mb-4 flex-grow">{description}</p>
      <div className="mt-auto">
        <span className="text-2xl font-bold gradient-text block">{stat}</span>
      </div>
    </div>
  );
};

const Benefits = () => {
  const benefitsData = [
    {
      title: "Immersive VR & AR Training",
      description: "Train employees with hands-on virtual simulations.",
      stat: "70% Increase in retention"
    },
    {
      title: "3D Mobile & Desktop Apps",
      description: "Provide scalable, on-demand learning solutions.",
      stat: "50% Reduction in costs"
    },
    {
      title: "Industrial Process Training",
      description: "Teach complex procedures with step-by-step guidance.",
      stat: "60% Faster onboarding"
    },
    {
      title: "Technician & Assembly Training",
      description: "Practice assembling components in a risk-free environment.",
      stat: "40% Improvement in accuracy"
    },
    {
      title: "AI-Powered Training Assistants",
      description: "Provide real-time, intelligent support for troubleshooting.",
      stat: "30% Reduction in downtime"
    },
    {
      title: "DIY & Customer Education Apps",
      description: "Guide users through self-maintenance and product usage.",
      stat: "45% Increase in satisfaction"
    }
  ];

  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
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
      if (!sectionRef.current || !parallaxBgRef.current) return;
      const { top, height } = sectionRef.current.getBoundingClientRect();
      const scrollPosition = window.innerHeight - top;
      
      if (scrollPosition > 0 && top < window.innerHeight) {
        const scrollValue = scrollPosition * 0.05;
        parallaxBgRef.current.style.transform = `translateY(${scrollValue}px)`;
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="benefits" className="section bg-gradient-to-b from-background to-black" ref={sectionRef}>
      <div 
        ref={parallaxBgRef}
        className="bg-parallax bg-[url('https://images.unsplash.com/photo-1519389950473-47ba0277781c')]"
      ></div>
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-black z-0"></div>
      
      <div className="section-inner">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 
            ref={titleRef}
            className="text-3xl md:text-4xl font-medium mb-4 opacity-0"
          >
            Revolutionizing Training with <span className="gradient-text">AR, VR & AI-Powered Solutions</span>
          </h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefitsData.map((benefit, index) => (
            <BenefitCard
              key={index}
              title={benefit.title}
              description={benefit.description}
              stat={benefit.stat}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
