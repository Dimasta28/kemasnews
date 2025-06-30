import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import type { Post } from "@/lib/posts";

export function BlogPostCard({ post }: { post: Post }) {
  return (
    <Card className="flex flex-col overflow-hidden rounded-lg shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
      <Link href={`/posts/${post.slug}`} className="block">
        <Image
          src={post.imageUrl}
          alt={post.title}
          width={400}
          height={250}
          className="h-48 w-full object-cover"
          data-ai-hint="blog abstract"
        />
      </Link>
      <CardHeader>
        <Badge variant="secondary" className="w-fit mb-2">{post.category}</Badge>
        <CardTitle className="font-headline text-xl">
          <Link href={`/posts/${post.slug}`} className="hover:text-primary transition-colors">
            {post.title}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>
      </CardContent>
      <CardFooter>
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9">
            <AvatarImage src={post.author.imageUrl} alt={post.author.name} />
            <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">{post.author.name}</p>
            <p className="text-xs text-muted-foreground">{post.date}</p>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
