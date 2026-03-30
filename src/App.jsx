import { useState, useEffect, useCallback } from 'react'
import { HashRouter, Routes, Route, NavLink, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Theory from './pages/Theory'
import Lab from './pages/Lab'
import TopoPage from './pages/TopoPage'
import Quiz from './pages/Quiz'
import Exercises from './pages/Exercises'
import Projects from './pages/Projects'
import Exam from './pages/Exam'
import Glossary from './pages/Glossary'
import Resources from './pages/Resources'
import Contact from './pages/Contact'
import './index.css'
const NAV = [
  { to:'/', label:'Tổng quan', icon:'' },
  { to:'/theory', label:'Lý thuyết', icon:'' },
  { to:'/lab', label:'Lab thực hành', icon:'' },
  { to:'/topology', label:'Topology Viewer', icon:'' },
  { to:'/quiz', label:'Trắc nghiệm', icon:'' },
  { to:'/exercises', label:'Bài tập', icon:'' },
  { to:'/exam', label:'Đề thi mẫu', icon:'' },
  { to:'/projects', label:'Đề tài / Dự án', icon:'' },
  { to:'/glossary', label:'Thuật ngữ', icon:'' },
  { to:'/resources', label:'Tài liệu', icon:'' },
  { to:'/contact', label:'Liên hệ GV', icon:'' },
]

function useIsMobile() {
  const [mob, setMob] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768)
  useEffect(() => {
    const h = () => setMob(window.innerWidth < 768)
    window.addEventListener('resize', h)
    return () => window.removeEventListener('resize', h)
  }, [])
  return mob
}

function Sidebar({ open, onClose }) {
  const loc = useLocation()
  const isMob = useIsMobile()
  useEffect(() => { if (isMob) onClose() }, [loc.pathname])

  return (
    <>
      {open && isMob && (
        <div onClick={onClose} style={{
          position:'fixed',inset:0,background:'rgba(0,0,0,.6)',zIndex:98,
          backdropFilter:'blur(2px)'
        }}/>
      )}
      <aside style={{
        position:'fixed',top:0,left:0,height:'100vh',
        width:'var(--sw)',background:'var(--bg2)',
        borderRight:'1px solid var(--brd)',zIndex:99,
        display:'flex',flexDirection:'column',overflowY:'auto',
        transform: (isMob && !open) ? 'translateX(-100%)' : 'translateX(0)',
        transition:'transform .25s cubic-bezier(.4,0,.2,1)',
        boxShadow: isMob && open ? '4px 0 32px rgba(0,0,0,.6)' : 'none',
      }}>
        {/* Logo */}
        <div style={{padding:'1rem 1rem .75rem',borderBottom:'1px solid var(--brd)',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <div style={{display:'flex',alignItems:'center',gap:'.6rem'}}>
            <div style={{width:34,height:34,borderRadius:8,background:'linear-gradient(135deg,var(--acc),var(--grn))',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'var(--fm)',fontWeight:800,fontSize:'1rem',color:'#000',flexShrink:0}}>M</div>
            <div>
              <div style={{fontFamily:'var(--fm)',fontWeight:800,fontSize:'.9rem',color:'var(--txt)'}}>Mininet EDU</div>
              <div style={{fontSize:'.63rem',color:'var(--txt3)',fontFamily:'var(--fc)'}}>SDN Learning Platform</div>
            </div>
          </div>
          {isMob && (
            <button onClick={onClose} style={{background:'none',border:'none',color:'var(--txt3)',cursor:'pointer',fontSize:'1.2rem',padding:'.25rem',lineHeight:1}}>✕</button>
          )}
        </div>

        {/* Nav */}
        <nav style={{padding:'.5rem .45rem',flex:1}}>
          {NAV.map(item => (
            <NavLink key={item.to} to={item.to} end={item.to==='/'}
              style={({isActive})=>({
                display:'flex',alignItems:'center',gap:'.5rem',
                padding:'.48rem .7rem',borderRadius:8,marginBottom:2,
                fontSize:'.83rem',fontWeight:isActive?600:400,
                color:isActive?'var(--acc)':'var(--txt2)',
                background:isActive?'rgba(0,212,255,.09)':'transparent',
                border:isActive?'1px solid rgba(0,212,255,.2)':'1px solid transparent',
                textDecoration:'none',transition:'all .13s',
              })}
            >
              <span style={{fontSize:'.9rem',minWidth:20,textAlign:'center'}}>{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div style={{padding:'.75rem 1rem',borderTop:'1px solid var(--brd)',fontSize:'.68rem',color:'var(--txt3)'}}>
          <div style={{fontFamily:'var(--fc)',marginBottom:'.2rem'}}>DLU · Khoa CNTT · 2025</div>
          <div style={{color:'var(--txt3)',marginBottom:'.15rem'}}>GV: Trần Vĩnh Phúc</div>
          <a href="mailto:phuctv@dlu.edu.vn" style={{color:'var(--acc2)',textDecoration:'none'}}>phuctv@dlu.edu.vn</a>
        </div>
      </aside>
    </>
  )
}

function Login({ onLogin }) {
  const [pwd, setPwd] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (pwd === 'sdn2026') {
      localStorage.setItem('auth', 'true')
      onLogin(true)
    } else {
      alert('Sai mật khẩu')
    }
  }

  return (
    <div style={S.wrap}>
      <div style={S.card}>
        {/* LEFT */}
        <div style={S.left}>
          <div style={S.logo}>SDN</div>
          <h2 style={S.title}>SDN EDU</h2>
          <p style={S.subtitle}>
            Hệ thống học tập & nghiên cứu SDN — DLU
          </p>

          <form onSubmit={handleSubmit} style={{width:'100%'}}>
            <input
              type="password"
              placeholder="Nhập mật khẩu truy cập"
              value={pwd}
              onChange={e => setPwd(e.target.value)}
              style={S.input}
            />
            <button style={S.btn}>Đăng nhập</button>
          </form>
        </div>

        {/* RIGHT */}
        <div style={S.right}>
          <h3 style={S.contactTitle}>Liên hệ giảng viên</h3>

          <div style={S.info}>
            <div><strong>GV:</strong> Trần Vĩnh Phúc</div>
            <div>
              <strong>Email:</strong>{' '}
              <a href="mailto:phuctv@dlu.edu.vn">phuctv@dlu.edu.vn</a>
            </div>
            <div>
              <strong>SĐT:</strong>{' '}
              <a href="tel:0976353605">0976353605</a>
            </div>
          </div>

          <p style={S.note}>
            Vui lòng liên hệ nếu bạn cần cấp quyền truy cập hệ thống.
          </p>
        </div>
      </div>
    </div>
  )
}


function Topbar({ onMenu }) {
  const isMob = useIsMobile()
  const loc = useLocation()
  const cur = NAV.find(n => n.to === loc.pathname) || NAV[0]
  if (!isMob) return null
  return (
    <div style={{
      display:'flex',alignItems:'center',gap:'.6rem',
      padding:'.65rem 1rem',background:'var(--bg2)',
      borderBottom:'1px solid var(--brd)',
      position:'sticky',top:0,zIndex:50,
    }}>
      <button onClick={onMenu} style={{
        background:'var(--sur)',border:'1px solid var(--brd)',
        color:'var(--txt)',cursor:'pointer',fontSize:'1.1rem',
        lineHeight:1,borderRadius:7,width:34,height:34,
        display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0
      }}>☰</button>
      <div style={{display:'flex',alignItems:'center',gap:'.4rem',flex:1,minWidth:0}}>
        <span style={{fontSize:'.95rem'}}>{cur.icon}</span>
        <span style={{fontFamily:'var(--fm)',fontWeight:700,fontSize:'.9rem',color:'var(--acc)',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>
          {cur.label}
        </span>
      </div>
      <div style={{fontSize:'.62rem',color:'var(--txt3)',fontFamily:'var(--fc)',flexShrink:0}}>Mininet EDU</div>
    </div>
  )
}

function Layout({ children }) {
  const [open, setOpen] = useState(false)
  const isMob = useIsMobile()
  const close = useCallback(() => setOpen(false), [])

  return (
    <div style={{display:'flex',minHeight:'100vh'}}>
      <Sidebar open={open} onClose={close}/>
      <div style={{marginLeft:isMob?0:'var(--sw)',flex:1,display:'flex',flexDirection:'column',minWidth:0}}>
        <Topbar onMenu={() => setOpen(true)}/>
        <main style={{
          flex:1,
          padding: isMob ? '1rem' : '1.5rem 2rem',
          maxWidth:1100,width:'100%',margin:'0 auto',
          boxSizing:'border-box',
        }}>
          {children}
        </main>
      </div>
    </div>
  )
}

export default function App() {
const [isAuth, setIsAuth] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('auth')
    if (saved === 'true') setIsAuth(true)
  }, [])
    if (!isAuth) {
  return <Login onLogin={setIsAuth} />
}
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/theory" element={<Theory/>}/>
          <Route path="/lab" element={<Lab/>}/>
          <Route path="/topology" element={<TopoPage/>}/>
          <Route path="/quiz" element={<Quiz/>}/>
          <Route path="/exercises" element={<Exercises/>}/>
          <Route path="/projects" element={<Projects/>}/>
          <Route path="/exam" element={<Exam/>}/>
          <Route path="/glossary" element={<Glossary/>}/>
          <Route path="/resources" element={<Resources/>}/>
          <Route path="/contact" element={<Contact/>}/>
        </Routes>
      </Layout>
    </HashRouter>
  )
}
const isMob = typeof window !== 'undefined' && window.innerWidth < 768

const S = {
  wrap: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem',
    background: `
      radial-gradient(circle at 20% 20%, #1d4ed8, transparent 40%),
      radial-gradient(circle at 80% 80%, #22c55e, transparent 40%),
      #020617
    `
  },

  card: {
    display: 'grid',
    gridTemplateColumns: isMob ? '1fr' : '1fr 1fr',
    width: isMob ? '100%' : 900,
    maxWidth: '100%',
    backdropFilter: 'blur(20px)',
    background: 'rgba(15,23,42,0.6)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 20,
    overflow: 'hidden',
    color: '#fff',
    boxShadow: '0 20px 60px rgba(0,0,0,0.6)'
  },

  left: {
    padding: isMob ? '1.75rem 1.25rem' : '2.5rem'
  },

  right: {
    display: isMob ? 'none' : 'block',
    padding: '2.5rem',
    background: 'linear-gradient(180deg, rgba(2,6,23,0.7), rgba(2,6,23,1))'
  },

  // phần còn lại giữ nguyên
  logo: {
    fontSize: '2.5rem',
    fontWeight: 900,
    background: 'linear-gradient(135deg,#22c55e,#3b82f6)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: 10
  },
  title: {
    marginTop: 10,
    fontSize: isMob ? '1.3rem' : '1.6rem',
    fontWeight: 700
  },
  subtitle: {
    fontSize: '.95rem',
    color: '#94a3b8',
    marginBottom: '1.5rem'
  },
  input: {
    width: '100%',
    padding: '14px',
    marginTop: 10,
    marginBottom: 14,
    borderRadius: 10,
    border: '1px solid rgba(255,255,255,0.1)',
    background: 'rgba(255,255,255,0.05)',
    color: '#fff',
    outline: 'none',
    transition: 'all .25s'
  },
  btn: {
    width: '100%',
    padding: '14px',
    borderRadius: 10,
    background: 'linear-gradient(135deg,#22c55e,#4ade80)',
    border: 'none',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all .25s',
    color: '#022c22'
  },
  contactTitle: {
    marginBottom: 12,
    fontSize: '1.2rem',
    color: '#22c55e',
    fontWeight: 600
  },
  info: {
    lineHeight: 1.9,
    fontSize: '.95rem'
  },
  note: {
    marginTop: 15,
    fontSize: '.85rem',
    color: '#94a3b8'
  }
}