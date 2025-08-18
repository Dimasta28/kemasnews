
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
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
import type { Comment } from '@/services/commentService';
import { CommentActions } from './comment-actions';
import { db } from '@/lib/firebase';
import { collection, onSnapshot, query, orderBy, getDoc, doc, Timestamp } from 'firebase/firestore';
import { format, parseISO } from 'date-fns';

interface CommentsClientProps {
  initialComments: Comment[];
}

export function CommentsClient({ initialComments }: CommentsClientProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments);

  useEffect(() => {
    const commentsRef = collection(db, "comments");
    const q = query(commentsRef, orderBy("date", "desc"));
    
    const unsubscribe = onSnapshot(q, async (snapshot) => {
        const commentsData = snapshot.docs.map(doc => {
            const data = doc.data();
            const date = (data.date as Timestamp)?.toDate() || new Date();
            return {
                id: doc.id,
                postId: data.postId,
                author: data.author,
                authorEmail: data.authorEmail,
                authorCompany: data.authorCompany || '',
                comment: data.comment,
                status: data.status,
                avatar: data.avatar,
                date: date.toISOString(),
            };
        });

        const postTitleCache: { [key: string]: string } = {};
        const postIds = [...new Set(commentsData.map(c => c.postId))];
        
        await Promise.all(
            postIds.map(async (postId) => {
                if (!postTitleCache[postId]) {
                    const postRef = doc(db, 'posts', postId);
                    const postSnap = await getDoc(postRef);
                    postTitleCache[postId] = postSnap.exists() ? postSnap.data().title : 'Unknown Post';
                }
            })
        );
        
        const commentsWithTitles = commentsData.map(comment => ({
            ...comment,
            postTitle: postTitleCache[comment.postId] || 'Unknown Post'
        })) as Comment[];
        
        setComments(commentsWithTitles);
    });

    return () => unsubscribe();
  }, []);

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
                  <div className="text-xs text-muted-foreground">{format(parseISO(comment.date), "dd LLL yyyy, HH:mm")}</div>
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
