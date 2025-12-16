
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Award, Factory, Leaf, Recycle, ShieldCheck, Waves, Zap, Package, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AnimatedSection } from '@/components/animated-section';

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
            <h2 className="text-3xl font-bold text-primary">I. Sustainability Commitment & Governance</h2>
            <p className="mt-2 text-muted-foreground">Our strong sustainability foundation, validated by international recognition.</p>
          </div>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div variants={fadeIn}>
              <Card className="h-full text-center">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                     <div className="bg-primary/10 p-3 rounded-full">
                        <ShieldCheck className="h-8 w-8 text-primary" />
                     </div>
                  </div>
                  <CardTitle>System Certifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">KEMASPKG holds ISO 14001 certification for Environmental Management Systems and SA 8000 for social accountability.</p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div variants={fadeIn}>
              <Card className="h-full text-center">
                <CardHeader>
                   <div className="flex justify-center mb-4">
                     <div className="bg-primary/10 p-3 rounded-full">
                        <Award className="h-8 w-8 text-primary" />
                     </div>
                  </div>
                  <CardTitle>EcoVadis Silver Medal</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Placing us in the Top 15% of global companies, demonstrating our structured sustainability management system.</p>
                   <div className="text-xs mt-4 space-y-2">
                        <Link href="https://support.ecovadis.com/hc/en-us/articles/210460227-Understanding-EcoVadis-Medals-and-Badges" target="_blank" className="flex items-center justify-center text-muted-foreground hover:text-primary">
                            <ExternalLink className="mr-1 h-3 w-3" /> Understanding EcoVadis Medals
                        </Link>
                         <Link href="https://ecovadis.com/blog/ecovadis-medals-and-badges-2" target="_blank" className="flex items-center justify-center text-muted-foreground hover:text-primary">
                            <ExternalLink className="mr-1 h-3 w-3" /> Recognizing Achievements
                        </Link>
                   </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </AnimatedSection>
      
      {/* Operational Footprint Section */}
      <AnimatedSection className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary">II. Plant Green Footprint</h2>
            <p className="mt-2 text-muted-foreground">Reducing our direct environmental impact through advanced technology and practices.</p>
          </div>
           <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="grid md:grid-cols-3 gap-8">
                <motion.div variants={fadeIn}>
                    <Card className="h-full">
                        <CardHeader>
                            <Waves className="h-8 w-8 text-primary mb-2" />
                            <CardTitle>100% Water Recycling</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">Our Metal Anodizing facility implements a closed-loop system, successfully recycling, filtering, and reusing 100% of the water required.</p>
                        </CardContent>
                    </Card>
                </motion.div>
                <motion.div variants={fadeIn}>
                    <Card className="h-full">
                        <CardHeader>
                            <Zap className="h-8 w-8 text-primary mb-2" />
                            <CardTitle>Smart Energy Efficiency</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">Insulated barrels and optimized hydraulic systems can yield energy savings of up to 20% and reduce cooling requirements by up to 50%.</p>
                        </CardContent>
                    </Card>
                </motion.div>
                 <motion.div variants={fadeIn}>
                    <Card className="h-full">
                        <CardHeader>
                            <Recycle className="h-8 w-8 text-primary mb-2" />
                            <CardTitle>Circular Waste Management</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">Lacquer waste is recycled into fuel by third parties, and organic waste is composted for fertilizer in the factory area.</p>
                        </CardContent>
                    </Card>
                </motion.div>
          </motion.div>
        </div>
      </AnimatedSection>
      
      {/* Packaging Innovation Section */}
      <AnimatedSection className="bg-muted/50 py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-primary">III. Packaging Green Footprint</h2>
                <p className="mt-2 text-muted-foreground">Offering alternatives to reduce dependency on petroleum-based plastics.</p>
            </div>

            <div className="space-y-12">
                {/* LIMEX Section */}
                <Card className="overflow-hidden">
                    <div className="grid md:grid-cols-2 items-center">
                        <div className="p-6 md:p-8">
                            <Badge variant="secondary" className="mb-2">Pioneer in Asia</Badge>
                            <h3 className="text-2xl font-bold">1. LIMEX (Limestone-Based Material)</h3>
                            <p className="mt-4 text-muted-foreground">An innovative material composed of 60% limestone, significantly reducing plastic use and CO2 emissions. We launched the first cosmetic product in Asia with packaging made entirely from LIMEX.</p>
                        </div>
                        <div className="relative h-64 md:h-full">
                            <Image src="https://picsum.photos/seed/limex/800/600" alt="LIMEX Material" fill className="object-cover" data-ai-hint="limestone cosmetic" />
                        </div>
                    </div>
                </Card>

                {/* Recycled & Bio-based Section */}
                <Card className="overflow-hidden">
                     <div className="grid md:grid-cols-2 items-center">
                         <div className="relative h-64 md:h-full md:order-last">
                            <Image src="https://picsum.photos/seed/recycled/800/600" alt="Recycled Materials" fill className="object-cover" data-ai-hint="recycled plastic" />
                        </div>
                        <div className="p-6 md:p-8">
                            <h3 className="text-2xl font-bold">2. Recycled Content & Bio-Based Alternatives</h3>
                            <ul className="mt-4 space-y-3 text-muted-foreground">
                                <li className="flex gap-3"><Package className="h-5 w-5 text-primary flex-shrink-0 mt-1" /><span><strong className="text-foreground">PIR & PCR:</strong> Developing mold compatibility with up to 50% PCR (Post-Consumer Recycled) content and using PIR (Post-Industrial Recycled) for metal components.</span></li>
                                <li className="flex gap-3"><Leaf className="h-5 w-5 text-primary flex-shrink-0 mt-1" /><span><strong className="text-foreground">Mono-Material Design:</strong> Facilitating recycling by using a single type of recycled resin (e.g., PET Crystal One).</span></li>
                                <li className="flex gap-3"><Recycle className="h-5 w-5 text-primary flex-shrink-0 mt-1" /><span><strong className="text-foreground">Bio-Based Materials:</strong> Our portfolio includes bio-based alternatives like PBS (biodegradable and compostable) and Ecozen (bio-based, recyclable, and BPA-free).</span></li>
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
