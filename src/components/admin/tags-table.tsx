"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Pencil, PlusCircle, Trash2 } from "lucide-react";
import { TagFormDialog } from "@/components/tags/tag-form-dialog";
import { DeleteTagDialog } from "@/components/tags/delete-tag-dialog";

export function TagsTable({ tags }: { tags: string[] }) {
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
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Manage Tags</h2>
            <p className="text-sm text-muted-foreground">
              A list of all tags in your blog.
            </p>
          </div>
          <Button onClick={handleOpenCreate}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Tag
          </Button>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead className="w-[50px]">
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tags.map((tag) => (
                <TableRow key={tag}>
                  <TableCell className="font-medium">{tag}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleOpenEdit(tag)} className="cursor-pointer">
                          <Pencil className="mr-2 h-4 w-4" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleOpenDelete(tag)} className="text-destructive cursor-pointer focus:text-destructive focus:bg-destructive/10">
                          <Trash2 className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
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
