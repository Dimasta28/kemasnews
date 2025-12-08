
'use client';

import type { ProblemSection as ProblemData } from '@/services/greenJourneyService';
import { AnimatedSection } from './animated-section';

interface ProblemSectionProps {
  data: ProblemData;
}

export function ProblemSection({ data }: ProblemSectionProps) {
  return (
    <AnimatedSection className="py-16 md:py-24 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">{data.title}</h2>
        <p className="text-lg text-muted-foreground mt-4">{data.description}</p>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {data.stats.map((stat, index) => (
            <div key={index} className="p-6 bg-card rounded-lg shadow-sm">
              <h3 className="text-4xl font-extrabold text-primary">{stat.value}</h3>
              <p className="mt-2 text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
