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
import { createDepartment, updateDepartment, type Department } from '@/services/departmentService';

const formSchema = z.object({
  name: z.string().min(1, 'Name is required.'),
  slug: z.string().min(1, 'Slug is required.'),
});

type DepartmentFormData = z.infer<typeof formSchema>;

function createSlug(name: string): string {
    return name
        .toLowerCase()
        .replace(/&/g, 'and')
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
}

interface DepartmentDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  department?: Department | null;
}

export function DepartmentDialog({ isOpen, onOpenChange, department }: DepartmentDialogProps) {
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);

  const form = useForm<DepartmentFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      slug: '',
    },
  });

  const nameValue = form.watch('name');
  useEffect(() => {
    // This effect runs when the component using the form is client-side.
    if (nameValue && form.formState.isDirty) {
        form.setValue('slug', createSlug(nameValue), { shouldValidate: true });
    }
  }, [nameValue, form]);

  useEffect(() => {
    if (isOpen) {
        if (department) {
          form.reset(department);
        } else {
          form.reset({ name: '', slug: '' });
        }
    }
  }, [department, form, isOpen]);

  const onSubmit: SubmitHandler<DepartmentFormData> = async (data) => {
    setIsSaving(true);
    try {
      const result = department
        ? await updateDepartment(department.id, data.name, data.slug)
        : await createDepartment(data.name, data.slug);
      
      if (result.success) {
        toast({ title: 'Success!', description: `Department has been ${department ? 'updated' : 'created'}.` });
        onOpenChange(false);
      } else {
        toast({ variant: 'destructive', title: 'Error', description: result.message });
      }
    } catch (error) {
      console.error('Failed to save department:', error);
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to save department.' });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{department ? 'Edit Department' : 'Create New Department'}</DialogTitle>
          <DialogDescription>Departments help categorize job openings.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
             <FormField control={form.control} name="name" render={({ field }) => (
                <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl><Input placeholder="e.g., Engineering" {...field} /></FormControl>
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
              <Button type="submit" disabled={isSaving}>{isSaving ? 'Saving...' : 'Save Department'}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
