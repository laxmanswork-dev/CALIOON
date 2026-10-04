import imgIcon from "./assets/images/icon.png";
import "./nav-footer.css";

// Extracted verbatim from App.jsx (previously a local const inside that file) — see the
// matching comment in src/Navbar.jsx for why.
const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const isHome = typeof window !== 'undefined' && window.location.pathname === '/';

  return (
    <footer className="bg-[#050A12] border-t border-[#c6a062]/20 relative z-10 footer-greek-keyline" style={{ paddingTop:'48px', paddingBottom:'32px' }}>
      <div className="greek-stone-texture-overlay" />
      <div className="calioon-global-container relative z-10">

        {/* ── Top row: brand + back-to-top ── */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 w-full mb-8">
          {/* Brand + social links */}
          <div style={{ display:'flex', flexDirection:'column', gap:'16px' }}>
            <a href={isHome ? "#" : "/"} className="flex items-center" style={{ gap:'6px', textDecoration:'none' }}>
              <img src={imgIcon} alt="" aria-hidden="true"
                style={{ height:'38px', width:'38px', objectFit:'contain',
                  filter:'drop-shadow(0 0 6px rgba(198,160,98,0.35))' }} />
              <span style={{
                fontFamily:"'Montserrat',sans-serif", fontWeight:600, fontSize:'18px',
                letterSpacing:'0.05em', textTransform:'uppercase', color:'#F2EDE4', lineHeight:1,
              }}>CALIOON</span>
            </a>

            {/* Social links */}
            <div style={{ display:'flex', gap:'10px', flexWrap:'wrap' }}>
              {[
                {
                  name: 'LinkedIn',
                  href: 'https://www.linkedin.com/company/calioon/',
                  icon: (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink:0 }}>
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  ),
                },
                {
                  name: 'Instagram',
                  href: 'https://www.instagram.com/officialcalioon?igsh=MWJ5cHhqd3Y1OHhudw%3D%3D&utm_source=qr',
                  icon: (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink:0 }}>
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                    </svg>
                  ),
                },
              ].map(({ name, href, icon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '7px',
                    border: '1px solid rgba(198,160,98,0.35)',
                    padding: '7px 14px', textDecoration: 'none',
                    fontFamily: "'Cinzel',serif", fontSize: '10px',
                    letterSpacing: '0.18em', textTransform: 'uppercase',
                    color: 'rgba(198,160,98,0.65)',
                    transition: 'color 0.22s ease, border-color 0.22s ease, background 0.22s ease',
                    background: 'rgba(198,160,98,0.04)',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color='rgba(198,160,98,1)'; e.currentTarget.style.borderColor='rgba(198,160,98,0.70)'; e.currentTarget.style.background='rgba(198,160,98,0.08)'; }}
                  onMouseLeave={e => { e.currentTarget.style.color='rgba(198,160,98,0.65)'; e.currentTarget.style.borderColor='rgba(198,160,98,0.35)'; e.currentTarget.style.background='rgba(198,160,98,0.04)'; }}
                >
                  {icon}
                  {name}
                </a>
              ))}
            </div>
          </div>

          {/* Back to top */}
          <button onClick={scrollToTop} aria-label="Back to top"
            style={{
              display:'flex', alignItems:'center', gap:'8px',
              fontFamily:"'Cinzel',serif", fontSize:'10px', letterSpacing:'0.22em',
              textTransform:'uppercase', color:'rgba(198,160,98,0.50)',
              background:'none', border:'none', cursor:'pointer', padding:0,
              transition:'color 0.22s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.color='rgba(198,160,98,0.90)'}
            onMouseLeave={e => e.currentTarget.style.color='rgba(198,160,98,0.50)'}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 13 L8 3 M4 7 L8 3 L12 7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            BACK TO TOP
          </button>
        </div>

        {/* ── Divider ── */}
        <div style={{ height:'1px', background:'linear-gradient(90deg, transparent, rgba(198,160,98,0.20), transparent)', marginBottom:'20px' }} />

        {/* ── Bottom row: links + copyright ── */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 w-full">
          {/* Legal links + contact */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start" style={{ gap:'6px 20px' }}>
            {[
              { label:'Privacy Policy', href:'/privacy' },
              { label:'Terms of Service', href:'/terms' },
              { label:'calioon.global@gmail.com', href:'mailto:calioon.global@gmail.com' },
            ].map((link, i) => (
              <a key={i} href={link.href} className="footer-legal-link"
                style={{
                  fontFamily:"'Cinzel',serif", fontSize:'9.5px', letterSpacing:'0.18em',
                  textTransform:'uppercase', color:'rgba(198,160,98,0.38)', textDecoration:'none',
                  transition:'color 0.22s ease',
                }}
                onMouseEnter={e => e.currentTarget.style.color='rgba(198,160,98,0.75)'}
                onMouseLeave={e => e.currentTarget.style.color='rgba(198,160,98,0.38)'}
              >{link.label}</a>
            ))}
          </div>

          {/* Copyright */}
          <p style={{
            fontFamily:"'Cinzel',serif", fontSize:'9.5px', letterSpacing:'0.18em',
            textTransform:'uppercase', color:'rgba(255,255,255,0.20)', margin:0, textAlign:'center', padding:'0 8px',
          }}>
            © {new Date().getFullYear()} CALIOON COLLECTIVE. AD OLYMPUM.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
