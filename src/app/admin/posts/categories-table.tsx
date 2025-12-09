'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, Loader2, Sparkles, Wand2 } from 'lucide-react';

import type { Post } from '@/services/postService';
import { createPost, updatePost } from '@/services/postService';
import { getCategories } from '@/services/categoryService';
import { generatePost } from '@/ai/flows/generate-post-flow';
import { generateDescription } from '@/ai/flows/generate-description-flow';
import { generateTags } from '@/ai/flows/generate-tags-flow';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MultiSelectCombobox, type Option } from '@/components/ui/multi-select-combobox';
import RichTextEditor from '@/components/quill-editor';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  title: z.string().min(1, 'Title is required.'),
  description: z.string().optional(),
  content: z.string().min(1, 'Content is required.'),
  status: z.enum(['Draft', 'Published', 'Archived']),
  categories: z.array(z.string()).min(1, 'At least one category is required.'),
  tags: z.array(z.string()).optional(),
  featuredImage: z.string().url({ message: 'Must be a valid URL.' }).optional().or(z.literal('')),
});

type PostFormData = z.infer<typeof formSchema>;

interface PostFormProps {
  post?: Post;
  categories: Option[];
  allTags: string[];
}

export function PostForm({ post, categories, allTags }: PostFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDescGenerating, setIsDescGenerating] = useState(false);
  const [isTagsGenerating, setIsTagsGenerating] = useState(false);
  
  const [availableTags, setAvailableTags] = useState<Option[]>(
    allTags.map(tag => ({ value: tag, label: tag }))
  );

  const form = useForm<PostFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: post?.title || '',
      description: post?.description || '',
      content: post?.content || '',
      status: post?.status || 'Draft',
      categories: post?.categories || [],
      tags: post?.tags || [],
      featuredImage: post?.featuredImage || '',
    },
  });
  
  const handleGeneratePost = async () => {
    const title = form.getValues('title');
    if (!title) {
        toast({
            variant: 'destructive',
            title: 'Title Required',
            description: 'Please enter a title before generating content.'
        });
        return;
    }
    setIsGenerating(true);
    try {
        const result = await generatePost({ title });
        form.setValue('content', result.content, { shouldValidate: true, shouldDirty: true });
        form.setValue('description', result.description, { shouldValidate: true, shouldDirty: true });
        form.setValue('featuredImage', result.imageUrl, { shouldValidate: true, shouldDirty: true });
        toast({ title: 'Content Generated!', description: 'AI has generated the post content, description, and a featured image.' });
    } catch (error) {
        console.error("AI generation failed:", error);
        toast({ variant: 'destructive', title: 'AI Generation Failed' });
    } finally {
        setIsGenerating(false);
    }
  }

  const handleGenerateDescription = async () => {
    const content = form.getValues('content');
    if (!content) {
        toast({ variant: 'destructive', title: 'Content Required', description: 'Please provide content to generate a description.' });
        return;
    }
    setIsDescGenerating(true);
    try {
      const { description } = await generateDescription({ content });
      form.setValue('description', description, { shouldValidate: true, shouldDirty: true });
      toast({ title: 'Description Generated!' });
    } catch (error) {
      console.error("AI description generation failed:", error);
      toast({ variant: 'destructive', title: 'AI Generation Failed' });
    } finally {
        setIsDescGenerating(false);
    }
  }
  
  const handleGenerateTags = async () => {
    const title = form.getValues('title');
    const content = form.getValues('content');
     if (!title || !content) {
        toast({ variant: 'destructive', title: 'Title and Content Required', description: 'Please provide a title and content to generate tags.' });
        return;
    }
    setIsTagsGenerating(true);
    try {
      const { tags } = await generateTags({ title, content });
      form.setValue('tags', tags, { shouldValidate: true, shouldDirty: true });
      const newTagOptions = tags.map(tag => ({ value: tag, label: tag }));
      // Add new tags to available options if they don't exist
      setAvailableTags(prev => {
          const existingValues = new Set(prev.map(p => p.value));
          const merged = [...prev];
          newTagOptions.forEach(opt => {
              if (!existingValues.has(opt.value)) {
                  merged.push(opt);
              }
          });
          return merged;
      });

      toast({ title: 'Tags Generated!' });
    } catch (error) {
        console.error("AI tag generation failed:", error);
        toast({ variant: 'destructive', title: 'AI Generation Failed' });
    } finally {
        setIsTagsGenerating(false);
    }
  }

  const onSubmit: SubmitHandler<PostFormData> = async (data) => {
    setIsSaving(true);
    try {
      if (post) {
        await updatePost(post.id, data);
        toast({ title: 'Success!', description: 'Post has been updated.' });
        router.push('/admin/posts');
      } else {
        await createPost(data);
        toast({ title: 'Success!', description: 'New post has been created.' });
        router.push('/admin/posts');
      }
    } catch (error) {
      console.error('Failed to save post:', error);
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to save post.' });
    } finally {
      setIsSaving(false);
    }
  };

  const currentFeaturedImage = form.watch('featuredImage');

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" className="h-7 w-7" asChild>
              <Link href="/admin/posts">
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </Link>
            </Button>
            <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
              {post ? 'Edit Post' : 'Create New Post'}
            </h1>
            <div className="hidden items-center gap-2 md:ml-auto md:flex">
              <Button variant="outline" size="sm" type="button" onClick={() => router.push('/admin/posts')}>
                Cancel
              </Button>
              <Button size="sm" type="submit" disabled={isSaving}>
                {isSaving ? <Loader2 className="animate-spin" /> : (post ? 'Update Post' : 'Save Post')}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                     <div>
                        <CardTitle>Post Details</CardTitle>
                        <CardDescription>Fill in the main content for your post.</CardDescription>
                     </div>
                     <Button type="button" variant="secondary" onClick={handleGeneratePost} disabled={isGenerating}>
                        {isGenerating ? <Loader2 className="mr-2 animate-spin" /> : <Wand2 className="mr-2" />}
                        Generate with AI
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <FormField control={form.control} name="title" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl><Input placeholder="Your Awesome Post Title" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="content" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Content</FormLabel>
                        <FormControl>
                            <RichTextEditor
                                value={field.value}
                                onChange={field.onChange}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                  )} />
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <FormField control={form.control} name="status" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Draft">Draft</SelectItem>
                          <SelectItem value="Published">Published</SelectItem>
                          <SelectItem value="Archived">Archived</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />
                   <FormField control={form.control} name="featuredImage" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Featured Image URL</FormLabel>
                      <FormControl><Input placeholder="https://placehold.co/600x400.png" {...field} /></FormControl>
                      {currentFeaturedImage && (
                          <div className="mt-2 relative aspect-video w-full rounded-md overflow-hidden border">
                              <Image src={currentFeaturedImage} alt="Featured image preview" fill className="object-cover" />
                          </div>
                      )}
                      <FormMessage />
                    </FormItem>
                  )} />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                   <div className="flex items-center justify-between">
                     <CardTitle>Description</CardTitle>
                     <Button type="button" size="sm" variant="ghost" onClick={handleGenerateDescription} disabled={isDescGenerating}>
                        {isDescGenerating ? <Loader2 className="mr-2 animate-spin" /> : <Sparkles className="mr-2" />}
                        Generate
                    </Button>
                   </div>
                </CardHeader>
                <CardContent>
                    <FormField control={form.control} name="description" render={({ field }) => (
                        <FormItem>
                        <FormControl>
                            <Textarea
                            placeholder="A short summary of the post..."
                            className="min-h-[100px]"
                            {...field}
                            />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )} />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Organization</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <FormField control={form.control} name="categories" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Categories</FormLabel>
                      <FormControl>
                         <MultiSelectCombobox
                            options={categories}
                            value={field.value}
                            onChange={field.onChange}
                            placeholder="Select categories..."
                            searchPlaceholder="Search categories..."
                            emptyPlaceholder="No categories found."
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="tags" render={({ field }) => (
                    <FormItem>
                        <div className="flex items-center justify-between">
                            <FormLabel>Tags</FormLabel>
                            <Button type="button" size="sm" variant="ghost" onClick={handleGenerateTags} disabled={isTagsGenerating}>
                                {isTagsGenerating ? <Loader2 className="mr-2 animate-spin" /> : <Sparkles className="mr-2" />}
                                Generate
                            </Button>
                        </div>
                      <FormControl>
                        <MultiSelectCombobox
                            options={availableTags}
                            value={field.value || []}
                            onChange={field.onChange}
                            placeholder="Select or add tags..."
                            searchPlaceholder="Search tags..."
                            emptyPlaceholder="No tags found."
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 md:hidden mt-4">
            <Button variant="outline" size="sm" type="button" onClick={() => router.push('/admin/posts')}>
              Cancel
            </Button>
            <Button size="sm" type="submit" disabled={isSaving}>
              {isSaving ? 'Saving...' : (post ? 'Update Post' : 'Save Post')}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}