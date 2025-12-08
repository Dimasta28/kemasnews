'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  FileText,
  Folder,
  Home,
  MessageSquare,
  Settings,
  Tags,
  Megaphone,
  Briefcase,
  ChevronRight,
  Shield,
  Bell,
  ExternalLink,
} from 'lucide-react';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/hooks/use-auth';

function AdminLoadingScreen() {
    return (
        <div className="flex h-svh w-full items-center justify-center bg-background">
            <div className="flex flex-col items-center gap-2">
                 <svg
                    className="animate-spin h-8 w-8 text-primary"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    ></circle>
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                </svg>
                <p className="text-sm text-muted-foreground">Verifying access...</p>
            </div>
        </div>
    );
}

export function AdminLayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();
  const [isCareersOpen, setIsCareersOpen] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace('/login');
    }
  }, [isLoading, user, router]);
  
   useEffect(() => {
    if (pathname.startsWith('/admin/careers') || pathname.startsWith('/admin/applicants') || pathname.startsWith('/admin/job-openings')) {
        setIsCareersOpen(true);
    }
  }, [pathname]);

  if (isLoading || !user) {
    return <AdminLoadingScreen />;
  }

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <Image
            src="https://kemaspkg.com/media/wp-content/uploads/2024/04/logo-baru-kemas-2023-03.png"
            alt="Kemas Logo"
            width={150}
            height={37}
            className="hidden dark:block"
            priority
          />
          <Image
            src="https://www.kemaspkg.com/wp-content/uploads/2024/04/logo-baru-kemas-2023-01.png"
            alt="Kemas Logo"
            width={150}
            height={37}
            className="block dark:hidden"
            priority
          />
        </SidebarHeader>
        <SidebarContent className="p-2">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname === '/admin/dashboard'}
              >
                <Link href="/admin/dashboard">
                  <Home />
                  Dashboard
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname.startsWith('/admin/posts')}
              >
                <Link href="/admin/posts">
                  <FileText />
                  Posts
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname.startsWith('/admin/comments')}
              >
                <Link href="/admin/comments">
                  <MessageSquare />
                  Comments
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname.startsWith('/admin/notifications')}
              >
                <Link href="/admin/notifications">
                  <Bell />
                  Notifications
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname.startsWith('/admin/promo-banner')}
              >
                <Link href="/admin/promo-banner">
                  <Megaphone />
                  Banner
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname.startsWith('/admin/privacy-policy')}
                >
                  <Link href="/admin/privacy-policy">
                    <Shield />
                    Privacy Policy
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
             <SidebarMenuItem>
                <Collapsible open={isCareersOpen} onOpenChange={setIsCareersOpen}>
                    <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                            isActive={pathname.startsWith('/admin/careers') || pathname.startsWith('/admin/applicants') || pathname.startsWith('/admin/job-openings')}
                            className="w-full justify-between"
                        >
                            <div className="flex items-center gap-2">
                            <Briefcase />
                            <span>Careers</span>
                            </div>
                            <ChevronRight className="h-4 w-4 transition-transform duration-200 data-[state=open]:rotate-90" />
                        </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent asChild>
                    <SidebarMenuSub>
                        <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild isActive={pathname === '/admin/careers'}>
                            <Link href="/admin/careers">Manage Page</Link>
                        </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                        <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild isActive={pathname.startsWith('/admin/job-openings')}>
                            <Link href="/admin/job-openings">Job Openings</Link>
                        </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                        <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild isActive={pathname.startsWith('/admin/applicants')}>
                            <Link href="/admin/applicants">Applicants</Link>
                        </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                    </SidebarMenuSub>
                    </CollapsibleContent>
                </Collapsible>
             </SidebarMenuItem>
            <SidebarSeparator />
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname.startsWith('/admin/settings')}
              >
                <Link href="/admin/settings">
                  <Settings />
                  Settings
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          {/* Footer content can be added here in the future */}
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background/95 px-4 backdrop-blur-sm sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 sm:pt-4">
          <SidebarTrigger />
          <div className="ml-auto flex items-center gap-4">
            <Button variant="outline" size="sm" className="hidden sm:inline-flex" asChild>
              <Link href="/" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                View Site
              </Link>
            </Button>
            <ThemeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full"
                >
                  <Avatar className="h-9 w-9">
                    <AvatarImage
                      src={user.avatar}
                      alt={user.name}
                      data-ai-hint="person avatar"
                    />
                    <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/admin/settings">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem disabled>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 sm:px-6 sm:py-4">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
