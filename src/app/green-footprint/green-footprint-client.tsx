
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
            <motion.h1 variants={fadeIn} className="text-4xl md:text-6xl font-extrabold tracking-tight">Jejak Hijau KEMASPKG</motion.h1>
            <motion.p variants={fadeIn} className="mt-4 max-w-3xl mx-auto text-lg md:text-xl text-primary-foreground/80">
              Inovasi Berkelanjutan dalam Kemasan Kosmetik
            </motion.p>
          </motion.div>
        </div>
      </AnimatedSection>
      
      {/* Intro Section */}
       <AnimatedSection className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
                 <p className="text-lg text-muted-foreground">
                    Sebagai produsen kemasan kosmetik terintegrasi terkemuka di Indonesia sejak tahun 1980, PT Kemas Indah Maju (KEMASPKG) bertekad untuk memimpin industri menuju masa depan yang lebih bertanggung jawab. Kami menyelaraskan kekuatan inovasi dan teknologi kami dengan komitmen untuk "meningkatkan kesehatan ibu pertiwi" dan mengurangi emisi karbon, sejalan dengan protokol lingkungan global.
                </p>
            </div>
        </div>
      </AnimatedSection>


      {/* Sustainability Commitment Section */}
      <AnimatedSection className="bg-muted/50 py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary">I. Komitmen dan Tata Kelola Keberlanjutan</h2>
            <p className="mt-2 text-muted-foreground">Fondasi keberlanjutan kami yang kuat, tervalidasi oleh pengakuan internasional.</p>
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
                  <CardTitle>Sertifikasi Sistem</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">KEMASPKG memegang sertifikasi ISO 14001 untuk Sistem Manajemen Lingkungan dan SA 8000 untuk akuntabilitas sosial.</p>
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
                  <p className="text-muted-foreground">Menempatkan kami di Top 15% perusahaan global, menunjukkan sistem manajemen keberlanjutan kami yang terstruktur.</p>
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
            <h2 className="text-3xl font-bold text-primary">II. Jejak Hijau Operasional Pabrik</h2>
            <p className="mt-2 text-muted-foreground">Mengurangi dampak lingkungan langsung kami melalui teknologi dan praktik canggih.</p>
          </div>
           <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="grid md:grid-cols-3 gap-8">
                <motion.div variants={fadeIn}>
                    <Card className="h-full">
                        <CardHeader>
                            <Waves className="h-8 w-8 text-primary mb-2" />
                            <CardTitle>Daur Ulang Air 100%</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">Fasilitas Anodisasi Logam kami menerapkan sistem closed-loop, berhasil mendaur ulang, menyaring, dan menggunakan kembali 100% air yang dibutuhkan.</p>
                        </CardContent>
                    </Card>
                </motion.div>
                <motion.div variants={fadeIn}>
                    <Card className="h-full">
                        <CardHeader>
                            <Zap className="h-8 w-8 text-primary mb-2" />
                            <CardTitle>Efisiensi Energi Cerdas</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">Barel berinsulasi dan sistem hidrolik yang dioptimalkan dapat memberikan penghematan energi hingga 20% dan mengurangi kebutuhan pendinginan hingga 50%.</p>
                        </CardContent>
                    </Card>
                </motion.div>
                 <motion.div variants={fadeIn}>
                    <Card className="h-full">
                        <CardHeader>
                            <Recycle className="h-8 w-8 text-primary mb-2" />
                            <CardTitle>Pengelolaan Limbah Sirkular</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">Limbah lacquer di daur ulang menjadi bahan bakar oleh pihak ketiga, dan sampah organik diolah menjadi kompos untuk pupuk di area pabrik.</p>
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
                <h2 className="text-3xl font-bold text-primary">III. Inovasi Kemasan Revolusioner</h2>
                <p className="mt-2 text-muted-foreground">Menawarkan alternatif untuk mengurangi ketergantungan pada plastik berbasis minyak bumi.</p>
            </div>

            <div className="space-y-12">
                {/* LIMEX Section */}
                <Card className="overflow-hidden">
                    <div className="grid md:grid-cols-2 items-center">
                        <div className="p-6 md:p-8">
                            <Badge variant="secondary" className="mb-2">Pionir di Asia</Badge>
                            <h3 className="text-2xl font-bold">1. LIMEX (Bahan Dasar Batu Kapur)</h3>
                            <p className="mt-4 text-muted-foreground">Material inovatif yang terdiri dari 60% batu kapur, secara signifikan mengurangi penggunaan plastik dan emisi CO2. Kami meluncurkan produk kosmetik pertama di Asia yang kemasannya terbuat seluruhnya dari LIMEX.</p>
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
                            <h3 className="text-2xl font-bold">2. Konten Daur Ulang dan Alternatif Bio-Based</h3>
                            <ul className="mt-4 space-y-3 text-muted-foreground">
                                <li className="flex gap-3"><Package className="h-5 w-5 text-primary flex-shrink-0 mt-1" /><span><strong className="text-foreground">PIR & PCR:</strong> Mengembangkan kompatibilitas cetakan dengan hingga 50% PCR (Post-Consumer) dan menggunakan PIR (Post-Industrial) untuk komponen logam.</span></li>
                                <li className="flex gap-3"><Leaf className="h-5 w-5 text-primary flex-shrink-0 mt-1" /><span><strong className="text-foreground">Desain Mono-Material:</strong> Mempermudah proses daur ulang dengan menggunakan satu jenis resin seperti PET Crystal One.</span></li>
                                <li className="flex gap-3"><Recycle className="h-5 w-5 text-primary flex-shrink-0 mt-1" /><span><strong className="text-foreground">Material Bio-Based:</strong> Mencakup material yang dapat terurai seperti PBS dan Ecozen yang bebas BPA dan dapat didaur ulang.</span></li>
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
            <h2 className="text-2xl md:text-3xl font-bold">KEMASPKG: Mitra Anda dalam Menciptakan Keindahan yang Bertanggung Jawab</h2>
            <p className="mt-4 max-w-2xl mx-auto text-primary-foreground/80">
              Mari bersama-sama membangun masa depan yang lebih hijau untuk industri kecantikan.
            </p>
          </div>
       </AnimatedSection>

    </main>
  );
}
