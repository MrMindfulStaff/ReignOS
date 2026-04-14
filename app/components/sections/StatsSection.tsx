'use client';

import { useEffect, useRef } from 'react';
import Section from '../Section';

export default function StatsSection() {
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('.stat-card');
            cards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add('animate-fade-up');
              }, index * 150);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const stats = [
    { value: '20-30%', label: 'Productivity Improvement', color: 'from-purple-400 to-purple-600', border: 'border-purple-500/30 hover:border-purple-500/50', shadow: 'hover:shadow-purple-500/20' },
    { value: '15-25%', label: 'Reduction in Labor Costs', color: 'from-blue-400 to-blue-600', border: 'border-blue-500/30 hover:border-blue-500/50', shadow: 'hover:shadow-blue-500/20' },
    { value: '30-50%', label: 'Reduction in Turnover', color: 'from-violet-400 to-violet-600', border: 'border-violet-500/30 hover:border-violet-500/50', shadow: 'hover:shadow-violet-500/20' },
    { value: '30-40%', label: 'Improvement in Project Margin', color: 'from-pink-400 to-pink-600', border: 'border-pink-500/30 hover:border-pink-500/50', shadow: 'hover:shadow-pink-500/20' },
  ];

  return (
    <Section
      className="py-20"
      background={{
        gradient: 'bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950',
        parallaxOrbs: {
          positions: [
            { size: 'w-[400px] h-[400px]', position: 'top-1/2 left-1/4 -translate-y-1/2', color: 'bg-purple-600/30' },
            { size: 'w-[400px] h-[400px]', position: 'top-1/2 right-1/4 -translate-y-1/2', color: 'bg-blue-600/30' },
          ],
          opacity: 'opacity-20',
        },
      }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div ref={statsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`stat-card entrance-element p-6 lg:p-8 bg-slate-800/50 backdrop-blur-sm rounded-2xl border-2 ${stat.border} transition-all ${stat.shadow} hover:shadow-xl text-center`}
            >
              <div className={`text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-br ${stat.color} mb-3`}>
                {stat.value}
              </div>
              <div className="text-base lg:text-lg text-gray-300 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

