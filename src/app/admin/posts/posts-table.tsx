
'use client';

import Image from "next/image";
import Link from "next/link";
import { format, parseISO } from 'date-fns';
import { PlusCircle, MoreHorizontal } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Post } from "@/services/postService";

interface PostsTableProps {
    posts: Post[];
}

export function PostsTable({ posts }: PostsTableProps) {
    return (
        <>
            <div className="flex justify-end mb-4">
                <Button asChild size="sm" className="gap-1">
                    <Link href="/admin/posts/create">
                        <PlusCircle className="h-4 w-4" />
                        Create Post
                    </Link>
                </Button>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="hidden w-[100px] sm:table-cell">
                            <span className="sr-only">Image</span>
                        </TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="hidden md:table-cell">Categories</TableHead>
                        <TableHead className="hidden md:table-cell text-right">
                            Date
                        </TableHead>
                        <TableHead>
                            <span className="sr-only">Actions</span>
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {posts.length > 0 ? posts.map((post) => (
                        <TableRow key={post.id}>
                            <TableCell className="hidden sm:table-cell">
                                <Image
                                    alt={post.title}
                                    className="aspect-square rounded-md object-cover"
                                    height="64"
                                    src={post.featuredImage}
                                    width="64"
                                />
                            </TableCell>
                            <TableCell className="font-medium max-w-[250px] truncate">
                                {post.title}
                            </TableCell>
                            <TableCell>
                                <Badge variant={post.status === 'Published' ? 'secondary' : 'outline'}>{post.status}</Badge>
                            </TableCell>
                            <TableCell className="hidden md:table-cell capitalize">
                               {post.categories.join(', ')}
                            </TableCell>
                            <TableCell className="hidden md:table-cell text-right">
                                {format(parseISO(post.date), "dd LLL, yyyy")}
                            </TableCell>
                            <TableCell>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button aria-haspopup="true" size="icon" variant="ghost">
                                            <MoreHorizontal className="h-4 w-4" />
                                            <span className="sr-only">Toggle menu</span>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                        <DropdownMenuItem asChild>
                                            <Link href={`/admin/posts/edit/${post.id}`}>Edit</Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>Delete</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    )) : (
                        <TableRow>
                            <TableCell colSpan={6} className="h-24 text-center">
                                No posts found.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </>
    );
}
