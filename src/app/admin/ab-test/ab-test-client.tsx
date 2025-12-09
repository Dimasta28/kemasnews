
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
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { BarChart, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export function ABTestClient() {
  const [splitRatio, setSplitRatio] = useState([50]);
  const [isTestActive, setIsTestActive] = useState(false);
  const [isSecondTestActive, setIsSecondTestActive] = useState(true);

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
              <CardTitle>Homepage CTA Button Text</CardTitle>
              <CardDescription>
                Testing which button text drives more clicks on the main hero.
              </CardDescription>
            </div>
             <div className="flex items-center space-x-2">
                <Switch id="test-status-1" checked={isTestActive} onCheckedChange={setIsTestActive} />
                <Label htmlFor="test-status-1">{isTestActive ? 'Active' : 'Inactive'}</Label>
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
                <Button size="lg">Get Started</Button>
                <p className="text-xs text-muted-foreground">Button Text: "Get Started"</p>
              </div>
            </CardContent>
            <CardFooter>
                 <div className="text-sm">
                    <p className="font-semibold">Conversion Rate: 12.5%</p>
                    <p className="text-muted-foreground">1,250 clicks / 10,000 views</p>
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
                    <Button size="lg" variant="secondary">Explore Solutions</Button>
                     <p className="text-xs text-muted-foreground">Button Text: "Explore Solutions"</p>
                </div>
            </CardContent>
             <CardFooter>
                 <div className="text-sm">
                    <p className="font-semibold">Conversion Rate: 14.2%</p>
                    <p className="text-muted-foreground">1,420 clicks / 10,000 views</p>
                 </div>
            </CardFooter>
          </Card>
        </CardContent>
        <CardFooter className="flex-col items-start gap-4">
            <div>
                 <Label>Traffic Split (A/B)</Label>
                 <div className="flex items-center gap-4 mt-2">
                    <span className="text-sm font-medium">{100 - splitRatio[0]}%</span>
                    <Slider
                        defaultValue={splitRatio}
                        onValueChange={setSplitRatio}
                        max={100}
                        step={1}
                        className="w-[60%]"
                    />
                     <span className="text-sm font-medium">{splitRatio[0]}%</span>
                </div>
            </div>
             <Button variant="ghost" className="text-sm p-0 h-auto self-end" asChild>
                <Link href="#">View Detailed Report <ChevronRight className="h-4 w-4 ml-1" /></Link>
            </Button>
        </CardFooter>
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
