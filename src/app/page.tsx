'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  Bell as BellIcon,
  Home as HomeIcon,
  Rss as RssIcon,
  Tag as TagIcon,
  Mail as MailIcon,
  Share2 as Share2Icon,
  Sun,
  Moon,
  ChevronDown as ChevronDownIcon,
  X as XIcon,
} from 'lucide-react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

// Define the Article type
type Article = {
  id: number;
  image: string;
  category: string;
  title: string;
  preview: string;
  author: string;
  date: string;
};

const initialArticles: Article[] = [
  {
    id: 1,
    image: 'https://placehold.co/600x400.png',
    category: 'Teknologi',
    title: 'Inovasi Packaging Kosmetik Terbaru',
    preview:
      'Jelajahi tren dan material terbaru dalam industri packaging kosmetik yang ramah lingkungan dan mewah...',
    author: 'Tim Cosmaetic',
    date: '25 Juni 2025',
  },
  {
    id: 2,
    image: 'https://placehold.co/600x400.png',
    category: 'Gaya Hidup',
    title: 'Rahasia Kecantikan Berkelanjutan',
    preview:
      'Temukan tips dan produk kecantikan yang tidak hanya mempercantik Anda tetapi juga menjaga bumi...',
    author: 'Ayu Lestari',
    date: '22 Juni 2025',
  },
  {
    id: 3,
    image: 'https://placehold.co/600x400.png',
    category: 'Bisnis',
    title: 'Strategi Branding untuk Produk Kecantikan',
    preview:
      'Bagaimana membangun merek kosmetik yang kuat dan menarik perhatian di pasar yang kompetitif...',
    author: 'David Chandra',
    date: '18 Juni 2025',
  },
  {
    id: 4,
    image: 'https://placehold.co/600x400.png',
    category: 'Pendidikan',
    title: 'Panduan Memilih Bahan Packaging Aman',
    preview:
      'Edukasi tentang pentingnya memilih bahan packaging yang aman dan sesuai standar untuk kosmetik Anda...',
    author: 'Rina Wijaya',
    date: '15 Juni 2025',
  },
  {
    id: 5,
    image: 'https://placehold.co/600x400.png',
    category: 'Teknologi',
    title: 'Dampak AI dalam Manufaktur Kosmetik',
    preview:
      'Kecerdasan Buatan merevolusi proses produksi dan pengujian dalam industri kosmetik...',
    author: 'Budi Santoso',
    date: '12 Juni 2025',
  },
  {
    id: 6,
    image: 'https://placehold.co/600x400.png',
    category: 'Gaya Hidup',
    title: 'Minimalisme dalam Rutinitas Kecantikan',
    preview:
      'Sederhanakan rutinitas kecantikan Anda dengan pendekatan minimalis tanpa mengorbankan kualitas...',
    author: 'Siti Aminah',
    date: '10 Juni 2025',
  },
];

// Generate more dummy articles for pagination
const moreArticles: Article[] = Array.from({ length: 34 }, (_, i) => {
    const id = 7 + i;
    const category = ['Teknologi', 'Gaya Hidup', 'Bisnis', 'Pendidikan', 'Desain', 'Inovasi', 'Tren'][i % 7];
    const author = ['Tim Cosmaetic', 'Ayu Lestari', 'David Chandra', 'Rina Wijaya', 'Budi Santoso', 'Siti Aminah'][i % 6];
    return {
        id,
        image: 'https://placehold.co/600x400.png',
        category,
        title: `Wawasan Baru: Topik Menarik #${id}`,
        preview: `Ini adalah ringkasan artikel dummy ke-${id}. Jelajahi tren dan material terbaru dalam industri packaging kosmetik yang ramah lingkungan dan mewah...`,
        author,
        date: `${25 - (i % 25)} Juni 2025`,
    };
});

const dummyArticles: Article[] = [...initialArticles, ...moreArticles];

// Komponen Utama Aplikasi
export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHeaderHidden, setIsHeaderHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 15;
  const articlesSectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsHeaderHidden(true);
      } else if (currentScrollY < lastScrollY || currentScrollY < 50) {
        setIsHeaderHidden(false);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Teknologi':
        return 'bg-[#610C27] text-[#EFECE9]';
      case 'Gaya Hidup':
        return 'bg-[#E3C1B4] text-[#050505]';
      case 'Bisnis':
        return 'bg-[#AC9C8D] text-[#050505]';
      case 'Pendidikan':
        return 'bg-[#DDD9CE] text-[#050505]';
      case 'Desain':
        return 'bg-[#610C27] text-[#EFECE9]';
      case 'Inovasi':
        return 'bg-[#E3C1B4] text-[#050505]';
      case 'Tren':
        return 'bg-[#AC9C8D] text-[#050505]';
      default:
        return 'bg-[#DDD9CE] text-[#050505]';
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(dummyArticles.length / articlesPerPage);
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = dummyArticles.slice(indexOfFirstArticle, indexOfLastArticle);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      articlesSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="font-inter antialiased bg-[#EFECE9] dark:bg-[#050505] text-[#050505] dark:text-[#EFECE9] min-h-screen">
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
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#610C27] rounded-full flex items-center justify-center text-white font-bold text-sm shadow">
            C
          </div>
          <span className="font-semibold text-lg hidden sm:inline-block">
            Cosmaetic Blog
          </span>
        </div>

        <nav className="hidden md:flex gap-6 text-sm">
          {['Home', 'Blog', 'Kategori', 'Kontak'].map((item) => (
            <a
              key={item}
              href="#"
              className="hover:text-[#610C27] dark:hover:text-[#E3C1B4] transition"
            >
              {item}
            </a>
          ))}
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
                  placeholder="Cari..."
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
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="hidden md:block p-2 hover:bg-[#DDD9CE] dark:hover:bg-[#AC9C8D] rounded-full transition"
          >
            {isDarkMode ? <Moon size={20} /> : <Sun size={20} />}
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
            className="fixed inset-0 bg-[#EFECE9] dark:bg-[#050505] z-50 flex flex-col items-center justify-center p-8 md:hidden"
          >
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-[#DDD9CE] dark:hover:bg-[#AC9C8D] transition-colors"
            >
              <XIcon size={24} />
            </button>
            <nav className="text-center">
              <ul className="space-y-6 text-xl">
                <li>
                  <a
                    href="#"
                    className="hover:text-[#610C27] dark:hover:text-[#E3C1B4] transition-colors flex items-center justify-center"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <HomeIcon size={24} className="mr-2" /> Home
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[#610C27] dark:hover:text-[#E3C1B4] transition-colors flex items-center justify-center"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <RssIcon size={24} className="mr-2" /> Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[#610C27] dark:hover:text-[#E3C1B4] transition-colors flex items-center justify-center"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <TagIcon size={24} className="mr-2" /> Kategori
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[#610C27] dark:hover:text-[#E3C1B4] transition-colors flex items-center justify-center"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <MailIcon size={24} className="mr-2" /> Kontak
                  </a>
                </li>
              </ul>
            </nav>
            <div className="mt-8">
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-3 rounded-full bg-[#DDD9CE] dark:bg-[#AC9C8D] hover:bg-[#AC9C8D] dark:hover:bg-[#E3C1B4] transition-colors"
              >
                {isDarkMode ? <Moon size={24} /> : <Sun size={24} />}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        <section
          className="relative h-[60vh] md:h-[70vh] flex items-center justify-center text-center overflow-hidden bg-cover bg-center"
        >
           <Image
            src="https://placehold.co/1920x1080.png"
            alt="Hero background"
            layout="fill"
            objectFit="cover"
            className="z-0"
            data-ai-hint="cosmetics background"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 dark:bg-opacity-60 z-10"></div>
          <div className="relative z-20 text-[#EFECE9] p-6 max-w-3xl">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 drop-shadow-lg"
            >
              Wawasan Terbaru dari Dunia Kosmetik
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl mb-8 drop-shadow-md"
            >
              Jelajahi artikel-artikel pilihan tentang tren, inovasi, dan
              strategi packaging untuk kosmetik.
            </motion.p>
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: '0px 8px 20px rgba(0,0,0,0.3)',
              }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#610C27] hover:bg-opacity-90 text-[#EFECE9] font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300"
            >
              Baca Artikel
            </motion.button>
          </div>
        </section>

        <section
          className={`sticky z-40 bg-[#EFECE9] dark:bg-[#050505] p-4 border-b border-[#DDD9CE] dark:border-[#AC9C8D] shadow-sm transition-all duration-300 ease-out
          ${isHeaderHidden ? 'top-0' : 'top-20 md:top-24'}`}
        >
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0">
            <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide">
              {['Semua', 'Tren', 'Desain', 'Inovasi'].map((tab) => (
                <button
                  key={tab}
                  className="px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap bg-[#DDD9CE] hover:bg-[#AC9C8D] dark:bg-[#AC9C8D] dark:hover:bg-[#E3C1B4] transition-colors"
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-3 w-full md:w-auto">
              <div className="relative inline-block text-left">
                <button
                  type="button"
                  className="inline-flex justify-center w-full rounded-full border border-[#AC9C8D] dark:border-[#DDD9CE] shadow-sm px-4 py-2 bg-[#EFECE9] dark:bg-[#050505] text-sm font-medium hover:bg-[#DDD9CE] dark:hover:bg-[#AC9C8D]"
                  id="menu-button"
                  aria-expanded="true"
                  aria-haspopup="true"
                >
                  Kategori
                  <ChevronDownIcon
                    className="-mr-1 ml-2 h-5 w-5"
                    aria-hidden="true"
                  />
                </button>
              </div>
              <input
                type="text"
                placeholder="Cari di sini..."
                className="flex-grow md:flex-none px-4 py-2 rounded-full border border-[#AC9C8D] dark:border-[#DDD9CE] bg-[#EFECE9] dark:bg-[#050505] focus:outline-none focus:ring-2 focus:ring-[#610C27] text-sm"
              />
            </div>
          </div>
        </section>

        <section ref={articlesSectionRef} className="py-12 bg-[#EFECE9] dark:bg-[#050505]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-10">
              Artikel Terbaru
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentArticles.map((article) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-[#DDD9CE] dark:bg-[#AC9C8D] rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
                >
                  <Image
                    src={article.image}
                    alt={article.title}
                    width={600}
                    height={400}
                    className="w-full h-48 object-cover"
                    data-ai-hint="cosmetics packaging"
                  />
                  <div className="p-5">
                    <span
                      className={`inline-block ${getCategoryColor(
                        article.category
                      )} text-xs font-semibold px-3 py-1 rounded-full mb-3`}
                    >
                      {article.category}
                    </span>
                    <h3 className="text-xl font-semibold mb-2 line-clamp-2 text-[#050505] dark:text-[#050505]">
                      {article.title}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-700 text-sm mb-4 line-clamp-3">
                      {article.preview}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-600">
                      <span>
                        {article.author} | {article.date}
                      </span>
                      <button className="p-2 rounded-full hover:bg-[#AC9C8D] dark:hover:bg-[#DDD9CE] transition-colors">
                        <Share2Icon size={16} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex justify-center mt-12">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handlePageChange(currentPage - 1);
                      }}
                      className={currentPage === 1 ? 'pointer-events-none opacity-50' : undefined}
                    />
                  </PaginationItem>
                  {Array.from({ length: totalPages }, (_, i) => (
                    <PaginationItem key={i}>
                      <PaginationLink
                        href="#"
                        isActive={currentPage === i + 1}
                        onClick={(e) => {
                          e.preventDefault();
                          handlePageChange(i + 1);
                        }}
                      >
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext
                       href="#"
                       onClick={(e) => {
                         e.preventDefault();
                         handlePageChange(currentPage + 1);
                       }}
                       className={currentPage === totalPages ? 'pointer-events-none opacity-50' : undefined}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>

          </div>
        </section>

        <section className="py-12 bg-[#DDD9CE] dark:bg-[#050505]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold mb-6">Jelajahi Lebih Lanjut</h3>
              <p className="text-[#050505] dark:text-[#EFECE9]">
                Temukan berbagai topik menarik dan terus dapatkan informasi
                terbaru dari kami.
              </p>
            </div>
            <div className="md:col-span-1 bg-[#EFECE9] dark:bg-[#AC9C8D] rounded-lg shadow-md p-6 text-[#050505] dark:text-[#050505]">
              <h3 className="text-xl font-bold mb-4">Trending Post</h3>
              <ul className="space-y-3 mb-6">
                <li>
                  <a
                    href="#"
                    className="hover:text-[#610C27] dark:hover:text-[#610C27] transition-colors"
                  >
                    1. Desain Packaging Minimalis
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[#610C27] dark:hover:text-[#610C27] transition-colors"
                  >
                    2. Bahan Ramah Lingkungan untuk Kosmetik
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[#610C27] dark:hover:text-[#610C27] transition-colors"
                  >
                    3. Strategi Marketing Sensual
                  </a>
                </li>
              </ul>

              <h3 className="text-xl font-bold mb-4">Kategori</h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {[
                  'Teknologi',
                  'Gaya Hidup',
                  'Bisnis',
                  'Pendidikan',
                  'Desain',
                  'Inovasi',
                ].map((cat) => (
                  <span
                    key={cat}
                    className="bg-[#DDD9CE] dark:bg-[#DDD9CE] text-[#050505] dark:text-[#050505] text-xs px-3 py-1 rounded-full"
                  >
                    {cat}
                  </span>
                ))}
              </div>

              <h3 className="text-xl font-bold mb-4">Newsletter</h3>
              <p className="text-gray-500 dark:text-gray-500 text-sm mb-3">
                Dapatkan wawasan terbaru langsung ke inbox Anda.
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Email Anda"
                  className="flex-grow px-4 py-2 rounded-md border border-[#AC9C8D] dark:border-[#DDD9CE] bg-[#EFECE9] dark:bg-[#EFECE9] focus:outline-none focus:ring-2 focus:ring-[#610C27] text-sm text-black"
                />
                <button className="bg-[#610C27] hover:bg-opacity-90 text-[#EFECE9] font-bold py-2 px-4 rounded-md transition-colors text-sm">
                  Subscribe
                </button>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <span className="font-semibold">Tema</span>
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className="p-2 rounded-full bg-[#DDD9CE] dark:bg-[#DDD9CE] hover:bg-[#AC9C8D] dark:hover:bg-[#AC9C8D] transition-colors"
                >
                  {isDarkMode ? <Moon size={20} /> : <Sun size={20} />}
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-[#610C27] text-[#EFECE9] text-center">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
              Jangan Lewatkan Wawasan Terbaru!
            </h2>
            <p className="text-lg md:text-xl mb-8">
              Bergabunglah dengan komunitas kami dan dapatkan artikel, tips,
              serta berita eksklusif langsung ke email Anda.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <input
                type="email"
                placeholder="Masukkan alamat email Anda"
                className="w-full sm:w-80 p-3 rounded-full text-[#050505] focus:outline-none focus:ring-2 focus:ring-[#EFECE9]"
              />
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0px 6px 15px rgba(0,0,0,0.2)',
                }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#EFECE9] text-[#610C27] font-bold py-3 px-8 rounded-full shadow-lg hover:bg-[#DDD9CE] transition-colors duration-300"
              >
                Langganan Sekarang
              </motion.button>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#050505] text-[#E3C1B4] py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between text-sm">
          <div className="mb-4 md:mb-0 flex items-center space-x-2">
            <div className="w-6 h-6 bg-[#610C27] rounded-full flex items-center justify-center text-[#EFECE9] font-bold text-xs">
              C
            </div>
            <span>© 2025 Cosmaetic Packaging. Semua Hak Dilindungi.</span>
          </div>
          <nav className="flex space-x-4 mb-4 md:mb-0">
            <a href="#" className="hover:text-[#EFECE9] transition-colors">
              Kebijakan Privasi
            </a>
            <a href="#" className="hover:text-[#EFECE9] transition-colors">
              Syarat & Ketentuan
            </a>
            <a href="#" className="hover:text-[#EFECE9] transition-colors">
              Sitemap
            </a>
          </nav>
          <div className="flex space-x-4">
            <motion.a
              whileHover={{ y: -2 }}
              href="#"
              className="hover:text-[#EFECE9] transition-colors"
            >
              <svg
                fill="currentColor"
                viewBox="0 0 24 24"
                className="w-6 h-6"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.505 1.492-3.89 3.776-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33V22C18.343 21.128 22 16.991 22 12z"
                  clipRule="evenodd"
                />
              </svg>
            </motion.a>
            <motion.a
              whileHover={{ y: -2 }}
              href="#"
              className="hover:text-[#EFECE9] transition-colors"
            >
              <svg
                fill="currentColor"
                viewBox="0 0 24 24"
                className="w-6 h-6"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12.488 1.112a9.954 9.954 0 0 0-7.556 1.124A9.959 9.959 0 0 0 1.112 12.488c-.306 1.49-.498 3.016-.498 4.544 0 5.485 4.453 9.938 9.938 9.938 1.528 0 3.054-.192 4.544-.498a9.954 9.954 0 0 0 7.556-1.124 9.959 9.959 0 0 0 3.864-8.876c.306-1.49.498-3.016-.498-4.544 0-5.485-4.453-9.938-9.938-9.938A9.959 9.959 0 0 0 12.488 1.112ZM14.156 5.864a.897.897 0 0 0-.897-.897H10.74a.897.897 0 0 0-.897.897v2.32a.897.897 0 0 0 .897.897h2.519a.897.897 0 0 0 .897-.897V5.864Zm-1.782 4.417a2.69 2.69 0 0 0-2.69 2.69v2.525a2.69 2.69 0 0 0 2.69 2.69h2.519a2.69 2.69 0 0 0 2.69-2.69V12.97a2.69 2.69 0 0 0-2.69-2.69h-2.519Z"
                  clipRule="evenodd"
                />
              </svg>
            </motion.a>
            <motion.a
              whileHover={{ y: -2 }}
              href="#"
              className="hover:text-[#EFECE9] transition-colors"
            >
              <svg
                fill="currentColor"
                viewBox="0 0 24 24"
                className="w-6 h-6"
                aria-hidden="true"
              >
                <path d="M19.5 2h-15C2.012 2 0 3.968 0 6.44v11.124C0 20.032 2.012 22 4.5 22h15c2.488 0 4.5-1.968 4.5-4.436V6.44C24 3.968 21.988 2 19.5 2zM8.397 18.006H5.433V9.068h2.964v8.938zM6.918 8.007c-.957 0-1.73-.767-1.73-1.72s.773-1.72 1.73-1.72 1.73.767 1.73 1.72-.772 1.72-1.73 1.72zm11.393 9.998h-2.964V12.78c0-.792-.016-1.815-1.106-1.815-1.107 0-1.277.863-1.277 1.758v5.283h-2.963V9.068h2.846v1.298h.04c.394-.746 1.353-1.533 2.793-1.533 2.996 0 3.553 1.963 3.553 4.512v5.161z" />
              </svg>
            </motion.a>
          </div>
        </div>
      </footer>
    </div>
  );
}
