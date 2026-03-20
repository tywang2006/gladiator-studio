import { SectionWrapper } from '@/shared/components/SectionWrapper';

const MONO = "'SF Mono','Menlo','Consolas',monospace";
const CYAN = '#4fc3f7';

interface Mission {
  readonly date: string;
  readonly title: string;
  readonly description: string;
  readonly status: 'COMPLETE' | 'ACTIVE' | 'QUEUED';
}

const MISSIONS: readonly Mission[] = [
  {
    date: 'Q3 2023',
    title: 'STUDIO FOUNDED',
    description: 'Gladiator Studio established as in-house game division of MetaWin. Mandate: build crypto-native, high-volatility slot content for MetaWin and third-party operators.',
    status: 'COMPLETE',
  },
  {
    date: 'Q4 2023',
    title: 'FIRST TITLE DEPLOYED',
    description: '"To The Top" launched as inaugural slot — introduced the studio signature escalating-multiplier mechanic and established ULTRA-volatility market positioning.',
    status: 'COMPLETE',
  },
  {
    date: 'Q1 2024',
    title: 'CATALOGUE EXPANSION',
    description: 'Five additional slots shipped: Legend of Tartarus, Rise of Cetus, Star Nudge, Disco Dazzle, Sweety Treaty. Gladiator cemented as a prolific, quality-first content producer.',
    status: 'COMPLETE',
  },
  {
    date: 'Q2 2024',
    title: 'OPERATOR PARTNERSHIPS',
    description: 'Distribution agreements secured with Rolla and WowVegas. Gladiator catalogue extended beyond MetaWin to third-party platforms — B2B commercial model validated.',
    status: 'COMPLETE',
  },
  {
    date: 'Q4 2024',
    title: 'INFRASTRUCTURE SCALE',
    description: 'Feeder system upgraded for global real-time bet data. Live integration across 7 markets with sub-100ms round-trip performance benchmarks met in production.',
    status: 'COMPLETE',
  },
  {
    date: '2025',
    title: '34 GAMES MILESTONE',
    description: '8 Gladiator slots + 26 MetaWin Originals live across the platform. Full catalogue available through single API integration for all operator partners.',
    status: 'COMPLETE',
  },
  {
    date: '2026+',
    title: 'GLOBAL ROLLOUT',
    description: 'Active expansion into new regulated markets. Additional titles in production. Aggregator partnerships in negotiation. Entering highest-output phase.',
    status: 'ACTIVE',
  },
] as const;

const STATUS_CONFIG = {
  COMPLETE: { color: CYAN, bg: 'rgba(79,195,247,0.08)', borderColor: CYAN },
  ACTIVE: { color: '#69f0ae', bg: 'rgba(105,240,174,0.08)', borderColor: '#69f0ae' },
  QUEUED: { color: 'rgba(255,255,255,0.3)', bg: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.15)' },
} as const;

export function JourneySection() {
  return (
    <SectionWrapper id="journey" style={{ padding: 0 }}>
      <div style={{ fontFamily: MONO, fontSize: 10, color: CYAN, letterSpacing: '0.2em', marginBottom: 6 }}>
        // MISSION_LOG
      </div>
      <h2 style={{ fontFamily: MONO, fontSize: 18, fontWeight: 700, color: '#e8f4fd', marginBottom: 6, letterSpacing: '0.06em' }}>
        OPERATIONS TIMELINE
      </h2>
      <p style={{ fontFamily: MONO, fontSize: 11, color: 'rgba(232,244,253,0.5)', marginBottom: 16, lineHeight: '17px' }}>
        From founding to 34 live titles across 7 markets. Every milestone logged.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {MISSIONS.map((m, i) => {
          const cfg = STATUS_CONFIG[m.status];
          return (
            <div
              key={m.date}
              style={{
                display: 'flex', flexDirection: 'column', gap: 4,
                padding: '10px 12px',
                background: i % 2 === 0
                  ? 'linear-gradient(135deg, rgba(20,28,45,0.9) 0%, rgba(8,12,24,0.95) 50%, rgba(14,20,36,0.9) 100%)'
                  : 'linear-gradient(135deg, rgba(14,20,36,0.7) 0%, rgba(8,12,24,0.8) 100%)',
                borderLeft: `3px solid ${cfg.borderColor}`,
                borderTop: '1px solid rgba(79,195,247,0.08)',
                borderRight: '1px solid rgba(79,195,247,0.04)',
                borderBottom: '1px solid rgba(0,0,0,0.3)',
                boxShadow: 'inset 0 1px 0 rgba(79,195,247,0.05), 0 2px 6px rgba(0,0,0,0.3)',
                fontFamily: MONO,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 9, color: cfg.color, minWidth: 60, letterSpacing: '0.12em', fontWeight: 700 }}>
                  [{m.date}]
                </span>
                <span style={{ flex: 1, fontSize: 11, color: '#e8f4fd', fontWeight: 600 }}>
                  {m.title}
                </span>
                <span style={{
                  fontSize: 8, letterSpacing: '0.15em', fontWeight: 600,
                  color: cfg.color,
                  background: cfg.bg,
                  padding: '2px 6px',
                  border: `1px solid ${cfg.borderColor}`,
                }}>
                  {m.status}
                </span>
              </div>
              <p style={{ fontSize: 10, color: 'rgba(232,244,253,0.5)', lineHeight: '15px', margin: '2px 0 0 70px' }}>
                {m.description}
              </p>
            </div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
