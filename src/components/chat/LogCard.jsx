import { User, Bot, Download } from 'lucide-react'

export default function LogCard({ log }) {
  // Función auxiliar para saber si es un base64 de audio válido
  const isAudio = log.provider === 'TTS' && log.response?.startsWith('data:audio')

  return (
    <div id={`log-${log.id}`} style={{ display: 'flex', flexDirection: 'column', gap: 24, transition: 'background-color 0.5s', padding: '12px 16px', borderRadius: 16 }}>
      {/* ── BUBBLE DEL USUARIO (Derecha) ── */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
        <div style={{ display: 'flex', gap: 12, maxWidth: '80%', alignItems: 'flex-start', flexDirection: 'row-reverse' }}>
          {/* Avatar Usuario */}
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--bg-hover)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <User size={16} color="var(--text-secondary)" />
          </div>
          {/* Burbuja Texto Usuario */}
          <div style={{ background: 'var(--bg-hover)', padding: '12px 16px', borderRadius: '18px 18px 4px 18px', color: 'var(--text-primary)', fontSize: 14, lineHeight: 1.5 }}>
            {log.prompt}
          </div>
        </div>
      </div>

      {/* ── BUBBLE DE LA IA (Izquierda) ── */}
      {log.response && (
        <div style={{ display: 'flex', justifyContent: 'flex-start', width: '100%' }}>
          <div style={{ display: 'flex', gap: 12, maxWidth: '85%', alignItems: 'flex-start' }}>
            {/* Avatar IA */}
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: log.provider === 'LLAMA' ? 'var(--llama)' : 'var(--tts)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Bot size={18} color="#fff" />
            </div>

            {/* Contenido Respuesta */}
            <div style={{ paddingTop: 4, width: '100%' }}>
              {/* Etiqueta de qué IA respondió */}
              <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6 }}>
                {log.provider === 'LLAMA' ? 'Llama / Qwen' : 'Audio TTS'}
              </div>

              {/* Si es audio */}
              {isAudio ? (
                <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 16, padding: 16, display: 'inline-flex', flexDirection: 'column', gap: 12, minWidth: 280 }}>
                  <audio controls src={log.response} style={{ width: '100%', height: 40 }} />
                  <a
                    href={log.response}
                    download={`respuesta-audio-${log.id}.mp3`}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '8px 0', background: 'var(--bg-hover)', borderRadius: 8, color: 'var(--text-primary)', fontSize: 12, textDecoration: 'none', transition: 'background 0.2s', fontWeight: 500 }}
                    onMouseEnter={(e) => e.target.style.background = 'var(--border)'}
                    onMouseLeave={(e) => e.target.style.background = 'var(--bg-hover)'}
                  >
                    <Download size={14} /> Descargar Audio MP3
                  </a>
                </div>
              ) : (
                /* Si es texto */
                <div style={{ color: 'var(--text-primary)', fontSize: 15, lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>
                  {log.response}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
