'use client';

import { useEffect, useRef } from 'react';
import Section from '../Section';
import FullscreenDemo from '../FullscreenDemo';

export default function AIShowcaseSection() {
  const showcaseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-up');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (showcaseRef.current) {
      observer.observe(showcaseRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <Section
      id="ai-showcase"
      className="py-24"
      background={{
        gradient: 'bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900',
        texture: 'grid',
        parallaxOrbs: {
          positions: [
            { size: 'w-[500px] h-[500px]', position: 'top-1/2 left-0 -translate-y-1/2', color: 'bg-cyan-600/20' },
            { size: 'w-[500px] h-[500px]', position: 'top-1/2 right-0 -translate-y-1/2', color: 'bg-blue-600/20' },
          ],
          opacity: 'opacity-25',
        },
      }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-block px-6 py-3 bg-cyan-500/10 backdrop-blur-sm rounded-full text-cyan-300 text-sm font-semibold mb-6 border border-cyan-500/30">
            Interactive Demo
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Experience the AI Intelligence
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            See how R.E.I.G.N.'s AI analyzes verified hours, skill levels, and performance data 
            to deliver objective, actionable workforce insights.
          </p>
        </div>

        <div ref={showcaseRef} className="entrance-element">
          <div className="text-center mb-8">
            <FullscreenDemo />
          </div>

          {/* How It Works - Condensed */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-5 border border-cyan-500/20 text-center">
              {/* <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto mb-3">
                <span className="text-purple-400 font-bold text-xl">1</span>
              </div> */}
              <p className="font-semibold text-white mb-2">30+ AI Agents</p>
              <p className="text-sm text-gray-400">REIGN's agents work 24/7 to optimize your operations.</p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-5 border border-cyan-500/20 text-center">
              {/* <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-400 font-bold text-xl">2</span>
              </div> */}
              <p className="font-semibold text-white mb-2">Sales to Production</p>
              <p className="text-sm text-gray-400">Give REIGN the sales proposal and watch it <strong className="text-cyan-300">assemble and schedule</strong> the perfect team for the job.</p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-5 border border-cyan-500/20 text-center">
              {/* <div className="w-12 h-12 rounded-full bg-violet-500/20 flex items-center justify-center mx-auto mb-3">
                <span className="text-violet-400 font-bold text-xl">3</span>
              </div> */} 
              <p className="font-semibold text-white mb-2">Agent-to-Agent</p>
              <p className="text-sm text-gray-400">REIGN's agents work together to optimize career paths while protecting the bottom line.</p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-5 border border-cyan-500/20 text-center">
              {/* <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center mx-auto mb-3">
                <span className="text-cyan-400 font-bold text-xl">4</span>
              </div> */}
              <p className="font-semibold text-white mb-2">Data-Driven Insights</p>
              <p className="text-sm text-gray-400">REIGN can produce hundreds of reports in seconds for export as slideshow or spreadsheets.</p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

