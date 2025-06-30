'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu, Search, Bell, Home, Rss, Tag, Mail, Share2, Sun, Moon, ChevronDown, X
} from 'lucide-react';

// Define the type for a single article
type Article = {
  id: number;
  image: string;
  category: string;
  title: string;
  preview: string;
  author: string;
  date: string;
  imageHint: string;
};

// Fungsi bantuan untuk meniru IntersectionObserver (untuk demo sederhana)
const useIntersectionObserver = (elementRef: React.RefObject<HTMLElement>, options: IntersectionObserverInit) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, options);

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [elementRef, options]);

  return isVisible;
};

// Data Dummy untuk Artikel Blog
const dummyArticles: Article[] = [
  {
    id: 1,
    image: "https://placehold.co/600x400.png",
    category: "Teknologi",
    title: "Masa Depan AI: Inovasi yang Mengubah Dunia",
    preview: "Kecerdasan Buatan (AI) terus berkembang pesat, menghadirkan inovasi yang mengubah cara kita hidup dan bekerja...",
    author: "Budi Santoso",
    date: "15 Juni 2025",
    imageHint: "technology innovation"
  },
  {
    id: 2,
    image: "https://placehold.co/600x400.png",
    category: "Gaya Hidup",
    title: "10 Tips Hidup Sehat di Era Digital",
    preview: "Di tengah hiruk pikuk kehidupan digital, menjaga kesehatan fisik dan mental menjadi sangat penting. Berikut 10 tips...",
    author: "Siti Aminah",
    date: "14 Juni 2025",
    imageHint: "healthy lifestyle"
  },
  {
    id: 3,
    image: "https://placehold.co/600x400.png",
    category: "Bisnis",
    title: "Strategi Pemasaran Digital untuk UMKM",
    preview: "UMKM perlu beradaptasi dengan tren pemasaran digital untuk tetap kompetitif. Pelajari strategi efektif di sini...",
    author: "Andi Wijaya",
    date: "13 Juni 2025",
    imageHint: "digital marketing"
  },
  {
    id: 4,
    image: "https://placehold.co/600x400.png",
    category: "Pendidikan",
    title: "Pentingnya Pembelajaran Sepanjang Hayat",
    preview: "Dunia terus berubah, dan pembelajaran tidak berhenti setelah sekolah. Konsep pembelajaran sepanjang hayat menjadi kunci...",
    author: "Dewi Lestari",
    date: "12 Juni 2025",
    imageHint: "education learning"
  },
  {
    id: 5,
    image: "https://placehold.co/600x400.png",
    category: "Teknologi",
    title: "Keamanan Siber: Lindungi Data Pribadi Anda",
    preview: "Ancaman siber semakin kompleks. Pelajari langkah-langkah penting untuk melindungi data pribadi dan privasi Anda...",
    author: "Budi Santoso",
    date: "11 Juni 2025",
    imageHint: "cyber security"
  },
  {
    id: 6,
    image: "https://placehold.co/600x400.png",
    category: "Gaya Hidup",
    title: "Resep Makanan Sehat dan Lezat untuk Keluarga",
    preview: "Mencari inspirasi masakan sehat yang disukai seluruh anggota keluarga? Berikut beberapa resep pilihan...",
    author: "Siti Aminah",
    date: "10 Juni 2025",
    imageHint: "healthy food"
  },
];

// Komponen Utama Aplikasi
export default function FrontendPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [articles, setArticles] = useState<Article[]>(dummyArticles);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const loadMoreRef = useRef(null);
  const isLoadMoreVisible = useIntersectionObserver(loadMoreRef, { threshold: 0.5 });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const [headerVisible, setHeaderVisible] = useState(true);


  // Efek untuk mendeteksi scroll dan mengubah tampilan header
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setHeaderVisible(false);
      } else {
        setHeaderVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Efek untuk mengelola mode gelap pada body
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Fungsi untuk memuat lebih banyak artikel (simulasi infinite scroll)
  const loadMoreArticles = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      const newArticles: Article[] = Array.from({ length: 3 }, (_, i) => ({
        id: articles.length + i + 1,
        image: `https://placehold.co/600x400.png`,
        category: ["Sains", "Seni", "Sejarah"][(articles.length + i) % 3],
        title: `Wawasan Baru: Topik Menarik #${articles.length + i + 1}`,
        preview: `Ini adalah ringkasan artikel dummy ke-${articles.length + i + 1}. Baca selengkapnya untuk informasi lebih lanjut...`,
        author: "Tim Redaksi",
        date: `Tanggal ${articles.length + i + 1} Juni 2025`,
        imageHint: "new article"
      }));
      setArticles(prevArticles => [...prevArticles, ...newArticles]);
      setIsLoadingMore(false);
    }, 1000); // Simulasi delay loading
  };

  // Panggil loadMoreArticles ketika elemen terlihat
  useEffect(() => {
    if (isLoadMoreVisible && !isLoadingMore) {
      loadMoreArticles();
    }
  }, [isLoadMoreVisible, isLoadingMore]);


  // Fungsi untuk mendapatkan warna badge kategori
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Teknologi': return 'bg-blue-500';
      case 'Gaya Hidup': return 'bg-green-500';
      case 'Bisnis': return 'bg-purple-500';
      case 'Pendidikan': return 'bg-yellow-500';
      case 'Sains': return 'bg-red-500';
      case 'Seni': return 'bg-indigo-500';
      case 'Sejarah': return 'bg-pink-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="font-inter antialiased bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 min-h-screen">
      {/* Header Ala Dynamic Island */}
      <motion.header
        initial={{ y: 0 }}
        animate={{
          y: headerVisible ? 0 : '-120%',
          backgroundColor: isScrolled
            ? (isDarkMode ? 'rgba(31, 41, 55, 0.8)' : 'rgba(255, 255, 255, 0.8)')
            : (isDarkMode ? 'rgba(31, 41, 55, 0)' : 'rgba(255, 255, 255, 0)'),
          backdropFilter: isScrolled ? 'blur(10px)' : 'blur(0px)',
          boxShadow: isScrolled ? '0 4px 12px rgba(0,0,0,0.1)' : '0px 0px 0px rgba(0,0,0,0)',
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[96%] max-w-6xl mx-auto rounded-full p-2 px-4 flex items-center justify-between transition-all duration-300 ease-out border border-gray-200 dark:border-gray-700 backdrop-blur-md"
      >
        {/* Logo/Icon */}
        <Image
          src="https://placehold.co/120x40.png"
          alt="BlogKu Logo"
          width={100}
          height={33}
          data-ai-hint="logo company"
        />

        {/* Menu Navigasi Desktop */}
        <nav className="hidden md:flex flex-grow justify-center">
          <ul className="flex space-x-8 text-base">
            <li>
              <a href="#" className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors flex items-center"><Home size={18} className="mr-2" /> Home</a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors flex items-center"><Rss size={18} className="mr-2" /> Blog</a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors flex items-center"><Tag size={18} className="mr-2" /> Kategori</a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors flex items-center"><Mail size={18} className="mr-2" /> Kontak</a>
            </li>
          </ul>
        </nav>

        {/* Search Icon & Notifikasi & Tombol Menu Mobile */}
        <div className="flex items-center space-x-2">
          <motion.div
            layout
            className="relative flex items-center"
            transition={{ type: "spring", stiffness: 700, damping: 50 }}
          >
            <AnimatePresence>
              {isSearchExpanded ? (
                <motion.input
                  key="search-input"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: '150px', opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  type="text"
                  placeholder="Cari..."
                  className="px-3 py-1 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-sm"
                  onBlur={() => setIsSearchExpanded(false)}
                  autoFocus
                />
              ) : (
                <motion.button
                  key="search-icon"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.1 }}
                  onClick={() => setIsSearchExpanded(true)}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <Search size={20} />
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>
          <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <Bell size={20} />
          </button>
          
          {/* Tombol Menu Mobile */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Panel Menu Mobile */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -20, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden fixed top-20 left-4 right-4 z-40"
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 p-4">
              <nav>
                <ul className="flex flex-col space-y-4">
                  <li>
                    <a href="#" onClick={() => setIsMobileMenuOpen(false)} className="text-lg hover:text-blue-500 dark:hover:text-blue-400 transition-colors flex items-center"><Home size={18} className="mr-3" /> Home</a>
                  </li>
                  <li>
                    <a href="#" onClick={() => setIsMobileMenuOpen(false)} className="text-lg hover:text-blue-500 dark:hover:text-blue-400 transition-colors flex items-center"><Rss size={18} className="mr-3" /> Blog</a>
                  </li>
                  <li>
                    <a href="#" onClick={() => setIsMobileMenuOpen(false)} className="text-lg hover:text-blue-500 dark:hover:text-blue-400 transition-colors flex items-center"><Tag size={18} className="mr-3" /> Kategori</a>
                  </li>
                  <li>
                    <a href="#" onClick={() => setIsMobileMenuOpen(false)} className="text-lg hover:text-blue-500 dark:hover:text-blue-400 transition-colors flex items-center"><Mail size={18} className="mr-3" /> Kontak</a>
                  </li>
                </ul>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>


      <main>
        {/* Hero Section */}
        <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center text-center overflow-hidden bg-cover bg-center" style={{ backgroundImage: "url('https://placehold.co/1920x1080.png')" }} data-ai-hint="insights knowledge">
          <div className="absolute inset-0 bg-black bg-opacity-40 dark:bg-opacity-60 z-10"></div>
          <div className="relative z-20 text-white p-6 max-w-3xl">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 drop-shadow-lg"
            >
              Wawasan Terbaru dari Kami
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl mb-8 drop-shadow-md"
            >
              Jelajahi artikel-artikel pilihan tentang teknologi, gaya hidup, bisnis, dan banyak lagi.
            </motion.p>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0px 8px 20px rgba(0,0,0,0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300"
            >
              Baca Artikel
            </motion.button>
          </div>
        </section>

        {/* Smart Filter Bar */}
        <section className="sticky top-20 md:top-24 z-30 bg-white dark:bg-gray-800 p-4 border-b border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0">
            {/* Tabs */}
            <div className="flex space-x-4 overflow-x-auto pb-2">
              {['Semua', 'Trending', 'Berita', 'Tips'].map((tab) => (
                <button
                  key={tab}
                  className="px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Dropdown Kategori & Search */}
            <div className="flex items-center space-x-3 w-full md:w-auto">
              <div className="relative inline-block text-left">
                <button
                  type="button"
                  className="inline-flex justify-center w-full rounded-full border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-700 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-600"
                  id="menu-button"
                  aria-expanded="true"
                  aria-haspopup="true"
                >
                  Kategori
                  <ChevronDown className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
                </button>
                {/* Dropdown content will go here for actual implementation */}
              </div>
              <input
                type="text"
                placeholder="Cari di sini..."
                className="flex-grow md:flex-none px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-sm"
              />
            </div>
          </div>
        </section>

        {/* Blog Feed Section */}
        <section className="py-12 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-10">Artikel Terbaru</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
                >
                  <Image src={article.image} alt={article.title} width={600} height={400} className="w-full h-48 object-cover rounded-t-lg" data-ai-hint={article.imageHint} />
                  <div className="p-5">
                    <span className={`inline-block ${getCategoryColor(article.category)} text-white text-xs font-semibold px-3 py-1 rounded-full mb-3`}>
                      {article.category}
                    </span>
                    <h3 className="text-xl font-semibold mb-2 line-clamp-2">{article.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">{article.preview}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                      <span>{article.author} | {article.date}</span>
                      <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                        <Share2 size={16} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Infinite Scroll Loader / Load More Button */}
            <div ref={loadMoreRef} className="flex justify-center mt-12">
              {isLoadingMore ? (
                <div className="flex items-center space-x-2 text-blue-500 dark:text-blue-400">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Lagi baca...</span>
                </div>
              ) : (
                <button
                  onClick={loadMoreArticles}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-full shadow-lg transition-all duration-300"
                >
                  Muat Lebih Banyak
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Sidebar (Desktop) / Bottom Sheet (Mobile - Konseptual) */}
        <section className="py-12 bg-gray-100 dark:bg-gray-800">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              {/* Ini adalah ruang untuk konten utama lainnya jika ada */}
              <h3 className="text-2xl font-bold mb-6">Jelajahi Lebih Lanjut</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Temukan berbagai topik menarik dan terus dapatkan informasi terbaru dari kami.
              </p>
            </div>
            <div className="md:col-span-1 bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold mb-4">Trending Post</h3>
              <ul className="space-y-3 mb-6">
                <li><a href="#" className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors">1. Menguasai React Hooks</a></li>
                <li><a href="#" className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors">2. Tips Produktivitas Terbaru</a></li>
                <li><a href="#" className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors">3. Revolusi Web 3.0</a></li>
              </ul>

              <h3 className="text-xl font-bold mb-4">Kategori</h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {['Teknologi', 'Gaya Hidup', 'Bisnis', 'Pendidikan', 'Sains', 'Seni'].map(cat => (
                  <span key={cat} className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-xs px-3 py-1 rounded-full">{cat}</span>
                ))}
              </div>

              <h3 className="text-xl font-bold mb-4">Newsletter</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">Dapatkan wawasan terbaru langsung ke inbox Anda.</p>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Email Anda"
                  className="flex-grow px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-sm"
                />
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition-colors text-sm">
                  Subscribe
                </button>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <span className="font-semibold">Tema</span>
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  {isDarkMode ? <Moon size={20} /> : <Sun size={20} />}
                </button>
              </div>
            </div>
          </div>
        </section>


        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-700 text-white text-center">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">Jangan Lewatkan Wawasan Terbaru!</h2>
            <p className="text-lg md:text-xl mb-8">
              Bergabunglah dengan komunitas kami dan dapatkan artikel, tips, serta berita eksklusif langsung ke email Anda.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <input
                type="email"
                placeholder="Masukkan alamat email Anda"
                className="w-full sm:w-80 p-3 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0px 6px 15px rgba(0,0,0,0.2)" }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-blue-600 font-bold py-3 px-8 rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-300"
              >
                Langganan Sekarang
              </motion.button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer Minimalis */}
      <footer className="bg-gray-800 dark:bg-gray-950 text-gray-300 py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between text-sm">
          <div className="mb-4 md:mb-0 flex items-center space-x-2">
            <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xs">
              B
            </div>
            <span>© 2025 BlogKu. Semua Hak Dilindungi.</span>
          </div>
          <nav className="flex space-x-4 mb-4 md:mb-0">
            <a href="#" className="hover:text-white transition-colors">Kebijakan Privasi</a>
            <a href="#" className="hover:text-white transition-colors">Syarat & Ketentuan</a>
            <a href="#" className="hover:text-white transition-colors">Sitemap</a>
          </nav>
          <div className="flex space-x-4">
            <motion.a whileHover={{ y: -2 }} href="#" className="hover:text-white transition-colors">
              <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6" aria-hidden="true">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.505 1.492-3.89 3.776-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33V22C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
              </svg>
            </motion.a>
            <motion.a whileHover={{ y: -2 }} href="#" className="hover:text-white transition-colors">
              <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6" aria-hidden="true">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.585-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.585-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.585.069-4.85c.149-3.225 1.664-4.771 4.919-4.919C8.415 2.175 8.796 2.163 12 2.163m0-1.625c-3.273 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.673-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.673.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.059-1.281.073-1.673.073-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98C15.667.554 15.273.538 12 .538z" />
                <path d="M12 6.837c-2.846 0-5.163 2.317-5.163 5.163s2.317 5.163 5.163 5.163 5.163-2.317 5.163-5.163-2.317-5.163-5.163-5.163zm0 8.708c-1.956 0-3.545-1.589-3.545-3.545s1.589-3.545 3.545-3.545 3.545 1.589 3.545 3.545-1.589 3.545-3.545 3.545z" />
                <path d="M16.949 6.857a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0z" />
              </svg>
            </motion.a>
            <motion.a whileHover={{ y: -2 }} href="#" className="hover:text-white transition-colors">
              <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6" aria-hidden="true">
                <path d="M19.5 2h-15C2.012 2 0 3.968 0 6.44v11.124C0 20.032 2.012 22 4.5 22h15c2.488 0 4.5-1.968 4.5-4.436V6.44C24 3.968 21.988 2 19.5 2zM8.397 18.006H5.433V9.068h2.964v8.938zM6.918 8.007c-.957 0-1.73-.767-1.73-1.72s.773-1.72 1.73-1.72 1.73.767 1.73 1.72-.772 1.72-1.73 1.72zm11.393 9.998h-2.964V12.78c0-.792-.016-1.815-1.106-1.815-1.107 0-1.277.863-1.277 1.758v5.283h-2.963V9.068h2.846v1.298h.04c.394-.746 1.353-1.533 2.793-1.533 2.996 0 3.553 1.963 3.553 4.512v5.161z" />
              </svg>
            </motion.a>
          </div>
        </div>
      </footer>
    </div>
  );
}
