
import { SiteHeaderWrapper } from '@/components/site-header-wrapper';
import { SiteFooter } from '@/components/site-footer';
import { getFrontendSettings } from '@/services/settingsService';
import { getPosts } from '@/services/postService';
import { InsightsClient } from './insights-client';

export default async function InsightsPage() {
  const settings = await getFrontendSettings();
  const allPosts = await getPosts();
  
  const publishedPosts = allPosts.filter(post => post.status === 'Published');

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <SiteHeaderWrapper />
      <InsightsClient posts={publishedPosts} />
      {settings && <SiteFooter settings={settings} />}
    </div>
  );
}
