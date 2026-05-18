# Karanveer Singh — Frontend Developer Portfolio

Modern, animated, fully responsive portfolio built with **Angular 21**, **SCSS**, and Angular signals.

🔗 **Live:** _coming soon (Render)_
👤 **GitHub:** [@karanveerSsingh](https://github.com/karanveerSsingh)
📧 **Email:** karanveer0508singh@gmail.com

---

## ✨ Features

- Angular 21 standalone components + signals + new control flow (`@for` / `@if`)
- Lazy-loaded home route
- Dark / light theme toggle (system-aware, persisted)
- Hero with typing effect, particles, orbiting tech icons, floating code card
- About, Skills (animated progress bars), Stats (animated counters)
- Projects with category filtering (CRM, Dashboards, Web Apps)
- Animated experience timeline
- Services, Testimonials carousel
- Contact form with Reactive Forms validation
- Sticky navbar, scroll-to-top button, scroll-reveal animations
- Resume PDF download
- Mobile-first responsive, SEO-friendly meta tags

---

## 🛠 Tech Stack

Angular 21 · TypeScript · SCSS · RxJS · Reactive Forms · Font Awesome · Google Fonts (Inter, JetBrains Mono)

---

## 🚀 Local development

```bash
npm install
npm start
# → http://localhost:4200
```

## 📦 Production build

```bash
npm run build
# Output: dist/portfolio/browser/
```

---

## ☁️ Deploying to Render

This repo includes [`render.yaml`](./render.yaml) for one-click deploys.

### Option A — Blueprint (recommended)
1. Push this repo to GitHub
2. Go to <https://dashboard.render.com/blueprints>
3. Click **New Blueprint Instance** → connect this repo
4. Render will detect `render.yaml` and deploy automatically

### Option B — Manual Static Site
1. <https://dashboard.render.com> → **New** → **Static Site**
2. Connect this repo
3. Use these settings:
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `dist/portfolio/browser`
   - **Node Version:** 20.19.6 (set in env vars)
4. Add a **Rewrite Rule** (for SPA routing):
   - Source: `/*`
   - Destination: `/index.html`
   - Action: Rewrite

The included `public/_redirects` file also handles SPA fallback automatically.

---

## 📂 Project Structure

```
src/
├── app/
│   ├── core/                      # ThemeService
│   ├── shared/
│   │   ├── components/            # navbar, footer, scroll-top
│   │   └── directives/            # reveal.directive
│   └── features/
│       └── home/
│           └── sections/          # hero, about, skills, projects,
│                                  # experience, services, stats,
│                                  # testimonials, contact
├── styles.scss                    # global styles + theme variables
└── index.html
public/
├── assets/
│   └── resume.pdf                 # downloadable resume
└── _redirects                     # SPA fallback for Render/Netlify
```

---

## 📝 License

MIT © Karanveer Singh
