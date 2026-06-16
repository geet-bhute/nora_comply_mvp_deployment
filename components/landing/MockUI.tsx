function Logo() {
  return <span className="logo" />;
}

export function MockRoadmap({ tilt }: { tilt?: boolean }) {
  return (
    <div className={`mock${tilt ? ' tilt' : ''}`}>
      <aside className="mk-side">
        <div className="mk-brand">
          <span className="m">N</span>Nora&nbsp;Comply
        </div>
        <nav className="mk-nav">
          <a className="active"><span className="ic" />Roadmap</a>
          <a><span className="ic" />AI systems</a>
          <a><span className="ic" />Obligations</a>
          <a><span className="ic" />Evidence</a>
          <a><span className="ic" />Monitoring</a>
        </nav>
        <div className="mk-side-foot">
          <div className="lab">Regulator-ready</div>
          <div className="mk-bar"><i /></div>
          <div className="pct"><b>82%</b><span>+6 this week</span></div>
        </div>
      </aside>
      <div className="mk-main">
        <div className="mk-top">
          <h3>Compliance roadmap</h3>
          <span className="mk-pill">August deadline · 47 days</span>
        </div>
        <div className="mk-cardrow">
          <div className="mk-card">
            <h4>Your AI systems</h4>
            <div className="mk-sys">
              <span className="nm"><Logo />Bullhorn ATS</span>
              <span className="badge high">High</span>
            </div>
            <div className="mk-sys">
              <span className="nm"><Logo />Microsoft Copilot</span>
              <span className="badge lim">Limited</span>
            </div>
            <div className="mk-sys">
              <span className="nm"><Logo />Match&nbsp;% scoring</span>
              <span className="badge high">High</span>
            </div>
            <div className="mk-sys">
              <span className="nm"><Logo />M365 summaries</span>
              <span className="badge low">Low</span>
            </div>
          </div>
          <div className="mk-card">
            <h4>This week</h4>
            <div className="mk-check done"><span className="bx">✓</span>AI literacy training</div>
            <div className="mk-check done"><span className="bx">✓</span>Public AI policy live</div>
            <div className="mk-check"><span className="bx" />Internal AI policy</div>
            <div className="mk-check"><span className="bx" />Risk register sign-off</div>
          </div>
        </div>
        <div className="mk-alert">
          <span className="ring" />
          <span className="tx">
            <b>New vendor feature detected</b>
            <span>Bullhorn &ldquo;Match&nbsp;%&rdquo; · scored High risk · guardrails suggested</span>
          </span>
        </div>
      </div>
    </div>
  );
}

export function MockRiskRate() {
  return (
    <div className="mock solo">
      <div className="mk-rr">
        <div className="mk-rr-top">
          <h3>Tool risk assessment</h3>
          <span className="src">Source · Bullhorn &ldquo;Match&nbsp;%&rdquo;</span>
        </div>
        <div className="mk-rr-verdict">
          <span className="mk-rr-score"><b>78</b></span>
          <div>
            <div className="lab">Risk level</div>
            <div className="v">High risk</div>
            <div className="sub">Automated candidate ranking · influences hiring outcomes</div>
          </div>
        </div>
        <div className="mk-rr-cols">
          <div className="mk-rr-col why">
            <h5>Why it scored high</h5>
            <div className="li"><span className="d" />Scores &amp; ranks candidates for roles</div>
            <div className="li"><span className="d" />Touches sensitive personal data</div>
            <div className="li"><span className="d" />Can influence shortlisting decisions</div>
          </div>
          <div className="mk-rr-col guard">
            <h5>Guardrails to apply</h5>
            <div className="li"><span className="d" />Keep a human reviewer on every shortlist</div>
            <div className="li"><span className="d" />Log why candidates advance or not</div>
            <div className="li"><span className="d" />Disclose AI use to candidates</div>
          </div>
        </div>
        <div className="mk-rr-foot">
          <span className="gtag">✓ Green-light once guardrails are in place</span>
          <span className="mk-rr-btn">Add to risk register</span>
        </div>
      </div>
    </div>
  );
}

export function MockMonitoring() {
  return (
    <div className="mock solo">
      <div className="mk-mon">
        <div className="mk-mon-top">
          <h3>Vendor monitoring</h3>
          <span className="watch">Watching 4 tools</span>
        </div>
        <div className="mk-event">
          <span className="ev-ic"><Logo /></span>
          <span className="ev-tx">
            <b>Bullhorn — &ldquo;Match&nbsp;%&rdquo; scoring added</b>
            <span>New candidate-ranking prompt appeared</span>
          </span>
          <span className="ev-meta">
            <span className="badge high">High</span>
            <span className="time">2 days ago</span>
          </span>
        </div>
        <div className="mk-event">
          <span className="ev-ic"><Logo /></span>
          <span className="ev-tx">
            <b>Microsoft Copilot — agent actions</b>
            <span>Can now draft &amp; send on your behalf</span>
          </span>
          <span className="ev-meta">
            <span className="badge lim">Limited</span>
            <span className="time">5 days ago</span>
          </span>
        </div>
        <div className="mk-event">
          <span className="ev-ic"><Logo /></span>
          <span className="ev-tx">
            <b>M365 — CV summary export</b>
            <span>Reviewed · no new obligations</span>
          </span>
          <span className="ev-meta">
            <span className="badge low">Low</span>
            <span className="time">1 week ago</span>
          </span>
        </div>
        <div className="mk-alert">
          <span className="ring" />
          <span className="tx">
            <b>1 change needs your review</b>
            <span>We&apos;ll re-score affected systems and update your roadmap</span>
          </span>
        </div>
      </div>
    </div>
  );
}
