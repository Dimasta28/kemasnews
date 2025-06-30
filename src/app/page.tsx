
import { getPosts } from '@/services/postService';
import { getCategories } from '@/services/categoryService';
import HomeClient from './home-client';

export default async function Home() {
  const allPosts = await getPosts();
  // Only show published posts on the main page
  const publishedPosts = allPosts.filter((post) => post.status === 'Published');
  const allCategories = await getCategories();

  return <HomeClient initialPosts={publishedPosts} allCategories={allCategories} />;
}
