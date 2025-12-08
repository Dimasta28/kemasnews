import { getFrontendSettings } from '@/services/settingsService';
import { getPosts } from '@/services/postService';
import { SiteHeader } from './site-header';

export async function SiteHeaderWrapper() {
  const [settings, posts] = await Promise.all([
    getFrontendSettings(),
    getPosts()
  ]);

  const publishedPosts = posts.filter(p => p.status === 'Published');
  
  return <SiteHeader settings={settings} posts={publishedPosts} />;
}
