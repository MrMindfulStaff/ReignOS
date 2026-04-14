'use client';

import Section from '../Section';
import { useModal } from '../../contexts/ModalContext';

export default function HeroSection() {
  const { openModal } = useModal();

  return (
      <Section
      className="min-h-screen portrait:min-h-[50vh] flex items-center justify-center"
      background={{
        gradient: 'bg-slate-950',
        image: {
          src: '/tech-texture-1.jpg',
          overlay: 'bg-gradient-to-br from-slate-950/85 via-purple-950/80 to-slate-900/85',
        },
        parallaxOrbs: {
          positions: [
            { size: 'w-96 h-96', position: '-top-48 -left-48', color: 'bg-purple-500/20', blur: 'blur-3xl animate-pulse-slow' },
            { size: 'w-96 h-96', position: '-bottom-48 -right-48', color: 'bg-blue-500/20', blur: 'blur-3xl animate-pulse-slow' },
            { size: 'w-96 h-96', position: 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2', color: 'bg-violet-500/10', blur: 'blur-3xl animate-pulse-slow' },
          ],
        },
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-24 text-center">
        {/* Logo with A.I. Treatment */}
        <div className="mb-12 flex flex-col items-center justify-center">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 blur-3xl opacity-30 group-hover:opacity-50 transition-opacity duration-500 animate-pulse-slow scale-150"></div>
            <img
              src="/1x/Asset 1.png"
              alt="REIGNOS"
              className="h-16 md:h-20 lg:h-24 w-auto relative z-10 drop-shadow-2xl transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="mt-6 flex items-center gap-2">
            <div className="h-px w-8 bg-gradient-to-r from-transparent via-purple-400 to-transparent"></div>
            <span className="text-sm font-light tracking-[0.3em] text-purple-300 uppercase">
              A.I. Powered
            </span>
            <div className="h-px w-8 bg-gradient-to-r from-transparent via-purple-400 to-transparent"></div>
          </div>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-7xl font-bold mb-8 text-white">
          The World's First Intelligent
          <br />
          <span className="text-gradient-bg gradient-text animate-gradient bg-clip-text text-transparent">
          Workforce Operating System
          </span>
        </h1>

        {/* Tagline */}
        <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-white to-blue-200 mb-8">
          Stop guessing, start knowing.
        </h2>

        <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
          <span className="text-white font-medium">REIGN<span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">OS</span></span> turns every time-punch into intelligence that protects your profits.
          Used by companies who refuse to leave money on the table.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => {
              openModal('signup');
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (window as any).dataLayer?.push({ event: 'cta_click', event_category: 'navigation', event_label: 'hero_early_access' });
            }}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg font-semibold text-lg transition-all transform hover:scale-105 active:scale-95 shadow-2xl shadow-purple-500/50 ripple-effect"
          >
            Get Early Access
          </button>
          <button
            onClick={() => {
              openModal('demo');
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (window as any).dataLayer?.push({ event: 'cta_click', event_category: 'navigation', event_label: 'hero_book_demo' });
            }}
            className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-lg font-semibold text-lg transition-all backdrop-blur-sm border border-white/20 hover:border-white/40 transform hover:scale-105 active:scale-95"
          >
            Book a Demo
          </button>
        </div>
      </div>
      </Section>
  );
}
