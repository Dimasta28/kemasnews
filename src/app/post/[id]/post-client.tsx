'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronLeft, MessageCircle, User, Calendar, Folder, Globe } from 'lucide-react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { translateText } from '@/ai/flows/translate-text-flow';
import { useToast } from '@/hooks/use-toast';

interface PostClientProps {
    post: Post;
    recentPosts: Post[];
    comments: Comment[];
    settings: FrontendSettings;
    notifications: Notification[];
}

export function PostClient({ post, recentPosts, comments, settings, notifications }: PostClientProps) {
    const [sanitizedContent, setSanitizedContent] = useState('');
    const [currentUrl, setCurrentUrl] = useState('');
    const { toast } = useToast();

    const [translatedTitle, setTranslatedTitle] = useState<string | null>(null);
    const [translatedContent, setTranslatedContent] = useState<string | null>(null);
    const [isTranslating, setIsTranslating] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState('English');

    useEffect(() => {
        // DOMPurify and window.location need a browser environment, so we run it on the client side.
        if (typeof window !== 'undefined') {
            setSanitizedContent(DOMPurify.sanitize(post.content));
            setCurrentUrl(window.location.href);
        }
    }, [post.content]);

    const handleTranslate = async (language: string) => {
        if (language.toLowerCase() === 'english') {
            setTranslatedTitle(null);
            setTranslatedContent(null);
            setSelectedLanguage(language);
            return;
        }

        setIsTranslating(true);
        setSelectedLanguage(language);
        try {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = post.content;
            const textContent = tempDiv.textContent || tempDiv.innerText || '';

            const [titleResult, contentResult] = await Promise.all([
                translateText({ text: post.title, targetLanguage: language }),
                translateText({ text: textContent, targetLanguage: language }),
            ]);
            
            setTranslatedTitle(titleResult.translatedText);
            const formattedContent = contentResult.translatedText.split('\n').filter(p => p.trim() !== '').map(p => `<p>${p}</p>`).join('');
            setTranslatedContent(DOMPurify.sanitize(formattedContent));

        } catch (error) {
            console.error("Translation failed", error);
            toast({
                variant: 'destructive',
                title: 'Translation Failed',
                description: 'Could not translate the content at this time.',
            });
            setSelectedLanguage('English');
        } finally {
            setIsTranslating(false);
        }
    };

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

    const finalTitle = translatedTitle ?? post.title;
    const finalContent = translatedContent ?? sanitizedContent;

    return (
        <div className="bg-[#EFECE9] dark:bg-[#050505] text-[#050505] dark:text-[#EFECE9]">
            <SiteHeader settings={settings} notifications={notifications} />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                    <Link href="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
                        <ChevronLeft className="h-4 w-4" />
                        <span>Back to all articles</span>
                    </Link>
                     <div className="flex items-center gap-2">
                        {isTranslating && (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                <span>Translating...</span>
                            </div>
                        )}
                        <Select onValueChange={handleTranslate} value={selectedLanguage} disabled={isTranslating}>
                            <SelectTrigger className="w-full sm:w-[180px]">
                                <Globe className="h-4 w-4 mr-2" />
                                <SelectValue placeholder="Translate post" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="English">English (Original)</SelectItem>
                                <SelectItem value="Indonesian">Indonesian</SelectItem>
                                <SelectItem value="Chinese">Chinese</SelectItem>
                                <SelectItem value="Japanese">Japanese</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
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
