'use client';

import { useEffect, useRef } from 'react';
import Section from '../Section';

export default function PricingSection() {
  const pricingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('.pricing-card');
            cards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add('animate-fade-up');
              }, index * 150);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (pricingRef.current) {
      observer.observe(pricingRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const pricingTiers = [
    {
      name: 'Founders Club',
      subtitle: 'Grow With Us!',
      price: '$99',
      period: 'per month + $5/user',
      badge: 'Pro Features Included',
      features: [
        'Best for up to 25 users',
        'Real-Time Resume',
        'Time & Attendance',
        'AI Assistant',
        'Badge Recognition System',
        'Employee Engagement Dashboard',
        'Messaging Platform',
        'Payroll Export',
        'Core Reporting',
        'Scheduling',
      ],
      cta: 'Join Now',
      ctaLink: '#demo',
      eventLabel: 'pricing_founders_club',
      colors: {
        border: 'border-blue-500/50 hover:border-blue-500',
        shadow: 'hover:shadow-blue-500/20',
        checkmark: 'text-blue-400',
        button: 'bg-white hover:bg-gray-100 text-gray-900',
      },
    },
    {
      name: 'Starter',
      subtitle: 'Best for up to 100',
      price: '$199',
      period: 'per month + $7/user',
      popular: true,
      features: [
        'Real-Time Resume',
        'Time & Attendance',
        'AI Assistant',
        'Badge Recognition System',
        'Employee Engagement Dashboard',
        'Messaging Platform',
        'Payroll Export',
        'Core Reporting',
        'Scheduling',
      ],
      cta: 'Book a Demo',
      ctaLink: '#demo',
      eventLabel: 'pricing_starter',
      colors: {
        border: 'border-purple-400',
        checkmark: 'text-yellow-300',
        button: 'bg-white hover:bg-gray-100 text-purple-600',
      },
      scale: true,
    },
    {
      name: 'Pro',
      subtitle: 'Best for up to 300',
      price: '$499',
      period: 'per month + $6/user',
      features: [
        'Everything In Starter+',
        'Lost Production Monitor',
        'DEI/MEI Tools',
        'In-App Challenges/Goal Setting',
        'Value Tracker',
        'Project Trend Identifier',
        'Project Performance Monitoring',
        'Skills Based Scheduling',
        'Full Custom Reporting',
        'Prediction and Simulation Tools',
        'Fully Custom Dashboards',
      ],
      cta: 'Book a Demo',
      ctaLink: '#demo',
      eventLabel: 'pricing_pro',
      colors: {
        border: 'border-violet-500/30 hover:border-violet-500/60',
        shadow: 'hover:shadow-violet-500/20',
        checkmark: 'text-violet-400',
        button: 'bg-white hover:bg-gray-100 text-purple-600',
      },
    },
    {
      name: 'Enterprise',
      subtitle: 'Best for 300+ users',
      price: 'Custom',
      period: 'pricing',
      features: [
        'Everything In Pro+',
        'Full Custom Reporting',
        'ERP Integration',
        'API + Data Export Access',
        'Dedicated Success Manager',
        'SLA & Compliance Support',
        'Priority Support',
        'Custom Talent Card Creation',
        'White-Labeling Options',
      ],
      cta: 'Contact Sales',
      ctaLink: '#demo',
      eventLabel: 'pricing_enterprise',
      colors: {
        border: 'border-amber-500/30 hover:border-amber-500/60',
        shadow: 'hover:shadow-amber-500/20',
        checkmark: 'text-amber-400',
        button: 'bg-white hover:bg-gray-100 text-gray-900',
      },
    },
  ];

  return (
    <Section
      id="pricing"
      className="py-24"
      background={{
        gradient: 'bg-slate-950',
        texture: 'dots',
        parallaxOrbs: {
          positions: [
            { size: 'w-[600px] h-[600px]', position: 'top-1/4 -left-48', color: 'bg-violet-600/30' },
            { size: 'w-[600px] h-[600px]', position: 'bottom-1/4 -right-48', color: 'bg-blue-600/30' },
          ],
          opacity: 'opacity-20',
        },
      }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Simple, Fair Pricing for a Simple, Fair Process
          </h2>
          <p className="text-xl text-gray-300">Choose the plan that fits your team</p>
        </div>

        <div ref={pricingRef} className="flex flex-nowrap gap-8 max-w-7xl mx-auto justify-center overflow-visible pb-4 pt-8 px-2">
          {pricingTiers.map((tier, index) => (
            <div
              key={index}
              className={`pricing-card entrance-element flex flex-col flex-shrink-0 w-80 rounded-2xl p-8 shadow-lg hover:shadow-2xl ${tier.colors.shadow || ''} transition-all duration-300 border-2 ${tier.colors.border} hover:-translate-y-1 relative ${
                tier.scale ? 'bg-gradient-to-br from-purple-600 to-blue-600 md:scale-105 md:hover:scale-110' : 'bg-slate-800/50 backdrop-blur-sm'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 px-4 py-1 bg-yellow-400 text-gray-900 rounded-full text-sm font-bold whitespace-nowrap">
                  MOST POPULAR
                </div>
              )}
              {tier.badge && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 px-4 py-1 bg-blue-500 text-white rounded-full text-sm font-bold whitespace-nowrap">
                  {tier.badge}
                </div>
              )}
              <div className="text-center mb-6">
                <h3 className={`text-2xl font-bold mb-2 ${tier.scale ? 'text-white' : 'text-white'}`}>{tier.name}</h3>
                <div className={`text-sm font-semibold mb-4 ${tier.scale ? 'text-purple-200' : 'text-gray-400'}`}>
                  {tier.subtitle}
                </div>
                <div className={`text-5xl font-bold mb-2 ${tier.scale ? 'text-white' : 'text-white'}`}>{tier.price}</div>
                <div className={tier.scale ? 'text-purple-100' : 'text-gray-400'}>{tier.period}</div>
              </div>
              <ul className="space-y-4 mb-8 flex-grow">
                {tier.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className={`${tier.colors.checkmark} mr-3 text-xl flex-shrink-0`}>✓</span>
                    <span className={tier.scale ? 'text-white' : 'text-gray-300'}>{feature}</span>
                  </li>
                ))}
              </ul>
              <a
                href={tier.ctaLink}
                onClick={() => {
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  (window as any).dataLayer?.push({ event: 'cta_click', event_category: 'navigation', event_label: tier.eventLabel });
                }}
                className={`block w-full px-6 py-3 rounded-lg font-semibold text-center transition-all transform hover:scale-105 active:scale-95 ripple-effect ${tier.colors.button}`}
              >
                {tier.cta}
              </a>
            </div>
          ))}
        </div>

        {/* Scroll indicator for mobile */}
        <div className="text-center mt-8 md:hidden">
          <p className="text-sm text-gray-400 animate-pulse">← Swipe to see all plans →</p>
        </div>
      </div>
    </Section>
  );
}

