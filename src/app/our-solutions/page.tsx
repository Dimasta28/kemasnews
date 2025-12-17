

import { SiteHeaderWrapper } from '@/components/site-header-wrapper';
import { SiteFooter } from '@/components/site-footer';
import { getFrontendSettings } from '@/services/settingsService';
import { OurSolutionsClient } from './our-solutions-client';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
    const title = 'Our Solutions | PT Kemas Indah Maju';
    const description = 'From products to solutions, our journey towards sustainability.';
    const imageUrl = 'https://picsum.photos/seed/solutions/1200/630';

    return {
        title: title,
        description: description,
        openGraph: {
            title: title,
            description: description,
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
            title: title,
            description: description,
            images: [imageUrl],
        }
    };
}


export default async function OurSolutionsPage() {
  const settings = await getFrontendSettings();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <SiteHeaderWrapper />
      <OurSolutionsClient settings={settings} />
      {settings && <SiteFooter settings={settings} />}
    </div>
  );
}
