'use client';

import { useState, useEffect, useRef } from 'react';

interface Tag {
  id: string;
  name: string;
  slug: string;
  color: string;
}

interface TagSelectorProps {
  selectedTags: string[];
  onChange: (tagIds: string[]) => void;
}

export default function TagSelector({ selectedTags, onChange }: TagSelectorProps) {
  const [tags, setTags] = useState<Tag[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchTags();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchTags = async () => {
    try {
      const response = await fetch('/api/admin/tags');
      const data = await response.json();
      setTags(data);
    } catch (error) {
      console.error('Failed to fetch tags:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = (tagId: string) => {
    if (selectedTags.includes(tagId)) {
      onChange(selectedTags.filter((id) => id !== tagId));
    } else {
      onChange([...selectedTags, tagId]);
    }
  };

  const handleCreateTag = async () => {
    if (!search.trim()) return;

    setCreating(true);
    try {
      const response = await fetch('/api/admin/tags', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: search.trim() }),
      });

      if (response.ok) {
        const newTag = await response.json();
        setTags([...tags, newTag]);
        onChange([...selectedTags, newTag.id]);
        setSearch('');
      }
    } catch (error) {
      console.error('Failed to create tag:', error);
    } finally {
      setCreating(false);
    }
  };

  const filteredTags = tags.filter((tag) =>
    tag.name.toLowerCase().includes(search.toLowerCase())
  );

  const selectedTagObjects = tags.filter((tag) => selectedTags.includes(tag.id));

  const showCreateOption =
    search.trim() &&
    !filteredTags.some(
      (tag) => tag.name.toLowerCase() === search.toLowerCase()
    );

  return (
    <div ref={containerRef} className="relative">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="min-h-[42px] px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white cursor-pointer flex flex-wrap gap-2 items-center"
      >
        {selectedTagObjects.length === 0 ? (
          <span className="text-gray-500">Select tags...</span>
        ) : (
          selectedTagObjects.map((tag) => (
            <span
              key={tag.id}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-sm text-white"
              style={{ backgroundColor: tag.color + '40', borderColor: tag.color }}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: tag.color }}
              />
              {tag.name}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleToggle(tag.id);
                }}
                className="ml-1 hover:text-red-400"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </span>
          ))
        )}
      </div>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-slate-800 border border-white/10 rounded-lg shadow-xl overflow-hidden">
          <div className="p-2 border-b border-white/10">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search or create tag..."
              className="w-full px-3 py-2 rounded bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
              autoFocus
            />
          </div>

          <div className="max-h-48 overflow-y-auto">
            {loading ? (
              <div className="p-4 text-center text-gray-400">Loading...</div>
            ) : filteredTags.length === 0 && !showCreateOption ? (
              <div className="p-4 text-center text-gray-400">No tags found</div>
            ) : (
              <>
                {filteredTags.map((tag) => (
                  <button
                    key={tag.id}
                    type="button"
                    onClick={() => handleToggle(tag.id)}
                    className={`w-full px-3 py-2 flex items-center gap-2 hover:bg-white/5 transition-colors ${
                      selectedTags.includes(tag.id) ? 'bg-purple-500/20' : ''
                    }`}
                  >
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: tag.color }}
                    />
                    <span className="text-white text-sm">{tag.name}</span>
                    {selectedTags.includes(tag.id) && (
                      <svg className="w-4 h-4 ml-auto text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>
                ))}

                {showCreateOption && (
                  <button
                    type="button"
                    onClick={handleCreateTag}
                    disabled={creating}
                    className="w-full px-3 py-2 flex items-center gap-2 hover:bg-white/5 transition-colors text-purple-400"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    <span className="text-sm">
                      {creating ? 'Creating...' : `Create "${search}"`}
                    </span>
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
