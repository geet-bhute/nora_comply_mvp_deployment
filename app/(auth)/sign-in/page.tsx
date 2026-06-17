'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const DEMO_USERS: Record<string, { name: string; initials: string; company: string }> = {
  'admin@northgate.com': { name: 'User', initials: 'U', company: 'Northgate Recruitment' },
  'demo@noracomply.com': { name: 'Demo User', initials: 'DU', company: 'Demo Workspace' },
}
const DEMO_PASSWORD = 'comply2026'

export default function SignInPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    await new Promise(r => setTimeout(r, 600))

    const user = DEMO_USERS[email.toLowerCase().trim()]
    if (!user || password !== DEMO_PASSWORD) {
      setError('Invalid email or password. Try the demo credentials below.')
      setLoading(false)
      return
    }

    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toUTCString()
    document.cookie = `nora_session=${encodeURIComponent(JSON.stringify({ email: email.toLowerCase().trim(), ...user }))}; path=/; expires=${expires}; SameSite=Lax`
    router.push('/dashboard')
  }

  function fillDemo() {
    setEmail('admin@northgate.com')
    setPassword(DEMO_PASSWORD)
    setError('')
  }

  return (
    <div style={S.shell}>
      {/* Left panel */}
      <div style={S.left}>
        <Link href="/" style={S.brand}>
          <div style={S.mark}><img src="/logo.png" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} /></div>
          <span style={S.brandName}>Nora Comply</span>
        </Link>
        <div style={S.leftBody}>
          <h2 style={S.headline}>Stay ahead of the EU AI Act</h2>
          <ul style={S.perks}>
            {PERKS.map(p => (
              <li key={p} style={S.perkItem}>
                <span style={S.check}>✓</span>
                {p}
              </li>
            ))}
          </ul>
        </div>
        <p style={S.footnote}>Regulation (EU) 2024/1689 · Deployer compliance workspace</p>
      </div>

      {/* Right panel */}
      <div style={S.right}>
        <div style={S.formWrap}>
          <h1 style={S.title}>Welcome back</h1>
          <p style={S.sub}>Sign in to your compliance workspace</p>

          <form onSubmit={handleSubmit} style={S.form}>
            <div style={S.field}>
              <label htmlFor="email" style={S.label}>Email address</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@company.com"
                required
                autoComplete="email"
                style={S.input}
                onFocus={e => { e.currentTarget.style.borderColor = '#2F5FD0'; e.currentTarget.style.boxShadow = '0 0 0 3px #E4ECFB'; }}
                onBlur={e => { e.currentTarget.style.borderColor = '#D1DCF5'; e.currentTarget.style.boxShadow = 'none'; }}
              />
            </div>
            <div style={S.field}>
              <label htmlFor="password" style={S.label}>Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                autoComplete="current-password"
                style={S.input}
                onFocus={e => { e.currentTarget.style.borderColor = '#2F5FD0'; e.currentTarget.style.boxShadow = '0 0 0 3px #E4ECFB'; }}
                onBlur={e => { e.currentTarget.style.borderColor = '#D1DCF5'; e.currentTarget.style.boxShadow = 'none'; }}
              />
            </div>

            {error && (
              <div style={S.error}>⚠️ {error}</div>
            )}

            <button type="submit" style={{ ...S.submitBtn, opacity: loading ? 0.6 : 1, cursor: loading ? 'not-allowed' : 'pointer' }} disabled={loading}>
              {loading ? 'Signing in…' : 'Sign in'}
            </button>
          </form>

          {/* Demo credentials */}
          <div style={S.demo}>
            <p style={S.demoLabel}>Demo access</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 14 }}>
              {[['Email', 'admin@northgate.com'], ['Password', DEMO_PASSWORD]].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={S.demoKey}>{k}</span>
                  <code style={S.code}>{v}</code>
                </div>
              ))}
            </div>
            <button onClick={fillDemo} type="button" style={S.fillBtn}>
              Fill demo credentials
            </button>
          </div>

          <p style={{ fontSize: 13, textAlign: 'center' }}>
            <Link href="/" style={{ color: '#2F5FD0', fontWeight: 600 }}>← Back to home</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

const PERKS = [
  'Map every AI tool to its EU AI Act obligations',
  'Track compliance progress with a structured checklist',
  'Ask Nora, your AI Act expert assistant',
  'Evidence library for audit-ready documentation',
  'Alerts for deadlines and regulatory updates',
  'Escalate to legal counsel when it matters',
]

const S: Record<string, React.CSSProperties> = {
  shell: { display: 'flex', minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif' },
  left: { width: 420, flexShrink: 0, background: '#16244A', padding: '36px 40px', display: 'flex', flexDirection: 'column', color: '#C5D2EC' },
  brand: { display: 'flex', alignItems: 'center', gap: 11, textDecoration: 'none', marginBottom: 'auto' },
  mark: { width: 36, height: 36, borderRadius: 10, overflow: 'hidden', flexShrink: 0, boxShadow: '0 0 0 1px rgba(111,212,220,.4), 0 4px 14px rgba(0,0,0,.3)', background: 'linear-gradient(150deg, #00c6bd, #16244A)', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  brandName: { fontWeight: 800, fontSize: 19, color: '#fff', letterSpacing: '-.02em' },
  leftBody: { flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '40px 0' },
  headline: { fontFamily: 'Georgia, serif', fontWeight: 600, fontSize: 28, color: '#fff', marginBottom: 24, lineHeight: 1.2 },
  perks: { listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 16, padding: 0, margin: 0 },
  perkItem: { display: 'flex', gap: 12, fontSize: 14.5, color: '#A8BEDF', alignItems: 'flex-start' },
  check: { width: 22, height: 22, borderRadius: '50%', background: 'rgba(47,95,208,.25)', color: '#7aabff', display: 'grid', placeItems: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0, marginTop: 1 },
  footnote: { fontSize: 11, color: '#4A6090', marginTop: 'auto' },
  right: { flex: 1, background: '#EEF2FB', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 28px' },
  formWrap: { width: '100%', maxWidth: 400 },
  title: { fontFamily: 'Georgia, serif', fontWeight: 700, fontSize: 26, color: '#15213A', marginBottom: 6 },
  sub: { fontSize: 14, color: '#4A5B7A', marginBottom: 28 },
  form: { background: '#fff', border: '1px solid #D1DCF5', borderRadius: 14, padding: 24, boxShadow: '0 6px 16px -10px rgba(15,30,80,.20)', marginBottom: 16 },
  field: { marginBottom: 16 },
  label: { display: 'block', fontSize: 11, letterSpacing: '.5px', textTransform: 'uppercase' as const, color: '#2F5FD0', fontWeight: 600, marginBottom: 6 },
  input: { width: '100%', border: '1.5px solid #D1DCF5', borderRadius: 9, padding: '10px 12px', fontSize: 14, color: '#15213A', background: '#EEF2FB', outline: 'none', transition: 'border-color .15s, box-shadow .15s', boxSizing: 'border-box' as const },
  error: { background: '#fbe8e8', color: '#b33a2e', borderRadius: 8, padding: '10px 13px', fontSize: 13, fontWeight: 500, marginBottom: 14 },
  submitBtn: { width: '100%', background: '#2F5FD0', color: '#fff', border: 'none', borderRadius: 9, padding: '11px', fontSize: 14.5, fontWeight: 700, fontFamily: 'inherit', transition: '.15s' },
  demo: { background: '#fff', border: '1px solid #D1DCF5', borderRadius: 14, padding: '18px 20px', boxShadow: '0 6px 16px -10px rgba(15,30,80,.20)', marginBottom: 16 },
  demoLabel: { fontSize: 10.5, letterSpacing: '.6px', textTransform: 'uppercase' as const, color: '#2F5FD0', fontWeight: 700, marginBottom: 12 },
  demoKey: { fontSize: 11, letterSpacing: '.4px', textTransform: 'uppercase' as const, color: '#7E92BE', fontWeight: 600, width: 60, flexShrink: 0 },
  code: { fontSize: 13, color: '#15213A', background: '#EEF2FB', padding: '3px 8px', borderRadius: 6 },
  fillBtn: { width: '100%', background: 'transparent', border: '1px solid #D1DCF5', borderRadius: 9, padding: '8px', fontSize: 13, fontWeight: 600, color: '#15213A', cursor: 'pointer', fontFamily: 'inherit' },
}
