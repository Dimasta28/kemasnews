
'use client';

import { useState, useEffect } from 'react';
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
import type { Post } from '@/services/postService';
import { PostActions } from './post-actions';
import { db } from '@/lib/firebase';
import { collection, onSnapshot, query, orderBy, Timestamp } from 'firebase/firestore';

interface PostsClientProps {
  initialPosts: Post[];
}

export function PostsClient({ initialPosts }: PostsClientProps) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);

  useEffect(() => {
    const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const freshPosts = snapshot.docs.map(doc => {
        const data = doc.data();
        const date = (data.createdAt as Timestamp)?.toDate() || new Date();
        
        let categories: string[] = [];
        if (data.categories && Array.isArray(data.categories)) {
          categories = data.categories;
        } else if (data.category && typeof data.category === 'string') {
          categories = [data.category];
        }
        
        return {
            id: doc.id,
            title: data.title || '',
            description: data.description || '',
            status: data.status || 'Draft',
            author: data.author || 'KEMAS',
            date: date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
            content: data.content || '',
            categories: categories,
            tags: data.tags || [],
            featuredImage: data.featuredImage || 'https://placehold.co/600x400.png'
        } as Post;
      });
      setPosts(freshPosts);
    });

    return () => unsubscribe();
  }, []);

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
