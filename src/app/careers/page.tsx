
import { SiteHeaderWrapper } from '@/components/site-header-wrapper';
import { getCareerPageData, getJobOpenings } from '@/services/careerService';
import { CareersClientPage } from './careers-client-page';
import { getFrontendSettings } from '@/services/settingsService';
import type { CareerPageData, JobOpening } from '@/services/careerService';
import type { FrontendSettings } from '@/services/settingsService';

export default async function CareersPage() {
  let pageData: CareerPageData | null = null;
  let jobOpenings: JobOpening[] = [];
  let settings: FrontendSettings | null = null;
  let error: string | null = null;

  try {
    [pageData, jobOpenings, settings] = await Promise.all([
      getCareerPageData(),
      getJobOpenings(),
      getFrontendSettings(),
    ]);
  } catch (e: any) {
    console.error("Failed to fetch careers page data:", e.message);
    error = e.message;
    // Attempt to fetch settings again if it failed, so the header/footer can still render
    if (!settings) {
        try {
            settings = await getFrontendSettings();
        } catch (e2: any) {
            console.error("Failed to fetch settings for careers page:", e2.message);
        }
    }
  }


  return (
    <div className="bg-[#EFECE9] dark:bg-[#050505] text-[#050505] dark:text-[#EFECE9]">
      <SiteHeaderWrapper />
      <CareersClientPage 
        pageData={pageData} 
        jobOpenings={jobOpenings} 
        settings={settings}
        error={error}
      />
    </div>
  );
}
