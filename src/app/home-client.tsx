
'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { AnimatedSection } from '@/components/animated-section';
import { CircularCounter } from '@/components/ui/circular-counter';


interface HomeClientProps {
  heroImageUrl: string;
}

// Static data as a fallback since the service is removed
const staticImpactData = {
    title: "Powering The Future With The Renew",
    description: "By partnering with us, brands are making a measurable difference for the planet. Here's what we've achieved together so far.",
    metrics: [
        { value: 330, label: "Carbon Emissions Reduced", description: "Reduced/Year", unit: "Ton+", iconName: "Wind" },
        { value: 100, label: "Water Recycling", description: "(Anodizing Facility)", suffix: "%", iconName: "Droplets" },
        { value: 50, label: "Energy Saving", description: "(Cooling Machine)", suffix: "%", iconName: "BatteryCharging" },
    ]
};

const featureSections = [
    {
        title: "PRECISION & ENERGY EFFICIENCY",
        description: "At KEMAS, we use high-precision molding machines to maximize productivity and minimize waste. Our facility features insulated barrels and smart automated systems that prevent heat loss and power down idle machinery. Combined with advanced Arburg technology and rigorous maintenance, this reduces our energy consumption by up to 50%."
    },
    {
        title: "SMART WASTE MANAGEMENT",
        description: "We are committed to a zero-waste philosophy. We recycle 100% of the water used in our anodization facility and capture chemical waste from spray lines to be repurposed as fuel. Additionally, all organic waste is composted and used as fertilizer for our factory grounds."
    },
    {
        title: "AUTOMATION & CARBON REDUCTION",
        description: "Our use of highly automated equipment improves efficiency and reduces human error (scrap). This technology also allows us to operate with a leaner workforce, which significantly lowers our carbon footprint—cutting an estimated 330 metric tons of CO2 per year simply by reducing daily commuting emissions."
    }
];

export function HomeClient({ heroImageUrl }: HomeClientProps) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, -100]);
  
  const heroTextContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const heroTextItem = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };


  return (
    <main className="flex-grow">
        <section className="relative flex items-center justify-center h-[90vh] bg-black text-white overflow-hidden">
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
            <motion.div 
                className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-left"
                variants={heroTextContainer}
                initial="hidden"
                animate="show"
            >
                <motion.h2 variants={heroTextItem} className="text-lg md:text-2xl font-semibold tracking-wide uppercase text-primary-foreground/80 mb-2">Packaging of the Future</motion.h2>
                <motion.h1 variants={heroTextItem} className="text-4xl md:text-7xl font-extrabold tracking-tight">Beautiful, Smart, Sustainable</motion.h1>
                <motion.p variants={heroTextItem} className="mt-4 text-lg max-w-2xl">
                Combining manufacturing precision with circular economy principles for a global cosmetics brand
                </motion.p>
                <motion.div variants={heroTextItem} className="mt-8 flex gap-4">
                <Button asChild size="lg">
                    <Link href="/green-plan">
                    Our Green Plan
                    </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                    <Link href="#join-journey">
                    Join The Journey <ArrowRight className="ml-2" />
                    </Link>
                </Button>
                </motion.div>
            </motion.div>
        </section>

        <section className="bg-primary text-primary-foreground py-16 md:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto text-center mb-12">
                    <p className="text-sm font-bold uppercase tracking-wider text-primary-foreground/80 mb-2">Our Impact</p>
                    <h2 className="text-3xl lg:text-4xl font-bold">{staticImpactData.title}</h2>
                    <p className="mt-4 text-primary-foreground/80 max-w-3xl mx-auto">{staticImpactData.description}</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 justify-center">
                    {staticImpactData.metrics.map((metric, index) => (
                        <div key={index} className="flex flex-col items-center text-center p-2">
                            <CircularCounter
                                to={metric.value}
                                suffix={metric.suffix}
                                iconName={metric.iconName as any}
                            />
                            <p className="mt-4 text-lg font-bold text-primary-foreground">
                                {metric.value}{metric.suffix || ''} {metric.unit}
                            </p>
                            <p className="mt-1 text-sm text-primary-foreground/80">{metric.label}</p>
                             {metric.description && <p className="text-xs text-primary-foreground/60">{metric.description}</p>}
                        </div>
                    ))}
                </div>
            </div>
        </section>

        <AnimatedSection className="relative bg-background">
          <div className="grid md:grid-cols-2 gap-0 items-center">
              <div className="text-left p-8 md:p-12 lg:p-16">
                 <div className="max-w-md mx-auto space-y-10">
                    {featureSections.map((section, index) => (
                        <div key={index}>
                            <h3 className="text-2xl font-bold text-foreground mb-3">
                                <span className="text-primary text-4xl font-extrabold mr-2">{index + 1}.</span>
                                {section.title}
                            </h3>
                            <p className="text-base text-muted-foreground ml-10">
                                {section.description}
                            </p>
                        </div>
                    ))}
                 </div>
              </div>
              <div className="relative aspect-square md:aspect-auto md:h-full group overflow-hidden">
                 <Image
                    src="https://images.pexels.com/photos/3214533/pexels-photo-3214533.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    alt="Grassy hills"
                    fill
                    className="object-cover"
                    data-ai-hint="grassy hills"
                  />
              </div>
          </div>
        </AnimatedSection>
    </main>
  );
}
