

import { PlusCircle } from 'lucide-react';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getPosts, type Post } from '@/services/postService';
import { PostActions } from './post-actions';

export default async function PostsPage() {
  const posts: Post[] = await getPosts();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Posts</CardTitle>
          <CardDescription>
            Manage your blog posts. Create, edit, and delete posts here.
          </CardDescription>
        </div>
        <Button asChild size="sm" className="gap-1">
          <Link href="/admin/posts/create">
            <PlusCircle className="h-4 w-4" />
            Create Post
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead className="hidden sm:table-cell">Author</TableHead>
              <TableHead className="hidden sm:table-cell">Status</TableHead>
              <TableHead className="hidden md:table-cell">Date</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.map((post) => (
              <TableRow key={post.id}>
                <TableCell className="font-medium">{post.title}</TableCell>
                <TableCell className="hidden sm:table-cell">
                  {post.author}
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <Badge
                    variant={
                      post.status === 'Published'
                        ? 'secondary'
                        : 'outline'
                    }
                  >
                    {post.status}
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {post.date}
                </TableCell>
                <TableCell>
                  <PostActions postId={post.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
