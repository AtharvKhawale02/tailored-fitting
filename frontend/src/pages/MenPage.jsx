import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const FONT_URL =
  'https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Inter:wght@300;400;500;600&display=swap'

/* ── Shirt data — hardcoded so page works immediately ── */
const SHIRTS = [
  {
    id: 1,
    name: 'Classic Oxford',
    desc: 'Timeless formal weave, structured perfection',
    fabric: 'Oxford Weave',
    tags: ['Formal', 'Cotton'],
    price: '₹1,299',
    swatch: 'linear-gradient(145deg,#1A2A3A 0%,#243A50 60%,#1A2A3A 100%)',
    pattern: 'repeating-linear-gradient(0deg,transparent 0px,transparent 3px,rgba(255,255,255,0.07) 3px,rgba(255,255,255,0.07) 4px),repeating-linear-gradient(90deg,transparent 0px,transparent 3px,rgba(255,255,255,0.07) 3px,rgba(255,255,255,0.07) 4px)',
  },
  {
    id: 2,
    name: 'Slim Fit Linen',
    desc: 'Breathable summer elegance, relaxed drape',
    fabric: 'Premium Linen',
    tags: ['Casual', 'Linen'],
    price: '₹1,499',
    swatch: 'linear-gradient(145deg,#5C3D1E 0%,#7A5230 60%,#5C3D1E 100%)',
    pattern: 'repeating-linear-gradient(135deg,transparent 0px,transparent 6px,rgba(255,255,255,0.06) 6px,rgba(255,255,255,0.06) 7px)',
  },
  {
    id: 3,
    name: 'Casual Check',
    desc: 'Weekend comfort with artisan character',
    fabric: 'Brushed Check',
    tags: ['Casual', 'Wool Blend'],
    price: '₹1,199',
    swatch: 'linear-gradient(145deg,#1E3A24 0%,#2A5030 60%,#1E3A24 100%)',
    pattern: 'repeating-linear-gradient(0deg,transparent 0px,transparent 10px,rgba(255,255,255,0.07) 10px,rgba(255,255,255,0.07) 20px),repeating-linear-gradient(90deg,transparent 0px,transparent 10px,rgba(255,255,255,0.07) 10px,rgba(255,255,255,0.07) 20px)',
  },
  {
    id: 4,
    name: 'Formal White',
    desc: 'Crisp ceremonial perfection, pure finish',
    fabric: 'Egyptian Cotton',
    tags: ['Formal', 'Cotton'],
    price: '₹1,699',
    swatch: 'linear-gradient(145deg,#3A3830 0%,#524E44 60%,#3A3830 100%)',
    pattern: 'repeating-linear-gradient(45deg,transparent 0px,transparent 5px,rgba(255,255,255,0.06) 5px,rgba(255,255,255,0.06) 6px)',
  },
  {
    id: 5,
    name: 'Mandarin Collar',
    desc: 'Contemporary eastern fusion, modern silhouette',
    fabric: 'Silk Blend',
    tags: ['Fusion', 'Silk'],
    price: '₹1,899',
    swatch: 'linear-gradient(145deg,#3A1A3A 0%,#52265A 60%,#3A1A3A 100%)',
    pattern: 'repeating-linear-gradient(60deg,transparent 0px,transparent 8px,rgba(255,255,255,0.07) 8px,rgba(255,255,255,0.07) 9px)',
  },
  {
    id: 6,
    name: 'Royal Kurta',
    desc: 'Regal traditional artistry, heritage crafted',
    fabric: 'Chanderi Silk',
    tags: ['Traditional', 'Festive'],
    price: '₹2,499',
    swatch: 'linear-gradient(145deg,#3A2C0A 0%,#5A4418 60%,#3A2C0A 100%)',
    pattern: 'repeating-linear-gradient(0deg,transparent 0px,transparent 4px,rgba(201,168,76,0.12) 4px,rgba(201,168,76,0.12) 5px),repeating-linear-gradient(90deg,transparent 0px,transparent 4px,rgba(201,168,76,0.12) 4px,rgba(201,168,76,0.12) 5px)',
  },
]

const FILTERS = ['All', 'Formal', 'Casual', 'Fusion', 'Traditional']

export default function MenPage() {
  const navigate        = useNavigate()
  const [filter, setFilter]   = useState('All')
  const [toast, setToast]     = useState(null)
  const [hoveredId, setHover] = useState(null)

  // load fonts
  useEffect(() => {
    if (document.querySelector(`link[href="${FONT_URL}"]`)) return
    const l = document.createElement('link')
    l.rel = 'stylesheet'; l.href = FONT_URL
    document.head.appendChild(l)
  }, [])

  const filtered = filter === 'All'
    ? SHIRTS
    : SHIRTS.filter(s => s.tags.includes(filter))

  const handleCustomize = (name) => {
    setToast(name)
    setTimeout(() => setToast(null), 2800)
  }

  return (
    <>
      <style>{`
        @keyframes mpFadeDown { from{opacity:0;transform:translateY(-18px)} to{opacity:1;transform:translateY(0)} }
        @keyframes mpStagger  { from{opacity:0;transform:translateY(38px) scale(0.96)} to{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes mpShimmer  { 0%{background-position:-300% center} 100%{background-position:300% center} }
        @keyframes mpToast    { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
        @keyframes mpSpin     { to{transform:rotate(360deg)} }

        .mp-d1 { animation: mpFadeDown 0.55s ease 0.05s both; }
        .mp-d2 { animation: mpFadeDown 0.55s ease 0.12s both; }
        .mp-d3 { animation: mpFadeDown 0.55s ease 0.2s  both; }
        .mp-d4 { animation: mpFadeDown 0.55s ease 0.28s both; }

        .mp-shimmer {
          background: linear-gradient(90deg,#7a5c1e 0%,#B8922A 20%,#D4A93C 40%,#B8922A 60%,#E8C96A 78%,#7a5c1e 100%);
          background-size:300% auto;
          -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
          animation: mpShimmer 4s linear infinite;
        }

        .mp-back:hover {
          background:rgba(232,201,106,0.1) !important;
          border-color:rgba(232,201,106,0.7) !important;
          color:rgba(232,201,106,1) !important;
        }
        .mp-back:hover .mp-arrow-icon { transform:translateX(-4px); }
        .mp-arrow-icon { display:inline-block; transition:transform 0.25s ease; }

        .mp-pill:hover { background:#1A1F2E !important; border-color:#1A1F2E !important; color:rgba(232,201,106,0.9) !important; }
        .mp-pill-on    { background:#1A1F2E !important; border-color:#1A1F2E !important; color:rgba(232,201,106,0.9) !important; }

        .mp-card {
          background:#fff;
          border:1px solid rgba(184,146,42,0.18);
          border-radius:6px;
          overflow:hidden;
          transition:transform 0.32s cubic-bezier(0.25,0.46,0.45,0.94),
                     box-shadow 0.32s ease, border-color 0.25s ease;
          cursor:pointer;
        }
        .mp-card:hover {
          transform:translateY(-9px);
          box-shadow:0 0 0 1.5px rgba(184,146,42,0.45), 0 20px 55px rgba(90,70,30,0.16);
          border-color:rgba(184,146,42,0.5);
        }
        .mp-card:hover .mp-name { color:#B8922A !important; }
        .mp-card:hover .mp-cta  { background:#1A1F2E !important; color:rgba(232,201,106,0.9) !important; border-color:#1A1F2E !important; }

        .mp-cta {
          width:100%; padding:11px; background:transparent;
          border:1px solid rgba(184,146,42,0.32); border-radius:2px;
          color:#8B6F3E; font-size:0.72rem; letter-spacing:0.18em;
          text-transform:uppercase; cursor:pointer;
          font-family:'Inter',sans-serif;
          transition:all 0.28s ease;
        }

        .mp-toast { animation: mpToast 0.3s ease both; }

        @media(max-width:640px){
          .mp-grid { grid-template-columns:1fr !important; }
          .mp-nav  { padding:1rem 1.2rem !important; }
          .mp-bc   { display:none !important; }
        }
        @media(max-width:900px){
          .mp-grid { grid-template-columns:repeat(2,1fr) !important; }
        }
      `}</style>

      <div style={{ background:'#FAF7F2', minHeight:'100vh', fontFamily:"'Inter',sans-serif", color:'#1A1F2E' }}>

        {/* ── Navbar ── */}
        <nav className="mp-nav" style={{ display:'flex', alignItems:'center', justifyContent:'space-between',
          padding:'1.4rem 2.5rem', background:'#1A1F2E' }}>

          <button className="mp-back" onClick={() => navigate('/')}
            style={{ display:'inline-flex', alignItems:'center', gap:8,
              padding:'8px 18px', background:'transparent',
              border:'1px solid rgba(232,201,106,0.28)', borderRadius:2,
              color:'rgba(232,201,106,0.75)', fontSize:'0.7rem',
              letterSpacing:'0.18em', textTransform:'uppercase',
              cursor:'pointer', fontFamily:"'Inter',sans-serif",
              transition:'all 0.25s ease' }}>
            <span className="mp-arrow-icon">←</span> Back
          </button>

          <span className="mp-shimmer" style={{
            fontFamily:"'Cinzel',serif",
            fontSize:'clamp(0.9rem,2.5vw,1.2rem)',
            letterSpacing:'0.22em', fontWeight:700 }}>
            TailorEdFitting
          </span>

          <span className="mp-bc" style={{ fontSize:'0.65rem', letterSpacing:'0.18em',
            textTransform:'uppercase', color:'rgba(255,255,255,0.28)',
            fontFamily:"'Inter',sans-serif" }}>
            Men's Collection
          </span>
        </nav>

        {/* ── Page header ── */}
        <header style={{ textAlign:'center', padding:'3rem 2rem 1.5rem' }}>

          <div className="mp-d1" style={{ display:'flex', alignItems:'center',
            justifyContent:'center', gap:'1rem', marginBottom:'1rem' }}>
            <div style={{ width:36, height:1, background:'linear-gradient(90deg,transparent,#B8922A)' }} />
            <span style={{ fontSize:'0.62rem', letterSpacing:'0.28em', textTransform:'uppercase',
              color:'#8B6F3E', fontFamily:"'Inter',sans-serif" }}>
              Men's Collection · Season 2026
            </span>
            <div style={{ width:36, height:1, background:'linear-gradient(90deg,#B8922A,transparent)' }} />
          </div>

          <h2 className="mp-d2" style={{ fontFamily:"'Cinzel',serif",
            fontSize:'clamp(1.6rem,4vw,2.6rem)', fontWeight:700,
            letterSpacing:'0.18em', color:'#1A1F2E', margin:0 }}>
            Select Your Style
          </h2>

          <p className="mp-d3" style={{ fontFamily:"'Cormorant Garamond',serif",
            fontSize:'1.05rem', color:'#5C4A2A', letterSpacing:'0.06em',
            fontStyle:'italic', marginTop:'0.5rem' }}>
            Each piece crafted to your exact measurements
          </p>

          <div className="mp-d3" style={{ width:60, height:2, background:'#B8922A',
            margin:'1.2rem auto 0', borderRadius:1 }} />
        </header>

        {/* ── Filter bar ── */}
        <div className="mp-d4" style={{ display:'flex', flexWrap:'wrap', alignItems:'center',
          gap:'0.6rem', padding:'1.6rem 2.5rem', maxWidth:1200, margin:'0 auto' }}>
          {FILTERS.map(f => (
            <button key={f}
              className={`mp-pill ${filter === f ? 'mp-pill-on' : ''}`}
              onClick={() => setFilter(f)}
              style={{ padding:'7px 18px', border:'1px solid rgba(184,146,42,0.22)',
                borderRadius:2, background:'transparent', fontSize:'0.68rem',
                letterSpacing:'0.15em', textTransform:'uppercase', cursor:'pointer',
                fontFamily:"'Inter',sans-serif", color:'#8B6F3E',
                transition:'all 0.22s ease' }}>
              {f}
            </button>
          ))}
          <span style={{ marginLeft:'auto', fontFamily:"'Cormorant Garamond',serif",
            fontSize:'0.9rem', color:'#9A9080', fontStyle:'italic' }}>
            {filtered.length} styles
          </span>
        </div>

        {/* ── Grid ── */}
        <div className="mp-grid" style={{
          display:'grid',
          gridTemplateColumns:'repeat(3,1fr)',
          gap:'1.5rem',
          padding:'0 2.5rem 2rem',
          maxWidth:1200,
          margin:'0 auto',
        }}>
          {filtered.map((shirt, i) => (
            <div key={shirt.id}
              className="mp-card"
              style={{ animation:`mpStagger 0.55s cubic-bezier(0.25,0.46,0.45,0.94) ${i * 80}ms both` }}>

              {/* ── Swatch ── */}
              <div style={{ height:175, position:'relative', overflow:'hidden',
                background:shirt.swatch }}>
                {/* fabric weave pattern */}
                <div style={{ position:'absolute', inset:0, backgroundImage:shirt.pattern, zIndex:1 }} />
                {/* bottom fade */}
                <div style={{ position:'absolute', inset:0, zIndex:2,
                  background:'linear-gradient(180deg,transparent 40%,rgba(0,0,0,0.55) 100%)' }} />
                {/* card number */}
                <span style={{ position:'absolute', top:12, right:14, zIndex:3,
                  fontFamily:"'Cinzel',serif", fontSize:'0.65rem',
                  color:'rgba(255,255,255,0.3)', letterSpacing:'0.1em' }}>
                  0{i + 1}
                </span>
                {/* fabric badge */}
                <span style={{ position:'absolute', bottom:12, left:12, zIndex:3,
                  padding:'4px 10px',
                  background:'rgba(0,0,0,0.55)',
                  border:'1px solid rgba(255,255,255,0.15)',
                  borderRadius:2,
                  fontSize:'0.6rem', letterSpacing:'0.16em',
                  color:'rgba(255,255,255,0.85)', textTransform:'uppercase',
                  fontFamily:"'Inter',sans-serif" }}>
                  {shirt.fabric}
                </span>
              </div>

              {/* ── Body ── */}
              <div style={{ padding:'1.3rem 1.4rem 0.8rem' }}>
                <h3 className="mp-name" style={{ fontFamily:"'Cinzel',serif",
                  fontSize:'1rem', fontWeight:600, color:'#1A1F2E',
                  letterSpacing:'0.06em', margin:'0 0 0.35rem',
                  transition:'color 0.28s ease' }}>
                  {shirt.name}
                </h3>
                <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'0.92rem',
                  color:'#5C4A2A', letterSpacing:'0.03em', fontStyle:'italic', margin:0 }}>
                  {shirt.desc}
                </p>

                {/* tags + price row */}
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between',
                  marginTop:'0.9rem', flexWrap:'wrap', gap:6 }}>
                  <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
                    {shirt.tags.map(t => (
                      <span key={t} style={{ padding:'3px 8px',
                        border:'1px solid rgba(184,146,42,0.22)', borderRadius:2,
                        fontSize:'0.6rem', letterSpacing:'0.12em', color:'#8B6F3E',
                        textTransform:'uppercase', fontFamily:"'Inter',sans-serif" }}>
                        {t}
                      </span>
                    ))}
                  </div>
                  <span style={{ fontFamily:"'Cinzel',serif", fontSize:'0.85rem',
                    color:'#B8922A', fontWeight:600, letterSpacing:'0.05em' }}>
                    {shirt.price}
                  </span>
                </div>
              </div>

              {/* divider */}
              <div style={{ height:1, background:'linear-gradient(90deg,transparent,rgba(184,146,42,0.2),transparent)', margin:'0.9rem 0 0' }} />

              {/* ── CTA ── */}
              <div style={{ padding:'0.9rem 1.4rem 1.3rem' }}>
                <button className="mp-cta" onClick={() => handleCustomize(shirt.name)}>
                  Customize This Style
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* ── Footer ── */}
        <div style={{ textAlign:'center', padding:'1.5rem 2rem 3rem' }}>
          <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'0.9rem',
            color:'#9A9080', letterSpacing:'0.06em', fontStyle:'italic' }}>
            All garments made to your measurements · Free alterations · Premium quality guaranteed
          </p>
        </div>

      </div>

      {/* ── Toast ── */}
      {toast && (
        <div className="mp-toast" style={{ position:'fixed', bottom:'2rem', right:'2rem',
          background:'#1A1F2E', border:'1px solid rgba(184,146,42,0.4)',
          borderRadius:4, padding:'1rem 1.5rem', zIndex:1000,
          boxShadow:'0 8px 32px rgba(0,0,0,0.18)', minWidth:220 }}>
          <p style={{ fontFamily:"'Inter',sans-serif", fontSize:'0.7rem',
            letterSpacing:'0.12em', color:'rgba(232,201,106,0.7)', margin:0 }}>
            Opening customizer for
          </p>
          <p style={{ fontFamily:"'Cinzel',serif", fontSize:'1rem',
            color:'#fff', margin:'4px 0 0', letterSpacing:'0.05em' }}>
            {toast}
          </p>
        </div>
      )}
    </>
  )
}