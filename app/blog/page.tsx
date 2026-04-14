import { Metadata } from 'next';
import Link from 'next/link';
import prisma from '@/app/lib/prisma';
import BlogCard from '@/app/components/blog/BlogCard';

export const metadata: Metadata = {
  title: 'Blog | REIGNOS',
  description: 'Insights and updates from the REIGNOS team on workforce management, AI, and more.',
  alternates: {
    canonical: 'https://www.reignos.com/blog',
  },
  openGraph: {
    type: 'website',
    url: 'https://www.reignos.com/blog',
    siteName: 'REIGNOS',
    title: 'Blog | REIGNOS',
    description: 'Insights and updates from the REIGNOS team on workforce management, AI, and more.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | REIGNOS',
    description: 'Insights and updates from the REIGNOS team on workforce management, AI, and more.',
  },
};

interface Props {
  searchParams: Promise<{ page?: string; tag?: string }>;
}

async function getPosts(searchParams: { page?: string; tag?: string }) {
  const page = parseInt(searchParams.page || '1');
  const limit = 9;
  const tagSlug = searchParams.tag;

  const where: Record<string, unknown> = {
    published: true,
  };

  if (tagSlug) {
    where.tags = {
      some: {
        tag: {
          slug: tagSlug,
        },
      },
    };
  }

  const [posts, total, featuredPost] = await Promise.all([
    prisma.post.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { publishedAt: 'desc' },
      include: {
        tags: {
          include: { tag: true },
        },
      },
    }),
    prisma.post.count({ where }),
    page === 1
      ? prisma.post.findFirst({
          where: { ...where, featured: true },
          orderBy: { publishedAt: 'desc' },
          include: {
            tags: {
              include: { tag: true },
            },
          },
        })
      : null,
  ]);

  // If no featured post, get the latest one for the hero
  const heroPost =
    featuredPost ||
    (page === 1
      ? await prisma.post.findFirst({
          where,
          orderBy: { publishedAt: 'desc' },
          include: {
            tags: {
              include: { tag: true },
            },
          },
        })
      : null);

  // Filter out hero post from regular posts on page 1
  const displayPosts =
    page === 1 && heroPost
      ? posts.filter((p) => p.id !== heroPost.id)
      : posts;

  return {
    posts: displayPosts,
    heroPost: page === 1 ? heroPost : null,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}

async function getTags() {
  return prisma.tag.findMany({
    where: {
      posts: {
        some: {
          post: {
            published: true,
          },
        },
      },
    },
    orderBy: { name: 'asc' },
  });
}

export default async function BlogPage({ searchParams }: Props) {
  const resolvedParams = await searchParams;
  const [{ posts, heroPost, pagination }, tags] = await Promise.all([
    getPosts(resolvedParams),
    getTags(),
  ]);

  const activeTag = resolvedParams.tag;

  return (
    <div className="min-h-screen bg-slate-950">
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

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our Blog
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Insights and updates on workforce management, AI innovation, and the future of work.
          </p>
        </div>

        {/* Tags Filter */}
        {tags.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            <Link
              href="/blog"
              className={`px-4 py-2 rounded-full text-sm transition-colors ${
                !activeTag
                  ? 'bg-purple-600 text-white'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              All
            </Link>
            {tags.map((tag) => (
              <Link
                key={tag.id}
                href={`/blog?tag=${tag.slug}`}
                className={`px-4 py-2 rounded-full text-sm transition-colors ${
                  activeTag === tag.slug
                    ? 'bg-purple-600 text-white'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                {tag.name}
              </Link>
            ))}
          </div>
        )}

        {/* Featured/Hero Post */}
        {heroPost && (
          <div className="mb-12">
            <BlogCard post={heroPost} featured />
          </div>
        )}

        {/* Posts Grid */}
        {posts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {posts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        ) : !heroPost ? (
          <div className="text-center py-20">
            <div className="mx-auto w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No posts yet</h3>
            <p className="text-gray-400">Check back soon for new content!</p>
          </div>
        ) : null}

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="flex items-center justify-center gap-4">
            <Link
              href={`/blog?page=${pagination.page - 1}${activeTag ? `&tag=${activeTag}` : ''}`}
              className={`px-4 py-2 rounded-lg text-sm ${
                pagination.page <= 1
                  ? 'bg-white/5 text-gray-500 pointer-events-none'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              Previous
            </Link>
            <span className="text-gray-400">
              Page {pagination.page} of {pagination.totalPages}
            </span>
            <Link
              href={`/blog?page=${pagination.page + 1}${activeTag ? `&tag=${activeTag}` : ''}`}
              className={`px-4 py-2 rounded-lg text-sm ${
                pagination.page >= pagination.totalPages
                  ? 'bg-white/5 text-gray-500 pointer-events-none'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              Next
            </Link>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 mt-20">
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
