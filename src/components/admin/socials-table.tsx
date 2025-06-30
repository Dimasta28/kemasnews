"use client";

import { useState } from "react";
import type { SocialLink } from "@/lib/posts";
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
import { SocialFormDialog } from "@/components/socials/social-form-dialog";
import { DeleteSocialDialog } from "@/components/socials/delete-social-dialog";
import { DynamicIcon, type IconName } from "@/components/ui/dynamic-icon";

export function SocialsTable({ socialLinks }: { socialLinks: SocialLink[] }) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedLink, setSelectedLink] = useState<SocialLink | undefined>(undefined);

  const handleOpenCreate = () => {
    setSelectedLink(undefined);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (link: SocialLink) => {
    setSelectedLink(link);
    setIsFormOpen(true);
  };

  const handleOpenDelete = (link: SocialLink) => {
    setSelectedLink(link);
    setIsDeleteOpen(true);
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Manage Social Links</h2>
            <p className="text-sm text-muted-foreground">
              Add, edit, or remove your social media links.
            </p>
          </div>
          <Button onClick={handleOpenCreate}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Link
          </Button>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[150px]">Name</TableHead>
                <TableHead>URL</TableHead>
                <TableHead className="w-[100px]">Icon</TableHead>
                <TableHead className="w-[50px]">
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {socialLinks.map((link) => (
                <TableRow key={link.id}>
                  <TableCell className="font-medium">{link.name}</TableCell>
                  <TableCell>
                    <a href={link.url} target="_blank" rel="noopener noreferrer" className="hover:underline truncate block max-w-xs">
                      {link.url}
                    </a>
                  </TableCell>
                  <TableCell>
                    <DynamicIcon name={link.icon as IconName} className="h-5 w-5" />
                  </TableCell>
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
                        <DropdownMenuItem onClick={() => handleOpenEdit(link)} className="cursor-pointer">
                           <Pencil className="mr-2 h-4 w-4" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleOpenDelete(link)} className="text-destructive cursor-pointer focus:text-destructive focus:bg-destructive/10">
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
      <SocialFormDialog
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        socialLink={selectedLink}
      />
      {selectedLink && (
        <DeleteSocialDialog
          open={isDeleteOpen}
          onOpenChange={setIsDeleteOpen}
          socialLink={{ id: selectedLink.id, name: selectedLink.name }}
        />
      )}
    </>
  );
}
