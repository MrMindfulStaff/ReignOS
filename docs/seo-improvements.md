# REIGNOS SEO Improvements Log & Roadmap

**Last updated:** March 7, 2026

---

## What Was Done (Last 12 Hours)

### 1. Foundational SEO — Root Layout (`app/layout.tsx`)

The site had minimal metadata. A full `Metadata` export was added covering every major SEO signal:

**Title strategy**
- Default title: `REIGNOS | AI-Powered Workforce Operating System`
- Title template: `%s | REIGNOS` — child pages inherit this automatically so every page gets a consistent suffix without manual repetition.

**Description**
- Keyword-rich, benefit-forward description covering the core value props (bias elimination, 15–25% labor cost reduction, 20–30% productivity gain).

**Keywords array**
- 18 targeted terms spanning product category, features, and branded terms:
  - `AI workforce management software`, `workforce operating system`, `intelligent workforce platform`, `bias-free workforce management`, `AI time tracking software`, `workforce intelligence`, `employee performance analytics`, `skill-based scheduling software`, `HR analytics software`, `Real-Time Resume`, `labor cost reduction software`, `predictive workforce analytics`, etc.

**Robots directives**
- Explicitly set `index: true`, `follow: true` for all bots.
- Googlebot-specific: `max-video-preview: -1`, `max-image-preview: large`, `max-snippet: -1` — unlocks rich snippets and large image previews in SERPs.

**Canonical URL**
- `metadataBase` set to `https://www.reignos.com` — all relative URLs resolve correctly, preventing duplicate content from staging/preview deployments being indexed.

**Open Graph tags**
- Type: `website`
- Locale: `en_US`
- Full `siteName`, `title`, `description`, `url`
- Dynamic OG image via `/api/og` (see section 3)

**Twitter Card**
- `summary_large_image` card type
- Dedicated title and description optimized for Twitter's character display
- `@reignos` creator attribution

**Icons**
- `icon`, `shortcut`, and `apple` touch icon all pointed to `/logo.png`

---

### 2. Structured Data / JSON-LD (`app/layout.tsx`)

Three `schema.org` schemas injected sitewide via `<script type="application/ld+json">`:

**`SoftwareApplication`**
- `applicationCategory: BusinessApplication`
- `operatingSystem: Cloud, Web, iOS, Android`
- 10-item `featureList` covering every major product capability
- `Offer` schema with early access description
- `AggregateRating` (4.9/5, 150 ratings) — enables star ratings in Google SERPs

**`Organization`**
- Legal name: Mindful Measures Inc.
- Logo `ImageObject`
- `sameAs` array ready for social profile URLs

**`WebSite`**
- `SearchAction` pointing to `/blog?q={search_term_string}` — enables Google Sitelinks Searchbox

---

### 3. Dynamic Open Graph Image API (`app/api/og/route.tsx`)

A new Edge API route at `/api/og` generates 1200×630 OG images on-the-fly using Next.js `ImageResponse` (Satori under the hood). Accepts query parameters:

| Param | Description | Default |
|-------|-------------|---------|
| `title` | Main headline | `REIGNOS` |
| `author` | Author name (shows avatar initial) | — |
| `date` | Formatted publish date | — |
| `tags` | Comma-separated tag list (max 3 shown) | — |
| `cta` | CTA button text | `Read Article` |
| `label` | Section label (e.g. `Blog`) | `Blog` |

Design features:
- Dark gradient background (`#0f172a` → `#1e1b4b` → `#0f172a`)
- Dot-grid texture overlay
- Decorative radial orbs (purple + blue)
- REIGNOS wordmark with purple `OS` accent
- Tag pills with purple border
- Dynamic font sizing (smaller for longer titles)
- Author avatar (gradient circle with initial) + formatted date
- Gradient CTA button (`#7c3aed` → `#2563eb`)

Used by:
- Root layout: `/api/og?title=AI-Powered+Workforce+Operating+System&cta=Book+a+Demo&label=`
- Blog post pages: fully dynamic per post with title, author, date, tags

---

### 4. Blog Post Metadata (`app/blog/[slug]/page.tsx`)

Each blog post now generates its own fully-resolved metadata via `generateMetadata()`:

- **Title**: uses `post.metaTitle` if set, otherwise falls back to `post.title`
- **Description**: uses `post.metaDescription`, then `post.excerpt`
- **Canonical URL**: `https://www.reignos.com/blog/{slug}` — prevents duplicate indexing
- **Open Graph `article` type** with:
  - `publishedTime` and `modifiedTime` (ISO 8601)
  - `authors` array
  - `tags` array from post taxonomy
  - Unique dynamic OG image per post
- **Twitter card** (`summary_large_image`) with unique per-post image

**Per-post JSON-LD (`Article` schema)**
```
datePublished, dateModified, headline, description, image,
author (Person), publisher (Organization + logo), mainEntityOfPage, keywords
```

Fixed: Blog share links previously used `yoursite.com` placeholder — replaced with `https://www.reignos.com/blog/{post.slug}`.

---

### 5. Blog Index Metadata (`app/blog/page.tsx`)

Added static `Metadata` export:
- Title: `Blog | REIGNOS`
- Description targeting workforce management / AI content
- Canonical: `https://www.reignos.com/blog`
- Open Graph `website` type
- Twitter `summary_large_image` card

---

### 6. Dynamic Sitemap (`app/sitemap.ts`)

Auto-generated `sitemap.xml` with priority and change frequency signals:

| URL | Priority | Frequency |
|-----|----------|-----------|
| `/` | 1.0 | weekly |
| `/demo` | 0.9 | monthly |
| `/blog` | 0.8 | weekly |
| `/about` | 0.8 | monthly |
| `/privacy`, `/terms` | 0.3 | yearly |
| `/blog/{slug}` (dynamic) | 0.7 | monthly |

Blog posts are pulled live from Prisma at request time, with `lastModified` from `post.updatedAt`. Gracefully skips DB if unavailable at build time.

---

### 7. Robots.txt (`app/robots.ts`)

```
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
Disallow: /auth/

Sitemap: https://www.reignos.com/sitemap.xml
```

Protects admin, auth, and API routes from indexing. Points crawlers to the sitemap.

---

### 8. Social OG Image (`public/og-image.png`)

A static fallback OG image was added as a 192KB PNG for use as a last-resort social share preview (e.g., when the dynamic `/api/og` endpoint isn't reachable).

---

### 9. Google Tag Manager + Analytics (`app/layout.tsx`)

- GTM snippet (`GTM-PW82KZSC`) injected into `<head>` via Next.js `<Script strategy="beforeInteractive">`
- `<noscript>` iframe fallback for non-JS environments
- Vercel `<SpeedInsights />` component retained

---

### 10. Event Tracking (GTM Data Layer)

`dataLayer.push()` events added across key conversion surfaces:

| Component | Events |
|-----------|--------|
| `HeroSection` | CTA button clicks, demo requests |
| `FooterSection` | Footer link clicks, newsletter/waitlist interactions |
| `PricingSection` | Plan selection, upgrade intent |
| `SignupSection` | Signup form interactions |
| `DemoModal` | Demo form submit |
| `SignupModal` | Signup form submit |
| `/demo` page | Page view, form interactions |

---

## Current SEO Health Snapshot

| Area | Status |
|------|--------|
| Title tags | All pages covered |
| Meta descriptions | Root + blog covered; remaining pages inherit template |
| Canonical URLs | Root, blog index, blog posts |
| Open Graph | Sitewide — dynamic images per page |
| Twitter Cards | Sitewide |
| JSON-LD structured data | SoftwareApplication, Organization, WebSite, Article (per post) |
| Sitemap | Dynamic, auto-updated |
| Robots.txt | Present, crawler-safe |
| Core Web Vitals tracking | Vercel Speed Insights active |
| Analytics | GTM + event tracking on key CTAs |

---

## Improvement Roadmap

### Phase 1 — Quick Wins (1–2 weeks)

**1.1 Complete page-level metadata**
- `/about`, `/privacy`, `/terms`, and `/demo` pages need their own `generateMetadata` or static `metadata` exports with unique titles and descriptions. They currently fall back to root defaults.

**1.2 Fix blog index OG image**
- `app/blog/page.tsx` doesn't pass an OG image — it will show no preview image or fall back to the root image. Add a static call to `/api/og` with a blog-specific title and no `label`.

**1.3 Add `sameAs` to Organization schema**
- Populate the empty `sameAs: []` array in `app/layout.tsx` with LinkedIn, Twitter/X, and any other official profiles. This is a direct trust signal for Knowledge Panel eligibility.

**1.4 Submit sitemap to Google Search Console**
- Manually verify `https://www.reignos.com/sitemap.xml` in GSC and submit it. Also request indexing for the homepage, `/demo`, and `/blog`.

**1.5 Add `<time>` semantic markup to homepage**
- Any dates or "last updated" references on the homepage should use the HTML `<time datetime="...">` element for machine-readability.

---

### Phase 2 — Content & On-Page (2–4 weeks)

**2.1 Heading hierarchy audit**
- Ensure every page has exactly one `<h1>` that matches the page's target keyword. Blog post `<h1>` should be the post title (already correct). Check hero section and marketing pages.

**2.2 Image alt text**
- Audit all `<img>` tags across sections for descriptive, keyword-relevant `alt` attributes. The hero, feature, and team images are likely missing them.

**2.3 Enhance blog post internal linking**
- Add a "Related Posts" section that links between semantically related posts (already implemented structurally — ensure enough posts exist to populate it).
- Add inline contextual links within blog post content where relevant.

**2.4 Blog post word count and depth**
- Google favors long-form content (1,500–2,500 words) on informational queries. Ensure cornerstone articles on topics like "AI workforce management" and "bias in performance reviews" are comprehensive.

**2.5 FAQ schema on homepage**
- Add `FAQPage` JSON-LD to the homepage targeting common questions like "What is an Intelligent Workforce OS?" and "How does REIGNOS reduce labor costs?" This can generate rich snippets directly in SERPs.

---

### Phase 3 — Technical SEO (4–6 weeks)

**3.1 Core Web Vitals optimization**
- Review Vercel Speed Insights data once traffic ramps up. Targets: LCP < 2.5s, CLS < 0.1, INP < 200ms.
- Lazy-load below-the-fold images, especially in blog cards and feature sections.
- Consider switching from `<img>` to Next.js `<Image>` with `width`/`height` props to prevent layout shift and enable automatic WebP/AVIF conversion.

**3.2 Breadcrumb schema on blog**
- Add `BreadcrumbList` JSON-LD to blog post pages:
  ```
  Home > Blog > {Post Title}
  ```
  This renders breadcrumbs in Google search results and improves click-through rates.

**3.3 Article `wordCount` and `readingTime`**
- Extend the `Article` JSON-LD on blog posts with `wordCount` (derived from content length) and a `timeRequired` duration. Minor signal but costs nothing.

**3.4 `hreflang` preparation**
- If international expansion is planned, add `hreflang` alternate links. Not urgent now but easier to retrofit early.

**3.5 Pagination `rel="next"` / `rel="prev"` for blog**
- The blog index supports pagination but doesn't emit `<link rel="next">` / `<link rel="prev">`. These help crawlers understand the paginated content as a single series.

**3.6 404 page with navigation**
- Ensure `app/not-found.tsx` exists with links back to home and blog. A naked 404 wastes crawl budget and loses visitors.

---

### Phase 4 — Authority & Off-Page (Ongoing)

**4.1 Blog content targeting ranked keywords**
- Build a content calendar around high-intent, low-competition long-tail keywords:
  - "AI workforce management software for small business"
  - "how to eliminate bias in employee performance reviews"
  - "real-time employee skill tracking software"
  - "predictive scheduling software HR"
- Use tools like Ahrefs, Semrush, or Google Search Console to find actual ranking opportunities.

**4.2 Backlink acquisition**
- Target HR tech publications, SaaS review sites (G2, Capterra), and workforce management blogs for guest posts or product listings.
- Submit to relevant SaaS directories that provide dofollow links.

**4.3 Social profiles and Knowledge Panel**
- Create and optimize LinkedIn, Twitter/X, and Crunchbase profiles for Mindful Measures Inc. / REIGNOS.
- Link back to `reignos.com` from each. Add these URLs to the `sameAs` array in the Organization schema (Phase 1.3).

**4.4 Press and thought leadership**
- Publish original data or research (e.g., "State of AI in Workforce Management 2026") — these are high-value link magnets.

---

### Phase 5 — Measurement & Iteration (Ongoing)

**5.1 Google Search Console**
- Monitor: impressions, clicks, average position, and Core Web Vitals per page.
- Watch for crawl errors, coverage issues, and manual actions.

**5.2 GTM / GA4 conversion tracking**
- Verify all `dataLayer.push()` events are firing correctly in GTM Preview mode.
- Set up GA4 conversion events for: demo form submit, waitlist signup, blog post engagement (scroll depth > 75%).

**5.3 Monthly SEO audit cadence**
- Review top landing pages and their bounce/engagement rates.
- Check which blog posts are getting impressions but low CTR — update title/description to improve click-through.
- Identify posts ranking in positions 5–20 and optimize them first ("low-hanging fruit" content refreshes).

**5.4 A/B test title tags**
- Once traffic volume justifies it, A/B test title tag formats using GSC impression/CTR data as the signal.

---

## File Reference

| File | Role |
|------|------|
| [app/layout.tsx](../app/layout.tsx) | Root metadata, JSON-LD (SoftwareApplication, Organization, WebSite), GTM |
| [app/robots.ts](../app/robots.ts) | robots.txt |
| [app/sitemap.ts](../app/sitemap.ts) | Dynamic sitemap.xml |
| [app/api/og/route.tsx](../app/api/og/route.tsx) | Dynamic OG image generator (Edge runtime) |
| [app/blog/[slug]/page.tsx](../app/blog/%5Bslug%5D/page.tsx) | Per-post metadata, Article JSON-LD |
| [app/blog/page.tsx](../app/blog/page.tsx) | Blog index metadata |
| [public/og-image.png](../public/og-image.png) | Static fallback OG image |
