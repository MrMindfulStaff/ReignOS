'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import AIChat from './AIChat';

export default function FullscreenDemo() {
  const [isOpen, setIsOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const openDemo = () => {
    setIsOpen(true);
  };

  const closeDemo = () => {
    setIsOpen(false);
    setIsChatOpen(false);
  };

  const modalContent = isOpen ? (
        <div className="fixed inset-0 z-[100] animate-fade-in">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-fill"
            style={{
              backgroundImage: 'url(/dash-bak.png)',
            }}
          ></div>

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-slate-800/70 backdrop-blur-[1px]"></div>

          {/* Close Button */}
          <button
            onClick={closeDemo}
            className="absolute top-6 right-6 z-50 w-12 h-12 bg-slate-800/90 hover:bg-slate-700 backdrop-blur-md rounded-full border border-white/20 text-white transition-all hover:scale-110 flex items-center justify-center shadow-xl"
            aria-label="Close demo"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Content Container */}
          <div className="relative z-20 h-full overflow-y-auto">
            {!isChatOpen ? (
              <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center text-white">
                <div className="max-w-3xl animate-fade-up">
                  <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
                    Explore R.E.I.G.N.'s Dashboard
                  </h2>
                  <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed">
                    Click the AI assistant in the lower-right to start asking questions about 
                    promotions, skills, and team performance
                  </p>
                  <div className="inline-flex items-center gap-3 text-cyan-400 text-lg animate-pulse">
                    <span>Click the AI button</span>
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>
              </div>
            ) : (
              <div className="min-h-screen flex items-center justify-center p-6">
                <div className="max-w-6xl w-full animate-fade-up">
                  <div className="mb-6 text-center">
                    <h3 className="text-3xl font-bold text-white mb-2">AI-Powered Workforce Intelligence</h3>
                    <p className="text-lg text-gray-300">Ask anything about your team's performance, skills, or readiness</p>
                  </div>
                  <AIChat />
                </div>
              </div>
            )}
          </div>

          {/* AI FAB (Floating Action Button) */}
          {!isChatOpen && (
            <button
              onClick={() => setIsChatOpen(true)}
              className="fixed bottom-8 right-8 z-50 group"
              aria-label="Open AI Assistant"
            >
              {/* Pulse rings */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 opacity-75 animate-ping"></div>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 opacity-50 animate-pulse"></div>
              
              {/* Main button */}
              <div className="relative w-20 h-20 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 rounded-full shadow-2xl shadow-cyan-500/50 flex items-center justify-center transition-all transform hover:scale-110 active:scale-95 border-2 border-cyan-400/50">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  />
                </svg>
              </div>
              
              {/* Tooltip */}
              <div className="absolute bottom-full right-0 mb-4 px-4 py-2 bg-slate-800/90 backdrop-blur-sm text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-cyan-500/30 shadow-xl">
                Ask the AI Assistant
                <div className="absolute top-full right-8 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-800"></div>
              </div>
            </button>
          )}

          {/* Minimize chat button (when chat is open) */}
          {isChatOpen && (
            <button
              onClick={() => setIsChatOpen(false)}
              className="fixed bottom-8 right-8 z-50 w-16 h-16 bg-slate-800/90 hover:bg-slate-700 backdrop-blur-md rounded-full border-2 border-white/20 text-white transition-all hover:scale-110 flex items-center justify-center shadow-xl"
              aria-label="Minimize chat"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          )}
        </div>
  ) : null;

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={openDemo}
        className="inline-block px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white rounded-lg font-semibold text-lg transition-all transform hover:scale-105 active:scale-95 shadow-2xl shadow-cyan-500/50 ripple-effect"
      >
        Try Interactive Demo
      </button>

      {/* Portal to body for fullscreen overlay */}
      {mounted && modalContent && createPortal(modalContent, document.body)}
    </>
  );
}

