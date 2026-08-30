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
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <p className="text-slate-500 text-lg">Loading data...</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-8 py-5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Predylics</h1>
            <p className="text-slate-500 text-sm">Data Assistant — Sales Analysis</p>
          </div>
          <div className="text-right text-sm text-slate-400">
            <p>{total} records</p>
            <p>{stats?.date_range?.from} → {stats?.date_range?.to}</p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-8 space-y-8">
        <StatsCards stats={stats} />
        <Charts stats={stats} />
        <DataTable rows={rows} />
        <AIAssistant api={API} />
      </main>
    </div>
  )
}
