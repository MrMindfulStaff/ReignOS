import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';
import { slugify } from '@/app/lib/auth';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        tags: {
          include: { tag: true },
        },
      },
    });

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error('Failed to fetch post:', error);
    return NextResponse.json(
      { error: 'Failed to fetch post' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
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
    } = body;

    if (!title || typeof title !== 'string') {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      );
    }

    const slug = customSlug || slugify(title);

    // Check if slug exists on another post
    const existingPost = await prisma.post.findFirst({
      where: {
        slug,
        id: { not: id },
      },
    });

    if (existingPost) {
      return NextResponse.json(
        { error: 'A post with this slug already exists' },
        { status: 400 }
      );
    }

    const scheduledDate = scheduledAt ? new Date(scheduledAt) : null;
    const isPublished = published && !scheduledDate;

    // Get current post to check published status change
    const currentPost = await prisma.post.findUnique({ where: { id } });
    const isNewlyPublished = isPublished && !currentPost?.published;

    // Delete existing tag connections
    await prisma.postTag.deleteMany({ where: { postId: id } });

    const post = await prisma.post.update({
      where: { id },
      data: {
        title: title.trim(),
        slug,
        excerpt: excerpt?.trim() || null,
        content: content || '',
        coverImage: coverImage || null,
        published: isPublished,
        featured: featured || false,
        publishedAt: isNewlyPublished
          ? (customPublishedAt ? new Date(customPublishedAt) : new Date())
          : isPublished
          ? (customPublishedAt ? new Date(customPublishedAt) : currentPost?.publishedAt)
          : null,
        scheduledAt: scheduledDate,
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

    return NextResponse.json(post);
  } catch (error) {
    console.error('Failed to update post:', error);
    return NextResponse.json(
      { error: 'Failed to update post' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.post.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete post:', error);
    return NextResponse.json(
      { error: 'Failed to delete post' },
      { status: 500 }
    );
  }
}
