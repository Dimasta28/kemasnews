
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';

import type { Post } from '@/services/postService';
import type { Category } from '@/services/categoryService';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { ChevronDownIcon, Search } from 'lucide-react';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';


// Helper for category styling
const categoryStyles: { [key: string]: { name: string; className: string } } = {
  technology: { name: 'Technology', className: 'bg-[#610C27] text-[#EFECE9]' },
  lifestyle: { name: 'Lifestyle', className: 'bg-[#E3C1B4] text-[#050505]' },
  business: { name: 'Business', className: 'bg-[#AC9C8D] text-[#050505]' },
  desain: { name: 'Design', className: 'bg-[#610C27] text-[#EFECE9]' },
  inovasi: { name: 'Innovation', className: 'bg-[#E3C1B4] text-[#050505]' },
  tren: { name: 'Trends', className: 'bg-[#AC9C8D] text-[#050505]' },
  pendidikan: { name: 'Education', className: 'bg-[#DDD9CE] text-[#050505]' },
  // A default style
  default: { name: 'Others', className: 'bg-[#DDD9CE] text-[#050505]' },
};

// Main Application Component
export default function HomeClient({ initialPosts, allCategories }: { initialPosts: Post[], allCategories: Category[] }) {
  const articlesSectionRef = useRef<HTMLElement>(null);
  
  const [articles, setArticles] = useState<Post[]>(initialPosts);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const articlesPerPage = 15;

  useEffect(() => {
    let filtered = initialPosts;

    // Filter by active category
    if (activeFilter !== 'All') {
      filtered = filtered.filter(post => post.category === activeFilter);
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

  // Pagination logic
  const totalPages = Math.ceil(articles.length / articlesPerPage);
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      articlesSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const tabCategories = [...allCategories]
    .sort((a, b) => b.postCount - a.postCount)
    .slice(0, 3)
    .map(c => c.name);

  return (
    <div className="font-inter antialiased bg-[#EFECE9] dark:bg-[#050505] text-[#050505] dark:text-[#EFECE9] min-h-screen">
      <SiteHeader />

      <main>
        <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center text-center overflow-hidden bg-cover bg-center">
          <Image
            src="https://placehold.co/1920x1080.png"
            alt="Hero background"
            layout="fill"
            objectFit="cover"
            className="z-0"
            data-ai-hint="cosmetics background"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 dark:bg-opacity-60 z-10"></div>
          <div className="relative z-20 text-[#EFECE9] p-6 max-w-3xl">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 drop-shadow-lg"
            >
              Latest Insights from the World of Cosmetics
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl mb-8 drop-shadow-md"
            >
              Explore selected articles on trends, innovation, and packaging strategies for cosmetics.
            </motion.p>
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: '0px 8px 20px rgba(0,0,0,0.3)',
              }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#610C27] hover:bg-opacity-90 text-[#EFECE9] font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300"
              onClick={() => articlesSectionRef.current?.scrollIntoView({ behavior: 'smooth' })}
            >
              Read Articles
            </motion.button>
          </div>
        </section>

        <section
          className={`sticky z-40 bg-background/95 p-4 border-b border-border shadow-sm top-[72px] backdrop-blur-sm`}
        >
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <Tabs value={activeFilter} onValueChange={setActiveFilter} className="overflow-x-auto scrollbar-hide">
              <TabsList>
                <TabsTrigger value="All">All</TabsTrigger>
                {tabCategories.map((catName) => (
                  <TabsTrigger key={catName} value={catName}>
                    {catName}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
        
            <div className="flex items-center gap-2 w-full md:w-auto">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex-shrink-0">
                    Categories
                    <ChevronDownIcon className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Filter by Category</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {allCategories.map((category) => (
                    <DropdownMenuItem key={category.id} onSelect={() => setActiveFilter(category.name)}>
                      {category.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
        
              <div className="relative w-full md:w-auto">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search articles..."
                  className="pl-9 w-full md:w-auto"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </section>

        <section
          ref={articlesSectionRef}
          className="py-12 bg-[#EFECE9] dark:bg-[#050505]"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-10">
              Latest Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentArticles.length > 0 ? (
                currentArticles.map((article) => {
                  const categoryStyle =
                    categoryStyles[
                      article.category.toLowerCase() as keyof typeof categoryStyles
                    ] || categoryStyles.default;
                  return (
                    <Link href={`/post/${article.id}`} key={article.id} className="block h-full">
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.5 }}
                            className="bg-[#DDD9CE] dark:bg-[#AC9C8D] rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden h-full flex flex-col"
                        >
                            <div className="relative w-full h-48">
                                <Image
                                    src={article.featuredImage}
                                    alt={article.title}
                                    layout="fill"
                                    objectFit="cover"
                                    className="w-full h-full"
                                    data-ai-hint="cosmetics packaging"
                                />
                            </div>
                            <div className="p-5 flex-grow flex flex-col">
                                <span
                                className={`inline-block ${categoryStyle.className} text-xs font-semibold px-3 py-1 rounded-full mb-3 self-start`}
                                >
                                {categoryStyle.name}
                                </span>
                                <h3 className="text-xl font-semibold mb-2 line-clamp-2 text-[#050505] dark:text-[#050505] flex-grow">
                                {article.title}
                                </h3>
                                <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-600 mt-auto pt-4 border-t border-gray-400/30">
                                <span>
                                    {article.author} | {article.date}
                                </span>
                                </div>
                            </div>
                        </motion.div>
                    </Link>
                  );
                })
              ) : (
                <div className="col-span-full text-center py-10">
                  <p className="text-muted-foreground">
                    No posts found for the selected filter.
                  </p>
                </div>
              )}
            </div>

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
          </div>
        </section>

        <section className="py-20 bg-[#610C27] text-[#EFECE9] text-center">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
              Don't Miss the Latest Insights!
            </h2>
            <p className="text-lg md:text-xl mb-8">
              Join our community and get exclusive articles, tips, and news delivered straight to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full sm:w-80 p-3 rounded-full text-[#050505] focus:outline-none focus:ring-2 focus:ring-[#EFECE9]"
              />
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0px 6px 15px rgba(0,0,0,0.2)',
                }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#EFECE9] text-[#610C27] font-bold py-3 px-8 rounded-full shadow-lg hover:bg-[#DDD9CE] transition-colors duration-300"
              >
                Subscribe Now
              </motion.button>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

    