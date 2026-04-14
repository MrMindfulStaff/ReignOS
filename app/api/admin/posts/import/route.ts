import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';
import { slugify } from '@/app/lib/auth';

export interface ImportPost {
  title: string;
  slug?: string;
  excerpt?: string;
  /** Plain text (paragraphs separated by blank lines) or TipTap JSON string */
  content?: string;
  author?: string;
  /** Array of tag slugs — tags will be created if they don't exist */
  tags?: string[];
  featured?: boolean;
  published?: boolean;
  /** ISO 8601 datetime string for scheduled publishing */
  scheduledAt?: string | null;
  metaTitle?: string;
  metaDescription?: string;
}

/** Convert plain text to a minimal TipTap doc JSON string */
function textToTipTap(text: string): string {
  const paragraphs = text.split(/\n\n+/).filter(Boolean);
  return JSON.stringify({
    type: 'doc',
    content: paragraphs.map((p) => ({
      type: 'paragraph',
      content: [{ type: 'text', text: p.trim() }],
    })),
  });
}

function parseContent(content?: string): string {
  if (!content) return JSON.stringify({ type: 'doc', content: [] });
  try {
    JSON.parse(content);
    return content; // Already valid JSON (TipTap format)
  } catch {
    return textToTipTap(content);
  }
}

/** Resolve tag slugs → tag IDs, creating missing tags */
async function resolveTagIds(tagSlugs: string[]): Promise<string[]> {
  const ids: string[] = [];
  for (const slug of tagSlugs) {
    const name = slug
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
    const tag = await prisma.tag.upsert({
      where: { slug },
      update: {},
      create: { name, slug },
    });
    ids.push(tag.id);
  }
  return ids;
}

export async function GET() {
  // Return the import template
  const template: ImportPost[] = [
    {
      title: 'How AI Is Transforming Workforce Management',
      slug: 'how-ai-is-transforming-workforce-management',
      excerpt:
        'Discover how artificial intelligence is reshaping how companies schedule, track, and develop their workforce.',
      content:
        'The workplace is changing faster than ever before.\n\nArtificial intelligence is no longer a futuristic concept — it is here, and it is transforming every aspect of how businesses manage their people.\n\nFrom intelligent scheduling to bias-free performance reviews, AI tools are helping HR teams make better decisions in less time.',
      author: 'REIGNOS Team',
      tags: ['ai', 'workforce-management', 'hr-technology'],
      featured: false,
      published: false,
      scheduledAt: null,
      metaTitle: 'How AI Is Transforming Workforce Management | REIGNOS',
      metaDescription:
        'Discover how AI is reshaping scheduling, time tracking, and performance analytics for modern workforces.',
    },
  ];

  return NextResponse.json(template, {
    headers: {
      'Content-Disposition': 'attachment; filename="blog-import-template.json"',
      'Content-Type': 'application/json',
    },
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const posts: ImportPost[] = Array.isArray(body) ? body : [body];

    if (posts.length === 0) {
      return NextResponse.json({ error: 'No posts provided' }, { status: 400 });
    }

    if (posts.length > 100) {
      return NextResponse.json(
        { error: 'Maximum 100 posts per import' },
        { status: 400 }
      );
    }

    const results = { created: 0, skipped: 0, errors: [] as { title: string; reason: string }[] };

    for (const item of posts) {
      if (!item.title || typeof item.title !== 'string') {
        results.errors.push({ title: String(item.title || '(untitled)'), reason: 'Title is required' });
        continue;
      }

      const slug = item.slug || slugify(item.title);

      const existing = await prisma.post.findUnique({ where: { slug } });
      if (existing) {
        results.skipped++;
        results.errors.push({ title: item.title, reason: `Slug "${slug}" already exists — skipped` });
        continue;
      }

      const tagIds = item.tags?.length ? await resolveTagIds(item.tags) : [];
      const scheduledDate = item.scheduledAt ? new Date(item.scheduledAt) : null;
      const isPublished = (item.published ?? false) && !scheduledDate;

      await prisma.post.create({
        data: {
          title: item.title.trim(),
          slug,
          excerpt: item.excerpt?.trim() || null,
          content: parseContent(item.content),
          author: item.author?.trim() || 'REIGNOS Team',
          coverImage: null,
          published: isPublished,
          featured: item.featured ?? false,
          publishedAt: isPublished ? new Date() : null,
          scheduledAt: scheduledDate,
          metaTitle: item.metaTitle?.trim() || null,
          metaDescription: item.metaDescription?.trim() || null,
          tags: tagIds.length
            ? {
                create: tagIds.map((tagId) => ({
                  tag: { connect: { id: tagId } },
                })),
              }
            : undefined,
        },
      });

      results.created++;
    }

    return NextResponse.json(results, { status: 200 });
  } catch (error) {
    console.error('Import failed:', error);
    return NextResponse.json({ error: 'Import failed' }, { status: 500 });
  }
}
