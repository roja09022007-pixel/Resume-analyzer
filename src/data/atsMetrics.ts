export interface RoleBenchmark {
  role: string;
  category: string;
  expectedKeywords: string[];
  powerVerbs: string[];
  averagePassScore: number;
  atsPitfalls: string[];
}

export const ATS_ROLE_BENCHMARKS: RoleBenchmark[] = [
  {
    role: 'Full Stack & Software Engineering',
    category: 'Engineering',
    expectedKeywords: [
      'Microservices', 'System Design', 'CI/CD', 'API Architecture', 'PostgreSQL',
      'TypeScript', 'React', 'Docker', 'Kubernetes', 'Scalability', 'Unit Testing', 'AWS'
    ],
    powerVerbs: ['Architected', 'Engineered', 'Optimized', 'Refactored', 'Spearheaded', 'Deployed', 'Decreased'],
    averagePassScore: 82,
    atsPitfalls: [
      'Using dual-column layouts that break parser line order',
      'Icons instead of text for contact information',
      'Missing quantified business metrics (% reduction, $ saved, latency drop)',
      'Unstructured skills list without categorical groupings'
    ],
  },
  {
    role: 'Product Management & Growth',
    category: 'Product',
    expectedKeywords: [
      'Product Strategy', 'PLG', 'Retention Funnel', 'A/B Testing', 'Customer Discovery',
      'OKRs', 'Roadmapping', 'User Journey', 'CAC / LTV', 'Go-To-Market', 'Agile'
    ],
    powerVerbs: ['Launched', 'Pioneered', 'Accelerated', 'Negotiated', 'Synthesized', 'Transformed'],
    averagePassScore: 84,
    atsPitfalls: [
      'Vague responsibilities ("Responsible for product roadmaps") instead of outcomes',
      'Omitting direct cross-functional team sizing or stakeholder scopes',
      'Missing revenue or adoption lift metrics'
    ],
  },
  {
    role: 'Data Science & Machine Learning',
    category: 'AI & Data',
    expectedKeywords: [
      'Transformers', 'PyTorch', 'Vector Database', 'RAG', 'MLOps', 'Feature Engineering',
      'Inference Latency', 'Model Evaluation', 'Fine-Tuning', 'FastAPI', 'Pandas'
    ],
    powerVerbs: ['Trained', 'Benchmarked', 'Fine-Tuned', 'Quantized', 'Extracted', 'Modeled'],
    averagePassScore: 80,
    atsPitfalls: [
      'Listing generic math concepts rather than deployed production systems',
      'Neglecting model metrics (F1 score, AUC, p99 latency, cost savings)',
      'Unparseable code blocks or embedded GitHub badge graphics'
    ],
  },
  {
    role: 'DevOps & Cloud Infrastructure',
    category: 'Infrastructure',
    expectedKeywords: [
      'Terraform', 'Kubernetes', 'Prometheus', 'Grafana', 'IaC', 'Multi-Cloud',
      'Zero Trust', 'Disaster Recovery', 'SLA / SLO', 'Incident Response', 'Cost Optimization'
    ],
    powerVerbs: ['Automated', 'Migrated', 'Provisioned', 'Standardized', 'Secured', 'Hardened'],
    averagePassScore: 85,
    atsPitfalls: [
      'Missing uptime or SLA percentage numbers',
      'Overloading buzzwords without naming actual scale (nodes, clusters, clusters/day)',
      'Using tables or raster image graphics for network architecture'
    ],
  },
];

export const ATS_AUDIT_RULES = [
  {
    title: 'X-Y-Z Impact Formulation',
    description: 'Every core achievement bullet should state: Accomplished [X], as measured by [Y], by doing [Z].',
    weight: '30%',
    status: 'High Impact',
  },
  {
    title: 'Single-Column Semantic Flow',
    description: 'Modern enterprise ATS parsers read left-to-right, top-to-bottom. Multi-column tables often merge unrelated text.',
    weight: '25%',
    status: 'Parser Requirement',
  },
  {
    title: 'Hard Skill Exact Keyword Match',
    description: 'Algorithms cross-match exact phrasing from job postings. Synonyms receive lower relevance weights.',
    weight: '25%',
    status: 'Ranking Metric',
  },
  {
    title: 'Standard Section Headers',
    description: 'Use recognized titles (Experience, Education, Skills, Projects). Avoid stylized creative metaphors.',
    weight: '20%',
    status: 'Index Anchor',
  },
];
