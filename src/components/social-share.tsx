'use client';

import { motion } from 'framer-motion';
import { Twitter, Facebook, Linkedin, Link2, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import * as React from 'react';

export function SocialShare({ title, url }: { title: string, url: string }) {
  const { toast } = useToast();

  if (!url) {
    return null; // Don't render if the URL isn't ready yet
  }

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const socialLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`,
  };

  const copyToClipboard = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    navigator.clipboard.writeText(url);
    toast({
      title: 'Copied to Clipboard!',
      description: 'The post URL has been copied.',
    });
  };

  const handleTriggerClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
  }

  const handleLinkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const buttonVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.1 },
    tap: { scale: 0.95 }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full h-8 w-8 data-[state=open]:bg-accent"
          onClick={handleTriggerClick}
          aria-label="Share post"
        >
          <Share2 className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-1" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-1">
          <motion.a
            href={socialLinks.twitter}
            target="_blank"
            rel="noopener noreferrer"
            variants={buttonVariants}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
            aria-label="Share on Twitter"
            onClick={handleLinkClick}
          >
            <Button variant="ghost" size="icon" className="rounded-full">
              <Twitter className="h-4 w-4" />
            </Button>
          </motion.a>
          <motion.a
            href={socialLinks.facebook}
            target="_blank"
            rel="noopener noreferrer"
            variants={buttonVariants}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
            aria-label="Share on Facebook"
            onClick={handleLinkClick}
          >
            <Button variant="ghost" size="icon" className="rounded-full">
              <Facebook className="h-4 w-4" />
            </Button>
          </motion.a>
          <motion.a
            href={socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            variants={buttonVariants}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
            aria-label="Share on LinkedIn"
            onClick={handleLinkClick}
          >
            <Button variant="ghost" size="icon" className="rounded-full">
              <Linkedin className="h-4 w-4" />
            </Button>
          </motion.a>
          <motion.div
            variants={buttonVariants}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
          >
            <Button variant="ghost" size="icon" className="rounded-full" onClick={copyToClipboard} aria-label="Copy link">
              <Link2 className="h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
