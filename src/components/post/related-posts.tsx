import { BlogPostCard } from "@/components/blog-post-card";
import type { Post } from "@/lib/posts";

type RelatedPostsProps = {
  posts: Post[];
};

export function RelatedPosts({ posts }: RelatedPostsProps) {
  return (
    <section className="space-y-6">
      <h2 className="font-headline text-3xl font-bold text-center">
        Related Articles
      </h2>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <BlogPostCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
