
'use client';

import React from 'react';
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

  const handleSelect = (postId: string) => {
    onOpenChange(false);
    router.push(`/post/${postId}`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-hidden p-0 shadow-lg top-[25%]">
        <DialogTitle className="sr-only">Search Posts</DialogTitle>
        <Command>
          <CommandInput placeholder="Search posts..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Posts">
              {posts.map((post) => (
                <CommandItem
                  key={post.id}
                  value={`${post.title} ${post.description} ${post.tags.join(' ')}`}
                  onSelect={() => handleSelect(post.id)}
                  className="cursor-pointer"
                >
                  <FileText className="mr-2 h-4 w-4" />
                  <div className="flex flex-col">
                    <span>{post.title}</span>
                    <span className="text-sm text-muted-foreground">
                        {post.categories.join(', ')} &bull; {format(parseISO(post.date), "dd LLL yyyy")}
                    </span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
