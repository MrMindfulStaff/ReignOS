# R.E.I.G.N. Launch Page

A modern, techy SaaS landing page for Mindful Measures Inc.'s R.E.I.G.N. platform—built to showcase the future of unbiased workforce intelligence.

## ✨ Features

- 🌑 **Dark, Techy Design** - Immersive dark theme with textured backgrounds (dots, grid, noise patterns)
- ✨ **Parallax Effects** - Layered background elements with depth and movement
- 🎨 **Gradient Animations** - Purple/blue animated gradients with glassmorphic cards
- 📱 **Fully Responsive** - Beautiful on desktop, tablet, and mobile
- 💌 **Mailchimp Integration** - Seamless email capture for early access signups
- ⚡ **Next.js 14** - App Router, TypeScript, and Tailwind CSS
- 🎯 **Conversion-Optimized** - Strategic CTAs, social proof, and clear value propositions
- 🧠 **Complete Content** - All 40+ features, pricing tiers, testimonials, and Real-Time Resume showcase

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Mailchimp

Create a `.env.local` file in the root directory:

```bash
NEXT_PUBLIC_MAILCHIMP_URL=your_mailchimp_url_here
```

**To get your Mailchimp URL:**
1. Log into Mailchimp
2. Go to **Audience** → **Signup forms** → **Embedded forms**
3. Copy the form action URL (format: `https://yourdomain.us1.list-manage.com/subscribe/post?u=XXX&id=XXX`)

### 3. Run Development Server

```bash
npm run dev
```

### 4. View the Site

Open [http://localhost:3000](http://localhost:3000) in your browser

## 📋 Page Sections

1. **Navigation** - Fixed header with smooth scroll links
2. **Hero** - Animated gradient background with key stats
3. **Features** - Comprehensive showcase of all R.E.I.G.N. capabilities:
   - Time & Attendance
   - AI-Powered Intelligence
   - Employer Dashboards
   - Real-Time Resume (hero feature)
   - 40+ Feature Grid (4 categories)
4. **Pricing** - Four tiers: JOIN US (Early Access), Get Started, Go Pro, Scale
5. **Testimonials** - Industry leader quotes
6. **Early Access Signup** - Mailchimp form
7. **Demo Booking** - Contact section
8. **Footer** - Complete site navigation

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS with custom animations
- **Email:** react-mailchimp-subscribe
- **Deployment:** Optimized for Vercel

## 🎨 Customization

### Colors

The site uses a purple/blue gradient theme on dark slate backgrounds. To customize, edit `tailwind.config.ts` and `globals.css`.

### Content

All content is in `/app/page.tsx`. Update text, features, pricing, or testimonials directly in the component.

### Textures & Backgrounds

Custom textured backgrounds are defined in `globals.css`:
- `.bg-texture-dots` - Radial dot pattern
- `.bg-texture-grid` - Grid lines pattern  
- `.bg-texture-noise` - Fractal noise texture
- `.parallax` - Fixed background attachment

### Animations

Custom animations are defined in `tailwind.config.ts`:
- `animate-gradient` - Background gradients
- `animate-float` - Floating elements
- `animate-pulse-slow` - Slow pulsing orbs

Each section features unique parallax background orbs with blur effects for depth.

## 📦 Build & Deploy

### Build for Production

```bash
npm run build
npm start
```

### Deploy to Vercel

1. Push code to GitHub
2. Import project in Vercel
3. Add `NEXT_PUBLIC_MAILCHIMP_URL` to environment variables
4. Deploy!

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_MAILCHIMP_URL` | Mailchimp signup form URL | Yes |

## 🤝 Support

For questions about R.E.I.G.N. or this launch page, contact info@mindfulmeasuresinc.com

---

**Built with ⚡ for Mindful Measures Inc.**  
*Eliminating bias. Empowering growth.*

