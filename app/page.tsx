'use client';

import {
  StatsSection,
  FeaturesSection,
  AIShowcaseSection,
  AILogosSection,
  JourneySection,
  TestimonialsSection,
  BlogPreviewSection,
  FooterSection,
} from './components/sections';
import HeroSection from './components/sections/HeroSection';
import { ModalProvider, useModal } from './contexts/ModalContext';
import { DemoModal, SignupModal } from './components/modals';

function Navigation() {
  const { openModal } = useModal();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <a href="#" className="group">
            <img
              src="/1x/Asset 1.png"
              alt="REIGNOS"
              className="h-10 w-auto transition-transform duration-300 group-hover:scale-105"
            />
          </a>
          <div className="hidden md:flex items-center gap-8">
            <a href="#" className="text-gray-300 hover:text-white transition">
              Home
            </a>
            <a href="#features" className="text-gray-300 hover:text-white transition">
              Features
            </a>
            <a href="#ai-showcase" className="text-gray-300 hover:text-white transition">
              Try Now
            </a>
            <a href="/blog" className="text-gray-300 hover:text-white transition">
              Blog
            </a>
            <button
              onClick={() => openModal('demo')}
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg font-semibold transition-all"
            >
              Book A Demo!
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

function FloatingCTA() {
  const { openModal } = useModal();

  return (
    <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-40 md:hidden">
      <button
        onClick={() => openModal('demo')}
        className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full font-semibold shadow-lg shadow-purple-500/50 animate-bounce-slow"
      >
        Book A Demo
      </button>
    </div>
  );
}

function CTASection({ type }: { type: 'demo' | 'signup' }) {
  const { openModal } = useModal();

  if (type === 'demo') {
    return (
      <section className="py-24 bg-gradient-to-br from-slate-900 via-purple-950/50 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-3xl translate-x-1/4 -translate-y-1/4 opacity-30" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/20 rounded-full blur-3xl -translate-x-1/4 translate-y-1/4 opacity-30" />
        </div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Ready to Transform Your <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Workforce Intelligence</span>?
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            See how REIGNOS turns every time-punch into actionable intelligence that protects your profits.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => openModal('demo')}
              className="px-10 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white rounded-xl font-semibold text-lg transition-all transform hover:scale-105 shadow-xl shadow-purple-500/30"
            >
              Book Your Demo
            </button>
            <button
              onClick={() => openModal('signup')}
              className="px-10 py-4 bg-white/10 hover:bg-white/20 text-white rounded-xl font-semibold text-lg transition-all border border-white/20 hover:border-white/40"
            >
              Get Early Access
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-gradient-to-br from-purple-950 via-slate-900 to-blue-950 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
          Join the Early Access Program
        </h2>
        <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
          Be among the first to shape the future of unbiased workforce intelligence.
        </p>
        <button
          onClick={() => openModal('signup')}
          className="px-10 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white rounded-xl font-semibold text-lg transition-all transform hover:scale-105 shadow-xl shadow-purple-500/30"
        >
          Get Early Access
        </button>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <ModalProvider>
      <main className="min-h-screen">
        <Navigation />
        <HeroSection />
        <StatsSection />
        <FeaturesSection />
        <AIShowcaseSection />
        <AILogosSection />
        <JourneySection />
        <TestimonialsSection />
        <BlogPreviewSection />
        <CTASection type="signup" />
        <CTASection type="demo" />
        <FooterSection />
        <FloatingCTA />
        <DemoModal />
        <SignupModal />
      </main>
    </ModalProvider>
  );
}
