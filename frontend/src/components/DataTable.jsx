import { useState } from 'react'

const PAGE_SIZE = 20

const CATEGORY_COLORS = {
  Software: 'bg-blue-100 text-blue-800',
  Cloud: 'bg-sky-100 text-sky-800',
  AI: 'bg-amber-100 text-amber-800',
  Hardware: 'bg-slate-100 text-slate-700',
  Services: 'bg-indigo-100 text-indigo-800',
}

export default function DataTable({ rows }) {
  const [category, setCategory] = useState('')
  const [country, setCountry] = useState('')
  const [page, setPage] = useState(1)

  const categories = [...new Set(rows.map((r) => r.category))].sort()
  const countries = [...new Set(rows.map((r) => r.country))].sort()

  const filtered = rows.filter((r) => {
    return (
      (category === '' || r.category === category) &&
      (country === '' || r.country === country)
    )
  })

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const handleFilter = (setter) => (e) => {
    setter(e.target.value)
    setPage(1)
  }

  return (
    <div className="bg-white rounded-xl border border-[#dbeafe] shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex flex-wrap items-center gap-3 px-5 py-4 border-b border-[#dbeafe] bg-[#f8fafc]">
        <div className="mr-auto">
          <h2 className="text-blue-900 font-semibold text-sm">Sales Records</h2>
          <p className="text-blue-400 font-mono text-xs">{filtered.length} rows</p>
        </div>
        <select
          className="text-xs border border-[#dbeafe] rounded-lg px-3 py-1.5 text-blue-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
          value={category}
          onChange={handleFilter(setCategory)}
        >
          <option value="">All categories</option>
          {categories.map((c) => <option key={c}>{c}</option>)}
        </select>
        <select
          className="text-xs border border-[#dbeafe] rounded-lg px-3 py-1.5 text-blue-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
          value={country}
          onChange={handleFilter(setCountry)}
        >
          <option value="">All countries</option>
          {countries.map((c) => <option key={c}>{c}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-blue-400 uppercase tracking-widest border-b border-[#dbeafe]">
              {['ID', 'Date', 'Customer', 'Category', 'Product', 'Qty', 'Unit Price', 'Revenue', 'Country'].map((h) => (
                <th key={h} className="px-4 py-3 font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginated.map((row, i) => (
              <tr
                key={row.id}
                className={`border-b border-[#f0f4f8] hover:bg-[#f8fafc] transition-colors ${i % 2 === 0 ? '' : 'bg-[#fafbff]'}`}
              >
                <td className="px-4 py-3 text-blue-300 font-mono text-xs">{row.id}</td>
                <td className="px-4 py-3 text-slate-500 font-mono text-xs">{row.date}</td>
                <td className="px-4 py-3 text-blue-900 font-medium">{row.customer}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${CATEGORY_COLORS[row.category] || 'bg-gray-100 text-gray-700'}`}>
                    {row.category}
                  </span>
                </td>
                <td className="px-4 py-3 text-slate-600">{row.product}</td>
                <td className="px-4 py-3 text-center font-mono text-blue-800">{row.quantity}</td>
                <td className="px-4 py-3 font-mono text-slate-600">€{row.unit_price.toLocaleString()}</td>
                <td className="px-4 py-3 font-mono font-semibold text-amber-600">€{row.revenue.toLocaleString()}</td>
                <td className="px-4 py-3 text-slate-500">{row.country}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-5 py-3 border-t border-[#dbeafe] bg-[#f8fafc]">
        <span className="font-mono text-xs text-blue-400">Page {page} of {totalPages || 1}</span>
        <div className="flex gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-1.5 rounded-lg text-xs border border-[#dbeafe] text-blue-700 disabled:opacity-40 hover:bg-blue-50 cursor-pointer disabled:cursor-not-allowed transition-colors"
          >
            ← Prev
          </button>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages || totalPages === 0}
            className="px-3 py-1.5 rounded-lg text-xs border border-[#dbeafe] text-blue-700 disabled:opacity-40 hover:bg-blue-50 cursor-pointer disabled:cursor-not-allowed transition-colors"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  )
}
