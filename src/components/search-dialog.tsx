
'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import type { Post } from '@/services/postService';
import { FileText } from 'lucide-react';
import { format, parseISO } from 'date-fns';

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  posts: Post[];
}

export function SearchDialog({ open, onOpenChange, posts }: SearchDialogProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');

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

  // Clear query when dialog opens/closes
  useEffect(() => {
    if(!open) {
        setQuery('');
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-hidden p-0 shadow-lg top-[25%]">
        <DialogTitle className="sr-only">Search Posts</DialogTitle>
        <form onSubmit={handleSearchSubmit}>
        <Command shouldFilter={false}>
          <CommandInput 
            placeholder="Search all articles..." 
            value={query}
            onValueChange={setQuery}
          />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              {posts.slice(0, 5).map((post) => (
                <CommandItem
                  key={post.id}
                  value={post.title}
                  onSelect={() => handleSelect(post.id)}
                  className="cursor-pointer"
                >
                  <FileText className="mr-2 h-4 w-4" />
                  <div className="flex flex-col">
                    <span>{post.title}</span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
        </form>
      </DialogContent>
    </Dialog>
  );
}
