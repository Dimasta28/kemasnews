
import { getPosts } from '@/services/postService';
import { getCategories } from '@/services/categoryService';
import { MediaClient } from './media-client';

export default async function MediaPage({
  searchParams,
}: {
  searchParams?: { tab?: string };
}) {
  const [initialPosts, initialCategories] = await Promise.all([
    getPosts(),
    getCategories()
  ]);

  const activeTab = searchParams?.tab === 'categories' ? 'categories' : (searchParams?.tab === 'tags' ? 'tags' : 'posts');

  return (
    <MediaClient
      initialPosts={initialPosts}
      initialCategories={initialCategories}
      initialTags={[]} // Placeholder for tags
      activeTab={activeTab}
    />
  );
}
