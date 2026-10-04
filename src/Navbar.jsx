import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import imgIcon from "./assets/images/icon.png";
import "./nav-footer.css";

// Extracted verbatim from App.jsx (previously a local const inside that file) so it can be
// imported both by the homepage (App.jsx) and by the standalone /portfolio page
// (src/Portfolio.jsx) without pulling in the rest of App.jsx's bundle. Rendered output and
// behavior on the homepage are unchanged — this is a relocation, not a redesign.
const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const menuItems = ["PHILOSOPHY", "DOMAINS", "OUR GODS", "PROCESS", "CASE STUDIES", "CONTACT"];
  // Navbar is also reused as-is on /portfolio (a separate static page, see src/Portfolio.jsx) —
  // on the homepage these links scroll in-page exactly as before; elsewhere they resolve back
  // to the homepage sections instead of silently doing nothing.
  const isHome = typeof window !== 'undefined' && window.location.pathname === '/';
  const toHome = (hash) => (isHome ? hash : `/${hash}`);

  useEffect(() => {
    const sectionIds = ['philosophy', 'domains', 'ourgods', 'process', 'casestudies', 'contact'];
    const observers = [];
    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.25, rootMargin: '-80px 0px -20% 0px' }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  const getHref = item => toHome(`#${item.toLowerCase().replaceAll(' ', '')}`);
  const isActive = item => {
    const map = { 'PHILOSOPHY':'philosophy', 'DOMAINS':'domains', 'OUR GODS':'ourgods', 'PROCESS':'process', 'CASE STUDIES':'casestudies', 'CONTACT':'contact' };
    return map[item] === activeSection;
  };

  return (
    <>
    <nav className="fixed top-0 left-0 w-full z-[100] h-[100px] border-b border-white/5 bg-[#050A12]/90 backdrop-blur-md">
      <div className="greek-stone-texture-overlay !opacity-[0.03]" />
      {/* 3-zone layout: brand | nav | cta — all zones explicit width so center is always truly centered */}
      <div className="calioon-global-container h-full flex items-center justify-between relative">

        {/* ── ZONE 1: BRAND (left) ── */}
        <div className="nav-brand-zone flex items-center justify-start flex-shrink-0">
          <a
            href={isHome ? "#" : "/"}
            className="flex items-center transition-opacity duration-300 hover:opacity-80"
            style={{ gap: '4px', textDecoration: 'none' }}
          >
            {/* Emblem — ES import guarantees path resolves at build time */}
            <img
              src={imgIcon}
              alt=""
              aria-hidden="true"
              style={{
                height: '55px',
                width: '55px',
                display: 'block',
                flexShrink: 0,
                objectFit: 'contain',
                filter: 'drop-shadow(0 0 6px rgba(198,160,98,0.40)) drop-shadow(0 0 2px rgba(198,160,98,0.20)) drop-shadow(0 1px 3px rgba(0,0,0,0.50))',
              }}
            />
            {/* Thin gold rule between emblem and wordmark */}
            <span
              aria-hidden="true"
              style={{
                display: 'block',
                width: '1px',
                height: '20px',
                flexShrink: 0,
                background: 'linear-gradient(to bottom, transparent 0%, rgba(198,160,98,0.38) 40%, rgba(198,160,98,0.38) 60%, transparent 100%)',
              }}
            />
            <span style={{
              fontFamily: "'Montserrat', 'Helvetica Neue', Arial, sans-serif",
              fontWeight: 800,
              fontSize: '24px',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#F2EDE4',
              textShadow: '0 0 28px rgba(198,160,98,0.12)',
              lineHeight: 1,
              paddingLeft: '2px',
            }}>CALIOON</span>
          </a>
        </div>

        {/* ── ZONE 2: NAV LINKS (center — Greek style) ── */}
        <nav className="nav-links-zone hidden lg:flex items-center h-full" style={{ gap: '32px' }} aria-label="Primary navigation">
          {menuItems.map(item => {
            const active = isActive(item);
            return (
              <a
                key={item}
                href={getHref(item)}
                style={{
                  fontFamily:"'Cinzel', serif",
                  fontSize:'12px',
                  fontWeight: active ? 700 : 600,
                  letterSpacing:'0.20em',
                  textTransform:'uppercase',
                  color: active ? 'rgba(255,232,140,0.95)' : 'rgba(212,175,106,0.55)',
                  textDecoration:'none',
                  position:'relative',
                  display:'flex', alignItems:'center', height:'100%',
                  transition:'color 0.25s ease, font-weight 0.25s ease',
                  whiteSpace:'nowrap',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = 'rgba(255,232,140,0.95)';
                  e.currentTarget.querySelector('span').style.opacity = '1';
                  e.currentTarget.querySelector('span').style.width = '100%';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = active ? 'rgba(255,232,140,0.95)' : 'rgba(212,175,106,0.55)';
                  e.currentTarget.querySelector('span').style.opacity = active ? '1' : '0.28';
                  e.currentTarget.querySelector('span').style.width = active ? '100%' : '40%';
                }}
              >
                {item}
                {/* Underline — active: full gold, rest: dim partial */}
                <span style={{
                  position:'absolute', bottom:'24px', left:'50%', transform:'translateX(-50%)',
                  height:'1px', width: active ? '100%' : '40%', opacity: active ? '1' : '0.28',
                  background:'linear-gradient(90deg, transparent, rgba(212,175,106,1), transparent)',
                  transition:'width 0.30s ease, opacity 0.30s ease',
                  pointerEvents:'none',
                }} />
              </a>
            );
          })}
        </nav>

        {/* ── ZONE 3: CTA BUTTON — chamfered imperial ── */}
        <div className="nav-cta-zone hidden lg:flex items-center justify-end flex-shrink-0" style={{ width: '240px' }}>
          <a href={toHome('#contact')} className="nav-cta-link" style={{
            position:'relative', display:'inline-flex', alignItems:'center', justifyContent:'center',
            height:'46px', padding:'0 28px', textDecoration:'none',
            background:'linear-gradient(135deg, #C8A030 0%, #E8C860 35%, #D4AF50 60%, #A07820 100%)',
            clipPath:'polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)',
            fontFamily:"'Cinzel',serif", fontSize:'11px', fontWeight:800,
            letterSpacing:'0.24em', textTransform:'uppercase', whiteSpace:'nowrap',
            color:'#04080F',
            boxShadow:'0 4px 24px rgba(212,175,106,0.35), 0 1px 6px rgba(212,175,106,0.20)',
            transition:'filter 0.22s ease, box-shadow 0.22s ease, transform 0.18s ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.filter='brightness(1.12) saturate(1.10)';
            e.currentTarget.style.transform='translateY(-2px)';
            e.currentTarget.style.boxShadow='0 8px 32px rgba(212,175,106,0.50), 0 2px 10px rgba(212,175,106,0.30)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.filter='brightness(1) saturate(1)';
            e.currentTarget.style.transform='translateY(0)';
            e.currentTarget.style.boxShadow='0 4px 24px rgba(212,175,106,0.35), 0 1px 6px rgba(212,175,106,0.20)';
          }}
          >
            {/* Shimmer sweep */}
            <span aria-hidden="true" style={{
              position:'absolute', inset:0,
              background:'linear-gradient(105deg, transparent 25%, rgba(255,255,255,0.22) 50%, transparent 75%)',
              animation:'empireSubmitShimmer 2.8s ease-in-out 0.6s infinite',
              pointerEvents:'none',
            }} />
            <span style={{ position:'relative', zIndex:1 }}>ENTER THE EMPIRE</span>
          </a>
        </div>

        {/* ── MOBILE HAMBURGER ── */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden flex flex-col z-50 focus:outline-none ml-auto"
          style={{ gap: '6px', width: '24px' }}
          aria-label="Open menu"
        >
          <span className={`block h-0.5 bg-[#c6a062] transition-all duration-300 w-6 ${mobileOpen ? 'rotate-45 translate-y-[8px]' : ''}`} />
          <span className={`block h-0.5 bg-[#c6a062] transition-all duration-200 w-5 ${mobileOpen ? 'opacity-0 w-0' : ''}`} />
          <span className={`block h-0.5 bg-[#c6a062] transition-all duration-300 w-6 ${mobileOpen ? '-rotate-45 -translate-y-[8px]' : ''}`} />
        </button>
      </div>
    </nav>

    <AnimatePresence>
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28 }}
          onClick={() => setMobileOpen(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: 'rgba(4,8,15,0.93)',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative', width: '100%', maxWidth: '520px',
              padding: 'clamp(36px,6vw,64px) clamp(24px,5vw,48px)',
              textAlign: 'center',
            }}
          >
            {/* Close */}
            <button
              onClick={() => setMobileOpen(false)}
              aria-label="Close navigation"
              style={{
                position: 'absolute', top: 0, right: 'clamp(20px,4vw,40px)',
                background: 'none', border: 'none', cursor: 'pointer',
                color: 'rgba(198,160,98,0.55)', fontSize: '20px',
                fontFamily: "'Cinzel',serif", lineHeight: 1, padding: '6px',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={e => e.currentTarget.style.color = '#c6a062'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(198,160,98,0.55)'}
            >✕</button>

            {/* Eyebrow */}
            <div style={{ marginBottom: 'clamp(24px,4vw,40px)' }}>
              <span style={{
                fontFamily: "'Cinzel',serif", fontSize: 'clamp(8px,1.8vw,11px)',
                letterSpacing: '0.32em', color: 'rgba(198,160,98,0.55)',
                textTransform: 'uppercase', display: 'block',
              }}>THE PILLARS OF CALIOON</span>
              <div style={{
                margin: '10px auto 0', height: '1px', width: '60px',
                background: 'linear-gradient(90deg,transparent,rgba(198,160,98,0.60),transparent)',
              }} />
            </div>

            {/* Nav items */}
            <nav>
              {menuItems.map((item, i) => (
                <motion.a
                  key={item}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.30, delay: 0.08 + i * 0.055, ease: [0.16, 1, 0.3, 1] }}
                  href={toHome(`#${item.toLowerCase().replaceAll(' ', '')}`)}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    display: 'block', width: '100%',
                    background: 'none', border: 'none', cursor: 'pointer',
                    fontFamily: "'Cinzel',serif",
                    fontSize: 'clamp(14px,3.2vw,20px)',
                    letterSpacing: '0.16em', textTransform: 'uppercase',
                    color: 'rgba(253,240,213,0.82)',
                    padding: 'clamp(12px,2.4vw,18px) 0',
                    borderBottom: i < menuItems.length - 1 ? '1px solid rgba(198,160,98,0.10)' : 'none',
                    transition: 'color 0.22s ease, letter-spacing 0.22s ease',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#c6a062'; e.currentTarget.style.letterSpacing = '0.22em'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'rgba(253,240,213,0.82)'; e.currentTarget.style.letterSpacing = '0.16em'; }}
                >
                  {item}
                </motion.a>
              ))}
            </nav>

            {/* Bottom ornament */}
            <div style={{
              marginTop: 'clamp(20px,3.5vw,32px)',
              color: 'rgba(198,160,98,0.35)', fontSize: '13px',
              letterSpacing: '0.05em', fontFamily: 'monospace',
            }}>⌜⌟⌜⌟⌜⌟   ⊙   ⌜⌟⌜⌟⌜⌟</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
};

export default Navbar;
