"use client";
import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell, Legend, PieChart, Pie
} from 'recharts';
import { motion } from 'framer-motion';
import { Zap, TrendingDown, DollarSign, Leaf } from 'lucide-react';

const efficiencyData = [
  { name: 'Mon', efficiency: 82, cost: 4.2 },
  { name: 'Tue', efficiency: 85, cost: 3.8 },
  { name: 'Wed', efficiency: 78, cost: 4.5 },
  { name: 'Thu', efficiency: 90, cost: 3.2 },
  { name: 'Fri', efficiency: 88, cost: 3.5 },
  { name: 'Sat', efficiency: 94, cost: 2.8 },
  { name: 'Sun', efficiency: 92, cost: 2.9 },
];

const vehicleMix = [
  { name: 'Cars', value: 45, color: '#10b981' },
  { name: 'Bikes', value: 25, color: '#3b82f6' },
  { name: 'Trucks', value: 20, color: '#f59e0b' },
  { name: 'Buses', value: 10, color: '#ef4444' },
];

export default function Analytics() {
  return (
    <div className="flex flex-col gap-8">
      <header>
        <h1 className="text-4xl font-bold mb-2">Fleet Analytics</h1>
        <p className="text-slate-400">Deep insights into battery efficiency, operational costs, and CO2 reduction.</p>
      </header>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-6">
        <div className="glass-card flex flex-col gap-4">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <Zap size={20} />
          </div>
          <div>
            <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Avg Efficiency</p>
            <h3 className="text-2xl font-bold">87.4%</h3>
            <p className="text-emerald-400 text-xs mt-1">↑ 4.2% from last week</p>
          </div>
        </div>

        <div className="glass-card flex flex-col gap-4">
          <div className="w-10 h-10 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">
            <TrendingDown size={20} />
          </div>
          <div>
            <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Energy Loss</p>
            <h3 className="text-2xl font-bold">12.6%</h3>
            <p className="text-blue-400 text-xs mt-1">↓ 1.8% from last week</p>
          </div>
        </div>

        <div className="glass-card flex flex-col gap-4">
          <div className="w-10 h-10 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
            <DollarSign size={20} />
          </div>
          <div>
            <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Cost Savings</p>
            <h3 className="text-2xl font-bold">$1,284</h3>
            <p className="text-amber-400 text-xs mt-1">Vs petrol equivalent</p>
          </div>
        </div>

        <div className="glass-card flex flex-col gap-4">
          <div className="w-10 h-10 rounded-lg bg-green-500/20 text-green-400 flex items-center justify-center">
            <Leaf size={20} />
          </div>
          <div>
            <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Carbon Saved</p>
            <h3 className="text-2xl font-bold">2.4 Tons</h3>
            <p className="text-green-400 text-xs mt-1">Monthly total</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Main Chart */}
        <div className="col-span-8 glass-card">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold">Battery Efficiency vs cost (7 Days)</h3>
            <select className="bg-white/5 border border-white/10 rounded-lg px-4 py-1 text-sm font-bold">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={efficiencyData}>
                <defs>
                  <linearGradient id="colorEff" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '12px' }}
                  itemStyle={{ color: '#10b981' }}
                />
                <Area type="monotone" dataKey="efficiency" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorEff)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Vehicle Mix Chart */}
        <div className="col-span-4 glass-card">
          <h3 className="text-xl font-bold mb-8">Fleet Composition</h3>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={vehicleMix}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {vehicleMix.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-3 mt-4">
            {vehicleMix.map((v) => (
              <div key={v.name} className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: v.color }} />
                  <span className="text-slate-400">{v.name}</span>
                </div>
                <span className="font-bold">{v.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Driving Pattern Table */}
      <div className="glass-card">
        <h3 className="text-xl font-bold mb-6">Weekly Performance Report</h3>
        <table className="w-full text-left">
          <thead>
            <tr className="text-slate-400 text-sm border-b border-white/5">
              <th className="pb-4 font-medium">Vehicle ID</th>
              <th className="pb-4 font-medium">Type</th>
              <th className="pb-4 font-medium">Distance</th>
              <th className="pb-4 font-medium">Efficiency</th>
              <th className="pb-4 font-medium">Energy Used</th>
              <th className="pb-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {[
              { id: 'EV-824', type: 'Bus', dist: '452 km', eff: '92%', energy: '380 kWh', status: 'Optimal' },
              { id: 'EV-102', type: 'Car', dist: '128 km', eff: '88%', energy: '22 kWh', status: 'Optimal' },
              { id: 'EV-341', type: 'Truck', dist: '890 km', eff: '76%', energy: '1,240 kWh', status: 'Maintenance' },
              { id: 'EV-092', type: 'Bike', dist: '45 km', eff: '95%', energy: '2.5 kWh', status: 'Optimal' },
            ].map((row) => (
              <tr key={row.id} className="text-sm hover:bg-white/5 transition-colors">
                <td className="py-4 font-bold">{row.id}</td>
                <td className="py-4 text-slate-300">{row.type}</td>
                <td className="py-4 text-slate-300">{row.dist}</td>
                <td className="py-4 text-emerald-400 font-bold">{row.eff}</td>
                <td className="py-4 text-slate-300">{row.energy}</td>
                <td className="py-4">
                  <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase ${
                    row.status === 'Optimal' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                  }`}>
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
