
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { getCareerPageData, getJobOpenings } from '@/services/careerService';
import { CareersClientPage } from './careers-client-page';

export default async function CareersPage() {
  const [pageData, jobOpenings] = await Promise.all([
    getCareerPageData(),
    getJobOpenings(),
  ]);

  return (
    <div className="bg-[#EFECE9] dark:bg-[#050505] text-[#050505] dark:text-[#EFECE9]">
      <SiteHeader />
      <CareersClientPage initialPageData={pageData} initialJobOpenings={jobOpenings} />
      <SiteFooter />
    </div>
  );
}
