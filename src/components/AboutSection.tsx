import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Users, Globe, Target, Shield, Zap } from 'lucide-react';

const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const features = [
    {
      icon: <Trophy className="w-8 h-8 text-white" />,
      title: "Award-Winning Games",
      description: "Exceptional quality and innovative mechanics."
    },
    {
      icon: <Shield className="w-8 h-8 text-white" />,
      title: "Secure & Fair",
      description: "Highest security standards and certified fair play."
    },
    {
      icon: <Zap className="w-8 h-8 text-white" />,
      title: "Cutting-Edge Tech",
      description: "Latest web technologies for smooth experiences."
    },
    {
      icon: <Globe className="w-8 h-8 text-white" />,
      title: "Global Reach",
      description: "Enjoyed by players worldwide."
    }
  ];

  return (
    <section id="about" className="py-20 relative overflow-hidden" ref={sectionRef}>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left column - About content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              ABOUT GLADIATOR STUDIO
            </motion.h2>
            
            <motion.p 
              className="text-slate-300 mb-8 leading-relaxed text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Founded with passion for innovation, Gladiator Studio has established itself as a leading force in iGaming. Based in London, we combine cutting-edge technology with creative storytelling.
            </motion.p>
            
            {/* Mobile: Shorter description */}
            <motion.p 
              className="text-gray-400 mb-10 leading-relaxed text-lg hidden md:block"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              Our dedicated team works tirelessly to push the boundaries of online gaming. With focus on quality, security, and player satisfaction, we create games that captivate audiences worldwide.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <motion.button 
                onClick={() => scrollToSection('journey')}
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 relative overflow-hidden"
                whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(220, 38, 38, 0.3)" }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Button shimmer effect */}
                <div className="absolute inset-0 -translate-x-full hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                <span className="relative z-10">Our Journey</span>
              </motion.button>
              <motion.button 
                onClick={() => scrollToSection('careers')}
                className="bg-transparent border-2 border-gray-600 hover:border-white text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:bg-white/10"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Join Our Team
              </motion.button>
            </motion.div>
          </motion.div>
          
          {/* Right column - Features grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                className="bg-gray-800/40 p-6 rounded-xl border border-gray-700/50 hover:border-red-500/50 transition-all duration-300 backdrop-blur-sm"
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 + 0.7 }}
                whileHover={{ 
                  y: -8, 
                  scale: 1.02,
                  boxShadow: "0 20px 40px rgba(220, 38, 38, 0.1)"
                }}
              >
                <motion.div 
                  className="mb-4"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;