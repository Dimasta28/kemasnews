
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardFooter,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { BarChart, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

function GreenJourneyFormVariantB() {
    const [step, setStep] = useState(1);
    
    return (
        <div className="p-8 border-dashed border-2 rounded-lg text-left">
            <p className="text-center text-sm font-semibold mb-4">Kemas Green Journey — because the future of cosmetics is greener.</p>
            {step === 1 && (
                <div className="space-y-4">
                    <p className="text-center text-muted-foreground">"Let’s build the next-generation sustainable packaging together."</p>
                    <div className="space-y-2">
                        <Label htmlFor="email-b">Email</Label>
                        <Input id="email-b" placeholder="your@company.com" />
                    </div>
                    <Button className="w-full" onClick={() => setStep(2)}>Next Step</Button>
                </div>
            )}
            {step === 2 && (
                 <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="brand-name-b">Brand Name</Label>
                        <Input id="brand-name-b" placeholder="Your Brand" />
                    </div>
                     <div className="space-y-2">
                        <Label>Focus Product</Label>
                        <Select>
                            <SelectTrigger><SelectValue placeholder="Select a product..." /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="jar">Jar</SelectItem>
                                <SelectItem value="lipstick">Lipstick</SelectItem>
                                <SelectItem value="compact">Compact</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                     <div className="space-y-2">
                        <Label>Priority</Label>
                         <Select>
                            <SelectTrigger><SelectValue placeholder="Select a priority..." /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="recycled">Recycled</SelectItem>
                                <SelectItem value="bio-based">Bio-based</SelectItem>
                                <SelectItem value="carbon-reduction">Carbon Reduction</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <Button className="w-full">Join the Journey</Button>
                    <Button variant="link" size="sm" className="w-full" onClick={() => setStep(1)}>Back</Button>
                </div>
            )}
        </div>
    );
}


export function ABTestClient() {
  const [isFormTestActive, setIsFormTestActive] = useState(true);
  const [isNewTestDialogOpen, setIsNewTestDialogOpen] = useState(false);

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">A/B Testing</h1>
          <p className="text-muted-foreground">
            Create and manage experiments for your buttons and forms.
          </p>
        </div>
        <Dialog open={isNewTestDialogOpen} onOpenChange={setIsNewTestDialogOpen}>
          <DialogTrigger asChild>
            <Button>Create New Test</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create New A/B Test</DialogTitle>
              <DialogDescription>
                Set up a new experiment to optimize your user experience.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="test-name" className="text-right">
                  Test Name
                </Label>
                <Input id="test-name" placeholder="e.g., Homepage CTA Button" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="test-description" className="text-right">
                  Description
                </Label>
                <Textarea id="test-description" placeholder="What is the hypothesis for this test?" className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={() => setIsNewTestDialogOpen(false)}>Create Test</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

       <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>KEMAS Green Journey Form</CardTitle>
              <CardDescription>
                Testing which form experience drives more sustainability program sign-ups.
              </CardDescription>
            </div>
             <div className="flex items-center space-x-2">
                <Switch id="test-status-form" checked={isFormTestActive} onCheckedChange={setIsFormTestActive} />
                <Label htmlFor="test-status-form">{isFormTestActive ? 'Active' : 'Inactive'}</Label>
            </div>
          </div>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-8">
          {/* Variant A */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Variant A</CardTitle>
                <Badge variant="secondary">Simple Standard Form</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-center p-8 border-dashed border-2 rounded-lg">
                <p className="text-sm font-semibold">Sustainability program for modern cosmetic brands.</p>
                <div className="space-y-4 text-left">
                    <div className="space-y-2">
                        <Label htmlFor="brand-name-a">Brand Name</Label>
                        <Input id="brand-name-a" placeholder="Your brand name" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email-a">Contact Email</Label>
                        <Input id="email-a" type="email" placeholder="your@company.com" />
                    </div>
                    <div className="space-y-2">
                        <Label>Sustainability Interest</Label>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Select interest..." />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="recycled-resin">Recycled Resin</SelectItem>
                                <SelectItem value="eco-pack">Eco-Pack</SelectItem>
                                <SelectItem value="carbon-tracking">Carbon Tracking</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="message-a">Additional Message (Optional)</Label>
                        <Textarea id="message-a" placeholder="Is there anything else you'd like to share?" />
                    </div>
                    <Button className="w-full">Start Green Journey</Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
                 <div className="text-sm">
                    <p className="font-semibold">Conversion Rate: 5.5%</p>
                    <p className="text-muted-foreground">55 submits / 1,000 views</p>
                 </div>
            </CardFooter>
          </Card>

          {/* Variant B */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Variant B</CardTitle>
                <Badge variant="outline">Inspire + Multi-Step</Badge>
              </div>
            </CardHeader>
            <CardContent>
                <GreenJourneyFormVariantB />
            </CardContent>
             <CardFooter>
                 <div className="text-sm">
                    <p className="font-semibold">Conversion Rate: 8.2%</p>
                    <p className="text-muted-foreground">82 submits / 1,000 views</p>
                 </div>
            </CardFooter>
          </Card>
        </CardContent>
      </Card>
      
       <Card className="text-center">
            <CardContent className="p-8">
                <BarChart className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-semibold">Feature Under Development</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                    This A/B testing interface is a conceptual preview. Full functionality is coming soon.
                </p>
            </CardContent>
        </Card>
    </div>
  );
}
