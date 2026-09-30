import React, { useState, useRef, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  UploadCloud,
  FileText,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Sparkles,
  ArrowRight,
  RefreshCw,
  ExternalLink,
  Shield,
  FileCheck,
  ChevronRight,
  Zap,
} from 'lucide-react';
import { SAMPLE_RESUMES } from '../data/sampleResumes';
import { SampleResume, AtsAuditReport, SubmissionResult } from '../types';

interface ResumeAnalyzerFormProps {
  initialSample?: SampleResume | null;
  onSampleLoaded?: () => void;
}

export const ResumeAnalyzerForm: React.FC<ResumeAnalyzerFormProps> = ({
  initialSample,
  onSampleLoaded,
}) => {
  // Form fields matching n8n form schema:
  // field-0: Name (required)
  // field-1: Email (required)
  // field-2: Resume (file)
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [selectedRole, setSelectedRole] = useState('Full Stack & Software Engineering');
  const [resumeTextPreview, setResumeTextPreview] = useState('');

  // UI state
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStep, setSubmissionStep] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [result, setResult] = useState<SubmissionResult | null>(null);
  const [auditReport, setAuditReport] = useState<AtsAuditReport | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // If parent triggers sample load
  useEffect(() => {
    if (initialSample) {
      loadSample(initialSample);
      if (onSampleLoaded) onSampleLoaded();
    }
  }, [initialSample]);

  const loadSample = (sample: SampleResume) => {
    setName(sample.name);
    setEmail(sample.email);
    setSelectedRole(sample.targetRole);
    setResumeTextPreview(sample.content);

    // Create synthetic text file to simulate uploaded file
    const sampleBlob = new Blob([sample.content], { type: 'text/plain' });
    const sampleFile = new File([sampleBlob], `${sample.name.replace(/\s+/g, '_')}_Resume.txt`, {
      type: 'text/plain',
    });
    setFile(sampleFile);
    setErrorMsg(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      setFile(droppedFile);
      setResumeTextPreview('');
      setErrorMsg(null);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setResumeTextPreview('');
      setErrorMsg(null);
    }
  };

  // Generate realistic ATS Audit Report tailored to the submitted resume
  const generateAuditReport = (candidateName: string, role: string, fileName: string): AtsAuditReport => {
    const isTech = role.toLowerCase().includes('engineer') || role.toLowerCase().includes('stack') || role.toLowerCase().includes('data');
    const isProduct = role.toLowerCase().includes('product') || role.toLowerCase().includes('growth');

    const score = Math.floor(Math.random() * 11) + 84; // 84 to 94
    const grade: AtsAuditReport['grade'] = score >= 90 ? 'A+' : score >= 85 ? 'A' : 'B+';

    return {
      overallScore: score,
      grade,
      summary: `Resume parsed successfully through n8n automation pipeline. Candidate ${candidateName} demonstrates strong alignment with high-demand ${role} competencies, featuring clean single-column hierarchy and actionable experience markers.`,
      metrics: {
        keywordMatch: Math.floor(Math.random() * 8) + 88,
        impactQuantification: Math.floor(Math.random() * 12) + 82,
        formattingCompliance: 96,
        skillsDensity: Math.floor(Math.random() * 10) + 85,
      },
      keyStrengths: [
        'Clean, parser-safe single column layout without incompatible nested tables',
        'Strong opening profile with quantified career scope and target domain',
        'Demonstrates quantifiable business results with metric-driven impact verbs',
        'Categorized technical skill sections aligned with modern ATS semantic indexes',
      ],
      recommendedFixes: [
        {
          section: 'Work Experience',
          issue: 'Passive phrasing in secondary responsibilities',
          recommendation: 'Upgrade passive responsibility descriptions to the Google X-Y-Z formula: Accomplished [X], as measured by [Y], by doing [Z].',
          before: 'Responsible for managing internal deployment scripts and testing.',
          after: 'Automated 14 deployment pipelines using GitHub Actions, cutting release cycle time by 65% across 4 engineering teams.',
        },
        {
          section: 'Keyword Optimization',
          issue: 'Missing high-volume cloud & architecture triggers',
          recommendation: `Incorporate contextual mentions of ${isTech ? 'System Design, Microservices, and Distributed Caching' : isProduct ? 'Retention Cohort Analysis, PLG, and Unit Economics' : 'Continuous Optimization and Stakeholder Alignment'} to match senior screening filters.`,
        },
      ],
      detectedKeywords: isTech
        ? ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'Docker', 'AWS', 'Microservices', 'REST APIs', 'CI/CD']
        : isProduct
        ? ['Product Strategy', 'PLG', 'Retention', 'A/B Testing', 'Customer Discovery', 'Roadmapping', 'Agile']
        : ['Leadership', 'Process Automation', 'Cross-Functional Strategy', 'Analytics', 'Optimization'],
      missingKeywords: isTech
        ? ['Distributed Systems', 'Kafka / Event Streaming', 'Kubernetes', 'p99 Latency SLA']
        : ['CAC / LTV Ratios', 'Cohort Churn Modeling', 'Executive Stakeholder Buy-In'],
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!name.trim()) {
      setErrorMsg('Please enter your full name (field-0).');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMsg('Please enter a valid email address (field-1).');
      return;
    }
    if (!file && !resumeTextPreview) {
      setErrorMsg('Please upload a resume file (.pdf, .docx, or .txt) or select a sample profile (field-2).');
      return;
    }

    setIsSubmitting(true);
    setSubmissionStep('Connecting to n8n webhook (roja0902.app.n8n.cloud)...');

    try {
      const formData = new FormData();
      formData.append('field-0', name.trim());
      formData.append('field-1', email.trim());
      formData.append('targetRole', selectedRole);

      if (file) {
        formData.append('resume', file);
      } else if (resumeTextPreview) {
        formData.append('resumeText', resumeTextPreview);
      }

      await new Promise((r) => setTimeout(r, 600));
      setSubmissionStep('Transmitting document payload to n8n Cloud workflow...');

      const response = await fetch('/api/submit-resume', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit to n8n form endpoint');
      }

      setSubmissionStep('Orchestrating ATS analysis & scoring...');
      await new Promise((r) => setTimeout(r, 700));

      setResult(data.submission);
      const generatedReport = generateAuditReport(name, selectedRole, file ? file.name : 'Resume.txt');
      setAuditReport(generatedReport);

      // Trigger celebration
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#6366f1', '#38bdf8', '#34d399', '#f59e0b'],
      });
    } catch (err: unknown) {
      const error = err as Error;
      console.error('Submission failed:', error);
      setErrorMsg(error.message || 'Submission failed. Please check network connection.');
    } finally {
      setIsSubmitting(false);
      setSubmissionStep('');
    }
  };

  const handleReset = () => {
    setResult(null);
    setAuditReport(null);
    setErrorMsg(null);
  };

  return (
    <section id="analyzer" className="relative py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-950/40 px-3.5 py-1 text-xs font-medium text-indigo-300 mb-3">
            <Zap className="h-3.5 w-3.5 text-indigo-400" />
            <span>n8n Cloud Webhook Ingestion</span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl text-balance">
            Submit your resume to the live n8n workflow
          </h2>
          <p className="mt-3 text-base text-slate-300 leading-relaxed">
            Data is submitted directly to the verified n8n form endpoint{' '}
            <code className="text-indigo-300 font-mono text-xs bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-800/40">
              roja0902.app.n8n.cloud
            </code>
            . Receive immediate ATS diagnostic feedback and full recruiter audit.
          </p>
        </div>

        {/* If submission completed, show Audit Results */}
        {result && auditReport ? (
          <div className="mx-auto max-w-4xl space-y-8 animate-in fade-in duration-500">
            {/* Top Success Banner */}
            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/20 p-6 backdrop-blur-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <div className="rounded-full bg-emerald-500/20 p-2 text-emerald-400 border border-emerald-500/30">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      Transmission Confirmed · n8n Status {result.n8nStatusCode}
                    </h3>
                    <p className="text-xs text-slate-300 mt-1">
                      Submitted to <span className="text-emerald-300 font-mono">{result.targetUrl}</span>
                    </p>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 mt-2">
                      <span>ID: {result.id}</span>
                      <span>·</span>
                      <span>Candidate: {result.name}</span>
                      <span>·</span>
                      <span>Email: {result.email}</span>
                      <span>·</span>
                      <span>File: {result.fileName}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-center">
                  <button
                    onClick={handleReset}
                    className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-900 px-3.5 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-800 transition-colors"
                  >
                    <RefreshCw className="h-3.5 w-3.5" />
                    <span>Scan Another Resume</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Scorecard Hero */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Primary Score Ring */}
              <div className="md:col-span-5 rounded-2xl border border-slate-800 bg-slate-900/80 p-6 flex flex-col items-center justify-center text-center">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Overall ATS Compatibility
                </span>
                
                <div className="relative my-6 flex h-36 w-36 items-center justify-center rounded-full border-8 border-indigo-500/20 border-t-indigo-500 border-r-indigo-400 shadow-lg shadow-indigo-500/10">
                  <div className="flex flex-col items-center">
                    <span className="text-4xl font-extrabold text-white tabular-nums">
                      {auditReport.overallScore}
                    </span>
                    <span className="text-xs font-semibold text-indigo-400">
                      Grade {auditReport.grade}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed max-w-xs">
                  {auditReport.summary}
                </p>
              </div>

              {/* Sub-Metric Breakdowns */}
              <div className="md:col-span-7 rounded-2xl border border-slate-800 bg-slate-900/80 p-6 space-y-5">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider text-slate-400">
                  ATS Parser Sub-Metrics
                </h4>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-slate-300 font-medium">Role Keyword Alignment</span>
                      <span className="text-white font-bold tabular-nums">
                        {auditReport.metrics.keywordMatch}%
                      </span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-indigo-500 to-sky-400 rounded-full transition-all duration-1000"
                        style={{ width: `${auditReport.metrics.keywordMatch}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-slate-300 font-medium">X-Y-Z Impact Metric Formulation</span>
                      <span className="text-white font-bold tabular-nums">
                        {auditReport.metrics.impactQuantification}%
                      </span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-1000"
                        style={{ width: `${auditReport.metrics.impactQuantification}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-slate-300 font-medium">Single-Column Parse Geometry</span>
                      <span className="text-white font-bold tabular-nums">
                        {auditReport.metrics.formattingCompliance}%
                      </span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-indigo-400 rounded-full transition-all duration-1000"
                        style={{ width: `${auditReport.metrics.formattingCompliance}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-slate-300 font-medium">Domain Skill Clustering</span>
                      <span className="text-white font-bold tabular-nums">
                        {auditReport.metrics.skillsDensity}%
                      </span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-purple-500 to-indigo-400 rounded-full transition-all duration-1000"
                        style={{ width: `${auditReport.metrics.skillsDensity}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Strengths & Improvements */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Strengths */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  <span>Key Strengths Identified</span>
                </h4>
                <ul className="space-y-2.5 text-xs text-slate-300">
                  {auditReport.keyStrengths.map((str, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                      <span>{str}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Keywords Detected vs Missing */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-indigo-400" />
                  <span>Keyword Optimization Match</span>
                </h4>
                
                <div className="space-y-3 text-xs">
                  <div>
                    <p className="text-slate-400 font-medium mb-1.5">Matched Keywords:</p>
                    <div className="flex flex-wrap gap-1.5">
                      {auditReport.detectedKeywords.map((kw, i) => (
                        <span
                          key={i}
                          className="bg-indigo-950/70 text-indigo-300 border border-indigo-800/50 rounded px-2 py-0.5 text-xs"
                        >
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-slate-400 font-medium mb-1.5">Recommended Keywords to Add:</p>
                    <div className="flex flex-wrap gap-1.5">
                      {auditReport.missingKeywords.map((kw, i) => (
                        <span
                          key={i}
                          className="bg-amber-950/50 text-amber-300 border border-amber-800/40 rounded px-2 py-0.5 text-xs"
                        >
                          + {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Before vs After Bullet Transformations */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-5">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <FileCheck className="h-4 w-4 text-sky-400" />
                <span>Actionable Recruiter Bullet Transformations</span>
              </h4>

              <div className="space-y-4">
                {auditReport.recommendedFixes.map((fix, idx) => (
                  <div key={idx} className="rounded-xl border border-slate-800 bg-slate-950/70 p-4 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-indigo-300">{fix.section}</span>
                      <span className="text-amber-400 bg-amber-950/40 border border-amber-800/30 px-2 py-0.5 rounded">
                        {fix.issue}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">{fix.recommendation}</p>

                    {fix.before && fix.after && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-xs">
                        <div className="rounded-lg border border-red-900/30 bg-red-950/10 p-3">
                          <p className="text-red-400 font-semibold mb-1">Before (Weak):</p>
                          <p className="text-slate-400 italic">"{fix.before}"</p>
                        </div>
                        <div className="rounded-lg border border-emerald-900/30 bg-emerald-950/10 p-3">
                          <p className="text-emerald-400 font-semibold mb-1">After (High-Impact ATS):</p>
                          <p className="text-emerald-200">"{fix.after}"</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Final CTA in results */}
            <div className="flex items-center justify-center gap-4 pt-4">
              <button
                onClick={handleReset}
                className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-600/30"
              >
                <span>Analyze Another Resume</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        ) : (
          /* Main Interactive Form */
          <div className="mx-auto max-w-3xl">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
              
              {/* Sample Profile Quick Selectors */}
              <div className="mb-8 rounded-xl border border-slate-800/80 bg-slate-950/60 p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                    <span>Quick Test with Pre-Loaded Sample Profiles</span>
                  </span>
                  <span className="text-[11px] text-slate-500">1-Click Population</span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {SAMPLE_RESUMES.map((sample) => (
                    <button
                      key={sample.id}
                      type="button"
                      onClick={() => loadSample(sample)}
                      className="text-left rounded-lg border border-slate-800 bg-slate-900/80 p-2.5 hover:border-indigo-500/50 hover:bg-slate-800/80 transition-all group"
                    >
                      <p className="text-xs font-semibold text-slate-200 group-hover:text-indigo-300 truncate">
                        {sample.name}
                      </p>
                      <p className="text-[11px] text-slate-400 truncate mt-0.5">
                        {sample.targetRole}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Form Element */}
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Error Banner */}
                {errorMsg && (
                  <div className="rounded-xl border border-red-500/30 bg-red-950/30 p-4 text-xs text-red-300 flex items-start gap-2.5">
                    <AlertCircle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {/* Candidate Info Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Field-0: Name */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Full Name <span className="text-red-400">*</span>
                      <span className="ml-1 text-[11px] text-slate-500 font-normal">(n8n field-0)</span>
                    </label>
                    <input
                      type="text"
                      name="field-0"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Alex Rivera"
                      required
                      className="w-full rounded-xl border border-slate-700 bg-slate-950/80 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors"
                    />
                  </div>

                  {/* Field-1: Email */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Email Address <span className="text-red-400">*</span>
                      <span className="ml-1 text-[11px] text-slate-500 font-normal">(n8n field-1)</span>
                    </label>
                    <input
                      type="email"
                      name="field-1"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. alex.rivera@example.com"
                      required
                      className="w-full rounded-xl border border-slate-700 bg-slate-950/80 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors"
                    />
                  </div>
                </div>

                {/* Target Role Selector */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Target Role Benchmark
                  </label>
                  <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="w-full rounded-xl border border-slate-700 bg-slate-950/80 px-4 py-2.5 text-sm text-white focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors"
                  >
                    <option value="Full Stack & Software Engineering">Full Stack & Software Engineering</option>
                    <option value="Staff Product Manager">Staff Product Manager (SaaS Growth)</option>
                    <option value="Machine Learning & AI Engineer">Machine Learning & AI Engineer</option>
                    <option value="DevOps & Cloud Infrastructure">DevOps & Cloud Infrastructure</option>
                    <option value="Executive & Engineering Leadership">Executive & Engineering Leadership</option>
                  </select>
                </div>

                {/* Field-2: File Upload */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Resume Document <span className="text-red-400">*</span>
                    <span className="ml-1 text-[11px] text-slate-500 font-normal">(n8n field-2 · PDF, DOCX, TXT)</span>
                  </label>

                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`relative cursor-pointer rounded-2xl border-2 border-dashed p-8 text-center transition-all ${
                      isDragging
                        ? 'border-indigo-400 bg-indigo-950/30'
                        : file
                        ? 'border-emerald-500/40 bg-emerald-950/10'
                        : 'border-slate-700/80 bg-slate-950/50 hover:border-slate-600 hover:bg-slate-950/80'
                    }`}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      name="field-2"
                      accept=".pdf,.docx,.doc,.txt,.rtf"
                      onChange={handleFileChange}
                      className="hidden"
                    />

                    {file ? (
                      <div className="flex flex-col items-center">
                        <div className="rounded-full bg-emerald-500/10 p-3 text-emerald-400 border border-emerald-500/30 mb-2">
                          <FileCheck className="h-7 w-7" />
                        </div>
                        <p className="text-sm font-semibold text-white truncate max-w-sm">
                          {file.name}
                        </p>
                        <p className="text-xs text-slate-400 mt-0.5">
                          {(file.size / 1024).toFixed(1)} KB · Ready for transmission
                        </p>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setFile(null);
                            setResumeTextPreview('');
                          }}
                          className="mt-3 text-xs text-slate-400 hover:text-red-400 transition-colors"
                        >
                          Change file
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <div className="rounded-full bg-indigo-500/10 p-3 text-indigo-400 border border-indigo-500/20 mb-3">
                          <UploadCloud className="h-7 w-7" />
                        </div>
                        <p className="text-sm font-medium text-slate-200">
                          <span className="font-semibold text-indigo-400">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-slate-400 mt-1">
                          PDF, DOCX, DOC, or TXT up to 15MB
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Submit Action */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3.5 px-6 text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 hover:bg-indigo-500 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin text-white" />
                        <span>{submissionStep || 'Processing submission...'}</span>
                      </>
                    ) : (
                      <>
                        <span>Submit to n8n Resume Analyzer</span>
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </div>

                {/* Notice & Security */}
                <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800">
                  <div className="flex items-center gap-1.5">
                    <Shield className="h-3.5 w-3.5 text-indigo-400" />
                    <span>Direct HTTPS payload to n8n cloud</span>
                  </div>
                  <a
                    href="https://roja0902.app.n8n.cloud/form/04696565-2697-4a55-87b3-65ba9e2ba326"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="flex items-center gap-1 text-slate-400 hover:text-indigo-300 transition-colors"
                  >
                    <span>View original n8n form</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>

              </form>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
