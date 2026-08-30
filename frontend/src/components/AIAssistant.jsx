import { useState } from 'react'
import axios from 'axios'

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
      setError('Failed to get an answer. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      ask()
    }
  }

  const examples = [
    'What is the top category by revenue?',
    'Which country has the most orders?',
    'Who is the best customer?',
  ]

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white text-sm font-bold">AI</div>
        <h2 className="text-slate-700 font-semibold">Ask a question about your data</h2>
      </div>

      {/* Example questions */}
      <div className="flex flex-wrap gap-2 mb-4">
        {examples.map((ex) => (
          <button
            key={ex}
            onClick={() => setQuestion(ex)}
            className="text-xs text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full hover:bg-indigo-100 transition"
          >
            {ex}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="flex gap-3">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={handleKey}
          placeholder="e.g. What is the total revenue in France?"
          className="flex-1 border border-slate-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <button
          onClick={ask}
          disabled={loading || !question.trim()}
          className="bg-indigo-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 disabled:opacity-40 transition"
        >
          {loading ? 'Thinking...' : 'Ask'}
        </button>
      </div>

      {/* Answer */}
      {answer && (
        <div className="mt-4 bg-slate-50 border border-slate-200 rounded-lg p-4 text-sm text-slate-700 leading-relaxed">
          {answer}
        </div>
      )}
      {error && (
        <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-600">
          {error}
        </div>
      )}
    </div>
  )
}
