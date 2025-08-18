
import { Suspense } from 'react';
import { getPost, getPosts } from '@/services/postService';
import { getCategories } from '@/services/categoryService';
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {Array.from({ length: 10 }).map((_, i) => (
                    <div key={i} className="space-y-2">
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
  let allPosts = [];
  let allCategories = [];
  let settings = null;
  let heroPosts = [];
  let error = null;

  try {
    // Fetch all data in parallel
    [allPosts, allCategories, settings] = await Promise.all([
      getPosts(),
      getCategories(),
      getFrontendSettings(),
    ]);

    // Only show published posts on the main page
    const publishedPosts = allPosts.filter((post) => post.status === 'Published');
    
    if (settings.heroPostIds && settings.heroPostIds.length > 0) {
      const fetchedHeroPosts = await Promise.all(
        settings.heroPostIds.map(id => getPost(id))
      );
      // Filter out any nulls in case a post was deleted
      heroPosts = fetchedHeroPosts.filter(p => p !== null) as any[];
    }
    
    // Fallback to latest 3 posts if no hero posts are selected or found
    if(heroPosts.length === 0) {
      heroPosts = publishedPosts.slice(0, 3);
    }
  } catch (e: any) {
    // Catch potential permission errors from Firestore
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
