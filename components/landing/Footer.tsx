import Link from 'next/link';

export function Footer() {
  return (
    <footer className="site-foot">
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <Link className="brand on-dark" href="/">
              <span className="mark"><img src="/logo.png" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', borderRadius: 8 }} /></span>Nora Comply
            </Link>
            <p className="blurb">
              The single source of truth for EU AI Act compliance — built for mid-market
              recruitment firms and professional services.
            </p>
          </div>
          <div className="foot-cols">
            <div className="foot-col">
              <h5>Product</h5>
              <a href="/#product">Snapshots</a>
              <a href="/#eu-act">EU AI Act</a>
              <a href="/#who">Who it&apos;s for</a>
            </div>
            <div className="foot-col">
              <h5>Company</h5>
              <Link href="/demo">Book a demo</Link>
              <Link href="/sign-in">Sign in</Link>
              <a href="mailto:hello@noracomply.com">Contact</a>
            </div>
          </div>
        </div>
        <div className="foot-bot">
          <span>© 2026 Nora Comply · <a href="https://noracomply.com" style={{ color: 'inherit' }}>noracomply.com</a></span>
          <span>Made for the EU AI Act</span>
        </div>
      </div>
    </footer>
  );
}
