"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Map, ShieldCheck, Leaf, AlertCircle, TrendingUp, BarChart3, Clock } from 'lucide-react';
import Link from 'next/link';

export default function Dashboard() {
  const alerts = [
    { type: 'warning', msg: 'Vehicle EV-341 requires maintenance', time: '10 min ago' },
    { type: 'info', msg: 'Route AI updated for Sector 4 congestion', time: '25 min ago' },
    { type: 'success', msg: 'Fleet energy target achieved', time: '1 hour ago' },
  ];

  return (
    <div className="flex flex-col gap-8">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold mb-2">Fleet Dashboard</h1>
          <p className="text-slate-400">Real-time oversight of your ground EV operations.</p>
        </div>
        <div className="flex gap-4">
          <div className="glass px-4 py-2 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-sm font-bold">SYSTEM LIVE</span>
          </div>
        </div>
      </header>

      {/* Main Stats Row */}
      <div className="grid grid-cols-4 gap-6">
        {[
          { label: 'Active Vehicles', value: '142', icon: Zap, color: 'text-emerald-400' },
          { label: 'Energy Efficiency', value: '94%', icon: TrendingUp, color: 'text-blue-400' },
          { label: 'Routes Optimized', value: '1,204', icon: Map, color: 'text-amber-400' },
          { label: 'Carbon Offset', value: '14.2t', icon: Leaf, color: 'text-green-400' },
        ].map((stat, i) => (
          <div key={i} className="glass-card flex items-center gap-6">
            <div className={`w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center ${stat.color}`}>
              <stat.icon size={28} />
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">{stat.label}</p>
              <h3 className="text-2xl font-bold">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Fleet Map Preview */}
        <div className="col-span-8 glass-card h-[400px] relative p-0 overflow-hidden group">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074&auto=format&fit=crop')] bg-cover bg-center transition-transform duration-1000 group-hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          
          <div className="absolute top-6 left-6 flex flex-col gap-2">
            <div className="glass px-4 py-2 text-sm font-bold">LIVE TRACKING: SECTOR 1</div>
          </div>

          <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
            <div>
              <h3 className="text-2xl font-bold mb-1">Active Airspace Control</h3>
              <p className="text-slate-300 text-sm">Managing 42 vehicles in high-congestion zones.</p>
            </div>
            <Link href="/route">
              <button className="btn-primary py-2 px-6">OPEN FULL MAP</button>
            </Link>
          </div>
        </div>

        {/* System Alerts */}
        <div className="col-span-4 flex flex-col gap-6">
          <div className="glass-card flex-1">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">System Alerts</h3>
              <span className="text-xs font-bold text-slate-400 hover:text-white cursor-pointer transition-colors underline">MARK ALL READ</span>
            </div>
            <div className="space-y-4">
              {alerts.map((alert, i) => (
                <div key={i} className="flex gap-4 p-3 rounded-xl hover:bg-white/5 transition-all group">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                    alert.type === 'warning' ? 'bg-red-500/20 text-red-400' : 
                    alert.type === 'info' ? 'bg-blue-500/20 text-blue-400' : 'bg-emerald-500/20 text-emerald-400'
                  }`}>
                    {alert.type === 'warning' ? <AlertCircle size={20} /> : <Clock size={20} />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium leading-tight group-hover:text-emerald-400 transition-colors">{alert.msg}</p>
                    <p className="text-[10px] text-slate-500 mt-1 uppercase font-bold">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card bg-emerald-500/10 border-emerald-500/20">
            <h4 className="text-lg font-bold mb-2">Fleet Health: 98.4%</h4>
            <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full w-[98.4%]" />
            </div>
            <p className="text-xs text-slate-400 mt-3 font-medium italic">"Operational efficiency is at an all-time high." - ASTRA AI</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div className="glass-card flex items-center justify-between p-8">
          <div className="flex gap-6 items-center">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center shadow-lg shadow-amber-500/20">
              <ShieldCheck size={32} />
            </div>
            <div>
              <h3 className="text-xl font-bold">Safety Protocols Active</h3>
              <p className="text-slate-400 text-sm">Automated emergency response system is standing by.</p>
            </div>
          </div>
          <button className="px-6 py-2 border border-white/10 rounded-xl hover:bg-white/5 transition-all font-bold text-sm">VIEW AUDIT</button>
        </div>

        <div className="glass-card flex items-center justify-between p-8">
          <div className="flex gap-6 items-center">
            <div className="w-16 h-16 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center shadow-lg shadow-purple-500/20">
              <BarChart3 size={32} />
            </div>
            <div>
              <h3 className="text-xl font-bold">Monthly Efficiency Report</h3>
              <p className="text-slate-400 text-sm">Download your latest performance analysis PDF.</p>
            </div>
          </div>
          <button className="px-6 py-2 border border-white/10 rounded-xl hover:bg-white/5 transition-all font-bold text-sm">DOWNLOAD</button>
        </div>
      </div>
    </div>
  );
}
