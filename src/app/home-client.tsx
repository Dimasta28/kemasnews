
'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
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
        <section className="relative flex items-center h-[90vh] bg-black text-white overflow-hidden">
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
        </section>

        <section className="bg-black text-white py-12 md:py-16">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                {impactData.metrics.map((metric, index) => (
                    <div key={index} className="text-center">
                        <div className="text-4xl md:text-5xl font-extrabold">
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
        </section>
    </main>
  );
}
