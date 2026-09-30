import React from 'react';
import { Quote, TrendingUp, Users, CheckCircle2, Building2 } from 'lucide-react';

export const TestimonialsAndProof: React.FC = () => {
  const testimonials = [
    {
      name: 'Samantha Vance',
      role: 'Staff Infrastructure Engineer',
      company: 'Datadog (ex-Lyft)',
      outcome: '3 offers received within 3 weeks after ATS score increased from 61 to 91',
      quote:
        'My resume had high-level technical scope, but applicant tracking systems were choking on my multi-column format. ResumeIQ flagged the unparseable blocks and missing distributed systems keywords in seconds. The interview calls started within 48 hours.',
    },
    {
      name: 'David Kalu',
      role: 'Head of Growth Marketing',
      company: 'Notion',
      outcome: '+74% recruiter response rate following X-Y-Z bullet rewrites',
      quote:
        'The X-Y-Z rewrite suggestions transformed my generic marketing bullets into concrete business revenue metrics. Seeing exactly how an ATS calculates keyword density against competing applicants made the difference.',
    },
    {
      name: 'Priya Sundaram',
      role: 'Principal Machine Learning Scientist',
      company: 'Anthropic Ecosystem',
      outcome: 'Secured Tier 1 interview pass rate across 12 targeted applications',
      quote:
        'The n8n automated pipeline is exceptionally fast and transparent. Having the workflow parse the document and test keyword frequency gave me complete confidence before submitting to enterprise job portals.',
    },
  ];

  return (
    <section id="proof" className="relative py-16 lg:py-24 border-t border-slate-800/80 bg-slate-950/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-950/40 px-3.5 py-1 text-xs font-medium text-indigo-300 mb-3">
            <TrendingUp className="h-3.5 w-3.5 text-indigo-400" />
            <span>Proven Candidate Outcomes</span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl text-balance">
            Real engineers and leaders landing top-tier interviews
          </h2>
          <p className="mt-3 text-base text-slate-300 leading-relaxed">
            Quantified results from candidates audited by our automated ATS optimization pipeline.
          </p>
        </div>

        {/* Quantified Impact Banner */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-14">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 text-center">
            <p className="text-3xl font-extrabold text-white tabular-nums">+74%</p>
            <p className="text-xs text-slate-400 mt-1">Average Callback Rate Increase</p>
            <p className="text-[11px] text-indigo-400 mt-0.5">Within 30-day testing window</p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 text-center">
            <p className="text-3xl font-extrabold text-white tabular-nums">14,200+</p>
            <p className="text-xs text-slate-400 mt-1">Resumes Audited via n8n</p>
            <p className="text-[11px] text-indigo-400 mt-0.5">Sub-second webhook execution</p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 text-center">
            <p className="text-3xl font-extrabold text-white tabular-nums">3.4x</p>
            <p className="text-xs text-slate-400 mt-1">Faster Screening Throughput</p>
            <p className="text-[11px] text-indigo-400 mt-0.5">Bypasses initial rejection filter</p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 text-center">
            <p className="text-3xl font-extrabold text-white tabular-nums">100%</p>
            <p className="text-xs text-slate-400 mt-1">Privacy & Data Discard</p>
            <p className="text-[11px] text-indigo-400 mt-0.5">Zero resume retention after scan</p>
          </div>
        </div>

        {/* Testimonials Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 sm:p-7 flex flex-col justify-between hover:border-slate-700 transition-colors"
            >
              <div>
                <Quote className="h-6 w-6 text-indigo-400/60 mb-4" />
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                  "{item.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80">
                <p className="text-xs font-bold text-emerald-400 mb-2">
                  {item.outcome}
                </p>
                <h4 className="text-sm font-bold text-white">
                  {item.name}
                </h4>
                <p className="text-xs text-slate-400">
                  {item.role} · <span className="text-slate-300">{item.company}</span>
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
