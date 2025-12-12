
import { SiteHeaderWrapper } from '@/components/site-header-wrapper';
import { SiteFooter } from '@/components/site-footer';
import { getFrontendSettings } from '@/services/settingsService';

export default async function WhoWeArePage() {
  const settings = await getFrontendSettings();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <SiteHeaderWrapper />
      <main className="flex-grow flex items-center justify-center">
        <h1 className="text-4xl font-bold">Who We Are</h1>
      </main>
      {settings && <SiteFooter settings={settings} />}
    </div>
  );
}
