'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';

interface ImportResult {
  created: number;
  skipped: number;
  errors: { title: string; reason: string }[];
}

export default function ImportPostsPage() {
  const [json, setJson] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ImportResult | null>(null);
  const [error, setError] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setJson(ev.target?.result as string);
    reader.readAsText(file);
  };

  const handleImport = async () => {
    setError('');
    setResult(null);

    let parsed: unknown;
    try {
      parsed = JSON.parse(json);
    } catch {
      setError('Invalid JSON — please check the format and try again.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/admin/posts/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Import failed');
      } else {
        setResult(data);
        setJson('');
        if (fileRef.current) fileRef.current.value = '';
      }
    } catch {
      setError('Network error — import failed');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadTemplate = async () => {
    const res = await fetch('/api/admin/posts/import');
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'blog-import-template.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8 max-w-3xl">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/admin/posts"
          className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-white">Bulk Import Posts</h1>
          <p className="text-gray-400 mt-1">Import multiple blog posts from a JSON file</p>
        </div>
      </div>

      {/* Template download */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-white mb-1">Data Template</h2>
            <p className="text-gray-400 text-sm">
              Download the template to see the required JSON structure. Each post supports
              plain text content (paragraphs separated by blank lines) or TipTap JSON.
              Tag slugs are created automatically if they don&apos;t exist.
            </p>
          </div>
          <button
            onClick={handleDownloadTemplate}
            className="shrink-0 inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-medium rounded-lg transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download Template
          </button>
        </div>

        {/* Field reference */}
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b border-white/10">
                <th className="pb-2 pr-4 text-gray-400 font-medium">Field</th>
                <th className="pb-2 pr-4 text-gray-400 font-medium">Required</th>
                <th className="pb-2 text-gray-400 font-medium">Notes</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              {[
                ['title', '✓', 'Post title'],
                ['slug', '', 'Auto-generated from title if omitted'],
                ['excerpt', '', 'Short description for previews and SEO'],
                ['content', '', 'Plain text or TipTap JSON string'],
                ['author', '', 'Defaults to "REIGNOS Team"'],
                ['tags', '', 'Array of tag slugs, e.g. ["ai", "hr-tech"]'],
                ['featured', '', 'Boolean, defaults to false'],
                ['published', '', 'Boolean, defaults to false (draft)'],
                ['scheduledAt', '', 'ISO 8601 datetime, e.g. "2026-04-01T09:00:00Z"'],
                ['metaTitle', '', 'SEO title override'],
                ['metaDescription', '', 'SEO description override'],
              ].map(([field, req, notes]) => (
                <tr key={field} className="border-b border-white/5">
                  <td className="py-2 pr-4 font-mono text-purple-300 text-xs">{field}</td>
                  <td className="py-2 pr-4 text-center">{req}</td>
                  <td className="py-2 text-gray-400 text-xs">{notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Import area */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
        <h2 className="text-lg font-semibold text-white">Import Posts</h2>

        {/* File upload */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Upload JSON file
          </label>
          <input
            ref={fileRef}
            type="file"
            accept=".json,application/json"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-purple-600 file:text-white hover:file:bg-purple-700 file:cursor-pointer cursor-pointer"
          />
        </div>

        <div className="flex items-center gap-3 text-gray-500 text-sm">
          <div className="h-px flex-1 bg-white/10" />
          or paste JSON below
          <div className="h-px flex-1 bg-white/10" />
        </div>

        {/* JSON textarea */}
        <textarea
          value={json}
          onChange={(e) => setJson(e.target.value)}
          placeholder={'[\n  {\n    "title": "My Post",\n    "content": "First paragraph.\\n\\nSecond paragraph.",\n    "tags": ["ai"],\n    "scheduledAt": "2026-04-01T09:00:00Z"\n  }\n]'}
          rows={12}
          className="w-full px-4 py-3 rounded-lg bg-black/20 border border-white/10 text-gray-300 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent font-mono text-sm resize-y"
        />

        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
            {error}
          </div>
        )}

        <button
          onClick={handleImport}
          disabled={loading || !json.trim()}
          className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all"
        >
          {loading ? 'Importing...' : 'Import Posts'}
        </button>
      </div>

      {/* Results */}
      {result && (
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
          <h2 className="text-lg font-semibold text-white">Import Results</h2>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 text-center">
              <p className="text-3xl font-bold text-green-400">{result.created}</p>
              <p className="text-green-400/70 text-sm mt-1">Posts Created</p>
            </div>
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 text-center">
              <p className="text-3xl font-bold text-yellow-400">{result.skipped}</p>
              <p className="text-yellow-400/70 text-sm mt-1">Skipped</p>
            </div>
          </div>

          {result.errors.length > 0 && (
            <div>
              <p className="text-sm font-medium text-gray-400 mb-2">Issues:</p>
              <ul className="space-y-1">
                {result.errors.map((e, i) => (
                  <li key={i} className="text-sm text-gray-400">
                    <span className="text-white font-medium">{e.title}</span>
                    {' — '}
                    <span className="text-yellow-400">{e.reason}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {result.created > 0 && (
            <Link
              href="/admin/posts"
              className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors text-sm"
            >
              View all posts →
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
