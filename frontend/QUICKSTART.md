# SSR Quick Start

## 30 Second Overview

Your app now renders crawlable HTML for search engines. Regular users still get the interactive React experience.

## Three Commands

```bash
# Development
npm run dev

# Production build
npm run build

# Run production server
npm start
```

## Test It

```bash
# Build
npm run build

# Run server
npm start

# In another terminal - test as regular user
curl http://localhost:3000/

# Test as crawler
curl -H "User-Agent: Googlebot/2.1" http://localhost:3000/grades
```

Expected crawler response: HTML with actual content (not `<div id="root"></div>`)

## Deploy

### Vercel (Easiest)
Just push to GitHub. No config needed.

### Docker
```bash
docker build -t wonderkids .
docker run -p 3000:3000 wonderkids
```

### Node Hosting
```bash
npm run build && npm start
```

## What Changed

| File | Change |
|------|--------|
| `package.json` | Added build:ssr, start scripts |
| `vite.config.ts` | Added asset fingerprinting |
| `vercel.json` | Removed rewrites (let Node handle it) |
| **New** | `ssr/server.ts` - Express SSR server |
| **New** | `ssr/renderPages.ts` - Page rendering |
| **New** | `ssr/build.ts` - Build script |
| **New** | `Dockerfile` - Production container |

## How It Works

1. **Browser request arrives**
2. **Server checks User-Agent**
   - Is crawler? → Render HTML server-side → Send static HTML
   - Is user? → Serve React app → User's browser runs React
3. **Result:** Both crawlers and users see good HTML

## SEO Pages

These routes now render proper HTML:
- `/` - Home
- `/grades` - Grade worksheets
- `/subjects` - Subject worksheets
- `/printables` - Printable hub
- `/curriculum` - Standards
- `/faqs` - FAQ
- `/terms` - Legal
- `/privacy` - Privacy
- `/writeforus` - Contributors
- `/advertise` - Advertising

## Key Files to Know

```
frontend/
├── ssr/
│   ├── server.ts       ← Express SSR server (handles requests)
│   ├── renderPages.ts  ← Page HTML rendering (create new pages here)
│   └── build.ts        ← Build script (auto-runs)
├── src/
│   ├── App.tsx         ← Still works exactly the same
│   └── main.tsx        ← React entry (still runs for users)
└── package.json        ← Added start, build:ssr scripts
```

## Add New SEO Page

To add page `/mypage`:

1. Add to `server.ts` line 63:
```typescript
const seoPages = ['grades', 'subjects', 'mypage']; // Add here
```

2. Add to `renderPages.ts` pages object:
```typescript
mypage: {
  title: 'My Page Title',
  description: 'Page description...',
  content: `<h1>My Page</h1>...`
}
```

3. Rebuild: `npm run build`
4. Test: `curl http://localhost:3000/mypage`

## Troubleshoot

| Issue | Solution |
|-------|----------|
| Port 3000 in use | `npm start -- --port 8000` |
| Missing CSS | Check `dist/assets/` exists |
| Crawler gets React app | Restart server, check User-Agent |
| Build fails | `rm -rf node_modules && npm install` |

## Deployment

See `DEPLOYMENT.md` for platform-specific instructions:
- Vercel
- Render
- Railway  
- Docker
- Self-hosted

## Learn More

- `SSR.md` - Full technical guide
- `IMPLEMENTATION_SUMMARY.md` - What changed
- `DEPLOYMENT.md` - Deploy anywhere

---

**TL;DR:** Build, run `npm start`, it works. Crawlers get HTML, users get React. Done.
