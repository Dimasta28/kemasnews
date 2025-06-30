
import Link from "next/link";
import {
  Folder,
  Home,
  PenSquare,
  Search,
  Tag,
  User,
} from "lucide-react";

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
  SidebarGroup,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { getCategories, getSocialLinks, getTags } from "@/lib/posts";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CategoryList } from "@/components/categories/category-list";
import { TagList } from "@/components/tags/tag-list";
import { SocialList } from "@/components/socials/social-list";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = await getCategories();
  const tags = await getTags();
  const socialLinks = await getSocialLinks();

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <Logo />
        </SidebarHeader>
        <SidebarContent>
          <ScrollArea className="h-full">
            <SidebarMenu>
              <SidebarGroup>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search..." className="pl-8 w-full" />
                </div>
              </SidebarGroup>

              <SidebarGroup>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/">
                      <Home />
                      <span>Home</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/admin">
                      <PenSquare />
                      <span>Create Post</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarGroup>
              
              <SidebarSeparator />

              <SocialList socialLinks={socialLinks} />

              <SidebarSeparator />

              <CategoryList categories={categories} />
              
              <SidebarSeparator />

              <TagList tags={tags} />
            </SidebarMenu>
          </ScrollArea>
        </SidebarContent>
        <SidebarFooter className="flex-row justify-between border-t border-sidebar-border p-2">
          <Button variant="ghost" className="gap-2">
            <User />
            <span className="group-data-[collapsible=icon]:hidden">Login</span>
          </Button>
          <ThemeToggle />
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between gap-4 border-b bg-background/80 px-4 backdrop-blur-md sm:px-6">
          <SidebarTrigger className="md:hidden" />
          <div />
          <h1 className="font-headline text-2xl font-bold text-primary">
            CanvasBlog
          </h1>
        </header>
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="animation-fade-in">{children}</div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
