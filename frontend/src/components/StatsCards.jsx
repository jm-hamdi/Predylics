export default function StatsCards({ stats }) {
  if (!stats) return null

  const cards = [
    {
      label: 'Total Revenue',
      value: `€${stats.total_revenue.toLocaleString()}`,
      accent: true,
    },
    {
      label: 'Total Orders',
      value: stats.total_orders,
      accent: false,
    },
    {
      label: 'Top Customer',
      value: stats.top_customer,
      accent: false,
    },
    {
      label: 'Top Category',
      value: stats.top_category,
      accent: false,
    },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className={`rounded-xl p-5 border shadow-sm transition-shadow hover:shadow-md cursor-default ${
            card.accent
              ? 'bg-blue-900 border-blue-800 text-white'
              : 'bg-white border-[#dbeafe] text-blue-900'
          }`}
        >
          <p className={`text-xs uppercase tracking-widest font-medium mb-2 ${card.accent ? 'text-blue-300' : 'text-blue-400'}`}>
            {card.label}
          </p>
          <p className={`text-xl font-semibold font-mono ${card.accent ? 'text-amber-400' : 'text-blue-900'}`}>
            {card.value}
          </p>
        </div>
      ))}
    </div>
  )
}
