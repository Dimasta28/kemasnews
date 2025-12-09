
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

function GreenJourneyFormVariantB() {
    const [step, setStep] = useState(1);
    
    return (
        <div className="p-8 border-dashed border-2 rounded-lg text-left">
            <p className="text-center text-sm font-semibold mb-4">Kemas Green Journey — karena masa depan kosmetik lebih hijau.</p>
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
                        <Label>Produk Fokus</Label>
                        <Select>
                            <SelectTrigger><SelectValue placeholder="Pilih produk..." /></SelectTrigger>
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
                            <SelectTrigger><SelectValue placeholder="Pilih prioritas..." /></SelectTrigger>
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
  const [isSecondTestActive, setIsSecondTestActive] = useState(true);
  const [isFormTestActive, setIsFormTestActive] = useState(true);

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">A/B Testing</h1>
          <p className="text-muted-foreground">
            Create and manage experiments for your buttons and forms.
          </p>
        </div>
        <Button>Create New Test</Button>
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
                <p className="text-sm font-semibold">Program sustainability untuk brand cosmetic modern.</p>
                <div className="space-y-4 text-left">
                    <div className="space-y-2">
                        <Label htmlFor="brand-name-a">Nama Brand</Label>
                        <Input id="brand-name-a" placeholder="Nama brand Anda" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email-a">Contact Email</Label>
                        <Input id="email-a" type="email" placeholder="your@company.com" />
                    </div>
                    <div className="space-y-2">
                        <Label>Minat Sustainability</Label>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Pilih minat..." />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="recycled-resin">Recycled Resin</SelectItem>
                                <SelectItem value="eco-pack">Eco-Pack</SelectItem>
                                <SelectItem value="carbon-tracking">Carbon Tracking</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="message-a">Pesan Tambahan (Optional)</Label>
                        <Textarea id="message-a" placeholder="Ada lagi yang ingin disampaikan?" />
                    </div>
                    <Button className="w-full">Mulai Green Journey</Button>
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
      
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>Homepage CTA Button Color</CardTitle>
              <CardDescription>
                Testing which button color and text variant is more effective.
              </CardDescription>
            </div>
             <div className="flex items-center space-x-2">
                <Switch id="test-status-2" checked={isSecondTestActive} onCheckedChange={setIsSecondTestActive} />
                <Label htmlFor="test-status-2">{isSecondTestActive ? 'Active' : 'Inactive'}</Label>
            </div>
          </div>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-8">
          {/* Variant A */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Variant A</CardTitle>
                <Badge variant="secondary">Original</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-center p-8 border-dashed border-2 rounded-lg">
                <Label>Preview</Label>
                <Button size="lg" variant="outline">Learn More</Button>
                <p className="text-xs text-muted-foreground">Button Text: "Learn More"</p>
              </div>
            </CardContent>
            <CardFooter>
                 <div className="text-sm">
                    <p className="font-semibold">Conversion Rate: 9.8%</p>
                    <p className="text-muted-foreground">980 clicks / 10,000 views</p>
                 </div>
            </CardFooter>
          </Card>

          {/* Variant B */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Variant B</CardTitle>
                <Badge variant="outline">Challenger</Badge>
              </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-4 text-center p-8 border-dashed border-2 rounded-lg">
                    <Label>Preview</Label>
                    <Button size="lg">Discover Our Plan</Button>
                     <p className="text-xs text-muted-foreground">Button Text: "Discover Our Plan"</p>
                </div>
            </CardContent>
             <CardFooter>
                 <div className="text-sm">
                    <p className="font-semibold">Winning</p>
                    <p className="text-muted-foreground">This variant is performing better.</p>
                 </div>
            </CardFooter>
          </Card>
        </CardContent>
        <CardFooter className="flex justify-end">
             <Button variant="ghost" className="text-sm p-0 h-auto" asChild>
                <Link href="#">View Detailed Report <ChevronRight className="h-4 w-4 ml-1" /></Link>
            </Button>
        </CardFooter>
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
