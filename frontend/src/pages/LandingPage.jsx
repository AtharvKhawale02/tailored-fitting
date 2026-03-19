import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const FONT_URL =
  'https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Inter:wght@300;400;500;600&display=swap'

const TICKER = [
  'Oxford Weave','Premium Linen','Slim Fit','Bespoke Tailoring',
  'Chanderi Silk','Made to Measure','Royal Kurta','Custom Fit','Artisan Craft',
]

const STATS = [
  { n:'500+', l:'Fabrics' },
  { n:'12+',  l:'Garment Types' },
  { n:'100%', l:'Custom Fit' },
  { n:'14–21',l:'Day Delivery' },
]

export default function LandingPage() {
  const navigate   = useNavigate()
  const [exit, setExit] = useState(false)

  // load Google Fonts
  useEffect(() => {
    if (document.querySelector(`link[href="${FONT_URL}"]`)) return
    const l = document.createElement('link')
    l.rel  = 'stylesheet'
    l.href = FONT_URL
    document.head.appendChild(l)
  }, [])

  const handleMenClick = () => {
    setExit(true)
    setTimeout(() => navigate('/men'), 380)
  }

  return (
    <>
      <style>{`
        @keyframes fadeUp   { from{opacity:0;transform:translateY(32px)} to{opacity:1;transform:translateY(0)} }
        @keyframes exitUp   { from{opacity:1;transform:translateY(0)}    to{opacity:0;transform:translateY(-36px)} }
        @keyframes shimmer  { 0%{background-position:-300% center} 100%{background-position:300% center} }
        @keyframes ticker   { from{transform:translateX(0)} to{transform:translateX(-50%)} }

        .lp-wrap { animation: fadeUp 0.6s ease both; }
        .lp-exit { animation: exitUp 0.38s ease forwards; pointer-events:none; }
        .lp-d1   { animation: fadeUp 0.6s ease 0.08s both; }
        .lp-d2   { animation: fadeUp 0.6s ease 0.18s both; }
        .lp-d3   { animation: fadeUp 0.6s ease 0.28s both; }
        .lp-d4   { animation: fadeUp 0.6s ease 0.38s both; }

        .lp-brand {
          font-family:'Cinzel',serif;
          background:linear-gradient(90deg,#7a5c1e 0%,#B8922A 20%,#D4A93C 40%,#B8922A 60%,#E8C96A 78%,#7a5c1e 100%);
          background-size:300% auto;
          -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
          animation: shimmer 4s linear infinite;
        }
        .lp-ticker { animation: ticker 26s linear infinite; display:inline-block; }

        .lp-men {
          border:1px solid rgba(184,146,42,0.25);
          box-shadow:0 4px 24px rgba(90,70,30,0.1);
          transition:transform 0.38s cubic-bezier(0.25,0.46,0.45,0.94),
                     box-shadow 0.38s ease, border-color 0.28s ease;
          cursor:pointer;
        }
        .lp-men:hover {
          transform:translateY(-10px) scale(1.025);
          box-shadow:0 0 0 1.5px rgba(184,146,42,0.55),0 24px 60px rgba(90,70,30,0.2);
          border-color:rgba(184,146,42,0.7);
        }
        .lp-men:active { transform:scale(0.985); }
        .lp-men:hover .lp-arrow { transform:translateX(6px); }
        .lp-arrow { display:inline-block; transition:transform 0.28s ease; font-size:1.1rem; }

        .lp-women {
          border:1px solid rgba(150,130,110,0.18);
          cursor:not-allowed;
          opacity:0.62;
          filter:grayscale(0.35);
        }

        @media(max-width:680px){
          .lp-cards{ flex-direction:column !important; align-items:center !important; }
          .lp-card { width:100% !important; max-width:360px; }
        }
      `}</style>

      {/* ROOT */}
      <div style={{ background:'#FAF7F2', minHeight:'100vh', fontFamily:"'Inter',sans-serif", overflowX:'hidden' }}>
        <div className={exit ? 'lp-exit' : 'lp-wrap'}>

          {/* ── Top bar ── */}
          <div style={{ background:'#1A1F2E', padding:'10px 2rem', textAlign:'center' }}>
            <span style={{ fontSize:'0.7rem', letterSpacing:'0.2em', textTransform:'uppercase',
              color:'rgba(232,201,106,0.85)', fontFamily:"'Inter',sans-serif" }}>
              Free consultations · Made to measure · 14–21 day delivery
            </span>
          </div>

          {/* ── Ticker ── */}
          <div style={{ background:'#EDE7DC', overflow:'hidden', whiteSpace:'nowrap',
            padding:'9px 0', borderBottom:'1px solid rgba(184,146,42,0.15)' }}>
            <div className="lp-ticker">
              {[...TICKER,...TICKER].map((t,i)=>(
                <span key={i} style={{ display:'inline-block', fontSize:'0.62rem',
                  letterSpacing:'0.28em', textTransform:'uppercase', color:'#8B6F3E',
                  padding:'0 1.8rem', fontFamily:"'Inter',sans-serif" }}>
                  {t}<span style={{ color:'#B8922A', marginLeft:'1.8rem', opacity:0.5 }}>·</span>
                </span>
              ))}
            </div>
          </div>

          {/* ── Header ── */}
          <header style={{ textAlign:'center', padding:'3.5rem 2rem 2rem' }}>

            <div className="lp-d1" style={{ display:'flex', alignItems:'center',
              justifyContent:'center', gap:'1rem', marginBottom:'1.2rem' }}>
              <div style={{ width:40, height:1, background:'linear-gradient(90deg,transparent,#B8922A)' }} />
              <span style={{ fontSize:'0.62rem', letterSpacing:'0.28em', textTransform:'uppercase',
                color:'#8B6F3E', fontFamily:"'Inter',sans-serif" }}>Est. 2026  India</span>
              <div style={{ width:40, height:1, background:'linear-gradient(90deg,#B8922A,transparent)' }} />
            </div>

            <h1 className="lp-brand lp-d2" style={{
              fontSize:'clamp(2rem,6vw,4.8rem)', fontWeight:700,
              letterSpacing:'0.18em', margin:0, lineHeight:1.1 }}>
              TailorEdFitting
            </h1>

            <p className="lp-d3" style={{ fontFamily:"'Cormorant Garamond',serif",
              fontSize:'clamp(0.95rem,2vw,1.15rem)', color:'#8B6F3E',
              letterSpacing:'0.4em', textTransform:'uppercase',
              fontWeight:300, marginTop:'0.7rem' }}>
              Custom Tailoring Platform
            </p>

            <div className="lp-d3" style={{ display:'flex', alignItems:'center',
              justifyContent:'center', gap:'0.6rem', marginTop:'1.5rem' }}>
              <div style={{ width:60, height:1, background:'linear-gradient(90deg,transparent,#B8922A,transparent)' }} />
              <div style={{ width:6, height:6, background:'#B8922A', transform:'rotate(45deg)' }} />
              <div style={{ width:60, height:1, background:'linear-gradient(90deg,transparent,#B8922A,transparent)' }} />
            </div>

          </header>

          {/* ── Intro ── */}
          <p className="lp-d3" style={{ textAlign:'center', fontFamily:"'Cormorant Garamond',serif",
            fontSize:'clamp(1rem,2vw,1.15rem)', color:'#5C4A2A', lineHeight:1.8,
            margin:'0 auto 3rem', maxWidth:520, padding:'0 2rem' }}>
            Precision crafted garments, tailored to your exact measurements.
            <br/>Choose your collection to begin.
          </p>

          {/* ── Cards ── */}
          <div className="lp-cards" style={{ display:'flex', flexWrap:'wrap',
            gap:'2rem', justifyContent:'center', padding:'0 2rem 3.5rem',
            maxWidth:880, margin:'0 auto' }}>

            {/* MEN */}
            <div className="lp-men lp-card lp-d2"
              style={{ position:'relative', width:340, height:460, borderRadius:6, overflow:'hidden' }}
              onClick={handleMenClick}>
              {/* bg */}
              <div style={{ position:'absolute', inset:0, zIndex:0,
                background:'linear-gradient(160deg,#F3EDE3 0%,#E8DFD0 50%,#EDE7DC 100%)' }} />
              {/* texture */}
              <div style={{ position:'absolute', inset:0, zIndex:1,
                backgroundImage:'repeating-linear-gradient(0deg,transparent 0px,transparent 3px,rgba(184,146,42,0.06) 3px,rgba(184,146,42,0.06) 4px),repeating-linear-gradient(90deg,transparent 0px,transparent 3px,rgba(184,146,42,0.06) 3px,rgba(184,146,42,0.06) 4px)' }} />
              {/* corners */}
              <div style={{ position:'absolute', top:14, left:14, width:32, height:32, zIndex:4,
                borderTop:'1px solid rgba(160,120,40,0.45)', borderLeft:'1px solid rgba(160,120,40,0.45)' }} />
              <div style={{ position:'absolute', bottom:14, right:14, width:32, height:32, zIndex:4,
                borderBottom:'1px solid rgba(160,120,40,0.45)', borderRight:'1px solid rgba(160,120,40,0.45)' }} />
              {/* badge */}
              <div style={{ position:'absolute', top:16, left:16, zIndex:5,
                display:'inline-flex', alignItems:'center', gap:6,
                padding:'5px 12px', background:'#1A1F2E', borderRadius:2,
                fontSize:'0.6rem', letterSpacing:'0.2em', textTransform:'uppercase',
                color:'rgba(232,201,106,0.9)', fontFamily:"'Inter',sans-serif" }}>
                <span style={{ width:5, height:5, borderRadius:'50%', background:'#4CAF50', display:'inline-block' }} />
                Active Collection
              </div>
              {/* content */}
              <div style={{ position:'relative', zIndex:5, height:'100%',
                display:'flex', flexDirection:'column', justifyContent:'flex-end', padding:'2rem' }}>
                <div style={{ width:28, height:1, background:'rgba(184,146,42,0.5)', marginBottom:'0.8rem' }} />
                <h2 style={{ fontFamily:"'Cinzel',serif", fontSize:'clamp(2.8rem,7vw,4rem)',
                  fontWeight:700, letterSpacing:'0.15em', color:'#1A1F2E', lineHeight:1, margin:0 }}>
                  MEN
                </h2>
                <div style={{ width:50, height:2, background:'#B8922A', margin:'0.8rem 0 0.6rem', borderRadius:1 }} />
                <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'0.95rem',
                  color:'#5C4A2A', fontStyle:'italic', margin:'0 0 1.4rem' }}>
                  Shirts, trousers, blazers, kurtas
                </p>
                <div style={{ display:'inline-flex', alignItems:'center', gap:8,
                  padding:'10px 20px', background:'#1A1F2E', borderRadius:2, width:'fit-content',
                  fontSize:'0.72rem', letterSpacing:'0.18em', textTransform:'uppercase',
                  color:'rgba(232,201,106,0.9)', fontFamily:"'Inter',sans-serif" }}>
                  <span>Explore Collection</span>
                  <span className="lp-arrow">→</span>
                </div>
              </div>
            </div>

            {/* WOMEN */}
            <div className="lp-women lp-card lp-d3"
              style={{ position:'relative', width:340, height:460, borderRadius:6, overflow:'hidden' }}
              title="Coming Soon">
              <div style={{ position:'absolute', inset:0, zIndex:0,
                background:'linear-gradient(160deg,#F0EBE3 0%,#E8E0D8 50%,#DDD5CC 100%)' }} />
              <div style={{ position:'absolute', top:16, left:16, zIndex:5,
                display:'inline-flex', alignItems:'center', gap:6,
                padding:'5px 12px', background:'rgba(90,80,70,0.1)',
                border:'1px solid rgba(120,100,80,0.2)', borderRadius:2,
                fontSize:'0.6rem', letterSpacing:'0.2em', textTransform:'uppercase',
                color:'#9A9080', fontFamily:"'Inter',sans-serif" }}>
                <span style={{ width:5, height:5, borderRadius:'50%', background:'#9A9080', display:'inline-block' }} />
                Coming Soon
              </div>
              <div style={{ position:'relative', zIndex:5, height:'100%', opacity:0.7,
                display:'flex', flexDirection:'column', justifyContent:'flex-end', padding:'2rem' }}>
                <h2 style={{ fontFamily:"'Cinzel',serif", fontSize:'clamp(2.8rem,7vw,4rem)',
                  fontWeight:700, letterSpacing:'0.15em', color:'#9A9080', lineHeight:1, margin:0 }}>
                  WOMEN
                </h2>
                <div style={{ width:50, height:2, background:'#9A9080', margin:'0.8rem 0 0.6rem', borderRadius:1, opacity:0.4 }} />
                <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'0.95rem',
                  color:'#9A9080', fontStyle:'italic', margin:'0 0 1.4rem' }}>
                  Launching in Season 2
                </p>
                <div style={{ display:'inline-flex', padding:'10px 20px',
                  background:'rgba(90,80,70,0.1)', border:'1px solid rgba(120,100,80,0.2)',
                  borderRadius:2, fontSize:'0.72rem', letterSpacing:'0.18em',
                  textTransform:'uppercase', color:'#9A9080',
                  fontFamily:"'Inter',sans-serif", width:'fit-content' }}>
                  Notify Me
                </div>
              </div>
            </div>

          </div>

          {/* ── Stats ── */}
          <div className="lp-d4" style={{ display:'flex', flexWrap:'wrap', justifyContent:'center',
            background:'#1A1F2E', margin:'0 2rem', borderRadius:6, maxWidth:760,
            marginLeft:'auto', marginRight:'auto', padding:'1.8rem 1rem' }}>
            {STATS.map((s,i)=>(
              <div key={i} style={{ display:'flex', flexDirection:'column', alignItems:'center',
                padding:'0 2.5rem', position:'relative' }}>
                <span style={{ fontFamily:"'Cinzel',serif", fontSize:'clamp(1.4rem,3vw,1.9rem)',
                  fontWeight:700, color:'#E8C96A', letterSpacing:'0.05em' }}>{s.n}</span>
                <span style={{ fontSize:'0.65rem', letterSpacing:'0.2em', textTransform:'uppercase',
                  color:'rgba(255,255,255,0.4)', marginTop:4, fontFamily:"'Inter',sans-serif" }}>{s.l}</span>
                {i < STATS.length-1 && (
                  <div style={{ position:'absolute', right:0, top:'15%', height:'70%',
                    width:1, background:'rgba(255,255,255,0.1)' }} />
                )}
              </div>
            ))}
          </div>

          {/* ── Footer ── */}
          <div style={{ textAlign:'center', padding:'2rem 2rem 3rem' }}>
            <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'0.9rem',
              color:'#9A9080', letterSpacing:'0.06em', fontStyle:'italic' }}>
              Crafted with care · Premium fabrics sourced globally · 100% made to measure
            </p>
          </div>

        </div>
      </div>
    </>
  )
}