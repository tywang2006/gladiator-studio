import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Code, Palette, ChevronDown, ChevronRight, Users, Zap, ExternalLink } from 'lucide-react';

const CareersSection: React.FC = () => {
  const [selectedJob, setSelectedJob] = useState<number | null>(null);

  const handleApply = (jobTitle: string) => {
    const subject = encodeURIComponent(`Application for ${jobTitle} Position`);
    const body = encodeURIComponent(`Dear Hiring Manager,\n\nI am writing to apply for the ${jobTitle} position at Gladiator Studio.\n\n[Please include your experience and why you would be a good fit for the role]\n\nBest regards,\n[Your Name]`);
    window.location.href = `mailto:cwang@metawin.inc?subject=${subject}&body=${body}`;
  };

  const jobs = [
    {
      title: "Senior Pixi.js Developer",
      department: "Engineering",
      location: "London, UK",
      type: "Full-time",
      description: "Lead development of engaging slot game experiences using Pixi.js and TypeScript.",
      requirements: ["5+ years JavaScript/TypeScript", "3+ years Pixi.js", "Game development knowledge"],
      icon: <Code className="w-4 h-4" />
    },
    {
      title: "Art Director",
      department: "Creative",
      location: "London, UK", 
      type: "Full-time",
      description: "Lead creative team in developing visually stunning game assets.",
      requirements: ["7+ years game art direction", "Strong portfolio", "Team management"],
      icon: <Palette className="w-4 h-4" />
    }
  ];

  return (
    <section id="careers" className="py-20 relative overflow-hidden">

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <Users className="w-5 h-5 text-red-500" />
            <span className="text-red-400 font-semibold text-sm uppercase tracking-wider">Careers</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Join Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-purple-600">Team</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-sm md:text-base">
            We're looking for talented individuals to help shape the future of iGaming
          </p>
        </motion.div>

        {/* Compact Job Cards */}
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {jobs.map((job, index) => (
              <motion.div
                key={job.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden hover:border-red-500/30 transition-all duration-300"
              >
                <div className="p-4 md:p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="p-2 bg-red-500/20 rounded-lg text-red-500 flex-shrink-0">
                        {job.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold text-white mb-1 truncate">{job.title}</h3>
                        <div className="flex flex-wrap gap-2 text-xs">
                          <span className="px-2 py-1 bg-gray-700/50 rounded-full text-gray-300">
                            {job.department}
                          </span>
                          <span className="px-2 py-1 bg-gray-700/50 rounded-full text-gray-300">
                            {job.location}
                          </span>
                          <span className="px-2 py-1 bg-gray-700/50 rounded-full text-gray-300">
                            {job.type}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button 
                        onClick={() => handleApply(job.title)}
                        className="hidden md:flex bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 items-center gap-2 text-sm"
                      >
                        <Briefcase className="w-3 h-3" />
                        Apply
                      </button>
                      
                      <button
                        onClick={() => setSelectedJob(selectedJob === index ? null : index)}
                        className="p-2 text-gray-400 hover:text-white transition-colors duration-300"
                      >
                        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${selectedJob === index ? 'rotate-180' : ''}`} />
                      </button>
                    </div>
                  </div>
                  
                  {selectedJob === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 pt-4 border-t border-gray-700/50"
                    >
                      <p className="text-gray-400 mb-4 text-sm">{job.description}</p>
                      <div className="mb-4">
                        <h4 className="text-white font-semibold mb-2 text-sm">Key Requirements:</h4>
                        <div className="flex flex-wrap gap-2">
                          {job.requirements.map((req, i) => (
                            <span key={i} className="text-xs bg-gray-700/30 text-gray-300 px-2 py-1 rounded-full">
                              {req}
                            </span>
                          ))}
                        </div>
                      </div>
                      <button 
                        onClick={() => handleApply(job.title)}
                        className="w-full md:w-auto bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 text-sm"
                      >
                        <Briefcase className="w-3 h-3" />
                        Apply Now
                      </button>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* View All Jobs Link */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-6"
          >
            <button 
              onClick={() => window.open('mailto:cwang@metawin.inc?subject=Career Opportunities at Gladiator Studio', '_blank')}
              className="inline-flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors duration-300 text-sm font-medium"
            >
              <span>View all open positions</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CareersSection;