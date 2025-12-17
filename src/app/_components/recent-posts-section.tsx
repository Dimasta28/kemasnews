
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { format, parseISO } from 'date-fns';
import type { Post } from '@/services/postService';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface RecentPostsSectionProps {
  posts: Post[];
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
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

export function RecentPostsSection({ posts }: RecentPostsSectionProps) {
  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <section className="py-16 md:py-24 bg-muted/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary">Latest Insights</h2>
          <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
            Explore our latest articles, news, and educational content on sustainable packaging.
          </p>
        </div>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {posts.map((post) => (
            <motion.div
              key={post.id}
              variants={postVariant}
              className="group flex flex-col"
            >
              <Link href={`/post/${post.slug}`} className="flex flex-col h-full bg-card rounded-lg overflow-hidden transition-shadow">
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={post.featuredImage}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                    data-ai-hint="blog post image"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    {post.categories[0] && <Badge variant="secondary">{post.categories[0]}</Badge>}
                    <span className="text-xs">{format(parseISO(post.date), 'dd LLL, yyyy')}</span>
                  </div>
                  <h3 className="text-lg font-bold text-foreground transition-colors group-hover:text-primary line-clamp-2 flex-grow">
                    {post.title}
                  </h3>
                   <p className="mt-4 text-sm text-primary group-hover:underline">
                        Read More <ArrowRight className="inline-block h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                    </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
         <div className="text-center mt-12">
            <Button asChild variant="outline">
                <Link href="/insights">
                    View All Insights <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
            </Button>
        </div>
      </div>
    </section>
  );
}
