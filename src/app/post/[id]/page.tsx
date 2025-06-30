
import { getPost } from '@/services/postService';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Button } from '@/components/ui/button';

export default async function PostPage({ params }: { params: { id: string } }) {
  const post = await getPost(params.id);

  if (!post) {
    notFound();
  }

  return (
    <div className="bg-[#EFECE9] dark:bg-[#050505]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-24">
        <div className="mb-8">
          <Button asChild variant="ghost" className="text-sm text-muted-foreground hover:text-foreground">
            <Link href="/" className="inline-flex items-center gap-1">
              <ChevronLeft className="h-4 w-4" />
              <span>Back to all articles</span>
            </Link>
          </Button>
        </div>

        <article>
          <div className="mb-4">
             <span className="px-3 py-1 text-sm font-semibold rounded-full bg-primary/10 text-primary">
                {post.category}
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-4 text-foreground">
            {post.title}
          </h1>
          <div className="text-sm text-muted-foreground mb-8">
            <span>By {post.author}</span>
            <span className="mx-2">&bull;</span>
            <span>{post.date}</span>
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

          <div className="prose prose-lg max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {post.content}
            </ReactMarkdown>
          </div>
        </article>
      </div>
    </div>
  );
}
