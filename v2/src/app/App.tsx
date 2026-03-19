import { Suspense, lazy, useEffect, useState, useCallback, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';
import { ErrorBoundary } from '@/shared/components/ErrorBoundary';
import { Hero } from '@/features/hero/Hero';
import { fetchGameData } from '@/api/gameData';
import type { GameData } from '@/shared/types/game';
import { StarfieldCanvas } from '@/features/starfield/StarfieldCanvas';
import { useFeederSocket } from '@/features/live-feed/useFeederSocket';
import { sceneEvents } from '@/shared/utils/sceneEvents';
import { CLIENT_AREA_URL } from '@/shared/constants/urls';
import { AgeGate, useAgeGate } from '@/shared/components/AgeGate';
import { WarpIntro } from '@/shared/components/WarpIntro';

const LiveActivityFeed = lazy(() => import('@/features/live-feed/LiveActivityFeed').then(m => ({ default: m.LiveActivityFeed })));
const GameShowcase = lazy(() => import('@/features/games/GameShowcase').then(m => ({ default: m.GameShowcase })));
const AboutSection = lazy(() => import('@/features/about/AboutSection').then(m => ({ default: m.AboutSection })));
const TeamSection = lazy(() => import('@/features/team/TeamSection').then(m => ({ default: m.TeamSection })));
const JourneySection = lazy(() => import('@/features/journey/JourneySection').then(m => ({ default: m.JourneySection })));
const CareersSection = lazy(() => import('@/features/careers/CareersSection').then(m => ({ default: m.CareersSection })));
const ContactSection = lazy(() => import('@/features/contact/ContactSection').then(m => ({ default: m.ContactSection })));

const CYAN = '#4fc3f7';
const MONO = "'SF Mono','Menlo','Consolas',monospace" as const;
const VOID = 'rgba(8,12,24,0.92)';
const PANEL_BG = 'rgba(8,12,24,0.88)';
const CYAN_DIM = 'rgba(79,195,247,0.2)';
const BEVEL = 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))';
const HUD: React.CSSProperties = { fontFamily: MONO, fontSize: '10px', letterSpacing: '1.5px', fontWeight: 600, textTransform: 'uppercase' as const };

// ─── 3D metallic styling constants ────────────────────────────────────────────
const METAL_BG = 'linear-gradient(180deg, rgba(30,40,60,0.95) 0%, rgba(12,18,32,0.98) 100%)';
const METAL_HIGHLIGHT = 'inset 0 1px 0 rgba(79,195,247,0.15), inset 0 -1px 0 rgba(0,0,0,0.4)';
const METAL_SHADOW = '0 2px 8px rgba(0,0,0,0.5), 0 0 1px rgba(79,195,247,0.2)';
const BTN_3D: React.CSSProperties = {
  background: METAL_BG,
  boxShadow: `${METAL_HIGHLIGHT}, ${METAL_SHADOW}`,
  borderTop: '1px solid rgba(79,195,247,0.2)',
  borderBottom: '1px solid rgba(0,0,0,0.5)',
  borderLeft: '1px solid rgba(79,195,247,0.1)',
  borderRight: '1px solid rgba(79,195,247,0.1)',
};
const BTN_3D_ACTIVE: React.CSSProperties = {
  background: 'linear-gradient(180deg, rgba(10,15,25,0.98) 0%, rgba(20,30,50,0.95) 100%)',
  boxShadow: `inset 0 2px 6px rgba(0,0,0,0.6), inset 0 0 12px rgba(79,195,247,0.1), 0 0 8px rgba(79,195,247,0.2)`,
  borderTop: '1px solid rgba(0,0,0,0.4)',
  borderBottom: '1px solid rgba(79,195,247,0.15)',
};
const BAR_3D: React.CSSProperties = {
  background: 'linear-gradient(180deg, rgba(20,28,45,0.96) 0%, rgba(8,12,24,0.98) 50%, rgba(14,20,36,0.96) 100%)',
  boxShadow: 'inset 0 1px 0 rgba(79,195,247,0.1), inset 0 -1px 0 rgba(0,0,0,0.5), 0 4px 16px rgba(0,0,0,0.6)',
};
const PANEL_3D: React.CSSProperties = {
  background: 'linear-gradient(135deg, rgba(16,24,40,0.95) 0%, rgba(8,12,24,0.98) 50%, rgba(12,18,32,0.96) 100%)',
  boxShadow: 'inset 0 1px 0 rgba(79,195,247,0.12), inset -1px 0 0 rgba(79,195,247,0.06), 0 8px 32px rgba(0,0,0,0.7), 0 0 1px rgba(79,195,247,0.3)',
  borderTop: '1px solid rgba(79,195,247,0.2)',
  borderLeft: '1px solid rgba(79,195,247,0.12)',
  borderRight: '1px solid rgba(79,195,247,0.08)',
  borderBottom: '1px solid rgba(0,0,0,0.5)',
};
const SCANLINE_STYLE: React.CSSProperties = {
  position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1,
  backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)',
};

type PanelId = 'none' | 'games' | 'about' | 'team' | 'journey' | 'live' | 'careers' | 'contact';

// ─── Planet glow color map ────────────────────────────────────────────────────

const PLANET_GLOW: Record<string, string> = {
  games:   '#ffd54f',
  about:   '#4fc3f7',
  team:    '#ef5350',
  journey: '#b39ddb',
  live:    '#66bb6a',
  careers: '#ff8a65',
  contact: '#90a4ae',
};

// ─── Planet drawing functions ─────────────────────────────────────────────────

function drawSaturn(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number): void {
  // Planet body — gold radial gradient
  const body = ctx.createRadialGradient(cx - r * 0.3, cy - r * 0.3, r * 0.05, cx, cy, r);
  body.addColorStop(0, '#fff3b0');
  body.addColorStop(0.4, '#ffd54f');
  body.addColorStop(0.75, '#c8960c');
  body.addColorStop(1, '#6b4a00');
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fillStyle = body;
  ctx.fill();

  // Banding — subtle horizontal stripes
  for (let i = 0; i < 4; i++) {
    const by = cy - r * 0.5 + i * r * 0.32;
    const bh = r * 0.12;
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.clip();
    ctx.fillStyle = 'rgba(0,0,0,0.12)';
    ctx.fillRect(cx - r, by, r * 2, bh);
    ctx.restore();
  }

  // Ring — elliptical arc, drawn before planet so it wraps around
  ctx.save();
  ctx.translate(cx, cy);
  ctx.scale(1, 0.28);
  ctx.beginPath();
  ctx.arc(0, 0, r * 1.65, 0, Math.PI * 2);
  const ring = ctx.createLinearGradient(-r * 1.65, 0, r * 1.65, 0);
  ring.addColorStop(0, 'rgba(255,213,79,0)');
  ring.addColorStop(0.2, 'rgba(255,213,79,0.55)');
  ring.addColorStop(0.5, 'rgba(200,150,12,0.7)');
  ring.addColorStop(0.8, 'rgba(255,213,79,0.55)');
  ring.addColorStop(1, 'rgba(255,213,79,0)');
  ctx.strokeStyle = ring;
  ctx.lineWidth = r * 0.38;
  ctx.stroke();
  ctx.restore();
}

function drawIcePlanet(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number): void {
  const body = ctx.createRadialGradient(cx - r * 0.25, cy - r * 0.25, r * 0.05, cx, cy, r);
  body.addColorStop(0, '#e3f6ff');
  body.addColorStop(0.35, '#81d4fa');
  body.addColorStop(0.7, '#0277bd');
  body.addColorStop(1, '#01294a');
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fillStyle = body;
  ctx.fill();

  // Cloud swirls — bezier curves
  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.clip();
  ctx.strokeStyle = 'rgba(255,255,255,0.25)';
  ctx.lineWidth = r * 0.08;
  ctx.lineCap = 'round';
  for (let i = 0; i < 3; i++) {
    const oy = cy - r * 0.4 + i * r * 0.38;
    ctx.beginPath();
    ctx.moveTo(cx - r * 0.85, oy);
    ctx.bezierCurveTo(
      cx - r * 0.3, oy - r * 0.18,
      cx + r * 0.3, oy + r * 0.18,
      cx + r * 0.85, oy,
    );
    ctx.stroke();
  }
  ctx.restore();

  // Polar highlight
  const polar = ctx.createRadialGradient(cx - r * 0.2, cy - r * 0.55, 0, cx - r * 0.2, cy - r * 0.55, r * 0.45);
  polar.addColorStop(0, 'rgba(255,255,255,0.35)');
  polar.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.clip();
  ctx.fillStyle = polar;
  ctx.fill();
  ctx.restore();
}

function drawMarsPlanet(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number): void {
  const body = ctx.createRadialGradient(cx - r * 0.3, cy - r * 0.3, r * 0.05, cx, cy, r);
  body.addColorStop(0, '#ff8a65');
  body.addColorStop(0.4, '#d84315');
  body.addColorStop(0.8, '#7f1b0a');
  body.addColorStop(1, '#3e0b05');
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fillStyle = body;
  ctx.fill();

  // Craters — deterministic positions using prime-step offsets
  const craters: readonly [number, number, number][] = [
    [-0.35, -0.25, 0.14],
    [0.3, 0.15, 0.10],
    [-0.1, 0.42, 0.08],
    [0.45, -0.38, 0.06],
    [-0.5, 0.28, 0.07],
    [0.12, -0.5, 0.09],
  ];
  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.clip();
  for (const [ox, oy, cr] of craters) {
    const px = cx + ox * r;
    const py = cy + oy * r;
    ctx.beginPath();
    ctx.arc(px, py, cr * r, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0,0,0,0.3)';
    ctx.fill();
    ctx.beginPath();
    ctx.arc(px - cr * r * 0.3, py - cr * r * 0.3, cr * r * 0.5, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,255,255,0.08)';
    ctx.fill();
  }
  ctx.restore();
}

function drawNebula(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number): void {
  // Multiple overlapping soft gas cloud blobs
  const blobs: readonly [number, number, number, string][] = [
    [cx - r * 0.2, cy - r * 0.1, r * 0.75, '#9c27b0'],
    [cx + r * 0.25, cy + r * 0.15, r * 0.65, '#673ab7'],
    [cx - r * 0.3, cy + r * 0.2, r * 0.55, '#e91e63'],
    [cx + r * 0.1, cy - r * 0.3, r * 0.5, '#3f51b5'],
    [cx, cy, r * 0.4, '#ce93d8'],
  ];
  ctx.save();
  ctx.globalAlpha = 0.75;
  for (const [bx, by, br, color] of blobs) {
    const g = ctx.createRadialGradient(bx, by, 0, bx, by, br);
    const hex = color;
    g.addColorStop(0, hex + 'cc');
    g.addColorStop(0.5, hex + '55');
    g.addColorStop(1, hex + '00');
    ctx.beginPath();
    ctx.arc(bx, by, br, 0, Math.PI * 2);
    ctx.fillStyle = g;
    ctx.fill();
  }
  ctx.restore();

  // Star specks inside nebula
  const specks: readonly [number, number][] = [
    [cx - r * 0.4, cy - r * 0.35],
    [cx + r * 0.3, cy - r * 0.2],
    [cx - r * 0.1, cy + r * 0.4],
    [cx + r * 0.45, cy + r * 0.1],
    [cx - r * 0.55, cy + r * 0.05],
    [cx + r * 0.15, cy + r * 0.55],
    [cx - r * 0.28, cy - r * 0.55],
  ];
  ctx.fillStyle = 'rgba(255,255,255,0.7)';
  for (const [sx, sy] of specks) {
    ctx.beginPath();
    ctx.arc(sx, sy, 1.2, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawEnergySphere(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number): void {
  const body = ctx.createRadialGradient(cx - r * 0.2, cy - r * 0.2, r * 0.05, cx, cy, r);
  body.addColorStop(0, '#c8e6c9');
  body.addColorStop(0.3, '#4caf50');
  body.addColorStop(0.65, '#1b5e20');
  body.addColorStop(1, '#0a1f0b');
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fillStyle = body;
  ctx.fill();

  // Electric arcs — jagged line segments radiating from center
  const arcs = 6;
  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.clip();
  ctx.strokeStyle = 'rgba(144,238,144,0.45)';
  ctx.lineWidth = 1.2;
  ctx.lineCap = 'round';
  for (let i = 0; i < arcs; i++) {
    const angle = (i / arcs) * Math.PI * 2;
    const steps = 5;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    let px = cx;
    let py = cy;
    for (let s = 1; s <= steps; s++) {
      const t = s / steps;
      const baseX = cx + Math.cos(angle) * r * t;
      const baseY = cy + Math.sin(angle) * r * t;
      const jitter = r * 0.12;
      px = baseX + (Math.random() - 0.5) * jitter;
      py = baseY + (Math.random() - 0.5) * jitter;
      ctx.lineTo(px, py);
    }
    ctx.stroke();
  }
  ctx.restore();

  // Outer glow ring
  const glow = ctx.createRadialGradient(cx, cy, r * 0.8, cx, cy, r * 1.1);
  glow.addColorStop(0, 'rgba(76,175,80,0.0)');
  glow.addColorStop(0.5, 'rgba(76,175,80,0.2)');
  glow.addColorStop(1, 'rgba(76,175,80,0)');
  ctx.beginPath();
  ctx.arc(cx, cy, r * 1.1, 0, Math.PI * 2);
  ctx.fillStyle = glow;
  ctx.fill();
}

function drawMoltenPlanet(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number): void {
  const body = ctx.createRadialGradient(cx - r * 0.25, cy - r * 0.25, r * 0.08, cx, cy, r);
  body.addColorStop(0, '#ffe0b2');
  body.addColorStop(0.3, '#ff8a65');
  body.addColorStop(0.65, '#e64a19');
  body.addColorStop(1, '#3e1200');
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fillStyle = body;
  ctx.fill();

  // Lava crack lines — branching paths
  const cracks: readonly [number, number, number, number][] = [
    [cx, cy - r * 0.1, cx - r * 0.45, cy + r * 0.6],
    [cx - r * 0.05, cy, cx + r * 0.5, cy + r * 0.5],
    [cx - r * 0.3, cy - r * 0.3, cx + r * 0.3, cy - r * 0.7],
    [cx + r * 0.1, cy + r * 0.1, cx - r * 0.6, cy - r * 0.2],
  ];
  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.clip();
  ctx.strokeStyle = 'rgba(255,235,59,0.55)';
  ctx.lineWidth = 1.5;
  ctx.lineCap = 'round';
  for (const [x1, y1, x2, y2] of cracks) {
    const mx = (x1 + x2) / 2 + (Math.random() - 0.5) * r * 0.3;
    const my = (y1 + y2) / 2 + (Math.random() - 0.5) * r * 0.3;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.quadraticCurveTo(mx, my, x2, y2);
    ctx.stroke();
    // Glowing inner line
    ctx.strokeStyle = 'rgba(255,255,100,0.7)';
    ctx.lineWidth = 0.7;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.quadraticCurveTo(mx, my, x2, y2);
    ctx.stroke();
    ctx.strokeStyle = 'rgba(255,235,59,0.55)';
    ctx.lineWidth = 1.5;
  }
  ctx.restore();
}

function drawMoon(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number): void {
  const body = ctx.createRadialGradient(cx - r * 0.3, cy - r * 0.3, r * 0.05, cx, cy, r);
  body.addColorStop(0, '#eceff1');
  body.addColorStop(0.4, '#b0bec5');
  body.addColorStop(0.8, '#607d8b');
  body.addColorStop(1, '#263238');
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fillStyle = body;
  ctx.fill();

  // Craters — larger and more prominent than Mars
  const craters: readonly [number, number, number][] = [
    [-0.3, -0.2, 0.18],
    [0.35, 0.25, 0.13],
    [-0.05, 0.45, 0.10],
    [0.42, -0.4, 0.08],
    [-0.55, 0.1, 0.09],
    [0.1, -0.55, 0.07],
    [-0.45, -0.42, 0.06],
  ];
  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.clip();
  for (const [ox, oy, cr] of craters) {
    const px = cx + ox * r;
    const py = cy + oy * r;
    ctx.beginPath();
    ctx.arc(px, py, cr * r, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0,0,0,0.22)';
    ctx.fill();
    // Crater rim highlight
    ctx.beginPath();
    ctx.arc(px, py, cr * r, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255,255,255,0.12)';
    ctx.lineWidth = 1.2;
    ctx.stroke();
  }
  ctx.restore();

  // Terminator shadow — sharp directional shadow on right side
  const shadow = ctx.createRadialGradient(cx + r * 0.5, cy, 0, cx + r * 0.5, cy, r * 1.1);
  shadow.addColorStop(0, 'rgba(0,0,0,0)');
  shadow.addColorStop(0.6, 'rgba(0,0,0,0)');
  shadow.addColorStop(1, 'rgba(0,0,0,0.45)');
  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.clip();
  ctx.fillStyle = shadow;
  ctx.fill();
  ctx.restore();
}

function drawPlanet(ctx: CanvasRenderingContext2D, size: number, panelId: string): void {
  const cx = size / 2;
  const cy = size / 2;
  const r = size * 0.33;
  switch (panelId) {
    case 'games':   drawSaturn(ctx, cx, cy, r);       break;
    case 'about':   drawIcePlanet(ctx, cx, cy, r);    break;
    case 'team':    drawMarsPlanet(ctx, cx, cy, r);   break;
    case 'journey': drawNebula(ctx, cx, cy, r);       break;
    case 'live':    drawEnergySphere(ctx, cx, cy, r); break;
    case 'careers': drawMoltenPlanet(ctx, cx, cy, r); break;
    case 'contact': drawMoon(ctx, cx, cy, r);         break;
    default: break;
  }
}

// ─── PanelPlanet component ────────────────────────────────────────────────────

interface PanelPlanetProps {
  readonly panelId: string;
  readonly isLeft: boolean;
}

function PanelPlanet({ panelId, isLeft }: PanelPlanetProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = 200;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    let angle = 0;
    let raf = 0;

    const animate = () => {
      angle += 0.003;
      ctx.clearRect(0, 0, size, size);
      ctx.save();
      ctx.translate(size / 2, size / 2);
      ctx.rotate(angle);
      ctx.translate(-size / 2, -size / 2);
      drawPlanet(ctx, size, panelId);
      ctx.restore();
      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [panelId]);

  const glowColor = PLANET_GLOW[panelId] ?? '#4fc3f7';

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        top: '50%',
        ...(isLeft
          ? { right: '-60px' }
          : { left: '-60px' }),
        transform: 'translateY(-50%)',
        width: 200,
        height: 200,
        opacity: 0.15,
        pointerEvents: 'none',
        zIndex: 0,
        filter: `drop-shadow(0 0 30px ${glowColor})`,
      }}
    />
  );
}
const LEFT_PANELS: readonly PanelId[] = ['games', 'about', 'team', 'journey'];

interface CommandButtonProps {
  readonly label: string; readonly panelId: PanelId;
  readonly active: boolean; readonly onClick: (id: PanelId) => void;
}

// ─── useValueFlash hook ────────────────────────────────────────────────────────

function useValueFlash(value: number): boolean {
  const prevRef = useRef<number>(value);
  const [flashing, setFlashing] = useState(false);

  useEffect(() => {
    if (prevRef.current !== value) {
      prevRef.current = value;
      setFlashing(true);
      const timer = setTimeout(() => setFlashing(false), 600);
      return () => clearTimeout(timer);
    }
  }, [value]);

  return flashing;
}

// ─── HUD corner brackets ───────────────────────────────────────────────────────

interface HudCornersProps {
  readonly size?: number;
  readonly thickness?: number;
}

function HudCorners({ size = 18, thickness = 2 }: HudCornersProps) {
  const len = size;
  // Each entry: pixel coords relative to a corner anchor, delay in seconds
  // cx/cy: 0 = start from 0, 1 = start from 100%
  const segments = [
    // top-left vertical (draws down)
    { id: 'tl-v', x1: 0, y1: 0,    x2: 0,   y2: len,  cx: 0, cy: 0, delay: 0 },
    // top-left horizontal (draws right)
    { id: 'tl-h', x1: 0, y1: 0,    x2: len, y2: 0,    cx: 0, cy: 0, delay: 0.06 },
    // top-right horizontal (draws left)
    { id: 'tr-h', x1: 0, y1: 0,    x2: -len, y2: 0,   cx: 1, cy: 0, delay: 0.12 },
    // top-right vertical (draws down)
    { id: 'tr-v', x1: 0, y1: 0,    x2: 0,   y2: len,  cx: 1, cy: 0, delay: 0.18 },
    // bottom-right vertical (draws up)
    { id: 'br-v', x1: 0, y1: 0,    x2: 0,   y2: -len, cx: 1, cy: 1, delay: 0.24 },
    // bottom-right horizontal (draws left)
    { id: 'br-h', x1: 0, y1: 0,    x2: -len, y2: 0,   cx: 1, cy: 1, delay: 0.30 },
    // bottom-left horizontal (draws right)
    { id: 'bl-h', x1: 0, y1: 0,    x2: len, y2: 0,    cx: 0, cy: 1, delay: 0.36 },
    // bottom-left vertical (draws up)
    { id: 'bl-v', x1: 0, y1: 0,    x2: 0,   y2: -len, cx: 0, cy: 1, delay: 0.42 },
  ] as const;

  const resolve = (coord: number, base: 0 | 1): string =>
    base === 0 ? `${coord}` : `calc(100% + ${coord}px)`;

  return (
    <svg
      aria-hidden="true"
      style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 5,
        width: '100%', height: '100%', overflow: 'visible',
      }}
    >
      {segments.map((s) => (
        <line
          key={s.id}
          x1={resolve(s.x1, s.cx)}
          y1={resolve(s.y1, s.cy)}
          x2={resolve(s.x2, s.cx)}
          y2={resolve(s.y2, s.cy)}
          stroke={CYAN}
          strokeWidth={thickness}
          strokeLinecap="square"
          strokeDasharray={len}
          strokeDashoffset={len}
          style={{ animation: `hud-draw 0.35s ease-out ${s.delay}s forwards`, opacity: 0.85 }}
        />
      ))}
    </svg>
  );
}

// ─── Scan sweep overlay ────────────────────────────────────────────────────────

function ScanSweep() {
  return (
    <div
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 3, overflow: 'hidden' }}
    >
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          height: '15%',
          background: 'linear-gradient(180deg, transparent 0%, rgba(79,195,247,0.08) 50%, transparent 100%)',
          animation: 'scan-sweep 6s linear infinite',
          willChange: 'transform',
        }}
      />
    </div>
  );
}

// ─── Holographic noise overlay ─────────────────────────────────────────────────

function HoloNoise() {
  return (
    <svg
      aria-hidden="true"
      style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 4,
        width: '100%', height: '100%', opacity: 0.04,
        animation: 'holo-flicker 0.25s steps(4) infinite',
        willChange: 'transform',
      }}
    >
      <filter id="holo-noise">
        <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#holo-noise)" />
    </svg>
  );
}

// ─── Command button ───────────────────────────────────────────────────────────

function CommandButton({ label, panelId, active, onClick }: CommandButtonProps) {
  const [hovered, setHovered] = useState(false);
  const lit = active || hovered;

  return (
    <button
      onClick={() => onClick(panelId)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-pressed={active}
      style={{
        ...HUD,
        clipPath: BEVEL,
        background: active
          ? 'linear-gradient(180deg, rgba(10,15,25,0.98) 0%, rgba(20,30,50,0.95) 100%)'
          : hovered
            ? 'linear-gradient(180deg, rgba(35,45,65,0.95) 0%, rgba(16,22,38,0.98) 100%)'
            : 'linear-gradient(180deg, rgba(30,40,60,0.95) 0%, rgba(12,18,32,0.98) 100%)',
        border: '1px solid rgba(79,195,247,0.15)',
        boxShadow: active
          ? 'inset 0 2px 6px rgba(0,0,0,0.6), inset 0 0 12px rgba(79,195,247,0.1), 0 0 8px rgba(79,195,247,0.2)'
          : lit
            ? 'inset 0 1px 0 rgba(79,195,247,0.15), inset 0 -1px 0 rgba(0,0,0,0.4), 0 2px 8px rgba(0,0,0,0.5), 0 0 12px rgba(79,195,247,0.15)'
            : 'inset 0 1px 0 rgba(79,195,247,0.15), inset 0 -1px 0 rgba(0,0,0,0.4), 0 2px 8px rgba(0,0,0,0.5)',
        color: lit ? CYAN : 'rgba(255,255,255,0.5)',
        padding: '10px 16px',
        minWidth: '80px',
        minHeight: '44px',
        cursor: 'pointer',
        outline: 'none',
        transition: 'background 0.15s ease, box-shadow 0.15s ease, color 0.15s ease, transform 0.15s ease',
        transform: active ? 'translateY(1px)' : hovered ? 'translateY(-1px)' : 'none',
        textShadow: lit ? '0 0 8px rgba(79,195,247,0.5)' : 'none',
        textAlign: 'center' as const,
        whiteSpace: 'nowrap' as const,
        flexShrink: 0,
      }}
    >
      {label}
    </button>
  );
}

// ─── Top HUD status bar ───────────────────────────────────────────────────────

interface StatusBarProps {
  readonly isConnected: boolean;
  readonly totalEvents: number;
  readonly totalAmount: number;
}

function StatusBar({ isConnected, totalEvents, totalAmount }: StatusBarProps) {
  const [caHovered, setCaHovered] = useState(false);
  const wagered = totalAmount >= 1000
    ? `$${(totalAmount / 1000).toFixed(1)}K`
    : `$${totalAmount.toFixed(0)}`;

  const eventsFlashing = useValueFlash(totalEvents);
  const amountFlashing = useValueFlash(totalAmount);

  return (
    <header
      role="banner"
      aria-label="HUD status bar"
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        height: '40px',
        ...BAR_3D,
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(79,195,247,0.15)',
        clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%)',
        display: 'flex', alignItems: 'center',
        paddingTop: 'env(safe-area-inset-top, 0px)',
        padding: '0 16px',
        gap: '16px',
        overflow: 'hidden',
      }}
    >
      <div aria-hidden="true" style={SCANLINE_STYLE} />
      <img src="/gladiator-logo.svg" alt="Gladiator Studio" style={{ height: '24px', width: 'auto', flexShrink: 0, filter: 'drop-shadow(0 0 8px rgba(79,195,247,0.55))', position: 'relative', zIndex: 2 }} />
      <span aria-hidden="true" style={{ width: '1px', height: '20px', background: CYAN_DIM, flexShrink: 0 }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flex: 1, justifyContent: 'center', position: 'relative', zIndex: 2 }}>
        <span style={{ ...HUD, display: 'flex', alignItems: 'center', gap: '6px', color: 'rgba(255,255,255,0.45)' }}>
          <span aria-label={isConnected ? 'Connected' : 'Disconnected'} style={{ width: '7px', height: '7px', borderRadius: '50%', flexShrink: 0, background: isConnected ? '#00ff88' : '#ff4444', boxShadow: isConnected ? '0 0 8px #00ff88' : '0 0 8px #ff4444', animation: isConnected ? 'pulse 2s infinite' : 'none' }} />
          {isConnected ? 'LIVE' : 'OFFLINE'}
        </span>
        <span aria-hidden="true" style={{ width: '1px', height: '12px', background: CYAN_DIM }} />
        <span style={{ ...HUD, color: 'rgba(255,255,255,0.45)' }}>
          EVENTS:{' '}
          <span
            style={{
              color: CYAN,
              display: 'inline-block',
              animation: eventsFlashing ? 'value-flash 0.6s ease-out' : 'none',
            }}
          >
            {totalEvents.toLocaleString()}
          </span>
        </span>
        <span aria-hidden="true" style={{ width: '1px', height: '12px', background: CYAN_DIM }} />
        <span style={{ ...HUD, color: 'rgba(255,255,255,0.45)' }}>
          WAGERED:{' '}
          <span
            style={{
              color: '#FFD54F',
              display: 'inline-block',
              animation: amountFlashing ? 'value-flash-amber 0.6s ease-out' : 'none',
            }}
          >
            {wagered}
          </span>
        </span>
      </div>
      <a
        href={CLIENT_AREA_URL}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setCaHovered(true)}
        onMouseLeave={() => setCaHovered(false)}
        aria-label="Open client area in new tab"
        style={{
          ...HUD,
          display: 'inline-flex', alignItems: 'center', gap: '6px',
          padding: '5px 12px',
          minHeight: '36px',
          clipPath: BEVEL,
          color: CYAN,
          textDecoration: 'none',
          background: caHovered ? 'rgba(79,195,247,0.14)' : 'rgba(79,195,247,0.06)',
          border: `1px solid ${caHovered ? 'rgba(79,195,247,0.5)' : CYAN_DIM}`,
          boxShadow: caHovered ? '0 0 12px rgba(79,195,247,0.2)' : 'none',
          transition: 'background 0.2s, border-color 0.2s, box-shadow 0.2s',
          outline: 'none',
          flexShrink: 0,
          position: 'relative', zIndex: 2,
        }}
      >
        CLIENT AREA
        <ExternalLink style={{ width: '10px', height: '10px', flexShrink: 0 }} aria-hidden="true" />
      </a>
    </header>
  );
}

// ─── Content panel ────────────────────────────────────────────────────────────

interface ContentPanelProps {
  readonly panelId: PanelId;
  readonly side: 'left' | 'right';
  readonly onClose: () => void;
  readonly children: React.ReactNode;
}

function PanelSpinner() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px', color: CYAN }}>
      <div style={{ width: '24px', height: '24px', border: `2px solid ${CYAN_DIM}`, borderTopColor: CYAN, borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
    </div>
  );
}

function ContentPanel({ panelId, side, onClose, children }: ContentPanelProps) {
  const isLeft = side === 'left';

  return (
    <motion.aside
      key={panelId}
      initial={{ x: isLeft ? '-100%' : '100%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: isLeft ? '-100%' : '100%', opacity: 0 }}
      transition={{ type: 'spring', stiffness: 350, damping: 35 }}
      aria-label={`${panelId} panel`}
      style={{
        position: 'fixed',
        top: '40px',
        bottom: '48px',
        [isLeft ? 'left' : 'right']: 0,
        width: 'clamp(320px, 45vw, 680px)',
        ...PANEL_3D,
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: `1px solid ${CYAN_DIM}`,
        borderTop: 'none',
        borderBottom: 'none',
        [isLeft ? 'borderLeft' : 'borderRight']: 'none',
        clipPath: isLeft
          ? 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 0 100%)'
          : 'polygon(0 0, 100% 0, 100% 100%, 16px 100%, 0 calc(100% - 16px))',
        zIndex: 40,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        pointerEvents: 'auto',
      }}
    >
      {/* Celestial body — unique planet per panel, peeks from outside edge */}
      <PanelPlanet panelId={panelId} isLeft={isLeft} />

      {/* Scanline overlay */}
      <div aria-hidden="true" style={SCANLINE_STYLE} />

      {/* HUD corner brackets — laser-draw animation on mount */}
      <HudCorners size={18} thickness={2} />

      {/* Scrolling scan sweep — horizontal beam top-to-bottom every 6s */}
      <ScanSweep />

      {/* Holographic noise overlay — feTurbulence at 4% opacity */}
      <HoloNoise />

      {/* Panel header */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '12px 16px 10px',
        borderBottom: `1px solid ${CYAN_DIM}`,
        flexShrink: 0,
        position: 'relative', zIndex: 6,
      }}>
        <span style={{ ...HUD, color: CYAN, fontSize: '11px' }}>
          {panelId.toUpperCase()} CONSOLE
        </span>
        <button
          onClick={onClose}
          aria-label={`Close ${panelId} panel`}
          style={{
            background: 'none', border: `1px solid ${CYAN_DIM}`, color: 'rgba(255,255,255,0.5)',
            width: '36px', height: '36px', cursor: 'pointer', outline: 'none', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))',
            transition: 'color 0.2s, border-color 0.2s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = CYAN; e.currentTarget.style.borderColor = CYAN; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; e.currentTarget.style.borderColor = CYAN_DIM; }}
        >
          <X size={12} aria-hidden="true" />
        </button>
      </div>

      {/* Scrollable content — panel-content class enables 3D stagger animation */}
      <div className="panel-content" style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', position: 'relative', zIndex: 6 }}>
        {children}
      </div>
    </motion.aside>
  );
}

// ─── Bottom command bar ───────────────────────────────────────────────────────

interface CommandBarProps {
  readonly activePanel: PanelId;
  readonly onActivate: (id: PanelId) => void;
}

const CMD_BUTTONS: readonly { label: string; panelId: PanelId }[] = [
  { label: 'Games', panelId: 'games' }, { label: 'About', panelId: 'about' },
  { label: 'Team', panelId: 'team' }, { label: 'Journey', panelId: 'journey' },
  { label: 'Live Feed', panelId: 'live' }, { label: 'Careers', panelId: 'careers' },
  { label: 'Contact', panelId: 'contact' },
] as const;

function CommandBar({ activePanel, onActivate }: CommandBarProps) {
  return (
    <nav
      role="navigation"
      aria-label="Command bar"
      style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 50,
        height: '48px',
        ...BAR_3D,
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderTop: '1px solid rgba(79,195,247,0.15)',
        clipPath: 'polygon(8px 0, 100% 0, 100% 100%, 0 100%, 0 8px)',
        display: 'flex', alignItems: 'center',
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
        padding: '0 16px',
        gap: '8px',
        overflow: 'hidden',
      }}
    >
      <div aria-hidden="true" style={SCANLINE_STYLE} />

      {/* Nav buttons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flex: 1, position: 'relative', zIndex: 2, overflowX: 'auto' }}>
        {CMD_BUTTONS.map(({ label, panelId }) => (
          <CommandButton
            key={panelId}
            label={label}
            panelId={panelId}
            active={activePanel === panelId}
            onClick={onActivate}
          />
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0, position: 'relative', zIndex: 2 }}>
        <span aria-hidden="true" style={{ width: '1px', height: '20px', background: CYAN_DIM }} />
        <span style={{ ...HUD, fontSize: '9px', color: 'rgba(255,255,255,0.25)', whiteSpace: 'nowrap' }}>&copy; 2026 Gladiator Studio &middot; A MetaWin Company</span>
        <a href="#" style={{ ...HUD, fontSize: '9px', color: 'rgba(255,255,255,0.2)', textDecoration: 'underline', textUnderlineOffset: '2px', whiteSpace: 'nowrap', outline: 'none' }}>Resp. Gaming</a>
      </div>
    </nav>
  );
}

// ─── App root ─────────────────────────────────────────────────────────────────

export function App() {
  const { verified, verify, reject, showGate } = useAgeGate();
  const [introComplete, setIntroComplete] = useState(false);
  const [gameData, setGameData] = useState<GameData | null>(null);
  const [activePanel, setActivePanel] = useState<PanelId>('none');
  const [playingGame, setPlayingGame] = useState<{ title: string; link: string } | null>(null);

  const { isConnected, totalAmount, gladiatorCount, originalCount } = useFeederSocket();
  const totalEvents = gladiatorCount + originalCount;

  useEffect(() => {
    fetchGameData().then(setGameData);
  }, []);

  // Listen for game play events from GameCard
  useEffect(() => {
    const handler = (e: CustomEvent<{ title: string; link: string }>) => {
      sceneEvents.emitBlackhole(true);
      // Wait for blackhole to fully complete before showing iframe
      setTimeout(() => setPlayingGame(e.detail), 1800);
    };
    window.addEventListener('play-game' as string, handler as EventListener);
    return () => window.removeEventListener('play-game' as string, handler as EventListener);
  }, []);

  // Listen for panel open events from Hero buttons
  useEffect(() => {
    const handler = (e: CustomEvent<string>) => {
      setActivePanel(e.detail as PanelId);
    };
    window.addEventListener('open-panel' as string, handler as EventListener);
    return () => window.removeEventListener('open-panel' as string, handler as EventListener);
  }, []);

  const handleActivate = useCallback((id: PanelId) => {
    setActivePanel(prev => (prev === id ? 'none' : id));
  }, []);

  const handleClose = useCallback(() => setActivePanel('none'), []);

  // Fly 3D camera to the celestial body associated with the active panel
  useEffect(() => {
    sceneEvents.emitCameraTarget({ panelId: activePanel });
  }, [activePanel]);

  const activeSide: 'left' | 'right' = LEFT_PANELS.includes(activePanel) ? 'left' : 'right';

  // Age gate — blocks everything until verified
  if (!verified) {
    return <AgeGate onVerify={verify} onReject={reject} rejected={!showGate} />;
  }

  // Warp intro — plays once after age gate is passed, before main HUD appears
  if (!introComplete) {
    return <WarpIntro onComplete={() => setIntroComplete(true)} />;
  }

  return (
    <div
      style={{ position: 'fixed', inset: 0, overflow: 'hidden', background: '#0D0D0D' }}
      aria-label="Gladiator Studio command center"
    >
      {/* Global keyframe styles */}
      <style>{`
        @keyframes pulse { 0%,100% { opacity:1 } 50% { opacity:0.4 } }
        @keyframes spin { to { transform: rotate(360deg) } }

        /* Effect 2: HUD corner bracket laser-draw */
        @keyframes hud-draw { to { stroke-dashoffset: 0; } }

        /* Effect 3: Scan sweep — beam travels from -15% to 115% of panel height */
        @keyframes scan-sweep {
          0%   { transform: translateY(-15%) }
          100% { transform: translateY(115%) }
        }

        /* Effect 5: Holographic noise flicker — position jitter at steps(4) */
        @keyframes holo-flicker {
          0%   { transform: translate(0px,  0px)  }
          25%  { transform: translate(-1px, 1px)  }
          50%  { transform: translate(1px,  -1px) }
          75%  { transform: translate(-1px, -1px) }
          100% { transform: translate(1px,  1px)  }
        }

        /* Effect 4: Status bar value flash — cyan */
        @keyframes value-flash {
          0%   { transform: scale(1);    filter: drop-shadow(0 0 0px  rgba(79,195,247,0));   }
          25%  { transform: scale(1.15); filter: drop-shadow(0 0 8px  rgba(79,195,247,0.9)); }
          60%  { transform: scale(1.08); filter: drop-shadow(0 0 5px  rgba(79,195,247,0.55)); }
          100% { transform: scale(1);    filter: drop-shadow(0 0 0px  rgba(79,195,247,0));   }
        }

        /* Effect 4: Status bar value flash — amber */
        @keyframes value-flash-amber {
          0%   { transform: scale(1);    filter: drop-shadow(0 0 0px  rgba(255,213,79,0));   }
          25%  { transform: scale(1.15); filter: drop-shadow(0 0 8px  rgba(255,213,79,0.9)); }
          60%  { transform: scale(1.08); filter: drop-shadow(0 0 5px  rgba(255,213,79,0.55)); }
          100% { transform: scale(1);    filter: drop-shadow(0 0 0px  rgba(255,213,79,0));   }
        }

        /* ── HOLOGRAM BOOT SEQUENCE ── */

        /* Panel content: hologram digitize-in with scan reveal */
        .panel-content {
          position: relative;
        }
        .panel-content::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent 0%, #4fc3f7 30%, #ffffff 50%, #4fc3f7 70%, transparent 100%);
          box-shadow: 0 0 15px #4fc3f7, 0 0 30px rgba(79,195,247,0.4);
          z-index: 100;
          animation: holo-scan 0.8s ease-out forwards;
          pointer-events: none;
        }
        @keyframes holo-scan {
          0%   { top: 0; opacity: 1; }
          80%  { opacity: 0.6; }
          100% { top: 100%; opacity: 0; }
        }

        /* Children: start invisible, revealed by scan line */
        .panel-content > * {
          animation: holo-materialize 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        @keyframes holo-materialize {
          0%   { opacity: 0; transform: translateY(8px); filter: blur(4px) brightness(2); }
          30%  { opacity: 0.7; filter: blur(1px) brightness(1.5); }
          50%  { opacity: 1; filter: blur(0) brightness(1.2); }
          70%  { opacity: 0.85; filter: brightness(1); }
          80%  { opacity: 1; }
          100% { opacity: 1; transform: translateY(0); filter: blur(0) brightness(1); }
        }
        .panel-content > *:nth-child(1) { animation-delay: 0.08s; }
        .panel-content > *:nth-child(2) { animation-delay: 0.14s; }
        .panel-content > *:nth-child(3) { animation-delay: 0.20s; }
        .panel-content > *:nth-child(4) { animation-delay: 0.26s; }
        .panel-content > *:nth-child(5) { animation-delay: 0.32s; }
        .panel-content > *:nth-child(6) { animation-delay: 0.38s; }
        .panel-content > *:nth-child(7) { animation-delay: 0.44s; }
        .panel-content > *:nth-child(n+8) { animation-delay: 0.50s; }

        /* Hologram flicker — entire panel content flickers on open */
        .panel-content {
          animation: holo-flicker-in 0.4s steps(6) forwards;
        }
        @keyframes holo-flicker-in {
          0%   { opacity: 0; }
          15%  { opacity: 0.7; }
          30%  { opacity: 0.3; }
          45%  { opacity: 0.9; }
          60%  { opacity: 0.5; }
          80%  { opacity: 0.95; }
          100% { opacity: 1; }
        }

        /* RGB chromatic aberration on panel entry */
        .panel-content > *:nth-child(1) {
          text-shadow: -1px 0 rgba(255,0,0,0.15), 1px 0 rgba(0,100,255,0.15);
          animation: holo-materialize 0.6s cubic-bezier(0.16,1,0.3,1) both, holo-aberration 0.5s ease-out forwards;
        }
        @keyframes holo-aberration {
          0%   { text-shadow: -3px 0 rgba(255,0,0,0.4), 3px 0 rgba(0,150,255,0.4); }
          40%  { text-shadow: -1px 0 rgba(255,0,0,0.2), 1px 0 rgba(0,150,255,0.2); }
          100% { text-shadow: 0 0 transparent, 0 0 transparent; }
        }

        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(79,195,247,0.25); border-radius: 2px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(79,195,247,0.45); }
      `}</style>

      {/* 3D scene — always visible behind everything */}
      <StarfieldCanvas />

      {/* Hero floats over 3D scene — centers in non-panel space */}
      <div
        style={{
          position: 'absolute',
          top: '40px',
          bottom: '48px',
          left: activePanel !== 'none' && activeSide === 'left' ? 'clamp(320px, 45vw, 680px)' : '0',
          right: activePanel !== 'none' && activeSide === 'right' ? 'clamp(320px, 45vw, 680px)' : '0',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 10,
          pointerEvents: 'auto',
          opacity: activePanel !== 'none' ? 0.15 : 1,
          cursor: activePanel !== 'none' ? 'pointer' : 'default',
          transition: 'opacity 0.5s ease, left 0.5s ease, right 0.5s ease',
        }}
        aria-hidden={activePanel !== 'none'}
        onClick={activePanel !== 'none' ? handleClose : undefined}
        role={activePanel !== 'none' ? 'button' : undefined}
        tabIndex={activePanel !== 'none' ? 0 : undefined}
      >
        <Hero />
      </div>

      {/* Top HUD */}
      <StatusBar isConnected={isConnected} totalEvents={totalEvents} totalAmount={totalAmount} />

      {/* Sliding content panels */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 40 }}>
        <AnimatePresence mode="wait">
          {activePanel !== 'none' && (
            <ContentPanel key={activePanel} panelId={activePanel} side={activeSide} onClose={handleClose}>
              <ErrorBoundary>
                <Suspense fallback={<PanelSpinner />}>
                  {activePanel === 'games' && (
                    <GameShowcase
                      slotGames={gameData?.slotGames ?? []}
                      miniGames={gameData?.miniGames ?? []}
                      loading={gameData === null}
                    />
                  )}
                  {activePanel === 'about' && <AboutSection />}
                  {activePanel === 'team' && <TeamSection />}
                  {activePanel === 'journey' && <JourneySection />}
                  {activePanel === 'live' && <LiveActivityFeed />}
                  {activePanel === 'careers' && <CareersSection />}
                  {activePanel === 'contact' && <ContactSection />}
                </Suspense>
              </ErrorBoundary>
            </ContentPanel>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom command bar */}
      <CommandBar activePanel={activePanel} onActivate={handleActivate} />

      {/* Game iframe overlay — animated entry + fullscreen support */}
      <AnimatePresence>
        {playingGame && (
          <motion.div
            key="game-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed', inset: 0, zIndex: 10000,
              background: 'rgba(0,0,0,0.92)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
            onClick={() => { sceneEvents.emitBlackhole(false); setPlayingGame(null); }}
          >
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              style={{
                width: '90vw', maxWidth: 1400, aspectRatio: '16/9',
                ...PANEL_3D,
                border: '1px solid rgba(79,195,247,0.4)',
                clipPath: BEVEL,
                overflow: 'hidden',
                display: 'flex', flexDirection: 'column',
              }}
              data-game-container=""
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              {/* Title bar */}
              <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '8px 16px',
                borderBottom: '1px solid rgba(79,195,247,0.25)',
                ...BAR_3D,
                flexShrink: 0,
              }}>
                <span style={{ ...HUD, color: CYAN, fontSize: '11px' }}>
                  ▸ {playingGame.title.toUpperCase()}
                </span>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {/* Fullscreen button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      const container = e.currentTarget.closest('[data-game-container]') as HTMLElement | null;
                      if (container) {
                        if (document.fullscreenElement) {
                          document.exitFullscreen();
                        } else {
                          container.requestFullscreen();
                        }
                      }
                    }}
                    style={{
                      ...HUD, color: CYAN, fontSize: '10px',
                      ...BTN_3D,
                      padding: '5px 14px', cursor: 'pointer',
                      clipPath: 'polygon(0 0,calc(100% - 6px) 0,100% 6px,100% 100%,6px 100%,0 calc(100% - 6px))',
                    }}
                  >
                    ⛶ FULLSCREEN
                  </button>
                  {/* Close button */}
                  <button
                    onClick={() => { sceneEvents.emitBlackhole(false); setPlayingGame(null); }}
                    style={{
                      ...HUD, color: CYAN, fontSize: '10px',
                      ...BTN_3D,
                      padding: '5px 14px', cursor: 'pointer',
                      clipPath: 'polygon(0 0,calc(100% - 6px) 0,100% 6px,100% 100%,6px 100%,0 calc(100% - 6px))',
                    }}
                  >
                    ✕ CLOSE
                  </button>
                </div>
              </div>
              {/* Game iframe */}
              <iframe
                src={playingGame.link}
                title={playingGame.title}
                data-game-container=""
                style={{ flex: 1, border: 'none', width: '100%', background: '#000' }}
                allow="fullscreen; autoplay"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
