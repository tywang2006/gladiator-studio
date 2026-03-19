import { SectionWrapper } from '@/shared/components/SectionWrapper';

const MONO = "'SF Mono','Menlo','Consolas',monospace";

const CARD_STYLE: React.CSSProperties = {
  background: 'linear-gradient(135deg, rgba(20,28,45,0.9) 0%, rgba(8,12,24,0.95) 50%, rgba(14,20,36,0.9) 100%)',
  borderTop: '1px solid rgba(79,195,247,0.2)',
  borderLeft: '1px solid rgba(79,195,247,0.1)',
  borderRight: '1px solid rgba(79,195,247,0.06)',
  borderBottom: '1px solid rgba(0,0,0,0.4)',
  boxShadow: 'inset 0 1px 0 rgba(79,195,247,0.08), 0 4px 12px rgba(0,0,0,0.4)',
  clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
  padding: '14px 16px',
  marginBottom: '10px',
};

const LABEL_STYLE: React.CSSProperties = {
  fontFamily: MONO,
  fontSize: '11px',
  color: 'rgba(79,195,247,0.8)',
  letterSpacing: '0.12em',
  marginBottom: '12px',
  borderBottom: '1px solid rgba(79,195,247,0.1)',
  paddingBottom: '8px',
};

const BODY_STYLE: React.CSSProperties = {
  fontFamily: MONO,
  fontSize: '12px',
  color: 'rgba(255,255,255,0.6)',
  lineHeight: 1.6,
};

const CYAN_NUM: React.CSSProperties = {
  fontFamily: MONO,
  fontSize: '22px',
  color: 'rgba(79,195,247,1)',
  lineHeight: 1,
  display: 'block',
};

const METRIC_LABEL: React.CSSProperties = {
  fontFamily: MONO,
  fontSize: '9px',
  color: 'rgba(255,255,255,0.4)',
  letterSpacing: '0.14em',
  marginTop: '4px',
  display: 'block',
};

const BTN_BASE: React.CSSProperties = {
  fontFamily: MONO,
  fontSize: '11px',
  letterSpacing: '0.12em',
  padding: '9px 18px',
  background: 'transparent',
  border: '1px solid rgba(79,195,247,0.5)',
  color: 'rgba(79,195,247,0.9)',
  clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))',
  cursor: 'pointer',
  textDecoration: 'none',
  display: 'inline-block',
  boxShadow: 'inset 0 1px 0 rgba(79,195,247,0.15), 0 2px 6px rgba(0,0,0,0.4)',
};

const CAPABILITIES = [
  'ULTRA Volatility by design',
  'Provably Fair RNG — certified',
  'MetaWin infrastructure',
  'One API — full catalogue',
] as const;

const TECH = ['WebGL', 'TypeScript', 'Pixi.js', 'Node.js', 'AWS', 'GCP'] as const;

const METRICS: { value: string; label: string }[] = [
  { value: '34', label: 'GAMES' },
  { value: '97.5%', label: 'MAX RTP' },
  { value: '7', label: 'MARKETS' },
];

export function AboutSection() {
  return (
    <SectionWrapper id="about">
      {/* Header */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ fontFamily: MONO, fontSize: '10px', color: 'rgba(79,195,247,0.5)', letterSpacing: '0.16em', marginBottom: '4px' }}>
          // INTEL_BRIEFING
        </div>
        <div style={{ borderTop: '1px solid rgba(79,195,247,0.25)', paddingTop: '10px' }}>
          <span style={{ fontFamily: MONO, fontSize: '15px', color: 'rgba(255,255,255,0.9)', letterSpacing: '0.18em', fontWeight: 700 }}>
            GLADIATOR STUDIO
          </span>
        </div>
        <div style={{ borderTop: '1px solid rgba(79,195,247,0.25)', marginTop: '10px' }} />
      </div>

      {/* OVERVIEW */}
      <div style={CARD_STYLE}>
        <div style={LABEL_STYLE}>// OVERVIEW</div>
        <p style={BODY_STYLE}>
          In-house game studio of{' '}
          <a
            href="https://metawin.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'rgba(79,195,247,0.9)', textDecoration: 'none', borderBottom: '1px solid rgba(79,195,247,0.35)' }}
          >
            MetaWin
          </a>
          , the world's leading crypto casino. We design ULTRA-volatility slots from the ground up — cinematic quality, provably fair, built for high-value players.
        </p>
      </div>

      {/* KEY METRICS */}
      <div style={CARD_STYLE}>
        <div style={LABEL_STYLE}>// KEY METRICS</div>
        <div style={{ display: 'flex', justifyContent: 'space-around', textAlign: 'center' }}>
          {METRICS.map((m) => (
            <div key={m.label}>
              <span style={CYAN_NUM}>{m.value}</span>
              <span style={METRIC_LABEL}>{m.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CAPABILITIES */}
      <div style={CARD_STYLE}>
        <div style={LABEL_STYLE}>// CAPABILITIES</div>
        <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '7px' }}>
          {CAPABILITIES.map((cap) => (
            <li key={cap} style={{ ...BODY_STYLE, display: 'flex', alignItems: 'baseline', gap: '8px' }}>
              <span style={{ color: 'rgba(79,195,247,0.8)', flexShrink: 0 }}>▸</span>
              {cap}
            </li>
          ))}
        </ul>
      </div>

      {/* TECH STACK */}
      <div style={CARD_STYLE}>
        <div style={LABEL_STYLE}>// TECH STACK</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {TECH.map((t) => (
            <span
              key={t}
              style={{
                fontFamily: MONO,
                fontSize: '11px',
                color: 'rgba(79,195,247,0.7)',
                background: 'rgba(79,195,247,0.06)',
                border: '1px solid rgba(79,195,247,0.2)',
                padding: '3px 8px',
                letterSpacing: '0.08em',
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* CTA buttons */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '16px' }}>
        <a href="https://metawin.com" target="_blank" rel="noopener noreferrer" style={BTN_BASE}>
          VISIT METAWIN
        </a>
        <button
          type="button"
          style={{ ...BTN_BASE, background: 'rgba(79,195,247,0.07)' }}
          onClick={() => { document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
        >
          PARTNER WITH US
        </button>
      </div>
    </SectionWrapper>
  );
}
