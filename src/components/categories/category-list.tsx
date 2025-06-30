"use client";

import { useState } from 'react';
import Link from "next/link";
import { Folder, Pencil, Plus, Trash2 } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { CategoryFormDialog } from './category-form-dialog';
import { DeleteCategoryDialog } from './delete-category-dialog';

type CategoryListProps = {
  categories: string[];
};

export function CategoryList({ categories }: CategoryListProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);

  const handleOpenCreate = () => {
    setSelectedCategory(undefined);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (category: string) => {
    setSelectedCategory(category);
    setIsFormOpen(true);
  };

  const handleOpenDelete = (category: string) => {
    setSelectedCategory(category);
    setIsDeleteOpen(true);
  };

  return (
    <>
      <SidebarGroup>
        <SidebarGroupLabel className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Folder />
            Categories
          </div>
          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={handleOpenCreate}>
            <Plus className="h-4 w-4" />
          </Button>
        </SidebarGroupLabel>
        {categories.map((category) => (
          <SidebarMenuItem key={category}>
            <div className="group flex items-center w-full">
              <SidebarMenuButton size="sm" asChild className="flex-grow">
                <Link href={`/categories/${category.toLowerCase()}`}>
                  {category}
                </Link>
              </SidebarMenuButton>
              <div className="hidden group-hover:flex items-center pr-2">
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleOpenEdit(category)}>
                  <Pencil className="h-3 w-3" />
                </Button>
                <Button variant="ghost" size="icon" className="h-6 w-6 text-destructive/80 hover:text-destructive" onClick={() => handleOpenDelete(category)}>
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </SidebarMenuItem>
        ))}
      </SidebarGroup>

      <CategoryFormDialog
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        category={selectedCategory}
      />
      {selectedCategory && (
        <DeleteCategoryDialog
          open={isDeleteOpen}
          onOpenChange={setIsDeleteOpen}
          categoryName={selectedCategory}
        />
      )}
    </>
  );
}
