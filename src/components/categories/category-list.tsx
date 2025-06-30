"use client";

import Link from "next/link";
import { Folder } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

type CategoryListProps = {
  categories: string[];
};

export function CategoryList({ categories }: CategoryListProps) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Folder />
          Categories
        </div>
      </SidebarGroupLabel>
      {categories.map((category) => (
        <SidebarMenuItem key={category}>
          <SidebarMenuButton size="sm" asChild className="w-full justify-start">
            <Link href={`/categories/${category.toLowerCase()}`}>
              {category}
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarGroup>
  );
}
