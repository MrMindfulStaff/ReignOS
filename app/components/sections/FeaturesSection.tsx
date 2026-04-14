'use client';

import { useEffect, useRef } from 'react';
import Section from '../Section';

export default function FeaturesSection() {
  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = featureRefs.current.map((ref, index) => {
      if (!ref) return null;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const animationClass = index % 2 === 0 ? 'animate-slide-in-left' : 'animate-slide-in-right';
              entry.target.classList.add(animationClass);
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.2 }
      );

      observer.observe(ref);
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer?.disconnect());
    };
  }, []);

  const features = [
    {
      badge: 'Time & Attendance',
      badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
      title: 'User-Friendly Interface Turns Clock-Ins Into Insights',
      description: 'Employee time punches become actionable intelligence. Track attendance, manage schedules, and analyze workforce patterns—all from a beautiful, intuitive interface.',
      items: [
        { text: 'Granulated time punches with offline mode', color: 'text-purple-400' },
        { text: 'Skill-based scheduling and project assignments', color: 'text-purple-400' },
        { text: 'PTO, vacation, and shift switch requests', color: 'text-purple-400' },
        { text: 'Built-in messaging and company social feed', color: 'text-purple-400' },
      ],
      image: '/with hand 2.png',
      imageAlt: 'Time & Attendance Dashboard',
      useContain: true,
      tintBg: 'bg-gradient-to-r from-purple-950/40 via-fuchsia-950/30 to-purple-950/40 rounded-3xl p-8 lg:p-12 border border-purple-500/10',
    },
    {
      badge: 'AI-Powered Intelligence',
      badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
      title: 'Every time punch becomes intelligence',
      description: ' Every pattern becomes prediction. Every decision backed by AI that never stops working. This isnt time tracking with AI bolted on. This is A.I. integrated into time-tracking operations.',
      items: [
        { text: 'Advanced reasoning for complex workforce decisions', color: 'text-blue-400' },
        { text: 'Team builder and performance simulations', color: 'text-blue-400' },
        { text: 'Skill-based labor estimating and project planning', color: 'text-blue-400' },
        { text: 'Custom reporting and trend identification', color: 'text-blue-400' },
      ],
      image: '/openart-image2.jpg',
      imageAlt: 'AI Technology',
      reverse: true,
      tintBg: 'bg-gradient-to-r from-blue-950/40 via-cyan-950/30 to-blue-950/40 rounded-3xl p-8 lg:p-12 border border-blue-500/10',
    },
    {
      badge: 'Employer Dashboards',
      badgeColor: 'bg-violet-500/20 text-violet-300 border-violet-500/30',
      title: 'Customizable, Fully Interactive Employer Dashboards',
      description: 'Your entire operation at a glance. Track trends, communicate with teams, manage projects, and make data-driven decisions from one powerful interface.',
      items: [
        { text: 'Track workforce trends and performance metrics', color: 'text-violet-400' },
        { text: 'Direct team communication and announcements', color: 'text-violet-400' },
        { text: 'Project performance monitoring and analytics', color: 'text-violet-400' },
        { text: 'Skill-based scheduling and assignments', color: 'text-violet-400' },
      ],
      image: '/mac-mok.png',
      imageAlt: 'Command Center Dashboard',
      useContain: true,
      tintBg: 'bg-gradient-to-r from-violet-950/40 via-purple-950/30 to-violet-950/40 rounded-3xl p-8 lg:p-12 border border-violet-500/10',
    },
  ];

  const featureCategories = [
    {
      category: 'Time & Attendance',
      color: 'purple',
      features: ['Granulated Time Punches', 'Payroll Export', 'Time Card Management', 'Skill Based Scheduling', 'Offline Mode', 'PTO & Shift Requests'],
    },
    {
      category: 'Project Management',
      color: 'blue',
      features: ['Lost Production Monitor', 'Customized Reporting', 'Performance Monitoring', 'Labor Estimating', 'Trend Identifier', 'Distribution Monitoring'],
    },
    {
      category: 'Human Resources',
      color: 'violet',
      features: ['Compliance & Risk Management', 'Team Builder & Simulator', 'Employee Comparisons', 'Team Comparison Tool', 'Data-Driven Fairness', 'Document Maintenance'],
    },
    {
      category: 'Employee Engagement',
      color: 'pink',
      features: ['Company Social Feed', 'Recognition Badging', 'Challenges & Goals', 'Skill Progress Tracking', 'Market Value Tracker', 'Real-Time Resume'],
    },
  ];

  return (
    <Section
      id="features"
      className="py-24"
      background={{
        gradient: 'bg-slate-900',
        texture: 'grid',
        parallaxOrbs: {
          positions: [
            { size: 'w-[500px] h-[500px]', position: '-top-48 -right-48', color: 'bg-purple-600/20' },
            { size: 'w-[500px] h-[500px]', position: 'bottom-0 left-0', color: 'bg-blue-600/20' },
          ],
          opacity: 'opacity-30',
        },
      }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Everything You Need to Build a Fair, High-Performing Workforce
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            R.E.I.G.N.'s powerful tools work together to track, analyze, and grow your team without bias,
            from the first clock-in to the next promotion.
          </p>
        </div>

        {/* Main Feature Showcases */}
        <div className="space-y-24 mb-24">
          {features.map((feature, index) => (
            <div
              key={index}
              ref={(el) => { featureRefs.current[index] = el; }}
              className={`feature-entrance grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${feature.reverse ? 'lg:flex-row-reverse' : ''} ${feature.tintBg || ''}`}
            >
              <div className={feature.reverse ? 'order-2 lg:order-1' : ''}>
                <div className={`inline-block px-4 py-2 backdrop-blur-sm rounded-full text-sm font-semibold mb-4 border ${feature.badgeColor}`}>
                  {feature.badge}
                </div>
                <h3 className="text-4xl font-bold mb-6 text-white">{feature.title}</h3>
                <p className="text-lg text-gray-300 mb-6 leading-relaxed">{feature.description}</p>
                <ul className="space-y-3 text-gray-300">
                  {feature.items.map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className={`${item.color} mr-3 text-xl`}>✓</span>
                      <span>{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className={`relative ${feature.reverse ? 'order-1 lg:order-2' : ''}`}>
                <div className="aspect-square bg-gradient-to-br from-purple-900/40 to-blue-900/40 rounded-3xl overflow-hidden backdrop-blur-sm border border-purple-500/20">
                  <img
                    src={feature.image}
                    alt={feature.imageAlt}
                    className={`w-full h-full ${feature.useContain ? 'object-contain' : 'object-cover'} opacity-80 hover:opacity-100 transition-opacity`}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

          {/* Real-Time Resume */}
        <div 
          ref={(el) => {
            if (el && !el.classList.contains('animate-fade-up')) {
              const observer = new IntersectionObserver(
                (entries) => {
                  entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                      entry.target.classList.add('animate-fade-up');
                      observer.unobserve(entry.target);
                    }
                  });
                },
                { threshold: 0.2 }
              );
              observer.observe(el);
            }
          }}
          className="entrance-element bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 rounded-3xl p-8 lg:p-12 text-white mb-24 relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-10">
            <img
              src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1200&q=80"
              alt="Technology Background"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative z-10">
            <div className="text-center mb-12">
              <div className="inline-block px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm font-semibold mb-6 border border-white/20">
                First of Its Kind
              </div>
              <h3 className="text-4xl md:text-5xl font-bold mb-4">The "Real-Time Resume"</h3>
              <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Unlike a traditional resume that's static and outdated the moment it's printed,
                the Real-Time Resume lives in the cloud and is continuously updated with every verified time punch.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-10">
              <div className="space-y-6">
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 text-left">
                  <h4 className="text-xl font-bold mb-3 text-purple-300">For Employers</h4>
                  <p className="text-gray-300">
                    Confident, bias-free decisions about hiring, promotions, and project assignments.
                    Data you can trust. Proof of potential that can't be inflated or overlooked.
                  </p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 text-left">
                  <h4 className="text-xl font-bold mb-3 text-blue-300">For Employees</h4>
                  <p className="text-gray-300">
                    Recognition they can see, share, and take with them anywhere in their career.
                    Skills, hours, projects, badges, and growth milestones—all verified and portable.
                  </p>
                </div>
              </div>
              
              <div className="relative">
                <div className="aspect-[4/3] bg-gradient-to-br from-purple-900/40 to-blue-900/40 rounded-2xl overflow-hidden backdrop-blur-sm border border-purple-500/20">
                  <img
                    src="/tab-mok.png"
                    alt="Real-Time Resume Interface"
                    className="w-full h-full object-contain opacity-90 hover:opacity-100 transition-opacity"
                  />
                </div>
              </div>
            </div>
            
            <div 
              ref={(el) => {
                if (el && !el.classList.contains('observed')) {
                  el.classList.add('observed');
                  const observer = new IntersectionObserver(
                    (entries) => {
                      entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                          const badges = entry.target.querySelectorAll('.feature-badge');
                          badges.forEach((badge, index) => {
                            setTimeout(() => {
                              badge.classList.add('animate-badge-highlight');
                            }, index * 100);
                          });
                          observer.unobserve(entry.target);
                        }
                      });
                    },
                    { threshold: 0.5 }
                  );
                  observer.observe(el);
                }
              }}
              className="flex flex-wrap justify-center gap-3 text-sm text-gray-300 pt-6 border-t border-white/10 capitalize"
            >
              {['Timeline view', 'Earned badges', 'Skill-Level Tracking', "Predictive Performance Analysis", "Certification Tracking"].map((item, idx) => (
                <span 
                  key={idx} 
                  className="feature-badge px-5 py-2.5 bg-white/10 backdrop-blur-sm rounded-full border border-white/10 hover:bg-white/20 hover:border-purple-400/40 hover:text-white hover:scale-105 hover:-translate-y-0.5 transition-all duration-300 cursor-default opacity-0"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 40+ Features Grid */}
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-bold mb-4 text-white">See All 40+ Advantages In Action</h3>
          <p className="text-lg text-gray-300">Comprehensive tools across every aspect of workforce management</p>
        </div>

          <div 
            ref={(el) => {
              if (el && !el.classList.contains('observed')) {
                el.classList.add('observed');
                const observer = new IntersectionObserver(
                  (entries) => {
                    entries.forEach((entry) => {
                      if (entry.isIntersecting) {
                        const cards = entry.target.querySelectorAll('.feature-category-card');
                        cards.forEach((card, index) => {
                          setTimeout(() => {
                            card.classList.add('animate-fade-up');
                          }, index * 100);
                        });
                        observer.unobserve(entry.target);
                      }
                    });
                  },
                  { threshold: 0.2 }
                );
                observer.observe(el);
              }
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
          {featureCategories.map((category, idx) => (
            <div key={idx} className="feature-category-card entrance-element">
              <FeatureCategoryCard {...category} />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

function FeatureCategoryCard({ category, color, features }: { category: string; color: string; features: string[] }) {
  const colorClasses = {
    purple: 'from-purple-500 to-purple-600',
    blue: 'from-blue-500 to-blue-600',
    violet: 'from-violet-500 to-violet-600',
    pink: 'from-pink-500 to-pink-600',
  };

  const gradientClass = colorClasses[color as keyof typeof colorClasses] || colorClasses.purple;

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl hover:shadow-purple-500/10 transition-all border-2 border-slate-700/50 hover:border-purple-500/30">
      <div className={`bg-gradient-to-r ${gradientClass} text-white px-4 py-2 rounded-lg text-center font-bold mb-6`}>
        {category}
      </div>
      <ul className="space-y-3">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start text-sm text-gray-300">
            <span className="text-green-400 mr-2 flex-shrink-0 mt-0.5">✓</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

