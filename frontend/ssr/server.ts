import express from 'express';
import compression from 'compression';
import { renderToString } from 'react-dom/server';
import { renderSeoPage, renderHomePage } from './renderPages';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3000;
const isDev = process.env.NODE_ENV === 'development';

const app = express();
app.use(compression());

// User agent detection for crawlers
function isCrawler(userAgent: string): boolean {
  const crawlers = [
    'googlebot',
    'bingbot',
    'slurp',
    'duckduckbot',
    'baiduspider',
    'yandexbot',
    'facebookexternalhit',
    'twitterbot',
    'linkedinbot',
    'whatsapp',
    'telegram',
    'discordbot',
    'slotovod',
    'msnbot',
    'applebot',
    'pinterestbot',
  ];
  return crawlers.some((crawler) => userAgent.toLowerCase().includes(crawler));
}

// Serve static assets with cache headers
app.use('/assets', express.static(path.join(__dirname, '../dist/assets'), {
  maxAge: '1y',
  immutable: true,
}));

app.use(express.static(path.join(__dirname, '../dist'), {
  maxAge: '1h',
}));

// SSR routes
app.get('/', (req, res) => {
  if (isCrawler(req.get('user-agent') || '')) {
    const html = renderHomePage();
    return res.set('Content-Type', 'text/html').send(html);
  }
  serveCSR(res, path.join(__dirname, '../dist/index.html'));
});

// SEO pages
const seoPages = ['grades', 'subjects', 'printables', 'curriculum', 'faqs', 'terms', 'privacy', 'writeforus', 'advertise'];
seoPages.forEach((page) => {
  app.get(`/${page}`, (req, res) => {
    if (isCrawler(req.get('user-agent') || '')) {
      const html = renderSeoPage(page);
      return res.set('Content-Type', 'text/html').send(html);
    }
    serveCSR(res, path.join(__dirname, '../dist/index.html'));
  });
});

// Fallback to CSR for all other routes
app.get('*', (req, res) => {
  serveCSR(res, path.join(__dirname, '../dist/index.html'));
});

function serveCSR(res: express.Response, filePath: string) {
  try {
    const html = fs.readFileSync(filePath, 'utf-8');
    res.set('Content-Type', 'text/html').send(html);
  } catch (err) {
    res.status(404).send('Not Found');
  }
}

app.listen(PORT, () => {
  console.log(`SSR server running on port ${PORT}`);
});
