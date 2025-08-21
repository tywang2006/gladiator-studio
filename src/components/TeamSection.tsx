import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Code, Gamepad2, Trophy, Linkedin, Github, Mail, MapPin, Calendar, Star } from 'lucide-react';

const TeamSection: React.FC = () => {
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

  const teamMembers = [
    {
      name: "Chao Wang",
      role: "CTO & Head of Game Development",
      bio: "Visionary technology leader with extensive experience in game development and blockchain technologies. Leading Gladiator Studio's technical innovation and game development strategy.",
      image: "https://media.licdn.com/dms/image/v2/D4E03AQHGluRw7LApWA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1711656768058?e=1758758400&v=beta&t=tzfQD9m5GptcVP7K9xOY10J6vJYQ4_29fXBk6Vrtrp8",
      linkedin: "https://www.linkedin.com/in/chaow/",
      email: "cwang@metawin.inc",
      location: "London, UK",
      experience: "10+ years",
      specialties: ["Game Development", "Blockchain Technology", "Technical Leadership", "Product Strategy"],
      achievements: [
  "Led development of 10+ successful gaming products",
  "Core contributor to Pixi.js, advancing 2D web graphics performance",
  "Architected and led development of a high-traffic gaming aggregation platform with daily revenue exceeding $100M",
  "Expert in Pixi.js and modern web technologies (TypeScript, WebGL, WebAssembly)",
  "Pioneered innovative gaming mechanics and scalable game frameworks",
  "Founder and creator of Chao2D rendering engine for high-performance game rendering",
  "Developed a Newtonian physics engine for H5 games, enabling realistic motion and interaction",
  "AWS top-tier player and architect of highly resilient, low-latency systems",
  "Google Cloud Platform (GCP) elite user with deep expertise in cloud-native game infrastructure",
  "Built and scaled high-performance development teams across multiple game genres and technologies"
]

    }
  ];

  const stats = [
    { label: "Years Experience", value: "10+", icon: <Calendar className="w-5 h-5" /> },
    { label: "Games Shipped", value: "15+", icon: <Gamepad2 className="w-5 h-5" /> },
    { label: "Team Members", value: "25+", icon: <Users className="w-5 h-5" /> },
    { label: "Awards Won", value: "8", icon: <Trophy className="w-5 h-5" /> }
  ];

  return (
    <section id="team" className="py-20 relative overflow-hidden" ref={sectionRef}>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 md:mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <Users className="w-5 h-5 text-red-500" />
            <span className="text-red-400 font-semibold text-sm uppercase tracking-wider">Our Team</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Who <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-purple-600">We Are</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base">
            Meet the passionate team behind Gladiator Studio's innovative gaming experiences
          </p>
        </motion.div>

        {/* Team Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12 md:mb-16"
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-900/60 to-gray-800/60 backdrop-blur-sm p-4 md:p-6 rounded-xl border border-gray-700/30 hover:border-red-500/30 transition-all duration-300 text-center group"
            >
              <div className="text-red-500 mb-2 flex justify-center group-hover:scale-110 transition-transform duration-300">
                {stat.icon}
              </div>
              <div className="text-xl md:text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-gray-400 text-xs md:text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Team Member Profile */}
        <div className="max-w-6xl mx-auto">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-gradient-to-br from-gray-900/70 to-gray-800/70 backdrop-blur-sm rounded-2xl border border-gray-700/50 hover:border-red-500/30 transition-all duration-500 overflow-hidden"
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6 md:p-8">
                
                {/* Profile Image & Basic Info */}
                <div className="lg:col-span-1">
                  <div className="text-center lg:text-left">
                    <div className="relative inline-block mb-6">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-32 h-32 md:w-40 md:h-40 rounded-2xl object-cover border-4 border-gray-700/50 shadow-2xl"
                      />
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-gray-800 flex items-center justify-center">
                        <div className="w-3 h-3 bg-white rounded-full"></div>
                      </div>
                    </div>
                    
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{member.name}</h3>
                    <p className="text-red-400 font-semibold mb-4 text-sm md:text-base">{member.role}</p>
                    
                    {/* Contact Info */}
                    <div className="space-y-2 mb-6">
                      <div className="flex items-center justify-center lg:justify-start gap-2 text-gray-400 text-sm">
                        <MapPin className="w-4 h-4" />
                        <span>{member.location}</span>
                      </div>
                      <div className="flex items-center justify-center lg:justify-start gap-2 text-gray-400 text-sm">
                        <Star className="w-4 h-4" />
                        <span>{member.experience} Experience</span>
                      </div>
                    </div>

                    {/* Social Links */}
                    <div className="flex justify-center lg:justify-start gap-3">
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-blue-600/20 hover:bg-blue-600/30 rounded-xl transition-all duration-300 text-blue-400 hover:text-blue-300 hover:scale-110"
                      >
                        <Linkedin className="w-5 h-5" />
                      </a>
                      <a
                        href={`mailto:${member.email}`}
                        className="p-3 bg-red-600/20 hover:bg-red-600/30 rounded-xl transition-all duration-300 text-red-400 hover:text-red-300 hover:scale-110"
                      >
                        <Mail className="w-5 h-5" />
                      </a>
                      <a
                        href="https://github.com/gladiator-studio"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-gray-600/20 hover:bg-gray-600/30 rounded-xl transition-all duration-300 text-gray-400 hover:text-gray-300 hover:scale-110"
                      >
                        <Github className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Detailed Information */}
                <div className="lg:col-span-2 space-y-6">
                  
                  {/* Bio */}
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                      <Code className="w-5 h-5 text-red-500" />
                      About
                    </h4>
                    <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                      {member.bio}
                    </p>
                  </div>

                  {/* Specialties */}
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                      <Gamepad2 className="w-5 h-5 text-red-500" />
                      Specialties
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {member.specialties.map((specialty, i) => (
                        <span
                          key={i}
                          className="px-3 py-1.5 bg-gradient-to-r from-red-500/20 to-purple-500/20 text-red-300 rounded-full text-xs md:text-sm font-medium border border-red-500/30"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Key Achievements */}
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                      <Trophy className="w-5 h-5 text-red-500" />
                      Key Achievements
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {member.achievements.map((achievement, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-3 p-3 bg-gray-800/30 rounded-lg border border-gray-700/30"
                        >
                          <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-300 text-xs md:text-sm leading-relaxed">
                            {achievement}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-12 md:mt-16"
        >
          <div className="bg-gradient-to-br from-gray-900/60 to-gray-800/60 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-gray-700/30 max-w-2xl mx-auto">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-4">
              Join Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-purple-600">Team</span>
            </h3>
            <p className="text-gray-400 mb-6 text-sm md:text-base">
              We're always looking for talented individuals who share our passion for creating exceptional gaming experiences.
            </p>
            <button
              onClick={() => document.getElementById('careers')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-red-500/25 relative overflow-hidden"
            >
              {/* Button shimmer effect */}
              <div className="absolute inset-0 -translate-x-full hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
              <span className="relative z-10">View Open Positions</span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TeamSection;