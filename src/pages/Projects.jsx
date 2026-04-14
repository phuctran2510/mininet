import { useState } from 'react'
import { projects } from '../data'
import { PageHdr } from '../components/UI'

// ── Constants ─────────────────────────────────────────────────────────────
const TABS = ['Tất cả', 'Cơ bản', 'Trung bình', 'Nâng cao', ' Đề xuất năm 3']

const LEVEL_COLOR_MAP = {
  'Cơ bản':    { bg: 'var(--badge-basic-bg,  #e0fef0)', text: 'var(--badge-basic-txt,  #0a7a45)' },
  'Trung bình':{ bg: 'var(--badge-mid-bg,    #e0f4ff)', text: 'var(--badge-mid-txt,    #0563a8)' },
  'Nâng cao':  { bg: 'var(--badge-adv-bg,    #f0eaff)', text: 'var(--badge-adv-txt,    #5c34b5)' },
}

// ── Sub-components ─────────────────────────────────────────────────────────

function LevelBadge({ level }) {
  const c = LEVEL_COLOR_MAP[level] ?? {}
  return (
    <span style={{
      fontSize: '.68rem', fontWeight: 700, padding: '2px 9px',
      borderRadius: 99, background: c.bg, color: c.text,
      letterSpacing: '.04em',
    }}>
      {level}
    </span>
  )
}

function SkillTag({ label }) {
  return (
    <span style={{
      fontSize: '.72rem', padding: '2px 8px',
      borderRadius: 6, border: '1px solid var(--border,#e2e8f0)',
      background: 'var(--tag-bg, #f8fafc)', color: 'var(--txt2)',
    }}>
      {label}
    </span>
  )
}

function StepList({ steps }) {
  return (
    <ol style={{ paddingLeft: 0, margin: 0, listStyle: 'none' }}>
      {steps.map((step, i) => (
        <li key={i} style={{
          display: 'flex', gap: '.65rem', alignItems: 'flex-start',
          fontSize: '.82rem', color: 'var(--txt2)', lineHeight: 1.65,
          marginBottom: '.45rem',
        }}>
          <span style={{
            minWidth: 22, height: 22, borderRadius: '50%',
            background: 'var(--step-bg, #f1f5f9)',
            color: 'var(--txt3)', fontSize: '.65rem', fontWeight: 700,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0, marginTop: 1,
          }}>
            {i + 1}
          </span>
          <span>{step}</span>
        </li>
      ))}
    </ol>
  )
}

function DeliverList({ deliver }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.3rem' }}>
      {deliver.map(d => (
        <span key={d} style={{
          fontSize: '.72rem', padding: '2px 9px', borderRadius: 6,
          background: 'var(--deliver-bg, #f0fdf4)',
          border: '1px solid var(--deliver-border, #bbf7d0)',
          color: 'var(--deliver-txt, #166534)',
          fontFamily: 'var(--fc, monospace)',
        }}>
          {d}
        </span>
      ))}
    </div>
  )
}

// ── Detail view ────────────────────────────────────────────────────────────

function ProjectDetail({ p, onBack }) {
  const [openSection, setOpenSection] = useState('steps')

  const toggle = (key) => setOpenSection(s => s === key ? null : key)

  const sections = [
    { key: 'steps',   label: '📋 Các bước triển khai', content: <StepList steps={p.steps} /> },
    { key: 'skills',  label: '🛠 Kỹ năng cần có',      content: (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.35rem' }}>
        {p.skills.map(s => <SkillTag key={s} label={s} />)}
      </div>
    )},
    { key: 'deliver', label: '📦 Sản phẩm nộp',        content: <DeliverList deliver={p.deliver} /> },
    ...(p.recReason ? [{ key: 'why', label: '⭐ Tại sao phù hợp năm 3', content: (
      <p style={{
        fontSize: '.83rem', color: 'var(--txt2)', lineHeight: 1.7,
        borderLeft: `3px solid ${p.color}`, paddingLeft: '.85rem', margin: 0,
      }}>
        {p.recReason}
      </p>
    )}] : []),
  ]

  return (
    <div className="fu">
      <button
        className="btn bg"
        style={{ marginBottom: '1.2rem', display: 'inline-flex', alignItems: 'center', gap: '.4rem' }}
        onClick={onBack}
      >
        ← Danh sách đề tài
      </button>

      <div
        className="card"
        style={{
          padding: '1.5rem',
          borderColor: `${p.color}35`,
          background: `${p.color}07`,
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: '1.1rem' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '.5rem',
            flexWrap: 'wrap', marginBottom: '.5rem',
          }}>
            <LevelBadge level={p.level} />
            {p.rec && (
              <span style={{
                fontSize: '.68rem', fontWeight: 700, padding: '2px 9px',
                borderRadius: 99, background: '#fefce8', color: '#854d0e',
                letterSpacing: '.04em',
              }}>
                ⭐ Đề xuất năm 3
              </span>
            )}
            <span style={{ fontSize: '.75rem', color: 'var(--txt3)', marginLeft: 'auto' }}>
              ⏱ {p.time}
            </span>
          </div>
          <h2 style={{
            fontFamily: 'var(--fm)', fontSize: '1.15rem',
            color: 'var(--txt)', marginBottom: '.5rem', lineHeight: 1.35,
          }}>
            {p.title}
          </h2>
          <p style={{ fontSize: '.86rem', color: 'var(--txt2)', lineHeight: 1.65, margin: 0 }}>
            {p.desc}
          </p>
        </div>

        <div className="divider" />

        {/* Accordion sections */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
          {sections.map(sec => (
            <div key={sec.key} style={{
              border: '1px solid var(--border, #e2e8f0)',
              borderRadius: 10,
              overflow: 'hidden',
              background: 'var(--bg, #fff)',
            }}>
              <button
                onClick={() => toggle(sec.key)}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center',
                  justifyContent: 'space-between', padding: '.7rem 1rem',
                  background: 'none', border: 'none', cursor: 'pointer',
                  fontSize: '.83rem', fontWeight: 600, color: 'var(--txt)',
                  textAlign: 'left',
                }}
              >
                <span>{sec.label}</span>
                <span style={{
                  fontSize: '.7rem', color: 'var(--txt3)',
                  transform: openSection === sec.key ? 'rotate(180deg)' : 'none',
                  transition: 'transform .2s',
                }}>
                  ▾
                </span>
              </button>
              {openSection === sec.key && (
                <div style={{
                  padding: '.3rem 1rem 1rem',
                  borderTop: '1px solid var(--border, #e2e8f0)',
                }}>
                  {sec.content}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Tips */}
        <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
          <div className="alert ai">
            <strong>💡 Gợi ý bắt đầu:</strong> Đọc kỹ từng bước, chia thành tasks nhỏ. Commit code lên GitHub sau mỗi bước. Kiểm thử từng phần trước khi ghép.
          </div>
          <div className="alert aw">
            <strong>⚠️ Lưu ý nộp bài:</strong> Bao gồm README.md hướng dẫn chạy. Code phải comment đầy đủ. Nộp đúng hạn và đúng định dạng yêu cầu.
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Card component ─────────────────────────────────────────────────────────

function ProjectCard({ p, onClick }) {
  return (
    <div
      className="card ca"
      style={{ padding: '1.1rem', cursor: 'pointer', borderColor: `${p.color}22`, position: 'relative' }}
      onClick={onClick}
    >
      {/* Rec badge top-right */}
      {p.rec && (
        <span style={{
          position: 'absolute', top: '.75rem', right: '.75rem',
          fontSize: '.62rem', fontWeight: 700, padding: '2px 7px',
          borderRadius: 99, background: '#fefce8', color: '#854d0e',
        }}>
          ⭐ Đề xuất
        </span>
      )}

      {/* Level + time */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginBottom: '.55rem', gap: '.5rem', flexWrap: 'wrap',
      }}>
        <span style={{
          fontSize: '.7rem', fontWeight: 700, color: p.color,
          fontFamily: 'var(--fc)', textTransform: 'uppercase', letterSpacing: '.06em',
        }}>
          {p.level}
        </span>
        <span style={{ fontSize: '.72rem', color: 'var(--txt3)' }}>⏱ {p.time}</span>
      </div>

      {/* Title */}
      <h3 style={{
        fontFamily: 'var(--fm)', fontSize: '.93rem', color: 'var(--txt)',
        marginBottom: '.4rem', lineHeight: 1.35,
        paddingRight: p.rec ? '3.5rem' : 0,
      }}>
        {p.title}
      </h3>

      {/* Desc */}
      <p style={{
        fontSize: '.79rem', color: 'var(--txt2)', lineHeight: 1.55,
        marginBottom: '.8rem',
        display: '-webkit-box', WebkitLineClamp: 3,
        WebkitBoxOrient: 'vertical', overflow: 'hidden',
      }}>
        {p.desc}
      </p>

      {/* Skills */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.25rem', marginBottom: '.7rem' }}>
        {p.skills.slice(0, 3).map(s => <SkillTag key={s} label={s} />)}
        {p.skills.length > 3 && <SkillTag label={`+${p.skills.length - 3}`} />}
      </div>

      {/* Step count hint */}
      <div style={{
        fontSize: '.72rem', color: 'var(--txt3)',
        borderTop: `1px solid ${p.color}18`, paddingTop: '.55rem',
        display: 'flex', alignItems: 'center', gap: '.4rem',
      }}>
        <span style={{
          display: 'inline-block', width: 6, height: 6,
          borderRadius: '50%', background: p.color,
        }} />
        {p.steps.length} bước triển khai · {p.deliver.length} deliverable
      </div>
    </div>
  )
}

// ── Main page ──────────────────────────────────────────────────────────────

export default function Projects() {
  const [tab, setTab]   = useState('Tất cả')
  const [sel, setSel]   = useState(null)
  const [search, setSearch] = useState('')

  const filtered = (() => {
    let list = projects
    if (tab === '⭐ Đề xuất năm 3') list = list.filter(p => p.rec)
    else if (tab !== 'Tất cả')      list = list.filter(p => p.level === tab)
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.desc.toLowerCase().includes(q)  ||
        p.skills.some(s => s.toLowerCase().includes(q))
      )
    }
    return list
  })()

  if (sel) {
    const p = projects.find(x => x.id === sel)
    return <ProjectDetail p={p} onBack={() => setSel(null)} />
  }

  return (
    <div className="fu">
      <PageHdr
        icon=""
        title="Đề tài / Dự án"
        sub="20 đề tài từ cơ bản đến nâng cao — thực hành SDN thực tế với Mininet & Ryu"
      />

      {/* Tabs */}
      <div className="tabs" style={{ marginBottom: '.85rem', flexWrap: 'wrap' }}>
        {TABS.map(t => (
          <button
            key={t}
            className={`tab${tab === t ? ' active' : ''}`}
            onClick={() => setTab(t)}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Search */}
      <div style={{ marginBottom: '1rem', position: 'relative' }}>
        <span style={{
          position: 'absolute', left: '.75rem', top: '50%',
          transform: 'translateY(-50%)', color: 'var(--txt3)', fontSize: '.85rem',
        }}>
          🔍
        </span>
        <input
          type="text"
          placeholder="Tìm kiếm theo tên, mô tả, kỹ năng..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            width: '100%', padding: '.5rem .75rem .5rem 2.1rem',
            borderRadius: 8, border: '1px solid var(--border, #e2e8f0)',
            background: 'var(--bg)', color: 'var(--txt)',
            fontSize: '.84rem', outline: 'none',
            boxSizing: 'border-box',
          }}
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            style={{
              position: 'absolute', right: '.6rem', top: '50%',
              transform: 'translateY(-50%)', background: 'none',
              border: 'none', cursor: 'pointer', color: 'var(--txt3)',
              fontSize: '.85rem', padding: '2px 4px',
            }}
          >
            ✕
          </button>
        )}
      </div>

      {/* Count */}
      <div style={{ fontSize: '.78rem', color: 'var(--txt3)', marginBottom: '.85rem' }}>
        Hiển thị {filtered.length} / {projects.length} đề tài
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div style={{
          textAlign: 'center', padding: '3rem 1rem',
          color: 'var(--txt3)', fontSize: '.9rem',
        }}>
          Không tìm thấy đề tài phù hợp.{' '}
          <button
            onClick={() => { setSearch(''); setTab('Tất cả') }}
            style={{ color: 'var(--accent)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '.9rem' }}
          >
            Xóa bộ lọc
          </button>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(300px, 100%), 1fr))',
          gap: '1rem',
        }}>
          {filtered.map(p => (
            <ProjectCard key={p.id} p={p} onClick={() => setSel(p.id)} />
          ))}
        </div>
      )}
    </div>
  )
}
