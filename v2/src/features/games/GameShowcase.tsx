import { useCallback, useMemo, useState } from 'react';
import { SectionWrapper } from '@/shared/components/SectionWrapper';
import type { Game } from '@/shared/types/game';
import { GameCard } from './GameCard';

// ------------------------------------------------------------------
// Constants
// ------------------------------------------------------------------

const CYAN = '#4fc3f7';
const PANEL_BG = 'rgba(8, 12, 24, 0.82)';
const BORDER = '1px solid rgba(79, 195, 247, 0.15)';
const GLOW = '0 0 15px rgba(79, 195, 247, 0.1)';
const SCANLINE = 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(79,195,247,0.03) 2px, rgba(79,195,247,0.03) 4px)';
const LABEL_STYLE: React.CSSProperties = {
  fontFamily: 'monospace',
  fontSize: '10px',
  fontWeight: 700,
  letterSpacing: '1.5px',
  textTransform: 'uppercase',
};

// ------------------------------------------------------------------
// Types
// ------------------------------------------------------------------

type FilterTab = 'slot' | 'mini' | 'new';

interface TabDefinition {
  readonly id: FilterTab;
  readonly label: string;
}

// ------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------

function getHotGames(slotGames: readonly Game[], miniGames: readonly Game[]): readonly Game[] {
  return [...slotGames, ...miniGames].filter((g) => g.isHot === true);
}

function buildTabLabel(id: FilterTab, slotCount: number, miniCount: number): string {
  if (id === 'slot') return `SLOTS (${slotCount})`;
  if (id === 'mini') return `ORIGINALS (${miniCount})`;
  return 'HOT';
}

// ------------------------------------------------------------------
// Section heading
// ------------------------------------------------------------------

function SectionHeading() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '10px',
        marginBottom: '40px',
      }}
    >
      <span
        style={{
          ...LABEL_STYLE,
          color: CYAN,
          opacity: 0.7,
        }}
      >
        // game_catalogue
      </span>

      <h2
        style={{
          margin: 0,
          fontFamily: 'system-ui, -apple-system, sans-serif',
          fontWeight: 800,
          fontSize: '28px',
          letterSpacing: '4px',
          textTransform: 'uppercase',
          color: '#fff',
          textShadow: `0 0 30px rgba(79, 195, 247, 0.35), 0 0 60px rgba(79, 195, 247, 0.12)`,
          lineHeight: 1,
        }}
      >
        GAME CATALOGUE
      </h2>

      {/* Thin glowing accent line */}
      <div
        style={{
          height: '1px',
          width: '200px',
          background: `linear-gradient(90deg, transparent 0%, ${CYAN} 40%, transparent 100%)`,
          boxShadow: `0 0 8px rgba(79, 195, 247, 0.4)`,
        }}
        aria-hidden="true"
      />
    </div>
  );
}

// ------------------------------------------------------------------
// HUD Tab bar
// ------------------------------------------------------------------

interface FilterTabsProps {
  readonly activeTab: FilterTab;
  readonly tabs: readonly TabDefinition[];
  readonly onTabChange: (tab: FilterTab) => void;
}

function FilterTabs({ activeTab, tabs, onTabChange }: FilterTabsProps) {
  return (
    <div
      style={{
        display: 'flex',
        gap: '4px',
        padding: '4px',
        background: PANEL_BG,
        border: BORDER,
        borderRadius: '8px',
        backdropFilter: 'blur(8px)',
        boxShadow: GLOW,
        backgroundImage: SCANLINE,
      }}
      role="tablist"
      aria-label="Game category filter"
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-controls={`games-panel-${tab.id}`}
            id={`games-tab-${tab.id}`}
            onClick={() => onTabChange(tab.id)}
            style={{
              position: 'relative',
              padding: '7px 14px 9px',
              borderRadius: '5px',
              border: 'none',
              background: isActive ? 'rgba(79, 195, 247, 0.08)' : 'transparent',
              color: isActive ? '#fff' : 'rgba(255,255,255,0.4)',
              cursor: 'pointer',
              fontFamily: 'monospace',
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              transition: 'color 0.15s ease, background 0.15s ease',
              outline: 'none',
              borderBottom: isActive ? `2px solid ${CYAN}` : '2px solid transparent',
            }}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}

// ------------------------------------------------------------------
// Skeleton card
// ------------------------------------------------------------------

function SkeletonCard() {
  return (
    <div
      style={{
        aspectRatio: '3/4',
        borderRadius: '8px',
        overflow: 'hidden',
        position: 'relative',
        background: PANEL_BG,
        border: BORDER,
        backgroundImage: SCANLINE,
      }}
      aria-hidden="true"
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(90deg, transparent 0%, rgba(79,195,247,0.03) 40%, rgba(79,195,247,0.07) 50%, rgba(79,195,247,0.03) 60%, transparent 100%)',
          backgroundSize: '200% 100%',
          animation: 'shimmer 1.8s infinite',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }}
      >
        <div style={{ height: '11px', width: '75%', borderRadius: '3px', background: 'rgba(79,195,247,0.07)' }} />
        <div style={{ height: '9px', width: '50%', borderRadius: '3px', background: 'rgba(79,195,247,0.04)' }} />
      </div>
    </div>
  );
}

// ------------------------------------------------------------------
// Game grid
// ------------------------------------------------------------------

const SKELETON_COUNT = 8;

interface GameGridProps {
  readonly games: readonly Game[];
  readonly loading: boolean;
  readonly activeTab: FilterTab;
  readonly onPlayGame: (game: Game) => void;
}

function GameGrid({ games, loading, activeTab, onPlayGame }: GameGridProps) {
  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '10px',
  };

  if (loading) {
    return (
      <div className="game-grid" style={gridStyle} aria-busy="true" aria-label="Loading games">
        {Array.from({ length: SKELETON_COUNT }, (_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (games.length === 0) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px 0',
          gap: '12px',
        }}
      >
        <p style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'monospace', fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase' }}>
          // NO_ENTRIES_FOUND
        </p>
      </div>
    );
  }

  return (
    <div
      id={`games-panel-${activeTab}`}
      role="tabpanel"
      aria-labelledby={`games-tab-${activeTab}`}
      className="game-grid"
      style={gridStyle}
    >
      {games.map((game) => (
        <GameCard key={game.id} game={game} onPlayGame={onPlayGame} />
      ))}
    </div>
  );
}

// ------------------------------------------------------------------
// GameShowcase (public export)
// ------------------------------------------------------------------

interface GameShowcaseProps {
  readonly slotGames: readonly Game[];
  readonly miniGames: readonly Game[];
  readonly loading: boolean;
}

export function GameShowcase({ slotGames, miniGames, loading }: GameShowcaseProps) {
  const [activeTab, setActiveTab] = useState<FilterTab>('slot');

  // Game play is handled by App.tsx full-screen iframe overlay via CustomEvent
  const handlePlayGame = useCallback(() => {}, []);

  const hotGames = useMemo(
    () => getHotGames(slotGames, miniGames),
    [slotGames, miniGames],
  );

  const tabs = useMemo(
    (): readonly TabDefinition[] => [
      { id: 'slot', label: buildTabLabel('slot', slotGames.length, miniGames.length) },
      { id: 'mini', label: buildTabLabel('mini', slotGames.length, miniGames.length) },
      { id: 'new', label: buildTabLabel('new', slotGames.length, miniGames.length) },
    ],
    [slotGames.length, miniGames.length],
  );

  const currentGames = useMemo((): readonly Game[] => {
    switch (activeTab) {
      case 'slot': return slotGames;
      case 'mini': return miniGames;
      case 'new': return hotGames;
    }
  }, [activeTab, slotGames, miniGames, hotGames]);

  return (
    <SectionWrapper id="games">
      <SectionHeading />

      {/* Controls row */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          marginBottom: '24px',
        }}
      >
        <FilterTabs activeTab={activeTab} tabs={tabs} onTabChange={setActiveTab} />

        {!loading && (
          <p
            style={{
              fontFamily: 'monospace',
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '1px',
              textTransform: 'uppercase',
              color: 'rgba(79, 195, 247, 0.5)',
              margin: 0,
            }}
            aria-live="polite"
            aria-atomic="true"
          >
            {currentGames.length === 1 ? '1 ENTRY' : `${currentGames.length} ENTRIES`}
          </p>
        )}
      </div>

      {/* Shimmer keyframes + responsive grid injected once */}
      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        @media (max-width: 480px) {
          .game-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>

      <GameGrid games={currentGames} loading={loading} activeTab={activeTab} onPlayGame={handlePlayGame} />
    </SectionWrapper>
  );
}
