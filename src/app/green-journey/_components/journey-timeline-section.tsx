
'use client';

import type { JourneyStep } from '@/services/greenJourneyService';
import { AnimatedSection } from './animated-section';

interface JourneyTimelineSectionProps {
  steps: JourneyStep[];
}

export function JourneyTimelineSection({ steps }: JourneyTimelineSectionProps) {
  if (steps.length === 0) {
    return null;
  }

  return (
    <AnimatedSection className="py-16 md:py-24 bg-secondary/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Our Journey So Far</h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">Key milestones in our commitment to a sustainable future.</p>
        </div>
        <div className="relative">
          {/* The timeline line */}
          <div className="absolute left-1/2 -translate-x-1/2 h-full w-0.5 bg-border" aria-hidden="true"></div>

          <div className="relative flex flex-col gap-12">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center w-full">
                {/* Content Left */}
                {index % 2 === 0 ? (
                  <>
                    <div className="w-1/2 pr-8 text-right">
                      <h3 className="font-bold text-xl text-primary">{step.title}</h3>
                      <p className="mt-2 text-muted-foreground">{step.description}</p>
                    </div>
                    <div className="w-1/2 pl-8"></div>
                  </>
                ) : (
                  <>
                    <div className="w-1/2 pr-8"></div>
                    <div className="w-1/2 pl-8 text-left">
                       <h3 className="font-bold text-xl text-primary">{step.title}</h3>
                       <p className="mt-2 text-muted-foreground">{step.description}</p>
                    </div>
                  </>
                )}

                {/* The Circle and Year */}
                <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center">
                    <div className="z-10 flex h-24 w-24 items-center justify-center rounded-full border-4 border-background bg-primary text-primary-foreground shadow-lg">
                        <span className="font-bold text-xl">{step.year}</span>
                    </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
