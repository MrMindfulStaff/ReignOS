import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const title = searchParams.get('title') || 'REIGNOS';
  const author = searchParams.get('author') || '';
  const date = searchParams.get('date') || '';
  const tags = searchParams.get('tags')?.split(',').filter(Boolean) ?? [];
  const cta = searchParams.get('cta') || 'Read Article';
  const label = searchParams.get('label') ?? 'Blog';

  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 60%, #0f172a 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          padding: '64px 72px',
          fontFamily: 'sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background: dot grid (Satori-compatible: individual dots via rows) */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            display: 'flex',
            flexWrap: 'wrap',
            opacity: 0.25,
          }}
        >
          {Array.from({ length: 760 }).map((_, i) => (
            <div
              key={i}
              style={{
                width: 4,
                height: 4,
                borderRadius: 99,
                background: 'rgba(255,255,255,0.4)',
                margin: '14px',
              }}
            />
          ))}
        </div>

        {/* Decorative orb — top right */}
        <div
          style={{
            position: 'absolute',
            top: -120,
            right: -120,
            width: 560,
            height: 560,
            borderRadius: 999,
            background: 'radial-gradient(circle, rgba(124,58,237,0.22) 0%, transparent 70%)',
          }}
        />

        {/* Decorative orb — bottom left */}
        <div
          style={{
            position: 'absolute',
            bottom: -100,
            left: -80,
            width: 400,
            height: 400,
            borderRadius: 999,
            background: 'radial-gradient(circle, rgba(37,99,235,0.18) 0%, transparent 70%)',
          }}
        />

        {/* Top: brand */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 'auto', zIndex: 1 }}>
          <span style={{ color: '#e2e8f0', fontSize: 26, fontWeight: 300, letterSpacing: '0.15em' }}>
            REIGN
          </span>
          <span style={{ color: '#a78bfa', fontSize: 26, fontWeight: 600, letterSpacing: '0.15em' }}>
            OS
          </span>
          {label && (
            <span
              style={{
                marginLeft: 16,
                color: '#475569',
                fontSize: 18,
                fontWeight: 400,
                paddingLeft: 16,
                borderLeft: '1px solid #334155',
              }}
            >
              {label}
            </span>
          )}
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div style={{ display: 'flex', gap: 10, marginBottom: 20, zIndex: 1 }}>
            {tags.slice(0, 3).map((tag) => (
              <div
                key={tag}
                style={{
                  background: 'rgba(139, 92, 246, 0.2)',
                  border: '1px solid rgba(139, 92, 246, 0.4)',
                  color: '#c4b5fd',
                  padding: '5px 14px',
                  borderRadius: 99,
                  fontSize: 15,
                  fontWeight: 500,
                }}
              >
                {tag}
              </div>
            ))}
          </div>
        )}

        {/* Title */}
        <div
          style={{
            color: '#f1f5f9',
            fontSize: title.length > 60 ? 44 : 56,
            fontWeight: 700,
            lineHeight: 1.2,
            marginBottom: 40,
            maxWidth: '90%',
            zIndex: 1,
          }}
        >
          {title}
        </div>

        {/* Bottom: author + date (left) | CTA (right) */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            {author && (
              <>
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 99,
                    background: 'linear-gradient(135deg, #7c3aed, #2563eb)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: 20,
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  {author.charAt(0).toUpperCase()}
                </div>
                <span style={{ color: '#94a3b8', fontSize: 20, fontWeight: 500 }}>{author}</span>
              </>
            )}
            {date && (
              <>
                {author && <span style={{ color: '#475569', fontSize: 20 }}>·</span>}
                <span style={{ color: '#64748b', fontSize: 20 }}>{date}</span>
              </>
            )}
          </div>

          {/* CTA */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              background: 'linear-gradient(135deg, #7c3aed, #2563eb)',
              color: 'white',
              fontSize: 18,
              fontWeight: 600,
              padding: '14px 28px',
              borderRadius: 99,
              letterSpacing: '0.02em',
            }}
          >
            {cta}
            <span style={{ fontSize: 20 }}>→</span>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
