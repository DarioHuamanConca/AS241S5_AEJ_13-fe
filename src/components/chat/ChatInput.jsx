import { useState } from 'react'
import { Send, Loader2, MessageSquarePlus, Zap, Volume2 } from 'lucide-react'

export default function ChatInput({ onSubmit, loading }) {
  const [prompt, setPrompt] = useState('')
  const [provider, setProvider] = useState('LLAMA') // 'LLAMA' or 'TTS'

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!prompt.trim() || loading) return
    await onSubmit(prompt.trim(), provider)
    setPrompt('')
  }

  return (
    <div
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: 16,
        padding: 20,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 14,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <MessageSquarePlus size={16} color="var(--accent)" />
          <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)' }}>
            Nueva consulta
          </span>
        </div>

        {/* Provider Toggle */}
        <div style={{ display: 'flex', background: 'var(--bg-secondary)', borderRadius: 8, padding: 3, border: '1px solid var(--border)' }}>
          <button
            type="button"
            onClick={() => setProvider('LLAMA')}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '6px 12px', borderRadius: 6, fontSize: 12, fontWeight: 500,
              border: 'none', cursor: 'pointer', fontFamily: 'inherit',
              background: provider === 'LLAMA' ? 'var(--llama)20' : 'transparent',
              color: provider === 'LLAMA' ? 'var(--llama)' : 'var(--text-muted)',
              transition: 'all 0.2s'
            }}
          >
            <Zap size={13} />
            Texto (Llama)
          </button>
          <button
            type="button"
            onClick={() => setProvider('TTS')}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '6px 12px', borderRadius: 6, fontSize: 12, fontWeight: 500,
              border: 'none', cursor: 'pointer', fontFamily: 'inherit',
              background: provider === 'TTS' ? 'var(--tts)20' : 'transparent',
              color: provider === 'TTS' ? 'var(--tts)' : 'var(--text-muted)',
              transition: 'all 0.2s'
            }}
          >
            <Volume2 size={13} />
            Audio (TTS)
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder={provider === 'LLAMA' ? "Escribe tu pregunta para Llama..." : "Escribe el texto que quieres convertir a voz..."}
          disabled={loading}
          rows={3}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              handleSubmit(e)
            }
          }}
          style={{
            width: '100%',
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border)',
            borderRadius: 10,
            padding: '12px 14px',
            color: 'var(--text-primary)',
            fontSize: 14,
            resize: 'none',
            fontFamily: 'inherit',
            outline: 'none',
            transition: 'border-color 0.2s',
          }}
          onFocus={(e) => (e.target.style.borderColor = provider === 'LLAMA' ? 'var(--llama)' : 'var(--tts)')}
          onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
        />
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button
            type="submit"
            disabled={!prompt.trim() || loading}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '9px 18px',
              background: prompt.trim() && !loading ? (provider === 'LLAMA' ? 'var(--llama)' : 'var(--tts)') : 'var(--bg-hover)',
              color: prompt.trim() && !loading ? '#fff' : 'var(--text-muted)',
              border: 'none',
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 500,
              cursor: prompt.trim() && !loading ? 'pointer' : 'not-allowed',
              transition: 'all 0.2s',
              fontFamily: 'inherit',
            }}
          >
            {loading ? (
              <Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} />
            ) : (
              <Send size={14} />
            )}
            {loading ? 'Procesando...' : (provider === 'LLAMA' ? 'Enviar' : 'Generar Audio')}
          </button>
        </div>
      </form>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  )
}
