import React, { useState } from 'react';
import IRACVisualizer from './components/IRACVisualizer';
import ProductivitySystem from './components/ProductivitySystem';
import { Layout, FileText, ChevronRight } from 'lucide-react';

export default function App() {
  const [view, setView] = useState('dashboard');

  if (view === 'irac') {
    return <IRACVisualizer onBack={() => setView('dashboard')} />;
  }

  if (view === 'productivity') {
    return <ProductivitySystem onBack={() => setView('dashboard')} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-900">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold text-slate-800 mb-4">Legal Success Dashboard</h1>
          <p className="text-slate-500 text-lg italic">Essential tools for modern law students</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Productivity System Card */}
          <button 
            onClick={() => setView('productivity')}
            className="group relative bg-white p-8 rounded-3xl shadow-sm border border-slate-200 text-left transition-all hover:shadow-xl hover:border-blue-200 overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
              <Layout className="w-32 h-32" />
            </div>
            <div className="bg-blue-600 w-12 h-12 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
              <Layout className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Productivity System</h2>
            <p className="text-slate-500 mb-6 leading-relaxed">
              Master your schedule with strategic macro, meso, and micro planning tools.
            </p>
            <div className="flex items-center text-blue-600 font-bold gap-2">
              Get Started <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* IRAC Visualizer Card */}
          <button 
            onClick={() => setView('irac')}
            className="group relative bg-white p-8 rounded-3xl shadow-sm border border-slate-200 text-left transition-all hover:shadow-xl hover:border-blue-200 overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
              <FileText className="w-32 h-32" />
            </div>
            <div className="bg-blue-600 w-12 h-12 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
              <FileText className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">IRAC Visualizer</h2>
            <p className="text-slate-500 mb-6 leading-relaxed">
              Convert complex fact patterns into structured legal analysis with step-by-step guidance.
            </p>
            <div className="flex items-center text-blue-600 font-bold gap-2">
              Launch App <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        </div>

        <footer className="mt-20 text-center text-slate-400 text-sm">
          &copy; 2026 Legal Success Dashboard. Built for law students.
        </footer>
      </div>
    </div>
  );
}
