import { useEffect } from 'react'
import { Inbox, Loader2 } from 'lucide-react'
import LogCard from './LogCard'

export default function LogList({ logs, loading, error, onRefresh, onEdit, onDelete }) {
  useEffect(() => {
    onRefresh()
  }, [])

  return (
    <div style={{ paddingBottom: 40 }}>
      {/* Error */}
      {error && (
        <div
          style={{
            padding: '12px 16px', background: 'var(--danger-light)', border: '1px solid var(--danger)40',
            borderRadius: 10, fontSize: 13, color: 'var(--danger)', marginBottom: 16, textAlign: 'center'
          }}
        >
          {error}
        </div>
      )}

      {/* Loading state */}
      {loading && logs.length === 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 0', color: 'var(--text-muted)', gap: 12 }}>
          <Loader2 size={22} style={{ animation: 'spin 1s linear infinite' }} />
          <span style={{ fontSize: 13 }}>Conectando con la IA...</span>
        </div>
      )}

      {/* Empty state */}
      {!loading && logs.length === 0 && !error && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '100px 0', color: 'var(--text-muted)', gap: 16 }}>
          <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'var(--bg-card)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Inbox size={24} />
          </div>
          <div style={{ textAlign: 'center' }}>
            <h3 style={{ fontSize: 18, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 6 }}>¿En qué puedo ayudarte hoy?</h3>
            <p style={{ fontSize: 14 }}>Selecciona Texto o Imagen en la parte inferior y envía tu mensaje.</p>
          </div>
        </div>
      )}

      {/* List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
        {logs.map((log) => (
          <LogCard
            key={log.id}
            log={log}
            onEdit={onEdit}
            onDelete={onDelete}
            loading={loading}
          />
        ))}
      </div>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
