
'use client';

import * as React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { createCategory, updateCategory, type Category } from '@/services/categoryService';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Category name must be at least 2 characters.',
  }),
  slug: z.string().optional(),
});

type CategoryFormData = z.infer<typeof formSchema>;

interface CategoryFormProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  category?: Category;
}

export function CategoryForm({ isOpen, setIsOpen, category }: CategoryFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEditMode = !!category;

  const form = useForm<CategoryFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: category?.name || '',
      slug: category?.slug || '',
    },
  });

  // Reset form when dialog opens with new data or is closed
  React.useEffect(() => {
    if (isOpen) {
      form.reset({
        name: category?.name || '',
        slug: category?.slug || '',
      });
    }
  }, [isOpen, category, form]);
  
  const onSubmit = async (data: CategoryFormData) => {
    setIsSubmitting(true);
    try {
      let result;
      if (isEditMode) {
        result = await updateCategory(category.id, data.name, data.slug);
      } else {
        result = await createCategory(data.name, data.slug);
      }

      if (result.success) {
        toast({
          title: `Category ${isEditMode ? 'updated' : 'created'}`,
          description: result.message,
        });
        setIsOpen(false);
      } else {
        toast({
          variant: 'destructive',
          title: `Failed to ${isEditMode ? 'update' : 'create'} category`,
          description: result.message,
        });
      }
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description: 'Something went wrong. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isEditMode ? 'Edit Category' : 'Create New Category'}</DialogTitle>
          <DialogDescription>
            {isEditMode ? "Make changes to your category here." : "Add a new category to organize your posts."} Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="name">Category Name</Label>
                  <FormControl>
                    <Input id="name" placeholder="e.g., Sustainability" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="slug">Slug (Optional)</Label>
                  <FormControl>
                    <Input id="slug" placeholder="e.g., sustainability-news" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <DialogFooter>
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Saving...' : 'Save Changes'}
                </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
