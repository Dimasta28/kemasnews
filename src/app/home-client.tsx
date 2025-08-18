
'use client';

import React, { useState, useEffect } from 'react';
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
import { Search, Filter } from 'lucide-react';
import { SiteFooter } from '@/components/site-footer';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';

// Main Application Component
export default function HomeClient({ heroPosts, allCategories, settings, error }: { heroPosts: Post[], allCategories: Category[], settings: FrontendSettings | null, error?: string | null }) {
  // State for all posts, updated in realtime
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [postsByCategory, setPostsByCategory] = useState<Record<string, Post[]>>({});
  const [selectedCategory, setSelectedCategory] = useState('All');

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
    const groupedPosts: Record<string, Post[]> = {};
    allCategories.forEach(category => {
        const postsInCategory = allPosts.filter(post => post.categories.includes(category.name));
        if (postsInCategory.length > 0) {
            groupedPosts[category.name] = postsInCategory;
        }
    });
    setPostsByCategory(groupedPosts);
  }, [allPosts, allCategories]);

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

  const displayedCategories = selectedCategory === 'All' 
    ? allCategories 
    : allCategories.filter(category => category.name === selectedCategory);
  
  return (
    <div className="font-sans antialiased bg-background text-foreground min-h-screen">
      <main>
        <section className="pt-12 lg:py-16">
          <div className="w-full overflow-x-auto scrollbar-hide px-4">
            <div className="grid grid-flow-col auto-cols-[calc(100%/1.1)] sm:auto-cols-[calc(100%/2.1)] md:auto-cols-[calc(100%/2.5)] lg:auto-cols-[calc(100%/3.1)] gap-4">
              {heroPosts.map((post) => (
                <div key={post.id} className="relative aspect-video md:aspect-[16/10] w-full overflow-hidden">
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
                    <div className="absolute bottom-0 left-0 p-6 text-white">
                      <h2 className="text-xl md:text-2xl font-bold">{post.title}</h2>
                      <p className="mt-2 text-xs md:text-sm max-w-2xl line-clamp-2">{post.description}</p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <Separator className="mt-8"/>
            <div className="flex flex-col gap-4 my-8">
                <div className="relative w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input type="search" placeholder="Search articles..." className="pl-10 w-full" />
                </div>
                <div className="overflow-x-auto scrollbar-hide -mx-4 px-4 sm:px-0 py-2">
                    <div className="flex w-max items-center gap-3 flex-nowrap">
                        <Button 
                            variant={selectedCategory === 'All' ? 'secondary' : 'ghost'} 
                            size="sm" 
                            className="shrink-0"
                            onClick={() => setSelectedCategory('All')}
                        >
                            All
                        </Button>
                        {allCategories.map(category => (
                            <Button 
                                key={category.id} 
                                variant={selectedCategory === category.name ? 'secondary' : 'ghost'} 
                                size="sm" 
                                className="shrink-0"
                                onClick={() => setSelectedCategory(category.name)}
                            >
                                {category.name}
                            </Button>
                        ))}
                    </div>
                </div>
            </div>
            <Separator />
        </div>

        <div className="space-y-12 lg:space-y-16 mt-8">
            {displayedCategories.map((category, index) => {
              const posts = postsByCategory[category.name];
              if (!posts || posts.length === 0) return null;

              return (
                <React.Fragment key={category.id}>
                <section>
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-2xl md:text-3xl font-bold">{category.name}</h2>
                             <Button asChild variant="link" className="pr-0">
                               <Link href={`/category/${category.slug}`}>
                                   View all
                               </Link>
                            </Button>
                        </div>
                        <Carousel
                            opts={{
                                align: "start",
                                loop: posts.length > 3,
                            }}
                            className="w-full"
                        >
                            <CarouselContent className="-ml-4">
                                {posts.map((post) => (
                                    <CarouselItem key={post.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                                        <Card className="overflow-hidden group border-none shadow-none bg-transparent">
                                            <CardContent className="p-0">
                                                <Link href={`/post/${post.id}`}>
                                                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
                                                        <Image
                                                            src={post.featuredImage}
                                                            alt={post.title}
                                                            fill
                                                            className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                                                            data-ai-hint="cosmetics packaging"
                                                        />
                                                    </div>
                                                    <div className="p-4 pl-1">
                                                        <p className="text-sm text-muted-foreground mb-1">{post.categories.join(', ')}</p>
                                                        <h3 className="font-semibold line-clamp-2">{post.title}</h3>
                                                        <p className="text-sm text-muted-foreground mt-1">
                                                            {format(parseISO(post.date), "dd LLL yyyy")}
                                                        </p>
                                                    </div>
                                                </Link>
                                            </CardContent>
                                        </Card>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                             {posts.length > 3 && (
                                <>
                                <CarouselPrevious className="left-[-50px] top-1/2 -translate-y-1/2 hidden lg:flex" />
                                <CarouselNext className="right-[-50px] top-1/2 -translate-y-1/2 hidden lg:flex" />
                                </>
                            )}
                        </Carousel>
                    </div>
                </section>
                {index < displayedCategories.length - 1 && (
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <Separator />
                    </div>
                )}
                </React.Fragment>
              );
            })}
        </div>
      </main>
      <SiteFooter settings={settings} />
    </div>
  );
}
