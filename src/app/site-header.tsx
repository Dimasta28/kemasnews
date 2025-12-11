
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu as MenuIcon,
  Bell as BellIcon,
  Sun,
  Moon,
  ChevronDown as ChevronDownIcon,
  X as XIcon,
} from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import type { FrontendSettings } from '@/services/settingsService';
import { Button, buttonVariants } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { Input } from './ui/input';
import { Post } from '@/services/postService';

interface SiteHeaderProps {
  settings: FrontendSettings;
  posts: Post[];
}


export function SiteHeader({ 
    settings: initialSettings, 
    posts: allPosts,
}: SiteHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  
  const [settings, setSettings] = useState(initialSettings);

  // This effect will sync state if the initial props change (e.g., on navigation)
  useEffect(() => {
    setSettings(initialSettings);
  }, [initialSettings]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  

  return (
    <>
      <header
        className={cn(
            "fixed top-0 z-50 w-full transition-all",
            isScrolled ? "bg-primary" : "bg-transparent"
        )}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
                <div className="flex items-center">
                    <Link href="/" className="flex-shrink-0">
                        <Image
                            src={settings.darkModeLogoUrl}
                            alt="Kemas Logo"
                            width={150}
                            height={37}
                            priority
                        />
                    </Link>
                </div>
                
                <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-white">
                    <Link href="/" className="hover:text-primary-foreground/80 transition-colors">Home</Link>
                    <Link href="/our-solutions" className="hover:text-primary-foreground/80 transition-colors">Our Solutions</Link>
                </nav>

                 <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsMobileMenuOpen(true)}
                    className="md:hidden p-2 hover:bg-secondary rounded-full transition text-white"
                  >
                    <MenuIcon size={20} />
                  </button>
                </div>
            </div>
        </div>
      </header>
      
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-0 bg-background z-[100] flex flex-col p-8 md:hidden"
          >
             <div className="flex items-center justify-between mb-8">
                <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                  <Image
                    src={settings.lightModeLogoUrl}
                    alt="Kemas Logo"
                    width={150}
                    height={37}
                  />
                </Link>
                <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-full hover:bg-secondary transition-colors"
                    >
                    <XIcon size={24} />
                </button>
             </div>

            <nav className="text-left w-full">
                <ul className="space-y-2 text-xl font-medium">
                    <li>
                        <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="block py-2">Home</Link>
                    </li>
                     <li>
                        <Link href="/our-solutions" onClick={() => setIsMobileMenuOpen(false)} className="block py-2">Our Solutions</Link>
                    </li>
                </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
