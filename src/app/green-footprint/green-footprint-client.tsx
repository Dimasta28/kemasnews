
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

const certifications = [
    {
        name: 'ISO 14001',
        description: 'Comprehensive Environmental Management System across all production processes.',
        icon: Globe
    },
    {
        name: 'ISCC',
        description: 'Validation of sustainable, low-carbon resources.',
        icon: CheckCircle
    },
    {
        name: 'ISO 9001, ISO 22716, C-GMP',
        description: 'Global-standard quality & cosmetic GMP.',
        icon: Award
    },
    {
        name: 'SA8000 & Sedex',
        description: 'Work ethics, safety, and supply chain transparency.',
        icon: Users
    }
];

const limexMetrics = [
    { indicator: "Plastic Reduction", impact: "Up to 46%" },
    { indicator: "CO₂ Reduction (Total LCA)", impact: "36%" },
    { indicator: "Upstream Carbon Emissions", impact: "1/50 vs. Petrochemicals" },
]


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
            <motion.h1 variants={fadeIn} className="text-4xl md:text-6xl font-extrabold tracking-tight">Green Footprint</motion.h1>
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
                    PT Kemas Indah Maju (KEMASPKG) builds a measurable green footprint through disciplined governance, science-based material innovation, and long-term operational commitment. This page is designed as a professional reference for global partners and brands that treat sustainability as a standard, not a slogan.
                </p>
            </div>
        </div>
      </AnimatedSection>


      {/* Executive Summary */}
      <AnimatedSection className="bg-muted/50 py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary">Executive Summary</h2>
            <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
                As a health and beauty packaging manufacturer serving 100+ global brands, KEMASPKG integrates sustainability into its core strategy through the <strong className="text-foreground">STEP-UP principle.</strong>
            </p>
          </div>
          <div className="max-w-5xl mx-auto text-center p-8 border-2 border-dashed border-primary/20 rounded-lg bg-background">
            <h3 className="font-bold text-primary text-2xl tracking-widest">S.T.E.P. - U.P.</h3>
            <p className="text-muted-foreground mt-2">Technology Innovation, Social Responsibility, Positive Corporate Culture, Utilization of Resources, and Productivity Focus.</p>
             <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-8 text-left">
                <div className="flex items-start gap-3">
                    <Wind className="h-8 w-8 text-primary mt-1 flex-shrink-0" />
                    <div>
                        <p className="font-bold text-foreground">46% Plastic Reduction</p>
                        <p className="text-sm text-muted-foreground">via LIMEX material.</p>
                    </div>
                </div>
                <div className="flex items-start gap-3">
                    <Droplets className="h-8 w-8 text-primary mt-1 flex-shrink-0" />
                     <div>
                        <p className="font-bold text-foreground">36% CO₂ Emission Reduction</p>
                        <p className="text-sm text-muted-foreground">in total product life cycle.</p>
                    </div>
                </div>
                 <div className="flex items-start gap-3">
                    <BatteryCharging className="h-8 w-8 text-primary mt-1 flex-shrink-0" />
                     <div>
                        <p className="font-bold text-foreground">1/50 Upstream Carbon</p>
                        <p className="text-sm text-muted-foreground">compared to petrochemical materials.</p>
                    </div>
                </div>
             </div>
          </div>
        </div>
      </AnimatedSection>
      
      {/* Governance & Compliance */}
      <AnimatedSection className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                     <h2 className="text-3xl font-bold text-primary">Environmental Governance & Compliance</h2>
                    <p className="mt-4 text-muted-foreground">
                        The <strong className="text-foreground">KEMAS Green Journey</strong> is a sustainability umbrella initiative targeting emission reductions, decreased petrochemical dependency, and elevated manufacturing standards. The focus is clear: tangible impact from upstream to downstream.
                    </p>
                     <div className="mt-8 space-y-4">
                        {certifications.map((cert, index) => (
                             <div key={index} className="flex items-start gap-4">
                                <div className="p-2 bg-primary/10 rounded-full flex-shrink-0">
                                    <cert.icon className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-foreground">{cert.name}</h4>
                                    <p className="text-sm text-muted-foreground">{cert.description}</p>
                                </div>
                             </div>
                        ))}
                    </div>
                </div>
                <div className="space-y-6">
                    <Card className="bg-primary/5 border-primary/20 transition-all hover:shadow-lg hover:border-primary/30">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3"><Users className="h-6 w-6 text-primary" /> Social & Governance Pillar</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-muted-foreground">
                            <p><strong className="text-foreground">60% female workforce</strong> as a tangible commitment to gender empowerment.</p>
                            <p>Programs like <strong className="text-foreground">KEMAS Care & Caring</strong> and <strong className="text-foreground">KEMAS Replant Tree</strong> for local social & environmental impact.</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
      </AnimatedSection>
      
      {/* Material Innovation */}
      <AnimatedSection className="bg-muted/50 py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-primary">Material Innovation</h2>
                <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">Our sustainable solutions portfolio includes PCR & PIR, PLA (bio-polymers), mono-material design, and our flagship limestone-based innovation: LIMEX.</p>
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
                        <h3 className="text-2xl font-bold">LIMEX: Tangible Impact Reduction</h3>
                        <p className="mt-4 text-muted-foreground">LIMEX contains >50% limestone, replacing petroleum-based plastics. It is registered as an international sustainable technology and offers a *luxurious heavy feel* sought by premium brands.</p>
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
        </div>
      </AnimatedSection>

      {/* Operational Efficiency */}
       <AnimatedSection className="py-16 md:py-24">
         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-primary">Operational Efficiency & Non-Packaging Innovations</h2>
                 <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
                    Our modern facilities are designed for energy efficiency and emission minimization, in line with ISO 14001 and resource utilization principles.
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
             <Card className="max-w-3xl mx-auto mt-16">
                 <CardHeader>
                    <CardTitle>Case Study: NBR Cosmetic Puff</CardTitle>
                    <CardDescription>Our sustainability efforts extend beyond bottles—all the way to accessories.</CardDescription>
                 </CardHeader>
                 <CardContent>
                     <ul className="space-y-3 text-muted-foreground list-disc pl-5">
                        <li><strong className="text-foreground">Substitution of hazardous chemicals:</strong> Replacing risky components with safer alternatives.</li>
                        <li><strong className="text-foreground">Process optimization & raw material efficiency:</strong> Reducing waste during production.</li>
                        <li><strong className="text-foreground">More durable products:</strong> Creating longer-lasting products, thus reducing replacement frequency and consumer waste.</li>
                    </ul>
                 </CardContent>
             </Card>
         </div>
       </AnimatedSection>
      
       {/* Call to Action */}
       <AnimatedSection className="py-16 md:py-24 text-center bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold">Greener, still luxurious, and future-ready.</h2>
            <p className="mt-4 max-w-3xl mx-auto text-primary-foreground/80">
              With measurable metrics, global certifications, and premium market adoption, we help global brands reduce their environmental impact without sacrificing quality or aesthetics.
            </p>
          </div>
       </AnimatedSection>

    </main>
  );
}

    