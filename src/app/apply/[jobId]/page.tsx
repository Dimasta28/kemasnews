
import { notFound } from 'next/navigation';
import { getJobOpening } from '@/services/careerService';
import { SiteHeaderWrapper } from '@/components/site-header-wrapper';
import { SiteFooter } from '@/components/site-footer';
import { ApplyForm } from './apply-form';
import { getFrontendSettings } from '@/services/settingsService';
import type { JobOpening } from '@/services/careerService';
import type { FrontendSettings } from '@/services/settingsService';

export default async function ApplyPage({ params }: { params: { jobId: string } }) {
  let job: JobOpening | null = null;
  let settings: FrontendSettings | null = null;
  let error: string | null = null;

  try {
    [job, settings] = await Promise.all([
      getJobOpening(params.jobId),
      getFrontendSettings()
    ]);
    
    if (!job) {
      notFound();
    }
  } catch (e: any) {
    console.error("Failed to fetch apply page data:", e.message);
    error = e.message;
     if (!settings) {
        try {
            settings = await getFrontendSettings();
        } catch (e2: any) {
             console.error("Secondary fetch for settings failed on apply page:", e2.message);
        }
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#EFECE9] dark:bg-[#050505]">
      <SiteHeaderWrapper />
      <main className="flex-grow flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <ApplyForm job={job} error={error} />
      </main>
      {settings && <SiteFooter settings={settings} />}
    </div>
  );
}
