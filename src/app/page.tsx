
import { Suspense } from 'react';
import { getPosts, type Post } from '@/services/postService';
import { getCategories, type Category } from '@/services/categoryService';
import { getFrontendSettings } from '@/services/settingsService';
import HomeClient from './home-client';
import { SiteHeaderWrapper } from '@/components/site-header-wrapper';
import { Skeleton } from '@/components/ui/skeleton';

function HomePageLoading() {
  return (
    <div className="pt-24 space-y-8">
       <div className="h-[80vh] md:h-[90vh] bg-muted animate-pulse" />
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 py-8">
            <div className="h-10 bg-muted animate-pulse rounded-md w-full max-w-lg mx-auto" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                {Array.from({ length: 9 }).map((_, i) => (
                    <div key={i} className="space-y-4">
                        <Skeleton className="h-56 w-full" />
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
  let allPosts: Post[] = [];
  let allCategories: Category[] = [];
  let heroPosts: Post[] = [];
  let error = null;

  try {
    // Fetch all necessary data in parallel
    const [fetchedSettings, fetchedPosts, fetchedCategories] = await Promise.all([
      getFrontendSettings(),
      getPosts(),
      getCategories(),
    ]);

    settings = fetchedSettings;
    allPosts = fetchedPosts.filter(p => p.status === 'Published');
    allCategories = fetchedCategories;
    
    // Determine hero posts
    if (settings.heroPostIds && settings.heroPostIds.length > 0) {
        // If specific hero posts are defined, filter all posts to find them
        const heroPostMap = new Map(allPosts.map(p => [p.id, p]));
        heroPosts = settings.heroPostIds.map(id => heroPostMap.get(id)).filter(p => p !== undefined) as Post[];
    } else {
        // Otherwise, use the 3 most recent posts as heroes
        heroPosts = allPosts.slice(0, 3);
    }

  } catch (e: any) {
    console.error("Failed to fetch initial page data:", e.message);
    error = e.message;
    // Attempt to fetch settings again if it failed, so the header/footer can still render
     if (!settings) {
        try {
            settings = await getFrontendSettings();
        } catch (e2: any) {
             console.error("Failed to fetch settings for home page:", e2.message);
        }
    }
  }

  return (
    <>
      <SiteHeaderWrapper />
      <Suspense fallback={<HomePageLoading />}>
        <HomeClient 
          heroPosts={heroPosts} 
          allCategories={allCategories} 
          settings={settings} 
          error={error}
        />
      </Suspense>
    </>
    );
}
