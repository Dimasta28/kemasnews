
'use client';

import {
  ChevronLeft,
  Upload,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" className="h-7 w-7" asChild>
            <Link href="/admin/posts">
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
            Create a New Post
          </h1>
          <div className="hidden items-center gap-2 md:ml-auto md:flex">
            <Button variant="outline" size="sm">
              Discard
            </Button>
            <Button size="sm" type="submit">Save Post</Button>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
          <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Post Details</CardTitle>
                <CardDescription>
                  Fill out the title and content for your new post.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      type="text"
                      className="w-full"
                      placeholder="Enter post title"
                      required
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="content">Content</Label>
                    <Textarea
                      id="content"
                      placeholder="Write your post content here..."
                      className="min-h-[300px]"
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
             <Card>
                <CardHeader>
                  <CardTitle>Categories & Tags</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="grid gap-3">
                      <Label htmlFor="category">Category</Label>
                       <Select>
                        <SelectTrigger id="category" aria-label="Select category">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="technology">Technology</SelectItem>
                          <SelectItem value="lifestyle">Lifestyle</SelectItem>
                          <SelectItem value="business">Business</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="tags">Tags</Label>
                      <Input id="tags" type="text" placeholder="Add tags, comma separated" />
                    </div>
                  </div>
                </CardContent>
              </Card>
          </div>
          <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Post Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="status">Status</Label>
                    <Select defaultValue="draft">
                      <SelectTrigger id="status" aria-label="Select status">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="published">Published</SelectItem>
                        <SelectItem value="archived">Archived</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle>Featured Image</CardTitle>
                <CardDescription>
                  Set a featured image for your post.
                </CardDescription>
              </CardHeader>
              <CardContent>
                 <div className="grid gap-2">
                  <Image
                    alt="Placeholder"
                    className="aspect-square w-full rounded-md object-cover"
                    height="300"
                    src="https://placehold.co/300x300.png"
                    width="300"
                    data-ai-hint="placeholder image"
                  />
                  <div className="grid grid-cols-3 items-center gap-2">
                    <Button variant="outline" size="icon">
                      <Upload className="h-4 w-4" />
                      <span className="sr-only">Upload</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="flex items-center justify-center gap-2 md:hidden">
          <Button variant="outline" size="sm">
            Discard
          </Button>
          <Button size="sm" type="submit">Save Post</Button>
        </div>
      </div>
    </form>
  );
}
