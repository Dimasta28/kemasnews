
import { getPost, getPosts } from '@/services/postService';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronLeft, MessageCircle, User, Calendar, Folder } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Badge } from '@/components/ui/badge';
import { Sidebar } from './sidebar';
import { CommentsSection } from './comments-section';
import { BackToTopButton } from '@/components/back-to-top-button';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { getFrontendSettings } from '@/services/settingsService';
import { getComments } from '@/services/commentService';

export default async function PostPage({ params }: { params: { id: string } }) {
  const [post, allPosts, settings, comments] = await Promise.all([
    getPost(params.id),
    getPosts(),
    getFrontendSettings(),
    getComments(params.id),
  ]);
  
  if (!post) {
    notFound();
  }
  
  const recentPosts = allPosts.filter(p => p.id !== params.id).slice(0, 5);

  return (
    <div className="bg-[#EFECE9] dark:bg-[#050505] text-[#050505] dark:text-[#EFECE9]">
      <SiteHeader />
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
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-4 text-foreground">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground mb-8">
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
                <span className="capitalize">{post.category}</span>
              </div>
              <span className="hidden sm:inline">&bull;</span>
              <div className="flex items-center gap-1.5">
                <MessageCircle className="h-4 w-4" />
                <span>{comments.length} Comments</span>
              </div>
            </div>
            
            {post.featuredImage && (
              <div className="relative w-full aspect-video mb-8 rounded-lg overflow-hidden shadow-lg">
                <Image
                  src={post.featuredImage}
                  alt={post.title}
                  fill
                  className="object-cover"
                  data-ai-hint="blog post image"
                  priority
                />
              </div>
            )}

            <div className="prose prose-lg dark:prose-invert max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {post.content}
              </ReactMarkdown>
            </div>

            <div className="mt-10 pt-6 border-t border-border">
                <h3 className="text-lg font-semibold mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="capitalize">{tag}</Badge>
                    ))}
                </div>
            </div>

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
