import React from 'react';
import { ExternalLink, Calendar, Play, Clock } from 'lucide-react';
import { SlotGame, MiniGame } from '../types';

interface GameCardProps {
  game: SlotGame | MiniGame;
  delay: number;
}

const GameCard: React.FC<GameCardProps> = ({ game, delay }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short'
    });
  };

  const isUpcoming = () => {
    const releaseDate = new Date(game.timeline);
    const today = new Date();
    return releaseDate > today;
  };

  const getImageUrl = (imagePath: string) => {
    if (imagePath.startsWith('assets/')) {
      return `https://cdn-dev.gladiatorgames.io/lobby/${imagePath}`;
    }
    return imagePath;
  };

  const getMobileBackground = (index: number) => {
    const backgrounds = [
      'mobile-game-bg-1',
      'mobile-game-bg-2', 
      'mobile-game-bg-3',
      'mobile-game-bg-4',
      'mobile-game-bg-5'
    ];
    return backgrounds[index % backgrounds.length];
  };

  const handleCardClick = () => {
    if (!isUpcoming()) {
      window.open(game.link, '_blank');
    }
  };

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl transition-all duration-500 hover:scale-[1.02] ${
        !isUpcoming() ? 'cursor-pointer' : 'cursor-default'
      }`}
      onClick={handleCardClick}
      style={{
        animationDelay: `${delay * 100}ms`
      }}
    >
      
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-900">
        <img 
          src={getImageUrl(game.image)}
          alt={game.title}
          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            const parent = target.parentElement;
            if (parent) {
              parent.innerHTML = `
                <div class="w-full h-full flex items-center justify-center ${getMobileBackground(game.id)} text-white relative overflow-hidden">
                  <div class="absolute inset-0 bg-gradient-to-br from-black/20 to-black/40"></div>
                  <div class="text-center p-4 relative z-10">
                    <div class="text-4xl md:text-5xl mb-3 animate-gentle-sway">🎮</div>
                    <div class="text-lg md:text-xl font-bold mb-2 text-white">${game.title}</div>
                    <div class="text-sm md:text-base text-gray-200 opacity-90">Premium Game</div>
                  </div>
                  <div class="absolute top-2 right-2 w-16 h-16 bg-white/10 rounded-full blur-xl"></div>
                  <div class="absolute bottom-2 left-2 w-12 h-12 bg-white/5 rounded-full blur-lg"></div>
                </div>
              `;
            }
          }}
        />
        
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        
        {/* Play button overlay */}
        {!isUpcoming() && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
            <div className="bg-white rounded-full p-4 transform scale-90 group-hover:scale-100 transition-transform duration-300">
              <Play className="w-6 h-6 text-black fill-current" />
            </div>
          </div>
        )}

        {/* Status badge */}
        <div className="absolute top-3 left-3">
          {isUpcoming() && (
            <div className="bg-black/80 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-full">
              COMING SOON
            </div>
          )}
        </div>

      </div>

      {/* Content Section */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
        <h3 className="text-lg font-bold text-white mb-1">
          {game.title}
        </h3>
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-400">{formatDate(game.timeline)}</span>
          {!isUpcoming() && (
            <ExternalLink className="w-4 h-4 text-white/60" />
          )}
        </div>
      </div>

    </div>
  );
};

export default GameCard;