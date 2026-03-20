import { useEffect, useRef } from 'react';
import { useFeederSocket, type FeedEvent } from './useFeederSocket';

// ─── Constants ────────────────────────────────────────────────────────────────

const MONO: React.CSSProperties['fontFamily'] =
  "'SF Mono', 'Menlo', 'Consolas', monospace";

const PANEL_STYLE: React.CSSProperties = {
  background: 'linear-gradient(135deg, rgba(20,28,45,0.9) 0%, rgba(8,12,24,0.95) 50%, rgba(14,20,36,0.9) 100%)',
  backdropFilter: 'blur(8px)',
  borderTop: '1px solid rgba(79,195,247,0.2)',
  borderLeft: '1px solid rgba(79,195,247,0.1)',
  borderRight: '1px solid rgba(79,195,247,0.06)',
  borderBottom: '1px solid rgba(0,0,0,0.4)',
  borderRadius: 12,
  boxShadow: 'inset 0 1px 0 rgba(79,195,247,0.08), 0 4px 12px rgba(0,0,0,0.4)',
};

const CYAN = '#4fc3f7';
const PURPLE = '#b39ddb';
const GOLD = '#ffd54f';
const GREEN = '#22c55e';
const RED = '#ef5350';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatUSD(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(1)}K`;
  return `$${n.toFixed(2)}`;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function LiveDot({ isConnected }: { readonly isConnected: boolean }) {
  const color = isConnected ? GREEN : RED;
  return (
    <span
      style={{
        display: 'inline-block',
        width: 8,
        height: 8,
        borderRadius: '50%',
        background: color,
        boxShadow: `0 0 6px ${color}`,
        animation: 'livePulse 2s ease-in-out infinite',
        flexShrink: 0,
      }}
    />
  );
}

interface StatPanelProps {
  readonly label: string;
  readonly value: string;
  readonly valueColor?: string;
}

function StatPanel({ label, value, valueColor = CYAN }: StatPanelProps) {
  return (
    <div
      style={{
        ...PANEL_STYLE,
        padding: '6px 10px',
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
      }}
    >
      <span
        style={{
          fontFamily: MONO,
          fontSize: 11,
          letterSpacing: '1.5px',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.5)',
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontFamily: MONO,
          fontSize: 16,
          fontWeight: 700,
          color: valueColor,
        }}
      >
        {value}
      </span>
    </div>
  );
}

// FeedItem is now created via direct DOM manipulation inside FeedPanel (feeder pattern)

interface FeedPanelProps {
  readonly title: string;
  readonly accentColor: string;
  readonly eventCount: number;
  readonly panelTotal: number;
  readonly events: readonly FeedEvent[];
  readonly emptyMessage: string;
  readonly isConnected: boolean;
}

/**
 * DOM-based feed panel — mirrors feeder DataFeed.ts exactly.
 * Uses direct DOM prepend/remove instead of React re-renders.
 */
function FeedPanel({
  title,
  accentColor,
  eventCount,
  panelTotal,
  events,
  emptyMessage,
  isConnected,
}: FeedPanelProps) {
  const listRef = useRef<HTMLDivElement>(null);
  const itemCountRef = useRef(0);
  const prevLenRef = useRef(0);

  // Direct DOM updates — prepend new items, remove oldest beyond MAX
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const newItems = events.slice(0, events.length - prevLenRef.current);
    prevLenRef.current = events.length;

    // Prepend each new event as a DOM node
    for (let i = newItems.length - 1; i >= 0; i--) {
      const ev = newItems[i];
      if (!ev) continue;
      const isGladiator = ev.provider === 'gladiator';
      const barColor = isGladiator ? CYAN : PURPLE;
      const isBigWin = ev.amount >= 100;

      const item = document.createElement('div');
      item.style.cssText = `
        display:flex;align-items:center;gap:6px;font-size:10px;
        min-height:24px;padding:0 10px;
        font-family:${MONO};
        animation:feedFadeIn 0.3s ease-out;
        transition:background 0.18s ease;
      `;

      // Rail bar (like feeder)
      const rail = document.createElement('span');
      rail.style.cssText = `
        width:4px;height:20px;border-radius:999px;flex:0 0 auto;margin-right:4px;
        background:${isBigWin ? `${GOLD}cc` : `${barColor}66`};
        ${isBigWin ? `box-shadow:0 0 10px ${GOLD}66;` : ''}
      `;

      const amount = document.createElement('span');
      amount.style.cssText = `color:${isBigWin ? GOLD : CYAN};font-weight:bold;min-width:58px;flex:0 0 auto;letter-spacing:0.4px;`;
      amount.textContent = formatUSD(ev.amount);

      const name = document.createElement('span');
      name.style.cssText = `color:${isBigWin ? '#fff1ae' : 'rgba(255,255,255,0.5)'};flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;opacity:${isBigWin ? '0.94' : '0.72'};`;
      name.textContent = ev.gameName;
      name.title = ev.gameName;

      const loc = document.createElement('span');
      loc.style.cssText = `color:rgba(255,255,255,0.5);font-size:9px;flex:0 0 auto;min-width:16px;text-align:right;letter-spacing:1px;opacity:0.78;`;
      loc.textContent = ev.country;

      item.appendChild(rail);
      item.appendChild(amount);
      item.appendChild(name);
      item.appendChild(loc);

      // Hover effect
      item.addEventListener('mouseenter', () => { item.style.background = isBigWin ? `${GOLD}0d` : 'rgba(255,255,255,0.03)'; });
      item.addEventListener('mouseleave', () => { item.style.background = 'transparent'; });

      list.prepend(item);
      itemCountRef.current++;
    }

    // Remove oldest — max items based on visible container height
    const maxItems = Math.max(5, Math.floor(list.clientHeight / 28));
    while (itemCountRef.current > maxItems && list.lastElementChild) {
      list.lastElementChild.remove();
      itemCountRef.current--;
    }
  }, [events]);

  return (
    <div style={{ ...PANEL_STYLE, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      {/* Tab header */}
      <div
        style={{
          borderBottom: '1px solid rgba(79, 195, 247, 0.12)',
          boxShadow: '0 1px 0 rgba(79,195,247,0.05)',
          padding: '10px 14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 8,
          flexShrink: 0,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <LiveDot isConnected={isConnected} />
          <span
            style={{
              fontFamily: MONO,
              fontSize: 11,
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              color: accentColor,
              borderBottom: `2px solid ${accentColor}`,
              paddingBottom: 2,
            }}
          >
            {title}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: MONO, fontSize: 11 }}>
          <span style={{ color: accentColor }}>{eventCount}</span>
          <span style={{ color: GOLD }}>{formatUSD(panelTotal)}</span>
        </div>
      </div>

      {/* Feed list — flex:1 fills remaining space, overflow scrolls */}
      <div
        ref={listRef}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          flex: 1,
          minHeight: 0,
          overflowY: 'auto',
          overflowX: 'hidden',
          padding: 8,
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgba(79,195,247,0.4) transparent',
        }}
        className="feed-scroll"
      >
        {events.length === 0 && (
          <div style={{ textAlign: 'center', padding: '32px 16px', fontFamily: MONO, fontSize: 10, color: 'rgba(255,255,255,0.3)', letterSpacing: '1px' }}>
            {emptyMessage}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

export function LiveActivityFeed() {
  const {
    events,
    eventsPerSecond,
    totalAmount,
    isConnected,
    gladiatorCount,
    originalCount,
  } = useFeederSocket();

  const gladiatorEvents = events.filter(e => e.provider === 'gladiator').slice(0, 15);
  const originalEvents = events.filter(e => e.provider !== 'gladiator').slice(0, 15);

  // Approximate split for panel totals (gladiator ~40%, originals ~60%)
  const gladiatorTotal = totalAmount * 0.4;
  const originalTotal = totalAmount * 0.6;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <style>{`
        @keyframes livePulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(.85)} }
        @keyframes feedFadeIn { 0%{opacity:0} 100%{opacity:1} }
        .feed-scroll::-webkit-scrollbar{width:4px}
        .feed-scroll::-webkit-scrollbar-track{background:transparent}
        .feed-scroll::-webkit-scrollbar-thumb{background:rgba(79,195,247,.4);border-radius:2px}
      `}</style>

      {/* Compact header — single line */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8, flexShrink: 0 }}>
        <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '1.5px', color: CYAN, textTransform: 'uppercase' }}>
          // LIVE TELEMETRY
        </span>
      </div>

      {/* Stats — compact single row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6, marginBottom: 8, flexShrink: 0 }}>
        <StatPanel
          label="STATUS"
          value={isConnected ? 'ONLINE' : 'OFFLINE'}
          valueColor={isConnected ? GREEN : RED}
        />
        <StatPanel label="EVENTS/S" value={eventsPerSecond.toFixed(0)} />
        <StatPanel label="TOTAL WAGERED" value={formatUSD(totalAmount)} />
        <StatPanel label="EVENTS" value={`${gladiatorCount + originalCount}`} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16, flex: 1, minHeight: 0 }}>
        <FeedPanel
          title="GLADIATOR"
          accentColor={CYAN}
          eventCount={gladiatorCount}
          panelTotal={gladiatorTotal}
          events={gladiatorEvents}
          emptyMessage="AWAITING GLADIATOR EVENTS..."
          isConnected={isConnected}
        />
        <FeedPanel
          title="ORIGINALS"
          accentColor={PURPLE}
          eventCount={originalCount}
          panelTotal={originalTotal}
          events={originalEvents}
          emptyMessage="AWAITING METAWIN EVENTS..."
          isConnected={isConnected}
        />
      </div>
    </div>
  );
}
