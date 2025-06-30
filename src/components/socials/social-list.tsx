"use client";

import { useState } from 'react';
import { MoreHorizontal, Pencil, Plus, Share2, Trash2 } from "lucide-react";
import type { SocialLink } from '@/lib/posts';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { SocialFormDialog } from './social-form-dialog';
import { DeleteSocialDialog } from './delete-social-dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DynamicIcon, type IconName } from '@/components/ui/dynamic-icon';

type SocialListProps = {
  socialLinks: SocialLink[];
};

export function SocialList({ socialLinks }: SocialListProps) {
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
      <SidebarGroup>
        <SidebarGroupLabel className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Share2 />
            Social
          </div>
          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={handleOpenCreate}>
            <Plus className="h-4 w-4" />
          </Button>
        </SidebarGroupLabel>
        {socialLinks.map((link) => (
          <SidebarMenuItem key={link.id}>
            <SidebarMenuButton size="sm" asChild className="w-full justify-start pr-8">
              <a href={link.url} target="_blank" rel="noopener noreferrer">
                <DynamicIcon name={link.icon as IconName} />
                <span>{link.name}</span>
              </a>
            </SidebarMenuButton>
            <div className="absolute right-1 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-7 w-7">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleOpenEdit(link)} className="cursor-pointer">
                    <Pencil className="mr-2 h-3.5 w-3.5" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleOpenDelete(link)} className="text-destructive cursor-pointer focus:text-destructive focus:bg-destructive/10">
                    <Trash2 className="mr-2 h-3.5 w-3.5" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </SidebarMenuItem>
        ))}
      </SidebarGroup>

      <SocialFormDialog
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        socialLink={selectedLink}
      />
      {selectedLink && (
        <DeleteSocialDialog
          open={isDeleteOpen}
          onOpenChange={setIsDeleteOpen}
          socialLink={{id: selectedLink.id, name: selectedLink.name}}
        />
      )}
    </>
  );
}
