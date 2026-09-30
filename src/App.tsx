/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ResumeAnalyzerForm } from './components/ResumeAnalyzerForm';
import { N8nPipelineVisualizer } from './components/N8nPipelineVisualizer';
import { AtsBenchmarkExplorer } from './components/AtsBenchmarkExplorer';
import { TestimonialsAndProof } from './components/TestimonialsAndProof';
import { Footer } from './components/Footer';
import { N8nSettingsModal } from './components/N8nSettingsModal';
import { SAMPLE_RESUMES } from './data/sampleResumes';
import { SampleResume } from './types';

export default function App() {
  const [n8nConnected, setN8nConnected] = useState(true);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [selectedSample, setSelectedSample] = useState<SampleResume | null>(null);

  const n8nUrl = 'https://roja0902.app.n8n.cloud/form/04696565-2697-4a55-87b3-65ba9e2ba326';

  useEffect(() => {
    // Check initial connection to server and n8n info
    fetch('/api/n8n-info')
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'connected') {
          setN8nConnected(true);
        }
      })
      .catch(() => {
        // Fallback to active state
        setN8nConnected(true);
      });
  }, []);

  const handleJumpToAnalyzer = () => {
    const el = document.getElementById('analyzer');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectSampleFromHero = () => {
    // Pick the first sample (Senior Fullstack Engineer)
    setSelectedSample(SAMPLE_RESUMES[0]);
    handleJumpToAnalyzer();
  };

  return (
    <div className="min-h-screen bg-[#0b0f17] text-slate-100 flex flex-col font-sans">
      {/* Navigation */}
      <Navbar
        n8nConnected={n8nConnected}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onJumpToAnalyzer={handleJumpToAnalyzer}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onStartAudit={handleJumpToAnalyzer}
          onSelectSample={handleSelectSampleFromHero}
        />

        {/* Live Resume Analyzer Form (Connected to n8n URL) */}
        <ResumeAnalyzerForm
          initialSample={selectedSample}
          onSampleLoaded={() => setSelectedSample(null)}
        />

        {/* n8n Pipeline Visualizer */}
        <N8nPipelineVisualizer n8nConnected={n8nConnected} />

        {/* ATS Role Benchmarks & Criteria */}
        <AtsBenchmarkExplorer />

        {/* Proof, Metrics & Testimonials */}
        <TestimonialsAndProof />
      </main>

      {/* Footer */}
      <Footer />

      {/* Settings & Webhook Inspector Modal */}
      <N8nSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        targetUrl={n8nUrl}
      />
    </div>
  );
}
