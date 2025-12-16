
'use client';

import { motion } from 'framer-motion';
import { AnimatedSection } from '@/components/animated-section';
import { Award, CheckCircle, Globe, Users, Shield, Target } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

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
        name: 'EcoVadis Silver Medal',
        focus: 'Corporate Sustainability Assessment',
        significance: 'Places KEMASPKG in the Top 15% of all companies assessed globally across four sustainability themes: Environment, Labor & Human Rights, Ethics, and Sustainable Procurement.',
        icon: Award
    },
    {
        name: 'ISO 14001',
        focus: 'Environmental Management System (EMS)',
        significance: 'Ensures we have a formal framework to manage environmental aspects, legal compliance, and continuous performance improvement.',
        icon: Globe
    },
    {
        name: 'SA 8000',
        focus: 'Social Accountability',
        significance: 'Affirms commitment to ethical standards and fair labor practices.',
        icon: Users
    },
    {
        name: 'SMETA & SEDEX',
        focus: 'Ethical Trade Audit',
        significance: 'Demonstrates compliance with ethical and social responsibility standards in the supply chain.',
        icon: CheckCircle
    },
    {
        name: 'ISO 9001 & ISO 22716',
        focus: 'Quality Management & Cosmetic GMP',
        significance: 'Guarantees high product quality, which indirectly supports sustainability by reducing defects and production waste.',
        icon: CheckCircle
    }
];

export function WhoWeAreClient() {
  return (
    <main className="flex-grow">
      {/* Hero Section */}
      <AnimatedSection className="relative bg-primary text-primary-foreground py-20 md:py-32 text-center overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] [mask-image:linear-gradient(to_bottom,white_50%,transparent_100%)]"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div variants={staggerContainer} initial="hidden" animate="visible">
            <motion.h1 variants={fadeIn} className="text-4xl md:text-6xl font-extrabold tracking-tight">
                Vision, Mission, & Certifications
            </motion.h1>
            <motion.p variants={fadeIn} className="mt-4 max-w-3xl mx-auto text-lg md:text-xl text-primary-foreground/80">
                The Pillars of the Kemas Green Journey.
            </motion.p>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Intro Section */}
       <AnimatedSection className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
                 <p className="text-lg text-muted-foreground">
                    PT Kemas Indah Maju (KEMASPKG) views sustainability not just as a goal, but as the core of our every innovation and operation. We call this integrated commitment the **Kemas Green Journey**.
                </p>
            </div>
        </div>
      </AnimatedSection>
      
      {/* Vision & Mission Section */}
      <AnimatedSection className="bg-muted/50 py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
                <div>
                    <h2 className="text-3xl font-bold text-primary flex items-center gap-3"><Shield className="h-8 w-8"/>Vision & Commitment</h2>
                    <p className="mt-4 text-muted-foreground">
                        KEMASPKG's sustainability vision is driven by the belief that our core strengths in technology and innovation must align with environmental responsibility. We are committed to "improving the health of our mother earth" and ensuring a better future for generations to come. This is realized through serious initiatives to reduce carbon emissions and limit the use of petrochemical packaging, following the spirit of global agreements like the Kyoto Protocol.
                    </p>
                </div>
                 <div>
                    <h2 className="text-3xl font-bold text-primary flex items-center gap-3"><Target className="h-8 w-8"/>Mission & Journey</h2>
                    <p className="mt-4 text-muted-foreground">
                       The **Kemas Green Journey** is our mission to translate environmental commitments into measurable practices across the value chain:
                    </p>
                    <ul className="mt-4 space-y-3 text-muted-foreground">
                        <li className="flex gap-3"><span className="font-bold text-primary">1.</span><span>**Innovative Green Packaging:** Providing the greenest packaging solutions for cosmetic brands, such as limestone-based Limex and recycled content.</span></li>
                        <li className="flex gap-3"><span className="font-bold text-primary">2.</span><span>**Superior Manufacturing Standards:** Implementing advanced practices that actively contribute to lower emissions, including 100% water recycling and factory energy efficiency.</span></li>
                        <li className="flex gap-3"><span className="font-bold text-primary">3.</span><span>**Ethical Governance:** Managing our operations with integrity through a robust policy framework, including our Environmental Policy and Code of Conduct.</span></li>
                    </ul>
                </div>
            </div>
            <div className="relative aspect-square rounded-lg overflow-hidden shadow-lg">
                 <img
                    src="https://picsum.photos/seed/vision/800/800"
                    alt="Abstract image representing vision"
                    className="w-full h-full object-cover"
                    data-ai-hint="abstract gears"
                />
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Certifications Section */}
      <AnimatedSection className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-primary">Third-Party Validation: Global Certifications</h2>
                <p className="mt-2 max-w-3xl mx-auto text-muted-foreground">
                    Our commitments and management systems are validated by leading third parties, ensuring KEMASPKG operates in line with the highest international standards.
                </p>
            </div>
            <motion.div 
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
                {certifications.map((cert, index) => (
                    <motion.div key={index} variants={fadeIn}>
                        <Card className="h-full flex flex-col">
                            <CardHeader>
                                <div className="flex items-start justify-between gap-4">
                                    <CardTitle className="text-lg">{cert.name}</CardTitle>
                                    <div className="p-2 bg-primary/10 rounded-full flex-shrink-0">
                                        <cert.icon className="w-6 h-6 text-primary" />
                                    </div>
                                </div>
                                <CardDescription>{cert.focus}</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <p className="text-sm text-muted-foreground">{cert.significance}</p>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </motion.div>
        </div>
      </AnimatedSection>
    </main>
  );
}
