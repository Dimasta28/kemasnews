import { getFrontendSettings } from '@/services/settingsService';
import { getNotifications } from '@/services/notificationService';
import { getPosts } from '@/services/postService';
import { SiteHeader } from './site-header';

export async function SiteHeaderWrapper() {
  const [settings, notifications, posts] = await Promise.all([
    getFrontendSettings(),
    getNotifications(),
    getPosts()
  ]);

  const publishedPosts = posts.filter(p => p.status === 'Published');
  
  return <SiteHeader settings={settings} notifications={notifications} posts={publishedPosts} />;
}
