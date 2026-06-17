'use client';
import { useState } from 'react';

interface FormData {
  name: string;
  email: string;
  company: string;
  role: string;
  size: string;
  tools: string[];
  message: string;
}

type Status = 'idle' | 'loading' | 'success' | 'error';

const AI_TOOLS = [
  'Bullhorn',
  'Microsoft Copilot',
  'LinkedIn Recruiter',
  'ChatGPT',
  'Other ATS',
  'Not sure yet',
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function DemoForm() {
  const [form, setForm] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    role: '',
    size: '',
    tools: [],
    message: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, boolean>>>({});
  const [status, setStatus] = useState<Status>('idle');

  function set<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: false }));
  }

  function toggleTool(tool: string) {
    setForm((f) => ({
      ...f,
      tools: f.tools.includes(tool) ? f.tools.filter((t) => t !== tool) : [...f.tools, tool],
    }));
  }

  function validate(): boolean {
    const errs: typeof errors = {};
    if (!form.name.trim()) errs.name = true;
    if (!EMAIL_RE.test(form.email.trim())) errs.email = true;
    if (!form.company.trim()) errs.company = true;
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setStatus('loading');
    try {
      const res = await fetch('/api/demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('failed');
      setStatus('success');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="form-success show">
        <div className="badge-ok">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h2>Thanks, you&apos;re booked in</h2>
        <p>
          We&apos;ve received your request and the team will reach out within{' '}
          <b>one business day</b> to find a time.
        </p>
        <p>
          In the meantime, anything urgent? Email us at{' '}
          <a href="mailto:emily@noracomply.com" style={{ color: 'var(--teal)', fontWeight: 600 }}>
            emily@noracomply.com
          </a>{' '}
          or{' '}
          <a href="mailto:kathryn@noracomply.com" style={{ color: 'var(--teal)', fontWeight: 600 }}>
            kathryn@noracomply.com
          </a>
          .
        </p>
        <div className="recap">Request sent for {form.company}</div>
      </div>
    );
  }

  return (
    <form className="form-panel" onSubmit={handleSubmit} noValidate>
      <h2>Request your demo</h2>
      <p className="sub">We&apos;ll be in touch within one business day.</p>

      <div className="form-row">
        <div className={`field${errors.name ? ' err' : ''}`}>
          <label htmlFor="demo-name">Full name <span className="req">*</span></label>
          <input
            type="text" id="demo-name" name="name"
            placeholder="Jordan Walsh" autoComplete="name"
            value={form.name}
            onChange={(e) => set('name', e.target.value)}
          />
          <div className="msg">Please enter your name.</div>
        </div>
        <div className={`field${errors.email ? ' err' : ''}`}>
          <label htmlFor="demo-email">Work email <span className="req">*</span></label>
          <input
            type="email" id="demo-email" name="email"
            placeholder="jordan@firm.com" autoComplete="email"
            value={form.email}
            onChange={(e) => set('email', e.target.value)}
          />
          <div className="msg">Please enter a valid work email.</div>
        </div>
      </div>

      <div className="form-row">
        <div className={`field${errors.company ? ' err' : ''}`}>
          <label htmlFor="demo-company">Company <span className="req">*</span></label>
          <input
            type="text" id="demo-company" name="company"
            placeholder="Acme Recruitment" autoComplete="organization"
            value={form.company}
            onChange={(e) => set('company', e.target.value)}
          />
          <div className="msg">Please enter your company.</div>
        </div>
        <div className="field">
          <label htmlFor="demo-role">Your role</label>
          <input
            type="text" id="demo-role" name="role"
            placeholder="Compliance Officer"
            value={form.role}
            onChange={(e) => set('role', e.target.value)}
          />
          <div className="msg" />
        </div>
      </div>

      <div className="field full">
        <label htmlFor="demo-size">Company size</label>
        <select id="demo-size" name="size" value={form.size} onChange={(e) => set('size', e.target.value)}>
          <option value="">Select...</option>
          <option>1-10 people</option>
          <option>11-50 people</option>
          <option>51-200 people</option>
          <option>201-500 people</option>
          <option>500+ people</option>
        </select>
      </div>

      <div className="field full">
        <label>
          Which AI tools are you using?{' '}
          <span style={{ color: 'var(--ink-faint)', fontWeight: 500 }}>(optional)</span>
        </label>
        <div className="chips">
          {AI_TOOLS.map((tool) => (
            <span
              key={tool}
              className={`chip-opt${form.tools.includes(tool) ? ' on' : ''}`}
              onClick={() => toggleTool(tool)}
              role="checkbox"
              aria-checked={form.tools.includes(tool)}
              tabIndex={0}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') ? toggleTool(tool) : undefined}
            >
              {tool}
            </span>
          ))}
        </div>
      </div>

      <div className="field full">
        <label htmlFor="demo-message">Anything you&apos;d like us to prepare for?</label>
        <textarea
          id="demo-message" name="message"
          placeholder="e.g. We're racing to finish our internal AI policy before August and want to evidence compliance."
          value={form.message}
          onChange={(e) => set('message', e.target.value)}
        />
        <div className="msg" />
      </div>

      {status === 'error' && (
        <p className="form-error-msg">
          Something went wrong. Please try again or email us at{' '}
          <a href="mailto:emily@noracomply.com">emily@noracomply.com</a> or{' '}
          <a href="mailto:kathryn@noracomply.com">kathryn@noracomply.com</a>.
        </p>
      )}

      <div className="form-foot">
        <button type="submit" className="btn btn-primary btn-lg" disabled={status === 'loading'}>
          {status === 'loading' ? 'Sending...' : <span>Request demo <span className="arr">→</span></span>}
        </button>
        <span className="privacy">We&apos;ll only use your details to arrange the demo. No spam, ever.</span>
      </div>
    </form>
  );
}
