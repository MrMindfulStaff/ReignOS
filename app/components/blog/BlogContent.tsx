'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';

interface BlogContentProps {
  content: string;
}

export default function BlogContent({ content }: BlogContentProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4],
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'rounded-lg max-w-full my-8',
        },
      }),
      Link.configure({
        openOnClick: true,
        HTMLAttributes: {
          class: 'text-purple-400 hover:text-purple-300 underline',
          target: '_blank',
          rel: 'noopener noreferrer',
        },
      }),
    ],
    content: content ? JSON.parse(content) : '',
    editable: false,
    editorProps: {
      attributes: {
        class: 'prose prose-invert prose-purple max-w-none focus:outline-none',
      },
    },
    immediatelyRender: false,
  });

  if (!editor) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-4 bg-white/10 rounded w-3/4"></div>
        <div className="h-4 bg-white/10 rounded w-full"></div>
        <div className="h-4 bg-white/10 rounded w-5/6"></div>
      </div>
    );
  }

  return <EditorContent editor={editor} />;
}
