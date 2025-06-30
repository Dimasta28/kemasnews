import { MoreHorizontal, PlusCircle } from 'lucide-react';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const mockPosts = [
  {
    title: 'Getting Started with Next.js',
    status: 'Published',
    date: '2023-10-23',
    author: 'John Doe',
  },
  {
    title: 'Tailwind CSS Best Practices',
    status: 'Draft',
    date: '2023-10-24',
    author: 'Jane Smith',
  },
  {
    title: 'Mastering React Hooks',
    status: 'Published',
    date: '2023-09-15',
    author: 'John Doe',
  },
  {
    title: 'A Guide to Server Components',
    status: 'Published',
    date: '2023-08-01',
    author: 'Emily White',
  },
  {
    title: 'The Future of Web Development',
    status: 'Archived',
    date: '2023-07-19',
    author: 'Michael Brown',
  },
];

export default function PostsPage() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Posts</CardTitle>
          <CardDescription>
            Manage your blog posts. Create, edit, and delete posts here.
          </CardDescription>
        </div>
        <Button asChild size="sm" className="gap-1">
          <Link href="#">
            <PlusCircle className="h-4 w-4" />
            Create Post
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead className="hidden sm:table-cell">Author</TableHead>
              <TableHead className="hidden sm:table-cell">Status</TableHead>
              <TableHead className="hidden md:table-cell">Date</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockPosts.map((post, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{post.title}</TableCell>
                <TableCell className="hidden sm:table-cell">
                  {post.author}
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <Badge
                    variant={
                      post.status === 'Published'
                        ? 'default'
                        : post.status === 'Draft'
                        ? 'secondary'
                        : 'outline'
                    }
                  >
                    {post.status}
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {post.date}
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
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
