
'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ChevronLeft, Sparkles } from 'lucide-react';
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
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { generatePost } from '@/ai/flows/generate-post-flow';
import { generateDescription } from '@/ai/flows/generate-description-flow';
import { getPost, updatePost, Post } from '@/services/postService';
import { getCategories, type Category } from '@/services/categoryService';
import { Skeleton } from '@/components/ui/skeleton';
import RichTextEditor from '@/components/quill-editor';

export default function EditPostPage() {
  const { toast } = useToast();
  const router = useRouter();
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [allCategories, setAllCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState('');
  const [status, setStatus] = useState<'Draft' | 'Published' | 'Archived'>('Draft');
  const [featuredImage, setFeaturedImage] = useState('https://placehold.co/300x300.png');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGeneratingDesc, setIsGeneratingDesc] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    
    const fetchCategories = async () => {
      const categoriesData = await getCategories();
      setAllCategories(categoriesData);
    };

    const fetchPost = async () => {
      setIsLoading(true);
      try {
        const postData = await getPost(id);
        if (postData) {
          setTitle(postData.title);
          setDescription(postData.description);
          setContent(postData.content);
          setCategories(postData.categories);
          setTags(postData.tags.join(', '));
          setStatus(postData.status);
          setFeaturedImage(postData.featuredImage);
        } else {
          toast({
            variant: 'destructive',
            title: 'Post Not Found',
            description: 'The post you are trying to edit does not exist.',
          });
          router.push('/admin/posts');
        }
      } catch (error) {
        console.error('Failed to fetch post:', error);
        toast({
          variant: 'destructive',
          title: 'Failed to Load Post',
          description: 'An error occurred while loading the post. Please try again.',
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCategories();
    fetchPost();
  }, [id, router, toast]);

  const handleCategoryChange = (categoryName: string, checked: boolean) => {
    setCategories(prev => {
      if (checked) {
        return [...prev, categoryName];
      } else {
        return prev.filter((name) => name !== categoryName);
      }
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSaving || !id) return;
    setIsSaving(true);
    
    try {
      const updatedPost: Partial<Omit<Post, 'id' | 'date' | 'author'>> = {
        title,
        description,
        content,
        status,
        categories,
        tags: tags.split(',').map(tag => tag.trim()),
        featuredImage,
      };

      await updatePost(id, updatedPost);
      
      toast({
        title: 'Post Updated!',
        description: 'Your post has been successfully updated.',
      });
      router.push('/admin/posts');
    } catch (error) {
      console.error('Failed to update post:', error);
      toast({
        variant: 'destructive',
        title: 'Failed to Update Post',
        description: 'An error occurred while updating your post. Please try again.',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleGeneratePost = async () => {
    if (!title) {
      toast({
        variant: 'destructive',
        title: 'Judul Diperlukan',
        description: 'Silakan masukkan judul sebelum menghasilkan konten.',
      });
      return;
    }
    setIsGenerating(true);
    try {
      const result = await generatePost({ title });
      setContent(result.content);
      setDescription(result.description);
      setFeaturedImage(result.imageUrl);
      toast({
        title: 'Konten Dihasilkan!',
        description: 'Konten telah diperbarui oleh AI.',
      });
    } catch (error) {
      console.error('Failed to generate post:', error);
      toast({
        variant: 'destructive',
        title: 'Gagal Menghasilkan',
        description: 'Terjadi kesalahan saat membuat konten. Silakan coba lagi.',
      });
    } finally {
      setIsGenerating(false);
    }
  };
  
  const handleGenerateDescription = async () => {
    if (!content) {
      toast({
        variant: 'destructive',
        title: 'Konten Diperlukan',
        description: 'Silakan isi konten postingan terlebih dahulu untuk menghasilkan deskripsi.',
      });
      return;
    }
    setIsGeneratingDesc(true);
    try {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = content;
      const textContent = tempDiv.textContent || tempDiv.innerText || '';

      const result = await generateDescription({ content: textContent });
      setDescription(result.description);
      toast({
        title: 'Deskripsi Dihasilkan!',
        description: 'Deskripsi postingan Anda telah dibuat oleh AI.',
      });
    } catch (error) {
      console.error('Failed to generate description:', error);
      toast({
        variant: 'destructive',
        title: 'Gagal Menghasilkan Deskripsi',
        description: 'Terjadi kesalahan saat membuat deskripsi. Silakan coba lagi.',
      });
    } finally {
      setIsGeneratingDesc(false);
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <Skeleton className="h-7 w-7 rounded-full" />
          <Skeleton className="h-6 w-32" />
        </div>
        <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
          <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
            <Card>
              <CardHeader>
                <Skeleton className="h-7 w-48" />
                <Skeleton className="h-4 w-64" />
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="grid gap-3">
                    <Skeleton className="h-5 w-12" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                  <div className="grid gap-3">
                    <Skeleton className="h-5 w-16" />
                    <Skeleton className="h-40 w-full" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

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
            Edit Post
          </h1>
          <div className="hidden items-center gap-2 md:ml-auto md:flex">
            <Button variant="outline" size="sm" type="button" onClick={() => router.push('/admin/posts')}>
              Cancel
            </Button>
            <Button size="sm" type="submit" disabled={isSaving}>
              {isSaving ? 'Updating...' : 'Update Post'}
            </Button>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
          <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Post Details</CardTitle>
                <CardDescription>
                  Edit the title and content for your post.
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
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid gap-3">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="description">Description</Label>
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={handleGenerateDescription}
                            disabled={isGeneratingDesc || !content}
                        >
                            <Sparkles className="mr-2 h-4 w-4" />
                            {isGeneratingDesc ? 'Generating...' : 'Generate with AI'}
                        </Button>
                    </div>
                    <Textarea
                      id="description"
                      placeholder="Write a short summary of the post... (optional)"
                      className="min-h-[100px]"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                     <p className="text-sm text-muted-foreground">
                      This is a short description for post previews. It should be plain text for SEO purposes.
                    </p>
                  </div>
                  <div className="grid gap-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="content">Content</Label>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={handleGeneratePost}
                        disabled={isGenerating}
                      >
                        <Sparkles className="mr-2 h-4 w-4" />
                        {isGenerating ? 'Generating...' : 'Regenerate with AI'}
                      </Button>
                    </div>
                    <RichTextEditor
                      value={content}
                      onChange={setContent}
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
                      <Label>Categories</Label>
                      <div className="grid grid-cols-2 gap-2 rounded-md border p-4 max-h-48 overflow-y-auto">
                        {allCategories.map((cat) => (
                          <div key={cat.id} className="flex items-center space-x-2">
                            <Checkbox
                              id={`cat-${cat.id}`}
                              checked={categories.includes(cat.name)}
                              onCheckedChange={(checked) => {
                                handleCategoryChange(cat.name, !!checked);
                              }}
                            />
                            <Label
                              htmlFor={`cat-${cat.id}`}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                            >
                              {cat.name}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="tags">Tags</Label>
                      <Input
                        id="tags"
                        type="text"
                        placeholder="Add tags, comma separated"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                      />
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
                    <Select value={status} onValueChange={(value) => setStatus(value as 'Draft' | 'Published' | 'Archived')}>
                      <SelectTrigger id="status" aria-label="Select status">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Draft">Draft</SelectItem>
                        <SelectItem value="Published">Published</SelectItem>
                        <SelectItem value="Archived">Archived</SelectItem>
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
                  Enter a URL for your post's featured image.
                </CardDescription>
              </CardHeader>
              <CardContent>
                 <div className="grid gap-4">
                  <Image
                    alt="Featured image preview"
                    className="aspect-square w-full rounded-md object-cover"
                    height="300"
                    src={featuredImage || 'https://placehold.co/300x300.png'}
                    width="300"
                    data-ai-hint="placeholder image"
                  />
                  <div className="grid gap-2">
                    <Label htmlFor="featured-image-url">Image URL</Label>
                    <Input
                      id="featured-image-url"
                      type="text"
                      placeholder="https://example.com/image.png"
                      value={featuredImage}
                      onChange={(e) => setFeaturedImage(e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="flex items-center justify-center gap-2 md:hidden">
          <Button variant="outline" size="sm" type="button" onClick={() => router.push('/admin/posts')}>
            Cancel
          </Button>
          <Button size="sm" type="submit" disabled={isSaving}>
            {isSaving ? 'Updating...' : 'Update Post'}
          </Button>
        </div>
      </div>
    </form>
  );
}
