
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { Post } from '@/services/postService';
import { PostsTable } from './posts-table';
import { db } from '@/lib/firebase';
import { collection, query, orderBy, onSnapshot, Timestamp } from 'firebase/firestore';

interface PostsClientProps {
  initialPosts: Post[];
}

export function PostsClient({
  initialPosts,
}: PostsClientProps) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);

  useEffect(() => {
    const qPosts = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
    const unsubPosts = onSnapshot(qPosts, (snapshot) => {
      const freshPosts = snapshot.docs.map(doc => {
        const data = doc.data();
        const date = (data.createdAt as Timestamp)?.toDate() || new Date();
        let cats: string[] = [];
        if (data.categories && Array.isArray(data.categories)) {
            cats = data.categories;
        } else if (data.category && typeof data.category === 'string') {
            cats = [data.category];
        }
        return {
            id: doc.id,
            title: data.title || '',
            description: data.description || '',
            status: data.status || 'Draft',
            author: data.author || 'KEMAS',
            date: date.toISOString(),
            content: data.content || '',
            categories: cats,
            tags: data.tags || [],
            featuredImage: data.featuredImage || 'https://placehold.co/600x400.png'
        } as Post;
      });
      setPosts(freshPosts);
    });

    return () => unsubPosts();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Posts</CardTitle>
        <CardDescription>View, create, and manage all your articles.</CardDescription>
      </CardHeader>
      <CardContent>
        <PostsTable posts={posts} />
      </CardContent>
    </Card>
  );
}
