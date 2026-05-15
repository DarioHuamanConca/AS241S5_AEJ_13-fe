import { useState, useCallback } from 'react'
import { getLogs, sendLlamaMessage, sendTtsMessage, updateLog, deleteLog } from '../services/api'

export function useChatLogs() {
  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchLogs = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getLogs()
      setLogs(data)
    } catch (e) {
      setError('No se pudieron cargar los registros.')
    } finally {
      setLoading(false)
    }
  }, [])

  const createLog = useCallback(async (prompt) => {
    setLoading(true)
    setError(null)
    try {
      const response = await sendLlamaMessage(prompt)
      await fetchLogs()
      return { success: true, response }
    } catch (e) {
      setError('Error al enviar la consulta a Llama.')
      return { success: false }
    } finally {
      setLoading(false)
    }
  }, [fetchLogs])

  const createTtsLog = useCallback(async (prompt) => {
    setLoading(true)
    setError(null)
    try {
      const audioBlob = await sendTtsMessage(prompt)
      await fetchLogs()
      return { success: true, audioBlob }
    } catch (e) {
      setError('Error al generar el audio.')
      return { success: false }
    } finally {
      setLoading(false)
    }
  }, [fetchLogs])

  const editLog = useCallback(async (id, prompt) => {
    setLoading(true)
    setError(null)
    try {
      const response = await updateLog(id, prompt)
      await fetchLogs()
      return response
    } catch (e) {
      setError('Error al actualizar el registro.')
    } finally {
      setLoading(false)
    }
  }, [fetchLogs])

  const removeLog = useCallback(async (id) => {
    setLoading(true)
    setError(null)
    try {
      await deleteLog(id)
      setLogs((prev) => prev.filter((log) => log.id !== id))
    } catch (e) {
      setError('Error al eliminar el registro.')
    } finally {
      setLoading(false)
    }
  }, [])

  return { logs, loading, error, fetchLogs, createLog, createTtsLog, editLog, removeLog }
}
