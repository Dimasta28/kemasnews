
import { getPosts } from "@/lib/posts";
import { BlogPostCard } from "@/components/blog-post-card";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from 'next/image';
import Link from "next/link";

export default async function HomePage() {
  const posts = await getPosts();
  const featuredPost = posts[0];
  const otherPosts = posts.slice(1);

  return (
    <div className="space-y-8">
      <h1 className="font-headline text-4xl font-bold tracking-tight lg:text-5xl">
        The Canvas
      </h1>
      <p className="text-lg text-muted-foreground">
        A space for creative thoughts on design, technology, and development.
      </p>
      
      {featuredPost && (
        <Card className="overflow-hidden shadow-lg transition-shadow hover:shadow-xl">
            <div className="md:flex">
                <div className="md:w-1/2">
                  <Image
                    src={featuredPost.imageUrl}
                    alt={featuredPost.title}
                    width={600}
                    height={400}
                    className="h-full w-full object-cover"
                    data-ai-hint="blog abstract"
                  />
                </div>
                <div className="p-6 md:w-1/2 flex flex-col justify-center">
                    <CardHeader>
                        <CardTitle className="font-headline text-3xl">
                            <Link href={`/posts/${featuredPost.slug}`} className="hover:text-primary transition-colors">
                                {featuredPost.title}
                            </Link>
                        </CardTitle>
                        <CardDescription>{featuredPost.date} &middot; {featuredPost.author.name}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">{featuredPost.excerpt}</p>
                    </CardContent>
                </div>
            </div>
        </Card>
      )}

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {otherPosts.map((post) => (
          <BlogPostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
