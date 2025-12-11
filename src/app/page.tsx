

import { SiteHeaderWrapper } from '@/components/site-header-wrapper';
import { SiteFooter } from '@/components/site-footer';
import { getFrontendSettings } from '@/services/settingsService';
import { type FrontendSettings } from '@/services/settingsService';
import { HomeClient } from './home-client';
import { GreenJourneyForm } from './_components/green-journey-form';

export default async function Home() {
  const settings = await getFrontendSettings();

  if (!settings) {
    // You might want a loading state here
    return (
        <div className="flex flex-col min-h-screen bg-[#EFECE9] dark:bg-[#050505]">
             <SiteHeaderWrapper />
             <main className="flex-grow flex items-center justify-center">
                {/* Optional: Add a spinner or skeleton loader */}
             </main>
        </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#EFECE9] dark:bg-[#050505]">
      <SiteHeaderWrapper />
      <HomeClient heroImageUrl={settings.heroImageUrl} />
      <div id="join-journey">
        <GreenJourneyForm />
      </div>
      <SiteFooter settings={settings} />
    </div>
  );
}
