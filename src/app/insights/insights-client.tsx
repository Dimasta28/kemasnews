
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { format, parseISO } from 'date-fns';
import type { Post } from '@/services/postService';
import { Badge } from '@/components/ui/badge';
import { AnimatedSection } from '@/components/animated-section';

interface InsightsClientProps {
  posts: Post[];
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const postVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

export function InsightsClient({ posts }: InsightsClientProps) {
  return (
    <main className="flex-grow">
      {/* Hero Section */}
      <AnimatedSection className="relative bg-primary text-primary-foreground py-16 md:py-24 text-center overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] [mask-image:linear-gradient(to_bottom,white_50%,transparent_100%)]"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Insights
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-primary-foreground/80">
            Blog, News, & Education
          </p>
        </div>
      </AnimatedSection>

      {/* Posts Grid */}
      <AnimatedSection className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {posts.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {posts.map((post) => (
                <motion.div key={post.id} variants={postVariant}>
                  <Link href={`/post/${post.slug}`} className="group block">
                    <div className="relative aspect-video overflow-hidden rounded-lg">
                      <Image
                        src={post.featuredImage}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                        data-ai-hint="blog post image"
                      />
                    </div>
                    <div className="mt-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        {post.categories[0] && <Badge variant="secondary">{post.categories[0]}</Badge>}
                        <span>{format(parseISO(post.date), 'dd LLL, yyyy')}</span>
                      </div>
                      <h2 className="text-xl font-bold text-foreground transition-colors group-hover:text-primary line-clamp-2">
                        {post.title}
                      </h2>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-16">
              <h2 className="text-2xl font-semibold text-foreground">No Posts Yet</h2>
              <p className="mt-2 text-muted-foreground">
                There are no articles to display at the moment. Please check back later!
              </p>
            </div>
          )}
        </div>
      </AnimatedSection>
    </main>
  );
}
