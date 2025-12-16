
import { getPosts } from '@/services/postService';
import { PostsTable } from './posts-table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default async function PostsPage() {
  const initialPosts = await getPosts();

  return (
    <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Posts</h1>
          <p className="text-muted-foreground">Manage all of your posts, from drafts to published articles.</p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>All Posts</CardTitle>
            <CardDescription>View, create, and manage all your articles.</CardDescription>
          </CardHeader>
          <CardContent>
            <PostsTable posts={initialPosts} />
          </CardContent>
        </Card>
    </div>
  );
}
