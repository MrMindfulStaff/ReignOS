import Link from 'next/link';
import TagBadge from './TagBadge';

interface BlogCardProps {
  post: {
    id: string;
    title: string;
    slug: string;
    excerpt: string | null;
    coverImage: string | null;
    publishedAt: Date | null;
    createdAt: Date;
    tags: { tag: { id: string; name: string; slug: string; color: string } }[];
  };
  featured?: boolean;
}

export default function BlogCard({ post, featured = false }: BlogCardProps) {
  const date = post.publishedAt || post.createdAt;

  if (featured) {
    return (
      <Link
        href={`/blog/${post.slug}`}
        className="group block bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all"
      >
        <div className="grid md:grid-cols-2 gap-6">
          {post.coverImage && (
            <div className="relative h-64 md:h-full">
              <img
                src={post.coverImage}
                alt={post.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/50 to-transparent" />
            </div>
          )}
          <div className="p-8 flex flex-col justify-center">
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.slice(0, 3).map(({ tag }) => (
                <TagBadge key={tag.id} {...tag} clickable={false} />
              ))}
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white group-hover:text-purple-400 transition-colors mb-3">
              {post.title}
            </h2>
            {post.excerpt && (
              <p className="text-gray-400 line-clamp-3 mb-4">{post.excerpt}</p>
            )}
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <time dateTime={date.toISOString()}>
                {new Date(date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-purple-500/50 transition-all"
    >
      {post.coverImage && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-3">
          {post.tags.slice(0, 2).map(({ tag }) => (
            <TagBadge key={tag.id} {...tag} clickable={false} />
          ))}
        </div>
        <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors mb-2 line-clamp-2">
          {post.title}
        </h3>
        {post.excerpt && (
          <p className="text-gray-400 text-sm line-clamp-2 mb-4">{post.excerpt}</p>
        )}
        <time className="text-sm text-gray-500" dateTime={date.toISOString()}>
          {new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </time>
      </div>
    </Link>
  );
}
