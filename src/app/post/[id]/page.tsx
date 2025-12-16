
import { getPost, getPosts } from '@/services/postService';
import { notFound } from 'next/navigation';
import { getFrontendSettings } from '@/services/settingsService';
import { PostClient } from './post-client';
import type { Post } from '@/services/postService';
import type { FrontendSettings } from '@/services/settingsService';


export default async function PostPage({ params }: { params: { id: string } }) {
  let post: Post | null = null;
  let recentPosts: Post[] = [];
  let settings: FrontendSettings | null = null;
  let error: string | null = null;
  
  // The `params.id` can be either the document ID or the slug
  const idOrSlug = params.id;
  
  try {
    [post, settings] = await Promise.all([
      getPost(idOrSlug),
      getFrontendSettings(),
    ]);
    
    if (post) {
      const allPosts = await getPosts();
      recentPosts = allPosts.filter(p => p.id !== post.id).slice(0, 5);
    } else {
        // If post is null even without an error, it's a genuine 404
        notFound();
    }
  } catch (e: any) {
    console.error("Failed to fetch post page data:", e.message);
    error = e.message; // Pass the error to the client component
  }
  
  return (
    <PostClient 
      post={post}
      recentPosts={recentPosts}
      settings={settings}
      error={error}
    />
  );
}

    