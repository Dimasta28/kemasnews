
'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import type { JobOpening } from '@/services/careerService';
import { createApplicant } from '@/services/applicantService';
import { CheckCircle, Terminal } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email('Please enter a valid email address.'),
  phone: z.string().min(10, 'Please enter a valid phone number.'),
  resumeUrl: z.string().url('Please enter a valid URL for your resume.'),
  coverLetter: z.string().optional(),
});

type ApplicationFormData = z.infer<typeof formSchema>;

interface ApplyFormProps {
  job: JobOpening | null;
  error?: string | null;
}

export function ApplyForm({ job, error }: ApplyFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<ApplicationFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      resumeUrl: '',
      coverLetter: '',
    },
  });

  const onSubmit: SubmitHandler<ApplicationFormData> = async (data) => {
    if (!job) return;
    setIsSubmitting(true);
    try {
      const result = await createApplicant({
        ...data,
        jobId: job.id,
        jobTitle: job.title,
      });

      if (result.success) {
        setIsSubmitted(true);
      } else {
        toast({
          variant: 'destructive',
          title: 'Submission Failed',
          description: result.message,
        });
      }
    } catch (error) {
      console.error('Failed to submit application:', error);
      toast({ variant: 'destructive', title: 'Error', description: 'An unexpected error occurred.' });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (error || !job) {
     return (
        <Card className="w-full max-w-2xl">
           <CardHeader>
             <CardTitle>Error</CardTitle>
             <CardDescription>Could not load application form.</CardDescription>
           </CardHeader>
           <CardContent>
             <Alert variant="destructive">
               <Terminal className="h-4 w-4" />
               <AlertTitle>Could Not Load Job Details</AlertTitle>
               <AlertDescription>
                 <p>There was an error loading the data for this job opening.</p>
                 <p className="mt-2 font-mono text-xs bg-muted p-2 rounded">{error || 'Job data is unavailable.'}</p>
                 <Button asChild variant="link" className="p-0 h-auto mt-4">
                    <Link href="/careers">Back to Careers</Link>
                 </Button>
               </AlertDescription>
             </Alert>
           </CardContent>
        </Card>
     )
  }
  
  if (isSubmitted) {
      return (
        <Card className="w-full max-w-2xl text-center">
            <CardHeader>
                <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
                <CardTitle className="mt-4">Application Submitted!</CardTitle>
                <CardDescription>
                    Thank you for applying for the {job.title} position. We have received your application and will be in touch if your qualifications match our needs.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Button asChild>
                    <Link href="/careers">Back to Careers</Link>
                </Button>
            </CardContent>
        </Card>
      )
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Apply for: {job.title}</CardTitle>
        <CardDescription>Please fill out the form below to submit your application.</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <FormField control={form.control} name="name" render={({ field }) => (
                <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl><Input placeholder="e.g., John Doe" {...field} /></FormControl>
                    <FormMessage />
                </FormItem>
                )} />
                <FormField control={form.control} name="email" render={({ field }) => (
                <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl><Input placeholder="e.g., john.doe@example.com" {...field} /></FormControl>
                    <FormMessage />
                </FormItem>
                )} />
             </div>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <FormField control={form.control} name="phone" render={({ field }) => (
                <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl><Input placeholder="e.g., +62 123 456 7890" {...field} /></FormControl>
                    <FormMessage />
                </FormItem>
                )} />
                <FormField control={form.control} name="resumeUrl" render={({ field }) => (
                <FormItem>
                    <FormLabel>Resume/CV URL</FormLabel>
                    <FormControl><Input placeholder="e.g., https://linkedin.com/in/..." {...field} /></FormControl>
                    <FormMessage />
                </FormItem>
                )} />
            </div>
            <FormField control={form.control} name="coverLetter" render={({ field }) => (
              <FormItem>
                <FormLabel>Cover Letter (Optional)</FormLabel>
                <FormControl><Textarea placeholder="Tell us why you're a great fit for this role..." className="min-h-[150px]" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" asChild>
                <Link href="/careers">Cancel</Link>
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
