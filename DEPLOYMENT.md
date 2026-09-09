# Deployment Guide: SSR Implementation

## What Changed

Your frontend now has Server-Side Rendering (SSR) that generates crawlable HTML for search engines while keeping the React app interactive for users.

## Quick Start

### Local Testing

```bash
cd frontend
npm install
npm run build
npm start
```

Visit `http://localhost:3000` and test:
- Regular user access → Full React app
- Crawler access → Static HTML

### Verify Crawlability

```bash
# Simulate Googlebot
curl -H "User-Agent: Googlebot/2.1" http://localhost:3000/
# Should return HTML with content

# Simulate regular user
curl http://localhost:3000/
# Should also return HTML with React app markers
```

## Deployment Platforms

### Option 1: Vercel (Recommended)

Vercel auto-detects the Node.js server in your frontend.

1. No additional config needed (`vercel.json` already updated)
2. Push to GitHub
3. Vercel deploys automatically

Set environment variables in Vercel dashboard:
```
PORT=3000
NODE_ENV=production
```

### Option 2: Render.com

1. Go to dashboard.render.com
2. New → Web Service
3. Connect GitHub repo
4. Select `frontend` directory
5. Set build command: `npm run build`
6. Set start command: `npm start`
7. Add environment variables (same as above)

### Option 3: Railway

1. Go to railway.app
2. New Project → GitHub Repo
3. Select the repo
4. Railway auto-detects `package.json`
5. Add environment: `NODE_ENV=production`

### Option 4: Docker (AWS, DigitalOcean, etc.)

```bash
cd frontend
docker build -t wonderkids-frontend .
docker run -p 3000:3000 -e NODE_ENV=production wonderkids-frontend
```

### Option 5: Self-Hosted (Ubuntu/Linux)

```bash
# Install Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Clone and build
git clone <your-repo>
cd frontend
npm install
npm run build

# Run with PM2 (keeps running)
npm install -g pm2
pm2 start "npm start" --name wonderkids
pm2 save
pm2 startup
```

## What's New in the Build

### Build Process
```bash
npm run build
```
Now does:
1. Vite build → CSR app in `dist/`
2. esbuild → SSR server in `dist/ssr.cjs`

### Files Generated
```
dist/
├── index.html          # Main HTML (fallback)
├── ssr.cjs             # SSR server (production binary)
├── assets/
│   ├── index-xxxxx.js  # React app
│   └── index-xxxxx.css # Styles
└── favicon_io/         # Favicons
```

## How It Works

```
User/Crawler Request
        ↓
Express SSR Server (Node.js)
        ↓
    Is Crawler? (User-Agent check)
    ↙           ↘
  YES            NO
   ↓             ↓
Render HTML    Serve Vite CSR App
   ↓             ↓
Return          Return
Static HTML     React App
(instant)       (hydrates client-side)
```

## SEO Impact

### Before (CSR Only)
- Search engines see empty `<div id="root"></div>`
- No content indexed
- Poor social sharing
- Slow first meaningful paint

### After (SSR)
- ✅ Crawlers see full HTML with content
- ✅ All pages indexed by Google
- ✅ Social cards preview with actual content
- ✅ Fast initial load for crawlers
- ✅ Interactive React app for users

## Performance

### Cached Assets
Static files cached for 1 year:
```
/assets/* → Cache-Control: public, max-age=31536000, immutable
```

### HTML Pages
HTML cached for 1 hour (allows updates):
```
/* → Cache-Control: public, max-age=3600
```

### Content Delivery
- Gzip compression enabled
- Minified SSR server
- Asset fingerprinting for cache busting

## Monitoring

### Check Crawlability

**Google Search Console:**
1. URL Inspection → Enter your URL
2. "View cached version" should show rendered HTML
3. Check "Coverage" report for indexing status

**Bing Webmaster Tools:**
1. Crawl test → Enter URL
2. View the rendered HTML

**Test Tools:**
- https://www.seobility.net/en/seocheck/ - Full audit
- https://screaming-frog.co.uk/ - Crawl analysis
- https://metatags.io/ - Social sharing preview

### Monitor Performance

Set up monitoring for:
- **TTFB** (Time to First Byte) - Should be <200ms
- **FCP** (First Contentful Paint) - Should be <1s
- **LCP** (Largest Contentful Paint) - Should be <2.5s

Use:
- Google PageSpeed Insights
- WebPageTest
- your hosting platform's monitoring

## Rollback

If you need to revert to pure CSR (not recommended):

1. Revert `frontend/package.json` scripts
2. Remove `ssr/` directory
3. Restore `vercel.json` original rewrites
4. Run `npm run build` (Vite only)
5. Redeploy

## Troubleshooting

### 404 on /assets/index.js

**Issue:** CSS/JS files not loading  
**Solution:** Check that build generated `dist/assets/` directory. Verify path in `renderPages.ts`

### Crawler still gets CSR app

**Issue:** Bot detection not working  
**Solution:** Add new user agents to `server.ts` crawler list

### Server crashes on start

**Issue:** Missing dependencies  
**Solution:** Run `npm install` again, ensure all packages installed

### High memory usage

**Issue:** Rendering content uses memory  
**Solution:** Implement caching in `renderPages.ts`, consider Redis

## Next Phase Improvements

1. **Static generation** - Pre-render all pages at build time
2. **Streaming SSR** - Start sending HTML before rendering completes
3. **Cache layer** - Add Redis/Memcached for dynamic content
4. **Image optimization** - Serve responsive images
5. **Internationalization** - Support multiple languages

## Support

If deployment fails:
1. Check server logs for errors
2. Verify Node.js version >= 18.18.0
3. Test locally with `npm start`
4. Check environment variables are set
5. Ensure build directory exists at `dist/`

For platform-specific help:
- Vercel: https://vercel.com/docs
- Render: https://render.com/docs
- Railway: https://railway.app/project-settings
