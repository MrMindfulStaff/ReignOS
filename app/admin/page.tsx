import Link from 'next/link';
import prisma from '@/app/lib/prisma';
import DashboardStats from '@/app/components/admin/DashboardStats';

export const dynamic = 'force-dynamic';

async function getStats() {
  const [totalPosts, publishedPosts, draftPosts, totalTags] = await Promise.all([
    prisma.post.count(),
    prisma.post.count({ where: { published: true } }),
    prisma.post.count({ where: { published: false } }),
    prisma.tag.count(),
  ]);

  return { totalPosts, publishedPosts, draftPosts, totalTags };
}

async function getRecentPosts() {
  return prisma.post.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
    include: {
      tags: {
        include: { tag: true },
      },
    },
  });
}

export default async function AdminDashboard() {
  const stats = await getStats();
  const recentPosts = await getRecentPosts();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-400 mt-1">Welcome to your blog admin dashboard</p>
      </div>

      <DashboardStats {...stats} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">Recent Posts</h2>
            <Link
              href="/admin/posts"
              className="text-purple-400 hover:text-purple-300 text-sm"
            >
              View all &rarr;
            </Link>
          </div>

          {recentPosts.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-400 mb-4">No posts yet</p>
              <Link
                href="/admin/posts/new"
                className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Create your first post
              </Link>
            </div>
          ) : (
            <ul className="space-y-3">
              {recentPosts.map((post) => (
                <li key={post.id}>
                  <Link
                    href={`/admin/posts/${post.id}/edit`}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors group"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-medium truncate group-hover:text-purple-400 transition-colors">
                        {post.title}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full ${
                            post.published
                              ? 'bg-green-500/20 text-green-400'
                              : 'bg-yellow-500/20 text-yellow-400'
                          }`}
                        >
                          {post.published ? 'Published' : 'Draft'}
                        </span>
                        <span className="text-xs text-gray-500">
                          {new Date(post.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <svg
                      className="w-5 h-5 text-gray-500 group-hover:text-purple-400 transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Link
              href="/admin/posts/new"
              className="flex items-center gap-3 p-4 rounded-lg bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/20 hover:border-purple-500/40 transition-all group"
            >
              <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <div>
                <p className="text-white font-medium group-hover:text-purple-400 transition-colors">
                  Create New Post
                </p>
                <p className="text-sm text-gray-400">Write and publish a new blog post</p>
              </div>
            </Link>

            <Link
              href="/admin/tags"
              className="flex items-center gap-3 p-4 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 transition-all group"
            >
              <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
              </div>
              <div>
                <p className="text-white font-medium group-hover:text-blue-400 transition-colors">
                  Manage Tags
                </p>
                <p className="text-sm text-gray-400">Create and organize content tags</p>
              </div>
            </Link>

            <Link
              href="/blog"
              target="_blank"
              className="flex items-center gap-3 p-4 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 transition-all group"
            >
              <div className="p-2 rounded-lg bg-green-500/20 text-green-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </div>
              <div>
                <p className="text-white font-medium group-hover:text-green-400 transition-colors">
                  View Blog
                </p>
                <p className="text-sm text-gray-400">See your public blog page</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
