
'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Autoplay from 'embla-carousel-autoplay';
import { useSearchParams } from 'next/navigation';

// Firebase imports
import { db } from '@/lib/firebase';
import { collection, query, orderBy, onSnapshot, Timestamp } from 'firebase/firestore';

// Component imports
import type { Post } from '@/services/postService';
import type { Category } from '@/services/categoryService';
import type { FrontendSettings } from '@/services/settingsService';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Search } from 'lucide-react';
import { SiteFooter } from '@/components/site-footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { SocialShare } from '@/components/social-share';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';

// Main Application Component
export default function HomeClient({ heroPosts, allCategories, settings, error }: { heroPosts: Post[], allCategories: Category[], settings: FrontendSettings | null, error?: string | null }) {
  const articlesSectionRef = useRef<HTMLElement>(null);
  const autoplayPlugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: true }));
  
  const searchParams = useSearchParams();
  const q = searchParams.get('q');

  // State for all posts, updated in realtime
  const [allPosts, setAllPosts] = useState<Post[]>([]);

  const [articles, setArticles] = useState<Post[]>(allPosts);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState(q || '');
  const [baseUrl, setBaseUrl] = useState('');
  const articlesPerPage = 12;

  const [categoryColorMap, setCategoryColorMap] = useState<Record<string, string>>({});

  useEffect(() => {
    // Define a palette of Tailwind CSS classes for category labels
    const colorPalette = [
        'bg-pink-200 text-pink-800', 'dark:bg-pink-900 dark:text-pink-200',
        'bg-blue-200 text-blue-800', 'dark:bg-blue-900 dark:text-blue-200',
        'bg-green-200 text-green-800', 'dark:bg-green-900 dark:text-green-200',
        'bg-yellow-200 text-yellow-800', 'dark:bg-yellow-900 dark:text-yellow-200',
        'bg-indigo-200 text-indigo-800', 'dark:bg-indigo-900 dark:text-indigo-200',
        'bg-purple-200 text-purple-800', 'dark:bg-purple-900 dark:text-purple-200',
        'bg-red-200 text-red-800', 'dark:bg-red-900 dark:text-red-200',
        'bg-teal-200 text-teal-800', 'dark:bg-teal-900 dark:text-teal-200',
        'bg-orange-200 text-orange-800', 'dark:bg-orange-900 dark:text-orange-200',
        'bg-cyan-200 text-cyan-800', 'dark:bg-cyan-900 dark:text-cyan-200'
    ];

    const newColorMap: Record<string, string> = {};
    // Sort categories alphabetically to ensure stable color assignment
    const sortedCategories = [...allCategories].sort((a, b) => a.name.localeCompare(b.name));
    
    sortedCategories.forEach((category, index) => {
        newColorMap[category.name.toLowerCase().trim()] = colorPalette[index % colorPalette.length];
    });
    setCategoryColorMap(newColorMap);
  }, [allCategories]);


  // Set up a real-time listener for posts
  useEffect(() => {
    // This effect runs once on mount on the client side
    setBaseUrl(window.location.origin);
    
    const postsCollection = collection(db, 'posts');
    const q = query(postsCollection, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
        const freshPosts: Post[] = snapshot.docs.map(doc => {
            const data = doc.data();
            const date = (data.createdAt as Timestamp)?.toDate() || new Date();
            
            let categories: string[] = [];
            if (data.categories && Array.isArray(data.categories)) {
              categories = data.categories;
            } else if (data.category && typeof data.category === 'string') {
              categories = [data.category];
            }

            return {
                id: doc.id,
                title: data.title || '',
                description: data.description || '',
                status: data.status || 'Draft',
                author: data.author || 'KEMAS',
                date: date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
                content: data.content || '',
                categories: categories,
                tags: data.tags || [],
                featuredImage: data.featuredImage || 'https://placehold.co/600x400.png'
            };
        }).filter(post => post.status === 'Published'); // Only show published posts

        setAllPosts(freshPosts);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []); // Empty dependency array means this effect runs once on mount

  useEffect(() => {
    // This effect ensures the search term from the URL is applied.
    setSearchTerm(q || '');
  }, [q]);

  useEffect(() => {
    let filtered = allPosts;

    // Filter by active category
    if (activeFilter !== 'All') {
      filtered = filtered.filter(post => post.categories.includes(activeFilter));
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setArticles(filtered);
    setCurrentPage(1); // Reset page on new filter
  }, [activeFilter, searchTerm, allPosts]);

  if (error || !settings) {
    return (
        <div className="flex h-screen items-center justify-center p-4">
            <Alert variant="destructive" className="max-w-2xl">
              <Terminal className="h-4 w-4" />
              <AlertTitle>Connection Error</AlertTitle>
              <AlertDescription>
                <p>The application could not connect to the database. This is likely due to a misconfiguration in the Firestore Security Rules.</p>
                <p className="mt-2 font-mono text-xs bg-muted p-2 rounded">{error || 'Could not retrieve page settings.'}</p>
                <p className="mt-4">Please check your Firebase project's security rules to ensure that public collections like 'posts', 'categories', and 'settings' are readable by everyone.</p>
              </AlertDescription>
            </Alert>
        </div>
    )
  }

  const handleFilterChange = (filter: string) => {
    if (!filter) return; // Prevent unselecting the toggle
    setActiveFilter(filter);
    setCurrentPage(1);
    articlesSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handlePageChange = (page: number) => {
      setCurrentPage(page);
      articlesSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  }

  // Pagination logic
  const totalPages = Math.ceil(articles.length / articlesPerPage);
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  );

  // Create a unique list of categories and sort them
  const uniqueCategories = allCategories.filter((category, index, self) =>
    index === self.findIndex((c) => c.name === category.name) && category.name
  );
  const sortedUniqueCategories = [...uniqueCategories].sort((a, b) => b.postCount - a.postCount);
  
  return (
    <div className="font-inter antialiased bg-[#EFECE9] dark:bg-[#050505] text-[#050505] dark:text-[#EFECE9] min-h-screen">
      <main>
        {heroPosts.length > 0 ? (
          <section>
            <Carousel
              plugins={[autoplayPlugin.current]}
              className="relative w-full"
              onMouseEnter={autoplayPlugin.current.stop}
              onMouseLeave={autoplayPlugin.current.reset}
            >
              <CarouselContent>
                {heroPosts.map((post, index) => {
                   const firstCategory = post.categories?.[0] || '';
                   const categoryClass = categoryColorMap[firstCategory.toLowerCase().trim()] || 'bg-muted text-muted-foreground';
                  return (
                    <CarouselItem key={post.id}>
                      <div className="relative aspect-square md:aspect-auto md:h-[90vh] flex items-end p-8 md:p-12 text-white bg-black">
                          <Image
                              src={post.featuredImage}
                              alt={post.title}
                              fill
                              className="z-0 opacity-50 object-cover"
                              data-ai-hint="blog post image"
                              priority={index === 0}
                          />
                          <div className="relative z-10 max-w-3xl">
                              <Link href={`/post/${post.id}`} className="block group">
                                  {firstCategory && (
                                      <span
                                          className={cn(
                                            "inline-block text-xs font-semibold px-3 py-1 rounded-full mb-4",
                                            categoryClass
                                          )}
                                      >
                                          {firstCategory}
                                      </span>
                                  )}
                                  <h1 className="text-xl md:text-6xl font-extrabold leading-tight mb-4 group-hover:underline">
                                      {post.title}
                                  </h1>
                                  <p className="text-sm md:text-lg text-gray-300 line-clamp-2">
                                     {post.description}
                                  </p>
                              </Link>
                          </div>
                      </div>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
            </Carousel>
          </section>
        ) : (
            <section className="relative aspect-square md:aspect-[16/7] md:h-[90vh] flex items-center justify-center text-center overflow-hidden bg-cover bg-center">
                 <Image
                    src="https://placehold.co/1920x1080.png"
                    alt="Hero background"
                    fill
                    className="z-0 object-cover"
                    data-ai-hint="cosmetics background"
                 />
            </section>
        )}
        
        <section className="py-8 bg-card/50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <Carousel
              opts={{
                align: 'start',
                dragFree: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-2">
                <CarouselItem className="pl-2 basis-auto">
                  <Button
                    variant="outline"
                    className={cn(
                      'rounded-full',
                      activeFilter === 'All' && 'bg-accent text-accent-foreground hover:bg-accent/90'
                    )}
                    onClick={() => handleFilterChange('All')}
                  >
                    All Topics
                  </Button>
                </CarouselItem>
                {sortedUniqueCategories.map((category) => (
                  <CarouselItem key={category.id} className="pl-2 basis-auto">
                    <Button
                      variant="outline"
                      className={cn(
                        'rounded-full',
                        activeFilter === category.name && 'bg-accent text-accent-foreground hover:bg-accent/90'
                      )}
                      onClick={() => handleFilterChange(category.name)}
                    >
                      {category.name}
                    </Button>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </section>

        <section ref={articlesSectionRef} className="pt-12 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
                    <h2 className="text-xl sm:text-3xl font-bold self-start sm:self-center">
                        {activeFilter === 'All' ? 'Latest Articles' : activeFilter}
                    </h2>
                    <div className="relative w-full sm:max-w-xs">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Search articles..."
                                className="pl-9 w-full"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                    </div>
                </div>
            </div>

            {currentArticles.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 justify-center">
                    {currentArticles.map((article) => {
                        const firstCategory = article.categories?.[0] || '';
                        const categoryClass = categoryColorMap[firstCategory.toLowerCase().trim()] || 'bg-muted text-muted-foreground';
                        const postUrl = baseUrl ? `${baseUrl}/post/${article.id}` : '';
                        return (
                            <motion.div
                                key={article.id}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.2 }}
                                className="group rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col bg-card"
                            >
                                <div className="relative w-full aspect-video overflow-hidden">
                                    <Image
                                        src={article.featuredImage}
                                        alt={article.title}
                                        fill
                                        className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                                        data-ai-hint="cosmetics packaging"
                                    />
                                    <Link href={`/post/${article.id}`} className="absolute inset-0 z-0" aria-label={article.title} />
                                </div>
                                <div className="p-5 flex-grow flex flex-col">
                                    {firstCategory && (
                                        <span
                                            className={cn(
                                                'inline-block text-xs font-semibold px-3 py-1 rounded-full mb-3 self-start',
                                                categoryClass
                                            )}
                                        >
                                            {firstCategory}
                                        </span>
                                    )}
                                    <h3 className="text-sm font-semibold mb-2 line-clamp-2 text-card-foreground flex-grow">
                                       <Link href={`/post/${article.id}`} className="hover:underline focus:underline before:absolute before:inset-0 before:z-0">
                                        {article.title}
                                       </Link>
                                    </h3>
                                    {article.description && (
                                    <p className="text-xs text-muted-foreground/90 line-clamp-3 mb-4 flex-grow">
                                        {article.description}
                                    </p>
                                    )}
                                    <div className="flex items-center justify-end text-xs text-muted-foreground mt-auto pt-4 border-t border-border/30">
                                        <div className="relative z-10">
                                          <SocialShare title={article.title} url={postUrl} />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            ) : (
                <div className="text-center py-10">
                    <p className="text-muted-foreground">
                        No posts found for the selected filter.
                    </p>
                </div>
            )}

            {totalPages > 1 && (
            <div className="flex justify-center mt-12">
                <Pagination>
                <PaginationContent>
                    <PaginationItem>
                    <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                        e.preventDefault();
                        handlePageChange(currentPage - 1);
                        }}
                        className={
                        currentPage === 1
                            ? 'pointer-events-none opacity-50'
                            : undefined
                        }
                    />
                    </PaginationItem>
                    {Array.from({ length: totalPages }, (_, i) => (
                    <PaginationItem key={i}>
                        <PaginationLink
                        href="#"
                        isActive={currentPage === i + 1}
                        onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(i + 1);
                        }}
                        >
                        {i + 1}
                        </PaginationLink>
                    </PaginationItem>
                    ))}
                    <PaginationItem>
                    <PaginationNext
                        href="#"
                        onClick={(e) => {
                        e.preventDefault();
                        handlePageChange(currentPage + 1);
                        }}
                        className={
                        currentPage === totalPages
                            ? 'pointer-events-none opacity-50'
                            : undefined
                        }
                    />
                    </PaginationItem>
                </PaginationContent>
                </Pagination>
            </div>
            )}
        </section>

       <section className="bg-transparent py-12">
             <div className="max-w-7xl mx-auto overflow-hidden">
                <div className="grid md:grid-cols-10 md:gap-6 mx-auto group">
                    <div className="relative w-full overflow-hidden order-2 md:order-1 md:col-span-3 flex items-center transition-transform duration-300 group-hover:scale-105">
                        <div className="aspect-w-16 aspect-h-9 w-full">
                            <Image
                                src={settings.homepageBanner?.imageUrl || 'https://placehold.co/800x450.png'}
                                alt={settings.homepageBanner?.title || 'Promotional Banner'}
                                fill
                                className="object-contain"
                                data-ai-hint="advertisement banner"
                            />
                        </div>
                    </div>
                    <div className="p-8 md:p-12 flex flex-col justify-center order-1 md:order-2 md:col-span-7">
                        <h3 className="text-2xl md:text-4xl font-bold leading-tight text-foreground">{settings.homepageBanner?.title}</h3>
                        <p className="mt-4 text-base md:text-lg text-muted-foreground">{settings.homepageBanner?.description}</p>
                        <Button size="lg" className="mt-6 w-fit" asChild>
                            <Link href={settings.homepageBanner?.buttonLink || '#'}>
                                {settings.homepageBanner?.buttonText}
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>

      </main>

      <SiteFooter settings={settings} />
    </div>
  );
}

    