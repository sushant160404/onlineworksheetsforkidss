# Server-Side Rendering (SSR) Implementation

## Overview

Your application now supports Server-Side Rendering (SSR) for search engine crawlers and social media bots while maintaining Client-Side Rendering (CSR) for regular users. This hybrid approach ensures:

- ✅ **Full crawlability** - Search engines index all content
- ✅ **Fast initial load** - Crawlers get instant HTML
- ✅ **Interactive UX** - Users still get the React app hydration
- ✅ **Social sharing** - Open Graph meta tags with actual content

## Architecture

### How It Works

1. **Request arrives** at the Express SSR server
2. **User-Agent detection** - Check if request is from a crawler
3. **For crawlers** - Render static HTML with page content server-side
4. **For users** - Serve the Vite CSR app normally
5. **User clicks around** - React takes over for client-side navigation

### Crawler Detection

The server detects these crawlers:
- Google, Bing, Yandex, Baidu, DuckDuckGo
- Facebook, Twitter, LinkedIn, WhatsApp, Telegram, Discord, Pinterest
- Apple Bot, Pinterest, and other social/search bots

## Build & Deployment

### Development

```bash
cd frontend
npm install
npm run dev
```

Development runs Vite CSR normally on port 5173.

### Production Build

```bash
npm run build
```

This runs two builds:
1. `vite build` - Creates CSR app in `/dist`
2. `npm run build:ssr` - Bundles SSR server as `dist/ssr.cjs`

### Running Production

```bash
npm start
```

Starts the SSR server on port 3000. The server:
- Serves static assets from `/dist/assets` (cached 1 year)
- Detects crawlers and renders HTML server-side
- Falls back to CSR for regular users
- Falls back to CSR for any unknown routes

## Deployment Platforms

### Vercel

1. Update `frontend/vercel.json` (already done)
2. Push to GitHub
3. Vercel auto-detects the Node.js server
4. Deploys and serves on your domain

Environment variables needed:
```
PORT=3000
NODE_ENV=production
```

### Docker

Build and run locally:

```bash
cd frontend
docker build -t wonderkids-frontend .
docker run -p 3000:3000 wonderkids-frontend
```

### Traditional Node Hosting (Render, Railway, etc.)

```bash
npm install
npm run build
npm start
```

## SEO Pages

All pages now render with proper HTML structure for crawlers:

- **`/`** - Home page with catalog preview
- **`/grades`** - Grade-specific worksheets
- **`/subjects`** - Subject-specific worksheets  
- **`/printables`** - Printable PDF hub
- **`/curriculum`** - Curriculum standards
- **`/faqs`** - Frequently asked questions
- **`/terms`** - Terms & conditions
- **`/privacy`** - Privacy policy
- **`/writeforus`** - Writer contributions
- **`/advertise`** - Advertising info

Each page includes:
- Proper `<title>` and `<meta description>`
- Open Graph meta tags for social sharing
- Twitter Card tags
- Actual content (not just `<div id="root">`)
- Canonical URLs
- Structured data (JSON-LD)

## Testing

### Test Crawlability

```bash
# Simulate Google bot request
curl -H "User-Agent: Mozilla/5.0 (compatible; Googlebot/2.1)" \
  http://localhost:3000/

# Simulate user request
curl http://localhost:3000/
```

### Check Search Console

1. Google Search Console → URL Inspection
2. Paste your URL and let it crawl
3. Verify HTML rendered correctly

### Test Social Sharing

Use these tools to preview social cards:
- https://www.opengraph.xyz/
- https://metatags.io/
- https://cards-dev.twitter.com/validator

## Monitoring

### Cache Headers

Static assets get 1-year cache:
```
/assets/* → Cache-Control: public, max-age=31536000, immutable
```

HTML pages get 1-hour cache:
```
/* → Cache-Control: public, max-age=3600
```

### Performance

The SSR server uses Express compression middleware for gzip output. Monitor:
- Time to First Byte (TTFB)
- Time to First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)

## Troubleshooting

### Issue: Crawler gets CSR app

**Fix:** Check User-Agent detection in `ssr/server.ts`. The bot might have a different user agent. Add it to the crawlers list.

### Issue: Routes not rendering

**Fix:** Add new SEO pages to:
1. `seoPages` array in `server.ts`
2. `pages` object in `renderPages.ts`

### Issue: Styles not loading

**Fix:** Vite generates CSS in `dist/assets/`. Ensure server is serving `/assets` correctly.

### Issue: Scripts timing out

**Fix:** Increase timeout in your hosting platform (default is usually 30s). May need to optimize rendering.

## File Structure

```
frontend/
├── ssr/
│   ├── server.ts          # Express SSR server
│   ├── renderPages.ts     # Page rendering logic
│   └── build.ts           # Build script
├── src/
│   ├── App.tsx            # Main app (still CSR)
│   ├── main.tsx           # React entry point
│   └── data/catalog.ts    # Worksheet data
├── vite.config.ts         # Vite config with manifest
├── Dockerfile             # Docker build
└── package.json           # Scripts: build:ssr, start
```

## Next Steps

1. **Improve page content** - Update `renderPages.ts` with richer content
2. **Add dynamic routes** - Generate pages for individual worksheets
3. **Schema markup** - Add more JSON-LD schemas (BreadcrumbList, Product, etc.)
4. **Analytics** - Track crawler vs user traffic separately
5. **Caching strategy** - Use Redis for dynamic content caching

## Notes

- The React app still runs client-side for interactivity
- Initial HTML for crawlers is lightweight (no JavaScript)
- Users get instant HTML + hydration for fast interactive experience
- All SEO benefits without sacrificing UX
