import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Gamepad2, Zap } from 'lucide-react';
import { SlotGame, MiniGame } from '../types';
import GameCard from './GameCard';

interface GameShowcaseProps {
  slotGames: SlotGame[];
  miniGames: MiniGame[];
}

const GameShowcase: React.FC<GameShowcaseProps> = ({ slotGames, miniGames }) => {
  const [activeTab, setActiveTab] = useState<'slots' | 'mini' | 'new'>('slots');
  const [isVisible, setIsVisible] = useState(false);
  const showcaseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (showcaseRef.current) {
      observer.observe(showcaseRef.current);
    }

    return () => {
      if (showcaseRef.current) {
        observer.unobserve(showcaseRef.current);
      }
    };
  }, []);

  const getNewestGames = () => {
    const allGames = [...slotGames, ...miniGames];
    return allGames
      .sort((a, b) => new Date(b.timeline).getTime() - new Date(a.timeline).getTime())
      .slice(0, 8);
  };

  const getCurrentGames = () => {
    switch (activeTab) {
      case 'slots':
        return slotGames;
      case 'mini':
        return miniGames;
      case 'new':
        return getNewestGames();
      default:
        return slotGames;
    }
  };

  const tabs = [
    { 
      key: 'slots', 
      label: 'Slots', 
      fullLabel: 'Slot Games',
      icon: <Gamepad2 className="w-3 h-3 md:w-4 md:h-4" />,
      count: slotGames.length
    },
    { 
      key: 'mini', 
      label: 'Mini', 
      fullLabel: 'Mini Games',
      icon: <Zap className="w-3 h-3 md:w-4 md:h-4" />,
      count: miniGames.length
    },
    { 
      key: 'new', 
      label: 'New', 
      fullLabel: 'Latest Releases',
      icon: <Sparkles className="w-3 h-3 md:w-4 md:h-4" />,
      count: getNewestGames().length
    }
  ];

  return (
    <section id="games" className="py-12 md:py-16 lg:py-20 relative overflow-hidden" ref={showcaseRef}>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 mb-3 md:mb-4">
            <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-white/60" />
            <span className="text-white/60 font-semibold text-xs md:text-sm uppercase tracking-wider">Portfolio</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black mb-3 md:mb-4 text-white">
            OUR GAMES
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-lg">
            Premium gaming experiences crafted with cutting-edge technology
          </p>
        </div>

        {/* Mobile-Optimized Tab Navigation */}
        <div className="flex justify-center mb-8 md:mb-12">
          <div className="flex p-1 gap-1 bg-black/40 backdrop-blur-xl rounded-full border border-white/10 shadow-lg w-full max-w-sm md:max-w-none md:w-auto">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                className={`relative flex-1 md:flex-none px-3 md:px-6 py-2 md:py-3 rounded-full text-xs md:text-sm font-medium transition-all duration-300 flex items-center justify-center gap-1 md:gap-2 min-w-0 md:min-w-[120px] ${
                  activeTab === tab.key
                    ? 'bg-white text-black'
                    : 'text-gray-400 hover:text-white hover:bg-white/10'
                }`}
                onClick={() => setActiveTab(tab.key as 'slots' | 'mini' | 'new')}
              >
                {tab.icon}
                <span className="hidden sm:inline">{tab.fullLabel}</span>
                <span className="sm:hidden truncate">{tab.label}</span>
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                  activeTab === tab.key 
                    ? 'bg-black/20 text-black' 
                    : 'bg-white/10 text-gray-400'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Games Grid - Mobile: 2 columns, Desktop: 3-4 columns */}
        <div className="relative">
          {getCurrentGames().length > 0 ? (
            <div 
              key={activeTab}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-6"
            >
              {getCurrentGames().map((game, index) => (
                <div 
                  key={`${activeTab}-${game.id}`}
                  className="opacity-0 animate-fadeInUp"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animationFillMode: 'forwards'
                  }}
                >
                  <GameCard game={game} delay={index} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 md:py-16">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-slate-700/50 to-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 border border-cyan-500/30">
                <Gamepad2 className="w-8 h-8 md:w-10 md:h-10 text-cyan-400" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-2 md:mb-3">Coming Soon</h3>
              <p className="text-slate-300 text-sm md:text-lg max-w-md mx-auto">
                Exciting new games are currently in development. Stay tuned!
              </p>
            </div>
          )}
        </div>

        {/* Additional Info */}
        {getCurrentGames().length > 0 && (
          <div className="text-center mt-8 md:mt-12">
            <p className="text-slate-400 text-xs md:text-sm">
              All games optimized for desktop and mobile • 18+ only
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default GameShowcase;