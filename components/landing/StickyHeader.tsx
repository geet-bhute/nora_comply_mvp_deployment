'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export function StickyHeader() {
  const [onDark, setOnDark] = useState(true);

  useEffect(() => {
    function handle() {
      const hero = document.querySelector<HTMLElement>('.hero');
      if (!hero) return;
      setOnDark(window.scrollY <= hero.offsetHeight - 80);
    }
    window.addEventListener('scroll', handle, { passive: true });
    handle();
    return () => window.removeEventListener('scroll', handle);
  }, []);

  return (
    <header className={`site-head${onDark ? ' on-dark' : ''}`}>
      <div className="wrap nav">
        <Link className={`brand${onDark ? ' on-dark' : ''}`} href="/">
          <span className="mark"><img src="/logo.png" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', borderRadius: 8 }} /></span>Nora Comply
        </Link>
        <nav className="nav-links">
          <a href="#product">Product</a>
          <a href="#who">Who it&apos;s for</a>
          <a href="#eu-act">EU AI Act</a>
        </nav>
        <div className="nav-cta">
          <Link className="btn btn-primary" href="/demo">Book a demo</Link>
        </div>
      </div>
    </header>
  );
}
