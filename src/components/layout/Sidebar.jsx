import { Plus, MessageSquare, Trash2 } from 'lucide-react'

export default function Sidebar({ logs, onNewChat, onSelectLog, onDeleteLog }) {
  // Ordenamos los logs para que los más recientes salgan arriba
  const sortedLogs = [...logs].reverse()

  return (
    <div
      style={{
        width: 260,
        height: '100%',
        background: '#171717', // Color oscuro estilo ChatGPT
        borderRight: '1px solid var(--border)',
        display: 'flex',
        flexDirection: 'column',
        padding: '12px 0',
      }}
    >
      {/* Botón Nueva Conversación */}
      <div style={{ padding: '0 12px', marginBottom: 16 }}>
        <button
          onClick={onNewChat}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            background: 'transparent',
            border: '1px solid var(--border)',
            borderRadius: 8,
            padding: '10px 14px',
            color: 'var(--text-primary)',
            fontSize: 14,
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'background 0.2s',
          }}
          onMouseEnter={(e) => (e.target.style.background = 'var(--bg-hover)')}
          onMouseLeave={(e) => (e.target.style.background = 'transparent')}
        >
          <Plus size={16} />
          Nueva Conversación
        </button>
      </div>

      <div style={{ padding: '0 16px', fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 8 }}>
        HISTORIAL DE CONSULTAS
      </div>

      {/* Lista del historial */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 12px', display: 'flex', flexDirection: 'column', gap: 4 }}>
        {sortedLogs.length === 0 ? (
          <p style={{ fontSize: 12, color: 'var(--text-muted)', padding: '0 4px' }}>No hay historial aún.</p>
        ) : (
          sortedLogs.map((log) => (
            <div
              key={log.id}
              onClick={() => onSelectLog(log.id)}
              className="sidebar-item"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 12px',
                borderRadius: 8,
                cursor: 'pointer',
                color: 'var(--text-secondary)',
                transition: 'all 0.2s',
                position: 'relative',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--bg-hover)'
                e.currentTarget.style.color = 'var(--text-primary)'
                e.currentTarget.querySelector('.delete-btn').style.opacity = 1
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.color = 'var(--text-secondary)'
                e.currentTarget.querySelector('.delete-btn').style.opacity = 0
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, overflow: 'hidden', whiteSpace: 'nowrap' }}>
                <MessageSquare size={14} flexShrink={0} />
                <span style={{ fontSize: 13, textOverflow: 'ellipsis', overflow: 'hidden' }}>
                  {log.prompt}
                </span>
              </div>

              {/* Botón borrar (visible en hover) */}
              <button
                className="delete-btn"
                onClick={(e) => {
                  e.stopPropagation()
                  onDeleteLog(log.id)
                }}
                style={{
                  opacity: 0,
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  padding: 2,
                  display: 'flex',
                  alignItems: 'center',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--danger)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
              >
                <Trash2 size={13} />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Footer del sidebar */}
      <div style={{ padding: '16px', borderTop: '1px solid var(--border)', fontSize: 12, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold' }}>
          U
        </div>
        Usuario Local
      </div>
    </div>
  )
}
