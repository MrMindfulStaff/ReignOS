'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Tag {
  name: string;
  slug: string;
  color: string;
}

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  coverImage: string | null;
  author: string;
  publishedAt: string | null;
  tags: { tag: Tag }[];
}

function PostCard({ post, index }: { post: Post; index: number }) {
  const date = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : null;

  const gradients = [
    'from-purple-900/60 to-blue-900/60',
    'from-blue-900/60 to-indigo-900/60',
    'from-indigo-900/60 to-purple-900/60',
  ];

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-purple-500/40 hover:bg-white/8 transition-all duration-300 hover:-translate-y-1"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Cover image / placeholder */}
      <div className={`h-48 bg-gradient-to-br ${gradients[index % gradients.length]} relative overflow-hidden`}>
        {post.coverImage ? (
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="w-12 h-12 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
          </div>
        )}
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6 gap-3">
        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.slice(0, 2).map(({ tag }) => (
              <span
                key={tag.slug}
                className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-500/20 text-purple-300 border border-purple-500/30"
              >
                {tag.name}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h3 className="text-lg font-semibold text-white leading-snug group-hover:text-purple-300 transition-colors line-clamp-2">
          {post.title}
        </h3>

        {/* Excerpt */}
        {post.excerpt && (
          <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 flex-1">
            {post.excerpt}
          </p>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/5">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
              {post.author.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-xs text-white font-medium">{post.author}</p>
              {date && <p className="text-xs text-gray-500">{date}</p>}
            </div>
          </div>
          <span className="text-purple-400 text-xs font-medium group-hover:text-purple-300 transition-colors">
            Read →
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function BlogPreviewSection() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch('/api/blog/featured')
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setPosts(data);
      })
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, []);

  // Don't render the section if there are no posts
  if (loaded && posts.length === 0) return null;

  return (
    <section className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="flex items-end justify-between mb-12 gap-4">
          <div>
            <p className="text-purple-400 text-sm font-semibold tracking-widest uppercase mb-2">
              Latest Insights
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              From the{' '}
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Blog
              </span>
            </h2>
          </div>
          <Link
            href="/blog"
            className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white text-sm font-medium rounded-full transition-all border border-white/10 hover:border-white/20"
          >
            View All Posts
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* Cards */}
        {!loaded ? (
          // Skeleton loader
          <div className="grid md:grid-cols-3 gap-8">
            {[0, 1, 2].map((i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden animate-pulse">
                <div className="h-48 bg-white/5" />
                <div className="p-6 space-y-3">
                  <div className="h-3 bg-white/5 rounded-full w-1/3" />
                  <div className="h-5 bg-white/5 rounded-full w-3/4" />
                  <div className="h-3 bg-white/5 rounded-full" />
                  <div className="h-3 bg-white/5 rounded-full w-4/5" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {posts.map((post, i) => (
              <PostCard key={post.id} post={post} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
