"use client";

import { useState } from 'react';
import { MoreHorizontal, Pencil, Plus, Tag, Trash2 } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TagFormDialog } from './tag-form-dialog';
import { DeleteTagDialog } from './delete-tag-dialog';
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
            <Plus className="h-4 w-4" />
          </Button>
        </SidebarGroupLabel>
        <div className="flex flex-wrap gap-2 px-2">
            {tags.map((tag) => (
                <div key={tag} className="group relative">
                    <Badge variant="secondary" className="pr-7 hover:bg-primary/20">
                        {tag}
                    </Badge>
                    <div className="absolute right-0 top-0 flex h-full items-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button className="h-full px-1 flex items-center justify-center rounded-r-full focus:outline-none focus:ring-1 focus:ring-ring">
                                    <MoreHorizontal className="h-3 w-3" />
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleOpenEdit(tag)} className="cursor-pointer">
                                    <Pencil className="mr-2 h-3.5 w-3.5" />
                                    Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleOpenDelete(tag)} className="text-destructive cursor-pointer focus:text-destructive focus:bg-destructive/10">
                                    <Trash2 className="mr-2 h-3.5 w-3.5" />
                                    Delete
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            ))}
        </div>
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
