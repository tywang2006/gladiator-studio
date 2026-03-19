import { useState } from 'react';
import type { ComponentType } from 'react';
import { ExternalLink, Building2, Cpu } from 'lucide-react';
import { SectionWrapper } from '@/shared/components/SectionWrapper';

// ─── Types ────────────────────────────────────────────────────────────────────

interface Partner {
  readonly name: string;
  readonly url: string;
  readonly description: string;
}

interface PartnerGroupProps {
  readonly label: string;
  readonly icon: ComponentType<{ className?: string; 'aria-hidden'?: boolean | 'true' | 'false' }>;
  readonly partners: readonly Partner[];
}

// ─── Data (immutable) ─────────────────────────────────────────────────────────

const OPERATOR_PARTNERS: readonly Partner[] = [
  {
    name: 'MetaWin',
    url: 'https://metawin.com',
    description:
      "Gladiator Studio's parent company and the world's leading crypto casino. MetaWin operates a live platform with hundreds of thousands of active players, providing the studio with a direct live environment for game testing, data analysis, and rapid iteration at scale.",
  },
  {
    name: 'Rolla',
    url: 'https://rolla.com',
    description:
      'A fast-growing crypto gaming platform with a premium product positioning. Rolla distributes Gladiator titles as part of its curated high-volatility content offering, targeting a player segment that actively seeks ULTRA-volatility slots.',
  },
  {
    name: 'WowVegas',
    url: 'https://wowvegas.com',
    description:
      "One of the leading US social casino operators. WowVegas integrates Gladiator Studio content to serve an audience of tens of thousands of daily active users, validating the studio's cross-format appeal beyond the pure crypto-casino segment.",
  },
] as const;

const TECHNOLOGY_PARTNERS: readonly Partner[] = [
  {
    name: 'Tequity',
    url: 'https://tequity.ventures',
    description:
      'Tequity provides strategic growth capital and industry advisory to Gladiator Studio and MetaWin. Their iGaming-focused investment thesis aligns directly with our expansion roadmap across regulated markets and new content verticals.',
  },
  {
    name: 'AWS',
    url: 'https://aws.amazon.com',
    description:
      "AWS powers the core backend infrastructure for Gladiator Studio's game servers, real-time bet data pipeline, and global CDN delivery. Our architecture leverages EC2, Lambda, CloudFront, and RDS across multiple regions to maintain sub-100ms game-round response times at scale.",
  },
  {
    name: 'Google Cloud',
    url: 'https://cloud.google.com',
    description:
      "GCP serves as Gladiator Studio's analytics and machine learning layer. BigQuery processes game-round telemetry data for RTP monitoring, player behaviour analysis, and live ops decisions. Our team holds GCP elite-user status and builds cloud-native on both major hyperscalers by design.",
  },
] as const;

// ─── HUD border style tokens ──────────────────────────────────────────────────

const HUD_CARD_STYLE = {
  borderTop: '1px solid rgba(79,195,247,0.2)',
  borderLeft: '1px solid rgba(79,195,247,0.1)',
  borderRight: '1px solid rgba(79,195,247,0.06)',
  borderBottom: '1px solid rgba(0,0,0,0.4)',
  boxShadow: 'inset 0 1px 0 rgba(79,195,247,0.08), 0 4px 12px rgba(0,0,0,0.4)',
} as const;

// ─── Partner card ─────────────────────────────────────────────────────────────

interface PartnerCardProps {
  readonly partner: Partner;
}

function PartnerCard({ partner }: PartnerCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const hoverStyle = isHovered
    ? {
        borderTop: '1px solid rgba(79,195,247,0.35)',
        borderLeft: '1px solid rgba(79,195,247,0.2)',
        borderRight: '1px solid rgba(79,195,247,0.1)',
        borderBottom: '1px solid rgba(0,0,0,0.5)',
        boxShadow: 'inset 0 1px 0 rgba(79,195,247,0.15), 0 0 20px rgba(79,195,247,0.12), 0 4px 16px rgba(0,0,0,0.5)',
      }
    : HUD_CARD_STYLE;

  return (
    <a
      href={partner.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${partner.name} — ${partner.description} (opens in new tab)`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      style={{
        ...hoverStyle,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        padding: '14px 16px',
        borderRadius: 10,
        background: 'linear-gradient(135deg, rgba(20,28,45,0.9) 0%, rgba(8,12,24,0.95) 50%, rgba(14,20,36,0.9) 100%)',
        backdropFilter: 'blur(8px)',
        textDecoration: 'none',
        transition: 'border 0.3s ease, box-shadow 0.3s ease',
        position: 'relative',
        outline: 'none',
      }}
    >
      {/* Scan-line texture — decorative */}
      <span
        style={{
          position: 'absolute', inset: 0, borderRadius: 10, pointerEvents: 'none', opacity: 0.012,
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(10,132,255,1) 3px, rgba(10,132,255,1) 4px)',
        }}
        aria-hidden="true"
      />

      {/* Corner accent — top-left */}
      <span
        style={{
          position: 'absolute', top: 0, left: 0, width: 16, height: 16, pointerEvents: 'none', opacity: 0.6,
          borderTop: '1px solid rgba(10,132,255,0.6)',
          borderLeft: '1px solid rgba(10,132,255,0.6)',
          borderRadius: '0.75rem 0 0 0',
        }}
        aria-hidden="true"
      />

      {/* Corner accent — bottom-right */}
      <span
        style={{
          position: 'absolute', bottom: 0, right: 0, width: 16, height: 16, pointerEvents: 'none', opacity: 0.6,
          borderBottom: '1px solid rgba(10,132,255,0.6)',
          borderRight: '1px solid rgba(10,132,255,0.6)',
          borderRadius: '0 0 0.75rem 0',
        }}
        aria-hidden="true"
      />

      {/* Header row: name + visit link */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 15,
            fontWeight: 900,
            letterSpacing: '-0.01em',
            color: 'var(--color-text-primary)',
            lineHeight: 1,
          }}
        >
          {partner.name}
        </span>

        <span
          style={{
            display: 'flex', alignItems: 'center', gap: 4,
            color: 'var(--color-electric)',
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.2s ease',
          }}
          aria-hidden="true"
        >
          <ExternalLink style={{ width: 13, height: 13 }} aria-hidden="true" />
          <span style={{ fontSize: 10, fontFamily: 'monospace', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
            Visit
          </span>
        </span>
      </div>

      {/* Description */}
      <span
        style={{
          fontSize: 12,
          color: 'var(--color-text-muted)',
          lineHeight: 1.55,
        }}
      >
        {partner.description}
      </span>
    </a>
  );
}

// ─── Partner group with vertical list ────────────────────────────────────────

function PartnerGroup({ label, icon: Icon, partners }: PartnerGroupProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Group label */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '0 2px' }}>
        <span
          style={{
            width: 6, height: 6, borderRadius: '50%', background: 'var(--color-electric)', flexShrink: 0,
            boxShadow: '0 0 6px rgba(10,132,255,0.8)',
          }}
          aria-hidden="true"
        />
        <Icon className="w-4 h-4 text-[var(--color-electric)]" aria-hidden="true" />
        <span
          style={{
            fontSize: 11, fontFamily: 'monospace', fontWeight: 600,
            letterSpacing: '0.2em', textTransform: 'uppercase',
            color: 'var(--color-text-muted)',
          }}
        >
          {label}
        </span>
        <span
          style={{
            flex: 1, height: 1,
            background: 'linear-gradient(to right, rgba(10,132,255,0.25), transparent)',
          }}
          aria-hidden="true"
        />
      </div>

      {/* Vertical card stack */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {partners.map((partner) => (
          <PartnerCard key={partner.name} partner={partner} />
        ))}
      </div>
    </div>
  );
}

// ─── Section heading ──────────────────────────────────────────────────────────

function SectionHeading() {
  return (
    <div className="text-center mb-14 space-y-3">
      {/* Eyebrow */}
      <p
        className="text-xs font-mono font-semibold tracking-[0.3em] uppercase text-[var(--color-electric)]"
        aria-hidden="true"
      >
        // trusted_ecosystem
      </p>

      {/* Title */}
      <h2
        className="font-black uppercase leading-none text-[var(--color-text-primary)]"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
          letterSpacing: '0.06em',
        }}
      >
        OUR PARTNERS
      </h2>

      {/* Subtitle */}
      <p
        className="text-[var(--color-text-secondary)] max-w-md mx-auto"
        style={{ fontSize: '13px' }}
      >
        The operators, platforms, and infrastructure providers that power our global distribution.
      </p>

      {/* Electric divider */}
      <div className="flex items-center justify-center gap-3 pt-1" aria-hidden="true">
        <span
          className="h-px w-12 opacity-40"
          style={{ background: 'rgba(10,132,255,1)' }}
        />
        <span
          className="w-1.5 h-1.5 rounded-full bg-[var(--color-electric)]"
          style={{ boxShadow: '0 0 8px rgba(10,132,255,0.9)' }}
        />
        <span
          className="h-px w-12 opacity-40"
          style={{ background: 'rgba(10,132,255,1)' }}
        />
      </div>
    </div>
  );
}

// ─── Root export ──────────────────────────────────────────────────────────────

export function PartnersSection() {
  return (
    <SectionWrapper id="partners">
      <SectionHeading />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
        <PartnerGroup
          label="Operator Partners"
          icon={Building2}
          partners={OPERATOR_PARTNERS}
        />

        <PartnerGroup
          label="Technology Partners"
          icon={Cpu}
          partners={TECHNOLOGY_PARTNERS}
        />
      </div>
    </SectionWrapper>
  );
}
