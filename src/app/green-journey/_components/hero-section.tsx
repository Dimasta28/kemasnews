
'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { HeroSection as HeroData } from '@/services/greenJourneyService';

interface HeroSectionProps {
  data: HeroData;
}

export function HeroSection({ data }: HeroSectionProps) {
  return (
    <section className="relative h-[80vh] flex items-center justify-center text-center text-white bg-black overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute z-0 w-auto min-w-full min-h-full max-w-none opacity-40 object-cover"
        poster="https://images.pexels.com/photos/3214533/pexels-photo-3214533.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
      >
        <source src={data.videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="relative z-10 max-w-3xl p-8">
        <h1 className="text-4xl md:text-7xl font-extrabold leading-tight mb-4 tracking-tight">
          {data.tagline}
        </h1>
        <p className="text-base md:text-xl text-gray-200">
          {data.description}
        </p>
        <Button asChild size="lg" className="mt-8">
          <Link href="#impact">
            {data.ctaText} <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
