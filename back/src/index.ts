import 'dotenv/config';
import express from 'express';
import { neon } from '@neondatabase/serverless';

const app = express();
const port = process.env.PORT || 3000;

if (!process.env.DATABASE_URL) {
  console.warn('DATABASE_URL is not set. Define it in .env for DB connectivity.');
}

const sql = neon(process.env.DATABASE_URL || '');

app.get('/health', (_req, res) => {
  res.json({ ok: true, version: process.env.APP_VERSION || 'unknown' });
});

app.get('/api/version', async (_req, res) => {
  try {
    const result = await sql`SELECT version()`;
    const dbVersion = (result as any)[0]?.version ?? 'unknown';
    res.json({
      appVersion: process.env.APP_VERSION || 'unknown',
      dbVersion
    });
  } catch (e) {
    res.status(500).json({ error: 'DB error', details: String(e) });
  }
});

app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});