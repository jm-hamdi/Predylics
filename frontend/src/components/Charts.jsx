import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  PieChart, Pie, Cell, Legend,
} from 'recharts'

const BAR_COLOR = '#1e40af'
const PIE_COLORS = ['#1e40af', '#d97706', '#1d4ed8', '#b45309', '#3b82f6', '#f59e0b']

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-blue-900 text-white px-3 py-2 rounded-lg text-xs font-mono shadow-lg">
        {label && <p className="text-blue-300 mb-1">{label}</p>}
        <p className="text-amber-400 font-semibold">
          {payload[0].name === 'revenue'
            ? `€${payload[0].value.toLocaleString()}`
            : payload[0].value}
        </p>
      </div>
    )
  }
  return null
}

export default function Charts({ stats }) {
  if (!stats) return null

  const barData = Object.entries(stats.revenue_by_category).map(([name, value]) => ({
    name,
    revenue: value,
  }))

  const pieData = Object.entries(stats.orders_by_country).map(([name, value]) => ({
    name,
    value,
  }))

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-white rounded-xl p-5 border border-[#dbeafe] shadow-sm">
        <h2 className="text-blue-900 font-semibold text-sm mb-1">Revenue by Category</h2>
        <p className="text-blue-400 text-xs mb-4 font-mono">in euros (€)</p>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={barData} barCategoryGap="30%">
            <CartesianGrid strokeDasharray="3 3" stroke="#dbeafe" vertical={false} />
            <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#475569', fontFamily: 'Fira Sans' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#475569', fontFamily: 'Fira Code' }} axisLine={false} tickLine={false} tickFormatter={(v) => `€${(v/1000).toFixed(0)}k`} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="revenue" fill={BAR_COLOR} radius={[5, 5, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-xl p-5 border border-[#dbeafe] shadow-sm">
        <h2 className="text-blue-900 font-semibold text-sm mb-1">Orders by Country</h2>
        <p className="text-blue-400 text-xs mb-4 font-mono">number of orders</p>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={75}
              innerRadius={30}
            >
              {pieData.map((_, i) => (
                <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
              ))}
            </Pie>
            <Legend
              iconType="circle"
              iconSize={8}
              formatter={(value) => <span style={{ fontSize: 11, color: '#475569', fontFamily: 'Fira Sans' }}>{value}</span>}
            />
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
