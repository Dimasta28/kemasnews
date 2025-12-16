
import { SiteHeaderWrapper } from '@/components/site-header-wrapper';
import { SiteFooter } from '@/components/site-footer';
import { getFrontendSettings } from '@/services/settingsService';
import { GreenFootprintClient } from './green-footprint-client';

export default async function GreenFootprintPage() {
  const settings = await getFrontendSettings();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <SiteHeaderWrapper />
      <GreenFootprintClient />
      {settings && <SiteFooter settings={settings} />}
    </div>
  );
}
