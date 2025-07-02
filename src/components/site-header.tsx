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
  ChevronDown as ChevronDownIcon,
  X as XIcon,
} from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import type { FrontendSettings } from '@/services/settingsService';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import {
  markAllNotificationsAsRead,
  markNotificationAsRead,
  type Notification,
} from '@/services/notificationService';

interface SiteHeaderProps {
  settings: FrontendSettings;
  notifications: Notification[];
}


export function SiteHeader({ settings, notifications: initialNotifications }: SiteHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHeaderHidden, setIsHeaderHidden] = useState(false);
  const lastScrollY = useRef(0);
  const { theme, setTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const [notifications, setNotifications] = useState(initialNotifications || []);

  const hasUnread = (notifications || []).some(n => !n.read);

  const handleMarkAsRead = async (id: string) => {
    try {
        await markNotificationAsRead(id);
        setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
    } catch (error) {
        toast({ variant: 'destructive', title: 'Error', description: 'Could not mark notification as read.' });
    }
  };
  
  const handleMarkAllAsRead = async () => {
    try {
        await markAllNotificationsAsRead();
        setNotifications(notifications.map(n => ({...n, read: true})));
    } catch (error) {
        toast({ variant: 'destructive', title: 'Error', description: 'Could not mark all as read.' });
    }
  };

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsHeaderHidden(true);
      } else if (currentScrollY < lastScrollY.current || currentScrollY < 50) {
        setIsHeaderHidden(false);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={false}
        animate={isHeaderHidden ? 'hidden' : 'visible'}
        variants={{
          visible: { top: 16, transition: { duration: 0.3, ease: 'easeOut' } },
          hidden: { top: -100, transition: { duration: 0.3, ease: 'easeOut' } },
        }}
        className={`fixed left-1/2 transform -translate-x-1/2 w-[95%] max-w-6xl z-50 px-4 py-2
          rounded-full border transition-all duration-300 ease-out
          backdrop-blur-md flex items-center justify-between
          ${
            isScrolled
              ? 'bg-[#EFECE9]/80 dark:bg-[#050505]/80 shadow-md border-[#DDD9CE] dark:border-[#AC9C8D]'
              : 'bg-transparent border-transparent shadow-none'
          }`}
      >
        <Link href="/" className="flex items-center gap-2">
          <Image
            src={settings.darkModeLogoUrl}
            alt="Kemas Logo"
            width={120}
            height={30}
            className="hidden dark:block"
            priority
          />
          <Image
            src={settings.lightModeLogoUrl}
            alt="Kemas Logo"
            width={120}
            height={30}
            className="block dark:hidden"
            priority
          />
        </Link>
        
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/" className="hover:text-[#610C27] dark:hover:text-[#E3C1B4] transition">
            Home
          </Link>
          <Popover>
            <PopoverTrigger asChild>
              <button className="flex items-center gap-1 hover:text-[#610C27] dark:hover:text-[#E3C1B4] transition focus:outline-none">
                PT. Kemas <ChevronDownIcon size={16} />
              </button>
            </PopoverTrigger>
            <PopoverContent sideOffset={12} className="w-auto max-w-5xl bg-[#EFECE9]/95 dark:bg-[#050505]/95 backdrop-blur-md border-[#DDD9CE] dark:border-[#AC9C8D] p-4 rounded-2xl shadow-xl grid grid-cols-4 gap-4">
              {settings.dropdownLinks.map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className="block p-3 rounded-lg hover:bg-muted/60"
                >
                  <p className="font-semibold text-foreground">{link.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {link.description}
                  </p>
                </Link>
              ))}
            </PopoverContent>
          </Popover>
          <Link href="/careers" className="hover:text-[#610C27] dark:hover:text-[#E3C1B4] transition">
            Careers
          </Link>
        </nav>

        <div className="flex items-center gap-2">
           <Popover>
            <PopoverTrigger asChild>
              <button className="p-2 hover:bg-[#DDD9CE] dark:hover:bg-[#AC9C8D] rounded-full transition relative">
                <BellIcon size={20} />
                {hasUnread && (
                    <span className="absolute top-2 right-2 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-background" />
                )}
              </button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-80 p-0">
                <div className="p-4 border-b flex justify-between items-center">
                    <h3 className="font-semibold">Notifications</h3>
                    {hasUnread && (
                        <Button variant="link" size="sm" className="p-0 h-auto" onClick={handleMarkAllAsRead}>Mark all as read</Button>
                    )}
                </div>
                <div className="p-2 max-h-[400px] overflow-y-auto">
                    {(notifications || []).length > 0 ? (notifications || []).map(notification => (
                        <Link 
                            key={notification.id}
                            href={notification.link}
                            className="block p-3 rounded-lg hover:bg-muted/50"
                            onClick={() => handleMarkAsRead(notification.id)}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <div className="flex items-start gap-3">
                                <div>
                                    <p className={`text-sm leading-tight ${!notification.read ? 'font-semibold' : ''}`}>{notification.title}</p>
                                    <p className="text-sm text-muted-foreground mt-1">{notification.description}</p>
                                    <p className="text-xs text-muted-foreground mt-1">{notification.createdAt}</p>
                                </div>
                                {!notification.read && <div className="h-2 w-2 rounded-full bg-primary mt-1.5 flex-shrink-0"></div>}
                            </div>
                        </Link>
                    )) : (
                        <p className="text-center text-sm text-muted-foreground p-4">No notifications yet.</p>
                    )}
                </div>
            </PopoverContent>
          </Popover>

          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="hidden md:block p-2 hover:bg-[#DDD9CE] dark:hover:bg-[#AC9C8D] rounded-full transition"
          >
             {mounted ? (theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />) : <Sun size={20} />}
          </button>

          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden p-2 hover:bg-[#DDD9CE] dark:hover:bg-[#AC9C8D] rounded-full transition"
          >
            <MenuIcon size={20} />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-0 bg-[#EFECE9] dark:bg-[#050505] z-[100] flex flex-col items-center justify-center p-8 md:hidden"
          >
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-[#DDD9CE] dark:hover:bg-[#AC9C8D] transition-colors"
            >
              <XIcon size={24} />
            </button>
            <nav className="text-center w-full px-8">
              <ul className="space-y-6 text-xl">
                <li>
                  <Link href="/" className="hover:text-[#610C27] dark:hover:text-[#E3C1B4] transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                    Home
                  </Link>
                </li>
                <li>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1" className="border-b-0">
                      <AccordionTrigger className="hover:no-underline text-xl py-0 justify-center [&>svg]:size-5">
                        PT. Kemas
                      </AccordionTrigger>
                      <AccordionContent className="pt-4 overflow-hidden">
                        <ul className="space-y-4 text-lg text-gray-700 dark:text-gray-400">
                           {settings.dropdownLinks.map((link) => (
                             <li key={link.title}>
                               <Link href={link.href} className="hover:text-[#610C27] dark:hover:text-[#E3C1B4] transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
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
                  <Link href="/careers" className="hover:text-[#610C27] dark:hover:text-[#E3C1B4] transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                    Careers
                  </Link>
                </li>
              </ul>
            </nav>
            <div className="mt-8">
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-3 rounded-full bg-[#DDD9CE] dark:bg-[#AC9C8D] hover:bg-[#AC9C8D] dark:hover:bg-[#E3C1B4] transition-colors"
              >
                {mounted ? (theme === 'dark' ? <Moon size={24} /> : <Sun size={24} />) : <Sun size={24} />}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
