
import { SiteHeaderWrapper } from '@/components/site-header-wrapper';
import { SiteFooter } from '@/components/site-footer';
import { getFrontendSettings } from '@/services/settingsService';
import { WhoWeAreClient } from './who-we-are-client';

export default async function WhoWeArePage() {
  const settings = await getFrontendSettings();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <SiteHeaderWrapper />
      <WhoWeAreClient />
      {settings && <SiteFooter settings={settings} />}
    </div>
  );
}
