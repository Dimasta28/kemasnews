"use client";

import { useState } from "react";
import { Tag, MoreVertical, Pencil, PlusCircle, Trash2 } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { TagFormDialog } from "@/components/tags/tag-form-dialog";
import { DeleteTagDialog } from "@/components/tags/delete-tag-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type TagListProps = {
  tags: string[];
};

export function TagList({ tags }: TagListProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState<string | undefined>(undefined);

  const handleOpenCreate = () => {
    setSelectedTag(undefined);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (tag: string) => {
    setSelectedTag(tag);
    setIsFormOpen(true);
  };

  const handleOpenDelete = (tag: string) => {
    setSelectedTag(tag);
    setIsDeleteOpen(true);
  };

  return (
    <>
      <SidebarGroup>
        <SidebarGroupLabel className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Tag />
            Tags
          </div>
          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={handleOpenCreate}>
            <PlusCircle className="h-4 w-4" />
          </Button>
        </SidebarGroupLabel>
        {tags.map((tag) => (
          <SidebarMenuItem key={tag}>
            <SidebarMenuButton size="sm" asChild className="w-full justify-start pr-8">
              {/* Using a non-functional link as there's no page for individual tags yet */}
              <a href="#" onClick={(e) => e.preventDefault()} className="cursor-default">
                {tag}
              </a>
            </SidebarMenuButton>
            <div className="absolute right-1 top-1/2 -translate-y-1/2 opacity-0 group-hover/menu-item:opacity-100 focus-within:opacity-100">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="right">
                  <DropdownMenuItem onClick={() => handleOpenEdit(tag)} className="cursor-pointer">
                    <Pencil className="mr-2 h-4 w-4" /> Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleOpenDelete(tag)} className="text-destructive cursor-pointer focus:text-destructive focus:bg-destructive/10">
                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </SidebarMenuItem>
        ))}
      </SidebarGroup>
      <TagFormDialog
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        tag={selectedTag}
      />
      {selectedTag && (
        <DeleteTagDialog
          open={isDeleteOpen}
          onOpenChange={setIsDeleteOpen}
          tagName={selectedTag}
        />
      )}
    </>
  );
}
