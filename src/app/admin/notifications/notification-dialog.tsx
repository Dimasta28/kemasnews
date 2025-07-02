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
import { useToast } from '@/hooks/use-toast';
import { createNotification, updateNotification, type Notification } from '@/services/notificationService';

const formSchema = z.object({
  title: z.string().min(1, 'Title is required.'),
  description: z.string().min(1, 'Description is required.'),
  link: z.string().url({ message: 'Please enter a valid URL.' }).optional().or(z.literal('')),
});

type NotificationFormData = z.infer<typeof formSchema>;

interface NotificationDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onNotificationSaved: () => void;
  notification?: Notification | null;
}

export function NotificationDialog({ isOpen, onOpenChange, onNotificationSaved, notification }: NotificationDialogProps) {
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);

  const form = useForm<NotificationFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      link: '',
    },
  });

  useEffect(() => {
    if (notification) {
      form.reset({
        title: notification.title,
        description: notification.description,
        link: notification.link,
      });
    } else {
      form.reset({ title: '', description: '', link: '#' });
    }
  }, [notification, form, isOpen]);

  const onSubmit: SubmitHandler<NotificationFormData> = async (data) => {
    setIsSaving(true);
    try {
      if (notification) {
        await updateNotification(notification.id, data);
        toast({ title: 'Success!', description: 'Notification has been updated.' });
      } else {
        await createNotification(data);
        toast({ title: 'Success!', description: 'New notification has been created.' });
      }
      onNotificationSaved();
      onOpenChange(false);
    } catch (error) {
      console.error('Failed to save notification:', error);
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to save notification.' });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{notification ? 'Edit Notification' : 'Create New Notification'}</DialogTitle>
          <DialogDescription>Fill in the details for the notification.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
             <FormField control={form.control} name="title" render={({ field }) => (
                <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl><Input placeholder="e.g., New feature released" {...field} /></FormControl>
                    <FormMessage />
                </FormItem>
                )} />
            <FormField control={form.control} name="description" render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl><Textarea placeholder="Describe the notification..." {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="link" render={({ field }) => (
              <FormItem>
                <FormLabel>Link URL</FormLabel>
                <FormControl><Input placeholder="https://example.com/link" {...field} value={field.value ?? ''} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
              <Button type="submit" disabled={isSaving}>{isSaving ? 'Saving...' : 'Save Notification'}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
