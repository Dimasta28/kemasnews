
import { SiteHeaderWrapper } from '@/components/site-header-wrapper';
import { getCareerPageData, getJobOpenings } from '@/services/careerService';
import { CareersClientPage } from './careers-client-page';
import { getFrontendSettings } from '@/services/settingsService';

export default async function CareersPage() {
  const [pageData, jobOpenings, settings] = await Promise.all([
    getCareerPageData(),
    getJobOpenings(),
    getFrontendSettings(),
  ]);

  return (
    <div className="bg-[#EFECE9] dark:bg-[#050505] text-[#050505] dark:text-[#EFECE9]">
      <SiteHeaderWrapper />
      <CareersClientPage 
        initialPageData={pageData} 
        initialJobOpenings={jobOpenings} 
        settings={settings}
      />
    </div>
  );
}
