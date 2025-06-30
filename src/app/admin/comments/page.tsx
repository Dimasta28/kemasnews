import { MoreHorizontal } from 'lucide-react';
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
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';

const mockComments: { 
  author: string;
  authorEmail: string;
  avatar: string;
  comment: string;
  post: string;
  date: string;
  status: 'Approved' | 'Pending' | 'Spam';
}[] = [];

export default function CommentsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Comments</CardTitle>
        <CardDescription>
          Manage all the comments on your posts.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden w-[100px] sm:table-cell">
                <span className="sr-only">Avatar</span>
              </TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Comment</TableHead>
              <TableHead className="hidden md:table-cell">
                In Response To
              </TableHead>
              <TableHead className="hidden sm:table-cell">Status</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockComments.map((comment, index) => (
              <TableRow key={index}>
                <TableCell className="hidden sm:table-cell">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={comment.avatar} alt="Avatar" data-ai-hint="person avatar"/>
                    <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell className="font-medium">
                  {comment.author}
                  <div className="text-xs text-muted-foreground">
                    {comment.authorEmail}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm font-medium">{comment.comment.substring(0, 60)}...</div>
                  <div className="text-xs text-muted-foreground">{comment.date}</div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <Link href="#" className="hover:underline">
                    {comment.post}
                  </Link>
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <Badge
                    variant={
                      comment.status === 'Approved'
                        ? 'secondary'
                        : comment.status === 'Pending'
                        ? 'outline'
                        : 'destructive'
                    }
                  >
                    {comment.status}
                  </Badge>
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
                      <DropdownMenuItem>Approve</DropdownMenuItem>
                      <DropdownMenuItem>Reply</DropdownMenuItem>
                      <DropdownMenuItem>Mark as Spam</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-500">Delete</DropdownMenuItem>
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
