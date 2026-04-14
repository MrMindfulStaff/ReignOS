import Link from 'next/link';

interface TagBadgeProps {
  name: string;
  slug: string;
  color: string;
  clickable?: boolean;
}

export default function TagBadge({ name, slug, color, clickable = true }: TagBadgeProps) {
  const className = `inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm transition-colors`;
  const style = {
    backgroundColor: color + '20',
    color: color,
  };

  if (clickable) {
    return (
      <Link
        href={`/blog?tag=${slug}`}
        className={`${className} hover:opacity-80`}
        style={style}
      >
        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
        {name}
      </Link>
    );
  }

  return (
    <span className={className} style={style}>
      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
      {name}
    </span>
  );
}
