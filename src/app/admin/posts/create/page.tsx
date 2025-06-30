
'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

export default function CreatePostPage() {
  const { toast } = useToast();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // In a real application, you would handle form submission here,
    // likely using a Server Action to save the data to a database.
    toast({
      title: 'Post Created!',
      description: 'Your new post has been saved as a draft.',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Create a New Post</CardTitle>
            <CardDescription>
              Fill out the details below to create a new blog post.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  type="text"
                  placeholder="Enter post title"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  placeholder="Write your post content here..."
                  className="min-h-[200px]"
                  required
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t px-6 py-4 justify-end">
            <Button type="submit">Save Draft</Button>
          </CardFooter>
        </Card>
      </div>
    </form>
  );
}
