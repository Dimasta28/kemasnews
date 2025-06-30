"use client";

import { useState } from 'react';
import { Pencil, Plus, Tag, Trash2 } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TagFormDialog } from './tag-form-dialog';
import { DeleteTagDialog } from './delete-tag-dialog';

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
                    <Badge variant="secondary" className="pr-7 cursor-pointer hover:bg-primary/20">
                        {tag}
                    </Badge>
                    <div className="absolute right-0 top-0 hidden h-full items-center pr-1 group-hover:flex">
                         <button onClick={() => handleOpenEdit(tag)} className="h-4 w-4 flex items-center justify-center rounded-full hover:bg-black/10 dark:hover:bg-white/10">
                            <Pencil className="h-2 w-2" />
                         </button>
                         <button onClick={() => handleOpenDelete(tag)} className="h-4 w-4 flex items-center justify-center rounded-full text-destructive/80 hover:text-destructive hover:bg-black/10 dark:hover:bg-white/10">
                             <Trash2 className="h-2 w-2" />
                         </button>
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
