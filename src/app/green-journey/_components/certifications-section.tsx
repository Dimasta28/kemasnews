
'use client';

import Image from 'next/image';
import type { Certification } from '@/services/greenJourneyService';
import { AnimatedSection } from './animated-section';

interface CertificationsSectionProps {
  certifications: Certification[];
}

export function CertificationsSection({ certifications }: CertificationsSectionProps) {
  return (
    <AnimatedSection className="py-16 bg-secondary/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Certified Commitment to Excellence</h2>
            <p className="mt-4 text-muted-foreground">Our operations are backed by globally recognized standards, ensuring quality, safety, and environmental responsibility in everything we do.</p>
          </div>
          <div className="grid grid-cols-3 gap-8">
            {certifications.map((cert, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="relative h-20 w-20 grayscale hover:grayscale-0 transition-all duration-300">
                  <Image src={cert.logoUrl} alt={cert.name} fill className="object-contain" data-ai-hint="certification logo"/>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">{cert.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
