
'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { AnimatedCounter } from '@/components/animated-counter';
import type { ImpactSection as ImpactData } from '@/services/greenJourneyService';
import { AnimatedSection } from '@/components/animated-section';


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

        <AnimatedSection className="py-16 md:py-24 bg-background">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-foreground">Precision & Energy Efficiency</h2>
                <p className="mt-4 text-muted-foreground">
                  At KEMAS, we use high-precision molding machines to maximize productivity and minimize waste. Our facility features insulated barrels and smart automated systems that prevent heat loss and power down idle machinery. Combined with advanced Arburg technology and rigorous maintenance, this reduces our energy consumption by up to 50%.
                </p>
                 <Button asChild variant="outline" className="mt-6">
                  <Link href="https://www.kemaspkg.com/technology/">
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="relative aspect-square rounded-lg overflow-hidden shadow-lg">
                 <Image
                    src="https://picsum.photos/seed/efficiency/600/600"
                    alt="Precision & Energy Efficiency"
                    fill
                    className="object-cover"
                    data-ai-hint="factory machinery"
                  />
              </div>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection className="py-16 md:py-24 bg-secondary/30">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
               <div className="relative aspect-square rounded-lg overflow-hidden shadow-lg md:order-1">
                 <Image
                    src="https://picsum.photos/seed/waste-management/600/600"
                    alt="Smart Waste Management"
                    fill
                    className="object-cover"
                    data-ai-hint="recycling water"
                  />
              </div>
              <div className="md:order-2">
                <h2 className="text-3xl font-bold text-foreground">Smart Waste Management</h2>
                <p className="mt-4 text-muted-foreground">
                  We are committed to a zero-waste philosophy. We recycle 100% of the water used in our anodization facility and capture chemical waste from spray lines to be repurposed as fuel. Additionally, all organic waste is composted and used as fertilizer for our factory grounds.
                </p>
                <Button asChild variant="outline" className="mt-6">
                  <Link href="#">
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection className="py-16 md:py-24 bg-background">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-foreground">Automation & Carbon Reduction</h2>
                <p className="mt-4 text-muted-foreground">
                  Our use of highly automated equipment improves efficiency and reduces human error (scrap). This technology also allows us to operate with a leaner workforce, which significantly lowers our carbon footprint—cutting an estimated 330 metric tons of CO2 per year simply by reducing daily commuting emissions.
                </p>
                 <Button asChild variant="outline" className="mt-6">
                  <Link href="#">
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="relative aspect-square rounded-lg overflow-hidden shadow-lg">
                 <Image
                    src="https://picsum.photos/seed/automation/600/600"
                    alt="Automation & Carbon Reduction"
                    fill
                    className="object-cover"
                    data-ai-hint="robotic arm factory"
                  />
              </div>
            </div>
          </div>
        </AnimatedSection>
    </main>
  );
}
