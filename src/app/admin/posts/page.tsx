
import { getPosts } from '@/services/postService';
import { getCategories } from '@/services/categoryService';
import { PostsPageClient } from './posts-page-client';

export default async function PostsPage() {
  const [initialPosts, initialCategories] = await Promise.all([
    getPosts(),
    getCategories()
  ]);

  return <PostsPageClient 
            initialPosts={initialPosts} 
            initialCategories={initialCategories} 
        />;
}
