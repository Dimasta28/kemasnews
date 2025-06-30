
'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const mockComments = [
    {
        author: 'Jane Doe',
        avatar: 'https://placehold.co/100x100.png',
        date: '2 days ago',
        comment: 'This is such an insightful article! Really opened my eyes to the possibilities of sustainable packaging. Great job!'
    },
    {
        author: 'John Smith',
        avatar: 'https://placehold.co/100x100.png',
        date: '1 day ago',
        comment: 'I have a question about the LIMEX material. How does it compare to traditional plastics in terms of durability?'
    }
];

export function CommentsSection() {
    return (
        <div id="comments" className="mt-12 pt-10 border-t border-border">
            <h2 className="text-2xl font-bold mb-6">{mockComments.length} Comments</h2>

            {/* Comments List */}
            <div className="space-y-8 mb-10">
                {mockComments.map((comment, index) => (
                    <div key={index} className="flex gap-4">
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
                ))}
            </div>

            {/* Comment Form */}
            <Card>
                <CardHeader>
                    <CardTitle>Leave a Reply</CardTitle>
                </CardHeader>
                <CardContent>
                    <form className="space-y-4">
                         <div className="grid gap-2">
                            <Label htmlFor="comment">Your Comment</Label>
                            <Textarea id="comment" placeholder="Write your comment here..." rows={4} />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" placeholder="Your name" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" placeholder="Your email" />
                            </div>
                        </div>
                        <Button type="submit">Post Comment</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
