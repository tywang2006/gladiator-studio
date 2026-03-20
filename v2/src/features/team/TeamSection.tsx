import { Github, Linkedin, Mail } from 'lucide-react';
import { SectionWrapper } from '@/shared/components/SectionWrapper';

const MONO = "'JetBrains Mono','Fira Code','Courier New',monospace";
const CYAN = '#4FC3F7';
const BORDER = 'rgba(79,195,247,0.18)';
const CARD_CLIP = 'polygon(0 0,calc(100% - 12px) 0,100% 12px,100% 100%,12px 100%,0 calc(100% - 12px))';

const CARD_BG: React.CSSProperties = {
  background: 'linear-gradient(135deg, rgba(20,28,45,0.9) 0%, rgba(8,12,24,0.95) 50%, rgba(14,20,36,0.9) 100%)',
  borderTop: '1px solid rgba(79,195,247,0.2)',
  borderLeft: '1px solid rgba(79,195,247,0.1)',
  borderRight: '1px solid rgba(79,195,247,0.06)',
  borderBottom: '1px solid rgba(0,0,0,0.4)',
  boxShadow: 'inset 0 1px 0 rgba(79,195,247,0.08), 0 4px 12px rgba(0,0,0,0.4)',
  clipPath: CARD_CLIP,
};

const LEAD = {
  initials: 'CW',
  name: 'CHAO WANG',
  role: 'CTO & Head of Game Development',
  callsign: 'THE ARCHITECT',
  location: 'London, UK',
  company: 'MetaWin Group',
  experience: '10+ yrs',
  bio: 'Industry pioneer — the first person to systematically deploy AI, large language models, and autonomous agent systems at production scale in iGaming. Chao architected the entire Gladiator Studio technology stack from the ground up and leads all engineering, AI R&D, and product development within the MetaWin group.',
  bio2: 'His AI-first approach has fundamentally reshaped how games are designed, tested, and optimized: LLM-powered game content generation, multi-agent orchestration for automated QA pipelines, real-time adaptive game balancing via reinforcement learning, and Claude-driven autonomous development workflows that compress months of engineering into days.',
  bio3: 'Before MetaWin, Chao spent a decade at the bleeding edge of gaming technology — building platforms processing $100M+ in daily wagers, contributing core modules to Pixi.js (the most widely used 2D WebGL renderer), and creating Chao2D, a purpose-built rendering engine for high-performance H5 gaming.',
  expertise: ['AI / LLM Pioneer in iGaming', 'Multi-Agent Systems', 'Game Architecture', 'WebGL / Pixi.js', 'Distributed Systems', 'Cloud (AWS + GCP)', 'Crypto-Native', 'Tech Leadership'],
  missions: [
    'FIRST to deploy LLMs and autonomous AI agents in production iGaming — industry pioneer',
    'Architected multi-agent AI pipeline: game design → math validation → QA → deployment',
    'Built Claude-powered autonomous dev workflows — 10x engineering velocity',
    'Architected gaming aggregation platform — $100M+ daily wagers',
    'Core open-source contributor to Pixi.js (world\'s #1 2D WebGL renderer)',
    'Created Chao2D rendering engine for H5 gaming',
    'Built Newtonian physics engine for browser games',
    'Shipped 34 live titles (8 Gladiator ULTRA-volatility slots + 26 MetaWin Originals)',
    'Dual-cloud AWS + GCP elite-tier infrastructure across 7 markets',
    'Built and scaled cross-functional teams across engineering, AI, art, QA',
  ],
  social: {
    linkedin: 'https://www.linkedin.com/in/chaow/',
    email: 'cwang@metawin.inc',
    github: 'https://github.com/gladiator-studio',
  },
} as const;

const TEAM_STATS: readonly { readonly value: string; readonly label: string }[] = [
  { value: '10+', label: 'YRS EXP' },
  { value: '34', label: 'GAMES SHIPPED' },
  { value: '8', label: 'LIVE SLOTS' },
  { value: '7', label: 'MARKETS' },
];

const CULTURE_VALUES: readonly { readonly tag: string; readonly text: string }[] = [
  { tag: 'CRAFT', text: 'Small senior team. Every engineer ships to production. No bureaucracy.' },
  { tag: 'VELOCITY', text: 'Concept to live deployment in weeks, not quarters. Ship fast, iterate faster.' },
  { tag: 'OWNERSHIP', text: 'Full-stack ownership from game mathematics to cloud infrastructure.' },
  { tag: 'IMPACT', text: 'Our games are played by hundreds of thousands of real players daily.' },
];

function SocialBtn({ href, label, icon }: { readonly href: string; readonly label: string; readonly icon: React.ReactNode }) {
  const resolved = !href.startsWith('http') && href.includes('@') ? `mailto:${href}` : href;
  return (
    <a href={resolved} aria-label={label} target="_blank" rel="noopener noreferrer"
      style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 30, height: 30,
        border: '1px solid rgba(79,195,247,0.3)', background: 'rgba(79,195,247,0.07)', color: CYAN,
        clipPath: 'polygon(3px 0%,100% 0%,calc(100% - 3px) 100%,0% 100%)', textDecoration: 'none' }}>
      {icon}
    </a>
  );
}

function CommandingOfficerCard() {
  return (
    <div role="article" aria-label={`Commanding Officer: ${LEAD.name}`}
      style={{ ...CARD_BG, padding: 16, display: 'flex', flexDirection: 'column', gap: 14 }}>

      <div style={{ borderBottom: `1px solid ${BORDER}`, paddingBottom: 8 }}>
        <span style={{ fontFamily: MONO, fontSize: 10, color: 'rgba(232,244,253,0.45)', letterSpacing: 1.5 }}>
          ─ COMMANDING OFFICER ─────────────────
        </span>
      </div>

      {/* Identity */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div aria-hidden="true" style={{ position: 'relative', width: 52, height: 58, flexShrink: 0 }}>
          <div style={{
            width: 52, height: 58,
            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
            background: `linear-gradient(135deg, ${CYAN}, rgba(79,195,247,0.3))`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{
              width: 48, height: 54,
              clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
              background: 'rgba(8,12,24,0.95)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ fontFamily: MONO, fontSize: 16, fontWeight: 900, color: CYAN, letterSpacing: 2, textShadow: `0 0 8px ${CYAN}` }}>{LEAD.initials}</span>
            </div>
          </div>
          <div style={{
            position: 'absolute', bottom: -2, right: -2,
            width: 14, height: 14, borderRadius: '50%',
            background: CYAN, border: '2px solid rgba(8,12,24,0.95)',
            boxShadow: `0 0 6px ${CYAN}`,
          }} />
        </div>
        <div>
          <div style={{ fontFamily: MONO, fontSize: 16, fontWeight: 700, color: '#E8F4FD', letterSpacing: 1 }}>{LEAD.name}</div>
          <div style={{ fontFamily: MONO, fontSize: 11, color: CYAN, marginTop: 2 }}>{LEAD.role}</div>
          <div style={{ fontFamily: MONO, fontSize: 10, color: '#ffd54f', marginTop: 2, letterSpacing: 1.5 }}>
            ★ {LEAD.callsign}
          </div>
          <div style={{ fontFamily: MONO, fontSize: 10, color: 'rgba(232,244,253,0.45)', marginTop: 3 }}>
            {'>'} {LEAD.location} · {LEAD.experience} · {LEAD.company}
          </div>
        </div>
      </div>

      {/* Bio */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <p style={{ fontFamily: MONO, fontSize: 11, color: 'rgba(232,244,253,0.75)', lineHeight: '17px', margin: 0 }}>
          {LEAD.bio}
        </p>
        <p style={{ fontFamily: MONO, fontSize: 11, color: 'rgba(232,244,253,0.6)', lineHeight: '17px', margin: 0 }}>
          {LEAD.bio2}
        </p>
        <p style={{ fontFamily: MONO, fontSize: 11, color: 'rgba(232,244,253,0.55)', lineHeight: '17px', margin: 0 }}>
          {LEAD.bio3}
        </p>
      </div>

      {/* Expertise */}
      <div>
        <div style={{ fontFamily: MONO, fontSize: 10, color: 'rgba(232,244,253,0.45)', letterSpacing: 1.5, marginBottom: 7 }}>
          // EXPERTISE
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
          {LEAD.expertise.map((tag) => (
            <span key={tag} style={{ fontFamily: MONO, fontSize: 10, color: CYAN,
              background: 'rgba(79,195,247,0.07)', border: `1px solid ${BORDER}`,
              padding: '3px 7px', clipPath: 'polygon(4px 0%,100% 0%,calc(100% - 4px) 100%,0% 100%)',
              whiteSpace: 'nowrap', letterSpacing: 0.3 }}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div style={{ height: 1, background: BORDER }} aria-hidden="true" />

      {/* Missions */}
      <div>
        <div style={{ fontFamily: MONO, fontSize: 10, color: 'rgba(232,244,253,0.45)', letterSpacing: 1.5, marginBottom: 8 }}>
          // KEY_MISSIONS
        </div>
        <ul role="list" style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
          {LEAD.missions.map((m) => (
            <li key={m} style={{ display: 'flex', gap: 8 }}>
              <span style={{ color: CYAN, fontFamily: MONO, fontSize: 11, flexShrink: 0 }}>▸</span>
              <span style={{ fontFamily: MONO, fontSize: 11, color: 'rgba(232,244,253,0.72)', lineHeight: '17px' }}>{m}</span>
            </li>
          ))}
        </ul>
      </div>

      <div style={{ height: 1, background: BORDER }} aria-hidden="true" />

      {/* Social */}
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <span style={{ fontFamily: MONO, fontSize: 10, color: 'rgba(232,244,253,0.45)', letterSpacing: 1 }}>COMMS</span>
        <div style={{ display: 'flex', gap: 6 }}>
          <SocialBtn href={LEAD.social.linkedin} label="LinkedIn profile" icon={<Linkedin size={13} />} />
          <SocialBtn href={LEAD.social.email} label="Send email" icon={<Mail size={13} />} />
          <SocialBtn href={LEAD.social.github} label="GitHub organisation" icon={<Github size={13} />} />
        </div>
      </div>
    </div>
  );
}

function TeamStatsCard() {
  return (
    <div style={{ ...CARD_BG, padding: '14px 16px' }}>
      <div style={{ borderBottom: `1px solid ${BORDER}`, paddingBottom: 8, marginBottom: 12 }}>
        <span style={{ fontFamily: MONO, fontSize: 10, color: 'rgba(232,244,253,0.45)', letterSpacing: 1.5 }}>
          ─ UNIT READINESS ─────────────────────
        </span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {TEAM_STATS.map((s) => (
          <div key={s.label} style={{ textAlign: 'center' }}>
            <span style={{ fontFamily: MONO, fontSize: 20, color: CYAN, fontWeight: 700, display: 'block', lineHeight: 1, textShadow: `0 0 12px rgba(79,195,247,0.3)` }}>
              {s.value}
            </span>
            <span style={{ fontFamily: MONO, fontSize: 9, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.14em', marginTop: 4, display: 'block' }}>
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function CultureCard() {
  return (
    <div style={{ ...CARD_BG, padding: '14px 16px' }}>
      <div style={{ borderBottom: `1px solid ${BORDER}`, paddingBottom: 8, marginBottom: 12 }}>
        <span style={{ fontFamily: MONO, fontSize: 10, color: 'rgba(232,244,253,0.45)', letterSpacing: 1.5 }}>
          ─ OPERATIONAL DOCTRINE ────────────────
        </span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {CULTURE_VALUES.map((v) => (
          <div key={v.tag}>
            <span style={{ fontFamily: MONO, fontSize: 10, color: CYAN, letterSpacing: 1.2, fontWeight: 700 }}>
              [{v.tag}]
            </span>
            <p style={{ fontFamily: MONO, fontSize: 11, color: 'rgba(232,244,253,0.65)', lineHeight: '17px', margin: '4px 0 0 0' }}>
              {v.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function JoinCrewCard() {
  return (
    <div style={{ ...CARD_BG, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ borderBottom: `1px solid ${BORDER}`, paddingBottom: 8 }}>
        <span style={{ fontFamily: MONO, fontSize: 10, color: 'rgba(232,244,253,0.45)', letterSpacing: 1.5 }}>
          ─ ENLIST ─────────────────────────────
        </span>
      </div>
      <p style={{ fontFamily: MONO, fontSize: 11, color: 'rgba(232,244,253,0.72)', margin: 0, lineHeight: '17px' }}>
        We hire senior talent across engineering, design, and product on a rolling basis.
        If you are exceptional at what you do and want to build games that real players use daily, report for duty.
      </p>
      <a href="#careers" style={{ display: 'inline-flex', alignItems: 'center', gap: 6,
        fontFamily: MONO, fontSize: 11, fontWeight: 700, color: CYAN,
        background: 'rgba(79,195,247,0.12)', border: '1px solid rgba(79,195,247,0.3)',
        padding: '7px 14px', textDecoration: 'none',
        clipPath: 'polygon(6px 0%,100% 0%,calc(100% - 6px) 100%,0% 100%)',
        letterSpacing: 0.8, alignSelf: 'flex-start',
        boxShadow: 'inset 0 1px 0 rgba(79,195,247,0.15), 0 2px 6px rgba(0,0,0,0.4)' }}>
        VIEW POSITIONS →
      </a>
    </div>
  );
}

export function TeamSection() {
  return (
    <SectionWrapper id="team">
      <div style={{ maxWidth: 520, margin: '0 auto' }}>
        <header style={{ marginBottom: 24 }}>
          <div style={{ fontFamily: MONO, fontSize: 10, color: 'rgba(232,244,253,0.35)', letterSpacing: 2, marginBottom: 6 }}>
            // CREW_MANIFEST
          </div>
          <div style={{ height: 1, background: BORDER, marginBottom: 12 }} aria-hidden="true" />
          <span style={{ fontFamily: MONO, fontSize: 10, color: CYAN, letterSpacing: 2 }}>ROSTER</span>
          <p style={{ fontFamily: MONO, fontSize: 11, color: 'rgba(232,244,253,0.55)', marginTop: 8, lineHeight: '17px' }}>
            Built by people who understand the game. Deep expertise in game mathematics, WebGL rendering, distributed systems, and crypto-native product design.
          </p>
          <div style={{ height: 1, background: BORDER, marginTop: 12 }} aria-hidden="true" />
        </header>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <CommandingOfficerCard />
          <TeamStatsCard />
          <CultureCard />
          <JoinCrewCard />
        </div>
      </div>
    </SectionWrapper>
  );
}
