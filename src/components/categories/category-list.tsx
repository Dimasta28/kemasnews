"use client";

import { useState } from "react";
import Link from "next/link";
import { Folder, MoreVertical, Pencil, PlusCircle, Trash2 } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { CategoryFormDialog } from "@/components/categories/category-form-dialog";
import { DeleteCategoryDialog } from "@/components/categories/delete-category-dialog";
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
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    undefined
  );

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
            <PlusCircle className="h-4 w-4" />
          </Button>
        </SidebarGroupLabel>
        {categories.map((category) => (
          <SidebarMenuItem key={category}>
            <SidebarMenuButton size="sm" asChild className="w-full justify-start pr-8">
              <Link href={`/categories/${category.toLowerCase()}`}>
                {category}
              </Link>
            </SidebarMenuButton>
            <div className="absolute right-1 top-1/2 -translate-y-1/2 opacity-0 group-hover/menu-item:opacity-100 focus-within:opacity-100">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="right">
                  <DropdownMenuItem onClick={() => handleOpenEdit(category)} className="cursor-pointer">
                    <Pencil className="mr-2 h-4 w-4" /> Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleOpenDelete(category)} className="text-destructive cursor-pointer focus:text-destructive focus:bg-destructive/10">
                    <Trash2 className="mr-2 h-4 w-4" /> Delete
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
