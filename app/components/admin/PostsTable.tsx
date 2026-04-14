'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Post {
  id: string;
  title: string;
  slug: string;
  published: boolean;
  featured: boolean;
  coverImage: string | null;
  scheduledAt: Date | null;
  createdAt: Date;
  publishedAt: Date | null;
  tags: { tag: { id: string; name: string; color: string } }[];
}

interface PostsTableProps {
  initialPosts: Post[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

function postStatus(post: Post): 'published' | 'scheduled' | 'draft' {
  if (post.published) return 'published';
  if (post.scheduledAt) return 'scheduled';
  return 'draft';
}

export default function PostsTable({ initialPosts, pagination }: PostsTableProps) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [deleting, setDeleting] = useState<string | null>(null);
  const router = useRouter();

  const handleDelete = async (post: Post) => {
    if (!confirm(`Delete "${post.title}"? This action cannot be undone.`)) {
      return;
    }

    setDeleting(post.id);

    try {
      const response = await fetch(`/api/admin/posts/${post.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setPosts(posts.filter((p) => p.id !== post.id));
        router.refresh();
      }
    } catch (error) {
      console.error('Failed to delete post:', error);
    } finally {
      setDeleting(null);
    }
  };

  if (posts.length === 0) {
    return (
      <div className="bg-white/5 border border-white/10 rounded-xl p-12 text-center">
        <div className="mx-auto w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">No posts yet</h3>
        <p className="text-gray-400 mb-6">Create your first blog post to get started</p>
        <Link
          href="/admin/posts/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Create Post
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">Title</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">Tags</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">Status</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">Date</th>
              <th className="text-right px-6 py-4 text-sm font-medium text-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {posts.map((post) => {
              const status = postStatus(post);
              return (
                <tr key={post.id} className="hover:bg-white/5">
                  <td className="px-6 py-4">
                    <div className="flex items-start gap-2">
                      {/* Cover image indicator */}
                      {post.coverImage ? (
                        <div
                          className="mt-0.5 w-5 h-5 rounded shrink-0 bg-cover bg-center border border-white/10"
                          style={{ backgroundImage: `url(${post.coverImage})` }}
                          title="Has cover image"
                        />
                      ) : (
                        <div
                          className="mt-0.5 w-5 h-5 rounded shrink-0 border border-white/10 bg-white/5 flex items-center justify-center"
                          title="No cover image"
                        >
                          <svg className="w-3 h-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                      <div>
                        <Link
                          href={`/admin/posts/${post.id}/edit`}
                          className="text-white font-medium hover:text-purple-400 transition-colors"
                        >
                          {post.title}
                        </Link>
                        <p className="text-sm text-gray-500 mt-0.5">/blog/{post.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {post.tags.slice(0, 3).map(({ tag }) => (
                        <span
                          key={tag.id}
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs"
                          style={{ backgroundColor: tag.color + '30', color: tag.color }}
                        >
                          {tag.name}
                        </span>
                      ))}
                      {post.tags.length > 3 && (
                        <span className="text-xs text-gray-500">+{post.tags.length - 3}</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                          status === 'published'
                            ? 'bg-green-500/20 text-green-400'
                            : status === 'scheduled'
                            ? 'bg-blue-500/20 text-blue-400'
                            : 'bg-yellow-500/20 text-yellow-400'
                        }`}
                      >
                        {status === 'published' ? 'Published' : status === 'scheduled' ? 'Scheduled' : 'Draft'}
                      </span>
                      {post.featured && (
                        <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-400">
                          Featured
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-400">
                    {status === 'scheduled' && post.scheduledAt
                      ? new Date(post.scheduledAt).toLocaleDateString()
                      : new Date(post.publishedAt || post.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      {post.published && (
                        <Link
                          href={`/blog/${post.slug}`}
                          target="_blank"
                          className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                          title="View"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </Link>
                      )}
                      <Link
                        href={`/admin/posts/${post.id}/edit`}
                        className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </Link>
                      <button
                        onClick={() => handleDelete(post)}
                        disabled={deleting === post.id}
                        className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors disabled:opacity-50"
                        title="Delete"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-400">
            Showing {(pagination.page - 1) * pagination.limit + 1} to{' '}
            {Math.min(pagination.page * pagination.limit, pagination.total)} of{' '}
            {pagination.total} posts
          </p>
          <div className="flex gap-2">
            <Link
              href={`/admin/posts?page=${pagination.page - 1}`}
              className={`px-3 py-1.5 rounded-lg text-sm ${
                pagination.page <= 1
                  ? 'bg-white/5 text-gray-500 pointer-events-none'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              Previous
            </Link>
            <Link
              href={`/admin/posts?page=${pagination.page + 1}`}
              className={`px-3 py-1.5 rounded-lg text-sm ${
                pagination.page >= pagination.totalPages
                  ? 'bg-white/5 text-gray-500 pointer-events-none'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              Next
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
