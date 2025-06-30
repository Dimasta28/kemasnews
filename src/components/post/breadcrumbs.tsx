import type { Post } from "@/lib/posts";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

type BreadcrumbsProps = {
  post: Post;
};

export function Breadcrumbs({ post }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex items-center gap-2 text-sm text-muted-foreground">
        <li>
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
        </li>
        <li>
          <ChevronRight className="h-4 w-4" />
        </li>
        <li>
          <Link
            href={`/categories/${post.category.toLowerCase()}`}
            className="hover:text-primary transition-colors"
          >
            {post.category}
          </Link>
        </li>
        <li>
          <ChevronRight className="h-4 w-4" />
        </li>
        <li className="font-medium text-foreground truncate max-w-xs">
          {post.title}
        </li>
      </ol>
    </nav>
  );
}
