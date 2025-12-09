
'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { AnimatedCounter } from '@/components/animated-counter';
import type { ImpactSection as ImpactData } from '@/services/greenJourneyService';


interface HomeClientProps {
  heroImageUrl: string;
  impactData: ImpactData;
}

export function HomeClient({ heroImageUrl, impactData }: HomeClientProps) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, -100]);

  return (
    <main className="flex-grow">
        <section className="relative flex items-center h-screen bg-black text-white overflow-hidden">
        <motion.div
            className="absolute inset-0 z-0"
            style={{ y }}
        >
            <Image
                src={heroImageUrl}
                alt="Nature background"
                fill
                className="object-cover opacity-40"
                priority
                data-ai-hint="nature background"
            />
        </motion.div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-0 text-left">
            <h2 className="text-lg md:text-2xl font-semibold tracking-wide uppercase text-primary-foreground/80 mb-2">Packaging of the Future</h2>
            <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight">Beautiful, Smart, Sustainable</h1>
            <p className="mt-4 text-lg max-w-2xl">
            Combining manufacturing precision with circular economy principles for a global cosmetics brand
            </p>
            <div className="mt-8 flex gap-4">
            <Button asChild size="lg">
                <Link href="/green-plan">
                Get Started
                </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
                <Link href="/green-plan">
                Learn More <ArrowRight className="ml-2" />
                </Link>
            </Button>
            </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-20 p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
                 <div className="p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                    {impactData.metrics.map((metric, index) => (
                        <div key={index} className="text-center text-white">
                            <div className="text-4xl font-extrabold">
                                <AnimatedCounter 
                                from={0} 
                                to={metric.value} 
                                prefix={metric.prefix}
                                suffix={metric.suffix}
                                />
                            </div>
                            <p className="mt-2 text-sm text-white/80">{metric.label}</p>
                        </div>
                    ))}
                    </div>
                </div>
            </div>
        </div>
        </section>
    </main>
  );
}
