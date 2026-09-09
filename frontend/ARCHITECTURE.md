# Application Architecture

## High-Level System Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        INCOMING REQUESTS                         │
└──────────────────────┬──────────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────────┐
│           Express SSR Server (Node.js on port 3000)              │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  1. Receive request                                         │ │
│  │  2. Parse User-Agent header                                │ │
│  │  3. Check if crawler/bot                                   │ │
│  └────────────────────────────────────────────────────────────┘ │
└──────────────────────┬──────────────────────────────────────────┘
                       │
        ┌──────────────┴──────────────┐
        │                             │
        ▼                             ▼
   IS CRAWLER?                   IS REGULAR USER?
        │                             │
        │ YES                         │ NO
        │                             │
        ▼                             ▼
┌────────────────────┐      ┌─────────────────────┐
│  Server-Side       │      │  Client-Side        │
│  Rendering         │      │  Rendering (CSR)    │
│  ┌──────────────┐  │      │  ┌───────────────┐  │
│  │renderPages() │  │      │  │ /dist/index   │  │
│  │  - Load page │  │      │  │   .html       │  │
│  │  - Generate  │  │      │  │ + React bundles   │
│  │    HTML      │  │      │  │ + CSS/JS      │  │
│  │  - Escape    │  │      │  └───────────────┘  │
│  │    content   │  │      │  Browser:          │
│  │  - Send      │  │      │  - Downloads HTML  │
│  │    instantly │  │      │  - Runs React      │
│  └──────────────┘  │      │  - Hydrates        │
│                    │      │  - Interactive!    │
└────────────────────┘      └─────────────────────┘
        │                             │
        │ HTML Content                │ HTML + JS Bundles
        │ (no JS)                     │ (interactive)
        │                             │
        └──────────────┬──────────────┘
                       │
                       ▼
           ┌──────────────────────┐
           │ Response to Client   │
           │ (Search Engine or    │
           │  Browser)            │
           └──────────────────────┘
```

## Request Flow Details

### Path 1: Crawler Request (Googlebot)

```
Request: GET / HTTP/1.1
User-Agent: Mozilla/5.0 (compatible; Googlebot/2.1)

     ↓

Server: "Detected Googlebot!"

     ↓

renderHomePage() {
  - Load ALL_WORKSHEETS from catalog
  - Generate <ul> with worksheets
  - Create JSON-LD structured data
  - Add Open Graph meta tags
  - Escape all HTML special chars
  - Return full HTML string
}

     ↓

Response: 200 OK
Content: <html>
           <head>...meta tags...</head>
           <body>
             <div>Actual content here!</div>
             <script>...</script>  ← Links only, no hydration
           </body>
         </html>

     ↓

Googlebot: "Great! I can see content!"
           "Indexing 1,000 worksheets..."
```

### Path 2: User Request (Chrome/Safari)

```
Request: GET / HTTP/1.1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64)

     ↓

Server: "Regular user detected"

     ↓

Serve: /dist/index.html
       (contains: <div id="root"></div> + React bundles)

     ↓

Response: 200 OK
Content: <html>
           <head>...meta tags...</head>
           <body>
             <div id="root"></div>
             <script src="assets/index-HASH.js"></script>
           </body>
         </html>

     ↓

Browser:
1. Downloads index-HASH.js (React app)
2. Executes React
3. React renders into <div id="root">
4. App becomes interactive
5. User can click, play games, etc.
```

## File Organization

```
frontend/
│
├── src/                    ← React source (CSR)
│   ├── App.tsx            ← Main app component
│   ├── main.tsx           ← React entry point
│   ├── components/        ← React components
│   ├── services/          ← API calls, audio
│   ├── data/
│   │   └── catalog.ts     ← Worksheet data (used by SSR!)
│   └── types.ts           ← TypeScript types
│
├── ssr/                    ← New SSR code
│   ├── server.ts          ← Express server (entry point)
│   ├── renderPages.ts     ← HTML rendering logic
│   └── build.ts           ← Build script
│
├── public/                ← Static assets
│   ├── assets/
│   ├── favicon_io/
│   └── robots.txt
│
├── dist/                  ← Generated on build
│   ├── ssr.cjs            ← Compiled SSR server
│   ├── index.html         ← CSR fallback
│   ├── assets/
│   │   ├── index-HASH.js  ← React app (minified)
│   │   ├── index-HASH.css ← Styles
│   │   └── ...
│   └── favicon_io/
│
├── vite.config.ts        ← Vite build config (updated)
├── tsconfig.json         ← TypeScript config
├── package.json          ← Scripts (updated)
├── Dockerfile            ← Production container
└── vercel.json           ← Vercel config (updated)
```

## Data Flow: Rendering a Page

### Rendering Process for `/grades`

```
User/Crawler: GET /grades

     ↓

server.ts line 67:
  - Check if crawler
  - Call renderSeoPage('grades')

     ↓

renderPages.ts:
  1. Look up 'grades' in pages object
  2. Get title: "Worksheets by Grade..."
  3. Get description: "Free worksheets..."
  4. Call generateWorksheetList()

     ↓

generateWorksheetList():
  1. Loop through grades: ['Kindergarten', '1st', ...]
  2. For each grade:
     - Filter ALL_WORKSHEETS by grade
     - Generate <li> for first 5
  3. Return HTML string

     ↓

renderPages.ts:
  1. Pass title, description, content to baseTemplate()
  2. baseTemplate() creates full HTML:
     <html>
       <head>
         <title>Worksheets by Grade...</title>
         <meta name="description" content="...">
         <meta property="og:title" content="...">
         ...more meta tags...
       </head>
       <body>
         <nav>...</nav>
         <main>CONTENT GOES HERE</main>
         <footer>...</footer>
         <script src="assets/index.js"></script>
       </body>
     </html>

     ↓

Send to crawler: Full HTML with all content
              Ready to index immediately!

Send to user: HTML + React bundles
             Browser hydrates and makes interactive
```

## Build Process

```
npm run build

     ↓ (executed in parallel)

┌────────────────────┐          ┌────────────────┐
│  vite build        │          │ npm run        │
│                    │          │ build:ssr      │
│ Input:             │          │                │
│  src/**/*.tsx      │          │ Input:         │
│  src/**/*.css      │          │  ssr/server.ts │
│  public/           │          │  ssr/          │
│                    │          │  renderPages.ts│
│ Output:            │          │                │
│  dist/index.html   │          │ esbuild        │
│  dist/assets/      │          │ bundles SSR    │
│  index-HASH.js     │          │ with Node deps │
│  index-HASH.css    │          │                │
│  ...               │          │ Output:        │
└────────────────────┘          │  dist/ssr.cjs  │
                                └────────────────┘

     ↓ (results combined)

dist/
├── ssr.cjs              ← Ready to run: node ssr.cjs
├── index.html           ← Fallback for unknown routes
├── assets/
│   ├── index-ABC123.js  ← React app
│   └── index-DEF456.css ← Styles
└── ...
```

## Runtime: Server Start

```
npm start

     ↓

node dist/ssr.cjs

     ↓

server.ts main code runs:
  1. Create Express app
  2. Add compression middleware
  3. Mount static file serving:
     - /assets → served from dist/assets/
     - /* → served from dist/
  4. Define crawler detector function
  5. Mount route handlers:
     - GET / → main page
     - GET /grades, /subjects, ... → SEO pages
     - GET * → fallback to CSR

     ↓

app.listen(3000, () => {
  console.log('Server running on port 3000')
})

     ↓

Ready to accept requests!
Crawlers get SSR HTML
Users get CSR app
```

## Caching Strategy

```
Static Assets (images, fonts, bundled JS/CSS)
└── Cache headers: public, max-age=31536000, immutable
    └── Stored for: 1 year
    └── Browser won't check for updates
    └── CDN caches permanently
    └── Use content hash to bust cache

HTML Pages (/, /grades, /faqs, etc.)
└── Cache headers: public, max-age=3600
    └── Stored for: 1 hour
    └── Browser/CDN checks after 1 hour
    └── Allows content updates without rebuild
    └── Good for SEO changes

API Responses (/api/*)
└── Cache headers: no-cache
    └── Always fresh from server
    └── Never cached by browser/CDN
```

## Performance Metrics

### For Crawlers
```
Request arrives
  └─ Network: ~0ms (localhost) or ~20-50ms (internet)
     Server: Parse User-Agent (~0.1ms)
     └─ Database: None (data in memory)
     └─ Rendering: ~5-10ms (string building)
     └─ Gzip compression: ~2-5ms
Total: ~30-100ms TTFB

Size: ~10-15KB gzipped HTML
Parse time (crawler): ~100-200ms
```

### For Users
```
Request arrives
  └─ Network: ~0ms (localhost) or ~20-50ms (internet)
     Server: Serve static file (~1ms)
     └─ Gzip compression: ~1-2ms
Total: ~20-70ms TTFB

Download: 50-150KB (React + CSS + etc.)
Parse & execute JS: ~300-500ms
React hydration: ~200-400ms
User interaction ready: ~500-700ms total

Navigation (after hydration): ~100ms (client-side)
```

## Deployment Architecture

### Development
```
Vite Dev Server (port 5173)
├─ Rapid HMR updates
├─ Proxy to backend (port 4000)
└─ CSR only (no SSR)
```

### Production (Vercel)
```
Vercel CDN
├─ Edge caching
├─ Serves static assets (dist/assets/)
├─ Routes to Node.js function (ssr.cjs)
└─ Node.js runtime serves HTML
```

### Production (Docker)
```
Docker Container
├─ Node.js 18 Alpine
├─ Runs: node dist/ssr.cjs
├─ Listens on port 3000
└─ Serves both SSR and static files
```

## Security

```
User Input Sanitization:
  └─ All content passed through escapeHtml()
     └─ Converts: & < > " ' to HTML entities
     └─ Prevents XSS injection

Headers:
  └─ Content-Type: text/html; charset=utf-8
  └─ Cache-Control: (see above)
  └─ No sensitive data in responses

Static Assets:
  └─ Served from immutable /assets/ directory
  └─ Named with content hashes (no tampering)
  └─ Compressed and minified

API:
  └─ Still handled by backend (port 4000)
  └─ SSR doesn't expose backend directly
  └─ Client-side code makes API calls as needed
```

---

This architecture ensures:
- ✅ Crawlable HTML for SEO
- ✅ Interactive React for users
- ✅ Fast load times for both
- ✅ Proper caching strategy
- ✅ Security and sanitization
- ✅ Easy to scale and modify
