
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronLeft, MessageCircle, User, Calendar, Folder } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';

import type { Post } from '@/services/postService';
import type { Comment } from '@/services/commentService';
import type { BannerSettings, FrontendSettings } from '@/services/settingsService';
import type { Notification } from '@/services/notificationService';

import { Badge } from '@/components/ui/badge';
import { Sidebar } from './sidebar';
import { CommentsSection } from './comments-section';
import { BackToTopButton } from '@/components/back-to-top-button';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { SocialShare } from '@/components/social-share';

interface PostClientProps {
    post: Post;
    recentPosts: Post[];
    comments: Comment[];
    settings: FrontendSettings;
    notifications: Notification[];
}

export function PostClient({ post, recentPosts, comments, settings, notifications }: PostClientProps) {
    const [sanitizedContent, setSanitizedContent] = useState('');

    useEffect(() => {
        // DOMPurify needs a browser environment, so we run it on the client side.
        if (typeof window !== 'undefined') {
            setSanitizedContent(DOMPurify.sanitize(post.content));
        }
    }, [post.content]);

    const variants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.1,
                duration: 0.5,
                ease: "easeOut"
            },
        }),
    };

    return (
        <div className="bg-[#EFECE9] dark:bg-[#050505] text-[#050505] dark:text-[#EFECE9]">
            <SiteHeader settings={settings} notifications={notifications} />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
                <div className="mb-8">
                    <Link href="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
                        <ChevronLeft className="h-4 w-4" />
                        <span>Back to all articles</span>
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-12">
                    {/* Main Content */}
                    <article className="lg:col-span-2">
                        <motion.h1
                            className="text-3xl md:text-5xl font-extrabold leading-tight mb-4 text-foreground"
                            custom={0}
                            initial="hidden"
                            animate="visible"
                            variants={variants}
                        >
                            {post.title}
                        </motion.h1>

                        <motion.div
                            className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground mb-8"
                            custom={1}
                            initial="hidden"
                            animate="visible"
                            variants={variants}
                        >
                            <div className="flex items-center gap-1.5">
                                <User className="h-4 w-4" />
                                <span>{post.author}</span>
                            </div>
                            <span className="hidden sm:inline">&bull;</span>
                            <div className="flex items-center gap-1.5">
                                <Calendar className="h-4 w-4" />
                                <span>{post.date}</span>
                            </div>
                            <span className="hidden sm:inline">&bull;</span>
                            <div className="flex items-center gap-1.5">
                                <Folder className="h-4 w-4" />
                                <span className="capitalize">{post.categories?.join(', ')}</span>
                            </div>
                            <span className="hidden sm:inline">&bull;</span>
                            <div className="flex items-center gap-1.5">
                                <MessageCircle className="h-4 w-4" />
                                <span>{comments.length} Comments</span>
                            </div>
                        </motion.div>

                        {post.description && (
                            <motion.p
                                className="text-lg text-muted-foreground font-light mb-8 border-l-4 border-primary pl-4"
                                custom={2}
                                initial="hidden"
                                animate="visible"
                                variants={variants}
                            >
                                {post.description}
                            </motion.p>
                        )}


                        {post.featuredImage && (
                            <motion.div
                                className="relative w-full aspect-video mb-8 rounded-lg overflow-hidden shadow-lg"
                                custom={3}
                                initial="hidden"
                                animate="visible"
                                variants={variants}
                            >
                                <Image
                                    src={post.featuredImage}
                                    alt={post.title}
                                    fill
                                    className="object-cover"
                                    data-ai-hint="blog post image"
                                    priority
                                />
                            </motion.div>
                        )}

                        <motion.div
                            className="prose prose-lg dark:prose-invert max-w-none"
                            custom={4}
                            initial="hidden"
                            animate="visible"
                            variants={variants}
                            dangerouslySetInnerHTML={{ __html: sanitizedContent }}
                        />

                        <motion.div
                            className="mt-10 pt-6 border-t border-border"
                            custom={5}
                            initial="hidden"
                            animate="visible"
                            variants={variants}
                        >
                             <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="text-lg font-semibold mb-3">Tags</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {post.tags.map((tag) => (
                                            <Badge key={tag} variant="secondary" className="capitalize">{tag}</Badge>
                                        ))}
                                    </div>
                                </div>
                                <SocialShare title={post.title} />
                            </div>
                        </motion.div>

                        <CommentsSection postId={post.id} initialComments={comments} />
                    </article>

                    {/* Sidebar */}
                    <aside className="lg:col-span-1 mt-12 lg:mt-0">
                        <Sidebar recentPosts={recentPosts} banner={settings.banner} />
                    </aside>
                </div>
            </main>
            <SiteFooter />
            <BackToTopButton />
        </div>
    );
}
