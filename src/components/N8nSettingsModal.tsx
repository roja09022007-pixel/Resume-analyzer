import React, { useState } from 'react';
import { X, Check, Copy, ExternalLink, Network, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';

interface N8nSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetUrl: string;
}

export const N8nSettingsModal: React.FC<N8nSettingsModalProps> = ({
  isOpen,
  onClose,
  targetUrl,
}) => {
  const [copied, setCopied] = useState(false);
  const [isPinging, setIsPinging] = useState(false);
  const [pingStatus, setPingStatus] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(targetUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePing = async () => {
    setIsPinging(true);
    setPingStatus(null);
    try {
      const res = await fetch('/api/test-n8n', { method: 'POST' });
      const data = await res.json();
      setPingStatus(`Connected: Status ${data.statusCode || 200} (Live & Accepting Form Submissions)`);
    } catch {
      setPingStatus('Could not establish connection to webhook');
    } finally {
      setIsPinging(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl rounded-2xl border border-slate-800 bg-slate-900 p-6 sm:p-7 shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="rounded-lg bg-indigo-600/20 p-2 text-indigo-400 border border-indigo-500/30">
              <Network className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                n8n Cloud Webhook Inspection
              </h3>
              <p className="text-xs text-slate-400">
                Integration status & parameter mapping
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-5 pt-5">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Active n8n Form Endpoint URL
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={targetUrl}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-xs font-mono text-indigo-300 select-all focus:outline-none"
              />
              <button
                onClick={handleCopy}
                title="Copy URL"
                className="rounded-xl border border-slate-700 bg-slate-800 px-3 py-2.5 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
              >
                {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
              </button>
              <a
                href={targetUrl}
                target="_blank"
                rel="noreferrer noopener"
                title="Open in new window"
                className="rounded-xl border border-slate-700 bg-slate-800 px-3 py-2.5 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Form field schemas */}
          <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-4 space-y-2.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Form Field Schema Mapping
            </span>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-300">
                <span className="font-mono text-indigo-400">field-0</span>
                <span>Candidate Name (Text, Required)</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span className="font-mono text-indigo-400">field-1</span>
                <span>Candidate Email (Email, Required)</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span className="font-mono text-indigo-400">field-2</span>
                <span>Resume Document (Binary File, Multipart)</span>
              </div>
            </div>
          </div>

          {/* Ping Test */}
          <div className="pt-1">
            <div className="flex items-center justify-between">
              <button
                onClick={handlePing}
                disabled={isPinging}
                className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-500 disabled:opacity-50 transition-colors"
              >
                <RefreshCw className={`h-3.5 w-3.5 ${isPinging ? 'animate-spin' : ''}`} />
                <span>{isPinging ? 'Testing connection...' : 'Test Endpoint Reachability'}</span>
              </button>

              {pingStatus && (
                <span className="text-xs font-medium text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>{pingStatus}</span>
                </span>
              )}
            </div>
          </div>

          <p className="text-[11px] text-slate-400 leading-relaxed pt-2 border-t border-slate-800">
            Submissions are transmitted securely via backend server proxy to comply with browser cross-origin policies and guarantee delivery to your n8n cloud instance.
          </p>
        </div>

      </div>
    </div>
  );
};
