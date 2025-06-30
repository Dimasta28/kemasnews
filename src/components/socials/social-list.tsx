"use client";

import { Share2 } from "lucide-react";
import type { SocialLink } from '@/lib/posts';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { DynamicIcon, type IconName } from '@/components/ui/dynamic-icon';

type SocialListProps = {
  socialLinks: SocialLink[];
};

export function SocialList({ socialLinks }: SocialListProps) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>
        <div className="flex items-center gap-2">
          <Share2 />
          Social
        </div>
      </SidebarGroupLabel>
      {socialLinks.map((link) => (
        <SidebarMenuItem key={link.id}>
          <SidebarMenuButton size="sm" asChild className="w-full justify-start">
            <a href={link.url} target="_blank" rel="noopener noreferrer">
              <DynamicIcon name={link.icon as IconName} />
              <span>{link.name}</span>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarGroup>
  );
}
