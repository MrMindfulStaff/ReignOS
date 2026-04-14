'use client';

import { useState } from 'react';
import Section from '../Section';

interface Screenshot {
  id: number;
  src: string;
  alt: string;
  title: string;
  description: string;
}

export default function ScreenshotsSection() {
  const [selectedImage, setSelectedImage] = useState<Screenshot | null>(null);

  const screenshots: Screenshot[] = [
    {
      id: 1,
      src: '/dash-bak.png',
      alt: 'Dashboard Overview',
      title: 'Comprehensive Dashboard',
      description: 'Real-time analytics and insights at your fingertips',
    },
    {
      id: 2,
      src: '/mac-mok.png',
      alt: 'Desktop Application',
      title: 'Powerful Desktop Experience',
      description: 'Optimized interface for maximum productivity',
    },
    {
      id: 3,
      src: '/tab-mok.png',
      alt: 'Tablet View',
      title: 'Responsive Design',
      description: 'Seamless experience across all devices',
    },
  ];

  const openLightbox = (screenshot: Screenshot) => {
    setSelectedImage(screenshot);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeLightbox();
    }
  };

  return (
    <>
      <Section 
        className="py-24"
        background={{
          gradient: 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950',
        }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              See R.E.I.G.N. in Action
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Explore our intuitive interface designed to make bias mitigation effortless
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {screenshots.map((screenshot) => (
              <div
                key={screenshot.id}
                className="group relative overflow-hidden rounded-2xl bg-slate-900/50 border border-white/10 hover:border-purple-500/50 transition-all duration-300 cursor-pointer"
                onClick={() => openLightbox(screenshot)}
              >
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={screenshot.src}
                    alt={screenshot.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/10 backdrop-blur-sm rounded-full p-4 border border-white/20">
                      <svg
                        className="w-8 h-8 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-purple-400 transition-colors">
                    {screenshot.title}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {screenshot.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm animate-fadeIn"
          onClick={handleBackdropClick}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 z-[101] p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 transition-all duration-200 group"
            aria-label="Close lightbox"
          >
            <svg
              className="w-6 h-6 text-white group-hover:rotate-90 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <div className="max-w-7xl max-h-[90vh] mx-4 animate-scaleIn">
            <div className="relative">
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="max-w-full max-h-[80vh] rounded-lg shadow-2xl border border-white/10"
              />
              
              <div className="mt-6 text-center">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {selectedImage.title}
                </h3>
                <p className="text-gray-400">
                  {selectedImage.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }

        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </>
  );
}

