'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import type { Post } from '@/services/postService';
import { Button } from '@/components/ui/button';
import { format, parseISO } from 'date-fns';

interface RecentPostsProps {
    recentPosts: Post[];
}

export function RecentPosts({ recentPosts }: RecentPostsProps) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Recent Posts</CardTitle>
                    <CardDescription>
                        The latest five posts on your blog.
                    </CardDescription>
                </div>
                <Button asChild variant="outline" size="sm">
                    <Link href="/admin/posts">View All</Link>
                </Button>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead className="text-right">Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {recentPosts.length > 0 ? (
                            recentPosts.map((post) => (
                                <TableRow key={post.id}>
                                    <TableCell>
                                        <Link href={`/admin/posts/edit/${post.id}`} className="font-medium hover:underline block truncate" style={{maxWidth: '20ch'}}>
                                            {post.title}
                                        </Link>
                                        <span className="text-xs text-muted-foreground">{format(parseISO(post.date), "dd LLL yyyy")}</span>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Badge className="text-xs" variant={post.status === 'Published' ? 'secondary' : 'outline'}>
                                            {post.status}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={2} className="h-24 text-center">
                                    No recent posts found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
