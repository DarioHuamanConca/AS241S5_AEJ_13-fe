import { Bot, Database, Zap } from 'lucide-react'

export default function Navbar() {
  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        borderBottom: '1px solid var(--border)',
        background: 'rgba(10,10,10,0.85)',
        backdropFilter: 'blur(16px)',
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          padding: '0 24px',
          height: 60,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div
            style={{
              width: 32,
              height: 32,
              background: 'var(--accent)',
              borderRadius: 8,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Bot size={17} color="#fff" />
          </div>
          <span
            style={{
              fontWeight: 600,
              fontSize: 15,
              letterSpacing: '-0.01em',
              color: 'var(--text-primary)',
            }}
          >
            AI Chat
          </span>
          <span
            style={{
              fontSize: 11,
              color: 'var(--text-muted)',
              fontWeight: 400,
            }}
          >
            AS241S5
          </span>
        </div>

        {/* Badges */}
        <div style={{ display: 'flex', gap: 8 }}>
          <Badge icon={<Zap size={11} />} label="Llama" color="var(--llama)" />
          <Badge icon={<Database size={11} />} label="Neon DB" color="var(--tts)" />
        </div>
      </div>
    </header>
  )
}

function Badge({ icon, label, color }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 5,
        padding: '4px 10px',
        borderRadius: 20,
        background: `${color}18`,
        border: `1px solid ${color}40`,
        fontSize: 11,
        fontWeight: 500,
        color,
      }}
    >
      {icon}
      {label}
    </div>
  )
}
