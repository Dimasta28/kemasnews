
'use client';

import { useState } from 'react';
import { PlusCircle } from 'lucide-react';
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
import { CategoryForm } from '../categories/category-form';

interface CategoriesTableProps {
  categories: Category[];
}

export function CategoriesTable({ categories }: CategoriesTableProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <>
      <div className="flex justify-end mb-4">
        <Button size="sm" className="gap-1" onClick={() => setIsFormOpen(true)}>
            <PlusCircle className="h-4 w-4" />
            Create Category
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
                  <CategoryActions category={category} />
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
      <CategoryForm isOpen={isFormOpen} setIsOpen={setIsFormOpen} />
    </>
  );
}
