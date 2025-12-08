
'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Send } from 'lucide-react';
import type { CtaSection as CtaData } from '@/services/greenJourneyService';
import { AnimatedSection } from './animated-section';

interface CtaSectionProps {
  data: CtaData;
}

export function CtaSection({ data }: CtaSectionProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleContactSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    // Here you would typically handle form submission, e.g., send to an API endpoint.
    // For this example, we'll just simulate a delay and show a toast.
    await new Promise(resolve => setTimeout(resolve, 1500));
    toast({
      title: 'Message Sent!',
      description: 'Thank you for reaching out. We will get back to you shortly.',
    });
    (event.target as HTMLFormElement).reset();
    setIsSubmitting(false);
  };

  return (
    <AnimatedSection className="py-16 md:py-24 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">{data.title}</h2>
          <p className="text-lg text-muted-foreground mt-4">{data.description}</p>
        </div>
        <Card>
          <CardContent className="p-8">
            <form onSubmit={handleContactSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" name="name" placeholder="e.g., John Doe" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" name="email" type="email" placeholder="e.g., john.doe@example.com" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="needs">Your Needs</Label>
                <Textarea id="needs" name="needs" placeholder="Tell us about your packaging requirements..." className="min-h-[120px]" required />
              </div>
              <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : data.buttonText} <Send className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </AnimatedSection>
  );
}
