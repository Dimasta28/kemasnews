'use client';

import { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { createJobOpening, updateJobOpening, type JobOpening } from '@/services/careerService';
import { getDepartments, type Department } from '@/services/departmentService';

const formSchema = z.object({
  title: z.string().min(1, 'Title is required.'),
  department: z.string().min(1, 'Department is required.'),
  location: z.string().min(1, 'Location is required.'),
  type: z.string().min(1, 'Type is required (e.g., Full-time).'),
  imageUrl: z.string().url({ message: 'Please enter a valid URL.' }).optional().or(z.literal('')),
  qualifications: z.string().optional(),
});

type JobOpeningFormData = z.infer<typeof formSchema>;

interface JobOpeningFormDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  job?: JobOpening | null;
}

export function JobOpeningDialog({ isOpen, onOpenChange, job }: JobOpeningFormDialogProps) {
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  const [departments, setDepartments] = useState<Department[]>([]);

  const form = useForm<JobOpeningFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      department: '',
      location: '',
      type: '',
      imageUrl: '',
      qualifications: '',
    },
  });
  
  useEffect(() => {
    async function fetchDepartments() {
      try {
        const fetchedDepartments = await getDepartments();
        setDepartments(fetchedDepartments);
      } catch (error) {
        console.error("Failed to fetch departments", error);
        toast({
            variant: "destructive",
            title: "Error",
            description: "Could not load departments."
        });
      }
    }
    if (isOpen) {
        fetchDepartments();
    }
  }, [isOpen, toast]);

  useEffect(() => {
    if (job) {
      form.reset(job);
    } else {
      form.reset({ title: '', department: '', location: '', type: '', imageUrl: '', qualifications: '' });
    }
  }, [job, form, isOpen]);

  const onSubmit: SubmitHandler<JobOpeningFormData> = async (data) => {
    setIsSaving(true);
    try {
      if (job) {
        await updateJobOpening(job.id, data);
        toast({ title: 'Success!', description: 'Job opening has been updated.' });
      } else {
        await createJobOpening(data as Omit<JobOpening, 'id' | 'createdAt'>);
        toast({ title: 'Success!', description: 'New job opening has been created.' });
      }
      onOpenChange(false);
    } catch (error) {
      console.error('Failed to save job opening:', error);
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to save job opening.' });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{job ? 'Edit Job Opening' : 'Create New Job Opening'}</DialogTitle>
          <DialogDescription>Fill in the details for the job position.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField control={form.control} name="title" render={({ field }) => (
                <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl><Input placeholder="e.g., Senior Frontend Developer" {...field} /></FormControl>
                    <FormMessage />
                </FormItem>
                )} />
                <FormField control={form.control} name="department" render={({ field }) => (
                <FormItem>
                    <FormLabel>Department</FormLabel>
                     <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a department" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {departments.map(dep => (
                            <SelectItem key={dep.id} value={dep.name}>{dep.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    <FormMessage />
                </FormItem>
                )} />
                <FormField control={form.control} name="location" render={({ field }) => (
                <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl><Input placeholder="e.g., Jakarta, Indonesia" {...field} /></FormControl>
                    <FormMessage />
                </FormItem>
                )} />
                <FormField control={form.control} name="type" render={({ field }) => (
                <FormItem>
                    <FormLabel>Type</FormLabel>
                    <FormControl><Input placeholder="e.g., Full-time, Contract" {...field} /></FormControl>
                    <FormMessage />
                </FormItem>
                )} />
            </div>
            <FormField control={form.control} name="imageUrl" render={({ field }) => (
              <FormItem>
                <FormLabel>Image URL</FormLabel>
                <FormControl><Input placeholder="https://placehold.co/600x400.png" {...field} value={field.value ?? ''} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="qualifications" render={({ field }) => (
              <FormItem>
                <FormLabel>Qualifications</FormLabel>
                <FormControl><Textarea placeholder="List the qualifications for the job..." className="min-h-[120px]" {...field} value={field.value ?? ''} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
              <Button type="submit" disabled={isSaving}>{isSaving ? 'Saving...' : 'Save Job'}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
