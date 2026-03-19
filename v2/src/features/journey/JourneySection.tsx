import { SectionWrapper } from '@/shared/components/SectionWrapper';

const MONO = "'SF Mono','Menlo','Consolas',monospace";
const CYAN = '#4fc3f7';

const MISSIONS = [
  { date: 'Q3 2023', title: 'Studio Founded', done: true },
  { date: 'Q4 2023', title: 'First Title Launched', done: true },
  { date: 'Q1 2024', title: 'Catalogue — 8 Gladiator Slots', done: true },
  { date: 'Q2 2024', title: 'Rolla & WowVegas Partnerships', done: true },
  { date: 'Q4 2024', title: 'Feeder Telemetry System Live', done: true },
  { date: '2025+', title: 'Global Rollout & New Markets', done: false },
] as const;

export function JourneySection() {
  return (
    <SectionWrapper id="journey" style={{ padding: 0 }}>
      <div style={{ fontFamily: MONO, fontSize: 10, color: CYAN, letterSpacing: '0.2em', marginBottom: 6 }}>
        // MISSION_LOG
      </div>
      <h2 style={{ fontFamily: MONO, fontSize: 18, fontWeight: 700, color: '#e8f4fd', marginBottom: 16, letterSpacing: '0.06em' }}>
        MISSION LOG
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {MISSIONS.map((m, i) => (
          <div
            key={i}
            style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '8px 12px',
              background: i % 2 === 0
                ? 'linear-gradient(135deg, rgba(20,28,45,0.9) 0%, rgba(8,12,24,0.95) 50%, rgba(14,20,36,0.9) 100%)'
                : 'linear-gradient(135deg, rgba(14,20,36,0.7) 0%, rgba(8,12,24,0.8) 100%)',
              borderLeft: `3px solid ${m.done ? CYAN : '#69f0ae'}`,
              borderTop: '1px solid rgba(79,195,247,0.08)',
              borderRight: '1px solid rgba(79,195,247,0.04)',
              borderBottom: '1px solid rgba(0,0,0,0.3)',
              boxShadow: 'inset 0 1px 0 rgba(79,195,247,0.05), 0 2px 6px rgba(0,0,0,0.3)',
              fontFamily: MONO,
            }}
          >
            <span style={{ fontSize: 9, color: CYAN, minWidth: 60, letterSpacing: '0.12em', fontWeight: 700 }}>
              [{m.date}]
            </span>
            <span style={{ flex: 1, fontSize: 11, color: '#e8f4fd', fontWeight: 500 }}>
              {m.title}
            </span>
            <span style={{
              fontSize: 8, letterSpacing: '0.15em', fontWeight: 600,
              color: m.done ? 'rgba(79,195,247,0.5)' : '#69f0ae',
            }}>
              {m.done ? 'DONE' : 'ACTIVE'}
            </span>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
