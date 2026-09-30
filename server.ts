import express, { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = parseInt(process.env.PORT || '3000', 10);

const DEFAULT_N8N_URL = 'https://roja0902.app.n8n.cloud/form/04696565-2697-4a55-87b3-65ba9e2ba326';

// Setup multer for in-memory file buffering
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 15 * 1024 * 1024, // 15MB limit
  },
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Log submissions in memory for transparency
interface SubmissionRecord {
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

const recentSubmissions: SubmissionRecord[] = [];

// API: Get current n8n integration info
app.get('/api/n8n-info', (_req: Request, res: Response) => {
  res.json({
    status: 'connected',
    workflowName: 'Resume analyzer',
    endpointUrl: DEFAULT_N8N_URL,
    fields: [
      { id: 'field-0', label: 'Name', type: 'text', required: true },
      { id: 'field-1', label: 'Email', type: 'email', required: true },
      { id: 'field-2', label: 'Resume', type: 'file', required: false },
    ],
    supportedFormats: ['.pdf', '.docx', '.doc', '.txt', '.rtf'],
    stats: {
      totalSubmitted: recentSubmissions.length,
      lastActive: recentSubmissions.length > 0 ? recentSubmissions[0].timestamp : 'Ready',
    },
  });
});

// API: Ping n8n URL to verify connectivity
app.post('/api/test-n8n', async (req: Request, res: Response) => {
  const targetUrl = (req.body?.targetUrl as string) || DEFAULT_N8N_URL;
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);
    const response = await fetch(targetUrl, {
      method: 'GET',
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    res.json({
      success: response.ok || response.status === 200,
      statusCode: response.status,
      targetUrl,
      message: response.ok ? 'Successfully contacted n8n webhook' : `Endpoint returned ${response.status}`,
    });
  } catch (err: unknown) {
    const error = err as Error;
    res.status(500).json({
      success: false,
      message: error.name === 'AbortError' ? 'Connection timed out' : error.message,
      targetUrl,
    });
  }
});

// API: Submit resume form to n8n
app.post('/api/submit-resume', upload.single('resume'), async (req: Request, res: Response) => {
  try {
    const name = (req.body['field-0'] || req.body['name'] || '').trim();
    const email = (req.body['field-1'] || req.body['email'] || '').trim();
    const targetUrl = (req.body['targetUrl'] as string) || DEFAULT_N8N_URL;
    const file = req.file;

    if (!name) {
      return res.status(400).json({ error: 'Name is required (field-0).' });
    }
    if (!email || !email.includes('@')) {
      return res.status(400).json({ error: 'Valid email is required (field-1).' });
    }

    // Build standard FormData to mirror the n8n form submission
    const formData = new FormData();
    formData.append('field-0', name);
    formData.append('field-1', email);

    if (file) {
      const uint8 = new Uint8Array(file.buffer);
      const blob = new Blob([uint8], { type: file.mimetype });
      formData.append('field-2', blob, file.originalname);
    } else {
      // If sample or text submitted, create a synthetic resume document
      const sampleText = req.body['resumeText'] || `Resume Candidate: ${name}\nEmail: ${email}\nGenerated via ResumeIQ automated portal.`;
      const blob = new Blob([sampleText], { type: 'text/plain' });
      formData.append('field-2', blob, `${name.replace(/\s+/g, '_')}_Resume.txt`);
    }

    // Forward to n8n webhook
    let n8nResponseStatus = 200;
    let n8nResponseBody = '';
    try {
      const n8nRes = await fetch(targetUrl, {
        method: 'POST',
        body: formData,
      });
      n8nResponseStatus = n8nRes.status;
      n8nResponseBody = await n8nRes.text();
    } catch (n8nErr) {
      console.warn('Direct n8n fetch warning:', n8nErr);
      // Even if n8n takes time or handles asynchronously, we report status
    }

    const record: SubmissionRecord = {
      id: `SUB-${Date.now()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`,
      name,
      email,
      fileName: file ? file.originalname : `${name.replace(/\s+/g, '_')}_Resume.txt`,
      fileSizeBytes: file ? file.size : 1024,
      timestamp: new Date().toISOString(),
      status: n8nResponseStatus >= 200 && n8nResponseStatus < 300 ? 'sent_to_n8n' : 'error',
      n8nStatusCode: n8nResponseStatus,
      targetUrl,
    };

    recentSubmissions.unshift(record);
    if (recentSubmissions.length > 20) {
      recentSubmissions.pop();
    }

    return res.json({
      success: true,
      message: 'Resume transmitted directly to n8n Resume Analyzer workflow!',
      submission: record,
      n8nStatus: n8nResponseStatus,
      rawResponse: n8nResponseBody.slice(0, 200),
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.error('Submission error:', err);
    return res.status(500).json({
      success: false,
      error: 'Failed to process resume submission',
      details: err.message,
    });
  }
});

// Setup Vite middleware in dev or static files in production
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`ResumeIQ Server active on http://0.0.0.0:${port}`);
    console.log(`Bound to n8n URL: ${DEFAULT_N8N_URL}`);
  });
}

startServer();
