import { getPostBySlug, getRelatedPosts, type Post } from "@/lib/posts";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/post/breadcrumbs";
import { SocialShareButtons } from "@/components/post/social-share-buttons";
import { AuthorBio } from "@/components/post/author-bio";
import { RelatedPosts } from "@/components/post/related-posts";
import { NewsletterCta } from "@/components/post/newsletter-cta";
import { CommentSection } from "@/components/post/comment-section";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: `/posts/${post.slug}`,
      images: [
        {
          url: post.imageUrl,
          width: 1200,
          height: 600,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.imageUrl],
    },
  };
}

export default async function PostPage({ params }: Props) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedPosts({
    currentSlug: post.slug,
    category: post.category,
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <Breadcrumbs post={post} />
      <article className="space-y-12">
        <header className="space-y-4 text-center">
          <Badge variant="secondary" className="text-sm">
            {post.category}
          </Badge>
          <h1 className="font-headline text-4xl md:text-5xl font-extrabold tracking-tight">
            {post.title}
          </h1>
          <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Avatar className="h-9 w-9">
                <AvatarImage src={post.author.imageUrl} alt={post.author.name} />
                <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <span>{post.author.name}</span>
            </div>
            <span>&middot;</span>
            <span>{post.date}</span>
          </div>
        </header>

        <div className="rounded-lg overflow-hidden shadow-xl aspect-video">
          <Image
            src={post.imageUrl}
            alt={post.title}
            width={1200}
            height={600}
            className="w-full h-full object-cover"
            priority
            data-ai-hint="blog header"
          />
        </div>

        <div className="flex justify-center">
          <div
            className="prose prose-lg dark:prose-invert max-w-2xl"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>

        <footer className="space-y-12">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-sm font-semibold mr-2">Tags:</h3>
              {post.tags.map((tag) => (
                <Badge key={tag} variant="default">
                  {tag}
                </Badge>
              ))}
            </div>
            <SocialShareButtons title={post.title} />
          </div>

          <Separator />
          <AuthorBio author={post.author} />
          
          {relatedPosts.length > 0 && (
            <>
              <Separator />
              <RelatedPosts posts={relatedPosts} />
            </>
          )}

          <Separator />
          <NewsletterCta />

          <Separator />
          <CommentSection />
        </footer>
      </article>
    </div>
  );
}
