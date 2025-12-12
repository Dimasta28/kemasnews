
import { getPost, getPosts } from '@/services/postService';
import { notFound } from 'next/navigation';
import { getFrontendSettings } from '@/services/settingsService';
import { getComments } from '@/services/commentService';
import { PostClient } from './post-client';
import type { Post } from '@/services/postService';
import type { Comment } from '@/services/commentService';
import type { FrontendSettings } from '@/services/settingsService';


export default async function PostPage({ params }: { params: { id: string } }) {
  let post: Post | null = null;
  let recentPosts: Post[] = [];
  let settings: FrontendSettings | null = null;
  let comments: Comment[] = [];
  let error: string | null = null;
  
  try {
    [post, settings] = await Promise.all([
      getPost(params.id),
      getFrontendSettings(),
    ]);
    
    if (post) {
      const [allPosts, postComments] = await Promise.all([
        getPosts(),
        getComments(params.id)
      ]);
      recentPosts = allPosts.filter(p => p.id !== params.id).slice(0, 5);
      comments = postComments;
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
      comments={comments}
      settings={settings}
      error={error}
    />
  );
}
