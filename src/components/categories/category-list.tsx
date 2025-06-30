"use client";

import { useState } from 'react';
import Link from "next/link";
import { Folder, MoreHorizontal, Pencil, Plus, Trash2 } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { CategoryFormDialog } from './category-form-dialog';
import { DeleteCategoryDialog } from './delete-category-dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
            <SidebarMenuButton size="sm" asChild className="w-full justify-start pr-8">
              <Link href={`/categories/${category.toLowerCase()}`}>
                {category}
              </Link>
            </SidebarMenuButton>
            <div className="absolute right-1 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-7 w-7">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleOpenEdit(category)} className="cursor-pointer">
                    <Pencil className="mr-2 h-3.5 w-3.5" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleOpenDelete(category)} className="text-destructive cursor-pointer focus:text-destructive focus:bg-destructive/10">
                    <Trash2 className="mr-2 h-3.5 w-3.5" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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
