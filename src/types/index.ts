export interface SubmissionResult {
  id: string;
  name: string;
  email: string;
  fileName: string;
  fileSizeBytes: number;
  timestamp: string;
  status: 'sent_to_n8n' | 'error';
  n8nStatusCode: number;
  targetUrl: string;
}

export interface AtsAuditReport {
  overallScore: number;
  grade: 'A+' | 'A' | 'B+' | 'B' | 'Needs Polish';
  summary: string;
  metrics: {
    keywordMatch: number;
    impactQuantification: number;
    formattingCompliance: number;
    skillsDensity: number;
  };
  keyStrengths: string[];
  recommendedFixes: {
    section: string;
    issue: string;
    recommendation: string;
    before?: string;
    after?: string;
  }[];
  detectedKeywords: string[];
  missingKeywords: string[];
}

export interface SampleResume {
  id: string;
  title: string;
  name: string;
  email: string;
  targetRole: string;
  experienceYears: number;
  content: string;
  highlightSkills: string[];
}
