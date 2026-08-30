export default function StatsCards({ stats }) {
  if (!stats) return null

  const cards = [
    { label: 'Total Revenue', value: `€${stats.total_revenue.toLocaleString()}` },
    { label: 'Total Orders', value: stats.total_orders },
    { label: 'Top Customer', value: stats.top_customer },
    { label: 'Top Category', value: stats.top_category },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {cards.map((card) => (
        <div key={card.label} className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
          <p className="text-slate-400 text-xs uppercase tracking-wide mb-1">{card.label}</p>
          <p className="text-slate-800 text-xl font-semibold">{card.value}</p>
        </div>
      ))}
    </div>
  )
}
