import React from 'react';
import { Cpu, ExternalLink, ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-800 bg-[#070a10] py-12 text-slate-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-white">
              <Cpu className="h-4 w-4" />
            </div>
            <span className="text-base font-bold text-white tracking-tight">ResumeIQ</span>
            <span className="text-slate-600">·</span>
            <span className="text-xs text-slate-400">
              Orchestrated on n8n Cloud
            </span>
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center gap-6 text-xs text-slate-300">
            <a href="#analyzer" className="hover:text-white transition-colors">
              AI Analyzer
            </a>
            <a href="#pipeline" className="hover:text-white transition-colors">
              Workflow Architecture
            </a>
            <a href="#benchmarks" className="hover:text-white transition-colors">
              ATS Benchmarks
            </a>
            <a href="#proof" className="hover:text-white transition-colors">
              Outcomes
            </a>
            <a
              href="https://roja0902.app.n8n.cloud/form/04696565-2697-4a55-87b3-65ba9e2ba326"
              target="_blank"
              rel="noreferrer noopener"
              className="flex items-center gap-1 text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              <span>n8n Direct Form</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>

          {/* Copyright & Privacy Notice */}
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
            <span>Strict zero-retention privacy</span>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-4">
          <p>
            © {new Date().getFullYear()} ResumeIQ. Connected to n8n Cloud workflow ID 04696565.
          </p>
          <p>
            Built for candidate privacy and recruiter screening precision.
          </p>
        </div>
      </div>
    </footer>
  );
};
