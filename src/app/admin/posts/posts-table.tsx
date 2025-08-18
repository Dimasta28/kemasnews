
'use client';

import { PlusCircle } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { Post } from '@/services/postService';
import { PostActions } from './post-actions';

interface PostsTableProps {
  posts: Post[];
}

export function PostsTable({ posts }: PostsTableProps) {
  return (
    <>
        <div className="flex justify-end mb-4">
            <Button asChild size="sm" className="gap-1">
            <Link href="/admin/posts/create">
                <PlusCircle className="h-4 w-4" />
                Create Post
            </Link>
            </Button>
        </div>
        <div className="rounded-md border">
            <Table>
            <TableHeader>
                <TableRow>
                <TableHead>Title</TableHead>
                <TableHead className="hidden sm:table-cell">Author</TableHead>
                <TableHead className="hidden md:table-cell">Status</TableHead>
                <TableHead className="hidden lg:table-cell">Date</TableHead>
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
                    <TableCell className="hidden md:table-cell">
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
                    <TableCell className="hidden lg:table-cell">
                    {post.date}
                    </TableCell>
                    <TableCell>
                    <PostActions postId={post.id} />
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </div>
    </>
  );
}

    