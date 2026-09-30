import React from 'react';
import { Cpu, CheckCircle2, Sliders, ExternalLink } from 'lucide-react';

interface NavbarProps {
  n8nConnected: boolean;
  onOpenSettings: () => void;
  onJumpToAnalyzer: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  n8nConnected,
  onOpenSettings,
  onJumpToAnalyzer,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-[#0b0f17]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Single text element wordmark */}
        <a href="#" className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-white">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white shadow-sm shadow-indigo-500/30">
            <Cpu className="h-4.5 w-4.5" />
          </div>
          <span>ResumeIQ</span>
          <span className="text-xs font-semibold text-indigo-400 bg-indigo-950/60 border border-indigo-800/60 px-2 py-0.5 rounded">
            n8n cloud
          </span>
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <a href="#analyzer" className="hover:text-white transition-colors">
            AI Analyzer
          </a>
          <a href="#pipeline" className="hover:text-white transition-colors">
            n8n Pipeline
          </a>
          <a href="#benchmarks" className="hover:text-white transition-colors">
            ATS Benchmarks
          </a>
          <a href="#proof" className="hover:text-white transition-colors">
            Impact Proof
          </a>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenSettings}
            title="Inspect n8n Webhook Configuration"
            className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900/80 px-3 py-1.5 text-xs font-medium text-slate-300 hover:border-slate-600 hover:text-white transition-colors"
          >
            <span
              className={`h-2 w-2 rounded-full ${
                n8nConnected ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]' : 'bg-amber-400'
              }`}
            />
            <span className="hidden sm:inline">n8n Connected</span>
            <Sliders className="h-3.5 w-3.5 text-slate-400" />
          </button>

          <button
            onClick={onJumpToAnalyzer}
            className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-sm shadow-indigo-600/30 hover:bg-indigo-500 active:scale-[0.98] transition-all whitespace-nowrap"
          >
            <span>Analyze Resume</span>
          </button>
        </div>
      </div>
    </header>
  );
};
