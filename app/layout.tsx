import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";
import "./globals.css";

const siteUrl = "https://www.reignos.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "REIGNOS | AI-Powered Workforce Operating System",
    template: "%s | REIGNOS",
  },
  description:
    "REIGNOS is the world's first Intelligent Workforce Operating System. Turn every time-punch into actionable intelligence — eliminate bias, reduce labor costs by 15–25%, and boost productivity by 20–30% with AI-driven workforce management.",
  keywords: [
    "AI workforce management software",
    "workforce operating system",
    "intelligent workforce platform",
    "bias-free workforce management",
    "AI time tracking software",
    "workforce intelligence",
    "employee performance analytics",
    "skill-based scheduling software",
    "HR analytics software",
    "workforce management platform",
    "Real-Time Resume",
    "AI-powered HR",
    "labor cost reduction software",
    "predictive workforce analytics",
    "employee engagement platform",
    "time and attendance software",
    "project management workforce",
    "REIGNOS",
  ],
  authors: [{ name: "Mindful Measures Inc.", url: siteUrl }],
  creator: "Mindful Measures Inc.",
  publisher: "Mindful Measures Inc.",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "REIGNOS",
    title: "REIGNOS | AI-Powered Workforce Operating System",
    description:
      "Turn every time-punch into actionable intelligence. REIGNOS eliminates bias, cuts labor costs by 15–25%, and boosts productivity by 20–30% with AI-driven workforce management.",
    images: [
      {
        url: `/api/og?title=${encodeURIComponent("AI-Powered Workforce Operating System")}&cta=${encodeURIComponent("Book a Demo")}&label=`,
        width: 1200,
        height: 630,
        alt: "REIGNOS — The World's First Intelligent Workforce Operating System",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "REIGNOS | AI-Powered Workforce Operating System",
    description:
      "Turn every time-punch into actionable intelligence. Eliminate bias. Reduce labor costs 15–25%. Boost productivity 20–30%.",
    images: [`/api/og?title=${encodeURIComponent("AI-Powered Workforce Operating System")}&cta=${encodeURIComponent("Book a Demo")}&label=`],
    creator: "@reignos",
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  alternates: {
    canonical: siteUrl,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "@id": `${siteUrl}/#software`,
      name: "REIGNOS",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Cloud, Web, iOS, Android",
      url: siteUrl,
      description:
        "The world's first Intelligent Workforce Operating System. AI-powered time tracking, skill-based scheduling, bias-free performance analytics, and a Real-Time Resume — all in one platform.",
      featureList: [
        "AI-Powered Workforce Intelligence",
        "Granulated Time & Attendance Tracking",
        "Skill-Based Scheduling",
        "Bias-Free Performance Analytics",
        "Real-Time Resume",
        "Predictive Workforce Analytics",
        "Labor Cost Reduction",
        "Employee Engagement & Recognition",
        "Compliance & Risk Management",
        "Customizable Employer Dashboards",
      ],
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        description: "Early access program — book a demo or join the waitlist",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        ratingCount: "150",
        bestRating: "5",
      },
    },
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "Mindful Measures Inc.",
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/logo.png`,
      },
      sameAs: [],
      description:
        "Mindful Measures Inc. builds REIGNOS, the world's first Intelligent Workforce Operating System, helping organizations eliminate bias and unlock workforce potential through AI.",
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "REIGNOS",
      description: "AI-Powered Workforce Operating System",
      publisher: { "@id": `${siteUrl}/#organization` },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${siteUrl}/blog?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script id="gtm" strategy="beforeInteractive">{`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-PW82KZSC');`}</Script>
      </head>
      <body className="antialiased">
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PW82KZSC"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {children}
        <SpeedInsights />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}

