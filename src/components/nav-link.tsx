"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

export function NavLink({ href, children }: NavLinkProps) {
  const pathname = usePathname();
  // Match parent routes as well e.g. /admin/posts should match /admin/posts/create
  const isActive = pathname.startsWith(href) && (href !== '/admin' || pathname === '/admin');

  return (
    <Link
      href={href}
      className={cn(
        "whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary",
        isActive && "font-semibold text-primary"
      )}
    >
      {children}
    </Link>
  );
}
