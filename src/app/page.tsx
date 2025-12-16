

import { SiteHeaderWrapper } from '@/components/site-header-wrapper';
import { SiteFooter } from '@/components/site-footer';
import { getFrontendSettings } from '@/services/settingsService';
import { getPosts, type Post } from '@/services/postService';
import { type FrontendSettings } from '@/services/settingsService';
import { HomeClient } from './home-client';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getFrontendSettings();
  const title = settings.ogTitle || 'PT Kemas Indah Maju';
  const description = settings.ogDescription || 'Beautiful, Smart, Sustainable Packaging';

  return {
    title: {
      default: title,
      template: `%s | ${title}`,
    },
    description: description,
    openGraph: {
      title: title,
      description: description,
      images: [
        {
          url: settings.heroImageUrl, // Use the specific hero image for the homepage
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
        title: title,
        description: description,
        images: [settings.heroImageUrl],
    }
  };
}

export default async function Home() {
  const settings = await getFrontendSettings();
  const allPosts = await getPosts();
  const recentPosts = allPosts.filter(p => p.status === 'Published').slice(0, 3);

  if (!settings) {
    // You might want a loading state here
    return (
        <div className="flex flex-col min-h-screen bg-background">
             <SiteHeaderWrapper />
             <main className="flex-grow flex items-center justify-center">
                {/* Optional: Add a spinner or skeleton loader */}
             </main>
        </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <SiteHeaderWrapper />
      <HomeClient heroImageUrl={settings.heroImageUrl} recentPosts={recentPosts} />
      <SiteFooter settings={settings} />
    </div>
  );
}
