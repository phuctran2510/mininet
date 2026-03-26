import { useState, useEffect, useRef } from 'react'
import { PageHdr } from '../components/UI'
import { LABS, LAB_GROUPS } from '../data/labs'

function CopyBtn({ code }) {
  const [ok, setOk] = useState(false)
  const copy = () => {
    navigator.clipboard?.writeText(code).then(()=>{setOk(true);setTimeout(()=>setOk(false),1800)})
  }
  return (
    <button onClick={copy} style={{
      position:'absolute',top:'.4rem',right:'.4rem',
      background:ok?'rgba(0,230,118,.15)':'rgba(0,212,255,.08)',
      border:`1px solid ${ok?'var(--grn)':'rgba(0,212,255,.2)'}`,
      color:ok?'var(--grn)':'var(--acc2)',
      borderRadius:5,padding:'.18rem .5rem',fontSize:'.64rem',
      cursor:'pointer',fontFamily:'var(--fc)',transition:'all .18s',zIndex:2
    }}>{ok?'✓':'copy'}</button>
  )
}

function Code({ code, lang='bash' }) {
  return (
    <div style={{position:'relative',marginBottom:'.6rem'}}>
      <pre data-lang={lang} style={{paddingRight:'3.5rem'}}>
        <code style={{color:'#b0c4de'}}>{code}</code>
      </pre>
      <CopyBtn code={code}/>
    </div>
  )
}

function LabDetail({ lab, onBack, onDone, isDone }) {
  const [step, setStep] = useState(0)
  const [tab, setTab] = useState('steps')
  const ref = useRef(null)
  const gc = lab.groupColor||'#00d4ff'

  useEffect(()=>{ setStep(0); setTab('steps'); ref.current?.scrollIntoView({behavior:'smooth',block:'start'}) },[lab.id])

  return (
    <div ref={ref}>
      <div style={{display:'flex',alignItems:'center',gap:'.6rem',marginBottom:'1rem',flexWrap:'wrap'}}>
        <button className="btn bg" onClick={onBack}>← Danh sách</button>
        <span className={`badge ${lab.diff==='easy'?'b-green':lab.diff==='medium'?'b-blue':'b-red'}`}>
          {lab.diff==='easy'?'Cơ bản':lab.diff==='medium'?'Trung cấp':'Nâng cao'}
        </span>
        <span style={{fontSize:'.75rem',color:'var(--txt3)'}}>⏱ {lab.time}</span>
      </div>

      <div className="card" style={{padding:'1.1rem',marginBottom:'1rem',background:`${gc}07`,borderColor:`${gc}25`}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',flexWrap:'wrap',gap:'.7rem'}}>
          <div>
            <div style={{fontSize:'.63rem',color:'var(--txt3)',fontFamily:'var(--fc)',marginBottom:'.18rem'}}>{lab.group}</div>
            <h2 style={{fontFamily:'var(--fm)',fontSize:'1.08rem',color:'var(--txt)',marginBottom:'.3rem'}}>{lab.title}</h2>
            <p style={{color:'var(--txt3)',fontSize:'.83rem',lineHeight:1.5}}>
              <strong style={{color:'var(--txt2)'}}>Mục tiêu:</strong> {lab.obj}
            </p>
          </div>
          <button className={`btn ${isDone?'bg':'bp'}`} onClick={()=>onDone(lab.id)}>
            {isDone?'✓ Xong':'Mark done'}
          </button>
        </div>
        <div style={{marginTop:'.85rem'}}>
          <div style={{display:'flex',justifyContent:'space-between',fontSize:'.69rem',color:'var(--txt3)',marginBottom:'.25rem'}}>
            <span>Tiến độ</span><span>{step+1}/{lab.steps.length}</span>
          </div>
          <div className="prog"><div className="prog-f" style={{width:`${(step+1)/lab.steps.length*100}%`}}/></div>
        </div>
      </div>

      <div className="tabs">
        {[{id:'steps',label:' Các bước'},{id:'theory',label:'📖 Lý thuyết'},{id:'verify',label:'✅ Kiểm tra'}].map(t=>(
          <button key={t.id} className={`tab ${tab===t.id?'active':''}`} onClick={()=>setTab(t.id)}>{t.label}</button>
        ))}
      </div>

      {tab==='steps' && (
        <div>
          {lab.steps.map((s,idx)=>(
            <div key={idx} className="card" onClick={()=>setStep(idx)} style={{
              padding:'.9rem 1rem',marginBottom:'.5rem',cursor:'pointer',transition:'all .15s',
              borderColor:idx===step?gc:idx<step?'rgba(0,230,118,.3)':'var(--brd)',
              background:idx===step?`${gc}07`:idx<step?'rgba(0,230,118,.03)':'var(--sur)',
            }}>
              <div style={{display:'flex',gap:'.65rem',alignItems:'flex-start'}}>
                <div style={{
                  width:26,height:26,borderRadius:'50%',flexShrink:0,fontFamily:'var(--fc)',
                  display:'flex',alignItems:'center',justifyContent:'center',
                  fontSize:'.72rem',fontWeight:700,
                  background:idx<step?'var(--grn)':idx===step?gc:'var(--sur2)',
                  color:idx<=step?'#000':'var(--txt3)',
                }}>{idx<step?'✓':idx+1}</div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontWeight:600,fontSize:'.87rem',color:idx===step?'var(--txt)':'var(--txt2)',marginBottom:idx===step?'.4rem':0}}>
                    {s.t}
                  </div>
                  {idx===step&&(
                    <>
                      {s.info&&<p style={{color:'var(--txt3)',fontSize:'.82rem',marginBottom:'.5rem',lineHeight:1.55}}>{s.info}</p>}
                      <Code code={s.code} lang={s.lang||'bash'}/>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}

          <div className="alert as" style={{marginTop:'.5rem'}}>
            <div style={{fontWeight:600,fontSize:'.82rem',marginBottom:'.3rem'}}>✅ Kết quả mong đợi</div>
            <pre style={{margin:0,background:'none',border:'none',padding:0,fontSize:'.75rem'}}>
              <code style={{color:'var(--grn)'}}>{lab.expect}</code>
            </pre>
          </div>

          {lab.tips?.length>0&&(
            <div className="alert aw" style={{marginTop:'.5rem'}}>
              <div style={{fontWeight:600,fontSize:'.82rem',marginBottom:'.3rem'}}>💡 Tips</div>
              <ul className="ul">{lab.tips.map((t,i)=><li key={i} style={{fontSize:'.81rem'}}>{t}</li>)}</ul>
            </div>
          )}

          <div style={{display:'flex',gap:'.5rem',marginTop:'.75rem',flexWrap:'wrap'}}>
            <button className="btn bg" disabled={step===0} onClick={()=>setStep(s=>s-1)}>← Trước</button>
            <button className="btn bo" disabled={step===lab.steps.length-1} onClick={()=>setStep(s=>s+1)}>Tiếp →</button>
            {step===lab.steps.length-1&&(
              <button className="btn bp" onClick={()=>{onDone(lab.id);setTab('verify')}}>✓ Xong → Kiểm tra</button>
            )}
          </div>
        </div>
      )}

      {tab==='theory'&&(
        <div className="card" style={{padding:'1.2rem'}}>
          <div className="alert ai" style={{marginBottom:'1rem'}}>
            <strong> Kiến thức nền:</strong> {lab.theory}
          </div>
          <p style={{color:'var(--txt3)',fontSize:'.83rem',lineHeight:1.65}}>
            Lab thuộc nhóm <strong style={{color:gc}}>{lab.group}</strong>,
            độ khó <strong>{lab.diff==='easy'?'Cơ bản':lab.diff==='medium'?'Trung cấp':'Nâng cao'}</strong>,
            ước tính <strong style={{color:'var(--txt)'}}>{lab.time}</strong>.
          </p>
        </div>
      )}

      {tab==='verify'&&(
        <div>
          <div className="card" style={{padding:'1.2rem',marginBottom:'.75rem'}}>
            <div style={{fontWeight:700,color:'var(--acc)',marginBottom:'1rem',fontSize:'.9rem'}}>
               Câu hỏi kiểm tra
            </div>
            {lab.verify?.map((v,i)=>(
              <div key={i} style={{background:'var(--bg)',borderRadius:8,padding:'.75rem 1rem',marginBottom:'.55rem',border:'1px solid var(--brd)'}}>
                <div style={{fontWeight:600,fontSize:'.84rem',color:'var(--txt)',marginBottom:'.4rem'}}>{i+1}. {v.q}</div>
                <Code code={v.cmd} lang="bash"/>
              </div>
            ))}
          </div>
          {isDone
            ? <div className="alert as"><strong>🎉 Xuất sắc!</strong> Hoàn thành <strong>{lab.title}</strong>. Hãy thử lab tiếp theo!</div>
            : <div className="alert aw">Chưa mark done — quay lại tab <strong>Các bước</strong> và hoàn thành.</div>
          }
        </div>
      )}
    </div>
  )
}

export default function Lab() {
  const [sel, setSel]     = useState(null)
  const [done, setDone]   = useState({})
  const [group, setGroup] = useState('all')
  const [mobView, setMobView] = useState('list')

  const filtered = group==='all' ? LABS : LABS.filter(l=>l.group===group)
  const totalDone = Object.values(done).filter(Boolean).length

  const openLab = l => { setSel(l); setMobView('detail'); window.scrollTo(0,0) }
  const backToList = () => { setMobView('list'); setSel(null) }
  const toggleDone = id => setDone(p=>({...p,[id]:!p[id]}))

  return (
    <div>
      <PageHdr icon="🧪" title="Lab Thực hành"
        sub={`${LABS.length} labs từ cơ bản đến nâng cao · ${totalDone}/${LABS.length} hoàn thành`}/>

      {/* Group filter */}
      <div className="tabs" style={{marginBottom:'1rem'}}>
        <button className={`tab ${group==='all'?'active':''}`} onClick={()=>setGroup('all')}>Tất cả ({LABS.length})</button>
        {LAB_GROUPS.map(g=>(
          <button key={g.id} className={`tab ${group===g.id?'active':''}`}
            onClick={()=>setGroup(g.id)}
            style={group===g.id?{color:g.color,borderBottomColor:g.color}:{}}
          >{g.id} ({g.count})</button>
        ))}
      </div>

      {/* Mobile: full-screen detail */}
      {mobView==='detail' && sel && (
        <div className="mob-lab-detail">
          <LabDetail lab={sel} onBack={backToList} onDone={toggleDone} isDone={!!done[sel.id]}/>
        </div>
      )}

      {/* Desktop grid / Mobile list */}
      <div style={{display:'grid',gridTemplateColumns:'220px 1fr',gap:'1.2rem',alignItems:'start'}} className="lab-grid">

        {/* Sidebar */}
        <div style={{position:'sticky',top:'1rem'}} className="lab-sidebar">
          <div style={{
            padding:'.6rem .75rem',background:'rgba(0,212,255,.05)',
            border:'1px solid rgba(0,212,255,.15)',borderRadius:8,marginBottom:'.6rem'
          }}>
            <div style={{fontSize:'.67rem',color:'var(--txt3)',fontFamily:'var(--fc)',marginBottom:'.3rem'}}>TIẾN ĐỘ</div>
            <div style={{display:'flex',alignItems:'center',gap:'.5rem'}}>
              <div className="prog" style={{flex:1}}><div className="prog-f" style={{width:`${totalDone/LABS.length*100}%`}}/></div>
              <span style={{fontSize:'.71rem',color:'var(--acc)',fontFamily:'var(--fc)',flexShrink:0}}>{totalDone}/{LABS.length}</span>
            </div>
          </div>
          {filtered.map(l=>(
            <button key={l.id} onClick={()=>openLab(l)} style={{
              display:'flex',flexDirection:'column',gap:'.18rem',
              width:'100%',padding:'.62rem .7rem',borderRadius:8,marginBottom:3,
              background:sel?.id===l.id?`${l.groupColor}10`:'var(--sur)',
              border:`1px solid ${sel?.id===l.id?l.groupColor+'40':'var(--brd)'}`,
              cursor:'pointer',textAlign:'left',transition:'all .13s',
            }}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <span style={{fontSize:'.82rem',fontWeight:sel?.id===l.id?700:500,
                  color:sel?.id===l.id?l.groupColor:'var(--txt)',
                  overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',maxWidth:'82%'}}>
                  {l.title}
                </span>
                {done[l.id]&&<span style={{color:'var(--grn)',fontSize:'.8rem'}}>✓</span>}
              </div>
              <div style={{display:'flex',gap:'.3rem'}}>
                <span className={`badge ${l.diff==='easy'?'b-green':l.diff==='medium'?'b-blue':'b-red'}`} style={{fontSize:'.58rem'}}>
                  {l.diff==='easy'?'Dễ':l.diff==='medium'?'TB':'Khó'}
                </span>
                <span style={{fontSize:'.65rem',color:'var(--txt3)'}}>⏱ {l.time}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Content area */}
        <div className="lab-content">
          {sel ? (
            <LabDetail lab={sel} onBack={backToList} onDone={toggleDone} isDone={!!done[sel.id]}/>
          ) : (
            <div>
              <div className="card" style={{padding:'1.8rem',textAlign:'center',background:'rgba(0,212,255,.03)',borderColor:'rgba(0,212,255,.15)'}}>
                <div style={{fontSize:'2.8rem',marginBottom:'.65rem'}}>🧪</div>
                <h2 style={{fontFamily:'var(--fm)',fontSize:'1.15rem',marginBottom:'.5rem'}}>Chọn Lab để bắt đầu</h2>
                <p style={{color:'var(--txt3)',fontSize:'.84rem',lineHeight:1.65,maxWidth:360,margin:'0 auto 1.3rem'}}>
                  {LABS.length} labs có hướng dẫn step-by-step, lý thuyết nền và câu hỏi kiểm tra kết quả.
                </p>
                <div style={{display:'flex',flexWrap:'wrap',gap:'.5rem',justifyContent:'center'}}>
                  {LAB_GROUPS.map(g=>(
                    <button key={g.id} className="btn bg" onClick={()=>setGroup(g.id)}
                      style={{border:`1px solid ${g.color}35`,color:g.color}}>
                      {g.id} · {g.count} labs
                    </button>
                  ))}
                </div>
              </div>

              <div style={{
                display:'grid',
                gridTemplateColumns:'repeat(auto-fill,minmax(min(250px,100%),1fr))',
                gap:'.65rem',marginTop:'1rem'
              }}>
                {filtered.map(l=>(
                  <div key={l.id} className="card ca" onClick={()=>openLab(l)}
                    style={{padding:'.95rem',cursor:'pointer',borderColor:`${l.groupColor}20`}}>
                    <div style={{display:'flex',justifyContent:'space-between',marginBottom:'.4rem'}}>
                      <span style={{fontSize:'.68rem',color:l.groupColor,fontFamily:'var(--fc)',fontWeight:700,textTransform:'uppercase'}}>{l.group}</span>
                      {done[l.id]&&<span style={{color:'var(--grn)',fontSize:'.78rem'}}>✓</span>}
                    </div>
                    <div style={{fontWeight:700,fontSize:'.87rem',color:'var(--txt)',marginBottom:'.3rem',lineHeight:1.3}}>{l.title}</div>
                    <p style={{color:'var(--txt3)',fontSize:'.78rem',lineHeight:1.5,marginBottom:'.6rem'}}>{l.obj}</p>
                    <div style={{display:'flex',gap:'.3rem',flexWrap:'wrap'}}>
                      <span className={`badge ${l.diff==='easy'?'b-green':l.diff==='medium'?'b-blue':'b-red'}`} style={{fontSize:'.6rem'}}>
                        {l.diff==='easy'?'Cơ bản':l.diff==='medium'?'Trung cấp':'Nâng cao'}
                      </span>
                      <span style={{fontSize:'.69rem',color:'var(--txt3)'}}>⏱ {l.time} · {l.steps.length} bước</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
