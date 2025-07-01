
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Twitter, Facebook, Linkedin, Link2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

export function SocialShare({ title }: { title: string }) {
  const [postUrl, setPostUrl] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    // This ensures we only get the URL on the client side
    setPostUrl(window.location.href);
  }, []);

  const encodedUrl = encodeURIComponent(postUrl);
  const encodedTitle = encodeURIComponent(title);

  const socialLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`,
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(postUrl);
    toast({
      title: 'Copied to Clipboard!',
      description: 'The post URL has been copied.',
    });
  };

  const buttonVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.1 },
    tap: { scale: 0.95 }
  };

  return (
    <div className="flex items-center gap-2">
      <h4 className="text-sm font-semibold text-muted-foreground mr-2 hidden sm:block">Share:</h4>
      <motion.a
        href={socialLinks.twitter}
        target="_blank"
        rel="noopener noreferrer"
        variants={buttonVariants}
        initial="rest"
        whileHover="hover"
        whileTap="tap"
        aria-label="Share on Twitter"
      >
        <Button variant="outline" size="icon" className="rounded-full">
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
      >
        <Button variant="outline" size="icon" className="rounded-full">
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
      >
        <Button variant="outline" size="icon" className="rounded-full">
            <Linkedin className="h-4 w-4" />
        </Button>
      </motion.a>
      <motion.div
        variants={buttonVariants}
        initial="rest"
        whileHover="hover"
        whileTap="tap"
      >
        <Button variant="outline" size="icon" className="rounded-full" onClick={copyToClipboard} aria-label="Copy link">
            <Link2 className="h-4 w-4" />
        </Button>
      </motion.div>
    </div>
  );
}
