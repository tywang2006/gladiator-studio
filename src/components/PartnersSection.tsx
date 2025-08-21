import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Users, Code } from 'lucide-react';

const PartnersSection: React.FC = () => {
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

  const operators = [
    {
      name: "MetaWin",
      url: "https://metawin.com",
      logo: "🎰",
      description: "Leading crypto casino platform"
    },
    {
      name: "Rolla",
      url: "https://rolla.com",
      logo: "🎲",
      description: "Premium gaming experience"
    },
    {
      name: "WowVegas",
      url: "https://wowvegas.com",
      logo: "✨",
      description: "Social casino entertainment"
    }
  ];

  const techPartners = [
    {
      name: "Tequity",
      url: "https://tequity.ventures/",
      logo: "🚀",
      description: "Venture capital & growth"
    },
    {
      name: "AWS",
      url: "https://aws.amazon.com",
      logo: "☁️",
      description: "Cloud infrastructure"
    },
    {
      name: "Google Cloud",
      url: "https://cloud.google.com",
      logo: "🌐",
      description: "Cloud computing platform"
    },
    {
      name: "Node.js",
      url: "https://nodejs.org",
      logo: "💚",
      description: "JavaScript runtime"
    },
    {
      name: "TypeScript",
      url: "https://typescriptlang.org",
      logo: "🔷",
      description: "Typed JavaScript"
    },
    {
      name: "Python",
      url: "https://python.org",
      logo: "🐍",
      description: "Programming language"
    }
  ];

  const PartnerCard = ({ partner, index, delay }: { partner: any, index: number, delay: number }) => (
    <motion.a
      href={partner.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block bg-gray-800/30 p-6 rounded-xl border border-gray-700/50 hover:border-red-500/50 transition-all duration-300 backdrop-blur-sm"
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: delay }}
      whileHover={{ 
        y: -8, 
        scale: 1.02,
        boxShadow: "0 20px 40px rgba(220, 38, 38, 0.1)"
      }}
    >
      <div className="flex items-center gap-4">
        <div className="text-3xl">{partner.logo}</div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-white group-hover:text-red-400 transition-colors">
              {partner.name}
            </h3>
            <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-red-400 transition-colors" />
          </div>
          <p className="text-gray-400 text-sm">{partner.description}</p>
        </div>
      </div>
    </motion.a>
  );

  return (
    <section id="partners" className="py-20 relative overflow-hidden" ref={sectionRef}>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-purple-600">Partners</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            We collaborate with industry leaders to deliver exceptional gaming experiences
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Operators */}
          <div>
            <motion.div 
              className="flex items-center gap-3 mb-8"
              initial={{ opacity: 0, x: -30 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Users className="w-6 h-6 text-red-500" />
              <h3 className="text-2xl font-bold text-white">Operator Partners</h3>
            </motion.div>
            <div className="space-y-4">
              {operators.map((partner, index) => (
                <PartnerCard 
                  key={partner.name} 
                  partner={partner} 
                  index={index} 
                  delay={0.3 + index * 0.1} 
                />
              ))}
            </div>
          </div>

          {/* Technology Partners */}
          <div>
            <motion.div 
              className="flex items-center gap-3 mb-8"
              initial={{ opacity: 0, x: 30 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Code className="w-6 h-6 text-red-500" />
              <h3 className="text-2xl font-bold text-white">Technology Partners</h3>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {techPartners.map((partner, index) => (
                <PartnerCard 
                  key={partner.name} 
                  partner={partner} 
                  index={index} 
                  delay={0.6 + index * 0.1} 
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;