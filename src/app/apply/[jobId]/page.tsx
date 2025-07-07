import { notFound } from 'next/navigation';
import { getJobOpening } from '@/services/careerService';
import { SiteHeaderWrapper } from '@/components/site-header-wrapper';
import { SiteFooter } from '@/components/site-footer';
import { ApplyForm } from './apply-form';

export default async function ApplyPage({ params }: { params: { jobId: string } }) {
  const job = await getJobOpening(params.jobId);
  
  if (!job) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#EFECE9] dark:bg-[#050505]">
      <SiteHeaderWrapper />
      <main className="flex-grow flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <ApplyForm job={job} />
      </main>
      <SiteFooter />
    </div>
  );
}
