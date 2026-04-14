import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import prisma from '@/app/lib/prisma';
import BlogContent from '@/app/components/blog/BlogContent';
import TagBadge from '@/app/components/blog/TagBadge';
import BlogCard from '@/app/components/blog/BlogCard';

interface Props {
  params: Promise<{ slug: string }>;
}

async function getPost(slug: string) {
  const post = await prisma.post.findUnique({
    where: { slug, published: true },
    include: {
      tags: {
        include: { tag: true },
      },
    },
  });

  return post;
}

async function getRelatedPosts(postId: string, tagIds: string[]) {
  if (tagIds.length === 0) return [];

  return prisma.post.findMany({
    where: {
      published: true,
      id: { not: postId },
      tags: {
        some: {
          tagId: { in: tagIds },
        },
      },
    },
    take: 3,
    orderBy: { publishedAt: 'desc' },
    include: {
      tags: {
        include: { tag: true },
      },
    },
  });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return {
      title: 'Post Not Found | REIGNOS',
    };
  }

  const postUrl = `https://www.reignos.com/blog/${post.slug}`;
  const description = post.metaDescription || post.excerpt || undefined;
  const title = post.metaTitle || post.title;
  const publishDate = post.publishedAt || post.createdAt;
  const tagNames = post.tags.map(({ tag }) => tag.name);

  const formattedDate = publishDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const ogImageUrl = new URL('https://www.reignos.com/api/og');
  ogImageUrl.searchParams.set('title', title);
  ogImageUrl.searchParams.set('author', post.author);
  ogImageUrl.searchParams.set('date', formattedDate);
  ogImageUrl.searchParams.set('cta', 'Read Article');
  if (tagNames.length > 0) ogImageUrl.searchParams.set('tags', tagNames.join(','));

  const ogImage = { url: ogImageUrl.toString(), width: 1200, height: 630, alt: post.title };

  return {
    title,
    description,
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      type: 'article',
      url: postUrl,
      siteName: 'REIGNOS',
      title,
      description,
      images: [ogImage],
      publishedTime: publishDate.toISOString(),
      modifiedTime: post.updatedAt.toISOString(),
      authors: [post.author],
      tags: tagNames,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl.toString()],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  const tagIds = post.tags.map((t) => t.tagId);
  const relatedPosts = await getRelatedPosts(post.id, tagIds);

  const publishDate = post.publishedAt || post.createdAt;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt || post.metaDescription || undefined,
    image: post.coverImage || 'https://www.reignos.com/og-image.png',
    datePublished: publishDate.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'REIGNOS',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.reignos.com/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.reignos.com/blog/${post.slug}`,
    },
    keywords: post.tags.map(({ tag }) => tag.name).join(', '),
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Header */}
      <header className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <img src="/logo.png" alt="REIGNOS" className="h-10 w-auto transition-transform duration-300 group-hover:scale-110" />
              <span className="text-xl font-light text-white tracking-wide transition-all duration-300">
                REIGN<span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent font-medium transition-all duration-300 group-hover:from-purple-300 group-hover:to-blue-300">OS</span>
              </span>
            </Link>
            <nav className="flex items-center gap-6">
              <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                Home
              </Link>
              <Link href="/blog" className="text-purple-400 font-medium">
                Blog
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Article */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Blog
        </Link>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {post.tags.map(({ tag }) => (
            <TagBadge key={tag.id} {...tag} />
          ))}
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
          {post.title}
        </h1>

        {/* Meta */}
        <div className="flex items-center gap-4 text-gray-400 mb-8 pb-8 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold">
              {post.author.charAt(0)}
            </div>
            <div>
              <p className="text-white font-medium">{post.author}</p>
              <time className="text-sm" dateTime={publishDate.toISOString()}>
                {new Date(publishDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            </div>
          </div>
        </div>

        {/* Cover Image */}
        {post.coverImage && (
          <div className="mb-10 rounded-2xl overflow-hidden">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-auto"
            />
          </div>
        )}

        {/* Content */}
        <div className="prose prose-lg prose-invert prose-purple max-w-none">
          <BlogContent content={post.content} />
        </div>

        {/* Share */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <span className="text-gray-400">Share this post:</span>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://www.reignos.com/blog/${post.slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://www.reignos.com/blog/${post.slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
            <Link
              href="/blog"
              className="text-purple-400 hover:text-purple-300 transition-colors"
            >
              View all posts &rarr;
            </Link>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-white/10">
          <h2 className="text-2xl font-bold text-white mb-8">Related Posts</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {relatedPosts.map((relatedPost) => (
              <BlogCard key={relatedPost.id} post={relatedPost} />
            ))}
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="border-t border-white/10 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="REIGNOS" className="h-8 w-auto" />
              <span className="text-gray-400">&copy; {new Date().getFullYear()} REIGN<span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">OS</span>. All rights reserved.</span>
            </div>
            <div className="flex gap-6">
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors text-sm">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors text-sm">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
