'use client';

import React, { useEffect, useRef } from 'react';
import Section from '../Section';

export default function JourneySection() {
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const items = entry.target.querySelectorAll('.timeline-item');
            items.forEach((item, index) => {
              setTimeout(() => {
                item.classList.add('animate-fade-up');
              }, index * 150);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (timelineRef.current) {
      observer.observe(timelineRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const weeks = [
    {
      week: 'Week 1',
      title: 'Every worker clocks in through REIGN',
      description: 'Data starts flowing.',
      color: 'from-purple-400 to-purple-600',
      borderColor: 'border-purple-500/30',
      shadowColor: 'hover:shadow-purple-500/20',
    },
    {
      week: 'Week 2',
      title: "You see your first Real-Time Resume",
      description: 'Mind = blown.',
      color: 'from-blue-400 to-blue-600',
      borderColor: 'border-blue-500/30',
      shadowColor: 'hover:shadow-blue-500/20',
    },
    {
      week: 'Week 3',
      title: "AI agents start flagging opportunities",
      description: "You didn't know existed.",
      color: 'from-violet-400 to-violet-600',
      borderColor: 'border-violet-500/30',
      shadowColor: 'hover:shadow-violet-500/20',
    },
    {
      week: 'Week 4',
      title: 'You make your first decision with perfect information',
      description: '',
      color: 'from-pink-400 to-pink-600',
      borderColor: 'border-pink-500/30',
      shadowColor: 'hover:shadow-pink-500/20',
    },
  ];

  return (
    <Section
      className="py-24"
      background={{
        gradient: 'bg-gradient-to-br from-slate-950 via-purple-950/50 to-slate-950',
        parallaxOrbs: {
          positions: [
            { size: 'w-[600px] h-[600px]', position: 'top-1/4 -left-48', color: 'bg-purple-600/20' },
            { size: 'w-[600px] h-[600px]', position: 'bottom-1/4 -right-48', color: 'bg-blue-600/20' },
          ],
          opacity: 'opacity-30',
        },
      }}
    >
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white uppercase tracking-tight">
            See What You've Been Missing
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 font-medium">
            Here's what happens in your first 30 days with REIGN:
          </p>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="mb-16">
          <div className="hidden lg:flex items-center justify-center gap-4">
            {weeks.map((item, index) => (
              <React.Fragment key={index}>
                <div
                  className={`timeline-item entrance-element group relative bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border-2 ${item.borderColor} transition-all ${item.shadowColor} hover:shadow-xl hover:scale-105 flex-1 max-w-[250px]`}
                >
                  <div className="text-center">
                    <div className={`mx-auto w-16 h-16 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center text-white font-bold text-sm shadow-lg group-hover:scale-110 transition-transform mb-4`}>
                      {item.week}
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2 leading-tight">{item.title}</h3>
                    {item.description && (
                      <p className={`text-base text-transparent bg-clip-text bg-gradient-to-r ${item.color} font-semibold`}>
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>
                {index < weeks.length - 1 && (
                  <div className="flex-shrink-0 text-purple-400 text-4xl font-bold animate-pulse">
                    →
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Mobile vertical layout */}
          <div className="lg:hidden space-y-6">
            {weeks.map((item, index) => (
              <div
                key={index}
                className={`timeline-item entrance-element group relative bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border-2 ${item.borderColor} transition-all ${item.shadowColor} hover:shadow-xl`}
              >
                <div className="flex items-start gap-4">
                  <div className={`flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center text-white font-bold text-sm shadow-lg group-hover:scale-110 transition-transform`}>
                    {item.week}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                    {item.description && (
                      <p className={`text-base text-transparent bg-clip-text bg-gradient-to-r ${item.color} font-semibold`}>
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* After That Section */}
        <div className="text-center mb-12">
          <div className="inline-block bg-gradient-to-r from-purple-500/10 to-blue-500/10 backdrop-blur-sm rounded-3xl p-12 border-2 border-purple-500/30 mb-12">
            <p className="text-3xl md:text-4xl font-bold text-white mb-3">
              After that?
            </p>
            <p className="text-2xl md:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 font-bold">
              You'll wonder how you ever ran blind.
            </p>
          </div>

          <p className="text-xl md:text-2xl text-gray-300 mb-8 font-medium">
            We'll show you exactly how this works for your operation.
          </p>

          <div className="flex flex-col items-center gap-4 mb-6">
            <p className="text-lg text-gray-400">
              30-minute demo. Zero pressure. Maximum clarity.
            </p>
          </div>

          {/* CTA Button */}
          <a
            href="/demo"
            className="inline-block px-12 py-5 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xl font-bold rounded-full hover:from-purple-500 hover:to-blue-500 transform hover:scale-105 transition-all shadow-2xl hover:shadow-purple-500/50"
          >
            Book Now
          </a>
        </div>
      </div>
    </Section>
  );
}

