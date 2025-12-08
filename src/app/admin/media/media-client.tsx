
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { Post } from '@/services/postService';
import type { Category } from '@/services/categoryService';
import { PostsTable } from './posts-table';
import { CategoriesTable } from './categories-table';
import { TagsTable } from './tags-table';
import { db } from '@/lib/firebase';
import { collection, query, orderBy, onSnapshot, getDocs, Timestamp } from 'firebase/firestore';

interface MediaClientProps {
  initialPosts: Post[];
  initialCategories: Category[];
  initialTags: any[];
  activeTab: 'posts' | 'categories' | 'tags';
}

export function PostsClient({
  initialPosts,
  initialCategories,
  initialTags,
  activeTab,
}: MediaClientProps) {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [categories, setCategories] = useState<Category[]>(initialCategories);

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
  
   useEffect(() => {
    let categoryData: Omit<Category, 'postCount'>[] = [];
    let postData: { categories: string[] }[] = [];

    const updateCategoryCounts = () => {
      if (categoryData.length === 0) return;

      const categoryCounts = postData.reduce((acc, post) => {
        if (post.categories && Array.isArray(post.categories)) {
          post.categories.forEach(catName => {
            acc[catName] = (acc[catName] || 0) + 1;
          });
        }
        return acc;
      }, {} as Record<string, number>);

      const categoriesWithCounts = categoryData.map(category => ({
        ...category,
        postCount: categoryCounts[category.name] || 0
      }));
      setCategories(categoriesWithCounts);
    };

    const qCategories = query(collection(db, 'categories'), orderBy('name', 'asc'));
    const unsubCategories = onSnapshot(qCategories, (snapshot) => {
      categoryData = snapshot.docs.map(doc => ({
        id: doc.id,
        name: doc.data().name || '',
        slug: doc.data().slug || '',
      }));
      updateCategoryCounts();
    });

    const qPosts = query(collection(db, 'posts'));
    const unsubPosts = onSnapshot(qPosts, (snapshot) => {
      postData = snapshot.docs.map(doc => doc.data() as { categories: string[] });
      updateCategoryCounts();
    });

    return () => {
      unsubCategories();
      unsubPosts();
    };
  }, []);

  const onTabChange = (value: string) => {
    router.push(`/admin/posts?tab=${value}`, { scroll: false });
  };

  return (
    <Tabs defaultValue={activeTab} onValueChange={onTabChange}>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Posts</h1>
          <p className="text-muted-foreground">Manage your posts, categories, and tags.</p>
        </div>
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger value="posts" className="w-full sm:w-auto">Posts</TabsTrigger>
          <TabsTrigger value="categories" className="w-full sm:w-auto">Categories</TabsTrigger>
          <TabsTrigger value="tags" className="w-full sm:w-auto">Tags</TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="posts">
        <Card>
          <CardHeader>
            <CardTitle>All Posts</CardTitle>
            <CardDescription>View, create, and manage all your articles.</CardDescription>
          </CardHeader>
          <CardContent>
            <PostsTable posts={posts} />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="categories">
        <Card>
          <CardHeader>
            <CardTitle>Categories</CardTitle>
            <CardDescription>Manage the categories for your posts.</CardDescription>
          </CardHeader>
          <CardContent>
            <CategoriesTable categories={categories} />
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="tags">
        <Card>
          <CardHeader>
            <CardTitle>Tags</CardTitle>
            <CardDescription>Manage the tags for your posts.</CardDescription>
          </CardHeader>
          <CardContent>
            <TagsTable tags={initialTags} />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
