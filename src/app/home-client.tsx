
'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

interface HomeClientProps {
  heroImageUrl: string;
}

export function HomeClient({ heroImageUrl }: HomeClientProps) {
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
            />
        </motion.div>
        <div className="relative z-10 max-w-4xl mx-auto text-left">
            <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight">KEMAS GREEN JOURNEY</h1>
            <p className="mt-4 text-lg max-w-2xl">
            From Waste to Worth: Join us on a mission to reshape the future of packaging, one sustainable choice at a time.
            </p>
            <div className="mt-8 flex gap-4">
            <Button asChild size="lg">
                <Link href="#">
                Get Started
                </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
                <Link href="#">
                Learn More <ArrowRight className="ml-2" />
                </Link>
            </Button>
            </div>
        </div>
        </section>
    </main>
  );
}
