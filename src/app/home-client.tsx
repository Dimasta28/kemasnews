
'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Autoplay from "embla-carousel-autoplay";


// Firebase imports
import { db } from '@/lib/firebase';
import { collection, query, orderBy, onSnapshot, Timestamp } from 'firebase/firestore';

// Component imports
import type { Post } from '@/services/postService';
import type { Category } from '@/services/categoryService';
import type { FrontendSettings } from '@/services/settingsService';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext as PaginationNextBtn,
  PaginationPrevious as PaginationPreviousBtn,
} from '@/components/ui/pagination';
import { Search } from 'lucide-react';
import { SiteFooter } from '@/components/site-footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';
import { format, parseISO } from 'date-fns';

// Main Application Component
export default function HomeClient({ heroPosts, allCategories, settings, error }: { heroPosts: Post[], allCategories: Category[], settings: FrontendSettings | null, error?: string | null }) {
  const articlesSectionRef = useRef<HTMLElement>(null);
  
  const searchParams = useSearchParams();
  const q = searchParams.get('q');

  // State for all posts, updated in realtime
  const [allPosts, setAllPosts] = useState<Post[]>([]);

  const [articles, setArticles] = useState<Post[]>(allPosts);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState(q || '');
  const articlesPerPage = 9;

  // Set up a real-time listener for posts
  useEffect(() => {
    // This effect runs once on mount on the client side
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
                date: date.toISOString(), // Keep it as ISO string
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
  
  return (
    <div className="font-sans antialiased bg-background text-foreground min-h-screen">
      <main>
        <section className="py-12 lg:py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              plugins={[
                Autoplay({
                  delay: 5000,
                }),
              ]}
              className="w-full"
            >
              <CarouselContent>
                {heroPosts.map((post) => (
                  <CarouselItem key={post.id}>
                    <div className="relative aspect-video md:aspect-[2.4/1] w-full rounded-2xl overflow-hidden">
                       <Link href={`/post/${post.id}`}>
                        <Image
                            src={post.featuredImage}
                            alt={post.title}
                            fill
                            className="object-cover"
                            data-ai-hint="hero image"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
                        <div className="absolute bottom-0 left-0 p-8 text-white">
                            <h2 className="text-2xl md:text-4xl font-bold">{post.title}</h2>
                            <p className="mt-2 text-sm md:text-base max-w-2xl line-clamp-2">{post.description}</p>
                        </div>
                       </Link>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-4" />
              <CarouselNext className="right-4" />
            </Carousel>
          </div>
        </section>

        <section ref={articlesSectionRef} className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">

                {/* Filters and Search */}
                <div className="mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex-grow w-full md:w-auto relative">
                        <Input 
                            placeholder="Search articles..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 h-11 text-base"
                        />
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="flex-shrink-0 flex items-center gap-2 overflow-x-auto scrollbar-hide pb-2 -mb-2">
                        <Button
                            variant={activeFilter === 'All' ? 'default' : 'outline'}
                            onClick={() => setActiveFilter('All')}
                            className="rounded-full"
                        >
                            All
                        </Button>
                        {allCategories.map(cat => (
                             <Button
                                key={cat.id}
                                variant={activeFilter === cat.name ? 'default' : 'outline'}
                                onClick={() => setActiveFilter(cat.name)}
                                className="rounded-full"
                            >
                                {cat.name}
                            </Button>
                        ))}
                    </div>
                </div>

              {currentArticles.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                      {currentArticles.map((article) => {
                          const firstCategory = article.categories?.[0] || 'Uncategorized';
                          return (
                              <motion.div
                                  key={article.id}
                                  initial={{ opacity: 0, y: 20 }}
                                  whileInView={{ opacity: 1, y: 0 }}
                                  viewport={{ once: true, amount: 0.2 }}
                                  transition={{ duration: 0.5 }}
                                  className="group relative flex flex-col"
                              >
                                  <div className="absolute left-0 top-0 flex items-center h-full -translate-x-full pr-4">
                                      <span className="text-xs text-muted-foreground/80 transform -rotate-90 whitespace-nowrap tracking-widest uppercase">
                                        {format(parseISO(article.date), 'dd LLL yyyy')}
                                      </span>
                                  </div>
                                  <div className="overflow-hidden mb-6">
                                      <Link href={`/post/${article.id}`}>
                                          <Image
                                              src={article.featuredImage}
                                              alt={article.title}
                                              width={600}
                                              height={400}
                                              className="w-full object-cover aspect-[4/3] transition-transform duration-500 ease-in-out group-hover:scale-105"
                                              data-ai-hint="cosmetics packaging"
                                          />
                                      </Link>
                                  </div>
                                  <div className="flex flex-col">
                                    <div className="text-sm text-muted-foreground mb-2">
                                        <span>{firstCategory}</span>
                                        <span className="mx-2">&bull;</span>
                                        <span>By {article.author}</span>
                                    </div>
                                      <h3 className="text-xl font-semibold mb-2 line-clamp-2 text-foreground flex-grow">
                                        <Link href={`/post/${article.id}`} className="hover:text-primary transition-colors focus:underline">
                                          {article.title}
                                        </Link>
                                      </h3>
                                  </div>
                              </motion.div>
                          );
                      })}
                  </div>
              ) : (
                  <div className="text-center py-10 col-span-full">
                      <p className="text-muted-foreground">
                          No posts found for the current selection.
                      </p>
                  </div>
              )}

              {totalPages > 1 && (
              <div className="flex justify-center mt-16">
                  <Pagination>
                  <PaginationContent>
                      <PaginationItem>
                      <PaginationPreviousBtn
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
                      <PaginationNextBtn
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
            </div>
        </section>
      </main>
      <SiteFooter settings={settings} />
    </div>
  );
}
