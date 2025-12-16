
'use client';

import Image from 'next/image';
import Link from 'next/link';
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
        description: 'Sistem Manajemen Lingkungan menyeluruh di seluruh proses produksi.',
        icon: Globe
    },
    {
        name: 'ISCC',
        description: 'Validasi sumber daya berkelanjutan & rendah karbon.',
        icon: CheckCircle
    },
    {
        name: 'ISO 9001, ISO 22716, C-GMP',
        description: 'Kualitas & GMP kosmetik kelas global.',
        icon: Award
    },
    {
        name: 'SA8000 & Sedex',
        description: 'Etika kerja, keselamatan, dan transparansi rantai pasok.',
        icon: Users
    }
];

const limexMetrics = [
    { indicator: "Pengurangan plastik", impact: "Hingga 46%" },
    { indicator: "Penurunan CO₂ (total LCA)", impact: "36%" },
    { indicator: "Emisi karbon hulu", impact: "1/50 dibanding petrokimia" },
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
                Dari Inovasi Material ke Kepemimpinan ESG Global
            </motion.p>
          </motion.div>
        </div>
      </AnimatedSection>
      
      {/* Intro Section */}
       <AnimatedSection className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
                 <p className="text-lg text-muted-foreground">
                    PT Kemas Indah Maju (KEMASPKG) membangun jejak lingkungan (green footprint) yang terukur melalui tata kelola yang disiplin, inovasi material berbasis sains, dan komitmen operasional jangka panjang. Halaman ini dirancang sebagai rujukan profesional bagi mitra dan merek global yang menempatkan keberlanjutan sebagai standar, bukan slogan.
                </p>
            </div>
        </div>
      </AnimatedSection>


      {/* Executive Summary */}
      <AnimatedSection className="bg-muted/50 py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary">Ringkasan Eksekutif</h2>
            <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
                Sebagai produsen kemasan kesehatan dan kecantikan yang melayani 100+ merek global, KEMASPKG mengintegrasikan keberlanjutan ke dalam strategi inti melalui prinsip <strong className="text-foreground">STEP-UP.</strong>
            </p>
          </div>
          <div className="max-w-5xl mx-auto text-center p-8 border-2 border-dashed border-primary/20 rounded-lg bg-background">
            <h3 className="font-bold text-primary text-2xl tracking-widest">S.T.E.P. - U.P.</h3>
            <p className="text-muted-foreground mt-2">Technology Innovation, Social Responsibility, Positive Corporate Culture, Utilization of Resources, and Productivity Focus.</p>
             <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-8 text-left">
                <div className="flex items-start gap-3">
                    <Wind className="h-8 w-8 text-primary mt-1 flex-shrink-0" />
                    <div>
                        <p className="font-bold text-foreground">Pengurangan Plastik 46%</p>
                        <p className="text-sm text-muted-foreground">melalui material LIMEX.</p>
                    </div>
                </div>
                <div className="flex items-start gap-3">
                    <Droplets className="h-8 w-8 text-primary mt-1 flex-shrink-0" />
                     <div>
                        <p className="font-bold text-foreground">Penurunan Emisi CO₂ 36%</p>
                        <p className="text-sm text-muted-foreground">pada total siklus hidup produk.</p>
                    </div>
                </div>
                 <div className="flex items-start gap-3">
                    <BatteryCharging className="h-8 w-8 text-primary mt-1 flex-shrink-0" />
                     <div>
                        <p className="font-bold text-foreground">Efisiensi Karbon Hulu 1/50</p>
                        <p className="text-sm text-muted-foreground">dibanding material petrokimia.</p>
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
                     <h2 className="text-3xl font-bold text-primary">Tata Kelola Lingkungan & Kepatuhan</h2>
                    <p className="mt-4 text-muted-foreground">
                        <strong className="text-foreground">KEMAS Green Journey</strong> adalah inisiatif payung keberlanjutan yang menargetkan pengurangan emisi, penurunan ketergantungan petrokimia, dan peningkatan standar manufaktur. Fokusnya jelas: dampak nyata dari hulu ke hilir.
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
                    <Card className="bg-primary/5 border-primary/20">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3"><Users className="h-6 w-6 text-primary" /> Pilar Sosial & Tata Kelola</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-muted-foreground">
                            <p><strong className="text-foreground">60% tenaga kerja perempuan</strong> sebagai komitmen nyata pemberdayaan gender.</p>
                            <p>Program <strong className="text-foreground">KEMAS Care & Caring</strong> dan <strong className="text-foreground">KEMAS Replant Tree</strong> untuk dampak sosial & lingkungan lokal.</p>
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
                <h2 className="text-3xl font-bold text-primary">Inovasi Material</h2>
                <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">Portofolio solusi berkelanjutan kami mencakup PCR & PIR, PLA (bio-polimer), desain mono-material, dan inovasi unggulan berbasis batu kapur: LIMEX.</p>
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
                        <Badge variant="secondary" className="mb-2 bg-primary/10 text-primary">Inovasi Unggulan</Badge>
                        <h3 className="text-2xl font-bold">LIMEX: Bukti Nyata Pengurangan Dampak</h3>
                        <p className="mt-4 text-muted-foreground">LIMEX mengandung &gt;50% batu kapur, menggantikan plastik berbasis minyak bumi. Terdaftar sebagai teknologi berkelanjutan internasional dan menawarkan *luxurious heavy feel* yang diminati merek premium.</p>
                         <div className="mt-6">
                            <h4 className="font-semibold mb-2">Metrik Utama LIMEX</h4>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                    <TableHead>Indikator</TableHead>
                                    <TableHead className="text-right">Dampak</TableHead>
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
                            <p className="text-xs text-muted-foreground mt-2">Keunggulan terbesar LIMEX ada di Lingkup 3 (hulu)—area paling krusial bagi merek global dalam target dekarbonisasi.</p>
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
                <h2 className="text-3xl font-bold text-primary">Efisiensi Operasional & Inovasi Non-Kemasan</h2>
                 <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
                    Fasilitas modern kami dirancang untuk efisiensi energi dan minimisasi emisi, sejalan dengan ISO 14001 dan prinsip pemanfaatan sumber daya.
                </p>
            </div>
             <Card className="max-w-3xl mx-auto">
                 <CardHeader>
                    <CardTitle>Studi Kasus: NBR Cosmetic Puff</CardTitle>
                    <CardDescription>Keberlanjutan kami tidak berhenti di botol—hingga ke aksesori.</CardDescription>
                 </CardHeader>
                 <CardContent>
                     <ul className="space-y-3 text-muted-foreground list-disc pl-5">
                        <li><strong className="text-foreground">Substitusi bahan kimia berbahaya:</strong> Mengganti komponen berisiko dengan alternatif yang lebih aman.</li>
                        <li><strong className="text-foreground">Optimasi proses & efisiensi bahan baku:</strong> Mengurangi limbah selama produksi.</li>
                        <li><strong className="text-foreground">Produk lebih tahan lama:</strong> Menciptakan produk yang lebih awet, sehingga mengurangi frekuensi penggantian dan limbah konsumen.</li>
                    </ul>
                 </CardContent>
             </Card>
         </div>
       </AnimatedSection>
      
       {/* Call to Action */}
       <AnimatedSection className="py-16 md:py-24 text-center bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold">Lebih hijau, tetap mewah, dan siap masa depan.</h2>
            <p className="mt-4 max-w-3xl mx-auto text-primary-foreground/80">
              Dengan metrik yang terukur, sertifikasi global, dan adopsi pasar premium, kami membantu merek global mengurangi dampak lingkungan tanpa mengorbankan kualitas maupun estetika.
            </p>
          </div>
       </AnimatedSection>

    </main>
  );
}
