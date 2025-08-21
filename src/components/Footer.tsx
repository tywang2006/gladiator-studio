import React from 'react';
import { Shield, Github, Twitter, Linkedin, Instagram, Youtube, Globe } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const socialLinks = [
    { icon: <Twitter className="w-5 h-5" />, href: "https://twitter.com/gladiatorstudio", label: "Twitter" },
    { icon: <Linkedin className="w-5 h-5" />, href: "https://linkedin.com/company/gladiator-studio", label: "LinkedIn" },
    { icon: <Instagram className="w-5 h-5" />, href: "https://instagram.com/gladiatorstudio", label: "Instagram" },
    { icon: <Youtube className="w-5 h-5" />, href: "https://youtube.com/@gladiatorstudio", label: "YouTube" },
    { icon: <Github className="w-5 h-5" />, href: "https://github.com/gladiator-studio", label: "GitHub" },
    { icon: <Globe className="w-5 h-5" />, href: "https://gladiatorstudio.com", label: "Website" }
  ];
  
  return (
    <footer className="pt-12 pb-6 relative">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Company Info */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 text-xl font-bold text-white mb-4">
              <Shield className="text-cyan-400 h-6 w-6" />
              <span>GLADIATOR STUDIO</span>
            </div>
            <p className="text-slate-300 mb-6 text-sm leading-relaxed">
              Premium iGaming experiences powered by <span className="text-cyan-400">cutting-edge technology</span>. Creating the future of online gaming.
            </p>
            
            {/* Social Media Links */}
            <div className="space-y-3">
              <h4 className="text-white font-semibold text-sm mb-3">Follow Us</h4>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-2 bg-slate-800/50 hover:bg-cyan-500/20 rounded-lg transition-all duration-300 hover:scale-110 border border-cyan-500/20 hover:border-cyan-400/50"
                    aria-label={social.label}
                  >
                    <div className="text-slate-400 group-hover:text-cyan-400 transition-colors duration-300">
                      {social.icon}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
          
          {/* Navigation */}
          <div className="md:col-span-1">
            <h3 className="text-white font-bold text-lg mb-4">Navigation</h3>
            <ul className="space-y-3">
              <li><button onClick={() => scrollToSection('games')} className="text-slate-300 hover:text-cyan-400 transition-colors text-left text-sm">Our Games</button></li>
              <li><button onClick={() => scrollToSection('about')} className="text-slate-300 hover:text-cyan-400 transition-colors text-left text-sm">About Us</button></li>
              <li><button onClick={() => scrollToSection('team')} className="text-slate-300 hover:text-cyan-400 transition-colors text-left text-sm">Our Team</button></li>
              <li><button onClick={() => scrollToSection('careers')} className="text-slate-300 hover:text-cyan-400 transition-colors text-left text-sm">Careers</button></li>
              <li><button onClick={() => scrollToSection('contact')} className="text-slate-300 hover:text-cyan-400 transition-colors text-left text-sm">Contact</button></li>
            </ul>
          </div>
          
          {/* Legal & Support */}
          <div className="md:col-span-1">
            <h3 className="text-white font-bold text-lg mb-4">Legal & Support</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-slate-300 hover:text-cyan-400 transition-colors text-sm">Responsible Gaming</a></li>
              <li><a href="#" className="text-slate-300 hover:text-cyan-400 transition-colors text-sm">Terms & Conditions</a></li>
              <li><a href="#" className="text-slate-300 hover:text-cyan-400 transition-colors text-sm">Privacy Policy</a></li>
              <li><a href="https://www.begambleaware.org" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-cyan-400 transition-colors text-sm">BeGambleAware.org</a></li>
            </ul>
          </div>
        </div>
        
        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent my-6"></div>
        
        {/* Copyright & Disclaimer */}
        <div className="text-center space-y-3">
          <p className="text-slate-400 text-sm">
            © {currentYear} Gladiator Studio. All rights reserved.
          </p>
          <p className="text-slate-500 text-xs leading-relaxed max-w-2xl mx-auto">
            18+ only. Gambling can be addictive. Please play responsibly. 
            This website is operated under the MetaWin gaming license.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;