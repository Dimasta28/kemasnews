
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Search, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import type { Post } from '@/services/postService';
import type { BannerSettings } from '@/services/settingsService';
import { useAuth } from '@/hooks/use-auth';
import { Skeleton } from '@/components/ui/skeleton';

export function Sidebar({ recentPosts, banner }: { recentPosts: Post[], banner: BannerSettings }) {
  const { user, logout, isLoading } = useAuth();

  const renderMemberArea = () => {
    if (isLoading) {
      return (
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-32" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-4 w-full mb-4" />
            <Skeleton className="h-10 w-full" />
          </CardContent>
        </Card>
      );
    }

    if (user) {
      return (
        <Card>
          <CardHeader>
            <CardTitle>Welcome, {user.name}!</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">You can now comment on posts.</p>
            <Button className="w-full" variant="outline" onClick={() => logout()}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </CardContent>
        </Card>
      );
    }

    return (
      <Card>
        <CardHeader>
          <CardTitle>Member Area</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">Login to access exclusive content and offers.</p>
          <Button className="w-full" asChild>
            <Link href="/login">Login</Link>
          </Button>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="sticky top-24 space-y-8">
      {/* Search Widget */}
      <Card>
        <CardHeader>
          <CardTitle>Search</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search articles..." className="pl-9" />
          </div>
        </CardContent>
      </Card>

      {/* Recent Posts Widget */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Posts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentPosts.map((post, index) => (
              <motion.div key={post.id} whileHover={{ x: 4 }} transition={{ type: 'spring', stiffness: 300 }}>
                <Link href={`/post/${post.id}`} className="group flex items-center gap-4">
                  <div className="relative h-16 w-16 flex-shrink-0 rounded-md overflow-hidden">
                    <Image
                      src={post.featuredImage}
                      alt={post.title}
                      fill
                      className="object-cover"
                      data-ai-hint="article thumbnail"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm leading-tight group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">{post.date}</p>
                  </div>
                </Link>
                {index < recentPosts.length - 1 && <Separator className="mt-4" />}
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Campaign/Banner Widget */}
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <Link href={banner.buttonLink || '#'} className="block group">
            <div className="relative aspect-video w-full overflow-hidden">
               <Image
                  src={banner.imageUrl}
                  alt={banner.title}
                  fill
                  className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                  data-ai-hint="advertisement banner"
              />
            </div>
          </Link>
           <div className="p-4">
            <h3 className="font-semibold">{banner.title}</h3>
            <p className="text-sm text-muted-foreground mt-1">{banner.description}</p>
            <Button size="sm" className="mt-3 w-full" asChild>
                <Link href={banner.buttonLink || '#'}>{banner.buttonText}</Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Login Member Widget */}
      {renderMemberArea()}
    </div>
  );
}
