'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import PostEditor from './PostEditor';
import ImageUploader from './ImageUploader';
import TagSelector from './TagSelector';

interface AISuggestedImage {
  query: string;
  url: string;
  thumb: string;
  credit: string;
  creditUrl: string;
  unsplashUrl: string;
}

interface Post {
  id?: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  coverImage: string | null;
  published: boolean;
  featured: boolean;
  scheduledAt?: string | Date | null;
  publishedAt?: string | Date | null;
  metaTitle: string | null;
  metaDescription: string | null;
  tags: { tag: { id: string } }[];
}

type PublishMode = 'published' | 'scheduled' | 'draft';

interface PostFormProps {
  post?: Post;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export default function PostForm({ post }: PostFormProps) {
  const router = useRouter();
  const isEditing = !!post?.id;

  const [title, setTitle] = useState(post?.title || '');
  const [slug, setSlug] = useState(post?.slug || '');
  const [slugTouched, setSlugTouched] = useState(false);
  const [excerpt, setExcerpt] = useState(post?.excerpt || '');
  const [content, setContent] = useState(post?.content || '');
  const [coverImage, setCoverImage] = useState(post?.coverImage || '');

  // datetime-local inputs need local time (not UTC)
  const toLocalDatetimeString = (d: string | Date | null | undefined) => {
    if (!d) return '';
    const date = new Date(d);
    const offset = date.getTimezoneOffset() * 60000;
    return new Date(date.getTime() - offset).toISOString().slice(0, 16);
  };

  const existingScheduledAt = toLocalDatetimeString(post?.scheduledAt);
  const existingPublishedAt = toLocalDatetimeString(post?.publishedAt);

  const initialMode: PublishMode = post?.published
    ? 'published'
    : post?.scheduledAt
    ? 'scheduled'
    : 'draft';

  const [publishMode, setPublishMode] = useState<PublishMode>(initialMode);
  const [scheduledAt, setScheduledAt] = useState(existingScheduledAt);
  const [publishedAt, setPublishedAt] = useState(existingPublishedAt);
  const [featured, setFeatured] = useState(post?.featured || false);
  const [metaTitle, setMetaTitle] = useState(post?.metaTitle || '');
  const [metaDescription, setMetaDescription] = useState(post?.metaDescription || '');
  const [selectedTags, setSelectedTags] = useState<string[]>(
    post?.tags?.map((t) => t.tag.id) || []
  );

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  // AI image suggestions state
  const [aiLoading, setAiLoading] = useState(false);
  const [aiImages, setAiImages] = useState<AISuggestedImage[]>([]);
  const [aiQueries, setAiQueries] = useState<string[]>([]);
  const [aiError, setAiError] = useState('');
  const [showAiPanel, setShowAiPanel] = useState(false);

  // Auto-generate slug from title
  useEffect(() => {
    if (!slugTouched && !isEditing) {
      setSlug(slugify(title));
    }
  }, [title, slugTouched, isEditing]);

  const handleAISuggest = useCallback(async () => {
    setAiError('');
    setAiLoading(true);
    setShowAiPanel(true);
    setAiImages([]);
    setAiQueries([]);

    try {
      const res = await fetch('/api/admin/ai/image-suggestions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, excerpt }),
      });
      const data = await res.json();
      if (!res.ok) {
        setAiError(data.error || 'Failed to get suggestions');
      } else {
        setAiImages(data.images || []);
        setAiQueries(data.queries || []);
      }
    } catch {
      setAiError('Request failed');
    } finally {
      setAiLoading(false);
    }
  }, [title, excerpt]);

  const handleSelectAiImage = (url: string) => {
    setCoverImage(url);
    setShowAiPanel(false);
  };

  const handleSubmit = async () => {
    setError('');

    if (publishMode === 'scheduled' && !scheduledAt) {
      setError('Please choose a scheduled publish date.');
      return;
    }

    setSaving(true);

    const postData = {
      title,
      slug,
      excerpt,
      content,
      coverImage,
      published: publishMode === 'published',
      featured,
      scheduledAt: publishMode === 'scheduled' ? scheduledAt : null,
      publishedAt: publishMode === 'published' && publishedAt ? publishedAt : undefined,
      tagIds: selectedTags,
      metaTitle,
      metaDescription,
    };

    try {
      const url = isEditing ? `/api/admin/posts/${post.id}` : '/api/admin/posts';
      const method = isEditing ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to save post');
        return;
      }

      router.push('/admin/posts');
      router.refresh();
    } catch {
      setError('Failed to save post');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter post title"
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg"
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              URL Slug
            </label>
            <div className="flex items-center">
              <span className="text-gray-500 text-sm mr-2">/blog/</span>
              <input
                type="text"
                value={slug}
                onChange={(e) => {
                  setSlug(slugify(e.target.value));
                  setSlugTouched(true);
                }}
                placeholder="post-url-slug"
                className="flex-1 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Excerpt
            </label>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Brief description for previews and SEO"
              rows={3}
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Content
            </label>
            <PostEditor content={content} onChange={setContent} />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Publish Settings */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
            <h3 className="text-lg font-semibold text-white">Publish</h3>

            {/* Publish mode selector */}
            <div className="grid grid-cols-3 gap-1 p-1 bg-white/5 rounded-lg">
              {(['draft', 'scheduled', 'published'] as PublishMode[]).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setPublishMode(mode)}
                  className={`py-1.5 text-xs font-medium rounded-md transition-colors capitalize ${
                    publishMode === mode
                      ? 'bg-purple-600 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>

            {/* Scheduled date picker */}
            {publishMode === 'scheduled' && (
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">
                  Publish date &amp; time
                </label>
                <input
                  type="datetime-local"
                  value={scheduledAt}
                  onChange={(e) => setScheduledAt(e.target.value)}
                  min={new Date().toISOString().slice(0, 16)}
                  className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            )}

            {/* Published date override */}
            {publishMode === 'published' && (
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">
                  Published date &amp; time
                </label>
                <input
                  type="datetime-local"
                  value={publishedAt}
                  onChange={(e) => setPublishedAt(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">Leave blank to use now</p>
              </div>
            )}

            <div className="flex items-center justify-between">
              <span className="text-gray-300">Featured</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>

            <div className="pt-4 border-t border-white/10">
              <button
                onClick={handleSubmit}
                disabled={saving || !title.trim()}
                className="w-full py-2.5 px-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-all"
              >
                {saving
                  ? 'Saving...'
                  : isEditing
                  ? 'Update Post'
                  : publishMode === 'published'
                  ? 'Publish Now'
                  : publishMode === 'scheduled'
                  ? 'Schedule Post'
                  : 'Save Draft'}
              </button>
            </div>
          </div>

          {/* Cover Image */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Cover Image</h3>
              <button
                type="button"
                onClick={handleAISuggest}
                disabled={!title.trim() || aiLoading}
                title="Use AI to find relevant images"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-purple-600/20 hover:bg-purple-600/40 text-purple-300 hover:text-purple-200 border border-purple-500/30 rounded-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {aiLoading ? (
                  <>
                    <svg className="animate-spin w-3 h-3" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Thinking...
                  </>
                ) : (
                  <>
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    AI Suggest
                  </>
                )}
              </button>
            </div>

            <ImageUploader onUpload={setCoverImage} currentImage={coverImage} />

            {/* AI Suggestions Panel */}
            {showAiPanel && (
              <div className="space-y-3 pt-2 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-medium text-gray-400">AI Image Suggestions</p>
                  <button
                    type="button"
                    onClick={() => setShowAiPanel(false)}
                    className="text-gray-500 hover:text-white text-xs"
                  >
                    ✕
                  </button>
                </div>

                {aiError && (
                  <p className="text-xs text-red-400">{aiError}</p>
                )}

                {aiImages.length > 0 ? (
                  <div className="grid grid-cols-2 gap-2">
                    {aiImages.map((img, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => handleSelectAiImage(img.url)}
                        className="relative group rounded-lg overflow-hidden border border-white/10 hover:border-purple-500/50 transition-all"
                        title={`Photo by ${img.credit} on Unsplash`}
                      >
                        <img
                          src={img.thumb}
                          alt={img.query}
                          className="w-full h-20 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                          <span className="opacity-0 group-hover:opacity-100 text-white text-xs font-medium transition-opacity">
                            Use this
                          </span>
                        </div>
                        <p className="absolute bottom-0 left-0 right-0 px-1.5 py-0.5 bg-black/60 text-gray-300 text-[10px] truncate">
                          {img.query}
                        </p>
                      </button>
                    ))}
                  </div>
                ) : aiQueries.length > 0 && !aiLoading ? (
                  <div className="space-y-1.5">
                    <p className="text-xs text-gray-500">
                      Add <span className="font-mono text-gray-400">UNSPLASH_ACCESS_KEY</span> to enable image previews. Search manually:
                    </p>
                    {aiQueries.map((q, i) => (
                      <a
                        key={i}
                        href={`https://unsplash.com/s/photos/${encodeURIComponent(q)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs text-purple-400 hover:text-purple-300 transition-colors"
                      >
                        <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        {q}
                      </a>
                    ))}
                  </div>
                ) : aiLoading ? (
                  <div className="flex items-center gap-2 text-gray-400 text-xs py-2">
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Finding relevant images...
                  </div>
                ) : null}
              </div>
            )}
          </div>

          {/* Tags */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
            <h3 className="text-lg font-semibold text-white">Tags</h3>
            <TagSelector selectedTags={selectedTags} onChange={setSelectedTags} />
          </div>

          {/* SEO */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
            <h3 className="text-lg font-semibold text-white">SEO</h3>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Meta Title
              </label>
              <input
                type="text"
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                placeholder={title || 'Post title'}
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Meta Description
              </label>
              <textarea
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                placeholder={excerpt || 'Post description'}
                rows={3}
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm resize-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
