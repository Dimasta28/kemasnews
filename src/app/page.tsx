
import { Suspense } from 'react';
import { getPost, getPosts, type Post } from '@/services/postService';
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
  let settings = null;
  let error = null;

  // Mock data for immediate preview
  const mockPosts: Post[] = [
    {
      id: '1',
      title: 'Revolutionizing Packaging with AI',
      description: 'Discover how artificial intelligence is reshaping the future of the packaging industry, from design to delivery.',
      content: '',
      status: 'Published',
      categories: ['Technology'],
      tags: ['AI', 'Packaging', 'Innovation'],
      featuredImage: 'https://placehold.co/600x400.png',
      date: '2024-08-15T10:00:00.000Z',
      author: 'Admin',
    },
    {
      id: '2',
      title: 'Sustainable Materials: A Deep Dive',
      description: 'An in-depth look at the eco-friendly materials that are making packaging more sustainable than ever before.',
      content: '',
      status: 'Published',
      categories: ['Sustainability'],
      tags: ['Eco-friendly', 'Materials', 'Green'],
      featuredImage: 'https://placehold.co/600x400.png',
      date: '2024-08-10T11:00:00.000Z',
      author: 'Admin',
    },
    {
        id: '3',
        title: 'The Art of Minimalist Packaging Design',
        description: 'Less is more. Explore the principles of minimalist design and how it can elevate your brand.',
        content: '',
        status: 'Published',
        categories: ['Design'],
        tags: ['Minimalism', 'Branding', 'Design'],
        featuredImage: 'https://placehold.co/600x400.png',
        date: '2024-08-05T12:00:00.000Z',
        author: 'Admin',
    },
     {
      id: '4',
      title: 'Global Logistics: Challenges and Solutions',
      description: 'Navigating the complex world of global shipping and logistics in the packaging industry.',
      content: '',
      status: 'Published',
      categories: ['Industry'],
      tags: ['Logistics', 'Shipping', 'Global'],
      featuredImage: 'https://placehold.co/600x400.png',
      date: '2024-08-01T09:00:00.000Z',
      author: 'Admin',
    }
  ];

  const mockCategories: Category[] = [
    { id: '1', name: 'Technology', slug: 'technology', postCount: 1 },
    { id: '2', name: 'Sustainability', slug: 'sustainability', postCount: 1 },
    { id: '3', name: 'Design', slug: 'design', postCount: 1 },
    { id: '4', name: 'Industry', slug: 'industry', postCount: 1 },
  ];
  
  const heroPosts = mockPosts.slice(0,3);
  const allCategories = mockCategories;

  try {
    settings = await getFrontendSettings();
  } catch (e: any) {
    console.error("Failed to fetch settings for home page:", e.message);
    error = e.message;
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

