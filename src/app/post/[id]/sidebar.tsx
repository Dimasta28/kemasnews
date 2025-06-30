
import Link from 'next/link';
import Image from 'next/image';
import { Search } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import type { Post } from '@/services/postService';

export function Sidebar({ recentPosts }: { recentPosts: Post[] }) {
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
              <div key={post.id}>
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
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Campaign/Banner Widget */}
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="relative aspect-video w-full">
             <Image
                src="https://placehold.co/600x400.png"
                alt="Promo banner"
                fill
                className="object-cover"
                data-ai-hint="advertisement banner"
            />
          </div>
           <div className="p-4">
            <h3 className="font-semibold">Our New Collection</h3>
            <p className="text-sm text-muted-foreground mt-1">Discover the latest in sustainable packaging.</p>
            <Button size="sm" className="mt-3 w-full">Learn More</Button>
          </div>
        </CardContent>
      </Card>

      {/* Login Member Widget */}
      <Card>
        <CardHeader>
          <CardTitle>Member Area</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">Login to access exclusive content and offers.</p>
          <Button className="w-full">Login / Register</Button>
        </CardContent>
      </Card>
    </div>
  );
}
