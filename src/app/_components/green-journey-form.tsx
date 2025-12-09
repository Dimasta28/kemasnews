
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Send } from 'lucide-react';
import { AnimatedSection } from '@/components/animated-section';

export function GreenJourneyForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');

  const handleNextStep = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (email) {
      setStep(2);
    } else {
      toast({
        variant: 'destructive',
        title: 'Email Required',
        description: 'Please enter your email address to continue.',
      });
    }
  };
  
  const handleContactSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    toast({
      title: 'Thank You!',
      description: "We've received your interest and will be in touch shortly.",
    });
    (event.target as HTMLFormElement).reset();
    setEmail('');
    setStep(1);
    setIsSubmitting(false);
  };

  return (
    <AnimatedSection className="py-16 md:py-24 bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="overflow-hidden shadow-2xl">
          <div className="grid md:grid-cols-2">
            <div className="p-8 md:p-12 bg-primary text-primary-foreground flex flex-col justify-center">
                <h2 className="text-3xl font-bold">Join the Green Journey</h2>
                <p className="mt-4 text-primary-foreground/80">Let’s build the next-generation sustainable packaging together. Start by entering your email.</p>
            </div>
            <div className="p-8">
                <form onSubmit={handleContactSubmit}>
                    {step === 1 && (
                         <div className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-foreground/80">Email Address</Label>
                                <Input 
                                    id="email" 
                                    name="email" 
                                    type="email" 
                                    placeholder="your@company.com" 
                                    required 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <Button onClick={handleNextStep} className="w-full" size="lg">Next Step</Button>
                        </div>
                    )}
                    {step === 2 && (
                         <div className="space-y-6 animate-in fade-in-50">
                            <div className="space-y-2">
                                <Label htmlFor="brand-name">Brand Name</Label>
                                <Input id="brand-name" name="brand-name" placeholder="Your Brand Name" required />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="needs">What are you looking for?</Label>
                                <Input id="needs" name="needs" placeholder="e.g., Recycled PET jars, Refillable lipstick..." required />
                            </div>
                            <div className="flex gap-2">
                                <Button variant="outline" onClick={() => setStep(1)} className="w-1/3">Back</Button>
                                <Button type="submit" size="lg" className="w-2/3" disabled={isSubmitting}>
                                    {isSubmitting ? 'Submitting...' : 'Join the Journey'} <Send className="ml-2 h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    )}
                </form>
            </div>
          </div>
        </Card>
      </div>
    </AnimatedSection>
  );
}
