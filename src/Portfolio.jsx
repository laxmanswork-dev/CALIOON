import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";

// Separate static page (own Vite entry: portfolio/index.html -> src/portfolio-main.jsx)
// so the homepage bundle/route is never touched. Navbar/Footer are the literal homepage
// components (exported from App.jsx), reused as-is per the brief — not recreated here.

const EASE = [0.16, 1, 0.3, 1];

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap');

  .cp-root {
    background: #050A12;
    color: rgba(255,255,255,0.78);
    font-family: 'Inter', sans-serif;
    overflow-x: hidden;
    min-height: 100vh;
  }
  .cp-root h1, .cp-root h2, .cp-root h3, .cp-root h4 {
    font-family: 'Cinzel', serif;
    color: #ffffff;
    margin: 0;
  }
  .cp-container {
    width: 100%;
    max-width: 1220px;
    margin: 0 auto;
    padding-left: 24px;
    padding-right: 24px;
    box-sizing: border-box;
  }
  @media (min-width: 768px) {
    .cp-container { padding-left: 48px; padding-right: 48px; }
  }
  @media (min-width: 1280px) {
    .cp-container { padding-left: 80px; padding-right: 80px; }
  }
  .cp-eyebrow {
    font-family: 'Cinzel', serif;
    font-weight: 700;
    letter-spacing: 0.30em;
    text-transform: uppercase;
    color: #c6a062;
    font-size: 19px;
    display: block;
  }
  .cp-ornament {
    color: rgba(198,160,98,0.55);
    font-size: 13px;
    letter-spacing: 0.05em;
    font-family: monospace;
  }
  .cp-gold-text {
    background: linear-gradient(180deg, #f5e3c3 0%, #c6a062 50%, #8a6d3b 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .cp-vignette {
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: radial-gradient(circle at 50% 20%, transparent 30%, #04080F 92%);
    z-index: 0;
  }
  .cp-section {
    position: relative;
    scroll-margin-top: 170px;
    padding-top: clamp(56px, 8vw, 104px);
    padding-bottom: clamp(56px, 8vw, 104px);
    border-top: 1px solid rgba(198,160,98,0.16);
  }
  .cp-pill {
    display: inline-flex; align-items: center;
    border: 1px solid rgba(198,160,98,0.40); color: #d9c196;
    font-family: 'Cinzel', serif; font-size: 11px; font-weight: 600;
    letter-spacing: 0.12em; text-transform: uppercase; padding: 10px 22px;
    background: rgba(198,160,98,0.06);
    clip-path: polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%);
    transition: background 0.3s ease, border-color 0.3s ease;
  }
  .cp-pill:hover { background: rgba(198,160,98,0.14); border-color: rgba(198,160,98,0.70); }
  .cp-btn-primary {
    display: inline-flex; align-items: center; justify-content: center;
    height: 54px; padding: 0 36px; background: #c6a062; color: #050A12;
    font-family: 'Cinzel', serif; font-weight: 700; font-size: 12.5px;
    letter-spacing: 0.20em; text-decoration: none; text-transform: uppercase;
    transition: filter 0.3s ease;
  }
  .cp-btn-primary:hover { filter: brightness(1.1); }
  .cp-btn-secondary {
    display: inline-flex; align-items: center; justify-content: center;
    height: 54px; padding: 0 36px; background: none;
    border: 1px solid rgba(198,160,98,0.40); color: #c6a062;
    font-family: 'Cinzel', serif; font-weight: 700; font-size: 12.5px;
    letter-spacing: 0.20em; text-decoration: none; text-transform: uppercase;
    transition: background 0.3s ease;
  }
  .cp-btn-secondary:hover { background: rgba(198,160,98,0.07); }
  @media (max-width: 480px) {
    .cp-btn-secondary { height: 42px; padding: 0 22px; font-size: 10.5px; letter-spacing: 0.14em; }
  }

  @keyframes cpLogoMarquee {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }
  .cp-logo-track {
    animation: cpLogoMarquee 34s linear infinite;
  }
  @media (prefers-reduced-motion: reduce) {
    .cp-logo-track { animation: none !important; transform: none !important; }
  }

  .cp-radar-axis .cp-radar-label, .cp-radar-axis .cp-radar-pct {
    transition: filter 0.25s ease;
  }
  .cp-radar-axis:hover .cp-radar-label, .cp-radar-axis:hover .cp-radar-pct { filter: brightness(1.3); }

  @keyframes roadmapGlowPulse {
    0%, 100% { filter: drop-shadow(0 0 3px rgba(198,160,98,0.30)); }
    50%      { filter: drop-shadow(0 0 9px rgba(198,160,98,0.55)); }
  }
  .cp-roadmap-circle { animation: roadmapGlowPulse 5s ease-in-out infinite; }
  @keyframes roadmapRingCW  { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
  @keyframes roadmapRingCCW { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
  .cp-roadmap-ring-outer { animation: roadmapRingCW 60s linear infinite; transform-origin: center; }
  .cp-roadmap-ring-inner { animation: roadmapRingCCW 80s linear infinite; transform-origin: center; }
  @media (prefers-reduced-motion: reduce) {
    .cp-roadmap-circle, .cp-roadmap-ring-outer, .cp-roadmap-ring-inner { animation: none !important; }
  }

  /* Radar data-layer orbit: plain CSS keyframe (not Framer Motion's animate prop) with an
     explicit transform-origin, same mechanism as the working roadmap rings above. The SVG
     g element this rotates has no intrinsic shape geometry of its own, and Framer Motion's
     style merging was silently overriding/mis-resolving a manually-set transformOrigin on
     it -- that's why the orbit wasn't rendering correctly. Plain CSS avoids that conflict. */
  .cp-radar-data-layer { animation: roadmapRingCW 22s linear infinite; transform-origin: 150px 150px; }
  @media (prefers-reduced-motion: reduce) {
    .cp-radar-data-layer { animation: none !important; }
  }

  html { scroll-behavior: smooth; }
  .cp-subnav-link {
    font-family: 'Cinzel', serif;
    font-size: 10.5px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(212,175,106,0.60);
    text-decoration: none;
    white-space: nowrap;
    padding: 4px 0;
    transition: color 0.25s ease;
  }
  .cp-subnav-link:hover { color: rgba(255,232,140,0.95); }
  .cp-subnav-link:not(:first-child)::before {
    content: "•";
    display: inline-block;
    color: rgba(198,160,98,0.30);
    margin: 0 12px;
    font-size: 8px;
    vertical-align: middle;
  }
`;

const Reveal = ({ children, delay = 0, y = 22, className = "", style = {} }) => (
  <motion.div
    className={className}
    style={style}
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.7, delay, ease: EASE }}
  >
    {children}
  </motion.div>
);

const TypewriterTitle = ({ segments }) => {
  let idx = 0;
  return (
    <>
      {segments.map((seg, si) => (
        <span key={si} className={seg.className}>
          {seg.text.split("").map((ch, ci) => {
            const delay = idx * 0.032;
            idx++;
            return (
              <motion.span
                key={ci}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.01, delay }}
                style={{ display: "inline-block" }}
              >
                {ch === " " ? " " : ch}
              </motion.span>
            );
          })}
        </span>
      ))}
    </>
  );
};

const SectionLabel = ({ eyebrow, title, gold, sub, underline, typewriter }) => {
  const h2Style = { fontSize: "clamp(26px,4vw,44px)", fontWeight: 700, letterSpacing: "0.03em", lineHeight: 1.2, marginTop: "14px", textTransform: "uppercase" };
  const titleNode = typewriter
    ? <TypewriterTitle segments={[{ text: title + (gold ? " " : ""), className: "" }, ...(gold ? [{ text: gold, className: "cp-gold-text" }] : [])]} />
    : <>{title} {gold && <span className="cp-gold-text">{gold}</span>}</>;
  return (
    <div style={{ textAlign: "center", marginBottom: "clamp(36px,5vw,56px)" }}>
      <Reveal>
        <span className="cp-eyebrow">{eyebrow}</span>
        {underline && (
          <div className="cp-ornament" style={{ marginTop: "12px" }}>⌜⌟⌜⌟⌜⌟&nbsp;&nbsp;&#9737;&nbsp;&nbsp;⌜⌟⌜⌟⌜⌟</div>
        )}
      </Reveal>
      {typewriter ? (
        <h2 style={{ ...h2Style, fontSize: "clamp(10.5px,3vw,36px)", letterSpacing: "0.01em", whiteSpace: "nowrap" }}>{titleNode}</h2>
      ) : (
        <Reveal delay={0.08}><h2 style={h2Style}>{titleNode}</h2></Reveal>
      )}
      {sub && (
        <Reveal delay={0.16}>
          <p style={{ maxWidth: "560px", margin: "16px auto 0", color: "rgba(255,255,255,0.55)", fontSize: "15px", lineHeight: 1.7 }}>{sub}</p>
        </Reveal>
      )}
    </div>
  );
};

const StatTile = ({ value, label, delay = 0 }) => (
  <Reveal delay={delay} style={{ borderLeft: "1px solid rgba(198,160,98,0.35)", paddingLeft: "18px" }}>
    <div style={{ fontFamily: "'Cinzel', serif", fontWeight: 700, fontSize: "clamp(26px,3.2vw,40px)", color: "#ffffff" }}>{value}</div>
    <div style={{ marginTop: "6px", fontSize: "10.5px", letterSpacing: "0.10em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", fontWeight: 600 }}>{label}</div>
  </Reveal>
);

const ResponsiveGrid = ({ cols, gap = "24px", children, className }) => (
  <div className={className} style={{ display: "grid", gridTemplateColumns: "1fr", gap }}>
    <style>{`@media(min-width:640px){.cp-root .${className}{grid-template-columns:repeat(2,1fr) !important;}}@media(min-width:768px){.cp-root .${className}{grid-template-columns:repeat(${cols},1fr) !important;}}`}</style>
    {children}
  </div>
);

// Drop the real screenshot into public/logos/ with this exact filename and it appears
// automatically — until then this renders a clean on-brand placeholder, never a broken image.
const TEA_SCREENSHOT = "/logos/tea-instagram-growth.png";

const PhoneMockup = ({ src, alt }) => {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div style={{ width: "100%", maxWidth: "260px", margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "12px", padding: "24px", textAlign: "center" }}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(198,160,98,0.45)" strokeWidth="1.3">
          <rect x="6" y="2" width="12" height="20" rx="2" />
          <line x1="10" y1="19" x2="14" y2="19" />
        </svg>
        <span style={{ fontFamily: "'Cinzel', serif", fontSize: "10px", letterSpacing: "0.10em", color: "rgba(198,160,98,0.50)", textTransform: "uppercase", lineHeight: 1.6 }}>
          Instagram Growth<br />Screenshot
        </span>
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
      style={{ display: "block", width: "100%", maxWidth: "260px", height: "auto", margin: "0 auto", objectFit: "contain" }}
    />
  );
};

const TRUSTED_LOGOS = [
  { name: "Leap Scholar", src: "/logos/leap-scholar.png" },
  { name: "Crimson Education", src: "/logos/crimson-education.png" },
  { name: "Athena", src: "/logos/athena-edu.png" },
  { name: "upGrad", src: "/logos/upgrad.png" },
  { name: "TEA", src: "/logos/tea.png" },
  { name: "Santa Monica Study Abroad Pvt. Ltd.", src: "/logos/santa-monica.png" },
];

const LogoMarquee = () => {
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = (e) => setReducedMotion(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const renderSet = (keyPrefix) => (
    <div style={{ display: "flex", alignItems: "center", gap: "clamp(28px,5vw,56px)", paddingRight: "clamp(28px,5vw,56px)" }}>
      {TRUSTED_LOGOS.map((l, i) => (
        <div key={`${keyPrefix}-${i}`} style={{ display: "inline-flex", padding: "2.5px", border: "1.2px solid rgba(198,160,98,0.80)", flexShrink: 0 }}>
          <img src={l.src} alt={`${l.name} logo`} loading="lazy" style={{ display: "block", height: "30px", width: "auto", maxWidth: "110px", objectFit: "contain", opacity: 0.86 }} />
        </div>
      ))}
    </div>
  );

  if (reducedMotion) {
    return (
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "clamp(20px,4vw,40px)" }}>
        {TRUSTED_LOGOS.map((l) => (
          <div key={l.name} style={{ display: "inline-flex", padding: "2.5px", border: "1.2px solid rgba(198,160,98,0.80)" }}>
            <img src={l.src} alt={`${l.name} logo`} loading="lazy" style={{ display: "block", height: "30px", width: "auto", maxWidth: "110px", objectFit: "contain", opacity: 0.86 }} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      style={{
        overflow: "hidden",
        width: "100%",
        WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
        maskImage: "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
      }}
    >
      <div className="cp-logo-track" style={{ display: "flex", width: "max-content" }}>
        {renderSet('a')}
        {renderSet('b')}
      </div>
    </div>
  );
};

const CHALLENGES_GROUP_1 = [
  { t: "Inconsistent Student Inquiries", d: "Most consultancies rely on referrals or seasonal demand, leading to unpredictable inquiry flow. Some months are overwhelming, others are completely dry." },
  { t: "Low-Quality Leads", d: "You're getting inquiries, but not from students who actually convert. Time and effort are wasted on leads that go nowhere." },
  { t: "Weak Brand Consistency", d: "Your brand looks different everywhere, so it's hard to trust or remember. Inconsistency silently kills credibility." },
];
const CHALLENGES_GROUP_2 = [
  { t: "Competitors Dominating Instagram", d: "Students choose the agencies they see the most. More visibility, more credibility — your competitors are winning the attention, trust, and clients that should be yours." },
  { t: "Weak Social Media Presence", d: "Irregular posting and lack of direction make a brand look inactive and unreliable. If you're not consistently visible, students assume you're not the right choice." },
  { t: "Low Reach and No Leads", d: "Content that isn't reaching the right audience can't convert it. No reach means no visibility, and no visibility means no leads." },
];

const PILLARS = [
  { t: "Audience Growth & Visibility", d: "We grow your followers with the right audience — students actively looking to study abroad. More visibility = more trust = more inquiries." },
  { t: "High-Quality Lead Generation", d: "We attract serious, ready-to-convert students, not just random inquiries. So your team spends time closing deals, not chasing leads." },
  { t: "Strategic Content That Converts", d: "Every post is designed with a purpose — to build trust, attract, and convert. No more random posting. Only content that drives real results." },
];

// Drop real screenshots into public/logos/ with these exact filenames and they appear
// automatically — until then PhoneMockup's placeholder shows, never a broken image.
const START_IMAGE = "/logos/start.png";
const GROWTH_IMAGE = "/logos/growth.png";
const LIKE_IMAGE = "/logos/like.png";
const RESULT_IMAGE = "/logos/result.png";

const CONTENT_TAGS = ["Verified Content", "High Value Carousels", "High Value Reels", "Engaging Content", "Clear CTA Content", "Niche Focussed"];

const POSTS = ["219K", "1.3M", "136K", "1.5M", "2.1M", "1.3M"];

// Axis order matches the PDF's own radar charts (clockwise from 12 o'clock) — this is
// deliberately NOT sorted by value, so the geometry/label layout matches the reference.
const DESTINATIONS = [
  { l: "USA", v: 32 },
  { l: "UK", v: 24 },
  { l: "Canada", v: 12 },
  { l: "Germany", v: 10 },
  { l: "France", v: 7 },
  { l: "Australia", v: 7 },
  { l: "Europe (Others)", v: 10, lines: ["Europe", "(Others)"] },
  { l: "Others", v: 15 },
];
const COURSES = [
  { l: "Business & Management", v: 28, lines: ["Business &", "Management"] },
  { l: "STEM (Engineering & IT)", v: 22, lines: ["STEM", "(Engineering & IT)"] },
  { l: "Healthcare & Life Sciences", v: 12, lines: ["Healthcare &", "Life Sciences"] },
  { l: "Arts, Design & Media", v: 8, lines: ["Arts, Design", "& Media"] },
  { l: "Hospitality & Tourism", v: 7, lines: ["Hospitality &", "Tourism"] },
  { l: "Law", v: 6 },
  { l: "Social Sciences", v: 5, lines: ["Social", "Sciences"] },
  { l: "Others", v: 15 },
];
const LEVELS = [
  { l: "Undergraduate (UG)", v: 42, lines: ["Undergraduate", "(UG)"] },
  { l: "Postgraduate (PG)", v: 32, lines: ["Postgraduate", "(PG)"] },
  { l: "Diploma / Certificate", v: 11, lines: ["Diploma /", "Certificate"] },
  { l: "Professional Programs", v: 8, lines: ["Professional", "Programs"] },
  { l: "Others", v: 7 },
];

// Editorial radar/spider diagram, labels anchored around the radar on their own axis —
// matches the reference's information design (not a chart-plus-legend-list pattern).
const usePrefersReducedMotion = () => {
  const [reduced, setReduced] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (e) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
};

// Editorial radar/spider diagram, labels anchored around the radar on their own axis.
// Reveal sequence (grid -> points -> outline draw -> fill -> labels -> percentages) runs
// once via a single whileInView trigger on the outer <motion.g>; children inherit that
// "hidden"/"visible" state through variants, so there's one IntersectionObserver per
// chart rather than one per element. Settles to fully static after ~1.3s, never loops.
const RadarChart = ({ title, data, delay = 0 }) => {
  const reducedMotion = usePrefersReducedMotion();
  const size = 300;
  const cx = size / 2;
  const cy = size / 2;
  const R = size * 0.20; // compact, deliberately not enlarged
  const labelR = R * 1.8;
  const n = data.length;
  const maxVal = Math.max(...data.map((d) => d.v));
  const scaleMax = Math.ceil(maxVal / 10) * 10;
  const rings = [0.25, 0.5, 0.75, 1];
  const lineHeight = 14;

  const angleAt = (i) => -Math.PI / 2 + (i * 2 * Math.PI) / n;
  const pointAt = (i, frac, radius = R) => {
    const a = angleAt(i);
    return [cx + radius * frac * Math.cos(a), cy + radius * frac * Math.sin(a)];
  };
  const polygonPoints = (frac) => data.map((_, i) => pointAt(i, frac).join(",")).join(" ");
  const dataPoints = data.map((d, i) => pointAt(i, d.v / scaleMax).join(",")).join(" ");

  const gridDelay = delay;
  const pointBase = delay + 0.15;
  const pointStagger = 0.03;
  const outlineDelay = delay + 0.35;
  const fillDelay = delay + 0.55;
  const labelDelay = delay + 0.8;
  const pctDelay = delay + 1.05;

  return (
    <Reveal delay={delay} style={{ border: "1px solid rgba(198,160,98,0.35)", padding: "40px 20px", textAlign: "center" }}>
      <h4 style={{ fontFamily: "'Cinzel', serif", fontSize: "12px", letterSpacing: "0.14em", color: "#c6a062", textTransform: "uppercase", marginBottom: "12px" }}>{title}</h4>
      <svg viewBox={`0 0 ${size} ${size}`} style={{ width: "100%", maxWidth: "300px", margin: "0 auto", display: "block", overflow: "visible" }}>
        {/* STATIC layer: grid + labels + percentages. Never rotates, never moves. */}
        <motion.g initial={reducedMotion ? "visible" : "hidden"} whileInView="visible" viewport={{ once: true, margin: "-40px" }}>
          <motion.g variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.35, delay: gridDelay, ease: EASE } } }}>
            {rings.map((frac, ri) => (
              <polygon key={ri} points={polygonPoints(frac)} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
            ))}
            {data.map((_, i) => {
              const [x, y] = pointAt(i, 1);
              return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />;
            })}
          </motion.g>

          {data.map((d, i) => {
            const a = angleAt(i);
            const cos = Math.cos(a);
            const [lx, ly] = pointAt(i, 1, labelR);
            const anchor = cos > 0.2 ? "start" : cos < -0.2 ? "end" : "middle";
            const nameLines = d.lines || [d.l];
            const totalLines = nameLines.length + 1;
            const blockStartY = ly - ((totalLines - 1) / 2) * lineHeight;
            return (
              <g key={i} className="cp-radar-axis">
                {nameLines.map((line, li) => (
                  <motion.text
                    key={`n${li}`}
                    x={lx}
                    y={blockStartY + li * lineHeight}
                    textAnchor={anchor}
                    className="cp-radar-label"
                    style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", fontWeight: 500, fill: "#F1EBDD", letterSpacing: "0.01em" }}
                    variants={{ hidden: { opacity: 0, y: 6 }, visible: { opacity: 1, y: 0, transition: { duration: 0.3, delay: labelDelay, ease: EASE } } }}
                  >
                    {line}
                  </motion.text>
                ))}
                <motion.text
                  x={lx}
                  y={blockStartY + nameLines.length * lineHeight}
                  textAnchor={anchor}
                  className="cp-radar-pct"
                  style={{ fontFamily: "'Inter', sans-serif", fontSize: "12.5px", fontWeight: 700, fill: "#c6a062", letterSpacing: "0.01em" }}
                  variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.3, delay: pctDelay, ease: EASE } } }}
                >
                  {d.v}%
                </motion.text>
              </g>
            );
          })}
        </motion.g>

        {/* DATA LAYER: the only thing that moves — fill, outline, points. Self-contained
            reveal (own whileInView, decoupled from the static layer above) wrapped in a
            continuous, seamless 360° orbit (plain CSS, see .cp-radar-data-layer above —
            Framer Motion's `animate={{rotate}}` + manual transformOrigin on this <g> was
            the bug). Grid and labels above are untouched by this. */}
        <g className="cp-radar-data-layer">
          <motion.g initial={reducedMotion ? "visible" : "hidden"} whileInView="visible" viewport={{ once: true, margin: "-40px" }}>
            <motion.polygon
              points={dataPoints}
              fill="rgba(198,160,98,0.12)"
              style={{ transformOrigin: `${cx}px ${cy}px` }}
              variants={{ hidden: { scale: 0, opacity: 0 }, visible: { scale: 1, opacity: 1, transition: { duration: 0.4, delay: fillDelay, ease: EASE } } }}
            />
            <motion.polygon
              points={dataPoints}
              fill="none"
              stroke="#F1EBDD"
              strokeWidth="1.4"
              strokeLinejoin="round"
              variants={{ hidden: { pathLength: 0 }, visible: { pathLength: 1, transition: { duration: 0.4, delay: outlineDelay, ease: EASE } } }}
            />
            {data.map((d, i) => {
              const [x, y] = pointAt(i, d.v / scaleMax);
              return (
                <motion.circle
                  key={i}
                  cx={x}
                  cy={y}
                  r="3"
                  fill="#c6a062"
                  style={{ transformOrigin: `${x}px ${y}px` }}
                  variants={{ hidden: { scale: 0, opacity: 0 }, visible: { scale: 1, opacity: 1, transition: { duration: 0.25, delay: pointBase + i * pointStagger, ease: EASE } } }}
                />
              );
            })}
          </motion.g>
        </g>
      </svg>
    </Reveal>
  );
};

const ROADMAP = ["Audit & Positioning", "Premium Brand Transformation", "Content Strategy & Execution", "Growth & Audience Building", "Lead Generation & Optimization"];

// Quick-jump sub-nav: this page has many sections, so this sits just under the hero
// (sticky, below the fixed main Navbar) letting visitors skip straight to any section
// instead of scrolling the whole case study top to bottom.
const SUB_NAV = [
  { label: "Trusted By", href: "#trusted" },
  { label: "Zero to 100K", href: "#zero-to-100k" },
  { label: "The Shift", href: "#shift" },
  { label: "Lead Bank", href: "#leadbank" },
  { label: "The Problem", href: "#problem" },
  { label: "Challenges", href: "#challenges" },
  { label: "Our Strategy", href: "#strategy" },
  { label: "Content Strategy", href: "#content-strategy" },
  { label: "Content Results", href: "#content-results" },
  { label: "Roadmap", href: "#roadmap" },
];

// Large alternating gold/navy phase node with thin dashed orbital rings (continuous,
// extremely slow rotation — purely ambient, respects prefers-reduced-motion) and a
// subtle glow pulse. Layout position is fixed; only the glow/rings move.
const RoadmapNode = ({ index, title }) => {
  const isGold = index % 2 === 0;
  const fill = isGold ? "#c6a062" : "#060D1E";
  const numColor = isGold ? "#050A12" : "#c6a062";
  const size = 110;
  const cx = size / 2;
  const cy = size / 2;
  const r = 32;

  return (
    <div style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
      <svg viewBox={`0 0 ${size} ${size}`} style={{ width: "92px", height: "92px", margin: "0 auto", display: "block", overflow: "visible" }}>
        <circle className="cp-roadmap-ring-outer" cx={cx} cy={cy} r={r + 20} fill="none" stroke="rgba(198,160,98,0.22)" strokeWidth="1" strokeDasharray="1.5 6" />
        <circle className="cp-roadmap-ring-inner" cx={cx} cy={cy} r={r + 11} fill="none" stroke="rgba(198,160,98,0.32)" strokeWidth="1" strokeDasharray="1 4" />
        <circle className="cp-roadmap-circle" cx={cx} cy={cy} r={r} fill={fill} stroke="#c6a062" strokeWidth="1.3" />
        <text x={cx} y={cy} textAnchor="middle" dominantBaseline="central" style={{ fontFamily: "'Cinzel', serif", fontWeight: 700, fontSize: "19px", fill: numColor }}>
          {String(index + 1).padStart(2, "0")}
        </text>
      </svg>
      <p style={{ fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "#c6a062", fontFamily: "'Cinzel', serif", marginTop: "16px", marginBottom: "8px" }}>
        Phase {index + 1}
      </p>
      <p style={{ fontSize: "12.5px", letterSpacing: "0.02em", color: "#F1EBDD", lineHeight: 1.5, maxWidth: "140px", margin: "0 auto" }}>{title}</p>
    </div>
  );
};

export default function Portfolio() {
  return (
    <div className="cp-root">
      <style>{STYLES}</style>
      <Navbar />

      {/* SECTION 01 — HERO (padding-top clears the fixed 100px navbar) */}
      <section style={{ position: "relative", paddingTop: "calc(100px + clamp(56px,9vw,104px))", paddingBottom: "clamp(56px,8vw,96px)", overflow: "hidden" }}>
        <div className="cp-vignette" />
        <div className="cp-container" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <Reveal><span className="cp-eyebrow">Calioon / Case Study</span></Reveal>
          <Reveal delay={0.10}>
            <h1 style={{ fontSize: "clamp(28px,5vw,58px)", fontWeight: 800, lineHeight: 1.08, letterSpacing: "0.01em", marginTop: "20px", textTransform: "uppercase" }}>
              THE STUDENT<br />ACQUISITION<br /><span className="cp-gold-text">MACHINE&trade;</span>
            </h1>
          </Reveal>
          <Reveal delay={0.22}>
            <div className="cp-ornament" style={{ marginTop: "28px" }}>⌜⌟⌜⌟⌜⌟&nbsp;&nbsp;&#9737;&nbsp;&nbsp;⌜⌟⌜⌟⌜⌟</div>
          </Reveal>
          <Reveal delay={0.30}>
            <p style={{ maxWidth: "560px", margin: "28px auto 0", fontSize: "13px", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(198,160,98,0.55)", fontFamily: "'Cinzel', serif" }}>
              Calioon.com
            </p>
          </Reveal>
        </div>
      </section>

      {/* QUICK-JUMP SUB-NAV — sticky just below the fixed main Navbar */}
      <div
        style={{
          position: "sticky",
          top: "100px",
          zIndex: 30,
          background: "rgba(5,10,18,0.92)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          borderTop: "1px solid rgba(198,160,98,0.16)",
          borderBottom: "1px solid rgba(198,160,98,0.16)",
        }}
      >
        <div
          className="cp-container"
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            rowGap: "8px",
            padding: "14px 0",
          }}
        >
          {SUB_NAV.map((item) => (
            <a key={item.href} href={item.href} className="cp-subnav-link">
              {item.label}
            </a>
          ))}
        </div>
      </div>

      {/* SECTION 02 — TRUSTED BY + THE RESULTS (merged: one continuation, not two separate blocks) */}
      <section id="trusted" className="cp-section">
        <div className="cp-container">
          <SectionLabel eyebrow="Brands We've Worked With" title="Trusted By Leading" gold="Education Brands" underline />
          <LogoMarquee />

          <div style={{ marginTop: "clamp(48px,6vw,72px)" }} />

          <SectionLabel eyebrow="The Results" title="Aggregate Impact Across" gold="Six Education Brands" underline />
          <ResponsiveGrid cols={4} className="cp-results-grid">
            <StatTile value="7M+" label="Students Reached" delay={0} />
            <StatTile value="127K+" label="Organic Leads Generated" delay={0.06} />
            <StatTile value="300%" label="Avg. Growth in Profile Visits" delay={0.12} />
            <StatTile value="50K+" label="Applications Influenced" delay={0.18} />
          </ResponsiveGrid>
        </div>
      </section>

      {/* SECTION 04 — ZERO TO 100K FOLLOWERS */}
      <section id="zero-to-100k" className="cp-section">
        <div className="cp-container">
          <SectionLabel eyebrow="Featured Transformation — TEA, Tertiary Education Advisors" title="Zero To 100K Followers" gold="In Just 6 Months!" underline typewriter />
          <div style={{ maxWidth: "920px", margin: "0 auto" }}>
            <style>{`@media(min-width:900px){.cp-root .cp-feat-layout{grid-template-columns:1fr 260px 1fr !important;}.cp-root .cp-feat-left{transform:translateX(-40px);}}`}</style>
            <div className="cp-feat-layout" style={{ display: "grid", gridTemplateColumns: "1fr", gap: "36px", alignItems: "center" }}>
              <div className="cp-feat-left" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "20px" }}>
                <StatTile value="500K+" label="Leads Generated" delay={0} />
                <StatTile value="100K+" label="Followers" delay={0.06} />
              </div>
              <Reveal delay={0.1}>
                <PhoneMockup src={TEA_SCREENSHOT} alt="TEA (@tea_edu) Instagram growth screenshot" />
              </Reveal>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "20px" }}>
                <StatTile value="Organic" label="Marketing" delay={0.12} />
                <StatTile value="Forbes" label="Featured In" delay={0.18} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 05 — THE TRANSFORMATION */}
      <section id="shift" className="cp-section">
        <div className="cp-container">
          <SectionLabel eyebrow="The Transformation" title="Where They Started" gold="→ What We Did Differently" underline typewriter />
          <div style={{ maxWidth: "880px", margin: "0 auto" }}>
            <ResponsiveGrid cols={2} gap="1px" className="cp-shift-grid">
              <Reveal style={{ background: "#050A12", padding: "36px 32px", textAlign: "center" }}>
                <h4 style={{ fontSize: "12px", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.40)", marginBottom: "22px", fontFamily: "'Cinzel', serif" }}>Where They Started</h4>
                <PhoneMockup src={START_IMAGE} alt="Where TEA started — before CALIOON" />
              </Reveal>
              <Reveal delay={0.1} style={{ background: "#050A12", padding: "36px 32px", textAlign: "center" }}>
                <h4 style={{ fontSize: "12px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#c6a062", marginBottom: "22px", fontFamily: "'Cinzel', serif" }}>What We Did Differently</h4>
                <PhoneMockup src={GROWTH_IMAGE} alt="TEA's growth after CALIOON" />
              </Reveal>
            </ResponsiveGrid>
          </div>
        </div>
      </section>

      {/* SECTION 06 — STUDENT LEAD BANK */}
      <section id="leadbank" className="cp-section">
        <div className="cp-container">
          <SectionLabel eyebrow="Our Student Lead Bank" title="A Verified Pipeline," gold="Built to Scale" underline />
          <ResponsiveGrid cols={4} className="cp-bank-stats" >
            <StatTile value="50K+" label="Qualified Student Leads" delay={0} />
            <StatTile value="25+" label="Destination Countries" delay={0.06} />
            <StatTile value="92%" label="Verified Contact Accuracy" delay={0.12} />
            <StatTile value="Verified" label="Updated Regularly" delay={0.18} />
          </ResponsiveGrid>
          <div style={{ marginTop: "clamp(48px,6vw,72px)" }}>
            <style>{`@media(min-width:1024px){.cp-root .cp-breakdown-grid{grid-template-columns:repeat(3,1fr) !important;}}`}</style>
            <div className="cp-breakdown-grid" style={{ display: "grid", gridTemplateColumns: "1fr", gap: "40px" }}>
              <RadarChart title="Destination Preference" data={DESTINATIONS} delay={0} />
              <RadarChart title="Course Interests" data={COURSES} delay={0.15} />
              <RadarChart title="Student Level" data={LEVELS} delay={0.3} />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 07 — THE PROBLEM, OUR SOLUTION */}
      <section id="problem" className="cp-section">
        <div className="cp-container" style={{ maxWidth: "760px" }}>
          <Reveal>
            <span className="cp-eyebrow">The Problem, Our Solution</span>
            <div className="cp-ornament" style={{ marginTop: "12px", textAlign: "center" }}>⌜⌟⌜⌟⌜⌟&nbsp;&nbsp;&#9737;&nbsp;&nbsp;⌜⌟⌜⌟⌜⌟</div>
          </Reveal>
          <Reveal delay={0.08}>
            <p style={{ fontSize: "clamp(14px,1.8vw,18px)", lineHeight: 1.65, color: "rgba(255,255,255,0.80)", marginTop: "18px" }}>
              Most educational consultancies rely on outdated marketing or random posting, and wonder why they aren't getting consistent student inquiries.
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <p style={{ fontSize: "clamp(14px,1.8vw,18px)", lineHeight: 1.65, marginTop: "20px" }}>
              Students are now searching on Instagram. Trust is built through content and visibility — and the <span className="cp-gold-text" style={{ fontWeight: 600 }}>agencies with strong branding win the game!</span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* SECTION 08 — DOES YOUR BRAND SUFFER FROM... */}
      <section id="challenges" className="cp-section">
        <div className="cp-container">
          <SectionLabel eyebrow="A Familiar Story" title="Does Your Brand" gold="Suffer From This?" underline typewriter />
          {[CHALLENGES_GROUP_1, CHALLENGES_GROUP_2].map((group, gi) => (
            <div key={gi} style={{ marginBottom: gi === 0 ? "clamp(40px,6vw,64px)" : 0 }}>
              <style>{`@media(min-width:768px){.cp-root .cp-challenge-grid-${gi}{grid-template-columns:repeat(3,1fr) !important;}}`}</style>
              <div className={`cp-challenge-grid-${gi}`} style={{ display: "grid", gridTemplateColumns: "1fr", gap: "24px" }}>
                {group.map((c, i) => (
                  <Reveal key={c.t} delay={i * 0.06} style={{ border: "1px solid rgba(198,160,98,0.35)", padding: "32px 28px" }}>
                    <h4 style={{ fontSize: "17px", fontWeight: 600, color: "#c6a062", marginBottom: "12px", letterSpacing: "0.01em" }}>{c.t}</h4>
                    <p style={{ fontSize: "13.5px", lineHeight: 1.7, color: "rgba(255,255,255,0.50)" }}>{c.d}</p>
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 09 — WHAT WILL OUR STRATEGY DO */}
      <section id="strategy" className="cp-section">
        <div className="cp-container">
          <SectionLabel eyebrow="What Will Our Strategy Do?" title="Three Pillars Of" gold="The Acquisition Machine" underline />
          <ResponsiveGrid cols={3} className="cp-pillar-grid">
            {PILLARS.map((p, i) => (
              <Reveal key={p.t} delay={i * 0.08} style={{ border: "1px solid rgba(198,160,98,0.35)", padding: "32px 28px" }}>
                <div style={{ fontFamily: "'Cinzel', serif", color: "#c6a062", fontSize: "13px", marginBottom: "14px" }}>0{i + 1}</div>
                <h4 style={{ fontSize: "17px", fontWeight: 600, color: "#fdf0d5", marginBottom: "12px" }}>{p.t}</h4>
                <p style={{ fontSize: "13.5px", lineHeight: 1.7, color: "rgba(255,255,255,0.50)" }}>{p.d}</p>
              </Reveal>
            ))}
          </ResponsiveGrid>
        </div>
      </section>

      {/* SECTION 10 — OUR CONTENT STRATEGY */}
      <section id="content-strategy" className="cp-section">
        <div className="cp-container">
          <SectionLabel eyebrow="Our Content Strategy" title="Built On" gold="What Actually Converts" underline />
          <Reveal style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "12px" }}>
            {CONTENT_TAGS.map((tag) => <span key={tag} className="cp-pill">{tag}</span>)}
          </Reveal>
        </div>
      </section>

      {/* SECTION 11 — OUR CONTENT RESULTS */}
      <section id="content-results" className="cp-section">
        <div className="cp-container">
          <SectionLabel eyebrow="Our Content Results" title="5M Views" gold="Monthly" underline />
          <ResponsiveGrid cols={4} className="cp-content-stats">
            <StatTile value="5M" label="Views Monthly" delay={0} />
            <StatTile value="High" label="Engagement" delay={0.06} />
            <StatTile value="Direct" label="Lead Generation" delay={0.12} />
            <StatTile value="Organic" label="Growth" delay={0.18} />
          </ResponsiveGrid>
          <div style={{ marginTop: "clamp(40px,5vw,56px)" }}>
            <style>{`@media(min-width:640px){.cp-root .cp-post-grid{grid-template-columns:repeat(3,1fr) !important;}}@media(min-width:1024px){.cp-root .cp-post-grid{grid-template-columns:repeat(6,1fr) !important;}}`}</style>
            <div className="cp-post-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "14px" }}>
              {POSTS.map((v, i) => (
                <Reveal key={i} delay={i * 0.05} style={{ padding: "22px 10px", textAlign: "center" }}>
                  <span style={{ fontFamily: "'Cinzel', serif", fontWeight: 700, color: "#c6a062", fontSize: "19px", display: "block" }}>{v}</span>
                  <span style={{ fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.40)", marginTop: "6px", display: "block" }}>Views</span>
                </Reveal>
              ))}
            </div>
          </div>
          <div style={{ maxWidth: "600px", margin: "clamp(40px,5vw,56px) auto 0" }}>
            <ResponsiveGrid cols={2} className="cp-results-img-grid">
              <Reveal delay={0}>
                <PhoneMockup src={LIKE_IMAGE} alt="Instagram engagement screenshot" />
              </Reveal>
              <Reveal delay={0.08}>
                <PhoneMockup src={RESULT_IMAGE} alt="Content results screenshot" />
              </Reveal>
            </ResponsiveGrid>
          </div>
        </div>
      </section>

      {/* SECTION 12 — ROADMAP */}
      <section id="roadmap" className="cp-section">
        <div className="cp-container">
          <SectionLabel eyebrow="The System Behind The Results" title="Social Media Growth" gold="Roadmap" underline />
          <div style={{ maxWidth: "980px", margin: "0 auto", position: "relative" }}>
            <style>{`@media(min-width:900px){.cp-root .cp-roadmap-grid{grid-template-columns:repeat(5,1fr) !important;}.cp-root .cp-roadmap-connector{display:block !important;}}`}</style>
            <div className="cp-roadmap-connector" style={{ display: "none", position: "absolute", top: "46px", left: "9%", right: "9%", height: "1px", background: "linear-gradient(90deg, transparent, rgba(198,160,98,0.35) 10%, rgba(198,160,98,0.35) 90%, transparent)", zIndex: 0 }} />
            <div className="cp-roadmap-grid" style={{ display: "grid", gridTemplateColumns: "1fr", gap: "40px", position: "relative", zIndex: 1 }}>
              {ROADMAP.map((step, i) => (
                <Reveal key={step} delay={i * 0.08}>
                  <RoadmapNode index={i} title={step} />
                </Reveal>
              ))}
            </div>
          </div>
          <Reveal delay={0.3} style={{ textAlign: "center", marginTop: "clamp(40px,5vw,56px)" }}>
            <span style={{ fontFamily: "'Cinzel', serif", fontSize: "12px", letterSpacing: "0.20em", color: "rgba(198,160,98,0.55)", textTransform: "uppercase" }}>Calioon.com</span>
          </Reveal>
        </div>
      </section>

      {/* SECTION 13 — CLOSING */}
      <section style={{ position: "relative", padding: "clamp(64px,9vw,120px) 0", borderTop: "1px solid rgba(198,160,98,0.16)", textAlign: "center" }}>
        <div className="cp-container">
          <Reveal>
            <span className="cp-eyebrow">The Student Acquisition Machine&trade;</span>
            <div className="cp-ornament" style={{ marginTop: "12px" }}>⌜⌟⌜⌟⌜⌟&nbsp;&nbsp;&#9737;&nbsp;&nbsp;⌜⌟⌜⌟⌜⌟</div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 style={{ fontSize: "clamp(26px,4vw,42px)", fontWeight: 700, textTransform: "uppercase", lineHeight: 1.25, marginTop: "18px" }}>
              A Case Study In <span className="cp-gold-text">Category Leadership</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2} style={{ marginTop: "32px", display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>
            <a href="/#contact" className="cp-btn-primary">Enter The Empire</a>
            <a href="/" className="cp-btn-secondary">Back to Calioon.com</a>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}
