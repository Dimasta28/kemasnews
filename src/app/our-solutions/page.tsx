

import { SiteHeaderWrapper } from '@/components/site-header-wrapper';
import { SiteFooter } from '@/components/site-footer';
import { getFrontendSettings } from '@/services/settingsService';
import { OurSolutionsClient } from './our-solutions-client';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
    const settings = await getFrontendSettings();
    const title = 'Our Solutions | PT Kemas Indah Maju';
    const description = 'From products to solutions, our journey towards sustainability.';
    
    // Use the hero image from the Our Solutions page for its OG image
    const imageUrl = settings.heroImageUrl || 'https://idicdhrghiqmqtocapwq.supabase.co/storage/v1/object/public/Kemas%20green%20jurney/Hero%20image/Black%20and%20White%20Modern%20Travel%20Agency%20Presentation.jpg';

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
