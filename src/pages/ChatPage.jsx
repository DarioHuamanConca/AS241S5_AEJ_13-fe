import { useState, useRef, useEffect } from 'react'
import Navbar from '../components/layout/Navbar'
import Sidebar from '../components/layout/Sidebar'
import ChatInput from '../components/chat/ChatInput'
import LogList from '../components/chat/LogList'
import { useChatLogs } from '../hooks/useChatLogs'
import { CheckCircle, XCircle } from 'lucide-react'

export default function ChatPage() {
  const { logs, loading, error, fetchLogs, createLog, createTtsLog, editLog, removeLog } = useChatLogs()
  const [toast, setToast] = useState(null)
  const [activeLogId, setActiveLogId] = useState(null) // null = Nueva Conversación
  const messagesEndRef = useRef(null)

  const showToast = (message, type = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3500)
  }

  const handleCreate = async (prompt, provider) => {
    let result;
    if (provider === 'LLAMA') {
      result = await createLog(prompt)
      if (result.success) showToast('Consulta de texto registrada', 'success')
      else showToast('Error al procesar consulta', 'error')
    } else if (provider === 'TTS') {
      result = await createTtsLog(prompt)
      if (result.success && result.audioBlob) {
        new Audio(URL.createObjectURL(result.audioBlob)).play()
      } else {
        showToast('Error al generar el audio', 'error')
      }
    }

    // Después de crear, obtenemos los logs actualizados (en useChatLogs ya se llama fetchLogs)
    // Para enfocar el nuevo, simplemente esperamos un poco y agarramos el log con el ID más alto
    setTimeout(() => {
      // Forzamos que la vista muestre el más reciente (el que acabamos de crear)
      // Como no tenemos el ID exacto retornado por el backend, asumimos que es el primero en la lista reversa
      // o simplemente dejamos activeLogId en null para que muestre la vista de 'chat continuo' 
      // de la sesión actual, pero como el usuario pidió que cada prompt sea un chat:
    }, 500)
  }


  const [isCreating, setIsCreating] = useState(false)

  useEffect(() => {
    if (isCreating && logs.length > 0) {
      // The newest log is the one with the highest ID (assuming ascending order from DB)
      const newestLog = [...logs].sort((a, b) => b.id - a.id)[0]
      if (newestLog) {
        setActiveLogId(newestLog.id)
      }
      setIsCreating(false)
    }
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [logs])

  const handleCreateWithFocus = async (prompt, provider) => {
    setIsCreating(true)
    await handleCreate(prompt, provider);
  }

  const handleNewChat = () => {
    setActiveLogId(null)
    const textarea = document.querySelector('textarea')
    if (textarea) textarea.focus()
  }

  const handleSelectLog = (id) => {
    setActiveLogId(id)
  }

  const handleDelete = async (id) => {
    await removeLog(id)
    if (activeLogId === id) setActiveLogId(null)
  }

  // Los logs que se ven en la pantalla principal
  const visibleLogs = activeLogId 
    ? logs.filter(l => l.id === activeLogId)
    : []; // Vacío si es nueva conversación

  return (
    <div style={{ height: '100vh', display: 'flex', background: 'var(--bg-primary)', overflow: 'hidden' }}>
      {/* Sidebar a la izquierda */}
      <Sidebar
        logs={logs}
        onNewChat={handleNewChat}
        onSelectLog={handleSelectLog}
        onDeleteLog={handleDelete}
      />

      {/* Contenido principal a la derecha */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative' }}>
        <Navbar />

        {/* Chat Area (Scrollable) */}
        <main
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div style={{ width: '100%', maxWidth: 800 }}>
            <LogList
              logs={visibleLogs}
              loading={loading}
              error={error}
              onRefresh={fetchLogs}
              onEdit={editLog}
              onDelete={removeLog}
            />
            <div ref={messagesEndRef} />
          </div>
        </main>

        {/* Input Area (Fixed at bottom) */}
        <div
          style={{
            padding: '20px 24px 32px',
            background: 'var(--bg-primary)',
            borderTop: '1px solid var(--border)',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <div style={{ width: '100%', maxWidth: 800 }}>
            <ChatInput onSubmit={handleCreateWithFocus} loading={loading} />
            <p style={{ textAlign: 'center', fontSize: 11, color: 'var(--text-muted)', marginTop: 12 }}>
              La IA puede cometer errores. Considera verificar la información importante.
            </p>
          </div>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div
          style={{
            position: 'fixed', top: 80, right: 28, zIndex: 100, display: 'flex', alignItems: 'center', gap: 10,
            padding: '12px 18px', background: 'var(--bg-card)', borderRadius: 12, fontSize: 13, fontWeight: 500,
            color: toast.type === 'success' ? 'var(--success)' : 'var(--danger)',
            border: `1px solid ${toast.type === 'success' ? 'var(--success)' : 'var(--danger)'}40`,
            boxShadow: '0 8px 32px rgba(0,0,0,0.5)', animation: 'slideDown 0.25s ease',
          }}
        >
          {toast.type === 'success' ? <CheckCircle size={15} /> : <XCircle size={15} />}
          {toast.message}
        </div>
      )}
      <style>{`@keyframes slideDown { from { opacity: 0; transform: translateY(-12px); } to { opacity: 1; transform: translateY(0); } }`}</style>
    </div>
  )
}
