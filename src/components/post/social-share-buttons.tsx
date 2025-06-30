"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Facebook, Linkedin, Link as LinkIcon, Twitter } from "lucide-react";

type SocialShareButtonsProps = {
  title: string;
};

export function SocialShareButtons({ title }: SocialShareButtonsProps) {
  const [url, setUrl] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    // This runs only on the client, after the component has mounted
    setUrl(window.location.href);
  }, []);

  if (!url) {
    // Render nothing or a placeholder on the server and during initial client render
    return <div className="h-10" />;
  }

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const socialLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`,
  };

  const copyLink = () => {
    navigator.clipboard.writeText(url).then(() => {
      toast({
        title: "Link Copied!",
        description: "The article link has been copied to your clipboard.",
      });
    }).catch(err => {
      console.error("Failed to copy text: ", err);
      toast({
        variant: "destructive",
        title: "Copy Failed",
        description: "Could not copy the link. Please try again.",
      });
    });
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-muted-foreground hidden sm:block">Share:</span>
      <Button
        variant="outline"
        size="icon"
        asChild
        aria-label="Share on Twitter"
      >
        <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer">
          <Twitter className="h-4 w-4" />
        </a>
      </Button>
      <Button
        variant="outline"
        size="icon"
        asChild
        aria-label="Share on Facebook"
      >
        <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer">
          <Facebook className="h-4 w-4" />
        </a>
      </Button>
      <Button
        variant="outline"
        size="icon"
        asChild
        aria-label="Share on LinkedIn"
      >
        <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
          <Linkedin className="h-4 w-4" />
        </a>
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={copyLink}
        aria-label="Copy link"
      >
        <LinkIcon className="h-4 w-4" />
      </Button>
    </div>
  );
}
