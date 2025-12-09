
'use client';

import type { ProblemSection as ProblemData } from '@/services/greenJourneyService';
import { AnimatedSection } from './animated-section';
import Image from 'next/image';

interface ProblemSectionProps {
  data: ProblemData;
}

export function ProblemSection({ data }: ProblemSectionProps) {
  return (
    <AnimatedSection className="py-16 md:py-24 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="grid grid-cols-2 gap-4">
              <div className="relative aspect-[9/16] rounded-3xl overflow-hidden shadow-lg group">
                <Image
                    src="https://picsum.photos/seed/dry-earth/400/711"
                    alt="Dry earth with a dead tree"
                    fill
                    className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                    data-ai-hint="dry cracked earth"
                />
              </div>
               <div className="relative aspect-[9/16] rounded-3xl overflow-hidden shadow-lg group mt-8">
                <Image
                    src="https://picsum.photos/seed/green-earth/400/711"
                    alt="Lush green field with a healthy tree"
                    fill
                    className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                    data-ai-hint="green tree field"
                />
              </div>
          </div>
          <div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">GREEN PROBLEM</h2>
            <p className="mt-6 text-muted-foreground text-base md:text-lg">
                Climate change includes both global warming driven by human-induced emissions of greenhouse gases and the resulting large-scale shifts in weather patterns. Though there have been previous periods of climatic change, since the mid-20th century humans have had an unprecedented impact on Earth's climate system and caused change on a global scale. And it's becoming more real at this point, the melt of arctic ice, big flood in Germany, Greece forest fire are fine examples of how these incidents are threatening human life.
            </p>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
