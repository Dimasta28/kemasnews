
'use client';

import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { submitComment, type Comment } from '@/services/commentService';

export function CommentsSection({ postId, initialComments = [] }: { postId: string, initialComments: Comment[] }) {
    const { toast } = useToast();
    const [newComment, setNewComment] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [company, setCompany] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSubmitting(true);

        const result = await submitComment({
            postId,
            comment: newComment,
            name,
            email,
            company,
        });

        if (result.success) {
            toast({
                title: 'Success!',
                description: result.message,
            });
            // Clear form
            setNewComment('');
            setName('');
            setEmail('');
            setCompany('');
        } else {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: result.message,
            });
        }
        setIsSubmitting(false);
    };

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
            <Card>
                <CardHeader>
                    <CardTitle>Leave a Reply</CardTitle>
                </CardHeader>
                <CardContent>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                         <div className="grid gap-2">
                            <Label htmlFor="comment">Your Comment</Label>
                            <Textarea id="comment" placeholder="Write your comment here..." rows={4} value={newComment} onChange={(e) => setNewComment(e.target.value)} required />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} required />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" placeholder="Your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="company">Perusahaan Anda</Label>
                            <Input id="company" placeholder="Nama perusahaan Anda" value={company} onChange={(e) => setCompany(e.target.value)} />
                        </div>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Posting...' : 'Post Comment'}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
