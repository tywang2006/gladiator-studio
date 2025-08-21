import React, { useEffect, useRef } from 'react';
import { ChevronDown, User, ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || window.innerWidth < 768) return;
      
      const { clientX, clientY } = e;
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      
      const x = (clientX - left) / width - 0.5;
      const y = (clientY - top) / height - 0.5;

      const elements = containerRef.current.querySelectorAll('.parallax');
      elements.forEach(element => {
        const speed = parseFloat((element as HTMLElement).dataset.speed || '0.05');
        const xOffset = x * speed * 15;
        const yOffset = y * speed * 15;
        (element as HTMLElement).style.transform = `translate3d(${xOffset}px, ${yOffset}px, 0)`;
      });
    };
    
    if (window.innerWidth >= 768) {
      document.addEventListener('mousemove', handleMouseMove);
    }
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const scrollToGames = () => {
    document.getElementById('games')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleClientArea = () => {
    window.open('https://cdn-dev.gladiatorgames.io/lobby', '_blank');
  };

  return (
    <section 
      id="home"
      ref={containerRef}
      className="relative min-h-screen pt-20 md:pt-24 flex items-center justify-center overflow-hidden"
    >
      {/* Subtle overlay */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent"></div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 text-center z-10 py-8">
        
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-6 parallax leading-tight tracking-tight" data-speed="0.01">
          <span className="text-white">NEXT-GEN</span>
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-[length:200%_auto] animate-gradient">
            GAMING
          </span>
          <br />
          <span className="text-white">STUDIO</span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-400 font-light max-w-xl mx-auto mb-10 parallax leading-relaxed px-4" data-speed="0.005">
          Creating immersive gaming experiences that push boundaries
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 parallax mb-12 md:mb-16 px-4" data-speed="0.01">
          <button 
            onClick={handleClientArea}
            className="w-full sm:w-auto group relative px-10 py-4 bg-white hover:bg-gray-100 text-black rounded-full font-bold transition-all duration-300 transform hover:scale-105 shadow-2xl overflow-hidden"
          >
            {/* Button shimmer effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
            <div className="flex items-center justify-center gap-3 relative z-10">
              <User className="w-5 h-5" />
              <span>Play Now</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </div>
          </button>
          
          <button 
            onClick={scrollToGames}
            className="w-full sm:w-auto px-10 py-4 border-2 border-white/20 hover:border-white/40 text-white rounded-full font-bold transition-all duration-300 hover:bg-white/10 backdrop-blur-sm"
          >
            Explore Games
          </button>
        </div>

        {/* Enhanced Stats */}
        <div className="grid grid-cols-3 gap-4 md:gap-6 parallax max-w-lg mx-auto" data-speed="0.005">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-white mb-1">10+</div>
            <div className="text-gray-500 text-xs md:text-sm">Games</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-white mb-1">1M+</div>
            <div className="text-gray-500 text-xs md:text-sm">Players</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-white mb-1">24/7</div>
            <div className="text-gray-500 text-xs md:text-sm">Support</div>
          </div>
        </div>
      </div>

      {/* Scroll indicator - desktop only */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:block">
        <button onClick={scrollToGames} className="text-white/40 hover:text-white transition-colors">
          <ChevronDown className="w-8 h-8 animate-bounce" />
        </button>
      </div>

      {/* Smooth transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/20 to-transparent"></div>
    </section>
  );
};

export default Hero;