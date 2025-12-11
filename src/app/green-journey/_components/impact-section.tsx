
'use client';

import { Card } from '@/components/ui/card';
import type { ImpactSection as ImpactData } from '@/services/greenJourneyService';
import { AnimatedSection } from './animated-section';
import { CircularCounter } from '@/components/ui/circular-counter';

interface ImpactSectionProps {
  data: ImpactData;
}

export function ImpactSection({ data }: ImpactSectionProps) {
  return (
    <AnimatedSection id="impact" className="py-16 md:py-24 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">{data.title}</h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">{data.description}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {data.metrics.map((metric, index) => (
            <div key={index} className="flex flex-col items-center text-center p-6">
               <CircularCounter
                  to={metric.value}
                  suffix={metric.suffix}
                />
              <p className="mt-4 text-lg font-bold">
                {metric.value}{metric.suffix || ''} {metric.unit}
              </p>
              <p className="mt-1 text-muted-foreground">{metric.label}</p>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

    