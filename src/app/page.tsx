
import { Suspense } from 'react';
import { getFrontendSettings } from '@/services/settingsService';
import HomeClient from './home-client';
import { SiteHeaderWrapper } from '@/components/site-header-wrapper';
import { Skeleton } from '@/components/ui/skeleton';

function HomePageLoading() {
  return (
    <div className="pt-24 space-y-8">
       <div className="h-[60vh] bg-muted animate-pulse" />
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 py-8">
            <div className="h-10 bg-muted animate-pulse rounded-md w-full max-w-lg mx-auto" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="space-y-4">
                        <Skeleton className="h-40 w-full" />
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                    </div>
                ))}
            </div>
       </div>
    </div>
  )
}

export default async function Home() {
  let settings = null;
  let error = null;

  try {
    settings = await getFrontendSettings();
  } catch (e: any) {
    console.error("Failed to fetch initial page data:", e.message);
    error = e.message;
  }

  return (
    <>
      <SiteHeaderWrapper />
      <Suspense fallback={<HomePageLoading />}>
        <HomeClient 
          settings={settings} 
        />
      </Suspense>
    </>
    );
}
