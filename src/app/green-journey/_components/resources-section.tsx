
'use client';

import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DynamicIcon } from '@/components/ui/dynamic-icon';
import type { Resource } from '@/services/greenJourneyService';
import { AnimatedSection } from './animated-section';

interface ResourcesSectionProps {
  resources: Resource[];
}

export function ResourcesSection({ resources }: ResourcesSectionProps) {
  if (resources.length === 0) {
    return null;
  }
  return (
    <AnimatedSection className="py-16 md:py-24 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Resources & Insights</h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">Explore our research, reports, and guides on sustainable packaging.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {resources.map((resource, index) => (
            <Card key={index} className="flex flex-col">
              <CardHeader className="flex-row items-start gap-4 pb-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <DynamicIcon name={resource.iconName} className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle>{resource.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col">
                <CardDescription className="flex-grow">{resource.description}</CardDescription>
                <Button asChild variant="outline" className="mt-6 w-full">
                  <Link href={resource.link}>
                    Download Now
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
