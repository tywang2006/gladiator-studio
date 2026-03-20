import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SectionWrapper } from '@/shared/components/SectionWrapper';

// ---------------------------------------------------------------------------
// Types & constants
// ---------------------------------------------------------------------------

interface JobListing {
  readonly id: string;
  readonly title: string;
  readonly department: string;
  readonly location: string;
  readonly type: string;
  readonly summary: string;
  readonly description: string;
  readonly requirements: readonly string[];
  readonly niceToHave: readonly string[];
  readonly applyUrl: string;
}

const MONO: React.CSSProperties = { fontFamily: "'SF Mono','Menlo','Consolas',monospace" };
const CYAN = '#4fc3f7';
const CARD_BG: React.CSSProperties = {
  background: 'linear-gradient(135deg, rgba(20,28,45,0.9) 0%, rgba(8,12,24,0.95) 50%, rgba(14,20,36,0.9) 100%)',
  borderTop: '1px solid rgba(79,195,247,0.2)',
  borderLeft: '1px solid rgba(79,195,247,0.1)',
  borderRight: '1px solid rgba(79,195,247,0.06)',
  borderBottom: '1px solid rgba(0,0,0,0.4)',
  boxShadow: 'inset 0 1px 0 rgba(79,195,247,0.08), 0 4px 12px rgba(0,0,0,0.4)',
};
const BEVEL = 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))';
const APPLY_EMAIL = 'cwang@metawin.inc';

const JOB_LISTINGS: readonly JobListing[] = [
  {
    id: 'lead-ai-game-engineer',
    title: 'LEAD AI GAME ENGINEER',
    department: 'Engineering — AI Division',
    location: 'Remote / London',
    type: 'Full-time',
    summary: 'Lead the development of AI-powered game systems — the first role of its kind in iGaming.',
    description: "Architect intelligent game mechanics, ML-driven player experience optimization, and autonomous agent systems for next-generation slot titles. You'll build the AI infrastructure that gives Gladiator Studio its competitive edge — from LLM-powered content generation to real-time adaptive game balancing.",
    requirements: [
      '5+ years game development with AI/ML integration',
      'Strong ML/AI background (PyTorch, TensorFlow, LLM APIs)',
      'Experience with autonomous agent systems and multi-agent orchestration',
      'Real-time systems and low-latency inference',
      'Game mathematics and RNG knowledge',
    ],
    niceToHave: [
      'Experience with Claude API, OpenAI, or similar LLM platforms',
      'Reinforcement learning for game balancing',
      'iGaming regulatory compliance experience',
    ],
    applyUrl: 'https://careers.arenaentertainment.com/jobs/7371186-lead-ai-game-engineer',
  },
  {
    id: 'senior-pixijs-dev',
    title: 'SENIOR PIXI.JS DEVELOPER',
    department: 'Engineering',
    location: 'London, UK (Hybrid)',
    type: 'Full-time',
    summary: 'Build the front-end rendering layer for ULTRA-volatility slot games played by hundreds of thousands of MetaWin users.',
    description: 'Own the Pixi.js rendering pipeline for Gladiator slot titles — reel animation state machines, particle effects, symbol transitions, and bonus round sequences. Ship real titles to a production player base. Build new mechanics and push what the browser can do.',
    requirements: [
      '5+ years JavaScript/TypeScript development',
      '3+ years Pixi.js in production game environment',
      'Deep understanding of WebGL and GPU-accelerated 2D rendering',
      'Experience shipping browser-based games',
      'Strong eye for animation quality and frame-rate performance',
    ],
    niceToHave: [
      'Slot game mechanics experience (reels, paylines, bonus rounds)',
      'WebAssembly for performance-critical rendering paths',
      'Open-source contributions (Pixi.js community valued)',
    ],
    applyUrl: `mailto:${APPLY_EMAIL}?subject=${encodeURIComponent('Application — Senior Pixi.js Developer')}`,
  },
  {
    id: 'game-math-engineer',
    title: 'GAME MATHEMATICIAN / RNG SPECIALIST',
    department: 'Mathematics & Compliance',
    location: 'Remote (UK/EU)',
    type: 'Full-time / Contract',
    summary: 'Design the probability models and paytable mathematics for ULTRA-volatility slot titles.',
    description: 'Own the mathematical design of Gladiator slots — RTP distributions, volatility profiles, feature trigger frequencies, and peak win ceilings. Validate maths through simulation (10^9+ rounds). Produce audit-ready documentation for operator partners.',
    requirements: [
      'Degree in Mathematics, Statistics, or equivalent quantitative field',
      '3+ years slot game mathematics experience',
      'Proficiency in simulation tools (custom or industry-standard)',
      'Familiarity with regulatory RTP certification (MGA, UKGC)',
      'Clear communication of mathematical designs to non-specialists',
    ],
    niceToHave: [
      'Experience with provably fair / blockchain-based RNG',
      'BigQuery or similar for production telemetry analysis',
    ],
    applyUrl: `mailto:${APPLY_EMAIL}?subject=${encodeURIComponent('Application — Game Mathematician')}`,
  },
  {
    id: 'art-director',
    title: 'ART DIRECTOR',
    department: 'Creative',
    location: 'London, UK (Hybrid)',
    type: 'Full-time',
    summary: 'Define the visual language of next-generation slot titles and lead the creative team.',
    description: 'Set the visual standard for every new Gladiator title — concept and character design through to final asset delivery and in-engine integration. Manage artists and freelance contributors. Own creative briefs with game designers. Report directly to the CTO.',
    requirements: [
      '7+ years game art direction with slot game portfolio',
      'Full game art pipeline: concept, 2D illustration, animation brief, UI',
      'Experience managing artists within production schedules',
      'Knowledge of Pixi.js or equivalent 2D game engine asset integration',
      'Ability to context-switch between multiple concurrent titles',
    ],
    niceToHave: [
      'Crypto casino or social casino environment experience',
      'Motion design skills (After Effects or equivalent)',
      'Understanding of art style impact on player conversion',
    ],
    applyUrl: `mailto:${APPLY_EMAIL}?subject=${encodeURIComponent('Application — Art Director')}`,
  },
  {
    id: 'backend-engineer',
    title: 'BACKEND ENGINEER',
    department: 'Engineering',
    location: 'Remote / London',
    type: 'Full-time',
    summary: 'Build and scale the game server infrastructure behind 34 live titles across 7 markets.',
    description: 'Architect and maintain game backend services — bet processing, RNG integration, real-time feeder data pipeline, and operator API layer. Work with AWS and GCP across multiple regions. Sub-100ms round-trip is the baseline, not the goal.',
    requirements: [
      '5+ years backend development (Node.js / TypeScript preferred)',
      'Experience with AWS (EC2, Lambda, CloudFront, RDS) or GCP',
      'Strong understanding of distributed systems and high-throughput APIs',
      'Database design and optimization (SQL + NoSQL)',
      'Experience with real-time data streaming',
    ],
    niceToHave: [
      'iGaming or fintech backend experience',
      'BigQuery / data pipeline architecture',
      'Blockchain / crypto transaction processing',
    ],
    applyUrl: `mailto:${APPLY_EMAIL}?subject=${encodeURIComponent('Application — Backend Engineer')}`,
  },
  {
    id: 'qa-engineer',
    title: 'QA ENGINEER',
    department: 'Quality Assurance',
    location: 'Remote / London',
    type: 'Full-time',
    summary: 'Ensure every game ships at the quality standard MetaWin players expect.',
    description: 'Own the QA process for Gladiator slot titles — functional testing, RTP validation, performance benchmarking, cross-browser/device compatibility, and regression testing. Build automated test frameworks for game mechanics and integration endpoints.',
    requirements: [
      '3+ years QA experience in gaming or interactive applications',
      'Experience with automated testing frameworks',
      'Understanding of game mechanics testing and edge cases',
      'Cross-browser and mobile device testing expertise',
      'Strong attention to detail and systematic approach',
    ],
    niceToHave: [
      'iGaming QA experience (slot games, RNG validation)',
      'Performance profiling tools (Chrome DevTools, Lighthouse)',
      'Statistical validation of game mathematics',
    ],
    applyUrl: `mailto:${APPLY_EMAIL}?subject=${encodeURIComponent('Application — QA Engineer')}`,
  },
] as const;

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

const REQ_VARIANTS = {
  collapsed: { height: 0, opacity: 0, transition: { duration: 0.22 } },
  expanded: { height: 'auto' as const, opacity: 1, transition: { duration: 0.26 } },
} as const;

interface JobCardProps {
  readonly job: JobListing;
  readonly index: number;
  readonly showDetails: boolean;
  readonly onToggleDetails: (id: string) => void;
}

function JobCard({ job, index, showDetails, onToggleDetails }: JobCardProps) {
  const btnBase: React.CSSProperties = {
    ...MONO, clipPath: BEVEL, border: 'none', padding: '5px 18px', fontSize: '11px',
    fontWeight: 700, letterSpacing: '0.1em', cursor: 'pointer', textTransform: 'uppercase' as const,
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 }}
      style={{ ...CARD_BG, clipPath: BEVEL, padding: '12px 14px' }}
    >
      <div style={{ ...MONO, fontSize: '13px', fontWeight: 700, color: '#f1f5f9', marginBottom: '4px' }}>
        {job.title}
      </div>
      <div style={{ ...MONO, fontSize: '10px', color: 'rgba(79,195,247,0.7)', marginBottom: '6px' }}>
        {job.department} · {job.location} · {job.type}
      </div>
      <div style={{ ...MONO, fontSize: '11px', color: '#94a3b8', marginBottom: '8px', lineHeight: 1.5 }}>
        {job.summary}
      </div>
      <div style={{ height: '1px', background: 'rgba(79,195,247,0.15)', marginBottom: '8px' }} aria-hidden="true" />

      <AnimatePresence initial={false}>
        {showDetails && (
          <motion.div key="details" variants={REQ_VARIANTS} initial="collapsed" animate="expanded" exit="collapsed" style={{ overflow: 'hidden' }}>
            <p style={{ ...MONO, fontSize: '11px', color: '#94a3b8', lineHeight: 1.6, marginBottom: '10px' }}>
              {job.description}
            </p>
            <div style={{ ...MONO, fontSize: '10px', color: CYAN, letterSpacing: '0.1em', marginBottom: '6px' }}>
              REQUIREMENTS
            </div>
            <ul style={{ margin: '0 0 10px 0', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {job.requirements.map((r) => (
                <li key={r} style={{ ...MONO, fontSize: '11px', color: '#94a3b8', display: 'flex', gap: '6px', alignItems: 'flex-start' }}>
                  <span style={{ color: CYAN, flexShrink: 0, marginTop: '1px' }}>▸</span>{r}
                </li>
              ))}
            </ul>
            {job.niceToHave.length > 0 && (
              <>
                <div style={{ ...MONO, fontSize: '10px', color: 'rgba(79,195,247,0.5)', letterSpacing: '0.1em', marginBottom: '6px' }}>
                  NICE TO HAVE
                </div>
                <ul style={{ margin: '0 0 10px 0', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {job.niceToHave.map((r) => (
                    <li key={r} style={{ ...MONO, fontSize: '11px', color: 'rgba(148,163,184,0.6)', display: 'flex', gap: '6px', alignItems: 'flex-start' }}>
                      <span style={{ color: 'rgba(79,195,247,0.4)', flexShrink: 0, marginTop: '1px' }}>▹</span>{r}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ display: 'flex', gap: '8px' }}>
        <button onClick={() => onToggleDetails(job.id)}
          style={{ ...btnBase, background: showDetails ? 'rgba(79,195,247,0.15)' : 'rgba(79,195,247,0.08)', color: CYAN, border: '1px solid rgba(79,195,247,0.3)', boxShadow: 'inset 0 1px 0 rgba(79,195,247,0.15), 0 2px 6px rgba(0,0,0,0.4)' }}>
          ▸ {showDetails ? 'HIDE' : 'DETAILS'}
        </button>
        <a
          href={job.applyUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{ ...btnBase, background: CYAN, color: '#080c18', textDecoration: 'none', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.2), 0 2px 6px rgba(0,0,0,0.4)' }}>
          ▸ APPLY
        </a>
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export function CareersSection() {
  const [expandedIds, setExpandedIds] = useState<ReadonlySet<string>>(new Set());

  function handleToggle(id: string) {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) { next.delete(id); } else { next.add(id); }
      return next as ReadonlySet<string>;
    });
  }

  const cvHref = `mailto:${APPLY_EMAIL}?subject=${encodeURIComponent('Speculative Application — Gladiator Studio')}`;

  return (
    <SectionWrapper id="careers">
      <div style={{ ...MONO, color: CYAN, fontSize: '11px', marginBottom: '6px' }}>// RECRUITMENT_OPS</div>
      <div style={{ borderTop: `1px solid ${CYAN}`, borderBottom: `1px solid ${CYAN}`, padding: '4px 0', marginBottom: '8px' }}>
        <h2 style={{ ...MONO, fontSize: '16px', fontWeight: 700, color: '#f1f5f9', letterSpacing: '0.12em', margin: 0 }}>OPEN POSITIONS</h2>
      </div>
      <p style={{ ...MONO, fontSize: '11px', color: 'rgba(148,163,184,0.8)', lineHeight: 1.5, marginBottom: '16px' }}>
        Gladiator Studio is a small, senior team building the games behind MetaWin — one of the world's most-played crypto casinos. We hire for craft, move fast, and ship to production constantly.
      </p>

      {/* Job cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '12px' }}>
        {JOB_LISTINGS.map((job, index) => (
          <JobCard key={job.id} job={job} index={index} showDetails={expandedIds.has(job.id)} onToggleDetails={handleToggle} />
        ))}
      </div>

      {/* Speculative CTA */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
        style={{ ...CARD_BG, clipPath: BEVEL, padding: '12px 14px', borderColor: 'rgba(79,195,247,0.2)' }}
      >
        <div style={{ ...MONO, fontSize: '12px', fontWeight: 700, color: '#f1f5f9', marginBottom: '4px' }}>
          ROLE NOT LISTED?
        </div>
        <div style={{ ...MONO, fontSize: '11px', color: '#94a3b8', marginBottom: '10px', lineHeight: 1.5 }}>
          We hire senior talent across engineering, design, and product on a rolling basis. If you are exceptional at what you do and want to work on games that real players use daily, send us your dossier.
        </div>
        <a href={cvHref}
          style={{ ...MONO, clipPath: BEVEL, background: 'rgba(79,195,247,0.08)', border: '1px solid rgba(79,195,247,0.3)', color: CYAN, textDecoration: 'none', display: 'inline-block', padding: '5px 14px', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const, boxShadow: 'inset 0 1px 0 rgba(79,195,247,0.15), 0 2px 6px rgba(0,0,0,0.4)' }}>
          ▸ SEND DOSSIER
        </a>
      </motion.div>
    </SectionWrapper>
  );
}
