import { getPostBySlug } from "@/lib/posts";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto">
      <div className="mb-8">
        <Link href="/" className="inline-flex items-center gap-2 text-primary hover:underline">
            <ArrowLeft className="h-4 w-4" />
            Back to all posts
        </Link>
      </div>

      <header className="mb-8">
        <h1 className="font-headline text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          {post.title}
        </h1>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
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
      
      <div className="mb-8 rounded-lg overflow-hidden shadow-lg">
        <Image
          src={post.imageUrl}
          alt={post.title}
          width={1200}
          height={600}
          className="w-full h-auto object-cover"
          priority
          data-ai-hint="blog header"
        />
      </div>

      <div 
        className="prose prose-lg dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
      
      <footer className="mt-12 pt-8 border-t">
        <h3 className="text-lg font-semibold mb-4">Tags</h3>
        <div className="flex flex-wrap gap-2">
            {post.tags.map(tag => (
                <Badge key={tag} variant="default">{tag}</Badge>
            ))}
        </div>
      </footer>
    </article>
  );
}
