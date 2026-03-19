import { Github, Linkedin, Mail } from 'lucide-react';
import { SectionWrapper } from '@/shared/components/SectionWrapper';

const MONO = "'JetBrains Mono','Fira Code','Courier New',monospace";
const CYAN = '#4FC3F7';
const BORDER = 'rgba(79,195,247,0.18)';
const CARD_CLIP = 'polygon(0 0,calc(100% - 12px) 0,100% 12px,100% 100%,12px 100%,0 calc(100% - 12px))';

const LEAD = {
  initials: 'CW',
  name: 'CHAO WANG',
  role: 'CTO & Head of Game Dev',
  location: 'London, UK',
  company: 'MetaWin Group',
  experience: '10+ yrs',
  expertise: ['Game Arch', 'WebGL/Pixi', 'Dist. Sys', 'Cloud AWS', 'Crypto', 'Leadership'],
  missions: [
    'Architected MetaWin platform · $100M+ daily revenue',
    'Core contributor to Pixi.js open-source library',
    'Creator of the Chao2D rendering engine',
    'Shipped 8 ULTRA-vol Gladiator slot titles',
    'Dual-cloud AWS + GCP elite-tier infrastructure',
  ],
  social: {
    linkedin: 'https://www.linkedin.com/in/chaow/',
    email: 'cwang@metawin.inc',
    github: 'https://github.com/gladiator-studio',
  },
} as const;

function SocialBtn({ href, label, icon }: { readonly href: string; readonly label: string; readonly icon: React.ReactNode }) {
  const resolved = !href.startsWith('http') && href.includes('@') ? `mailto:${href}` : href;
  return (
    <a href={resolved} aria-label={label} target="_blank" rel="noopener noreferrer"
      style={{ display:'inline-flex', alignItems:'center', justifyContent:'center', width:30, height:30,
        border:'1px solid rgba(79,195,247,0.3)', background:'rgba(79,195,247,0.07)', color:CYAN,
        clipPath:'polygon(3px 0%,100% 0%,calc(100% - 3px) 100%,0% 100%)', textDecoration:'none' }}>
      {icon}
    </a>
  );
}

function CommandingOfficerCard() {
  return (
    <div role="article" aria-label={`Commanding Officer: ${LEAD.name}`}
      style={{ background:'linear-gradient(135deg, rgba(20,28,45,0.9) 0%, rgba(8,12,24,0.95) 50%, rgba(14,20,36,0.9) 100%)', borderTop:`1px solid rgba(79,195,247,0.2)`, borderLeft:`1px solid rgba(79,195,247,0.1)`, borderRight:`1px solid rgba(79,195,247,0.06)`, borderBottom:`1px solid rgba(0,0,0,0.4)`, boxShadow:`inset 0 1px 0 rgba(79,195,247,0.08), 0 4px 12px rgba(0,0,0,0.4)`, clipPath:CARD_CLIP,
        padding:16, display:'flex', flexDirection:'column', gap:14 }}>

      {/* Header label */}
      <div style={{ borderBottom:`1px solid ${BORDER}`, paddingBottom:8 }}>
        <span style={{ fontFamily:MONO, fontSize:10, color:'rgba(232,244,253,0.45)', letterSpacing:1.5 }}>
          ─ COMMANDING OFFICER ─────────────────
        </span>
      </div>

      {/* Identity */}
      <div style={{ display:'flex', alignItems:'center', gap:12 }}>
        {/* StarCraft-style hexagonal avatar */}
        <div aria-hidden="true" style={{ position:'relative', width:52, height:58, flexShrink:0 }}>
          {/* Hex border */}
          <div style={{
            width:52, height:58,
            clipPath:'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
            background: `linear-gradient(135deg, ${CYAN}, rgba(79,195,247,0.3))`,
            display:'flex', alignItems:'center', justifyContent:'center',
          }}>
            <div style={{
              width:48, height:54,
              clipPath:'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
              background:'rgba(8,12,24,0.95)',
              display:'flex', alignItems:'center', justifyContent:'center',
            }}>
              <span style={{ fontFamily:MONO, fontSize:16, fontWeight:900, color:CYAN, letterSpacing:2, textShadow:`0 0 8px ${CYAN}` }}>{LEAD.initials}</span>
            </div>
          </div>
          {/* Rank pip */}
          <div style={{
            position:'absolute', bottom:-2, right:-2,
            width:14, height:14, borderRadius:'50%',
            background:CYAN, border:'2px solid rgba(8,12,24,0.95)',
            boxShadow:`0 0 6px ${CYAN}`,
          }} />
        </div>
        <div>
          <div style={{ fontFamily:MONO, fontSize:16, fontWeight:700, color:'#E8F4FD', letterSpacing:1 }}>{LEAD.name}</div>
          <div style={{ fontFamily:MONO, fontSize:11, color:CYAN, marginTop:2 }}>{LEAD.role}</div>
          <div style={{ fontFamily:MONO, fontSize:10, color:'rgba(232,244,253,0.45)', marginTop:3 }}>
            {'>'} {LEAD.location} · {LEAD.experience} · {LEAD.company}
          </div>
        </div>
      </div>

      {/* Expertise */}
      <div>
        <div style={{ fontFamily:MONO, fontSize:10, color:'rgba(232,244,253,0.45)', letterSpacing:1.5, marginBottom:7 }}>
          // EXPERTISE
        </div>
        <div style={{ display:'flex', flexWrap:'wrap', gap:5 }}>
          {LEAD.expertise.map((tag) => (
            <span key={tag} style={{ fontFamily:MONO, fontSize:10, color:CYAN,
              background:'rgba(79,195,247,0.07)', border:`1px solid ${BORDER}`,
              padding:'3px 7px', clipPath:'polygon(4px 0%,100% 0%,calc(100% - 4px) 100%,0% 100%)',
              whiteSpace:'nowrap', letterSpacing:0.3 }}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div style={{ height:1, background:BORDER }} aria-hidden="true" />

      {/* Missions */}
      <div>
        <div style={{ fontFamily:MONO, fontSize:10, color:'rgba(232,244,253,0.45)', letterSpacing:1.5, marginBottom:8 }}>
          // KEY_MISSIONS
        </div>
        <ul role="list" style={{ listStyle:'none', margin:0, padding:0, display:'flex', flexDirection:'column', gap:6 }}>
          {LEAD.missions.map((m) => (
            <li key={m} style={{ display:'flex', gap:8 }}>
              <span style={{ color:CYAN, fontFamily:MONO, fontSize:11, flexShrink:0 }}>▸</span>
              <span style={{ fontFamily:MONO, fontSize:11, color:'rgba(232,244,253,0.72)', lineHeight:'17px' }}>{m}</span>
            </li>
          ))}
        </ul>
      </div>

      <div style={{ height:1, background:BORDER }} aria-hidden="true" />

      {/* Social */}
      <div style={{ display:'flex', gap:8, alignItems:'center' }}>
        <span style={{ fontFamily:MONO, fontSize:10, color:'rgba(232,244,253,0.45)', letterSpacing:1 }}>COMMS</span>
        <div style={{ display:'flex', gap:6 }}>
          <SocialBtn href={LEAD.social.linkedin} label="LinkedIn profile" icon={<Linkedin size={13} />} />
          <SocialBtn href={LEAD.social.email} label="Send email" icon={<Mail size={13} />} />
          <SocialBtn href={LEAD.social.github} label="GitHub organisation" icon={<Github size={13} />} />
        </div>
      </div>
    </div>
  );
}

function JoinCrewCard() {
  return (
    <div style={{ background:'linear-gradient(135deg, rgba(20,28,45,0.9) 0%, rgba(8,12,24,0.95) 50%, rgba(14,20,36,0.9) 100%)', borderTop:`1px solid rgba(79,195,247,0.2)`, borderLeft:`1px solid rgba(79,195,247,0.1)`, borderRight:`1px solid rgba(79,195,247,0.06)`, borderBottom:`1px solid rgba(0,0,0,0.4)`, boxShadow:`inset 0 1px 0 rgba(79,195,247,0.08), 0 4px 12px rgba(0,0,0,0.4)`,
      clipPath:'polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,10px 100%,0 calc(100% - 10px))',
      padding:'14px 16px', display:'flex', flexDirection:'column', gap:10 }}>
      <div style={{ borderBottom:`1px solid ${BORDER}`, paddingBottom:8 }}>
        <span style={{ fontFamily:MONO, fontSize:10, color:'rgba(232,244,253,0.45)', letterSpacing:1.5 }}>
          ─ JOIN THE CREW ──────────────────────
        </span>
      </div>
      <p style={{ fontFamily:MONO, fontSize:11, color:'rgba(232,244,253,0.72)', margin:0, lineHeight:'17px' }}>
        We hire senior talent across engineering, design, and product.
        Exceptional at what you do? We want to hear from you.
      </p>
      <a href="#careers" style={{ display:'inline-flex', alignItems:'center', gap:6,
        fontFamily:MONO, fontSize:11, fontWeight:700, color:CYAN,
        background:'rgba(79,195,247,0.12)', border:`1px solid rgba(79,195,247,0.3)`,
        padding:'7px 14px', textDecoration:'none',
        clipPath:'polygon(6px 0%,100% 0%,calc(100% - 6px) 100%,0% 100%)',
        letterSpacing:0.8, alignSelf:'flex-start',
        boxShadow:'inset 0 1px 0 rgba(79,195,247,0.15), 0 2px 6px rgba(0,0,0,0.4)' }}>
        VIEW POSITIONS →
      </a>
    </div>
  );
}

export function TeamSection() {
  return (
    <SectionWrapper id="team">
      <div style={{ maxWidth:520, margin:'0 auto' }}>
        {/* Manifest header */}
        <header style={{ marginBottom:24 }}>
          <div style={{ fontFamily:MONO, fontSize:10, color:'rgba(232,244,253,0.35)', letterSpacing:2, marginBottom:6 }}>
            // CREW_MANIFEST
          </div>
          <div style={{ height:1, background:BORDER, marginBottom:12 }} aria-hidden="true" />
          <span style={{ fontFamily:MONO, fontSize:10, color:CYAN, letterSpacing:2 }}>LEADERSHIP</span>
          <div style={{ height:1, background:BORDER, marginTop:12 }} aria-hidden="true" />
        </header>
        <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
          <CommandingOfficerCard />
          <JoinCrewCard />
        </div>
      </div>
    </SectionWrapper>
  );
}
