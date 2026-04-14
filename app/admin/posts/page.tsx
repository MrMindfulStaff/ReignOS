import Link from 'next/link';
import prisma from '@/app/lib/prisma';
import PostsTable from '@/app/components/admin/PostsTable';

interface Props {
  searchParams: Promise<{ page?: string; status?: string; search?: string }>;
}

async function getPosts(searchParams: { page?: string; status?: string; search?: string }) {
  const page = parseInt(searchParams.page || '1');
  const limit = 10;
  const status = searchParams.status;
  const search = searchParams.search;

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

  return {
    posts,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}

const tabs = [
  { label: 'All', status: undefined },
  { label: 'Published', status: 'published' },
  { label: 'Scheduled', status: 'scheduled' },
  { label: 'Drafts', status: 'draft' },
];

export default async function PostsPage({ searchParams }: Props) {
  const resolvedParams = await searchParams;
  const { posts, pagination } = await getPosts(resolvedParams);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Posts</h1>
          <p className="text-gray-400 mt-1">Manage your blog posts</p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/admin/posts/import"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            Import
          </Link>
          <Link
            href="/admin/posts/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium rounded-lg transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Post
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        {tabs.map(({ label, status }) => (
          <Link
            key={label}
            href={status ? `/admin/posts?status=${status}` : '/admin/posts'}
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${
              resolvedParams.status === status
                ? 'bg-purple-600 text-white'
                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
            }`}
          >
            {label}
          </Link>
        ))}
      </div>

      <PostsTable initialPosts={posts} pagination={pagination} />
    </div>
  );
}
