'use client';

import { ReactNode } from 'react';

export interface BackgroundConfig {
  gradient?: string;
  texture?: 'dots' | 'grid' | 'noise' | 'none';
  parallaxOrbs?: {
    positions: Array<{
      size: string;
      position: string;
      color: string;
      blur?: string;
    }>;
    opacity?: string;
  };
  image?: {
    src: string;
    overlay: string;
  };
}

interface SectionProps {
  id?: string;
  className?: string;
  background?: BackgroundConfig;
  children: ReactNode;
}

export default function Section({ id, className = '', background, children }: SectionProps) {
  const textureClasses = {
    dots: 'bg-texture-dots',
    grid: 'bg-texture-grid',
    noise: 'bg-texture-noise',
    none: '',
  };

  const textureClass = background?.texture ? textureClasses[background.texture] : '';
  const bgGradient = background?.gradient || 'bg-slate-950';

  return (
    <section
      id={id}
      className={`relative overflow-hidden ${bgGradient} ${textureClass} ${className}`}
    >
      {/* Background Image with Parallax */}
      {background?.image && (
        <div className="absolute inset-0 parallax">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${background.image.src})`,
              backgroundAttachment: 'fixed',
              transform: 'scale(1.1)',
            }}
          ></div>
          <div className={`absolute inset-0 ${background.image.overlay}`}></div>
        </div>
      )}

      {/* Parallax Orbs */}
      {background?.parallaxOrbs && (
        <div className={`absolute inset-0 overflow-hidden ${background.parallaxOrbs.opacity || 'opacity-20'}`}>
          {background.parallaxOrbs.positions.map((orb, index) => (
            <div
              key={index}
              className={`absolute ${orb.size} ${orb.position} ${orb.color} rounded-full ${orb.blur || 'blur-3xl'}`}
            ></div>
          ))}
        </div>
      )}

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </section>
  );
}

