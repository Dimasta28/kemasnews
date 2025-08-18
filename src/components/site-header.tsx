
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import {
  Menu as MenuIcon,
  Bell as BellIcon,
  Sun,
  Moon,
  Search,
  ChevronDown as ChevronDownIcon,
  X as XIcon,
} from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import type { FrontendSettings } from '@/services/settingsService';
import { Button, buttonVariants } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import {
  markAllNotificationsAsRead,
  markNotificationAsRead,
  type Notification,
} from '@/services/notificationService';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

interface SiteHeaderProps {
  settings: FrontendSettings;
  notifications: Notification[];
}


export function SiteHeader({ 
    settings: initialSettings, 
    notifications: initialNotifications,
}: SiteHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { toast } = useToast();
  
  const [notifications, setNotifications] = useState(initialNotifications || []);
  const [settings, setSettings] = useState(initialSettings);

  // This effect will sync state if the initial props change (e.g., on navigation)
  useEffect(() => {
    setNotifications(initialNotifications || []);
  }, [initialNotifications]);

  useEffect(() => {
    setSettings(initialSettings);
  }, [initialSettings]);

  const hasUnread = notifications.some(n => !n.read);

  const handleMarkAsRead = async (id: string) => {
    try {
      await markNotificationAsRead(id);
      // Manually update state
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    } catch (error) {
        toast({ variant: 'destructive', title: 'Error', description: 'Could not mark notification as read.' });
    }
  };
  
  const handleMarkAllAsRead = async () => {
    try {
      await markAllNotificationsAsRead();
      // Manually update state
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    } catch (error) {
        toast({ variant: 'destructive', title: 'Error', description: 'Could not mark all as read.' });
    }
  };

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
            "sticky top-0 z-50 w-full border-b transition-all",
            isScrolled ? "bg-background/95 backdrop-blur-sm" : "bg-background"
        )}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
                <div className="flex items-center">
                    <Link href="/" className="flex-shrink-0">
                        <Image
                            src={settings.lightModeLogoUrl}
                            alt="Kemas Logo"
                            width={100}
                            height={25}
                            priority
                        />
                    </Link>
                </div>
                
                <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
                  <Link href="/" className="text-foreground/80 hover:text-primary transition-colors">
                    Home
                  </Link>
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className="flex items-center gap-1 text-foreground/80 hover:text-primary transition-colors focus:outline-none">
                        PT. Kemas <ChevronDownIcon size={16} />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent
                      align="start"
                      sideOffset={20}
                      className="max-w-xs w-full"
                    >
                        <div className="grid grid-cols-1 gap-1">
                          {settings.dropdownLinks.map((link) => (
                            <Link
                              key={link.title}
                              href={link.href}
                              className="block p-3 rounded-lg hover:bg-secondary"
                            >
                              <p className="font-semibold text-foreground">{link.title}</p>
                              <p className="text-sm text-muted-foreground">
                                {link.description}
                              </p>
                            </Link>
                          ))}
                        </div>
                    </PopoverContent>
                  </Popover>
                  <Link href="/careers" className="text-foreground/80 hover:text-primary transition-colors">
                    Careers
                  </Link>
                </nav>

                <div className="flex items-center gap-2">
                   <button
                        className="p-2 rounded-full hover:bg-secondary transition-colors"
                        aria-label="Search"
                    >
                        <Search size={20} />
                   </button>
                  <Link href="/login" className={cn(buttonVariants({variant: 'outline'}), "rounded-full")}>
                    Login
                  </Link>
                  <button
                    onClick={() => setIsMobileMenuOpen(true)}
                    className="md:hidden p-2 hover:bg-secondary rounded-full transition"
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
                    width={100}
                    height={25}
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
                  <Link href="/" className="block py-2 hover:text-primary transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                    Home
                  </Link>
                </li>
                <li>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1" className="border-b-0">
                      <AccordionTrigger className="hover:no-underline text-xl py-2 justify-start [&>svg]:ml-auto">
                        PT. Kemas
                      </AccordionTrigger>
                      <AccordionContent className="pt-2 pl-4">
                        <ul className="space-y-2 text-lg font-normal text-muted-foreground">
                           {settings.dropdownLinks.map((link) => (
                             <li key={link.title}>
                               <Link href={link.href} className="block py-1 hover:text-primary transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                                 {link.title}
                               </Link>
                             </li>
                           ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </li>
                 <li>
                  <Link href="/careers" className="block py-2 hover:text-primary transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                    Careers
                  </Link>
                </li>
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
