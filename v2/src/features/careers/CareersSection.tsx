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
  readonly description: string;
  readonly requirements: readonly string[];
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
    department: 'Engineering',
    location: 'Remote / London',
    type: 'Full-time',
    description: "Lead the development of AI-powered game systems for next-generation slot titles. You'll architect intelligent game mechanics, implement ML-driven player experience optimization, and build the AI infrastructure that powers Gladiator Studio's competitive edge.",
    requirements: [
      '5+ years game development',
      'Strong ML/AI background (PyTorch, TensorFlow)',
      'Experience with real-time systems',
      'Game mathematics and RNG knowledge',
      'Leadership experience',
    ],
    applyUrl: 'https://careers.arenaentertainment.com/jobs/7371186-lead-ai-game-engineer',
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
    ...MONO, clipPath: BEVEL, border: 'none', padding: '5px 12px', fontSize: '11px',
    fontWeight: 700, letterSpacing: '0.1em', cursor: 'pointer', textTransform: 'uppercase' as const,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
      style={{ ...CARD_BG, clipPath: BEVEL, padding: '12px 14px' }}
    >
      {/* Header row */}
      <div style={{ ...MONO, fontSize: '13px', fontWeight: 700, color: '#f1f5f9', marginBottom: '4px' }}>
        {job.title}
      </div>
      <div style={{ ...MONO, fontSize: '11px', color: 'rgba(79,195,247,0.7)', marginBottom: '8px' }}>
        {job.department} · {job.location} · {job.type}
      </div>
      <div style={{ height: '1px', background: 'rgba(79,195,247,0.15)', marginBottom: '8px' }} aria-hidden="true" />

      {/* Expandable details */}
      <AnimatePresence initial={false}>
        {showDetails && (
          <motion.div key="details" variants={REQ_VARIANTS} initial="collapsed" animate="expanded" exit="collapsed" style={{ overflow: 'hidden' }}>
            {/* Description */}
            <p style={{ ...MONO, fontSize: '11px', color: '#94a3b8', lineHeight: 1.6, marginBottom: '10px' }}>
              {job.description}
            </p>
            {/* Requirements */}
            <ul style={{ margin: '0 0 10px 0', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {job.requirements.map((r) => (
                <li key={r} style={{ ...MONO, fontSize: '11px', color: '#94a3b8', display: 'flex', gap: '6px', alignItems: 'flex-start' }}>
                  <span style={{ color: CYAN, flexShrink: 0, marginTop: '1px' }}>›</span>{r}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action buttons */}
      <div style={{ display: 'flex', gap: '8px' }}>
        <button onClick={() => onToggleDetails(job.id)}
          style={{ ...btnBase, background: showDetails ? 'rgba(79,195,247,0.15)' : 'rgba(79,195,247,0.08)', color: CYAN, border: `1px solid rgba(79,195,247,0.3)`, boxShadow: 'inset 0 1px 0 rgba(79,195,247,0.15), 0 2px 6px rgba(0,0,0,0.4)' }}>
          ▸ {showDetails ? 'HIDE' : 'DETAILS'}
        </button>
        <a
          href={job.applyUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{ ...btnBase, background: CYAN, color: '#080c18', textDecoration: 'none', display: 'inline-block', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.2), 0 2px 6px rgba(0,0,0,0.4)' }}>
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
      <div style={{ ...MONO, color: CYAN, fontSize: '11px', marginBottom: '6px' }}>// RECRUITMENT</div>
      <div style={{ borderTop: `1px solid ${CYAN}`, borderBottom: `1px solid ${CYAN}`, padding: '4px 0', marginBottom: '16px' }}>
        <h2 style={{ ...MONO, fontSize: '16px', fontWeight: 700, color: '#f1f5f9', letterSpacing: '0.12em', margin: 0 }}>OPEN POSITIONS</h2>
      </div>

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
          DON'T SEE YOUR ROLE?
        </div>
        <div style={{ ...MONO, fontSize: '11px', color: '#94a3b8', marginBottom: '10px', lineHeight: 1.5 }}>
          We hire senior talent across engineering, design, and product. Exceptional at what you do?
        </div>
        <a href={cvHref}
          style={{ ...MONO, clipPath: BEVEL, background: 'rgba(79,195,247,0.08)', border: `1px solid rgba(79,195,247,0.3)`, color: CYAN, textDecoration: 'none', display: 'inline-block', padding: '5px 14px', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const, boxShadow: 'inset 0 1px 0 rgba(79,195,247,0.15), 0 2px 6px rgba(0,0,0,0.4)' }}>
          ▸ SEND CV
        </a>
      </motion.div>
    </SectionWrapper>
  );
}
