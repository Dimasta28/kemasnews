
'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Factory, Leaf, Recycle, ShieldCheck, Waves, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AnimatedSection } from '@/components/animated-section';
import { useAuth } from '@/hooks/use-auth';
import { ImageEditDialog } from '@/components/image-edit-dialog';
import { getFrontendSettings, type FrontendSettings } from '@/services/settingsService';
import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CardFooter } from '@/components/ui/card';

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

const limexMetrics = [
    { indicator: "Plastic Reduction", impact: "Up to 46%" },
    { indicator: "CO₂ Reduction (Total LCA)", impact: "36%" },
    { indicator: "Upstream Carbon Emissions", impact: "1/50 vs. Petrochemicals" },
]

const caseStudyMetrics = [
    { indicator: 'Safer Materials', impact: 'Proactively substitute hazardous chemicals with safer alternatives.' },
    { indicator: 'Optimized Processes', impact: 'Fine-tune production to improve material efficiency and drastically reduce waste.' },
    { indicator: 'Enhanced Durability', impact: 'Create longer-lasting products, reducing post-consumer waste.' },
];


const slideInLeft = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } }
};

const slideInRight = {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } }
};


export function GreenFootprintClient() {
  const { user } = useAuth();
  const [settings, setSettings] = useState<FrontendSettings | null>(null);

  useEffect(() => {
    getFrontendSettings().then(setSettings);
  }, []);
  
  if (!settings) {
    // You can return a loading skeleton here if desired
    return null;
  }

  const plantFootprintItems = [
    {
        icon: Waves,
        title: 'Water is Life, So We Recycle It All',
        description: 'In our Metal Anodizing facility, not a single drop of water is wasted. Our advanced closed-loop system recycles 100% of the water we use, preserving this precious resource and setting a new industry benchmark.',
        imageUrl: settings.greenFootprintWaterImageUrl,
        imageHint: 'water treatment facility',
        settingKey: 'greenFootprintWaterImageUrl',
    },
    {
        icon: Zap,
        title: 'Engineering for Efficiency',
        description: 'We believe smart design is sustainable design. By insulating our machinery barrels and optimizing hydraulics, we save up to 20% on energy and slash cooling requirements by 50%—proving that operational excellence and environmental care go hand-in-hand.',
        imageUrl: settings.greenFootprintEnergyImageUrl,
        imageHint: 'modern factory machine',
        settingKey: 'greenFootprintEnergyImageUrl',
    },
    {
        icon: Recycle,
        title: 'A New Life for Every Byproduct',
        description: 'For us, "waste" is just a resource in the wrong place. We transform lacquer residue into fuel for other industries and compost all organic matter to nourish the green spaces around our factories, creating a truly circular workflow.',
        imageUrl: settings.greenFootprintWasteImageUrl,
        imageHint: 'compost pile',
        settingKey: 'greenFootprintWasteImageUrl',
    }
  ];

  return (
    <main className="flex-grow">
      {/* Hero Section */}
      <AnimatedSection className="relative bg-primary text-primary-foreground py-20 md:py-32 text-center overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] [mask-image:linear-gradient(to_bottom,white_50%,transparent_100%)]"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div variants={staggerContainer} initial="hidden" animate="visible">
            <motion.h1 variants={fadeIn} className="text-4xl md:text-6xl font-extrabold tracking-tight">The Kemas Green Footprint</motion.h1>
            <motion.p variants={fadeIn} className="mt-4 max-w-3xl mx-auto text-lg md:text-xl text-primary-foreground/80">
                A Story of Innovation, Responsibility, and Measurable Impact.
            </motion.p>
          </motion.div>
        </div>
      </AnimatedSection>
      
      {/* Intro Section */}
       <AnimatedSection className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
                 <p className="text-lg text-muted-foreground">
                    At PT Kemas Indah Maju, "sustainability" is not a buzzword—it is our operational blueprint. It's a journey woven into four decades of manufacturing excellence. This is the story of our green footprint, a testament to our belief that true luxury is responsible, and that the best innovation serves both brands and the planet.
                </p>
            </div>
        </div>
      </AnimatedSection>
      
      {/* Material Innovation */}
      <AnimatedSection className="bg-muted/50 py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-primary">Innovation in Every Granule</h2>
                <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">Our quest for a better future begins with the very materials we use. We go beyond compliance, pioneering solutions that redefine what's possible in sustainable packaging.</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
                <Card className="overflow-hidden shadow-lg transition-shadow hover:shadow-xl flex flex-col">
                    <div className="relative h-64 md:h-80 w-full">
                        {user && (
                            <ImageEditDialog
                                settingKey="greenFootprintLimexImageUrl"
                                currentImageUrl={settings.greenFootprintLimexImageUrl}
                                triggerClassName="absolute top-2 right-2 z-20 h-8 w-8 rounded-full"
                            />
                        )}
                        <Image src={settings.greenFootprintLimexImageUrl} alt="LIMEX Material" fill className="object-cover" data-ai-hint="limestone cosmetic" />
                    </div>
                    <CardHeader className="flex-grow">
                        <Badge variant="secondary" className="mb-2 bg-primary/10 text-primary w-fit">Flagship Innovation</Badge>
                        <h3 className="text-2xl font-bold text-primary">LIMEX: Earth's Oldest Material, Reimagined</h3>
                        <p className="mt-4 text-muted-foreground">We looked to the earth itself for a solution. By combining limestone with a minimal binding agent, we created LIMEX—a revolutionary material that drastically reduces petroleum use while delivering the weight and cool touch of true luxury.</p>
                    </CardHeader>
                    <CardContent className="flex-grow">
                         <div className="mt-6">
                            <h4 className="font-semibold mb-2">The LIMEX Difference</h4>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                    <TableHead>Indicator</TableHead>
                                    <TableHead className="text-right">Impact</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {limexMetrics.map(metric => (
                                        <TableRow key={metric.indicator}>
                                            <TableCell>{metric.indicator}</TableCell>
                                            <TableCell className="text-right font-medium">{metric.impact}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                         </div>
                    </CardContent>
                    <CardFooter>
                      <p className="text-xs text-muted-foreground">Its greatest power lies in reducing Scope 3 (upstream) emissions—the most challenging piece of the decarbonization puzzle for global brands.</p>
                    </CardFooter>
                </Card>

                <Card className="overflow-hidden shadow-lg transition-shadow hover:shadow-xl flex flex-col">
                     <div className="relative h-64 md:h-80 w-full">
                        {user && (
                            <ImageEditDialog
                                settingKey="greenFootprintRecycledImageUrl"
                                currentImageUrl={settings.greenFootprintRecycledImageUrl}
                                triggerClassName="absolute top-2 right-2 z-20 h-8 w-8 rounded-full"
                            />
                        )}
                        <Image src={settings.greenFootprintRecycledImageUrl} alt="Cosmetic Puffs" fill className="object-cover" data-ai-hint="cosmetic puff" />
                    </div>
                     <CardHeader className="flex-grow">
                        <Badge variant="secondary" className="mb-2 bg-primary/10 text-primary w-fit">Case Study</Badge>
                        <h3 className="text-2xl font-bold text-primary">The Everyday Accessory, Re-engineered</h3>
                        <p className="mt-2 text-muted-foreground">Our journey doesn't stop at primary packaging. We applied the same rigor to the NBR cosmetic puff, an item used by millions daily, to prove that even small accessories can make a big impact.</p>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        <div className="mt-6">
                            <h4 className="font-semibold mb-2">The NBR Puff Case Study</h4>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Area of Impact</TableHead>
                                        <TableHead>Our Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {caseStudyMetrics.map(metric => (
                                        <TableRow key={metric.indicator}>
                                            <TableCell>{metric.indicator}</TableCell>
                                            <TableCell>{metric.impact}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                    <CardFooter>
                      <p className="text-xs text-muted-foreground">This case study demonstrates that sustainability can be applied to every component, no matter how small.</p>
                    </CardFooter>
                </Card>
            </div>
        </div>
      </AnimatedSection>

      {/* Operational Efficiency */}
       <AnimatedSection className="py-16 md:py-24 bg-background overflow-hidden">
         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-primary">Inside Our Smarter Factories</h2>
                 <p className="mt-2 text-muted-foreground max-w-3xl mx-auto">
                    A green product is born from a green process. Our ISO 14001-certified facilities are living labs of efficiency, where every watt of power and drop of water is accounted for. This isn't just about saving resources; it's about building a smarter, more resilient manufacturing ecosystem.
                </p>
            </div>
            <div className="space-y-20">
                {plantFootprintItems.map((item, index) => (
                    <motion.div 
                        key={item.title} 
                        className="grid md:grid-cols-2 gap-8 md:gap-12 items-center"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={index % 2 === 0 ? slideInLeft : slideInRight}
                    >
                        <div className={`relative aspect-video rounded-lg overflow-hidden shadow-lg ${index % 2 === 1 ? 'md:order-last' : ''}`}>
                            {user && (
                                <ImageEditDialog
                                    settingKey={item.settingKey as keyof FrontendSettings}
                                    currentImageUrl={item.imageUrl}
                                    triggerClassName="absolute top-2 right-2 z-20 h-8 w-8 rounded-full"
                                />
                            )}
                            <Image src={item.imageUrl} alt={item.title} fill className="object-cover" data-ai-hint={item.imageHint}/>
                        </div>
                        <div className="space-y-4">
                           <div className="inline-flex items-center gap-3">
                                <div className="p-3 bg-primary text-primary-foreground rounded-full">
                                    <item.icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-2xl font-bold text-foreground">{item.title}</h3>
                           </div>
                            <p className="text-muted-foreground text-lg">{item.description}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
         </div>
       </AnimatedSection>
      
       {/* Call to Action */}
       <AnimatedSection className="py-16 md:py-24 text-center bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold">The Journey Continues.</h2>
            <p className="mt-4 max-w-3xl mx-auto text-primary-foreground/80">
              Our green footprint is not a destination, but a path we walk every day. With every innovation and process improvement, we empower our partners to make a real difference—without ever compromising on the quality and luxury their customers expect.
            </p>
          </div>
       </AnimatedSection>

    </main>
  );
}
