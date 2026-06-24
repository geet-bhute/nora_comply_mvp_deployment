import Link from 'next/link';
import { StickyHeader } from '@/components/landing/StickyHeader';
import { Footer } from '@/components/landing/Footer';
import { MockRoadmap, MockRiskRate, MockMonitoring } from '@/components/landing/MockUI';

export default function Home() {
  return (
    <>
      <StickyHeader />

      {/* HERO */}
      <section className="hero" id="top">
        <div className="wrap hero-grid">
          <div>
            <span className="eyebrow"><span className="ln" />EU AI Act Compliance</span>
            <h1>
              Navigate and evidence{' '}
              <span className="serif-em">EU&nbsp;AI&nbsp;Act</span>{' '}
              compliance from a single source of truth.
            </h1>
            <p className="lead">
              If your business uses AI systems, the EU AI Act applies to you. Nora Comply assigns
              risk levels to your AI systems, guides you through the Act&apos;s obligations, and
              provides continuous compliance evidencing, so you can concentrate on what you do best.
            </p>
            <p className="tagline">Compliance that finds you, instead of the other way around.</p>
            <div className="actions">
              <Link className="btn btn-primary btn-lg" href="/demo">
                Book a demo <span className="arr">→</span>
              </Link>
              <a className="btn btn-ghost btn-lg on-dark" href="#eu-act">
                Check your risk level
              </a>
            </div>
            <div className="stats">
              <div className="stat">
                <div className="big">1</div>
                <div className="lbl">place for every obligation</div>
              </div>
              <div className="stat">
                <div className="big" style={{ fontSize: 22 }}>Faster</div>
                <div className="lbl">than manual compliance</div>
              </div>
              <div className="stat">
                <div className="big">24/7</div>
                <div className="lbl">regulator-ready evidence</div>
              </div>
            </div>
          </div>
          <div className="hero-mock">
            <div className="float-chip a">
              <span className="dotmark" style={{ background: 'var(--risk-high)' }} />
              New Bullhorn feature · High risk
            </div>
            <div className="float-chip b">
              <span className="dotmark" style={{ background: 'var(--risk-low)' }} />
              Evidence pack ready
            </div>
            <MockRoadmap tilt />
          </div>
        </div>
      </section>

      {/* TOOLS RISK */}
      <section className="section tint" id="tools-risk">
        <div className="wrap">
          <div className="section-head center">
            <span className="eyebrow"><span className="ln" />Already in your stack<span className="ln" /></span>
            <h2>Manage the risk of your current tools</h2>
          </div>
          <div className="tool-logos">
            {[
              { name: 'Bullhorn', src: '/logos/bullhorn.webp' },
              { name: 'Microsoft Copilot', src: '/logos/copilot.avif' },
              { name: 'Claude', src: '/logos/claude.png' },
              { name: 'ChatGPT', src: '/logos/chatgpt.png' },
            ].map((t) => (
              <div className="tool-logo-card" key={t.name}>
                <img src={t.src} alt={t.name} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EU AI ACT */}
      <section className="section tint" id="eu-act">
        <div className="wrap act-grid">
          <div className="act-text">
            <span className="eyebrow"><span className="ln" />The EU AI Act</span>
            <h2>Your obligations depend on how you use AI</h2>
            <p>
              If your business uses AI systems, you have compliance obligations to meet. What you
              must do depends on what you use your AI for, and that determines its risk level.
              Limited-risk systems carry transparency duties; high-risk systems carry stringent
              obligations.
            </p>
            <Link className="btn btn-primary btn-lg" href="/demo">
              Book a demo <span className="arr">→</span>
            </Link>
          </div>
          <div className="risk-tiers">
            <div className="tier t-low">
              <span className="t-badge">Minimal</span>
              <div>
                <h4>Minimal-risk systems</h4>
                <p>Most general-purpose tools. Keep a basic inventory and records of where AI is used.</p>
              </div>
            </div>
            <div className="tier t-lim">
              <span className="t-badge">Limited</span>
              <div>
                <h4>Transparency obligations</h4>
                <p>
                  Disclose AI use to the people affected, for example telling candidates when AI
                  is part of the process.
                </p>
              </div>
            </div>
            <div className="tier t-high">
              <span className="t-badge">High</span>
              <div>
                <h4>Stringent obligations</h4>
                <p>
                  Risk management, human oversight, logging and evidence. AI in recruitment
                  typically lands here.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCT SNAPSHOTS */}
      <section className="section" id="product">
        <div className="wrap">
          <div className="section-head center" style={{ maxWidth: 860 }}>
            <span className="eyebrow"><span className="ln" />The product<span className="ln" /></span>
            <h2>A single source of truth, in snapshots</h2>
            <p>
              From &ldquo;what applies to us?&rdquo; to &ldquo;here&apos;s our evidence&rdquo;:
              Nora Comply turns the EU AI Act into a clear, living workflow that lives where your
              team already works.
            </p>
          </div>

          <div className="snap-row">
            <div className="snap-text">
              <span className="step"><span className="n">1</span>Roadmap &amp; checklists</span>
              <h3>Every obligation, step by step</h3>
              <p>
                No more hunting across government sites and conflicting webinars. We break the Act
                into the obligations that apply to you, in order, with deadlines and tick-off
                checklists.
              </p>
              <ul>
                <li><span className="ck">✓</span>Filtered to recruitment &amp; your risk level</li>
                <li><span className="ck">✓</span>Deadlines, owners and status on every item</li>
                <li><span className="ck">✓</span>One running &ldquo;regulator-ready&rdquo; score</li>
              </ul>
            </div>
            <div className="snap-frame">
              <div className="snap-cap"><span className="dot" />noracomply.com/app · Roadmap</div>
              <MockRoadmap />
            </div>
          </div>

          <div className="snap-row flip">
            <div className="snap-text">
              <span className="step"><span className="n">2</span>Risk-rating engine</span>
              <h3>Risk-rate any AI tool you use</h3>
              <p>
                Point Nora at a tool (like Bullhorn&apos;s new &ldquo;Match&nbsp;%&rdquo; scoring)
                and get a clear risk level, the reasons behind it, and the exact guardrails to
                put in place before you use it.
              </p>
              <ul>
                <li><span className="ck">✓</span>Low · limited · high, with a plain-English verdict</li>
                <li><span className="ck">✓</span>Specific guardrails, not vague advice</li>
                <li><span className="ck">✓</span>One click to add it to your risk register</li>
              </ul>
            </div>
            <div className="snap-frame">
              <div className="snap-cap"><span className="dot" />noracomply.com/app · Risk assessment</div>
              <MockRiskRate />
            </div>
          </div>

          <div className="snap-row">
            <div className="snap-text">
              <span className="step"><span className="n">3</span>Vendor monitoring</span>
              <h3>Monitoring that keeps watch for you</h3>
              <p>
                Vendors add AI features without telling you. Nora watches the tools you use and
                flags new features the moment they appear, then re-scores the risk and updates
                your roadmap.
              </p>
              <ul>
                <li><span className="ck">✓</span>Same-day alerts when a feature changes</li>
                <li><span className="ck">✓</span>Automatic re-scoring of affected systems</li>
                <li><span className="ck">✓</span>Nothing quietly pushes you into higher risk</li>
              </ul>
            </div>
            <div className="snap-frame">
              <div className="snap-cap"><span className="dot" />noracomply.com/app · Monitoring</div>
              <MockMonitoring />
            </div>
          </div>
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section className="section" id="who">
        <div className="wrap who">
          <div>
            <span className="eyebrow"><span className="ln" />Who it&apos;s for</span>
            <h2>Built for mid-market recruitment firms &amp; professional services</h2>
            <p>
              You&apos;re using AI across sourcing, screening and client work, often with one
              person holding compliance together. Nora gives that person a system instead of a
              spreadsheet, and works as a plug-in where you already are.
            </p>
            <p className="tagline">A plug-in where you work.</p>
          </div>
          <div className="who-card">
            {[
              { title: 'Recruitment agencies', sub: 'ATS and AI sourcing tools sit in the high-risk bracket' },
              { title: 'Professional services', sub: 'Using AI across hiring, operations and client delivery' },
              { title: 'The compliance team of one', sub: 'One person, every obligation, finally in one place' },
            ].map((item) => (
              <div className="row" key={item.title}>
                <span className="ic">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                <div>
                  <b>{item.title}</b>
                  <span>{item.sub}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="section tint">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow"><span className="ln" />The benefits for your business</span>
            <h2>Less time navigating compliance, more time doing what you do best</h2>
          </div>
          <div className="benefits-grid">
            {[
              { n: '01', title: 'Reduce outsourced compliance spend', body: 'One platform in place of scattered legal retainers and ad-hoc consultant hours.' },
              { n: '02', title: 'One source of truth', body: 'Every obligation, deadline and piece of evidence for the EU AI Act in a single place.' },
              { n: '03', title: 'Continuous compliance evidence', body: 'Stay regulator-ready at all times, not just scrambling in the run-up to an audit.' },
              { n: '04', title: 'Faster than manual compliance', body: 'Spend less time navigating compliance and more time doing what you do best.' },
            ].map((b) => (
              <div className="benefit" key={b.n}>
                <div className="bnum">{b.n}</div>
                <h3>{b.title}</h3>
                <p>{b.body}</p>
              </div>
            ))}
          </div>
          <p style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 20, color: 'var(--teal)', margin: '30px 0 0' }}>
            Built for obligation, not just inventory.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ paddingTop: 40 }}>
        <div className="wrap">
          <div className="cta-band">
            <div>
              <h2>Ready to get started?</h2>
              <p>
                Book a 30-minute demo and we&apos;ll map your AI systems to the Act, live.
              </p>
            </div>
            <div className="cta-actions">
              <Link className="btn btn-primary btn-lg" href="/demo" style={{ justifyContent: 'center' }}>
                Book a demo <span className="arr">→</span>
              </Link>
              <div className="email-line">
                or email <a href="mailto:emily@noracomply.com">emily@noracomply.com</a> or{' '}
                <a href="mailto:kathryn@noracomply.com">kathryn@noracomply.com</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
