"use client";

import { Tag } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";

type TagListProps = {
  tags: string[];
};

export function TagList({ tags }: TagListProps) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>
        <div className="flex items-center gap-2">
          <Tag />
          Tags
        </div>
      </SidebarGroupLabel>
      <div className="flex flex-wrap gap-2 px-2">
          {tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                  {tag}
              </Badge>
          ))}
      </div>
    </SidebarGroup>
  );
}
