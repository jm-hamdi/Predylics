import { useState } from 'react'

const PAGE_SIZE = 20

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
    <div className="bg-white rounded-xl shadow-sm border border-slate-100">
      {/* Filters */}
      <div className="flex flex-wrap gap-3 p-5 border-b border-slate-100">
        <h2 className="text-slate-700 font-semibold self-center mr-auto">Sales Data</h2>
        <select
          className="text-sm border border-slate-200 rounded-lg px-3 py-2 text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={category}
          onChange={handleFilter(setCategory)}
        >
          <option value="">All categories</option>
          {categories.map((c) => <option key={c}>{c}</option>)}
        </select>
        <select
          className="text-sm border border-slate-200 rounded-lg px-3 py-2 text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
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
          <thead className="bg-slate-50 text-slate-500 uppercase text-xs tracking-wide">
            <tr>
              {['ID', 'Date', 'Customer', 'Category', 'Product', 'Qty', 'Unit Price', 'Revenue', 'Country'].map((h) => (
                <th key={h} className="px-4 py-3 text-left font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {paginated.map((row) => (
              <tr key={row.id} className="hover:bg-slate-50">
                <td className="px-4 py-3 text-slate-400">{row.id}</td>
                <td className="px-4 py-3">{row.date}</td>
                <td className="px-4 py-3 font-medium">{row.customer}</td>
                <td className="px-4 py-3">
                  <span className="bg-indigo-50 text-indigo-600 text-xs px-2 py-1 rounded-full">{row.category}</span>
                </td>
                <td className="px-4 py-3">{row.product}</td>
                <td className="px-4 py-3">{row.quantity}</td>
                <td className="px-4 py-3">€{row.unit_price.toLocaleString()}</td>
                <td className="px-4 py-3 font-semibold text-emerald-600">€{row.revenue.toLocaleString()}</td>
                <td className="px-4 py-3">{row.country}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-5 py-4 border-t border-slate-100 text-sm text-slate-500">
        <span>{filtered.length} rows</span>
        <div className="flex gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-1 rounded-lg border border-slate-200 disabled:opacity-40 hover:bg-slate-50"
          >
            Previous
          </button>
          <span className="px-3 py-1">Page {page} / {totalPages}</span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-3 py-1 rounded-lg border border-slate-200 disabled:opacity-40 hover:bg-slate-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}
