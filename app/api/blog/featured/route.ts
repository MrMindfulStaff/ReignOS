import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';

export async function GET() {
  try {
    // Try to get featured posts first, fall back to most recent
    const featured = await prisma.post.findMany({
      where: { published: true, featured: true },
      orderBy: { publishedAt: 'desc' },
      take: 3,
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        coverImage: true,
        author: true,
        publishedAt: true,
        tags: { include: { tag: { select: { name: true, slug: true, color: true } } } },
      },
    });

    const posts =
      featured.length >= 3
        ? featured
        : await prisma.post.findMany({
            where: { published: true },
            orderBy: { publishedAt: 'desc' },
            take: 3,
            select: {
              id: true,
              title: true,
              slug: true,
              excerpt: true,
              coverImage: true,
              author: true,
              publishedAt: true,
              tags: { include: { tag: { select: { name: true, slug: true, color: true } } } },
            },
          });

    return NextResponse.json(posts);
  } catch {
    return NextResponse.json([], { status: 200 }); // Fail silently on landing page
  }
}
