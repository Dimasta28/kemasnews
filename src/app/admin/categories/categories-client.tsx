
'use client';

import { useState, useEffect } from 'react';
import { PlusCircle } from 'lucide-react';
import Link from 'next/link';
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
import type { Category } from '@/services/categoryService';
import { CategoryActions } from './category-actions';
import { db } from '@/lib/firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';

interface CategoriesClientProps {
  initialCategories: Category[];
}

export function CategoriesClient({ initialCategories }: CategoriesClientProps) {
  const [categories, setCategories] = useState<Category[]>(initialCategories);

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

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Categories</CardTitle>
          <CardDescription>
            Manage your post categories.
          </CardDescription>
        </div>
        <Button asChild size="sm" className="gap-1">
          <Link href="/admin/categories/create">
            <PlusCircle className="h-4 w-4" />
            Create Category
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className="hidden sm:table-cell">Slug</TableHead>
              <TableHead className="text-right">Post Count</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.length > 0 ? (
              categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell className="font-medium">{category.name}</TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {category.slug}
                  </TableCell>
                  <TableCell className="text-right">
                    {category.postCount}
                  </TableCell>
                  <TableCell className="text-right">
                    <CategoryActions categoryId={category.id} />
                  </TableCell>
                </TableRow>
              ))
            ) : (
                <TableRow>
                    <TableCell colSpan={4} className="h-24 text-center">
                    No categories found.
                    </TableCell>
                </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
