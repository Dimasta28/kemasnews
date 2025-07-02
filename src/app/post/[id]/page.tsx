
import { getPost, getPosts } from '@/services/postService';
import { notFound } from 'next/navigation';
import { getFrontendSettings } from '@/services/settingsService';
import { getComments } from '@/services/commentService';
import { getNotifications } from '@/services/notificationService';
import { PostClient } from './post-client';

export default async function PostPage({ params }: { params: { id: string } }) {
  const [post, allPosts, settings, comments, notifications] = await Promise.all([
    getPost(params.id),
    getPosts(),
    getFrontendSettings(),
    getComments(params.id),
    getNotifications(),
  ]);
  
  if (!post) {
    notFound();
  }
  
  const recentPosts = allPosts.filter(p => p.id !== params.id).slice(0, 5);

  return (
    <PostClient 
      post={post}
      recentPosts={recentPosts}
      comments={comments}
      settings={settings}
      notifications={notifications}
    />
  );
}
