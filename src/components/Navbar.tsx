import React, { useState, useEffect } from 'react';
import { Shield, User, Home, Gamepad2, Info, Briefcase, MessageCircle, Users } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Prevent body scroll when menu is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleClientArea = () => {
    window.open('https://cdn-dev.gladiatorgames.io/lobby', '_blank');
    setIsOpen(false);
  };

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    // Small delay to allow menu to close before scrolling
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    { href: '#home', label: 'Home', icon: <Home className="w-5 h-5" /> },
    { href: '#games', label: 'Games', icon: <Gamepad2 className="w-5 h-5" /> },
    { href: '#about', label: 'About', icon: <Info className="w-5 h-5" /> },
    { href: '#team', label: 'Team', icon: <Users className="w-5 h-5" /> },
    { href: '#careers', label: 'Careers', icon: <Briefcase className="w-5 h-5" /> },
    { href: '#contact', label: 'Contact', icon: <MessageCircle className="w-5 h-5" /> }
  ];

  return (
    <>
      {/* Desktop & Mobile Top Bar */}
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled 
          ? 'bg-black/80 backdrop-blur-md border-b border-white/10' 
          : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            
            {/* Logo - Always visible on desktop, visible when scrolled on mobile */}
            <div className={`flex items-center gap-2 md:gap-3 transition-opacity duration-300 ${
              scrolled ? 'opacity-100' : 'opacity-0 md:opacity-100'
            }`}>
              <div className="flex items-center gap-1 md:gap-2">
                <Shield className="text-white h-5 w-5 md:h-6 md:w-6" />
                <span className="text-base md:text-lg lg:text-xl font-bold text-white">
                  GLADIATOR
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a 
                href="#home" 
                className="text-slate-300 hover:text-white transition-colors font-medium relative group"
              >
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a 
                href="#games" 
                className="text-slate-300 hover:text-white transition-colors font-medium relative group"
              >
                Games
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a 
                href="#about" 
                className="text-slate-300 hover:text-white transition-colors font-medium relative group"
              >
                About
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a 
                href="#team" 
                className="text-slate-300 hover:text-white transition-colors font-medium relative group"
              >
                Team
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a 
                href="#careers" 
                className="text-slate-300 hover:text-white transition-colors font-medium relative group"
              >
                Careers
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a 
                href="#contact" 
                className="text-slate-300 hover:text-white transition-colors font-medium relative group"
              >
                Contact
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
              </a>
              <button 
                onClick={handleClientArea}
                className="bg-white hover:bg-gray-100 text-black px-6 py-2.5 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 flex items-center gap-2 whitespace-nowrap"
              >
                <User className="w-4 h-4" />
                Client Area
              </button>
            </div>

            {/* Mobile Menu Button - Enhanced with animation */}
            <button
              className="md:hidden relative text-white p-3 rounded-xl hover:bg-slate-800/50 transition-all duration-300 z-50 group"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-6">
                <span className={`absolute top-0 left-0 w-6 h-0.5 bg-white transition-all duration-300 ${
                  isOpen ? 'rotate-45 translate-y-2.5' : ''
                }`}></span>
                <span className={`absolute top-2.5 left-0 w-6 h-0.5 bg-white transition-all duration-300 ${
                  isOpen ? 'opacity-0' : ''
                }`}></span>
                <span className={`absolute top-5 left-0 w-6 h-0.5 bg-white transition-all duration-300 ${
                  isOpen ? '-rotate-45 -translate-y-2.5' : ''
                }`}></span>
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay - Enhanced */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-md z-40 md:hidden transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Slide Menu - Completely redesigned */}
      <div className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] md:hidden transition-transform duration-500 ease-out z-45 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        
        {/* Enhanced background with gradient and blur */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/98 via-slate-50/98 to-blue-50/98 backdrop-blur-2xl"></div>
        
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-10 w-32 h-32 bg-primary-500/10 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-40 right-20 w-24 h-24 bg-secondary-400/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 right-5 w-16 h-16 bg-accent-500/8 rounded-full blur-lg animate-pulse" style={{ animationDelay: '4s' }}></div>
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col">
          
          {/* Enhanced Menu Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-200/30">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-primary-500/20 to-secondary-400/20 rounded-xl border border-primary-500/30">
                <Shield className="text-primary-600 h-6 w-6" />
              </div>
              <div>
                <span className="text-lg font-bold text-slate-800">GLADIATOR</span>
                <div className="text-xs text-slate-600">Gaming Studio</div>
              </div>
            </div>
          </div>
          
          {/* Enhanced Navigation Links */}
          <div className="flex-1 p-6">
            <nav className="space-y-2">
              {menuItems.map((item, index) => (
                <button 
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className="w-full group flex items-center gap-4 text-slate-600 hover:text-slate-800 hover:bg-gradient-to-r hover:from-primary-500/10 hover:to-secondary-400/10 transition-all duration-300 font-medium py-4 px-4 rounded-xl relative overflow-hidden"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Icon container with gradient background */}
                  <div className="p-2 bg-slate-100/50 group-hover:bg-gradient-to-br group-hover:from-primary-500/20 group-hover:to-secondary-400/20 rounded-lg transition-all duration-300 group-hover:scale-110">
                    <div className="text-slate-500 group-hover:text-primary-600 transition-colors duration-300">
                      {item.icon}
                    </div>
                  </div>
                  
                  {/* Text */}
                  <span className="text-base font-medium">{item.label}</span>
                  
                  {/* Animated underline */}
                  <div className="absolute bottom-2 left-4 w-0 h-0.5 bg-gradient-to-r from-primary-500 to-secondary-400 transition-all duration-300 group-hover:w-12 rounded-full"></div>
                  
                  {/* Hover glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-500/0 via-primary-500/5 to-secondary-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                </button>
              ))}
            </nav>
          </div>
          
          {/* Enhanced Client Area Button */}
          <div className="p-6 border-t border-slate-200/30">
            <button 
              onClick={handleClientArea}
              className="w-full bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-3 shadow-soft hover:shadow-primary-500/25 transform hover:scale-105 relative overflow-hidden group"
            >
              {/* Background animation */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary-400/20 to-secondary-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Icon with enhanced styling */}
              <div className="p-1 bg-white/10 rounded-lg group-hover:bg-white/20 transition-all duration-300">
                <User className="w-5 h-5" />
              </div>
              
              <span className="relative z-10">Client Area</span>
              
              {/* Shimmer effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
            </button>
            
            {/* Footer text */}
            <div className="text-center mt-4">
              <p className="text-xs text-slate-500">Premium Gaming Experience</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;