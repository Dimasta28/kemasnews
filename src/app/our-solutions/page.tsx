
import { SiteHeaderWrapper } from '@/components/site-header-wrapper';
import { SiteFooter } from '@/components/site-footer';
import { getFrontendSettings } from '@/services/settingsService';
import { OurSolutionsClient } from './our-solutions-client';

export default async function OurSolutionsPage() {
  const settings = await getFrontendSettings();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <SiteHeaderWrapper />
      <OurSolutionsClient />
      {settings && <SiteFooter settings={settings} />}
    </div>
  );
}
