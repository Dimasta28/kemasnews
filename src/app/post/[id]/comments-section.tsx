'use client';

import { useState } from 'react';
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

export function CommentsSection({ postId, initialComments = [] }: { postId: string, initialComments: Comment[] }) {
    const { toast } = useToast();
    const { user, isLoading } = useAuth();
    const [newComment, setNewComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

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
                        <CardTitle>Leave a Reply</CardTitle>
                        <CardDescription>You are commenting as <span className="font-semibold">{user.name}</span>.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form className="space-y-4" onSubmit={handleSubmit}>
                             <div className="grid gap-2">
                                <Label htmlFor="comment">Your Comment</Label>
                                <Textarea id="comment" placeholder="Write your comment here..." rows={4} value={newComment} onChange={(e) => setNewComment(e.target.value)} required />
                            </div>
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? 'Posting...' : 'Post Comment'}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            );
        }

        return (
            <Card className="text-center">
                <CardHeader>
                    <CardTitle>Join the Conversation</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground mb-4">You must be logged in to leave a comment.</p>
                    <div className="flex gap-4 justify-center">
                        <Button asChild>
                            <Link href="/login">Log In</Link>
                        </Button>
                        <Button variant="secondary" asChild>
                            <Link href="/register">Register</Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <div id="comments" className="mt-12 pt-10 border-t border-border">
            <h2 className="text-2xl font-bold mb-6">{initialComments.length} Comments</h2>

            {/* Comments List */}
            <div className="space-y-8 mb-10">
                {initialComments.length > 0 ? initialComments.map((comment) => (
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
                            <Button variant="link" size="sm" className="p-0 h-auto mt-1">Reply</Button>
                        </div>
                    </div>
                )) : (
                     <p className="text-sm text-muted-foreground">Be the first to leave a comment.</p>
                )}
            </div>

            {/* Comment Form */}
            {renderCommentForm()}
        </div>
    );
}
