import { useEffect, useState } from 'react'
import axios from 'axios'
import StatsCards from './components/StatsCards'
import Charts from './components/Charts'
import DataTable from './components/DataTable'
import AIAssistant from './components/AIAssistant'

const API = import.meta.env.VITE_API_URL || 'http://localhost:8001'

export default function App() {
  const [stats, setStats] = useState(null)
  const [rows, setRows] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      axios.get(`${API}/stats`),
      axios.get(`${API}/data`),
    ]).then(([statsRes, dataRes]) => {
      setStats(statsRes.data)
      setRows(dataRes.data.rows)
      setTotal(dataRes.data.total)
    }).finally(() => setLoading(false))
  }, [])

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#f0f4f8]">
      <div className="text-center">
        <div className="w-8 h-8 border-4 border-blue-800 border-t-amber-500 rounded-full animate-spin mx-auto mb-3" />
        <p className="text-blue-900 font-mono text-sm">Loading data...</p>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#f0f4f8]">
      {/* Header */}
      <header className="bg-blue-900 px-6 py-4 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center">
              <span className="text-blue-900 font-mono font-bold text-sm">P</span>
            </div>
            <div>
              <h1 className="text-white font-semibold text-lg leading-none">Predylics</h1>
              <p className="text-blue-300 text-xs mt-0.5">Sales Data Assistant</p>
            </div>
          </div>
          <div className="text-right font-mono text-xs text-blue-300">
            <p>{total} records</p>
            <p>{stats?.date_range?.from} → {stats?.date_range?.to}</p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-7 space-y-6">
        <StatsCards stats={stats} />
        <Charts stats={stats} />
        <DataTable rows={rows} />
        <AIAssistant api={API} />
      </main>

      <footer className="text-center py-4 text-blue-400 font-mono text-xs">
        Predylics — Technical Test · Jawad Mhamdi
      </footer>
    </div>
  )
}
