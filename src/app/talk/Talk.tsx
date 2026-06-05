// Talk.tsx — Full conversation room with text + voice input, brain-v3 context, TTS, localStorage persist
import { useState, useRef, useEffect, useCallback } from 'react'
import { Mic, Send, Square, Volume2, Trash2 } from 'lucide-react'

// ——— Types ———
interface Message {
  id: string
  role: 'user' | 'assistant'
  text: string
  audioUrl?: string
  brainContext?: string[]
}
type Status = 'idle' | 'recording' | 'transcribing' | 'thinking' | 'speaking'

// ——— Quebec‑FR microcopy ———
const T = {
  placeholder: 'Écris ton message…',
  sendTooltip: 'Envoyer',
  recordTooltip: 'Parler (Whisper)',
  stopTooltip: 'Arrêter',
  thinking: 'réfléchit…',
  speakTooltip: 'Écouter (VoxCPM)',
  deleteTooltip: 'Effacer session',
  brainLabel: '🧠 Contexte',
}

// ——— Helper: get brain context ———
async function queryBrain(query: string): Promise<string[]> {
  try {
    const res = await fetch(`/api/brain-query?q=${encodeURIComponent(query)}`)
    if (!res.ok) return []
    const { context } = await res.json()
    return context || []
  } catch {
    return []
  }
}

// ——— Helper: transcribe audio via Whisper (Blob → text) ———
async function transcribeAudio(audioBlob: Blob): Promise<string> {
  const form = new FormData()
  form.append('file', audioBlob, 'recording.webm')
  const res = await fetch('/api/whisper', { method: 'POST', body: form })
  if (!res.ok) return ''
  const { text } = await res.json()
  return text || ''
}

// ——— Helper: text → speech via VoxCPM (text → audio blob) ———
async function speakText(text: string): Promise<Blob | null> {
  try {
    const res = await fetch('/api/voxcpm', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, voice: 'default' }),
    })
    if (!res.ok) return null
    return await res.blob()
  } catch {
    return null
  }
}

// ——— Component ———
export default function Talk() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const audioPlayerRef = useRef<HTMLAudioElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  // ——— Load session from localStorage ———
  useEffect(() => {
    const saved = localStorage.getItem('talk-session')
    if (saved) {
      try {
        setMessages(JSON.parse(saved))
      } catch { /* ignore */ }
    }
  }, [])

  // ——— Save session on change ———
  useEffect(() => {
    localStorage.setItem('talk-session', JSON.stringify(messages))
  }, [messages])

  // ——— Auto‑scroll ———
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // ——— Send text message ———
  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim()) return
    setStatus('thinking')
    const brainCtx = await queryBrain(text)
    // Optimistically add user message
    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      text,
      brainContext: brainCtx,
    }
    // Here you would call the LLM endpoint with context. For brevity we simulate.
    const assistantMsg: Message = {
      id: `asst-${Date.now()}`,
      role: 'assistant',
      text: 'Bonjour, Collin. Comment puis‑je t’aider aujourd’hui ?', // placeholder
      brainContext: brainCtx,
    }
    setMessages(prev => [...prev, userMsg, assistantMsg])
    setInput('')
    setStatus('idle')
    // Optionally auto‑speak assistant reply
    generateSpeech(assistantMsg.text)
  }, [])

  // ——— Voice recording ———
  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const recorder = new MediaRecorder(stream, { mimeType: 'audio/webm' })
      mediaRecorderRef.current = recorder
      audioChunksRef.current = []
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data)
      }
      recorder.onstop = async () => {
        const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' })
        stream.getTracks().forEach(track => track.stop())
        setStatus('transcribing')
        const text = await transcribeAudio(blob)
        if (text) {
          setInput('')
          await sendMessage(text)
        } else {
          setStatus('idle')
        }
      }
      recorder.start()
      setStatus('recording')
    } catch {
      setStatus('idle')
    }
  }, [sendMessage])

  const stopRecording = useCallback(() => {
    mediaRecorderRef.current?.stop()
    setStatus('idle')
  }, [])

  // ——— Play assistant audio ———
  const generateSpeech = useCallback(async (text: string) => {
    const blob = await speakText(text)
    if (blob && audioPlayerRef.current) {
      const url = URL.createObjectURL(blob)
      audioPlayerRef.current.src = url
      audioPlayerRef.current.play()
    }
  }, [])

  // ——— Clear session ———
  const clearSession = useCallback(() => {
    localStorage.removeItem('talk-session')
    setMessages([])
  }, [])

  return (
    <div className="flex flex-col h-screen max-w-3xl mx-auto p-4 bg-stone-50 text-gray-800">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">Discussion · Atlas & Collin</h1>
        <button onClick={clearSession} title={T.deleteTooltip} className="p-2 hover:bg-stone-200 rounded-full">
          <Trash2 className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-2">
        {messages.length === 0 && (
          <p className="text-center text-stone-400 italic mt-20">
            Commencez la conversation…
          </p>
        )}
        {messages.map(msg => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[75%] p-3 rounded-2xl shadow-sm ${
              msg.role === 'user' ? 'bg-indigo-100' : 'bg-white border border-stone-200'
            }`}>
              <p className="text-sm">{msg.text}</p>
              {msg.brainContext && msg.brainContext.length > 0 && (
                <details className="mt-1 text-xs text-stone-500">
                  <summary>{T.brainLabel}</summary>
                  <ul className="list-disc pl-4">
                    {msg.brainContext.map((ctx, i) => <li key={i}>{ctx}</li>)}
                  </ul>
                </details>
              )}
              {msg.role === 'assistant' && (
                <button
                  onClick={() => generateSpeech(msg.text)}
                  title={T.speakTooltip}
                  className="mt-1 text-xs text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                >
                  <Volume2 className="w-3 h-3" /> Parler
                </button>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="flex items-end gap-2 mt-4 border-t border-stone-200 pt-4">
        <textarea
          ref={inputRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              sendMessage(input)
            }
          }}
          placeholder={T.placeholder}
          className="flex-1 resize-none rounded-lg border border-stone-300 p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm bg-white"
          rows={2}
        />
        <button
          onClick={() => status === 'recording' ? stopRecording() : startRecording()}
          title={status === 'recording' ? T.stopTooltip : T.recordTooltip}
          className={`px-4 py-3 rounded-lg text-white font-medium transition-colors ${
            status === 'recording' ? 'bg-red-500 hover:bg-red-600' : 'bg-stone-500 hover:bg-stone-600'
          }`}
        >
          {status === 'recording' ? <Square className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
        </button>
        <button
          onClick={() => sendMessage(input)}
          disabled={!input.trim() || status === 'thinking'}
          title={T.sendTooltip}
          className={`px-4 py-3 rounded-lg text-white font-medium transition-colors ${
            input.trim() && status !== 'thinking' ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-stone-300 cursor-not-allowed'
          }`}
        >
          <Send className="w-5 h-5" />
        </button>
      </div>

      {/* Status indicator */}
      {status !== 'idle' && (
        <div className="text-xs text-stone-500 text-center mt-2">
          {status === 'recording' && '🎤 Enregistrement…'}
          {status === 'transcribing' && '📝 Transcription…'}
          {status === 'thinking' && '🧠 ' + T.thinking}
          {status === 'speaking' && '🔊 Parle…'}
        </div>
      )}

      {/* Hidden audio element for TTS */}
      <audio ref={audioPlayerRef} className="hidden" autoPlay />
    </div>
  )
}