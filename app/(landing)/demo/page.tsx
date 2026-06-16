import Link from 'next/link';
import { Footer } from '@/components/landing/Footer';
import { DemoForm } from '@/components/landing/DemoForm';

export const metadata = {
  title: 'Book a demo — Nora Comply',
  description: 'See your AI systems mapped to the EU AI Act in 30 minutes.',
};

export default function DemoPage() {
  return (
    <>
      <header className="site-head on-dark">
        <div className="wrap nav">
          <Link className="brand on-dark" href="/">
            <span className="mark">
              <img src="/logo.png" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', borderRadius: 8 }} />
            </span>
            Nora Comply
          </Link>
          <nav className="nav-links">
            <a href="/#product">Product</a>
            <a href="/#who">Who it&apos;s for</a>
            <a href="/#eu-act">EU AI Act</a>
          </nav>
          <div className="nav-cta">
            <Link className="btn btn-ghost on-dark" href="/sign-in">Sign in</Link>
            <Link className="btn btn-ghost on-dark" href="/">Back to site</Link>
          </div>
        </div>
      </header>

      <section className="demo-hero">
        <div className="wrap">
          <span className="eyebrow"><span className="ln" />Book a demo</span>
          <h1>See your AI systems mapped to the EU AI Act in 30 minutes</h1>
          <p>
            Tell us a little about your firm and we&apos;ll come prepared. Prefer email? Reach us
            directly, whichever is easiest for you.
          </p>
        </div>
      </section>

      <section className="demo-stack">
        <div className="wrap demo-grid">
          <div className="card-panel">
            <DemoForm />
          </div>

          <div className="card-panel side-panel">
            <h3>Prefer to email us?</h3>
            <p className="side-sub">
              Skip the form and reach the team directly. We&apos;ll reply with times that work.
            </p>
            <div className="email-card">
              <span className="ic">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <polyline points="3 7 12 13 21 7" />
                </svg>
              </span>
              <span>
                <span className="lbl">Email us</span>
                <a href="mailto:hello@noracomply.eu">hello@noracomply.eu</a>
              </span>
            </div>
            <ul className="expect">
              <li>
                <span className="ck">✓</span>
                <span>
                  <b>A reply within 1 business day</b>
                  <span>A real person, not an auto-responder.</span>
                </span>
              </li>
              <li>
                <span className="ck">✓</span>
                <span>
                  <b>A 30-minute walkthrough</b>
                  <span>We map your tools to the Act, live.</span>
                </span>
              </li>
              <li>
                <span className="ck">✓</span>
                <span>
                  <b>No prep required</b>
                  <span>Bring your questions and we&apos;ll handle the rest.</span>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
