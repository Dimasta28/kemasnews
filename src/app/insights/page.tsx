

import { SiteHeaderWrapper } from '@/components/site-header-wrapper';
import { SiteFooter } from '@/components/site-footer';
import { getFrontendSettings } from '@/services/settingsService';
import { getPosts } from '@/services/postService';
import { InsightsClient } from './insights-client';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const title = 'Insights | PT Kemas Indah Maju';
  const description = 'Our blog, news, and industry education.';
  const imageUrl = 'https://picsum.photos/seed/insights/1200/630';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      siteName: 'KEMASPKG',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    }
  };
}

export default async function InsightsPage() {
  const [settings, allPosts] = await Promise.all([
    getFrontendSettings(),
    getPosts()
  ]);
  
  const publishedPosts = allPosts.filter(post => post.status === 'Published');

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <SiteHeaderWrapper />
      <InsightsClient posts={publishedPosts} />
      {settings && <SiteFooter settings={settings} />}
    </div>
  );
}
