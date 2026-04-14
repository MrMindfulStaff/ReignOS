import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';
import { slugify } from '@/app/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status'); // 'published', 'scheduled', 'draft', or null for all
    const search = searchParams.get('search');

    const where: Record<string, unknown> = {};

    if (status === 'published') {
      where.published = true;
    } else if (status === 'scheduled') {
      where.published = false;
      where.scheduledAt = { not: null };
    } else if (status === 'draft') {
      where.published = false;
      where.scheduledAt = null;
    }

    if (search) {
      where.OR = [
        { title: { contains: search } },
        { excerpt: { contains: search } },
      ];
    }

    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          tags: {
            include: { tag: true },
          },
        },
      }),
      prisma.post.count({ where }),
    ]);

    return NextResponse.json({
      posts,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Failed to fetch posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      title,
      slug: customSlug,
      excerpt,
      content,
      coverImage,
      published,
      featured,
      scheduledAt,
      publishedAt: customPublishedAt,
      tagIds,
      metaTitle,
      metaDescription,
      author,
    } = body;

    if (!title || typeof title !== 'string') {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      );
    }

    const slug = customSlug || slugify(title);

    // Check if slug exists
    const existingPost = await prisma.post.findUnique({ where: { slug } });
    if (existingPost) {
      return NextResponse.json(
        { error: 'A post with this slug already exists' },
        { status: 400 }
      );
    }

    const scheduledDate = scheduledAt ? new Date(scheduledAt) : null;
    // A scheduled post is not yet published
    const isPublished = published && !scheduledDate;

    const post = await prisma.post.create({
      data: {
        title: title.trim(),
        slug,
        excerpt: excerpt?.trim() || null,
        content: content || '',
        coverImage: coverImage || null,
        published: isPublished,
        featured: featured || false,
        publishedAt: isPublished ? (customPublishedAt ? new Date(customPublishedAt) : new Date()) : null,
        scheduledAt: scheduledDate,
        author: author?.trim() || 'Admin',
        metaTitle: metaTitle?.trim() || null,
        metaDescription: metaDescription?.trim() || null,
        tags: tagIds?.length
          ? {
              create: tagIds.map((tagId: string) => ({
                tag: { connect: { id: tagId } },
              })),
            }
          : undefined,
      },
      include: {
        tags: {
          include: { tag: true },
        },
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error('Failed to create post:', error);
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    );
  }
}
