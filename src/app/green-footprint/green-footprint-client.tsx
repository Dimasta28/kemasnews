
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Award, Factory, Leaf, Recycle, ShieldCheck, Waves, Zap, Package, ExternalLink, Globe, Users, CheckCircle, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AnimatedSection } from '@/components/animated-section';
import { SpotlightCard } from '@/components/ui/spotlight-card';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const governanceItems = [
    {
        icon: ShieldCheck,
        title: 'System Certifications',
        description: 'KEMASPKG holds ISO 14001 for Environmental Management and SA 8000 for social accountability.',
    },
    {
        icon: Award,
        title: 'EcoVadis Silver Medal',
        description: 'Placing us in the Top 15% of global companies, validating our structured sustainability approach.',
    }
];

const plantFootprintItems = [
    {
        icon: Waves,
        title: '100% Water Recycling',
        description: 'Our Metal Anodizing facility uses a closed-loop system, recycling and reusing 100% of its water.',
        imageUrl: 'https://picsum.photos/seed/water-recycling/800/600',
        imageHint: 'water treatment facility'
    },
    {
        icon: Zap,
        title: 'Smart Energy Efficiency',
        description: 'Insulated barrels and optimized hydraulics save up to 20% energy and reduce cooling needs by 50%.',
        imageUrl: 'https://picsum.photos/seed/energy-efficiency/800/600',
        imageHint: 'modern factory machine'
    },
    {
        icon: Recycle,
        title: 'Circular Waste Management',
        description: 'Lacquer waste is repurposed into fuel, and organic waste is composted for our factory grounds.',
        imageUrl: 'https://picsum.photos/seed/waste-management/800/600',
        imageHint: 'compost pile'
    }
];

export function GreenFootprintClient() {
  return (
    <main className="flex-grow">
      {/* Hero Section */}
      <AnimatedSection className="relative bg-primary text-primary-foreground py-20 md:py-32 text-center overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] [mask-image:linear-gradient(to_bottom,white_50%,transparent_100%)]"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div variants={staggerContainer} initial="hidden" animate="visible">
            <motion.h1 variants={fadeIn} className="text-4xl md:text-6xl font-extrabold tracking-tight">KEMASPKG's Green Footprint</motion.h1>
            <motion.p variants={fadeIn} className="mt-4 max-w-3xl mx-auto text-lg md:text-xl text-primary-foreground/80">
              Sustainable Innovation in Cosmetic Packaging
            </motion.p>
          </motion.div>
        </div>
      </AnimatedSection>
      
      {/* Intro Section */}
       <AnimatedSection className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
                 <p className="text-lg text-muted-foreground">
                    As Indonesia's leading integrated cosmetic packaging manufacturer since 1979, PT Kemas Indah Maju (KEMASPKG) is determined to lead the industry toward a more responsible future. We align our strengths in innovation and technology with a commitment to "improving mother earth's health" and reducing carbon emissions, in line with global environmental protocols.
                </p>
            </div>
        </div>
      </AnimatedSection>


      {/* Sustainability Commitment Section */}
      <AnimatedSection className="bg-muted/50 py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary">Sustainability Commitment & Governance</h2>
            <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">Our strong sustainability foundation, validated by international recognition and a robust management system.</p>
          </div>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {governanceItems.map((item, index) => (
                 <motion.div key={index} variants={fadeIn}>
                    <Card className="h-full text-center hover:shadow-lg transition-shadow">
                        <CardHeader>
                        <div className="flex justify-center mb-4">
                            <div className="bg-primary/10 p-3 rounded-full">
                                <item.icon className="h-8 w-8 text-primary" />
                            </div>
                        </div>
                        <CardTitle>{item.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">{item.description}</p>
                            {item.title === 'EcoVadis Silver Medal' && (
                                <div className="text-xs mt-4">
                                    <Link href="https://support.ecovadis.com/hc/en-us/articles/210460227-Understanding-EcoVadis-Medals-and-Badges" target="_blank" className="flex items-center justify-center text-muted-foreground hover:text-primary">
                                        <ExternalLink className="mr-1 h-3 w-3" /> Learn about EcoVadis Medals
                                    </Link>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </motion.div>
            ))}
          </motion.div>
        </div>
      </AnimatedSection>
      
      {/* Operational Footprint Section */}
      <AnimatedSection className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary">Our Plant's Green Footprint</h2>
            <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">Reducing our direct environmental impact through advanced technology and resource management.</p>
          </div>
           <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="grid md:grid-cols-3 gap-8">
                {plantFootprintItems.map((item, index) => (
                    <motion.div key={index} variants={fadeIn}>
                        <SpotlightCard className="h-full overflow-hidden">
                             <div className="relative aspect-video">
                                <Image 
                                    src={item.imageUrl}
                                    alt={item.title}
                                    fill
                                    className="object-cover"
                                    data-ai-hint={item.imageHint}
                                />
                            </div>
                            <div className="p-6 text-center">
                                <div className="flex justify-center -mt-12">
                                     <div className="bg-primary text-primary-foreground p-3 rounded-full ring-4 ring-background">
                                        <item.icon className="h-7 w-7" />
                                    </div>
                                </div>
                                <h3 className="mt-4 text-xl font-bold">{item.title}</h3>
                                <p className="text-muted-foreground mt-2">{item.description}</p>
                            </div>
                        </SpotlightCard>
                    </motion.div>
                ))}
          </motion.div>
        </div>
      </AnimatedSection>
      
      {/* Packaging Innovation Section */}
      <AnimatedSection className="bg-muted/50 py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-primary">Packaging's Green Footprint</h2>
                <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">Offering innovative material alternatives to reduce dependency on petroleum-based plastics and support a circular economy.</p>
            </div>

            <div className="space-y-12">
                {/* LIMEX Section */}
                <Card className="overflow-hidden shadow-sm transition-shadow hover:shadow-xl">
                    <div className="grid md:grid-cols-2 items-center">
                        <div className="p-6 md:p-8">
                            <Badge variant="secondary" className="mb-2 bg-primary/10 text-primary">Pioneer in Asia</Badge>
                            <h3 className="text-2xl font-bold">1. LIMEX (Limestone-Based Material)</h3>
                            <p className="mt-4 text-muted-foreground">An innovative material composed of up to 80% limestone, significantly reducing plastic use and CO2 emissions. We launched the first cosmetic product in Asia with packaging made entirely from LIMEX.</p>
                        </div>
                        <div className="relative h-64 md:h-full">
                            <Image src="https://picsum.photos/seed/limex/800/600" alt="LIMEX Material" fill className="object-cover" data-ai-hint="limestone cosmetic" />
                        </div>
                    </div>
                </Card>

                {/* Recycled & Bio-based Section */}
                <Card className="overflow-hidden shadow-sm transition-shadow hover:shadow-xl">
                     <div className="grid md:grid-cols-2 items-center">
                         <div className="relative h-64 md:h-full md:order-last">
                            <Image src="https://picsum.photos/seed/recycled/800/600" alt="Recycled Materials" fill className="object-cover" data-ai-hint="recycled plastic" />
                        </div>
                        <div className="p-6 md:p-8">
                            <h3 className="text-2xl font-bold">2. Recycled Content & Bio-Based Alternatives</h3>
                            <ul className="mt-4 space-y-4 text-muted-foreground">
                                <li className="flex gap-4"><Package className="h-5 w-5 text-primary flex-shrink-0 mt-1" /><span><strong className="text-foreground">PIR & PCR:</strong> Developing mold compatibility with up to 50% PCR (Post-Consumer Recycled) content and using PIR (Post-Industrial Recycled) for metal components.</span></li>
                                <li className="flex gap-4"><Recycle className="h-5 w-5 text-primary flex-shrink-0 mt-1" /><span><strong className="text-foreground">Mono-Material Design:</strong> Facilitating easier recycling by using a single type of recycled resin (e.g., PET Crystal One) in our designs.</span></li>
                                <li className="flex gap-4"><Leaf className="h-5 w-5 text-primary flex-shrink-0 mt-1" /><span><strong className="text-foreground">Bio-Based Materials:</strong> Our portfolio includes bio-based alternatives like PBS (biodegradable and compostable) and Ecozen (bio-based, recyclable, and BPA-free).</span></li>
                            </ul>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
      </AnimatedSection>
      
       {/* Call to Action */}
       <AnimatedSection className="py-16 md:py-24 text-center bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold">KEMASPKG: Your Partner in Creating Responsible Beauty</h2>
            <p className="mt-4 max-w-2xl mx-auto text-primary-foreground/80">
              Let's build a greener future for the beauty industry together.
            </p>
          </div>
       </AnimatedSection>

    </main>
  );
}
