"use client";
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { Search, MapPin, Navigation, Clock, Zap, AlertTriangle, ChevronRight } from 'lucide-react';

// Dynamically import Map to avoid SSR errors with Leaflet
const Map = dynamic(() => import('@/components/Map'), { 
  ssr: false,
  loading: () => <div className="w-full h-full glass animate-pulse flex items-center justify-center">Loading Neural Map Engine...</div>
});

export default function RouteAI() {
  const [activeRoute, setActiveRoute] = useState('fastest');

  return (
    <div className="flex flex-col h-full gap-8">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-bold mb-2">Route AI Optimization</h1>
          <p className="text-slate-400">Advanced road-based navigation with battery-efficient pathfinding.</p>
        </div>
        <div className="flex gap-4">
          <button className="glass px-6 py-2 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-white/10 transition-all">
            <Search size={16} /> Search Hubs
          </button>
          <button className="btn-primary px-8 py-2 flex items-center gap-2">
            Calculate New Route <Navigation size={18} />
          </button>
        </div>
      </header>

      <div className="grid grid-cols-12 gap-8 flex-1 min-h-[600px]">
        {/* Left Panel: Route Details */}
        <div className="col-span-4 flex flex-col gap-6">
          <div className="glass-card">
            <h3 className="text-xl font-bold mb-6">Route Details</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-1">
                  <MapPin size={16} />
                </div>
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wider">Starting Location</p>
                  <p className="font-bold text-lg">City Center Hub B2</p>
                </div>
              </div>
              
              <div className="w-px h-10 bg-slate-700 ml-4" />
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 mt-1">
                  <Navigation size={16} />
                </div>
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wider">Destination</p>
                  <p className="font-bold text-lg">East Tech Park (Charger-6)</p>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card">
            <h3 className="text-xl font-bold mb-4">Route Selection</h3>
            <div className="space-y-3">
              {[
                { id: 'fastest', name: 'Fastest Route', time: '14 min', energy: '12% battery', icon: Clock },
                { id: 'efficient', name: 'Battery Efficient', time: '18 min', energy: '8% battery', icon: Zap },
                { id: 'balanced', name: 'Balanced AI', time: '16 min', energy: '10% battery', icon: Navigation },
              ].map((route) => (
                <button
                  key={route.id}
                  onClick={() => setActiveRoute(route.id)}
                  className={`w-full flex items-center justify-between p-4 rounded-xl transition-all ${
                    activeRoute === route.id 
                      ? 'bg-white/10 border border-white/20' 
                      : 'hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${activeRoute === route.id ? 'bg-emerald-500 text-white' : 'bg-white/5 text-slate-400'}`}>
                      <route.icon size={20} />
                    </div>
                    <div className="text-left">
                      <p className="font-bold">{route.name}</p>
                      <p className="text-xs text-slate-400">{route.time} • {route.energy}</p>
                    </div>
                  </div>
                  {activeRoute === route.id && <ChevronRight size={18} className="text-emerald-400" />}
                </button>
              ))}
            </div>
          </div>

          <div className="glass-card bg-amber-500/10 border-amber-500/20">
            <div className="flex items-center gap-3 text-amber-400 mb-3">
              <AlertTriangle size={20} />
              <h4 className="font-bold uppercase tracking-wider text-sm">Traffic Alert</h4>
            </div>
            <p className="text-sm text-slate-300">Congestion detected on Highway 4. Rerouting via Industrial Link Road saved 4 minutes.</p>
          </div>
        </div>

        {/* Right Panel: Map */}
        <div className="col-span-8 h-full relative">
          <Map />
          
          {/* Overlay Info */}
          <div className="absolute bottom-6 left-6 right-6 flex gap-4 pointer-events-none">
            <div className="glass px-6 py-3 flex items-center gap-3">
              <Zap size={18} className="text-yellow-400" />
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-bold">Estimated Battery Drain</p>
                <p className="font-bold">~4.5 kWh</p>
              </div>
            </div>
            <div className="glass px-6 py-3 flex items-center gap-3">
              <Navigation size={18} className="text-blue-400" />
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-bold">Total Distance</p>
                <p className="font-bold">12.8 km</p>
              </div>
            </div>
            <div className="glass px-6 py-3 flex items-center gap-3 ml-auto pointer-events-auto cursor-pointer hover:bg-white/20 transition-all">
              <span className="font-bold text-sm">RE-CENTER MAP</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
