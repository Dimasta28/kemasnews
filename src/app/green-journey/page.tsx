
import { SiteHeaderWrapper } from '@/components/site-header-wrapper';
import { SiteFooter } from '@/components/site-footer';
import { getFrontendSettings } from '@/services/settingsService';
import { getGreenJourneyPageData, type GreenJourneyPageData } from '@/services/greenJourneyService';
import { GreenJourneyClientPage } from './green-journey-client';
import type { FrontendSettings } from '@/services/settingsService';

export default async function GreenJourneyPage() {
  let pageData: GreenJourneyPageData | null = null;
  let settings: FrontendSettings | null = null;
  let error: string | null = null;

  try {
    [pageData, settings] = await Promise.all([
      getGreenJourneyPageData(),
      getFrontendSettings(),
    ]);
  } catch (e: any) {
    console.error("Failed to fetch green journey page data:", e.message);
    error = e.message;
    if (!settings) {
        try {
            settings = await getFrontendSettings();
        } catch (e2: any) {
            console.error("Secondary fetch for settings failed:", e2.message);
        }
    }
  }

  return (
    <div className="bg-[#EFECE9] dark:bg-[#050505] text-[#050505] dark:text-[#EFECE9]">
      <SiteHeaderWrapper />
      <GreenJourneyClientPage
        pageData={pageData}
        settings={settings}
        error={error}
      />
    </div>
  );
}
