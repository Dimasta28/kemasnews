
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
import { translateText } from '@/ai/flows/translate-text-flow';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/use-auth';

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
    const { user } = useAuth();

    const [translations, setTranslations] = useState<Record<string, string> | null>(null);
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
            setTranslations(null);
            setSelectedLanguage(language);
            return;
        }

        setIsTranslating(true);
        setSelectedLanguage(language);
        try {
            const textsToTranslate = {
                postTitle: post.title,
                postContent: post.content,
                backLink: "Back to all articles",
                commentsLabel: "Comments",
                tagsLabel: "Tags",
                shareLabel: "Share:",
                recentPostsTitle: "Recent Posts",
                leaveReplyTitle: "Leave a Reply",
                commentingAsText: "You are commenting as",
                postCommentButton: "Post Comment",
                postingButton: "Posting...",
                joinConversationTitle: "Join the Conversation",
                mustBeLoggedInText: "You must be logged in to leave a comment.",
                logInButton: "Log In",
                firstToCommentText: "Be the first to leave a comment.",
                replyButton: "Reply",
            };

            const { translations: result } = await translateText({ texts: textsToTranslate, targetLanguage: language });
            
            if (result.postContent) {
                result.postContent = DOMPurify.sanitize(result.postContent);
            }

            setTranslations(result);

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

    const finalTitle = translations?.postTitle ?? post.title;
    const finalContent = translations?.postContent ?? sanitizedContent;

    return (
        <div className="bg-[#EFECE9] dark:bg-[#050505] text-[#050505] dark:text-[#EFECE9]">
            <SiteHeader 
                settings={settings} 
                notifications={notifications}
                onTranslate={handleTranslate}
                selectedLanguage={selectedLanguage}
                isTranslating={isTranslating}
            />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                    <Link href="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
                        <ChevronLeft className="h-4 w-4" />
                        <span>{translations?.backLink || 'Back to all articles'}</span>
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
                                <span>{comments.length} {translations?.commentsLabel || 'Comments'}</span>
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
                                    <h3 className="text-lg font-semibold mb-3">{translations?.tagsLabel || 'Tags'}</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {post.tags.map((tag) => (
                                            <Badge key={tag} variant="secondary" className="capitalize">{tag}</Badge>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <h4 className="text-sm font-semibold text-muted-foreground mr-2 hidden sm:block">{translations?.shareLabel || 'Share:'}</h4>
                                  <SocialShare title={post.title} url={currentUrl} />
                                </div>
                            </div>
                        </motion.div>

                        <CommentsSection 
                            postId={post.id} 
                            initialComments={comments}
                            uiText={{
                                commentsLabel: translations?.commentsLabel,
                                leaveReplyTitle: translations?.leaveReplyTitle,
                                commentingAsText: translations?.commentingAsText,
                                postCommentButton: translations?.postCommentButton,
                                postingButton: translations?.postingButton,
                                joinConversationTitle: translations?.joinConversationTitle,
                                mustBeLoggedInText: translations?.mustBeLoggedInText,
                                logInButton: translations?.logInButton,
                                firstToCommentText: translations?.firstToCommentText,
                                replyButton: translations?.replyButton,
                            }}
                        />
                    </article>

                    {/* Sidebar */}
                    <aside className="lg:col-span-1 mt-12 lg:mt-0">
                        <Sidebar 
                            recentPosts={recentPosts} 
                            banner={settings.sidebarBanner} 
                            recentPostsTitle={translations?.recentPostsTitle}
                        />
                    </aside>
                </div>
            </main>
            <SiteFooter settings={settings} />
            <BackToTopButton />
        </div>
    );
}
