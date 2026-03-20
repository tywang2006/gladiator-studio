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

const FEATURE_CARDS: readonly { readonly tag: string; readonly title: string; readonly body: string }[] = [
  {
    tag: 'VOLATILITY',
    title: 'ULTRA Volatility. By Design.',
    body: 'Every Gladiator game is built to ULTRA volatility specification. Our maths team calibrates each title for peak win ceilings that create the social moments high-value players seek — and that operators use to drive acquisition.',
  },
  {
    tag: 'INTEGRITY',
    title: 'Provably Fair Mathematics',
    body: 'All Gladiator titles use certified RNG with full audit trails. RTPs are published, testable, and consistent across every integration. Compliance documentation ready on request for licensed jurisdictions.',
  },
  {
    tag: 'INFRASTRUCTURE',
    title: 'Powered by MetaWin Infrastructure',
    body: 'Games run on the same AWS and GCP infrastructure that handles MetaWin global casino traffic. Sub-100ms round-trip times, 99.99% uptime SLA, and real-time bet data via our feeder system across every integrated market.',
  },
  {
    tag: 'INTEGRATION',
    title: 'One Integration. Full Catalogue.',
    body: 'A single API connection gives operators access to all 8 Gladiator slots and 26 MetaWin Originals. JSON-based integration docs, sandbox environment, and a dedicated technical account manager with every partner onboarding.',
  },
] as const;

const TECH = ['WebGL', 'TypeScript', 'Pixi.js', 'Babylon.js', 'Node.js', 'AWS', 'GCP', 'BigQuery'] as const;

const METRICS: readonly { readonly value: string; readonly label: string }[] = [
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
            THE STUDIO THAT POWERS METAWIN
          </span>
        </div>
        <div style={{ borderTop: '1px solid rgba(79,195,247,0.25)', marginTop: '10px' }} />
      </div>

      {/* DOSSIER: Identity and Origin */}
      <div style={CARD_STYLE}>
        <div style={LABEL_STYLE}>// DOSSIER</div>
        <p style={{ ...BODY_STYLE, marginBottom: '10px' }}>
          Gladiator Studio is the in-house game development division of{' '}
          <a
            href="https://metawin.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'rgba(79,195,247,0.9)', textDecoration: 'none', borderBottom: '1px solid rgba(79,195,247,0.35)' }}
          >
            MetaWin
          </a>
          , the world's leading crypto casino. Founded in London, we design and build slot games from the ground up — combining high-volatility mechanics, provably fair mathematics, and cinematic production quality for a player base that expects nothing less.
        </p>
        <p style={{ ...BODY_STYLE, marginBottom: '10px' }}>
          Every title in our catalogue carries ULTRA volatility and RTPs above 96%, engineered for the crypto-native player who plays for life-changing hits. Our stack is built on WebGL, Babylon.js 3D, and TypeScript — running on AWS and GCP infrastructure capable of serving millions of concurrent sessions. We own the full production pipeline: game design, mathematics, front-end rendering, back-end integration, and live ops.
        </p>
        <p style={BODY_STYLE}>
          For operators and aggregators, integrating Gladiator Studio means accessing a battle-tested content library of 34 titles backed by MetaWin platform infrastructure. Seamless API integration, real-time bet data via our feeder system, and dedicated account support. Whether you are a tier-one operator or a fast-growing platform, our games are built to perform in your lobby from day one.
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

      {/* FEATURE CARDS */}
      {FEATURE_CARDS.map((card) => (
        <div key={card.tag} style={CARD_STYLE}>
          <div style={LABEL_STYLE}>// {card.tag}</div>
          <div style={{ fontFamily: MONO, fontSize: '13px', color: 'rgba(255,255,255,0.85)', fontWeight: 700, marginBottom: '8px', letterSpacing: '0.04em' }}>
            {card.title}
          </div>
          <p style={BODY_STYLE}>{card.body}</p>
        </div>
      ))}

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
        <a
          href="mailto:cwang@metawin.inc?subject=Demo Request — Gladiator Studio V2"
          style={{ ...BTN_BASE, background: 'rgba(79,195,247,0.07)' }}
        >
          REQUEST DEMO
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
