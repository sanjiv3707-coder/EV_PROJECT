"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap, Gauge, Thermometer, Battery, Car, Bike, Truck, Bus, ChevronRight, RefreshCw } from 'lucide-react';

const vehicles = [
  { id: 'car', name: 'Electric Car', icon: Car, range: 450, efficiency: 0.15 },
  { id: 'bike', name: 'Electric Bike', icon: Bike, range: 120, efficiency: 0.05 },
  { id: 'scooter', name: 'Electric Scooter', icon: Bike, range: 60, efficiency: 0.03 },
  { id: 'bus', name: 'Electric Bus', icon: Bus, range: 300, efficiency: 1.2 },
  { id: 'truck', name: 'Electric Truck', icon: Truck, range: 400, efficiency: 2.5 },
];

export default function Simulator() {
  const [selectedVehicle, setSelectedVehicle] = useState(vehicles[0]);
  const [speed, setSpeed] = useState(60);
  const [battery, setBattery] = useState(85);
  const [temp, setTemp] = useState(24);
  const [load, setLoad] = useState(2);
  const [rangeLeft, setRangeLeft] = useState(0);

  useEffect(() => {
    // Basic simulation logic for ground vehicles
    const baseRange = selectedVehicle.range;
    const speedFactor = speed > 100 ? (speed - 100) * 0.5 : 0;
    const tempFactor = Math.abs(temp - 22) * 0.2;
    const loadFactor = load * selectedVehicle.efficiency * 10;
    
    const calculatedRange = (baseRange * (battery / 100)) - speedFactor - tempFactor - loadFactor;
    setRangeLeft(Math.max(0, Math.round(calculatedRange)));
  }, [selectedVehicle, speed, battery, temp, load]);

  return (
    <div className="flex flex-col gap-8">
      <header>
        <h1 className="text-4xl font-bold mb-2">Vehicle Simulator</h1>
        <p className="text-slate-400">Test ground EV performance under various road conditions.</p>
      </header>

      <div className="grid grid-cols-12 gap-8">
        {/* Controls */}
        <div className="col-span-4 flex flex-col gap-6">
          <div className="glass-card">
            <h3 className="text-xl font-bold mb-6">Vehicle Select</h3>
            <div className="grid grid-cols-1 gap-3">
              {vehicles.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setSelectedVehicle(v)}
                  className={`flex items-center gap-4 p-4 rounded-xl transition-all ${
                    selectedVehicle.id === v.id 
                      ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' 
                      : 'bg-white/5 text-slate-400 hover:bg-white/10'
                  }`}
                >
                  <v.icon size={24} />
                  <span className="font-bold">{v.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="glass-card">
            <h3 className="text-xl font-bold mb-6">Environmental Factors</h3>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-slate-400">Current Speed (km/h)</span>
                  <span className="text-sm font-bold text-emerald-400">{speed}</span>
                </div>
                <input 
                  type="range" min="0" max="150" value={speed} 
                  onChange={(e) => setSpeed(parseInt(e.target.value))}
                  className="w-full accent-emerald-500"
                />
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-slate-400">Battery Level (%)</span>
                  <span className="text-sm font-bold text-emerald-400">{battery}%</span>
                </div>
                <input 
                  type="range" min="0" max="100" value={battery} 
                  onChange={(e) => setBattery(parseInt(e.target.value))}
                  className="w-full accent-emerald-500"
                />
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-slate-400">Temperature (°C)</span>
                  <span className="text-sm font-bold text-emerald-400">{temp}°</span>
                </div>
                <input 
                  type="range" min="-10" max="50" value={temp} 
                  onChange={(e) => setTemp(parseInt(e.target.value))}
                  className="w-full accent-emerald-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Display */}
        <div className="col-span-8 flex flex-col gap-6">
          <div className="glass-card flex-1 relative overflow-hidden flex flex-col items-center justify-center py-12">
            <motion.div 
              key={selectedVehicle.id}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative z-10 text-emerald-500"
            >
              <selectedVehicle.icon size={200} strokeWidth={1} />
            </motion.div>
            
            <div className="mt-8 text-center">
              <h2 className="text-5xl font-bold mb-2">{rangeLeft} <span className="text-xl text-slate-400">km</span></h2>
              <p className="text-slate-400 uppercase tracking-widest text-sm font-bold">Estimated Range Left</p>
            </div>

            {battery < 20 && (
              <motion.div 
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="absolute top-6 right-6 bg-red-500/20 text-red-500 border border-red-500/30 px-4 py-2 rounded-xl font-bold flex items-center gap-2"
              >
                <Zap size={16} /> CRITICAL BATTERY
              </motion.div>
            )}
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="glass-card flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
                <Gauge size={24} />
              </div>
              <div>
                <p className="text-slate-400 text-xs">Efficiency</p>
                <p className="text-lg font-bold">14.2 kWh/100km</p>
              </div>
            </div>

            <div className="glass-card flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                <Thermometer size={24} />
              </div>
              <div>
                <p className="text-slate-400 text-xs">Core Temp</p>
                <p className="text-lg font-bold">32.4°C</p>
              </div>
            </div>

            <div className="glass-card flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
                <RefreshCw size={24} />
              </div>
              <div>
                <p className="text-slate-400 text-xs">Regen Level</p>
                <p className="text-lg font-bold">High (35%)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
