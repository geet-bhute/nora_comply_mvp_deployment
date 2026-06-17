'use client'

import { useRef, useEffect, useState } from 'react'
import { useApp } from '@/lib/store'
import type { ChatMessage } from '@/lib/types'

const EU_AI_ACT_URL = 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1689'

export default function AskPage() {
  const { chatLog, setChatLog } = useApp()
  const inputRef = useRef<HTMLInputElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }

  useEffect(() => { scrollToBottom() }, [chatLog])

  const [pending, setPending] = useState(false)

  const buildEscapeHtml = () =>
    `<div class="esc-box"><b>Want the full legal detail?</b> Read the official EU AI Act text on EUR-Lex.<br><a class="btn btn-violet" href="${EU_AI_ACT_URL}" target="_blank" rel="noopener noreferrer">View the EU AI Act →</a></div>`

  // Turn the model's plain-text/markdown-ish reply into safe HTML.
  const formatAiText = (text: string) => {
    const escaped = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    const linked = escaped.replace(/(https?:\/\/[^\s)]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>')
    const inline = (s: string) => s
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/(?<!\*)\*(?!\*)(.+?)\*(?!\*)/g, '<em>$1</em>')

    return linked
      .split(/\n{2,}/)
      .map(block => {
        const lines = block.split('\n').filter(l => l.trim().length > 0)
        const isNumbered = lines.length > 0 && lines.every(l => /^\s*\d+[.)]\s+/.test(l))
        const isBulleted = lines.length > 0 && lines.every(l => /^\s*[-*•]\s+/.test(l))

        if (isNumbered) {
          const items = lines.map(l => `<li>${inline(l.replace(/^\s*\d+[.)]\s+/, ''))}</li>`).join('')
          return `<ol>${items}</ol>`
        }
        if (isBulleted) {
          const items = lines.map(l => `<li>${inline(l.replace(/^\s*[-*•]\s+/, ''))}</li>`).join('')
          return `<ul>${items}</ul>`
        }
        return `<p>${inline(block.replace(/\n/g, '<br/>'))}</p>`
      })
      .join('')
  }

  const sendMessage = async (q: string) => {
    if (!q.trim() || pending) return
    if (inputRef.current) inputRef.current.value = ''

    const userMsg: ChatMessage = { role: 'user', html: `<p>${q.replace(/</g, '&lt;')}</p>` }
    const withUser = [...(chatLog ?? []), userMsg]
    setChatLog(withUser)
    setPending(true)

    let aiMsg: ChatMessage = { role: 'ai', html: '<span class="conf law">● Grounded in EU AI Act</span><div class="typing"><i></i><i></i><i></i></div>' }
    setChatLog([...withUser, aiMsg])

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [{ role: 'user', content: q }] }),
      })

      if (!res.ok || !res.body) throw new Error(`Request failed (${res.status})`)

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let full = ''

      for (;;) {
        const { done, value } = await reader.read()
        if (done) break
        full += decoder.decode(value, { stream: true })
        aiMsg = { role: 'ai', html: `<span class="conf law">● Grounded in EU AI Act</span>${formatAiText(full)}` }
        setChatLog([...withUser, aiMsg])
      }

      aiMsg = { role: 'ai', html: `<span class="conf law">● Grounded in EU AI Act</span>${formatAiText(full)}${buildEscapeHtml()}` }
      setChatLog([...withUser, aiMsg])
    } catch {
      aiMsg = {
        role: 'ai',
        html: `<span class="conf legal">● Needs legal review</span><p>I couldn't reach the compliance assistant just now. Please try again.</p>${buildEscapeHtml()}`,
      }
      setChatLog([...withUser, aiMsg])
    } finally {
      setPending(false)
    }
  }

  const CHIPS = [
    "Do I need a DPIA for Bullhorn's match feature?",
    'What does human oversight actually mean?',
    "When's the deadline now?",
    "Are we liable for vendor bias?",
  ]

  const messages = chatLog ?? []

  return (
    <>
      <div className="page-eyebrow">Grounded answers · cite or be silent</div>
      <div className="page-title">Ask Nora</div>
      <div className="page-lede">Answers are retrieved from the Act, official guidance, and <b>your own records</b>, never guessed. Every claim carries a citation, with a link to the official text when you want the full legal detail.</div>

      <div className="chips">
        {CHIPS.map(c => (
          <button key={c} className="chip" onClick={() => sendMessage(c)}>{c}</button>
        ))}
      </div>

      <div className="chat-wrap">
        <div className="chat-scroll" ref={scrollRef}>
          {messages.length === 0 && (
            <div className="msg ai">
              <div className="who">N</div>
              <div className="bubble">
                <span className="conf law">● Grounded in law</span>
                <p>Hi. I answer from the EU AI Act, official guidance, and your own tool register and evidence. If I can&apos;t ground an answer, I&apos;ll say so and point you to the official text instead of guessing.</p>
                <p>Try one of the suggestions above, or ask anything.</p>
              </div>
            </div>
          )}
          {messages.map((m, i) => (
            <div key={i} className={`msg ${m.role}`}>
              <div className="who">{m.role === 'ai' ? 'N' : 'CO'}</div>
              <div
                className="bubble"
                dangerouslySetInnerHTML={{ __html: m.html }}
              />
            </div>
          ))}
        </div>

        <div className="composer">
          <input
            ref={inputRef}
            placeholder="Ask about your obligations, tools, deadlines..."
            disabled={pending}
            onKeyDown={e => { if (e.key === 'Enter') sendMessage(inputRef.current?.value ?? '') }}
          />
          <button className="btn btn-primary" disabled={pending} onClick={() => sendMessage(inputRef.current?.value ?? '')}>
            {pending ? 'Asking…' : 'Ask'}
          </button>
        </div>
      </div>
    </>
  )
}
