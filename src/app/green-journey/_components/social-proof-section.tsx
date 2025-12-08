
'use client';

import Image from 'next/image';
import type { SocialProofLogo } from '@/services/greenJourneyService';
import { AnimatedSection } from './animated-section';

interface SocialProofSectionProps {
  logos: SocialProofLogo[];
}

export function SocialProofSection({ logos }: SocialProofSectionProps) {
  return (
    <AnimatedSection className="py-12 bg-secondary/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-sm font-semibold text-muted-foreground tracking-wider uppercase">
          Trusted by leading global brands
        </h2>
        <div className="mt-6 grid grid-cols-2 gap-8 md:grid-cols-5 lg:grid-cols-5">
          {logos.map((logo, index) => (
            <div key={index} className="col-span-1 flex justify-center lg:col-span-1 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
              <Image
                className="h-10 w-auto object-contain"
                src={logo.logoUrl}
                alt={logo.name}
                width={158}
                height={48}
                data-ai-hint="company logo"
              />
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
