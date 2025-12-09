
'use client';

import { Card } from '@/components/ui/card';
import type { ImpactSection as ImpactData } from '@/services/greenJourneyService';
import { AnimatedSection } from './green-journey/_components/animated-section';
import { AnimatedCounter } from './green-journey/_components/animated-counter';

interface HomeImpactSectionProps {
  data: ImpactData;
}

export function HomeImpactSection({ data }: HomeImpactSectionProps) {
  return (
    <AnimatedSection id="impact" className="py-16 md:py-24 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">{data.title}</h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">{data.description}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {data.metrics.map((metric, index) => (
            <Card key={index} className="text-center p-6 border-2 border-transparent hover:border-primary hover:bg-primary/5 transition-all">
              <div className="text-4xl font-extrabold text-primary">
                <AnimatedCounter 
                  from={0} 
                  to={metric.value} 
                  prefix={metric.prefix}
                  suffix={metric.suffix}
                />
              </div>
              <p className="mt-2 text-muted-foreground">{metric.label}</p>
            </Card>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
