"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getTagSuggestions } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Wand2, X } from "lucide-react";
import { RichTextEditor } from "@/components/editor/rich-text-editor";

const formSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters long."),
  content: z.string().min(100, "Content must be at least 100 characters long to allow for proper formatting."),
  imageUrl: z.string().url("Please enter a valid URL."),
  tags: z.array(z.string()).min(1, "Please add at least one tag."),
});

type PostFormValues = z.infer<typeof formSchema>;

export function PostForm() {
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [suggestedTags, setSuggestedTags] = useState<string[]>([]);
  const { toast } = useToast();

  const form = useForm<PostFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      imageUrl: "",
      tags: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "tags",
  });

  const handleSuggestTags = async () => {
    const content = form.getValues("content");
    // A simple regex to strip HTML tags for a more accurate word count
    const textContent = content.replace(/<[^>]*>?/gm, '');
    if (textContent.length < 50) {
      toast({
        variant: "destructive",
        title: "Content too short",
        description: "Please write at least 50 characters to get tag suggestions.",
      });
      return;
    }
    setIsSuggesting(true);
    setSuggestedTags([]);
    try {
      const result = await getTagSuggestions({ content });
      setSuggestedTags(result.tags);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not fetch tag suggestions.",
      });
    } finally {
      setIsSuggesting(false);
    }
  };

  const addTag = (tag: string) => {
    const currentTags = form.getValues("tags");
    if (!currentTags.includes(tag)) {
      append(tag);
      setSuggestedTags(prev => prev.filter(t => t !== tag));
    }
  };

  const removeTag = (index: number) => {
    remove(index);
  };
  
  function onSubmit(data: PostFormValues) {
    console.log(data);
    toast({
      title: "Post Submitted!",
      description: "Check the console for the form data.",
    });
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardContent className="pt-6 space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your post title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Featured Image URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com/image.png" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
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
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tags</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {fields.map((field, index) => (
                  <Badge key={field.id} variant="default" className="flex items-center gap-1">
                    {field.value}
                    <button type="button" onClick={() => removeTag(index)} className="rounded-full hover:bg-primary-foreground/20">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <FormField
                control={form.control}
                name="tags"
                render={() => <FormMessage />}
              />
              <Button type="button" variant="outline" onClick={handleSuggestTags} disabled={isSuggesting}>
                {isSuggesting ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Wand2 className="mr-2 h-4 w-4" />
                )}
                AI Suggest Tags
              </Button>
              {suggestedTags.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-4 border-t">
                  {suggestedTags.map(tag => (
                    <Badge key={tag} variant="secondary" className="cursor-pointer" onClick={() => addTag(tag)}>
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Button type="submit" size="lg" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Publish Post
        </Button>
      </form>
    </Form>
  );
}
