import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SectionWrapper } from '@/shared/components/SectionWrapper';
import { CONTACT } from '@/shared/constants/urls';

// ---------------------------------------------------------------------------
// Types & constants
// ---------------------------------------------------------------------------

type EnquiryType = '' | 'Game Integration' | 'Request a Demo' | 'Distribution Partnership' | 'Press and Media' | 'Careers' | 'Other';
interface FormFields { readonly name: string; readonly email: string; readonly enquiryType: EnquiryType; readonly message: string; }
interface FormErrors { readonly name?: string; readonly email?: string; readonly enquiryType?: string; readonly message?: string; }
type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error';

const ENQUIRY_OPTIONS: readonly EnquiryType[] = ['Game Integration', 'Request a Demo', 'Distribution Partnership', 'Press and Media', 'Careers', 'Other'] as const;
const INITIAL_FORM: FormFields = { name: '', email: '', enquiryType: '', message: '' };
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

const DIRECT_CHANNELS = [
  { sym: '✉', label: 'EMAIL', value: CONTACT.email },
  { sym: '☎', label: 'PHONE', value: CONTACT.phone },
  { sym: '📍', label: 'LOCATION', value: CONTACT.location },
  { sym: '⏱', label: 'RESPONSE', value: '<1 business day' },
] as const;

function validate(f: FormFields): FormErrors {
  const e: Record<string, string> = {};
  if (!f.name.trim()) e.name = 'Name required.';
  if (!f.email.trim()) e.email = 'Email required.';
  else if (!EMAIL_PATTERN.test(f.email)) e.email = 'Invalid email.';
  if (!f.enquiryType) e.enquiryType = 'Select type.';
  if (!f.message.trim()) e.message = 'Message required.';
  return e as FormErrors;
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function FieldError({ msg }: { readonly msg: string | undefined }) {
  if (!msg) return null;
  return <span role="alert" style={{ ...MONO, color: '#f87171', fontSize: '10px', marginTop: '3px', display: 'block' }}>{msg}</span>;
}

const INPUT_STYLE: React.CSSProperties = {
  ...MONO, width: '100%', background: 'rgba(0,20,30,0.8)', border: '1px solid rgba(79,195,247,0.2)',
  color: '#e2e8f0', fontSize: '12px', padding: '10px 12px', minHeight: '44px', outline: 'none', boxSizing: 'border-box',
  clipPath: BEVEL,
  boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.4), 0 1px 0 rgba(79,195,247,0.08)',
};

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export function ContactSection() {
  const [fields, setFields] = useState<FormFields>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<SubmitStatus>('idle');

  function update<K extends keyof FormFields>(k: K, v: FormFields[K]) {
    setFields((p) => ({ ...p, [k]: v }));
    if (errors[k]) setErrors((p) => { const { [k]: _, ...rest } = p; return rest as FormErrors; });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const errs = validate(fields);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({}); setStatus('submitting');
    try {
      const fd = new FormData(e.currentTarget);
      const res = await fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams(fd as unknown as Record<string, string>).toString() });
      if (!res.ok) throw new Error(`Status ${res.status}`);
      setStatus('success'); setFields(INITIAL_FORM);
    } catch (err) {
      console.error('[ContactSection]', err); setStatus('error');
    }
  }

  const labelStyle: React.CSSProperties = { ...MONO, fontSize: '10px', color: CYAN, letterSpacing: '0.1em', display: 'block', marginBottom: '4px' };
  const fieldWrap: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: '10px' };

  return (
    <SectionWrapper id="contact">
      <div style={{ ...MONO, color: CYAN, fontSize: '11px', marginBottom: '6px' }}>// COMMS_TERMINAL</div>
      <div style={{ borderTop: `1px solid ${CYAN}`, borderBottom: `1px solid ${CYAN}`, padding: '4px 0', marginBottom: '16px' }}>
        <h2 style={{ ...MONO, fontSize: '16px', fontWeight: 700, color: '#f1f5f9', letterSpacing: '0.12em', margin: 0 }}>PARTNER WITH US</h2>
      </div>

      {/* Direct channels 2x2 grid */}
      <div style={{ marginBottom: '14px' }}>
        <div style={{ ...MONO, fontSize: '10px', color: 'rgba(79,195,247,0.6)', marginBottom: '6px' }}>┌─ DIRECT CHANNELS ─</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
          {DIRECT_CHANNELS.map((c) => (
            <div key={c.label} style={{ ...CARD_BG, clipPath: BEVEL, padding: '8px 10px' }}>
              <div style={{ ...MONO, fontSize: '10px', color: 'rgba(79,195,247,0.5)', marginBottom: '2px' }}>{c.sym} {c.label}</div>
              <div style={{ ...MONO, fontSize: '11px', color: '#cbd5e1', wordBreak: 'break-all' }}>{c.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Enquiry form */}
      <div>
        <div style={{ ...MONO, fontSize: '10px', color: 'rgba(79,195,247,0.6)', marginBottom: '6px' }}>┌─ SEND ENQUIRY ─</div>
        <div style={{ ...CARD_BG, clipPath: BEVEL, padding: '14px' }}>
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div key="ok" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                style={{ ...MONO, fontSize: '12px', color: CYAN, padding: '12px 0', textAlign: 'center' }}>
                TRANSMISSION RECEIVED — we will respond within 1 business day.
                <button onClick={() => { setStatus('idle'); setFields(INITIAL_FORM); }}
                  style={{ ...MONO, display: 'block', margin: '10px auto 0', fontSize: '11px', color: CYAN, background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>
                  Send another
                </button>
              </motion.div>
            ) : (
              <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                name="contact" method="POST" data-netlify="true" onSubmit={handleSubmit} noValidate>
                <input type="hidden" name="form-name" value="contact" />
                <div style={fieldWrap}>
                  <div><label style={labelStyle}>NAME *</label>
                    <input style={INPUT_STYLE} type="text" name="name" value={fields.name} onChange={(e) => update('name', e.target.value)} placeholder="Your full name" autoComplete="name" />
                    <FieldError msg={errors.name} /></div>
                  <div><label style={labelStyle}>EMAIL *</label>
                    <input style={INPUT_STYLE} type="email" name="email" value={fields.email} onChange={(e) => update('email', e.target.value)} placeholder="your@email.com" autoComplete="email" />
                    <FieldError msg={errors.email} /></div>
                  <div><label style={labelStyle}>TYPE *</label>
                    <select style={{ ...INPUT_STYLE, appearance: 'none' as const, cursor: 'pointer' }} name="enquiryType" value={fields.enquiryType}
                      onChange={(e) => update('enquiryType', e.target.value as EnquiryType)}>
                      <option value="" disabled style={{ background: '#080c18' }}>Select ▼</option>
                      {ENQUIRY_OPTIONS.map((o) => <option key={o} value={o} style={{ background: '#080c18' }}>{o}</option>)}
                    </select>
                    <FieldError msg={errors.enquiryType} /></div>
                  <div><label style={labelStyle}>MESSAGE *</label>
                    <textarea style={{ ...INPUT_STYLE, resize: 'none', minHeight: '72px' }} name="message" value={fields.message}
                      onChange={(e) => update('message', e.target.value)} placeholder="Tell us about your platform or what you need..." rows={4} />
                    <FieldError msg={errors.message} /></div>
                  {status === 'error' && <p role="alert" style={{ ...MONO, fontSize: '11px', color: '#f87171', margin: 0 }}>Transmission failed — email <a href={`mailto:${CONTACT.email}`} style={{ color: CYAN }}>{CONTACT.email}</a> directly.</p>}
                  <button type="submit" disabled={status === 'submitting'}
                    style={{ ...MONO, clipPath: BEVEL, background: status === 'submitting' ? 'rgba(79,195,247,0.3)' : CYAN, color: '#080c18', border: 'none', padding: '9px 20px', fontSize: '12px', fontWeight: 700, letterSpacing: '0.15em', cursor: status === 'submitting' ? 'not-allowed' : 'pointer', width: '100%', textTransform: 'uppercase' as const, boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.2), 0 2px 6px rgba(0,0,0,0.4)' }}>
                    {status === 'submitting' ? '▸ TRANSMITTING...' : '▸ TRANSMIT'}
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </SectionWrapper>
  );
}
