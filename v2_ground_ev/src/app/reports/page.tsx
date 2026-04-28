"use client";
import React from 'react';
import { FileText, Download, Filter, Search, Calendar, ChevronRight } from 'lucide-react';

const reports = [
  { id: 'REP-001', name: 'Monthly Energy Consumption', date: 'April 2026', size: '2.4 MB', type: 'PDF' },
  { id: 'REP-002', name: 'Fleet Maintenance Audit', date: 'March 2026', size: '1.8 MB', type: 'PDF' },
  { id: 'REP-003', name: 'Carbon Offset Certificate', date: 'Q1 2026', size: '0.5 MB', type: 'DOCX' },
  { id: 'REP-004', name: 'Operational Cost Analysis', date: 'Feb 2026', size: '3.1 MB', type: 'XLSX' },
  { id: 'REP-005', name: 'Smart Route Efficiency Data', date: 'Jan 2026', size: '1.2 MB', type: 'PDF' },
];

export default function Reports() {
  return (
    <div className="flex flex-col gap-8">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-bold mb-2">System Reports</h1>
          <p className="text-slate-400">Manage and export your fleet operational data and analysis.</p>
        </div>
        <div className="flex gap-4">
          <div className="relative group">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-400 transition-colors" />
            <input 
              type="text" 
              placeholder="Search reports..." 
              className="bg-white/5 border border-white/10 rounded-xl py-2 pl-12 pr-4 text-sm focus:outline-none focus:border-emerald-500/50 transition-all w-64"
            />
          </div>
          <button className="glass px-6 py-2 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-white/10 transition-all">
            <Filter size={16} /> Filter
          </button>
        </div>
      </header>

      <div className="grid grid-cols-12 gap-8">
        {/* Main List */}
        <div className="col-span-8 flex flex-col gap-4">
          {reports.map((report) => (
            <div key={report.id} className="glass-card flex items-center justify-between group hover:border-emerald-500/30 transition-all">
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 group-hover:text-emerald-400 transition-colors">
                  <FileText size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-lg">{report.name}</h4>
                  <div className="flex gap-4 mt-1">
                    <span className="text-xs text-slate-500 flex items-center gap-1"><Calendar size={12} /> {report.date}</span>
                    <span className="text-xs text-slate-500">{report.size}</span>
                    <span className="text-[10px] font-bold bg-white/10 px-2 py-0.5 rounded text-slate-300">{report.type}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <button className="p-2 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-all">
                  <Download size={20} />
                </button>
                <button className="p-2 hover:bg-white/10 rounded-lg text-slate-400 hover:text-emerald-400 transition-all">
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar Info */}
        <div className="col-span-4 flex flex-col gap-6">
          <div className="glass-card">
            <h3 className="text-xl font-bold mb-4">Export Settings</h3>
            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Default Format</label>
                <select className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm">
                  <option>PDF (Vector Optimized)</option>
                  <option>Excel (Data Analytics)</option>
                  <option>JSON (Raw API Format)</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Auto-Reporting</label>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-6 bg-emerald-500/20 rounded-full relative cursor-pointer">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-emerald-500 rounded-full shadow-lg shadow-emerald-500/50" />
                  </div>
                  <span className="text-sm font-medium">Monthly Audit Active</span>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card bg-emerald-500/10 border-emerald-500/20">
            <h3 className="text-xl font-bold mb-4">Storage Used</h3>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-slate-400">12.4 GB used</span>
              <span className="text-emerald-400 font-bold">82%</span>
            </div>
            <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden mb-4">
              <div className="bg-emerald-500 h-full w-[82%]" />
            </div>
            <button className="w-full btn-primary py-2 text-sm">UPGRADE STORAGE</button>
          </div>
        </div>
      </div>
    </div>
  );
}
