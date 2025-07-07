
'use client';

import { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { createCategory, updateCategory, type Category } from '@/services/categoryService';

const formSchema = z.object({
  name: z.string().min(1, 'Name is required.'),
  slug: z.string().min(1, 'Slug is required.'),
});

type CategoryFormData = z.infer<typeof formSchema>;

function createSlug(name: string): string {
    return name
        .toLowerCase()
        .replace(/&/g, 'and')
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
}

interface CategoryDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  category?: Category | null;
}

export function CategoryDialog({ isOpen, onOpenChange, category }: CategoryDialogProps) {
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);

  const form = useForm<CategoryFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      slug: '',
    },
  });

  const nameValue = form.watch('name');
  useEffect(() => {
    // This effect runs when the component using the form is client-side.
    if (nameValue && (form.formState.isDirty || !category)) {
        form.setValue('slug', createSlug(nameValue), { shouldValidate: true });
    }
  }, [nameValue, form, category]);

  useEffect(() => {
    if (isOpen) {
        if (category) {
          form.reset(category);
        } else {
          form.reset({ name: '', slug: '' });
        }
    }
  }, [category, form, isOpen]);

  const onSubmit: SubmitHandler<CategoryFormData> = async (data) => {
    setIsSaving(true);
    try {
      const result = category
        ? await updateCategory(category.id, data.name, data.slug)
        : await createCategory(data.name, data.slug);
      
      if (result.success) {
        toast({ title: 'Success!', description: `Category has been ${category ? 'updated' : 'created'}.` });
        onOpenChange(false);
      } else {
        toast({ variant: 'destructive', title: 'Error', description: result.message });
      }
    } catch (error) {
      console.error('Failed to save category:', error);
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to save category.' });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{category ? 'Edit Category' : 'Create New Category'}</DialogTitle>
          <DialogDescription>Categories help organize your posts.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
             <FormField control={form.control} name="name" render={({ field }) => (
                <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl><Input placeholder="e.g., Technology" {...field} /></FormControl>
                    <FormMessage />
                </FormItem>
                )} />
            <FormField control={form.control} name="slug" render={({ field }) => (
                <FormItem>
                    <FormLabel>Slug</FormLabel>
                    <FormControl><Input placeholder="auto-generated-from-name" {...field} /></FormControl>
                    <FormMessage />
                </FormItem>
            )} />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
              <Button type="submit" disabled={isSaving}>{isSaving ? 'Saving...' : 'Save Category'}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
