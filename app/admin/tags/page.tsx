import prisma from '@/app/lib/prisma';
import TagManager from '@/app/components/admin/TagManager';

export const dynamic = 'force-dynamic';

async function getTags() {
  return prisma.tag.findMany({
    orderBy: { name: 'asc' },
    include: {
      _count: {
        select: { posts: true },
      },
    },
  });
}

export default async function TagsPage() {
  const tags = await getTags();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Tags</h1>
        <p className="text-gray-400 mt-1">Manage your blog post tags</p>
      </div>

      <TagManager initialTags={tags} />
    </div>
  );
}
