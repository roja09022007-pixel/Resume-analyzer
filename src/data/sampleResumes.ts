import { SampleResume } from '../types';

export const SAMPLE_RESUMES: SampleResume[] = [
  {
    id: 'swe-lead',
    title: 'Senior Software Engineer (Fullstack)',
    name: 'Alex Rivera',
    email: 'alex.rivera.dev@gmail.com',
    targetRole: 'Senior Full Stack Engineer',
    experienceYears: 6,
    highlightSkills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker', 'AWS', 'System Design'],
    content: `ALEX RIVERA
Email: alex.rivera.dev@gmail.com | Phone: (555) 234-5678 | GitHub: github.com/alexrivera-tech
Location: San Francisco, CA | LinkedIn: linkedin.com/in/alex-rivera-tech

SUMMARY
High-impact Senior Full Stack Engineer with 6+ years designing scalable microservices, low-latency distributed systems, and real-time React web applications. Proven track record reducing API latency by 42% and driving 99.98% platform reliability across multi-tenant SaaS environments.

EXPERIENCE
Lead Software Engineer | Apex Cloud Systems | 2022 - Present
- Architected and deployed event-driven ingestion pipeline in Node.js and Apache Kafka processing 45M events/day with sub-80ms p99 latency.
- Refactored legacy monolithic dashboard into modular React 19 / TypeScript micro-frontends, cutting client bundle size by 38% and First Contentful Paint by 1.4s.
- Spearheaded team-wide migration to automated CI/CD GitHub Actions pipelines, decreasing release deployment cycle time from 3 hours to 12 minutes.
- Mentored 5 mid-level engineers in distributed consistency, database indexing strategies, and clean architecture principles.

Full Stack Engineer | MetricWave Technologies | 2019 - 2022
- Built enterprise analytics reporting service using Express, TypeScript, and PostgreSQL with automated partitioning for 200M+ metric rows.
- Engineered role-based access control (RBAC) security layer and OAuth2 / SSO integration for 12,000 corporate enterprise users.
- Authored 350+ unit and integration tests using Vitest and Playwright, elevating test coverage from 54% to 92%.

EDUCATION & CERTIFICATIONS
B.S. in Computer Science | University of California, Berkeley (2019)
AWS Certified Solutions Architect – Associate (2023)

TECHNICAL SKILLS
Languages: TypeScript, JavaScript, Python, Go, SQL
Frameworks: React, Next.js, Node.js, Express, Tailwind CSS
Databases & Cloud: PostgreSQL, Redis, MongoDB, AWS (ECS, S3, RDS), Docker, Kubernetes, n8n`,
  },
  {
    id: 'pm-growth',
    title: 'Staff Product Manager (SaaS Growth)',
    name: 'Elena Rostova',
    email: 'elena.rostova.pm@gmail.com',
    targetRole: 'Staff Product Manager',
    experienceYears: 8,
    highlightSkills: ['Product Strategy', 'PLG Growth', 'A/B Testing', 'Retention Funnels', 'SQL', 'Roadmapping'],
    content: `ELENA ROSTOVA
Email: elena.rostova.pm@gmail.com | Phone: (555) 789-0123
Location: New York, NY | LinkedIn: linkedin.com/in/elena-rostova-growth

EXECUTIVE SUMMARY
Strategic Staff Product Manager with 8+ years leading cross-functional squads to drive Product-Led Growth (PLG), customer acquisition, and enterprise expansion. Led zero-to-one launch of self-serve onboarding that generated $3.8M ARR in year one.

WORK EXPERIENCE
Staff Product Manager, Growth | Lumina Software | 2022 - Present
- Spearheaded product discovery and experiment roadmap for self-serve activation, increasing free-to-paid conversion rate from 3.2% to 6.8% (+112% lift).
- Designed behavioral telemetry and event triggers integrating n8n automation and Mixpanel, reducing onboarding drop-off by 27%.
- Managed cross-functional pod of 9 engineers, 2 product designers, and 1 dedicated data scientist across 2-week agile sprints.
- Led pricing & packaging overhaul that lifted Average Revenue Per User (ARPU) by 24% with zero churn increase.

Senior Product Manager | Elevate Financial | 2018 - 2022
- Launched automated compliance checking tool serving 80,000+ SMB banking accounts, decreasing customer verification wait times from 4 days to 4 minutes.
- Conducted 60+ in-depth user interviews and translated quantitative telemetry into 4 prioritized quarterly roadmaps approved by executive leadership.

EDUCATION
B.A. in Economics & Behavioral Psychology | Columbia University (2018)`,
  },
  {
    id: 'ai-data',
    title: 'AI / ML Engineer & Data Scientist',
    name: 'Marcus Chen',
    email: 'marcus.chen.ai@gmail.com',
    targetRole: 'Senior Machine Learning Engineer',
    experienceYears: 5,
    highlightSkills: ['Python', 'PyTorch', 'Transformers', 'FastAPI', 'MLOps', 'Vector Search', 'n8n'],
    content: `MARCUS CHEN
Email: marcus.chen.ai@gmail.com | Phone: (555) 456-7890
Location: Seattle, WA | GitHub: github.com/marcuschen-ml

PROFESSIONAL SUMMARY
Machine Learning Engineer specializing in Large Language Models (LLM) fine-tuning, retrieval-augmented generation (RAG), and high-throughput inference systems. Deployed models serving 500+ requests per second with high accuracy.

EXPERIENCE
Senior ML Engineer | Cortex AI Labs | 2022 - Present
- Designed end-to-end RAG architecture with Qdrant vector database and hybrid dense-sparse retrieval, lifting answer recall by 34%.
- Built automated LLM evaluation and validation pipeline utilizing n8n workflows and synthetic data generation, saving 30+ engineering hours per week.
- Reduced model inference memory footprint by 40% using 8-bit quantization and TensorRT-LLM on NVIDIA A10G clusters.

ML Engineer | DataPulse Analytics | 2020 - 2022
- Trained domain-specific Named Entity Recognition (NER) models for automated financial document extraction with 96.2% F1 score.
- Implemented real-time anomaly detection pipelines processing continuous Kafka time-series streams.

SKILLS
Python, PyTorch, Hugging Face, LangChain, FastAPI, Docker, Ray, Kubeflow, PostgreSQL`,
  },
];
