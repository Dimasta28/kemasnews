"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { useToast } from "@/hooks/use-toast";

const commentSchema = z.object({
  comment: z.string().min(3, "Comment must be at least 3 characters.").max(500, "Comment must be 500 characters or less."),
});

export function CommentSection() {
    const { toast } = useToast();

    const form = useForm<z.infer<typeof commentSchema>>({
        resolver: zodResolver(commentSchema),
        defaultValues: {
            comment: "",
        },
    });

    function onSubmit(data: z.infer<typeof commentSchema>) {
        console.log("Comment submitted:", data);
        toast({
            title: "Comment Submitted",
            description: "Thank you for your feedback!",
        });
        form.reset();
    }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Join the Conversation</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="comment"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Textarea placeholder="Write your comment here..." {...field} rows={4} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={form.formState.isSubmitting}>Post Comment</Button>
            </form>
        </Form>
        
        <div className="space-y-6">
            <h3 className="text-lg font-semibold">Comments (1)</h3>
            <div className="flex items-start gap-4">
                <Avatar>
                    <AvatarImage src="https://placehold.co/100x100.png" alt="User" data-ai-hint="person avatar" />
                    <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                        <p className="font-semibold">Jane Doe</p>
                        <p className="text-xs text-muted-foreground">2 days ago</p>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        This is a fantastic article! Really helped me understand the topic better. Looking forward to more content like this.
                    </p>
                </div>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
