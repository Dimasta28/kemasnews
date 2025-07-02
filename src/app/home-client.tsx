
'use client';

import * as React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Autoplay from 'embla-carousel-autoplay';

import type { Post } from '@/services/postService';
import type { Category } from '@/services/categoryService';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
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
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';


// Helper for category styling
const categoryStyles: { [key: string]: string } = {
  technology: 'bg-[#610C27] text-[#EFECE9]',
  lifestyle: 'bg-[#E3C1B4] text-[#050505]',
  business: 'bg-[#AC9C8D] text-[#050505]',
  desain: 'bg-[#610C27] text-[#EFECE9]',
  inovasi: 'bg-[#E3C1B4] text-[#050505]',
  tren: 'bg-[#AC9C8D] text-[#050505]',
  pendidikan: 'bg-[#DDD9CE] text-[#050505]',
  event: 'bg-[#E3C1B4] text-[#050505]',
  'press release': 'bg-[#610C27] text-[#EFECE9]',
  products: 'bg-[#AC9C8D] text-[#050505]',
  sustainability: 'bg-[#DDD9CE] text-[#050505]',
  // A default style
  default: 'bg-muted text-muted-foreground',
};

// Main Application Component
export default function HomeClient({ initialPosts, allCategories }: { initialPosts: Post[], allCategories: Category[] }) {
  const articlesSectionRef = React.useRef<HTMLElement>(null);
  const autoplayPlugin = React.useRef(Autoplay({ delay: 5000, stopOnInteraction: true }));
  
  const latestPosts = initialPosts.slice(0, 3);

  const [articles, setArticles] = React.useState<Post[]>(initialPosts);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [activeFilter, setActiveFilter] = React.useState('All');
  const [searchTerm, setSearchTerm] = React.useState('');
  const articlesPerPage = 12;

  React.useEffect(() => {
    let filtered = initialPosts;

    // Filter by active category
    if (activeFilter !== 'All') {
      filtered = filtered.filter(post => post.categories.includes(activeFilter));
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setArticles(filtered);
    setCurrentPage(1); // Reset page on new filter
  }, [activeFilter, searchTerm, initialPosts]);

  const handleFilterChange = (filter: string) => {
    if (!filter) return; // Prevent unselecting the toggle
    setActiveFilter(filter);
    setCurrentPage(1);
    articlesSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

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
        {latestPosts.length > 0 ? (
          <section>
            <Carousel
              plugins={[autoplayPlugin.current]}
              className="relative w-full"
              onMouseEnter={autoplayPlugin.current.stop}
              onMouseLeave={autoplayPlugin.current.reset}
            >
              <CarouselContent>
                {latestPosts.map((post, index) => {
                   const firstCategory = post.categories?.[0] || '';
                   const categoryClass = categoryStyles[firstCategory.toLowerCase().trim() as keyof typeof categoryStyles] || categoryStyles.default;
                  return (
                    <CarouselItem key={post.id}>
                      <div className="relative h-[80vh] md:h-[90vh] flex items-end p-8 md:p-12 text-white bg-black">
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
                                          className={`inline-block ${categoryClass} text-xs font-semibold px-3 py-1 rounded-full mb-4`}
                                      >
                                          {firstCategory}
                                      </span>
                                  )}
                                  <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 group-hover:underline">
                                      {post.title}
                                  </h1>
                                  <p className="text-lg text-gray-300 line-clamp-2">
                                     {post.description}
                                  </p>
                              </Link>
                          </div>
                      </div>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
              <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-20 h-10 w-10 text-white bg-black/20 hover:bg-black/50 border-white/50 hover:border-white" />
              <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-20 h-10 w-10 text-white bg-black/20 hover:bg-black/50 border-white/50 hover:border-white" />
            </Carousel>
          </section>
        ) : (
            <section className="relative h-[80vh] md:h-[90vh] flex items-center justify-center text-center overflow-hidden bg-cover bg-center">
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
            <ToggleGroup
              type="single"
              defaultValue="All"
              value={activeFilter}
              onValueChange={handleFilterChange}
              className="flex-wrap justify-center gap-2"
            >
              <ToggleGroupItem value="All" aria-label="Filter by All">All Topics</ToggleGroupItem>
              {sortedUniqueCategories.map((category) => (
                <ToggleGroupItem key={category.id} value={category.name} aria-label={`Filter by ${category.name}`}>
                  {category.name}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>
        </section>

        <section ref={articlesSectionRef} className="pt-12 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold self-start sm:self-center">
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
                <div className="flex justify-center">
                    <div className="inline-grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {currentArticles.map((article) => {
                            const firstCategory = article.categories?.[0] || '';
                            const categoryClass = categoryStyles[firstCategory.toLowerCase().trim() as keyof typeof categoryStyles] || categoryStyles.default;
                            return (
                                <Link href={`/post/${article.id}`} key={article.id} className="block h-full">
                                    <motion.div
                                        initial={{ opacity: 0, y: 50 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, amount: 0.2 }}
                                        transition={{ duration: 0.5 }}
                                        className="bg-card/80 dark:bg-card rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden h-full flex flex-col"
                                    >
                                        <div className="relative w-full aspect-video">
                                            <Image
                                                src={article.featuredImage}
                                                alt={article.title}
                                                fill
                                                className="object-cover"
                                                data-ai-hint="cosmetics packaging"
                                            />
                                        </div>
                                        <div className="p-5 flex-grow flex flex-col">
                                            {firstCategory && (
                                                <span
                                                className={`inline-block ${categoryClass} text-xs font-semibold px-3 py-1 rounded-full mb-3 self-start`}
                                                >
                                                {firstCategory}
                                                </span>
                                            )}
                                            <h3 className="text-xl font-semibold mb-2 line-clamp-2 text-card-foreground">
                                            {article.title}
                                            </h3>
                                            {article.description && (
                                            <p className="text-sm text-muted-foreground/90 line-clamp-3 mb-4">
                                                {article.description}
                                            </p>
                                            )}
                                            <div className="flex items-center justify-between text-xs text-muted-foreground mt-auto pt-4 border-t border-border/30">
                                            <span>
                                                {article.author} | {article.date}
                                            </span>
                                            </div>
                                        </div>
                                    </motion.div>
                                </Link>
                            );
                        })}
                    </div>
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

      </main>

      <SiteFooter />
    </div>
  );
}
