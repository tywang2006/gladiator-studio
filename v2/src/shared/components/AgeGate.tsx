import { useState, useCallback } from 'react';

const MONO = "'SF Mono','Menlo','Consolas',monospace";
const CYAN = '#4fc3f7';
const BEVEL = 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))';
const STORAGE_KEY = 'gladiator_age_verified';

export function useAgeGate(): { verified: boolean; verify: () => void; reject: () => void; showGate: boolean } {
  const [verified, setVerified] = useState(() => {
    try { return sessionStorage.getItem(STORAGE_KEY) === '1'; } catch { return false; }
  });
  const [rejected, setRejected] = useState(false);

  const verify = useCallback(() => {
    try { sessionStorage.setItem(STORAGE_KEY, '1'); } catch { /* noop */ }
    setVerified(true);
  }, []);

  const reject = useCallback(() => { setRejected(true); }, []);

  return { verified, verify, reject, showGate: !verified && !rejected };
}

interface AgeGateProps {
  readonly onVerify: () => void;
  readonly onReject: () => void;
  readonly rejected: boolean;
}

export function AgeGate({ onVerify, onReject, rejected }: AgeGateProps) {
  const [hoverYes, setHoverYes] = useState(false);
  const [hoverNo, setHoverNo] = useState(false);

  if (rejected) {
    return (
      <div style={{
        position: 'fixed', inset: 0, zIndex: 99999,
        background: '#0a0a0f',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: MONO,
      }}>
        <div style={{ textAlign: 'center', maxWidth: 400 }}>
          <div style={{ fontSize: 48, marginBottom: 20 }}>🚫</div>
          <h2 style={{ color: '#ef5350', fontSize: 18, letterSpacing: '2px', margin: '0 0 16px' }}>
            ACCESS DENIED
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, lineHeight: 1.6 }}>
            You must be 18 years or older to access this website.
            Please close this browser tab.
          </p>
          <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 10, marginTop: 20 }}>
            If you or someone you know has a gambling problem, visit{' '}
            <a href="https://www.begambleaware.org" target="_blank" rel="noopener noreferrer" style={{ color: CYAN, textDecoration: 'underline' }}>
              BeGambleAware.org
            </a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 99999,
      background: 'rgba(0,0,0,0.95)',
      backdropFilter: 'blur(20px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: MONO,
    }}>
      <div style={{
        background: 'rgba(8,12,24,0.95)',
        border: '1px solid rgba(79,195,247,0.3)',
        clipPath: BEVEL,
        padding: '40px 48px',
        maxWidth: 440,
        width: '90vw',
        textAlign: 'center',
        boxShadow: '0 0 60px rgba(79,195,247,0.1)',
      }}>
        {/* Logo */}
        <img
          src="/gladiator-hero.jpg"
          alt="Gladiator Studio"
          style={{
            width: 200,
            margin: '0 auto 24px',
            display: 'block',
            mixBlendMode: 'lighten',
            filter: 'brightness(1.1)',
          }}
        />

        {/* 18+ badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          width: 56, height: 56, borderRadius: '50%',
          border: `2px solid ${CYAN}`,
          color: CYAN, fontSize: 20, fontWeight: 900,
          margin: '0 auto 20px',
          boxShadow: `0 0 15px rgba(79,195,247,0.3)`,
        }}>
          18+
        </div>

        <h2 style={{
          color: '#fff', fontSize: 16, letterSpacing: '3px',
          textTransform: 'uppercase', margin: '0 0 12px',
        }}>
          AGE VERIFICATION
        </h2>

        <p style={{
          color: 'rgba(255,255,255,0.5)', fontSize: 11, lineHeight: 1.7,
          margin: '0 0 28px',
        }}>
          This website contains content related to gambling and is intended for users aged 18 and over.
          By entering, you confirm you meet the minimum age requirement in your jurisdiction.
        </p>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: 12 }}>
          <button
            onClick={onVerify}
            onMouseEnter={() => setHoverYes(true)}
            onMouseLeave={() => setHoverYes(false)}
            style={{
              flex: 1, padding: '12px 20px',
              clipPath: BEVEL,
              background: hoverYes ? 'rgba(79,195,247,0.2)' : 'rgba(79,195,247,0.1)',
              border: `1px solid ${hoverYes ? 'rgba(79,195,247,0.6)' : 'rgba(79,195,247,0.3)'}`,
              color: CYAN, fontSize: 11, fontWeight: 700,
              letterSpacing: '2px', textTransform: 'uppercase',
              cursor: 'pointer', fontFamily: MONO,
              boxShadow: hoverYes ? '0 0 20px rgba(79,195,247,0.2)' : 'none',
              transition: 'all 0.2s',
            }}
          >
            I AM 18+
          </button>
          <button
            onClick={onReject}
            onMouseEnter={() => setHoverNo(true)}
            onMouseLeave={() => setHoverNo(false)}
            style={{
              flex: 1, padding: '12px 20px',
              clipPath: BEVEL,
              background: hoverNo ? 'rgba(239,83,80,0.15)' : 'transparent',
              border: `1px solid ${hoverNo ? 'rgba(239,83,80,0.5)' : 'rgba(255,255,255,0.15)'}`,
              color: hoverNo ? '#ef5350' : 'rgba(255,255,255,0.4)',
              fontSize: 11, fontWeight: 700,
              letterSpacing: '2px', textTransform: 'uppercase',
              cursor: 'pointer', fontFamily: MONO,
              transition: 'all 0.2s',
            }}
          >
            UNDER 18
          </button>
        </div>

        {/* Responsible gaming */}
        <p style={{
          color: 'rgba(255,255,255,0.25)', fontSize: 9, marginTop: 20,
          letterSpacing: '0.5px',
        }}>
          Gambling can be addictive. Play responsibly.{' '}
          <a href="https://www.begambleaware.org" target="_blank" rel="noopener noreferrer"
            style={{ color: 'rgba(79,195,247,0.5)', textDecoration: 'underline' }}>
            BeGambleAware.org
          </a>
        </p>
      </div>
    </div>
  );
}
