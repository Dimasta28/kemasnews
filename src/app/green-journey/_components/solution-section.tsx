
'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DynamicIcon } from '@/components/ui/dynamic-icon';
import type { SolutionSection as SolutionData } from '@/services/greenJourneyService';
import { AnimatedSection } from './animated-section';

interface SolutionSectionProps {
  data: SolutionData;
}

export function SolutionSection({ data }: SolutionSectionProps) {
  return (
    <AnimatedSection className="py-16 md:py-24 bg-secondary/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">{data.title}</h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">{data.description}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.innovations.map((item, index) => (
            <Card key={index} className="bg-card/75 backdrop-blur-lg flex flex-col">
              <CardHeader className="flex-row items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                   <DynamicIcon name={item.iconName} className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button asChild size="lg" variant="outline">
            <Link href={data.ctaLink}>
              {data.ctaText} <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </AnimatedSection>
  );
}
