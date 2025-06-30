import { getPosts } from '@/services/postService';
import HomeClient from './home-client';

export default async function Home() {
  const allPosts = await getPosts();
  // Only show published posts on the main page
  const publishedPosts = allPosts.filter((post) => post.status === 'Published');

  return <HomeClient initialPosts={publishedPosts} />;
}
