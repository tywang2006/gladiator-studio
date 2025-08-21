import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Trophy, Users, Rocket, Star, Zap } from 'lucide-react';

const JourneySection: React.FC = () => {
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

  const milestones = [
    {
      year: "2023",
      title: "Studio Founded",
      description: "Gladiator Studio established under MetaWin with a vision to revolutionize iGaming.",
      icon: <Rocket className="w-4 h-4" />,
      color: "from-blue-500 to-purple-600"
    },
    {
      year: "2024",
      title: "First Launch",
      description: "Successfully launched 'To The Top' - our flagship slot game to critical acclaim.",
      icon: <Trophy className="w-4 h-4" />,
      color: "from-red-500 to-orange-600"
    },
    {
      year: "2024",
      title: "Partnership Growth",
      description: "Expanded partnerships with leading operators including Rolla and WowVegas.",
      icon: <Users className="w-4 h-4" />,
      color: "from-green-500 to-teal-600"
    },
    {
      year: "2025",
      title: "Global Expansion",
      description: "Scaling worldwide with new innovative games and market expansion.",
      icon: <Star className="w-4 h-4" />,
      color: "from-purple-500 to-pink-600"
    }
  ];

  return (
    <section id="journey" className="py-20 relative overflow-hidden" ref={sectionRef}>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <motion.div 
          className="text-center mb-8 md:mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <Zap className="w-5 h-5 text-red-500" />
            <span className="text-red-400 font-semibold text-sm uppercase tracking-wider">Our Story</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-purple-600">Journey</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-sm md:text-base">
            From vision to industry leadership
          </p>
        </motion.div>

        {/* Compact Timeline for All Devices */}
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-br from-gray-900/60 to-gray-800/60 backdrop-blur-sm p-4 md:p-6 rounded-xl border border-gray-700/30 hover:border-red-500/30 transition-all duration-300 group"
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -4, scale: 1.02 }}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${milestone.color} text-white flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                    {milestone.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-red-400 font-bold text-sm">{milestone.year}</span>
                      <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
                      <h3 className="text-white font-semibold text-sm md:text-base truncate">{milestone.title}</h3>
                    </div>
                    <p className="text-gray-400 text-xs md:text-sm leading-relaxed">{milestone.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default JourneySection;