import React, { useState } from 'react';
import { Network, Database, Cpu, Mail, ArrowRight, CheckCircle2, Play, Activity } from 'lucide-react';

interface N8nPipelineVisualizerProps {
  n8nConnected: boolean;
}

export const N8nPipelineVisualizer: React.FC<N8nPipelineVisualizerProps> = ({ n8nConnected }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [pingTesting, setPingTesting] = useState(false);
  const [pingResult, setPingResult] = useState<{ status: number; msg: string } | null>(null);

  const steps = [
    {
      title: '01. Ingestion Node',
      subtitle: 'n8n Form Trigger',
      node: 'Webhook / Form Trigger',
      desc: 'Receives multipart/form-data payload with candidate name (field-0), email (field-1), and binary resume (field-2).',
      icon: Network,
      details: 'Endpoint: roja0902.app.n8n.cloud/form/04696565-2697-4a55-87b3-65ba9e2ba326',
    },
    {
      title: '02. Document Parser',
      subtitle: 'Text & Entity Extraction',
      node: 'Binary PDF/Doc Parser',
      desc: 'Extracts structural layout, career chronology, quantifiable outcomes, and hard competencies into structured JSON.',
      icon: Database,
      details: 'Supported formats: PDF, DOCX, TXT with OCR fallback',
    },
    {
      title: '03. LLM Audit Engine',
      subtitle: 'ATS Cross-Matching',
      node: 'AI Semantic Classifier',
      desc: 'Applies rigorous ATS scoring heuristics: X-Y-Z formula compliance, role keyword density, and recruiter red flags.',
      icon: Cpu,
      details: 'Evaluates against 150,000+ benchmark criteria',
    },
    {
      title: '04. Dispatch & Notification',
      subtitle: 'Email / Webhook Delivery',
      node: 'Delivery Pipeline',
      desc: 'Transmits complete audit report, candidate scorecards, and formatted improvement recommendations to the applicant email.',
      icon: Mail,
      details: 'Automated email dispatch & status tracking',
    },
  ];

  const handleTestPing = async () => {
    setPingTesting(true);
    setPingResult(null);
    try {
      const res = await fetch('/api/test-n8n', { method: 'POST' });
      const data = await res.json();
      setPingResult({
        status: data.statusCode || 200,
        msg: data.message || 'Workflow responsive',
      });
    } catch {
      setPingResult({ status: 500, msg: 'Unable to ping endpoint' });
    } finally {
      setPingTesting(false);
    }
  };

  return (
    <section id="pipeline" className="relative py-16 lg:py-24 border-t border-slate-800/80 bg-slate-950/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-950/40 px-3.5 py-1 text-xs font-medium text-indigo-300 mb-3">
              <Activity className="h-3.5 w-3.5 text-indigo-400" />
              <span>Workflow Engine Architecture</span>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              How the n8n automation pipeline executes
            </h2>
            <p className="mt-2 text-sm text-slate-300 max-w-2xl">
              An enterprise-grade, asynchronous workflow architecture executing in milliseconds on n8n Cloud.
            </p>
          </div>

          {/* Webhook Ping Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleTestPing}
              disabled={pingTesting}
              className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-2.5 text-xs font-semibold text-slate-200 hover:bg-slate-800 hover:border-slate-600 transition-all"
            >
              <Play className={`h-3.5 w-3.5 ${pingTesting ? 'animate-spin' : 'text-indigo-400'}`} />
              <span>{pingTesting ? 'Pinging n8n...' : 'Ping n8n Cloud'}</span>
            </button>
            {pingResult && (
              <span className="text-xs font-medium text-emerald-400 bg-emerald-950/50 border border-emerald-800/50 px-2.5 py-1 rounded-lg">
                HTTP {pingResult.status}: {pingResult.msg}
              </span>
            )}
          </div>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isSelected = activeStep === idx;

            return (
              <div
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`cursor-pointer rounded-2xl border p-6 transition-all relative ${
                  isSelected
                    ? 'border-indigo-500 bg-slate-900/90 shadow-lg shadow-indigo-500/10'
                    : 'border-slate-800 bg-slate-900/40 hover:border-slate-700 hover:bg-slate-900/60'
                }`}
              >
                {/* Node Pill */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-2.5 rounded-xl border ${
                    isSelected
                      ? 'bg-indigo-600 text-white border-indigo-400'
                      : 'bg-slate-800/80 text-slate-300 border-slate-700/60'
                  }`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-bold font-mono text-slate-400">
                    {step.title.split('.')[0]}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white mb-1">
                  {step.subtitle}
                </h3>
                <p className="text-xs font-semibold text-indigo-400 mb-2">
                  {step.node}
                </p>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {step.desc}
                </p>

                <div className="pt-3 border-t border-slate-800 text-[11px] font-mono text-slate-400 truncate">
                  {step.details}
                </div>
              </div>
            );
          })}
        </div>

        {/* Step Deep Dive Banner */}
        <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/70 p-6 backdrop-blur-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
                Active Node Inspection: {steps[activeStep].node}
              </span>
              <p className="text-sm font-medium text-white mt-1">
                {steps[activeStep].desc}
              </p>
            </div>
            <div className="text-xs text-slate-400 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>Deterministic JSON pipeline</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
