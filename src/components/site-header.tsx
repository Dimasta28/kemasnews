
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  Bell as BellIcon,
  Sun,
  Moon,
  ChevronDown as ChevronDownIcon,
  X as XIcon,
} from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHeaderHidden, setIsHeaderHidden] = useState(false);
  const lastScrollY = useRef(0);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const { theme, setTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

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
            src="https://kemaspkg.com/media/wp-content/uploads/2024/04/logo-baru-kemas-2023-03.png"
            alt="Kemas Logo"
            width={120}
            height={30}
            className="hidden dark:block"
            priority
          />
          <Image
            src="https://www.kemaspkg.com/wp-content/uploads/2024/04/logo-baru-kemas-2023-01.png"
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
            <PopoverContent className="w-[450px] bg-[#EFECE9]/95 dark:bg-[#050505]/95 backdrop-blur-md border-[#DDD9CE] dark:border-[#AC9C8D] p-6 rounded-2xl shadow-xl">
              <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                <div className="col-span-2 mb-2">
                  <h3 className="font-bold text-lg text-[#610C27] dark:text-[#E3C1B4]">About Company</h3>
                  <p className="text-sm text-muted-foreground mt-1">Explore more about our company.</p>
                </div>
                <Link href="#" className="block text-sm py-1 hover:text-[#610C27] dark:hover:text-[#E3C1B4] transition-colors">News</Link>
                <Link href="#" className="block text-sm py-1 hover:text-[#610C27] dark:hover:text-[#E3C1B4] transition-colors">Press Release</Link>
                <Link href="#" className="block text-sm py-1 hover:text-[#610C27] dark:hover:text-[#E3C1B4] transition-colors">Careers</Link>
                <Link href="#" className="block text-sm py-1 hover:text-[#610C27] dark:hover:text-[#E3C1B4] transition-colors">CSR</Link>
                <Link href="#" className="block text-sm py-1 hover:text-[#610C27] dark:hover:text-[#E3C1B4] transition-colors">Kemas</Link>
                <Link href="#" className="block text-sm py-1 hover:text-[#610C27] dark:hover:text-[#E3C1B4] transition-colors">Love It</Link>
              </div>
            </PopoverContent>
          </Popover>
          <Link href="#" className="hover:text-[#610C27] dark:hover:text-[#E3C1B4] transition">
            Products
          </Link>
          <Link href="#" className="hover:text-[#610C27] dark:hover:text-[#E3C1B4] transition">
            Event
          </Link>
          <Link href="#" className="hover:text-[#610C27] dark:hover:text-[#E3C1B4] transition">
            LIMEX
          </Link>
          <Link href="#" className="hover:text-[#610C27] dark:hover:text-[#E3C1B4] transition">
            Sustainability
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <motion.div layout className="relative flex items-center">
            <AnimatePresence>
              {isSearchExpanded ? (
                <motion.input
                  key="search-input"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 150, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  type="text"
                  placeholder="Search..."
                  className="px-3 py-1 rounded-full border border-[#AC9C8D] dark:border-[#DDD9CE] bg-[#EFECE9] dark:bg-[#050505] text-sm focus:outline-none focus:ring-2 focus:ring-[#610C27]"
                  onBlur={() => setIsSearchExpanded(false)}
                  autoFocus
                />
              ) : (
                <motion.button
                  key="search-icon"
                  onClick={() => setIsSearchExpanded(true)}
                  className="p-2 hover:bg-[#DDD9CE] dark:hover:bg-[#AC9C8D] rounded-full transition"
                >
                  <SearchIcon size={20} />
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>

          <button className="p-2 hover:bg-[#DDD9CE] dark:hover:bg-[#AC9C8D] rounded-full transition">
            <BellIcon size={20} />
          </button>

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
                           <li><Link href="#" className="hover:text-[#610C27] dark:hover:text-[#E3C1B4] transition-colors" onClick={() => setIsMobileMenuOpen(false)}>News</Link></li>
                           <li><Link href="#" className="hover:text-[#610C27] dark:hover:text-[#E3C1B4] transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Press Release</Link></li>
                           <li><Link href="#" className="hover:text-[#610C27] dark:hover:text-[#E3C1B4] transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Careers</Link></li>
                           <li><Link href="#" className="hover:text-[#610C27] dark:hover:text-[#E3C1B4] transition-colors" onClick={() => setIsMobileMenuOpen(false)}>CSR</Link></li>
                           <li><Link href="#" className="hover:text-[#610C27] dark:hover:text-[#E3C1B4] transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Kemas</Link></li>
                           <li><Link href="#" className="hover:text-[#610C27] dark:hover:text-[#E3C1B4] transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Love It</Link></li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </li>
                <li><Link href="#" className="hover:text-[#610C27] dark:hover:text-[#E3C1B4] transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Products</Link></li>
                <li><Link href="#" className="hover:text-[#610C27] dark:hover:text-[#E3C1B4] transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Event</Link></li>
                <li><Link href="#" className="hover:text-[#610C27] dark:hover:text-[#E3C1B4] transition-colors" onClick={() => setIsMobileMenuOpen(false)}>LIMEX</Link></li>
                <li><Link href="#" className="hover:text-[#610C27] dark:hover:text-[#E3C1B4] transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Sustainability</Link></li>
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
