import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic();

export async function POST(request: NextRequest) {
  try {
    const { title, excerpt } = await request.json();

    if (!title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }

    // Ask Claude to generate targeted Unsplash search queries
    const message = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 256,
      messages: [
        {
          role: 'user',
          content: `You are helping find a relevant cover image for a blog post. Generate 4 concise, specific Unsplash search queries (2-4 words each) that would return high-quality, visually compelling photos for this post.

Title: ${title}${excerpt ? `\nExcerpt: ${excerpt}` : ''}

Return ONLY a JSON array of 4 strings, no explanation. Example format:
["modern office technology", "team collaboration workspace", "digital transformation", "future of work"]`,
        },
      ],
    });

    const text = message.content[0].type === 'text' ? message.content[0].text.trim() : '[]';
    let queries: string[] = [];
    try {
      queries = JSON.parse(text);
    } catch {
      // Fallback: extract quoted strings
      queries = [...text.matchAll(/"([^"]+)"/g)].map((m) => m[1]).slice(0, 4);
    }

    // Fetch images from Unsplash if API key is configured
    const unsplashKey = process.env.UNSPLASH_ACCESS_KEY;
    if (!unsplashKey) {
      return NextResponse.json({ queries, images: [] });
    }

    // Fetch one image per query in parallel
    const imageResults = await Promise.allSettled(
      queries.map(async (query) => {
        const res = await fetch(
          `https://api.unsplash.com/photos/random?query=${encodeURIComponent(query)}&orientation=landscape&content_filter=high`,
          {
            headers: {
              Authorization: `Client-ID ${unsplashKey}`,
              'Accept-Version': 'v1',
            },
          }
        );
        if (!res.ok) {
          console.error(`Unsplash error for "${query}":`, res.status, await res.text().catch(() => ''));
          return null;
        }
        const data = await res.json();
        return {
          query,
          url: data.urls?.regular as string,
          thumb: data.urls?.small as string,
          credit: data.user?.name as string,
          creditUrl: data.user?.links?.html as string,
          unsplashUrl: data.links?.html as string,
        };
      })
    );

    const images = imageResults
      .filter((r) => r.status === 'fulfilled' && r.value)
      .map((r) => (r as PromiseFulfilledResult<NonNullable<unknown>>).value);

    return NextResponse.json({ queries, images });
  } catch (error) {
    console.error('AI image suggestion failed:', error);
    return NextResponse.json({ error: 'Failed to generate suggestions' }, { status: 500 });
  }
}
