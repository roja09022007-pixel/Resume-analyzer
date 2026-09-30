import React, { useState } from 'react';
import { Target, AlertTriangle, CheckCircle2, Award, BookOpen } from 'lucide-react';
import { ATS_ROLE_BENCHMARKS, ATS_AUDIT_RULES } from '../data/atsMetrics';

export const AtsBenchmarkExplorer: React.FC = () => {
  const [selectedRoleIndex, setSelectedRoleIndex] = useState(0);
  const benchmark = ATS_ROLE_BENCHMARKS[selectedRoleIndex];

  return (
    <section id="benchmarks" className="relative py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-950/40 px-3.5 py-1 text-xs font-medium text-indigo-300 mb-3">
            <Target className="h-3.5 w-3.5 text-indigo-400" />
            <span>Recruiting Algorithms & Keyword Standards</span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl text-balance">
            Compare against role-specific ATS benchmarks
          </h2>
          <p className="mt-3 text-base text-slate-300 leading-relaxed">
            Enterprise applicant tracking platforms (Workday, Greenhouse, Lever, Taleo) evaluate candidates using precise keyword weights and action verb density.
          </p>
        </div>

        {/* Role Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {ATS_ROLE_BENCHMARKS.map((item, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedRoleIndex(idx)}
              className={`rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
                selectedRoleIndex === idx
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'border border-slate-800 bg-slate-900/60 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              {item.role}
            </button>
          ))}
        </div>

        {/* Active Role Dashboard Card */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-xl shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-800 gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                  {benchmark.category}
                </span>
                <span className="text-slate-500">·</span>
                <span className="text-xs text-slate-400">Target Benchmark</span>
              </div>
              <h3 className="text-xl font-bold text-white mt-1">
                {benchmark.role}
              </h3>
            </div>

            <div className="flex items-center gap-3">
              <div className="rounded-xl border border-slate-700 bg-slate-950/80 px-4 py-2 text-right">
                <p className="text-[11px] text-slate-400">Average Screening Pass Threshold</p>
                <p className="text-lg font-bold text-emerald-400 tabular-nums">
                  {benchmark.averagePassScore} / 100
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-6">
            
            {/* High-Value Keywords */}
            <div className="rounded-xl border border-slate-800/80 bg-slate-950/60 p-5 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider">
                <Award className="h-4 w-4 text-indigo-400" />
                <span>Primary Expected Keywords</span>
              </div>
              <p className="text-xs text-slate-400">
                Must be present in work history bullets and skills index:
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {benchmark.expectedKeywords.map((kw, i) => (
                  <span
                    key={i}
                    className="rounded bg-indigo-950/60 border border-indigo-800/50 px-2 py-0.5 text-xs text-indigo-300 font-medium"
                  >
                    {kw}
                  </span>
                ))}
              </div>
            </div>

            {/* Recruiter Power Verbs */}
            <div className="rounded-xl border border-slate-800/80 bg-slate-950/60 p-5 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>Executive Action Verbs</span>
              </div>
              <p className="text-xs text-slate-400">
                Strong bullet starters that pass semantic screening:
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {benchmark.powerVerbs.map((verb, i) => (
                  <span
                    key={i}
                    className="rounded bg-emerald-950/50 border border-emerald-800/40 px-2 py-0.5 text-xs text-emerald-300 font-medium"
                  >
                    {verb}
                  </span>
                ))}
              </div>
            </div>

            {/* Critical Pitfalls */}
            <div className="rounded-xl border border-slate-800/80 bg-slate-950/60 p-5 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider">
                <AlertTriangle className="h-4 w-4 text-amber-400" />
                <span>Top Rejection Traps</span>
              </div>
              <p className="text-xs text-slate-400">
                Common errors that trigger algorithmic downgrades:
              </p>
              <ul className="space-y-2 text-xs text-slate-300">
                {benchmark.atsPitfalls.map((pitfall, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                    <span>{pitfall}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        {/* Global Evaluation Principles Bento */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          {ATS_AUDIT_RULES.map((rule, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-slate-800 bg-slate-900/50 p-5 space-y-2 hover:border-slate-700 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-400">
                  {rule.status}
                </span>
                <span className="text-xs font-semibold font-mono text-slate-400 tabular-nums">
                  {rule.weight}
                </span>
              </div>
              <h4 className="text-sm font-bold text-white">
                {rule.title}
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                {rule.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
