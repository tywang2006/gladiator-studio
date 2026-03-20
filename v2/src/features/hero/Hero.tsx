'use client';

import { useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useIsMobile } from '@/shared/hooks/useIsMobile';

// ─── Design tokens ────────────────────────────────────────────────────────────

const MONO = "'SF Mono', 'Menlo', 'Consolas', 'Courier New', monospace";
const CYAN = '#4fc3f7';

const STATS = [
  { value: '34',    label: 'GAMES'   },
  { value: '97.5%', label: 'MAX RTP' },
  { value: '7',     label: 'MARKETS' },
] as const;

const SPRING = { stiffness: 60, damping: 25, mass: 0.5 } as const;

const containerV = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
} as const;

const itemV = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } },
} as const;

const fadeOut = {
  initial: { opacity: 1, y: 0, scale: 1 },
  exit:    { opacity: 0, y: -12, scale: 0.92, transition: { duration: 0.25, ease: [0.4, 0, 1, 1] as const } },
} as const;

// ─── Stat panel ───────────────────────────────────────────────────────────────

function StatPanel({ value, label }: { readonly value: string; readonly label: string }) {
  return (
    <div style={{
      background: 'rgba(8,12,24,0.6)',
      border: '1px solid rgba(79,195,247,0.12)',
      borderRadius: 6,
      padding: '10px 20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 2,
      backdropFilter: 'blur(8px)',
    }}>
      <span style={{ fontFamily: MONO, fontSize: 'clamp(1.1rem,2.5vw,1.5rem)', fontWeight: 700,
        color: CYAN, textShadow: `0 0 20px ${CYAN}`, letterSpacing: '0.04em', lineHeight: 1 }}>
        {value}
      </span>
      <span style={{ fontFamily: MONO, fontSize: 10, fontWeight: 600,
        color: 'rgba(255,255,255,0.4)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
        {label}
      </span>
    </div>
  );
}

// ─── HUD button ───────────────────────────────────────────────────────────────

interface HudButtonProps {
  readonly onClick: () => void;
  readonly children: React.ReactNode;
  readonly primary?: boolean;
  readonly ariaLabel: string;
}

function HudButton({ onClick, children, primary = false, ariaLabel }: HudButtonProps) {
  return (
    <motion.button onClick={onClick} aria-label={ariaLabel}
      whileHover={{
        boxShadow: `0 0 15px rgba(79,195,247,0.15), 0 0 30px rgba(79,195,247,0.08)`,
        borderColor: primary ? 'rgba(79,195,247,0.55)' : 'rgba(79,195,247,0.35)',
      }}
      whileTap={{ scale: 0.97 }}
      style={{
        fontFamily: MONO, fontSize: 10, fontWeight: 700, letterSpacing: '2px',
        textTransform: 'uppercase', cursor: 'pointer', borderRadius: 4,
        padding: '8px 20px', minHeight: '44px', transition: 'border-color 0.2s ease',
        color: primary ? CYAN : 'rgba(79,195,247,0.7)',
        background: primary ? 'rgba(79,195,247,0.08)' : 'rgba(79,195,247,0.04)',
        border: `1px solid ${primary ? 'rgba(79,195,247,0.25)' : 'rgba(79,195,247,0.15)'}`,
        textShadow: primary ? `0 0 10px rgba(79,195,247,0.4)` : 'none',
      }}>
      {children}
    </motion.button>
  );
}

// ─── Corner brackets ──────────────────────────────────────────────────────────

function CornerBrackets() {
  const b = (t?: string, bt?: string, l?: string, r?: string): React.CSSProperties => ({
    position: 'absolute', top: t, bottom: bt, left: l, right: r,
    width: 40, height: 40, borderStyle: 'solid', borderColor: 'rgba(79,195,247,0.2)',
    borderWidth: 0,
    borderTopWidth: t !== undefined ? 1 : 0,
    borderBottomWidth: bt !== undefined ? 1 : 0,
    borderLeftWidth: l !== undefined ? 1 : 0,
    borderRightWidth: r !== undefined ? 1 : 0,
    pointerEvents: 'none', animation: 'corner-fade-in 1.2s ease both',
  });
  return (
    <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      <div style={b('24px', undefined, '24px', undefined)} />
      <div style={b('24px', undefined, undefined, '24px')} />
      <div style={b(undefined, '24px', '24px', undefined)} />
      <div style={b(undefined, '24px', undefined, '24px')} />
    </div>
  );
}


// ─── Props ────────────────────────────────────────────────────────────────────

export interface HeroProps {
  readonly isPanelOpen?: boolean;
  readonly panelSide?: 'left' | 'right';
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

export function Hero({ isPanelOpen = false }: HeroProps) {
  const isMobile = useIsMobile();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springX = useSpring(rawX, SPRING);
  const springY = useSpring(rawY, SPRING);
  const logoX = useTransform(springX, [-0.5, 0.5], [-18, 18]);
  const logoY = useTransform(springY, [-0.5, 0.5], [-12, 12]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (isPanelOpen) return;
    if (typeof window !== 'undefined' && window.innerWidth <= 768) return;
    rawX.set(e.clientX / window.innerWidth - 0.5);
    rawY.set(e.clientY / window.innerHeight - 0.5);
  }, [rawX, rawY, isPanelOpen]);

  const handleMouseLeave = useCallback(() => { rawX.set(0); rawY.set(0); }, [rawX, rawY]);

  const scrollToGames   = useCallback(() => { window.dispatchEvent(new CustomEvent('open-panel', { detail: 'games' })); }, []);
  const scrollToContact = useCallback(() => { window.dispatchEvent(new CustomEvent('open-panel', { detail: 'contact' })); }, []);

  // ─── Mini logo mode (panel is open) ─────────────────────────────────────────
  if (isPanelOpen) {
    return (
      <motion.div
        key="mini-logo"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        aria-label="Gladiator Studio — click to close panel"
        style={{ position: 'relative', cursor: 'pointer', userSelect: 'none' }}
      >
        {/* The logo — white SVG with pulsing blue glow, no background/border/circle */}
        <motion.img
          src="/gladiator-logo.svg"
          alt="Gladiator Studio"
          animate={{
            filter: [
              'brightness(0) invert(1) drop-shadow(0 0 8px rgba(79,195,247,0.6))',
              'brightness(0) invert(1) drop-shadow(0 0 20px rgba(79,195,247,1)) drop-shadow(0 0 40px rgba(79,195,247,0.4))',
              'brightness(0) invert(1) drop-shadow(0 0 8px rgba(79,195,247,0.6))',
            ],
          }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            width: 64,
            height: 'auto',
            display: 'block',
          }}
        />

        {/* "CLOSE" label that appears on hover */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          style={{
            position: 'absolute', top: 'calc(100% + 8px)', left: '50%',
            transform: 'translateX(-50%)',
            fontFamily: MONO, fontSize: 8, fontWeight: 700,
            letterSpacing: '0.2em', textTransform: 'uppercase',
            color: CYAN, whiteSpace: 'nowrap',
            textShadow: `0 0 8px ${CYAN}`,
            pointerEvents: 'none',
          }}
        >
          [ CLOSE ]
        </motion.div>
      </motion.div>
    );
  }

  // ─── Full hero mode ──────────────────────────────────────────────────────────
  return (
    <section
      id="home"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-label="Hero — Gladiator Studio"
      style={{ position: 'relative', height: '100%', display: 'flex',
        flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden', background: 'transparent',
        padding: isMobile ? '40px 12px 56px' : '50px 16px 48px' }}
    >
      {/* Scanline overlay */}
      <div className="scanline-bg" aria-hidden="true"
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1 }} />

      {/* Corner brackets */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 2 }}>
        <CornerBrackets />
      </div>

      {/* Main content */}
      <motion.div variants={containerV} initial="hidden" animate="visible"
        style={{ position: 'relative', zIndex: 10, display: 'flex',
          flexDirection: 'column', alignItems: 'center', textAlign: 'center',
          width: '100%', maxWidth: 900 }}>

        {/* Eyebrow badge */}
        <AnimatePresence>
          <motion.div key="badge" variants={itemV} {...fadeOut} style={{ marginBottom: isMobile ? 16 : 24 }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: isMobile ? '5px 12px' : '6px 16px', borderRadius: 9999,
              border: '1px solid rgba(79,195,247,0.2)', background: 'rgba(79,195,247,0.06)',
              color: CYAN, fontFamily: MONO, fontSize: isMobile ? 9 : 11, fontWeight: 600,
              letterSpacing: '0.18em', textTransform: 'uppercase',
              whiteSpace: 'nowrap',
            }}>
              <span className="animate-electric-pulse" aria-hidden="true"
                style={{ width: 6, height: 6, borderRadius: '50%', background: CYAN,
                  flexShrink: 0 }} />
              <span>A MetaWin Studio —{' '}
                <a href="https://metawin.com" target="_blank" rel="noopener noreferrer"
                  style={{ color: CYAN, textDecoration: 'underline', textUnderlineOffset: 3 }}>
                  metawin.com
                </a>
              </span>
            </span>
          </motion.div>
        </AnimatePresence>

        {/* Logo centerpiece + subtitle */}
        <motion.div variants={itemV} style={{ x: logoX, y: logoY,
          display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h1 className="sr-only">Gladiator Studio</h1>

          <div style={{ position: 'relative', width: isMobile ? 'clamp(140px,45vw,240px)' : 'clamp(240px,35vw,420px)', marginBottom: 4 }}>
            <img
              src="/gladiator-hero.jpg"
              alt="Gladiator Studio — metallic winged helmet"
              className="animate-logo-glow"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                mixBlendMode: 'lighten',
                maskImage: 'radial-gradient(ellipse 75% 70% at center, black 40%, transparent 75%)',
                WebkitMaskImage: 'radial-gradient(ellipse 75% 70% at center, black 40%, transparent 75%)',
              }}
            />
          </div>

          <p style={{
            fontFamily: MONO, fontSize: 'clamp(0.65rem,1.2vw,0.82rem)', fontWeight: 700,
            letterSpacing: '0.3em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.45)',
            textShadow: '0 0 16px rgba(79,195,247,0.25)',
            userSelect: 'none', marginTop: 0,
          }}>
            PREMIUM iGAMING STUDIO
          </p>
        </motion.div>

        {/* Stats bar */}
        <motion.div variants={itemV} aria-label="Studio statistics"
          style={{ display: 'flex', alignItems: 'center', gap: isMobile ? 6 : 8,
            flexWrap: 'wrap', justifyContent: 'center', marginTop: isMobile ? 12 : 16 }}>
          {STATS.map((s) => <StatPanel key={s.label} value={s.value} label={s.label} />)}
        </motion.div>

        {/* CTA buttons */}
        <motion.div variants={itemV} role="group" aria-label="Call to action"
          style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center',
            justifyContent: 'center', gap: 12, marginTop: 12 }}>
          <HudButton onClick={scrollToGames}   primary ariaLabel="Explore our games">Explore Our Games</HudButton>
          <HudButton onClick={scrollToContact}         ariaLabel="Partner with us">Partner With Us</HudButton>
        </motion.div>
      </motion.div>

    </section>
  );
}
