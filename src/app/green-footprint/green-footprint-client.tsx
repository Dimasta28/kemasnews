
'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Award, Factory, Leaf, Recycle, ShieldCheck, Waves, Zap, Package, ExternalLink, Globe, Users, CheckCircle, Target, Pencil, Wind, Droplets, BatteryCharging } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AnimatedSection } from '@/components/animated-section';
import { SpotlightCard } from '@/components/ui/spotlight-card';
import { useAuth } from '@/hooks/use-auth';
import { ImageEditDialog } from '@/components/image-edit-dialog';
import { getFrontendSettings, type FrontendSettings } from '@/services/settingsService';
import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';


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

const caseStudyPoints = [
    {
        title: 'Safer Materials',
        description: 'We proactively substitute hazardous chemicals with safer alternatives, ensuring consumer safety.',
        icon: ShieldCheck
    },
    {
        title: 'Optimized Processes',
        description: 'We fine-tune production to improve material efficiency and drastically reduce waste.',
        icon: Factory
    },
    {
        title: 'Enhanced Durability',
        description: 'We create longer-lasting products, reducing replacement frequency and post-consumer waste.',
        icon: Recycle
    }
];


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
        title: '100% Water Recycling',
        description: 'Our Metal Anodizing facility uses a closed-loop system, recycling and reusing 100% of its water.',
        imageUrl: settings.greenFootprintWaterImageUrl,
        imageHint: 'water treatment facility',
        settingKey: 'greenFootprintWaterImageUrl',
    },
    {
        icon: Zap,
        title: 'Smart Energy Efficiency',
        description: 'Insulated barrels and optimized hydraulics save up to 20% energy and reduce cooling needs by 50%.',
        imageUrl: settings.greenFootprintEnergyImageUrl,
        imageHint: 'modern factory machine',
        settingKey: 'greenFootprintEnergyImageUrl',
    },
    {
        icon: Recycle,
        title: 'Circular Waste Management',
        description: 'Lacquer waste is repurposed into fuel, and organic waste is composted for our factory grounds.',
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
            <motion.h1 variants={fadeIn} className="text-4xl md:text-6xl font-extrabold tracking-tight">Our Green Footprint</motion.h1>
            <motion.p variants={fadeIn} className="mt-4 max-w-3xl mx-auto text-lg md:text-xl text-primary-foreground/80">
                From Material Innovation to Global ESG Leadership.
            </motion.p>
          </motion.div>
        </div>
      </AnimatedSection>
      
      {/* Intro Section */}
       <AnimatedSection className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
                 <p className="text-lg text-muted-foreground">
                    At PT Kemas Indah Maju, sustainability isn't just a goal—it's our operational blueprint. We build a measurable green footprint through disciplined governance, science-based material innovation, and a long-term commitment to operational excellence. This is more than a report; it's a reference for partners who see sustainability as a standard, not a slogan.
                </p>
            </div>
        </div>
      </AnimatedSection>
      
      {/* Material Innovation */}
      <AnimatedSection className="bg-background py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-primary">Innovation in Every Granule</h2>
                <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">Our sustainable solutions portfolio is where science meets responsibility. We offer PCR & PIR, PLA (bio-polymers), mono-material design, and our flagship limestone-based innovation: LIMEX.</p>
            </div>

            <Card className="overflow-hidden shadow-lg transition-shadow hover:shadow-xl max-w-5xl mx-auto">
                <div className="grid md:grid-cols-2 items-center">
                    <div className="relative h-80 md:h-full">
                        {user && (
                            <ImageEditDialog
                                settingKey="greenFootprintLimexImageUrl"
                                currentImageUrl={settings.greenFootprintLimexImageUrl}
                                triggerClassName="absolute top-2 right-2 z-20 h-8 w-8 rounded-full"
                            />
                        )}
                        <Image src={settings.greenFootprintLimexImageUrl} alt="LIMEX Material" fill className="object-cover" data-ai-hint="limestone cosmetic" />
                    </div>
                    <div className="p-6 md:p-8">
                        <Badge variant="secondary" className="mb-2 bg-primary/10 text-primary">Flagship Innovation</Badge>
                        <h3 className="text-2xl font-bold">LIMEX: Redefining Luxury Packaging</h3>
                        <p className="mt-4 text-muted-foreground">Containing over 50% limestone, LIMEX directly replaces petroleum-based plastics while offering the luxurious, heavy feel sought by premium brands. It's not just a material; it's a statement.</p>
                         <div className="mt-6">
                            <h4 className="font-semibold mb-2">Key LIMEX Metrics</h4>
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
                            <p className="text-xs text-muted-foreground mt-2">LIMEX's greatest advantage lies in **Scope 3 (upstream)**—the most critical area for global brands in their decarbonization targets.</p>
                         </div>
                    </div>
                </div>
            </Card>

             <div className="max-w-5xl mx-auto mt-16 md:mt-24">
                <Card className="overflow-hidden">
                    <div className="grid md:grid-cols-2 items-center">
                         <div className="p-6 md:p-8">
                            <h3 className="text-2xl font-bold text-primary">Case Study: The Sustainable NBR Cosmetic Puff</h3>
                            <p className="mt-2 text-muted-foreground">Our commitment extends beyond primary packaging to the accessories your customers use every day.</p>
                            <div className="mt-6 space-y-4">
                                {caseStudyPoints.map((point) => (
                                    <div key={point.title} className="flex items-start gap-4">
                                        <div className="p-2 bg-primary/10 text-primary rounded-full">
                                            <point.icon className="w-5 h-5"/>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-foreground">{point.title}</h4>
                                            <p className="text-sm text-muted-foreground">{point.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="relative h-64 md:h-full min-h-[300px]">
                            {user && (
                                <ImageEditDialog
                                    settingKey="greenFootprintRecycledImageUrl"
                                    currentImageUrl={settings.greenFootprintRecycledImageUrl}
                                    triggerClassName="absolute top-2 right-2 z-20 h-8 w-8 rounded-full"
                                />
                            )}
                            <Image src={settings.greenFootprintRecycledImageUrl} alt="Cosmetic Puffs" fill className="object-cover" data-ai-hint="cosmetic puff" />
                        </div>
                    </div>
                </Card>
             </div>
        </div>
      </AnimatedSection>

      {/* Operational Efficiency */}
       <AnimatedSection className="py-16 md:py-24 bg-muted/50">
         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-primary">Smarter Factories, Greener Products</h2>
                 <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
                    Our modern facilities are ecosystems of efficiency. Aligned with ISO 14001, we design every process to minimize energy use and eliminate waste.
                </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
                {plantFootprintItems.map((item, index) => (
                    <SpotlightCard key={index} className="overflow-hidden">
                        <div className="relative aspect-video">
                            {user && (
                                <ImageEditDialog
                                    settingKey={item.settingKey}
                                    currentImageUrl={item.imageUrl}
                                    triggerClassName="absolute top-2 right-2 z-20 h-8 w-8 rounded-full"
                                />
                            )}
                            <Image src={item.imageUrl} alt={item.title} fill className="object-cover" data-ai-hint={item.imageHint}/>
                        </div>
                         <div className="p-6">
                            <div className="relative">
                               <div className="relative z-10 flex items-center justify-center -mt-12">
                                 <div className="bg-primary text-primary-foreground rounded-full p-3 border-4 border-background">
                                     <item.icon className="w-7 h-7" />
                                 </div>
                               </div>
                            </div>
                           
                            <h3 className="text-lg font-bold text-center mt-4">{item.title}</h3>
                            <p className="mt-2 text-sm text-muted-foreground text-center">{item.description}</p>
                        </div>
                    </SpotlightCard>
                ))}
            </div>
         </div>
       </AnimatedSection>
      
       {/* Call to Action */}
       <AnimatedSection className="py-16 md:py-24 text-center bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold">Greener, Still Luxurious, and Future-Ready.</h2>
            <p className="mt-4 max-w-3xl mx-auto text-primary-foreground/80">
              With measurable metrics, global certifications, and premium market adoption, we empower brands to reduce their environmental impact without sacrificing quality or aesthetics.
            </p>
          </div>
       </AnimatedSection>

    </main>
  );
}
