'use client';

import { motion } from 'framer-motion';
import { Twitter, Facebook, Linkedin, Link2 } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import * as React from 'react';
import { cn } from '@/lib/utils';

export function SocialShare({ title, url }: { title: string, url: string }) {
  const { toast } = useToast();

  if (!url) {
    return null;
  }

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const socialLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`,
  };

  const handleShareClick = (e: React.MouseEvent, shareUrl: string) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(shareUrl, '_blank', 'noopener,noreferrer');
  };

  const copyToClipboard = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(url);
    toast({
      title: 'Copied to Clipboard!',
      description: 'The post URL has been copied.',
    });
  };

  const buttonVariantsMotion = {
    rest: { scale: 1 },
    hover: { scale: 1.1 },
    tap: { scale: 0.95 }
  };

  return (
    <div className="flex items-center gap-0.5">
      <motion.a
        href={socialLinks.twitter}
        onClick={(e) => handleShareClick(e, socialLinks.twitter)}
        aria-label="Share on Twitter"
        className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }), 'rounded-full h-8 w-8')}
        variants={buttonVariantsMotion}
        initial="rest"
        whileHover="hover"
        whileTap="tap"
      >
        <Twitter className="h-4 w-4" />
      </motion.a>
      <motion.a
        href={socialLinks.facebook}
        onClick={(e) => handleShareClick(e, socialLinks.facebook)}
        aria-label="Share on Facebook"
        className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }), 'rounded-full h-8 w-8')}
        variants={buttonVariantsMotion}
        initial="rest"
        whileHover="hover"
        whileTap="tap"
      >
        <Facebook className="h-4 w-4" />
      </motion.a>
      <motion.a
        href={socialLinks.linkedin}
        onClick={(e) => handleShareClick(e, socialLinks.linkedin)}
        aria-label="Share on LinkedIn"
        className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }), 'rounded-full h-8 w-8')}
        variants={buttonVariantsMotion}
        initial="rest"
        whileHover="hover"
        whileTap="tap"
      >
        <Linkedin className="h-4 w-4" />
      </motion.a>
      <motion.div
        variants={buttonVariantsMotion}
        initial="rest"
        whileHover="hover"
        whileTap="tap"
      >
        <Button variant="ghost" size="icon" className="rounded-full h-8 w-8" onClick={copyToClipboard} aria-label="Copy link">
          <Link2 className="h-4 w-4" />
        </Button>
      </motion.div>
    </div>
  );
}
