import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';

/**
 * POST /api/cron/publish-scheduled
 *
 * Publishes posts whose scheduledAt date has passed.
 * Protected by CRON_SECRET environment variable.
 *
 * For Vercel Cron, add to vercel.json:
 * {
 *   "crons": [{ "path": "/api/cron/publish-scheduled", "schedule": "0 * * * *" }]
 * }
 *
 * The cron job will set the Authorization header automatically on Vercel.
 * For external cron services, send: Authorization: Bearer <CRON_SECRET>
 */
export async function POST(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;

  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const now = new Date();

    const result = await prisma.post.updateMany({
      where: {
        published: false,
        scheduledAt: {
          lte: now,
          not: null,
        },
      },
      data: {
        published: true,
        publishedAt: now,
        scheduledAt: null,
      },
    });

    return NextResponse.json({ published: result.count, at: now.toISOString() });
  } catch (error) {
    console.error('Scheduled publish failed:', error);
    return NextResponse.json({ error: 'Failed to publish scheduled posts' }, { status: 500 });
  }
}

// Allow GET for easy testing in browser (still requires secret as query param)
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');

  if (!process.env.CRON_SECRET || secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return POST(request);
}
