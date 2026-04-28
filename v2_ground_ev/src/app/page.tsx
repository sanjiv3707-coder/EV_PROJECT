"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Zap, ShieldCheck, Map, Leaf, ChevronRight, BarChart3 } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const stats = [
    { label: 'Battery Saved', value: '24.8%', icon: Zap, color: 'text-yellow-400' },
    { label: 'Charging Stations', value: '1,280', icon: Map, color: 'text-blue-400' },
    { label: 'Smart Routes', value: '452', icon: ShieldCheck, color: 'text-emerald-400' },
    { label: 'CO₂ Reduced', value: '12.5t', icon: Leaf, color: 'text-green-400' },
  ];

  return (
    <div className="flex flex-col gap-12">
      {/* Hero Section */}
      <section className="relative h-[500px] rounded-[40px] overflow-hidden group">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=2072&auto=format&fit=crop')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
        
        <div className="relative h-full flex flex-col justify-center px-12 max-w-2xl gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 bg-emerald-500/20 text-emerald-400 px-4 py-1 rounded-full w-fit border border-emerald-500/30 text-sm font-bold"
          >
            <Zap size={14} /> THE FUTURE OF MOBILITY
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl font-bold leading-tight"
          >
            Optimize Your <span className="neon-text">EV Fleet</span> for a Greener Tomorrow.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-300 text-lg"
          >
            Advanced AI-driven road navigation, energy optimization, and real-time performance tracking for all ground electric vehicles.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex gap-4 mt-4"
          >
            <Link href="/simulator">
              <button className="btn-primary flex items-center gap-2">
                Start Optimization <ChevronRight size={18} />
              </button>
            </Link>
            <Link href="/dashboard">
              <button className="px-6 py-3 glass hover:bg-white/20 transition-all font-bold">
                Explore Dashboard
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats Cards */}
      <section className="grid grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 * index }}
            className="glass-card flex flex-col gap-4"
          >
            <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center ${stat.color}`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-slate-400 text-sm font-medium">{stat.label}</p>
              <h3 className="text-3xl font-bold mt-1">{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Feature Grid */}
      <section className="grid grid-cols-2 gap-8">
        <div className="glass-card relative overflow-hidden group">
          <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-4">Smart Road Navigation</h3>
            <p className="text-slate-400 mb-6">Real-time street mapping with intelligent charging stop predictions and traffic avoidance.</p>
            <Link href="/route" className="text-emerald-400 font-bold flex items-center gap-2 hover:underline">
              Try Route AI <ChevronRight size={16} />
            </Link>
          </div>
          <Map className="absolute right-[-20px] bottom-[-20px] text-white/5 w-48 h-48 group-hover:scale-110 transition-transform duration-500" />
        </div>

        <div className="glass-card relative overflow-hidden group">
          <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-4">Fleet Analytics</h3>
            <p className="text-slate-400 mb-6">Detailed performance insights, cost-saving reports, and environmental impact tracking.</p>
            <Link href="/analytics" className="text-emerald-400 font-bold flex items-center gap-2 hover:underline">
              View Analytics <ChevronRight size={16} />
            </Link>
          </div>
          <BarChart3 className="absolute right-[-20px] bottom-[-20px] text-white/5 w-48 h-48 group-hover:scale-110 transition-transform duration-500" />
        </div>
      </section>
    </div>
  );
}
