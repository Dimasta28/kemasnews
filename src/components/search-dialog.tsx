'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import type { Post } from '@/services/postService';
import { FileText } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { Card, CardContent } from './ui/card';

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  posts: Post[];
}

export function SearchDialog({ open, onOpenChange, posts }: SearchDialogProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);

  const handleSelect = (postId: string) => {
    onOpenChange(false);
    router.push(`/post/${postId}`);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
        onOpenChange(false);
        router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  }

  useEffect(() => {
    if (query.trim() === '') {
        setFilteredPosts([]);
    } else {
        const searchResults = posts.filter(post => 
            post.title.toLowerCase().includes(query.toLowerCase()) || 
            post.description.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredPosts(searchResults);
    }
  }, [query, posts]);

  // Clear query when dialog opens/closes
  useEffect(() => {
    if(!open) {
        setQuery('');
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-hidden p-0 shadow-lg top-[25%] sm:max-w-6xl">
        <DialogTitle className="sr-only">Search Posts</DialogTitle>
        <form onSubmit={handleSearchSubmit}>
        <Command shouldFilter={false} className="[&_[cmdk-list]]:max-h-[initial] [&_[cmdk-list]]:overflow-visible">
          <CommandInput 
            placeholder="Search all articles..." 
            value={query}
            onValueChange={setQuery}
          />
          <CommandList>
            {filteredPosts.length === 0 && !query ? (
              <>
                <div className="p-4 border-b">
                    <h2 className="text-sm font-medium text-muted-foreground mb-4">Suggestions</h2>
                    <Carousel
                        opts={{
                            align: "start",
                            loop: posts.length > 4,
                        }}
                        className="w-full"
                    >
                        <CarouselContent className="-ml-2">
                            {posts.slice(0, 5).map((post) => (
                                <CarouselItem key={post.id} className="pl-2 basis-1/2 md:basis-1/3 lg:basis-1/4">
                                     <button type="button" onClick={() => handleSelect(post.id)} className="w-full text-left">
                                        <Card className="overflow-hidden group border-border hover:border-primary transition-all duration-300">
                                            <CardContent className="p-0">
                                                <div className="relative aspect-[4/3] w-full overflow-hidden">
                                                    <Image
                                                        src={post.featuredImage}
                                                        alt={post.title}
                                                        fill
                                                        className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                                                        data-ai-hint="cosmetics packaging"
                                                    />
                                                </div>
                                                <div className="p-2">
                                                    <h3 className="font-semibold line-clamp-2 text-sm">{post.title}</h3>
                                                    <p className="text-xs text-muted-foreground mt-1">
                                                        {format(parseISO(post.date), "dd LLL yyyy")}
                                                    </p>
                                                </div>
                                            </CardContent>
                                        </Card>
                                     </button>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="left-[-16px]" />
                        <CarouselNext className="right-[-16px]" />
                    </Carousel>
                </div>
                <CommandEmpty className="py-6">No results found.</CommandEmpty>
              </>
            ) : (
              <>
                 <CommandEmpty>No results found.</CommandEmpty>
                 <CommandGroup heading="Results">
                  {filteredPosts.map((post) => (
                    <CommandItem
                      key={post.id}
                      value={post.title}
                      onSelect={() => handleSelect(post.id)}
                      className="cursor-pointer"
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      <div className="flex flex-col">
                        <span>{post.title}</span>
                        <span className="text-xs text-muted-foreground">
                          {format(parseISO(post.date), 'dd LLL yyyy')}
                        </span>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
        </form>
      </DialogContent>
    </Dialog>
  );
}
