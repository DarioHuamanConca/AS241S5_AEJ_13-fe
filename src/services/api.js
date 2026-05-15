import axios from 'axios'

const api = axios.create({
  baseURL: '/api/ai',
  headers: { 'Content-Type': 'application/json' },
})

// ── CREATE ────────────────────────────────────────────
export const sendLlamaMessage = (prompt) =>
  api.post('/llama', { prompt }).then((r) => r.data)

export const sendTtsMessage = (prompt) =>
  api.post('/tts', { prompt }, { responseType: 'blob' }).then((r) => r.data)

// ── READ ──────────────────────────────────────────────
export const getLogs = () =>
  api.get('/logs').then((r) => r.data)

export const getLogById = (id) =>
  api.get(`/logs/${id}`).then((r) => r.data)

// ── UPDATE ────────────────────────────────────────────
export const updateLog = (id, prompt) =>
  api.put(`/logs/${id}`, { prompt }).then((r) => r.data)

// ── DELETE ────────────────────────────────────────────
export const deleteLog = (id) =>
  api.delete(`/logs/${id}`)
