

import { SiteHeaderWrapper } from '@/components/site-header-wrapper';
import { SiteFooter } from '@/components/site-footer';
import { getFrontendSettings } from '@/services/settingsService';
import { GreenFootprintClient } from './green-footprint-client';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  // Removed data fetching from here to prevent HMR issues.
  const title = 'Green Footprint | PT Kemas Indah Maju';
  const description = 'A Story of Innovation, Responsibility, and Measurable Impact.';
  const imageUrl = 'https://picsum.photos/seed/green-footprint/1200/630';

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

export default async function GreenFootprintPage() {
  const settings = await getFrontendSettings();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <SiteHeaderWrapper />
      <GreenFootprintClient settings={settings} />
      {settings && <SiteFooter settings={settings} />}
    </div>
  );
}
