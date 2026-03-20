import React, { useState, useCallback } from 'react';
import type { Game } from '@/shared/types/game';

// ------------------------------------------------------------------
// Constants
// ------------------------------------------------------------------

const CYAN = '#4fc3f7';
const GOLD = '#ffd54f';
const PANEL_BG = 'linear-gradient(135deg, rgba(20,28,45,0.9) 0%, rgba(8,12,24,0.95) 50%, rgba(14,20,36,0.9) 100%)';
const GLOW_HOVER = '0 0 20px rgba(79, 195, 247, 0.25), 0 0 40px rgba(79, 195, 247, 0.08)';
const GLOW_REST = '0 4px 24px rgba(0, 0, 0, 0.5)';
const SCANLINE = 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(79,195,247,0.03) 2px, rgba(79,195,247,0.03) 4px)';
const LABEL_STYLE: React.CSSProperties = {
  fontFamily: 'monospace',
  fontSize: '11px',
  fontWeight: 700,
  letterSpacing: '1.5px',
  textTransform: 'uppercase',
};

// ------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------

function isSafeUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

// ------------------------------------------------------------------
// Sub-components
// ------------------------------------------------------------------

function FallbackCover({ title }: { readonly title: string }) {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
        padding: '16px',
        background: 'linear-gradient(135deg, rgba(8,12,24,1) 0%, rgba(14,20,40,1) 100%)',
      }}
      aria-hidden="true"
    >
      <span style={{ fontSize: '48px', lineHeight: 1 }}>🎰</span>
      <span
        style={{
          ...LABEL_STYLE,
          color: 'rgba(255,255,255,0.5)',
          textAlign: 'center',
          lineHeight: 1.4,
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}
      >
        {title}
      </span>
    </div>
  );
}

function StudioBadge({ category }: { readonly category: Game['category'] }) {
  const label = category === 'slot' ? 'GLADIATOR' : 'METAWIN';
  return (
    <div
      style={{
        position: 'absolute',
        top: '8px',
        left: '8px',
        zIndex: 20,
        padding: '2px 6px',
        borderRadius: '4px',
        background: 'rgba(79, 195, 247, 0.1)',
        border: `1px solid rgba(79, 195, 247, 0.35)`,
        backdropFilter: 'blur(8px)',
        color: CYAN,
        ...LABEL_STYLE,
        fontSize: '11px',
      }}
    >
      {label}
    </div>
  );
}

function HotBadge() {
  return (
    <div
      style={{
        position: 'absolute',
        top: '8px',
        right: '8px',
        zIndex: 20,
        padding: '2px 6px',
        borderRadius: '4px',
        background: GOLD,
        color: '#000',
        ...LABEL_STYLE,
        fontSize: '11px',
      }}
    >
      HOT
    </div>
  );
}

function VolatilityBar({ volatility }: { readonly volatility: 'HIGH' | 'ULTRA' }) {
  const filled = volatility === 'ULTRA' ? 5 : 4;
  const color = volatility === 'ULTRA' ? GOLD : CYAN;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }} aria-label={`Volatility: ${volatility}`}>
      {Array.from({ length: 5 }, (_, i) => (
        <div
          key={i}
          style={{
            width: '10px',
            height: '6px',
            borderRadius: '2px',
            background: i < filled ? color : 'rgba(255,255,255,0.1)',
          }}
        />
      ))}
    </div>
  );
}

interface HoverOverlayProps {
  readonly title: string;
  readonly description: string;
  readonly visible: boolean;
  readonly onPlay: () => void;
}

function HoverOverlay({ title, description, visible, onPlay }: HoverOverlayProps) {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
        padding: '16px',
        background: 'rgba(8, 12, 24, 0.88)',
        backdropFilter: 'blur(4px)',
        borderRadius: '8px',
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
        transition: 'opacity 0.2s ease',
      }}
    >
      <p
        style={{
          color: 'rgba(255,255,255,0.5)',
          fontSize: '11px',
          lineHeight: 1.5,
          textAlign: 'center',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}
      >
        {description}
      </p>
      <button
        type="button"
        onClick={onPlay}
        aria-label={`Play demo for ${title}`}
        style={{
          padding: '8px 20px',
          borderRadius: '4px',
          border: `1px solid ${CYAN}`,
          background: 'rgba(79, 195, 247, 0.12)',
          color: CYAN,
          cursor: 'pointer',
          fontFamily: 'monospace',
          fontSize: '11px',
          fontWeight: 700,
          letterSpacing: '2px',
          textTransform: 'uppercase',
          boxShadow: `inset 0 1px 0 rgba(79,195,247,0.15), 0 2px 6px rgba(0,0,0,0.4), 0 0 12px rgba(79, 195, 247, 0.2)`,
          transition: 'background 0.15s ease, box-shadow 0.15s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(79, 195, 247, 0.22)';
          e.currentTarget.style.boxShadow = `inset 0 1px 0 rgba(79,195,247,0.2), 0 2px 6px rgba(0,0,0,0.5), 0 0 20px rgba(79, 195, 247, 0.4)`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(79, 195, 247, 0.12)';
          e.currentTarget.style.boxShadow = `inset 0 1px 0 rgba(79,195,247,0.15), 0 2px 6px rgba(0,0,0,0.4), 0 0 12px rgba(79, 195, 247, 0.2)`;
        }}
      >
        PLAY DEMO
      </button>
    </div>
  );
}

interface InfoPanelProps {
  readonly title: string;
  readonly rtp: number;
  readonly volatility: 'HIGH' | 'ULTRA';
  readonly genre: string;
}

function InfoPanel({ title, rtp, volatility, genre }: InfoPanelProps) {
  return (
    <div
      style={{
        padding: '10px 12px 12px',
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
      }}
    >
      {/* Title */}
      <p
        style={{
          color: '#fff',
          fontSize: '13px',
          fontWeight: 700,
          lineHeight: 1.2,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          margin: 0,
        }}
      >
        {title}
      </p>

      {/* Stats row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
        <VolatilityBar volatility={volatility} />
        <span
          style={{
            color: GOLD,
            fontFamily: 'monospace',
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.5px',
            flexShrink: 0,
          }}
        >
          RTP {rtp}%
        </span>
      </div>

      {/* Genre + ULTRA label */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <span
          style={{
            ...LABEL_STYLE,
            fontSize: '11px',
            color: 'rgba(255,255,255,0.35)',
            padding: '1px 5px',
            borderRadius: '3px',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          {genre}
        </span>
        {volatility === 'ULTRA' && (
          <span
            style={{
              ...LABEL_STYLE,
              fontSize: '11px',
              color: GOLD,
            }}
          >
            ULTRA
          </span>
        )}
      </div>
    </div>
  );
}

// ------------------------------------------------------------------
// GameCard
// ------------------------------------------------------------------

interface GameCardProps {
  readonly game: Game;
  readonly onPlayGame: (game: Game) => void;
}

function GameCardComponent({ game, onPlayGame }: GameCardProps) {
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleImageError = useCallback(() => {
    setImageError(true);
  }, []);

  const handlePlay = useCallback(() => {
    if (!isSafeUrl(game.link)) {
      console.warn(`GameCard: unsafe link blocked for "${game.title}": ${game.link}`);
      return;
    }
    // Dispatch global event so App.tsx iframe overlay picks it up
    window.dispatchEvent(new CustomEvent('play-game', { detail: { title: game.title, link: game.link } }));
    onPlayGame(game);
  }, [game, onPlayGame]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handlePlay();
      }
    },
    [handlePlay],
  );

  return (
    <div
      role="article"
      tabIndex={0}
      aria-label={game.title}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onKeyDown={handleKeyDown}
      onClick={handlePlay}
      style={{
        background: PANEL_BG,
        borderTop: `1px solid ${isHovered ? 'rgba(79,195,247,0.4)' : 'rgba(79,195,247,0.2)'}`,
        borderLeft: `1px solid ${isHovered ? 'rgba(79,195,247,0.25)' : 'rgba(79,195,247,0.1)'}`,
        borderRight: `1px solid ${isHovered ? 'rgba(79,195,247,0.15)' : 'rgba(79,195,247,0.06)'}`,
        borderBottom: '1px solid rgba(0,0,0,0.4)',
        borderRadius: '8px',
        cursor: 'pointer',
        outline: 'none',
        overflow: 'hidden',
        boxShadow: isHovered
          ? `inset 0 1px 0 rgba(79,195,247,0.12), ${GLOW_HOVER}`
          : `inset 0 1px 0 rgba(79,195,247,0.08), ${GLOW_REST}`,
        transform: isHovered
          ? 'perspective(600px) translateY(-4px) rotateX(2deg) rotateY(-1deg) scale(1.02)'
          : 'perspective(600px) translateY(0) rotateX(0) rotateY(0) scale(1)',
        transformStyle: 'preserve-3d' as const,
        transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Image section */}
      <div
        style={{
          position: 'relative',
          aspectRatio: '3/4',
          overflow: 'hidden',
          background: 'rgba(8, 12, 24, 1)',
          backgroundImage: SCANLINE,
        }}
      >
        {imageError ? (
          <FallbackCover title={game.title} />
        ) : (
          <img
            src={game.image}
            alt={game.title}
            loading="lazy"
            onError={handleImageError}
            draggable={false}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              objectPosition: 'center',
              background: 'rgba(8,12,24,1)',
            }}
          />
        )}

        {/* Bottom gradient overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(8,12,24,0.9) 0%, transparent 50%)',
            pointerEvents: 'none',
          }}
          aria-hidden="true"
        />

        <StudioBadge category={game.category} />
        {game.isHot === true && <HotBadge />}

        <HoverOverlay
          title={game.title}
          description={game.description}
          visible={isHovered}
          onPlay={handlePlay}
        />
      </div>

      {/* Info panel below image */}
      <InfoPanel
        title={game.title}
        rtp={game.rtp}
        volatility={game.volatility}
        genre={game.genre}
      />
    </div>
  );
}

export const GameCard = React.memo(GameCardComponent);
