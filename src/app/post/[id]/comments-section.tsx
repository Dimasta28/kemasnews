
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { submitComment, type Comment } from '@/services/commentService';
import { useAuth } from '@/hooks/use-auth';
import { Skeleton } from '@/components/ui/skeleton';
import { db } from '@/lib/firebase';
import { collection, query, where, onSnapshot, orderBy, Timestamp } from 'firebase/firestore';
import { formatDistanceToNow } from 'date-fns';

interface CommentsSectionUIText {
    commentsLabel: string;
    leaveReplyTitle: string;
    commentingAsText: string;
    postCommentButton: string;
    postingButton: string;
    joinConversationTitle: string;
    mustBeLoggedInText: string;
    logInButton: string;
    firstToCommentText: string;
    replyButton: string;
}


export function CommentsSection({ postId, initialComments = [], uiText }: { postId: string, initialComments: Comment[], uiText?: Partial<CommentsSectionUIText> }) {
    const { toast } = useToast();
    const { user, isLoading } = useAuth();
    const [newComment, setNewComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [comments, setComments] = useState<Comment[]>(initialComments);

    useEffect(() => {
        if (!postId) return;
        
        const commentsRef = collection(db, "comments");
        const q = query(
            commentsRef, 
            where("postId", "==", postId)
        );

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const freshComments = querySnapshot.docs.map(doc => {
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
                    dateObj: date, // Temporary field for sorting
                    date: `${formatDistanceToNow(date)} ago`,
                };
            })
            .filter(comment => comment.status === 'Approved')
            .sort((a, b) => b.dateObj.getTime() - a.dateObj.getTime())
            .map(({ dateObj, ...rest }) => rest as Comment); 

            setComments(freshComments);
        });

        return () => unsubscribe();
    }, [postId]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!user) return;
        setIsSubmitting(true);

        const result = await submitComment({
            postId,
            comment: newComment,
            authorId: user.id,
            authorName: user.name,
            authorEmail: user.email,
        });

        if (result.success) {
            toast({
                title: 'Success!',
                description: result.message,
            });
            setNewComment('');
        } else {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: result.message,
            });
        }
        setIsSubmitting(false);
    };

    const renderCommentForm = () => {
        if (isLoading) {
            return <Skeleton className="h-48 w-full" />;
        }

        if (user) {
            return (
                <Card>
                    <CardHeader>
                        <CardTitle>{uiText?.leaveReplyTitle || 'Leave a Reply'}</CardTitle>
                        <CardDescription>
                            {uiText?.commentingAsText || 'You are commenting as'} <span className="font-semibold">{user.name}</span>.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form className="space-y-4" onSubmit={handleSubmit}>
                             <div className="grid gap-2">
                                <Label htmlFor="comment">{uiText?.commentsLabel || 'Your Comment'}</Label>
                                <Textarea id="comment" placeholder="Write your comment here..." rows={4} value={newComment} onChange={(e) => setNewComment(e.target.value)} required />
                            </div>
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? (uiText?.postingButton || 'Posting...') : (uiText?.postCommentButton || 'Post Comment')}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            );
        }

        return (
            <Card className="text-center">
                <CardHeader>
                    <CardTitle>{uiText?.joinConversationTitle || 'Join the Conversation'}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground mb-4">{uiText?.mustBeLoggedInText || 'You must be logged in to leave a comment.'}</p>
                    <Button asChild>
                        <Link href="/login">{uiText?.logInButton || 'Log In'}</Link>
                    </Button>
                </CardContent>
            </Card>
        );
    }

    return (
        <div id="comments" className="mt-12 pt-10 border-t border-border">
            <h2 className="text-2xl font-bold mb-6">{comments.length} {uiText?.commentsLabel || 'Comments'}</h2>

            {/* Comments List */}
            <div className="space-y-8 mb-10">
                {comments.length > 0 ? comments.map((comment) => (
                    <div key={comment.id} className="flex gap-4">
                        <Avatar>
                            <AvatarImage src={comment.avatar} alt={comment.author} data-ai-hint="person avatar" />
                            <AvatarFallback>{comment.author.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <div className="flex items-center justify-between">
                                <span className="font-semibold">{comment.author}</span>
                                <span className="text-xs text-muted-foreground">{comment.date}</span>
                            </div>
                            <p className="text-sm text-muted-foreground mt-2">{comment.comment}</p>
                            <Button variant="link" size="sm" className="p-0 h-auto mt-1">{uiText?.replyButton || 'Reply'}</Button>
                        </div>
                    </div>
                )) : (
                     <p className="text-sm text-muted-foreground">{uiText?.firstToCommentText || 'Be the first to leave a comment.'}</p>
                )}
            </div>

            {/* Comment Form */}
            {renderCommentForm()}
        </div>
    );
}
