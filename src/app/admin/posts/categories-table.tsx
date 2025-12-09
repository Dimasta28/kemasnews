
'use client';

import { useState, useEffect } from 'react';
import { PlusCircle } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { Category } from '@/services/categoryService';
import { CategoryActions } from '../categories/category-actions';

interface CategoriesTableProps {
  categories: Category[];
}

export function CategoriesTable({ categories }: CategoriesTableProps) {
  return (
    <>
      <div className="flex justify-end mb-4">
        <Button asChild size="sm" className="gap-1">
            <Link href="/admin/categories/create">
                <PlusCircle className="h-4 w-4" />
                Create Category
            </Link>
        </Button>
      </div>
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
    </>
  );
}
