
'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { type Post } from '@/services/postService';
import { type Category } from '@/services/categoryService';
import { PostsTable } from './posts-table';
import { CategoriesTable } from './categories-table';
import { db } from '@/lib/firebase';
import { collection, query, orderBy, onSnapshot, Timestamp, getDocs } from 'firebase/firestore';
import { format, parseISO } from 'date-fns';

interface PostsPageClientProps {
  initialPosts: Post[];
  initialCategories: Category[];
}

export function PostsPageClient({ initialPosts, initialCategories }: PostsPageClientProps) {
  const searchParams = useSearchParams();
  const defaultTab = searchParams.get('tab') === 'categories' ? 'categories' : 'posts';

  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [categories, setCategories] = useState<Category[]>(initialCategories);

  useEffect(() => {
    // Listener for Posts
    const postsQuery = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
    const unsubscribePosts = onSnapshot(postsQuery, (snapshot) => {
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
            date: date.toISOString(),
            content: data.content || '',
            categories: categories,
            tags: data.tags || [],
            featuredImage: data.featuredImage || 'https://placehold.co/600x400.png'
        } as Post;
      });
      setPosts(freshPosts);
    });

    // Listener for Categories
    let categoryData: Omit<Category, 'postCount'>[] = [];
    let postDataForCount: { categories: string[] }[] = [];

    const updateCategoryCounts = () => {
      if (categoryData.length === 0) return;

      const categoryCounts = postDataForCount.reduce((acc, post) => {
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

    const qPostsForCount = query(collection(db, 'posts'));
    const unsubPosts = onSnapshot(qPostsForCount, (snapshot) => {
      postDataForCount = snapshot.docs.map(doc => doc.data() as { categories: string[] });
      updateCategoryCounts();
    });


    return () => {
      unsubscribePosts();
      unsubCategories();
      unsubPosts();
    };
  }, []);

  return (
    <Tabs defaultValue={defaultTab} className="w-full">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Content Management</h1>
          <p className="text-muted-foreground">Manage your blog posts and their categories.</p>
        </div>
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger value="posts" className="w-full sm:w-auto">Posts</TabsTrigger>
          <TabsTrigger value="categories" className="w-full sm:w-auto">Categories</TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="posts">
        <Card>
          <CardHeader>
            <CardTitle>Posts</CardTitle>
            <CardDescription>Create, edit, and manage the articles on your blog.</CardDescription>
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
            <CardDescription>Manage the categories used to organize your posts.</CardDescription>
          </CardHeader>
          <CardContent>
            <CategoriesTable categories={categories} />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
