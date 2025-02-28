
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    quote: "Our VR-based assembly training reduced errors by 40% and improved technician efficiency by 30% within the first quarter!",
    author: "Operations Head, Automotive Industry",
    logo: "",
    rating: 5
  },
  {
    quote: "The AR maintenance guides have revolutionized how we support field technicians. Issues that used to take hours to resolve are now fixed in minutes.",
    author: "Director of Field Services, Energy Sector",
    logo: "",
    rating: 5
  },
  {
    quote: "Implementation was seamless and the ROI was evident within weeks. We've seen dramatic improvements in safety metrics and training effectiveness.",
    author: "Chief Learning Officer, Manufacturing",
    logo: "",
    rating: 4
  }
];

const RatingStar = ({ filled }: { filled: boolean }) => (
  <svg 
    width="20" 
    height="20" 
    viewBox="0 0 20 20" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={filled ? "text-primary" : "text-white/30"}
  >
    <path 
      d="M9.99935 1.66675L12.5744 6.88341L18.3327 7.72508L14.166 11.7834L15.1494 17.5167L9.99935 14.8167L4.84935 17.5167L5.83268 11.7834L1.66602 7.72508L7.42435 6.88341L9.99935 1.66675Z" 
      fill="currentColor"
    />
  </svg>
);

const TestimonialCard = ({ 
  quote, 
  author, 
  rating, 
  index 
}: { 
  quote: string; 
  author: string; 
  logo?: string; 
  rating: number;
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
      className="glass-morphism p-8 rounded-xl opacity-0"
      style={{ animationDelay: `${index * 0.2}s` }}
    >
      <div className="flex mb-4">
        {[...Array(5)].map((_, i) => (
          <RatingStar key={i} filled={i < rating} />
        ))}
      </div>
      
      <p className="text-white/90 text-lg mb-6 italic">"{quote}"</p>
      
      <div className="flex items-center">
        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-medium">
          {author.charAt(0)}
        </div>
        <div className="ml-3">
          <p className="text-sm text-white/80">{author}</p>
        </div>
      </div>
    </div>
  );
};

const Testimonials = () => {
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
      const cards = sectionRef.current.querySelectorAll('.glass-morphism');
      
      if (top < window.innerHeight && top > -sectionRef.current.clientHeight) {
        const offset = (window.innerHeight - top) * 0.05;
        
        cards.forEach((card, index) => {
          (card as HTMLElement).style.transform = `translateY(${offset * (index % 2 === 0 ? -1 : 1)}px)`;
        });
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="case-studies" className="section bg-gradient-to-b from-background to-black" ref={sectionRef}>
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1505740420928-5e560c06d30e')] bg-cover bg-center opacity-5 z-0"></div>
      
      <div className="section-inner">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 
            ref={titleRef}
            className="text-3xl md:text-4xl font-medium mb-8 opacity-0"
          >
            Trusted by Leading <span className="gradient-text">Manufacturing & Industrial Companies</span>
          </h2>
          
          {/* Company logos (placeholders) */}
          <div className="flex flex-wrap justify-center gap-8 mb-16 opacity-50">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-32 h-16 bg-white/10 rounded-md flex items-center justify-center">
                <div className="text-white/30 text-xs">COMPANY LOGO</div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              quote={testimonial.quote}
              author={testimonial.author}
              rating={testimonial.rating}
              index={index}
            />
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <a 
            href="#" 
            className="inline-flex items-center text-primary hover:text-primary/80 transition-colors duration-300"
          >
            <span className="mr-2">Read the Full Case Study</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
