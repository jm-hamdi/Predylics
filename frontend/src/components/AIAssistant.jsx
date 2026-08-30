import { useState } from 'react'
import axios from 'axios'

const EXAMPLES = [
  'What is the top category by revenue?',
  'Which country has the most orders?',
  'Who is the best customer?',
]

export default function AIAssistant({ api }) {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const ask = async () => {
    if (!question.trim()) return
    setLoading(true)
    setAnswer('')
    setError('')
    try {
      const res = await axios.post(`${api}/ask`, { question })
      setAnswer(res.data.answer)
    } catch {
      setError('Something went wrong. Check that the backend is running.')
    } finally {
      setLoading(false)
    }
  }

  const handleKey = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      ask()
    }
  }

  return (
    <div className="bg-blue-900 rounded-xl border border-blue-800 shadow-sm p-5">
      {/* Title */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-7 h-7 bg-amber-500 rounded-lg flex items-center justify-center flex-shrink-0">
          <span className="text-blue-900 font-mono font-bold text-xs">AI</span>
        </div>
        <div>
          <h2 className="text-white font-semibold text-sm">Ask your data</h2>
          <p className="text-blue-400 text-xs">Powered by Groq - Llama</p>
        </div>
      </div>

      {/* Example chips */}
      <div className="flex flex-wrap gap-2 mb-4">
        {EXAMPLES.map((ex) => (
          <button
            key={ex}
            onClick={() => setQuestion(ex)}
            className="text-xs text-blue-200 bg-blue-800 hover:bg-blue-700 px-3 py-1.5 rounded-full transition-colors cursor-pointer border border-blue-700"
          >
            {ex}
          </button>
        ))}
      </div>

      {/* Input row */}
      <div className="flex gap-2">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={handleKey}
          placeholder="e.g. What is the total revenue in France?"
          className="flex-1 bg-blue-800 border border-blue-700 rounded-lg px-4 py-2.5 text-sm text-white placeholder-blue-500 focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono"
        />
        <button
          onClick={ask}
          disabled={loading || !question.trim()}
          className="bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-blue-900 font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors cursor-pointer disabled:cursor-not-allowed"
        >
          {loading ? '...' : 'Ask'}
        </button>
      </div>

      {/* Answer */}
      {answer && (
        <div className="mt-4 bg-blue-800 border border-blue-700 rounded-lg p-4 text-sm text-blue-100 leading-relaxed font-mono whitespace-pre-wrap">
          {answer}
        </div>
      )}
      {error && (
        <div className="mt-4 bg-red-900 border border-red-700 rounded-lg p-4 text-sm text-red-300">
          {error}
        </div>
      )}
    </div>
  )
}
