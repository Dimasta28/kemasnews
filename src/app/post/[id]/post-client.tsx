
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronLeft, MessageCircle, User, Calendar, Folder, Terminal } from 'lucide-react';
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
import { useAuth } from '@/hooks/use-auth';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { format, parseISO } from 'date-fns';

interface PostClientProps {
    post: Post | null;
    recentPosts: Post[];
    comments: Comment[];
    settings: FrontendSettings | null;
    notifications: Notification[];
    error?: string | null;
}

export function PostClient({ post, recentPosts, comments, settings, notifications, error }: PostClientProps) {
    const [sanitizedContent, setSanitizedContent] = useState('');
    const [currentUrl, setCurrentUrl] = useState('');
    const { user } = useAuth();

    useEffect(() => {
        // DOMPurify and window.location need a browser environment, so we run it on the client side.
        if (typeof window !== 'undefined') {
            if (post?.content) {
                setSanitizedContent(DOMPurify.sanitize(post.content));
            }
            setCurrentUrl(window.location.href);
        }
    }, [post?.content]);

    if (error || !post || !settings) {
        return (
             <div className="flex flex-col min-h-screen bg-[#EFECE9] dark:bg-[#050505]">
                {settings && <SiteHeader settings={settings} notifications={notifications || []} posts={[]} />}
                <main className="flex-grow flex items-center justify-center p-4">
                    <Alert variant="destructive" className="max-w-2xl">
                    <Terminal className="h-4 w-4" />
                    <AlertTitle>Could Not Load Post</AlertTitle>
                    <AlertDescription>
                        <p>There was an error loading the content for this post. This is likely a temporary issue or a problem with database permissions.</p>
                        <p className="mt-2 font-mono text-xs bg-muted p-2 rounded">{error || 'The post data could not be retrieved.'}</p>
                        <Link href="/" className="text-sm mt-4 inline-block underline">Return to homepage</Link>
                    </AlertDescription>
                    </Alert>
                </main>
                {settings && <SiteFooter settings={settings} />}
            </div>
        )
    }


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

    const finalTitle = post.title;
    const finalContent = sanitizedContent;

    return (
        <div className="bg-[#EFECE9] dark:bg-[#050505] text-[#050505] dark:text-[#EFECE9]">
            <SiteHeader 
                settings={settings} 
                notifications={notifications}
                posts={recentPosts}
            />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                    <Link href="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
                        <ChevronLeft className="h-4 w-4" />
                        <span>Back to all articles</span>
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-12">
                    {/* Main Content */}
                    <article className="lg:col-span-2">
                        <motion.h1
                            className="text-2xl md:text-5xl font-extrabold leading-tight mb-4 text-foreground"
                            custom={0}
                            initial="hidden"
                            animate="visible"
                            variants={variants}
                        >
                            {finalTitle}
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
                                <span>{format(parseISO(post.date), "dd LLL yyyy")}</span>
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
                            className="prose dark:prose-invert max-w-none md:prose-lg"
                            custom={4}
                            initial="hidden"
                            animate="visible"
                            variants={variants}
                            dangerouslySetInnerHTML={{ __html: finalContent }}
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
                                <div className="flex items-center gap-2">
                                  <h4 className="text-sm font-semibold text-muted-foreground mr-2 hidden sm:block">Share:</h4>
                                  <SocialShare title={post.title} url={currentUrl} />
                                </div>
                            </div>
                        </motion.div>

                        <CommentsSection 
                            postId={post.id} 
                            initialComments={comments}
                        />
                    </article>

                    {/* Sidebar */}
                    <aside className="lg:col-span-1 mt-12 lg:mt-0">
                        <Sidebar 
                            recentPosts={recentPosts} 
                            banner={settings.sidebarBanner} 
                        />
                    </aside>
                </div>
            </main>
            <SiteFooter settings={settings} />
            <BackToTopButton />
        </div>
    );
}
