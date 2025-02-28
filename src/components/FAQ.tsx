
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type FAQItemProps = {
  question: string;
  answer: string;
  index: number;
};

const faqs = [
  {
    question: "How do your AR/VR training solutions work?",
    answer: "Our solutions create interactive training experiences that simulate real-world tasks, improving knowledge retention and reducing training time. Users can interact with virtual objects, practice procedures, and receive real-time feedback in a safe environment."
  },
  {
    question: "Do I need special hardware?",
    answer: "Our solutions work on VR headsets, mobile devices, tablets, and desktops, making them accessible to all employees. While VR headsets provide the most immersive experience, our applications are designed to be effective across all platforms."
  },
  {
    question: "How long does implementation take?",
    answer: "Implementation timelines vary based on the complexity of your training needs, but typically range from 4-12 weeks. We offer a phased approach that allows you to see results quickly while we continue to develop more advanced modules."
  },
  {
    question: "Can training content be customized for our specific processes?",
    answer: "Absolutely! Customization is a core strength of our platform. We work closely with your subject matter experts to capture your exact processes, equipment, and best practices to create training that's tailored to your specific needs."
  },
  {
    question: "How do you measure training effectiveness?",
    answer: "Our platform includes comprehensive analytics that track user progress, knowledge retention, completion rates, and time-to-proficiency. We can integrate with your existing LMS and provide regular reports on key performance indicators."
  },
  {
    question: "What kind of ROI can we expect?",
    answer: "Clients typically see ROI within 3-6 months through reduced training costs, faster onboarding, fewer errors, and improved productivity. We'll work with you to establish baseline metrics and track improvements over time."
  }
];

const FAQItem = ({ question, answer, index }: FAQItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);
  
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
    
    if (itemRef.current) {
      observer.observe(itemRef.current);
    }
    
    return () => {
      if (itemRef.current) {
        observer.unobserve(itemRef.current);
      }
    };
  }, []);
  
  return (
    <div 
      ref={itemRef}
      className={cn(
        "border-b border-white/10 py-6 opacity-0 transition-all duration-300",
        isOpen ? "pb-8" : ""
      )}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <button
        className="flex justify-between items-center w-full text-left group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-xl font-medium group-hover:text-primary transition-colors duration-300">
          {question}
        </h3>
        <div className={cn(
          "w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 bg-white/10 group-hover:bg-primary/20",
          isOpen ? "rotate-45" : ""
        )}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </button>
      
      <div className={cn(
        "grid transition-all duration-300 overflow-hidden",
        isOpen ? "grid-rows-[1fr] mt-4 opacity-100" : "grid-rows-[0fr] opacity-0"
      )}>
        <div className="overflow-hidden">
          <p className="text-white/70 leading-relaxed">{answer}</p>
        </div>
      </div>
    </div>
  );
};

const FAQ = () => {
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

  return (
    <section id="faq" className="section" ref={sectionRef}>
      <div className="absolute inset-0 bg-gradient-to-b from-black to-background z-0"></div>
      
      <div className="section-inner">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 
            ref={titleRef}
            className="text-3xl md:text-4xl font-medium mb-4 opacity-0"
          >
            Got Questions? <span className="gradient-text">We've Got Answers</span>
          </h2>
        </div>
        
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
