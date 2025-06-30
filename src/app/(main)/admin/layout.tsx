import { NavLink } from "@/components/nav-link";
import { Separator } from "@/components/ui/separator";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <h1 className="font-headline text-3xl font-bold tracking-tight md:text-4xl">Admin Panel</h1>
        <p className="text-muted-foreground">
          Manage your blog's content and settings from one place.
        </p>
      </header>
      <Separator />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="-mx-4 lg:w-1/5">
          <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
            <NavLink href="/admin">Dashboard</NavLink>
            <NavLink href="/admin/posts">Posts</NavLink>
            <NavLink href="/admin/categories">Categories</NavLink>
            <NavLink href="/admin/tags">Tags</NavLink>
            <NavLink href="/admin/socials">Social Links</NavLink>
          </nav>
        </aside>
        <div className="flex-1 lg:max-w-4xl">{children}</div>
      </div>
    </div>
  );
}
