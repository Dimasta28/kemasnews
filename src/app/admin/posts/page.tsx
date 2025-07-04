
import { getPosts } from '@/services/postService';
import { PostsClient } from './posts-client';

export default async function PostsPage() {
  const initialPosts = await getPosts();

  return <PostsClient initialPosts={initialPosts} />;
}
