import { getPosts } from "@/lib/posts";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PostsTable } from "@/components/admin/posts-table";
import { PlusCircle } from "lucide-react";

export default async function AdminPostsPage() {
  const posts = await getPosts();

  return (
    <div className="space-y-6">
       <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Manage Posts</h2>
            <p className="text-sm text-muted-foreground">
              Here you can edit and delete your blog posts.
            </p>
          </div>
          <Button asChild>
            <Link href="/admin/posts/create">
                <PlusCircle className="mr-2 h-4 w-4" />
                Create Post
            </Link>
          </Button>
      </div>
      <PostsTable posts={posts} />
    </div>
  );
}
