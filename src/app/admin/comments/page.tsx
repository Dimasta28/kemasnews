
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { getAllComments, type Comment } from '@/services/commentService';
import { CommentActions } from './comment-actions';

export default async function CommentsPage() {
  const comments: Comment[] = await getAllComments();

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
              <TableHead className="text-right">
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {comments.map((comment) => (
              <TableRow key={comment.id}>
                <TableCell className="hidden sm:table-cell">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={comment.avatar} alt="Avatar" data-ai-hint="person avatar" />
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
                  <div className="text-sm font-medium">
                    {comment.comment.substring(0, 60)}
                    {comment.comment.length > 60 && '...'}
                  </div>
                  <div className="text-xs text-muted-foreground">{comment.date}</div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <Link href={`/post/${comment.postId}`} className="hover:underline">
                    {comment.postTitle}
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
                <TableCell className="text-right">
                  <CommentActions comment={comment} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {comments.length === 0 && (
          <div className="text-center text-muted-foreground p-8">
            No comments found.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
