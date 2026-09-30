import React from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Zap, Sparkles, FileText, BarChart3 } from 'lucide-react';

interface HeroProps {
  onStartAudit: () => void;
  onSelectSample: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartAudit, onSelectSample }) => {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-indigo-600/20 via-blue-600/15 to-purple-600/10 blur-[130px]" />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          
          {/* Left Column: Proposition & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-950/40 px-3.5 py-1 text-xs font-medium text-indigo-300 backdrop-blur-sm">
              <Zap className="h-3.5 w-3.5 text-indigo-400" />
              <span>Direct n8n Cloud Workflow Orchestration</span>
              <span className="text-slate-500">·</span>
              <span className="text-slate-400">Form ID 04696565</span>
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl text-balance">
              Turn your resume into interviews with{' '}
              <span className="bg-gradient-to-r from-indigo-400 via-sky-300 to-indigo-200 bg-clip-text text-transparent">
                automated ATS auditing
              </span>
            </h1>

            <p className="max-w-2xl text-base text-slate-300 sm:text-lg leading-relaxed">
              Most applicant tracking systems reject 75% of qualified resumes before a human recruiter reads a word. 
              Our automated n8n pipeline audits your resume against industry benchmarks, identifies missing keywords, 
              and delivers actionable scoring in seconds.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onStartAudit}
                className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 hover:bg-indigo-500 active:scale-[0.98] transition-all whitespace-nowrap"
              >
                <span>Upload & Analyze Resume</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                onClick={onSelectSample}
                className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/60 px-5 py-3.5 text-sm font-medium text-slate-200 hover:border-slate-500 hover:bg-slate-800 transition-all whitespace-nowrap"
              >
                <Sparkles className="h-4 w-4 text-amber-400" />
                <span>Test with Sample Resume</span>
              </button>
            </div>

            {/* Claim-to-Proof trust markers */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-800/80">
              <div>
                <p className="text-2xl font-bold text-white tabular-nums">98.4%</p>
                <p className="text-xs text-slate-400 mt-0.5">ATS Parser Accuracy</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white tabular-nums">&lt; 3.2s</p>
                <p className="text-xs text-slate-400 mt-0.5">n8n Execution Speed</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white tabular-nums">Zero</p>
                <p className="text-xs text-slate-400 mt-0.5">Resume Data Retained</p>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Visual Anchor */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900/90 to-slate-950/90 p-6 shadow-2xl backdrop-blur-xl">
              {/* Header inside card */}
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">Live ATS Inspector</h3>
                    <p className="text-xs text-slate-400">Senior Fullstack Engineer Scan</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-2.5 py-1 rounded-full">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Ready</span>
                </div>
              </div>

              {/* Score Display */}
              <div className="my-5 flex items-center justify-between rounded-xl bg-slate-950/60 p-4 border border-slate-800/60">
                <div>
                  <span className="text-xs font-medium text-slate-400">Applicant Tracking Score</span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-3xl font-extrabold text-white tabular-nums">89</span>
                    <span className="text-sm text-slate-500">/ 100</span>
                    <span className="rounded bg-emerald-500/10 px-2 py-0.5 text-xs font-semibold text-emerald-400 border border-emerald-500/20">
                      Tier 1 Pass
                    </span>
                  </div>
                </div>
                <div className="h-12 w-12 rounded-full border-4 border-emerald-500/30 border-t-emerald-400 flex items-center justify-center text-xs font-bold text-emerald-300">
                  89%
                </div>
              </div>

              {/* Core Check Breakdown */}
              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between text-slate-300">
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    <span>Keyword Density (TypeScript, React, Cloud)</span>
                  </span>
                  <span className="font-semibold text-white tabular-nums">94%</span>
                </div>

                <div className="flex items-center justify-between text-slate-300">
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    <span>X-Y-Z Quantified Impact Statements</span>
                  </span>
                  <span className="font-semibold text-white tabular-nums">86%</span>
                </div>

                <div className="flex items-center justify-between text-slate-300">
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    <span>Single-Column ATS Parsing Geometry</span>
                  </span>
                  <span className="font-semibold text-emerald-400">100% Valid</span>
                </div>
              </div>

              {/* Footer action in card */}
              <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-indigo-400" />
                  <span>Target: roja0902.app.n8n.cloud</span>
                </span>
                <span className="text-indigo-400 hover:text-indigo-300 cursor-pointer" onClick={onStartAudit}>
                  Scan yours &rarr;
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
