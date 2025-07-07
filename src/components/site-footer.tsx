'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export function SiteFooter() {
    return (
        <footer className="bg-primary text-primary-foreground py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between text-sm">
          <div className="mb-4 md:mb-0 flex items-center">
            <Image
              src="https://kemaspkg.com/media/wp-content/uploads/2024/04/logo-baru-kemas-2023-03.png"
              alt="Kemas Logo"
              width={100}
              height={25}
              className="hidden dark:block"
            />
            <Image
              src="https://www.kemaspkg.com/wp-content/uploads/2024/04/logo-baru-kemas-2023-01.png"
              alt="Kemas Logo"
              width={100}
              height={25}
              className="block dark:hidden"
            />
            <span className="ml-4">
              © 2025 PT. Kemas. All Rights Reserved.
            </span>
          </div>
          <nav className="flex space-x-4 mb-4 md:mb-0">
             <Link href="/privacy-policy" className="hover:opacity-80 transition-opacity">
              Privacy Policy
            </Link>
            <Link href="/login" className="hover:opacity-80 transition-opacity">
              Login
            </Link>
            <Link href="/sitemap.xml" className="hover:opacity-80 transition-opacity">
              Sitemap
            </Link>
          </nav>
          <div className="flex space-x-4">
            <motion.a
              whileHover={{ y: -2 }}
              href="#"
              className="hover:opacity-80 transition-opacity"
              aria-label="Facebook"
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
              className="hover:opacity-80 transition-opacity"
               aria-label="Instagram"
            >
              <svg
                fill="currentColor"
                viewBox="0 0 24 24"
                className="w-6 h-6"
                aria-hidden="true"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85c.149-3.225 1.664-4.771 4.919-4.919C8.416 2.175 8.796 2.163 12 2.163zm0 1.441c-3.117 0-3.483.01-4.69.066-2.88.132-4.11 1.34-4.243 4.243-.056 1.207-.066 1.573-.066 4.69s.01 3.483.066 4.69c.133 2.903 1.363 4.113 4.243 4.243 1.207.056 1.573.066 4.69.066s3.483-.01 4.69-.066c2.88-.132 4.11-1.34 4.243-4.243.056-1.207.066-1.573.066-4.69s-.01-3.483-.066-4.69c-.133-2.903-1.363-4.113-4.243-4.243-1.207-.056-1.573.066-4.69-.066z"></path><path d="M12 6.865a5.135 5.135 0 100 10.27 5.135 5.135 0 000-10.27zm0 8.87a3.735 3.735 0 110-7.47 3.735 3.735 0 010 7.47z"></path><path d="M16.965 6.57a1.29 1.29 0 100 2.58 1.29 1.29 0 000-2.58z"></path>
              </svg>
            </motion.a>
            <motion.a
              whileHover={{ y: -2 }}
              href="#"
              className="hover:opacity-80 transition-opacity"
               aria-label="LinkedIn"
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
    );
}
