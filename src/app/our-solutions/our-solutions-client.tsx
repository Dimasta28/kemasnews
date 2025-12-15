

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Pencil } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { GreenJourneyForm } from '../_components/green-journey-form';
import { ImageEditDialog } from '@/components/image-edit-dialog';
import { getFrontendSettings, type FrontendSettings } from '@/services/settingsService';

const innovations = [
    {
        title: 'Refillable Systems',
        description: 'Reduce waste with an elegant refill concept.',
    },
    {
        title: 'Mono-Material',
        description: 'One material, unlimited recycling.',
    },
    {
        title: 'PCR & Bio-based',
        description: 'Post-consumer recycled materials and plant-based sources.',
    },
];

const productCategories = [
    {
        name: 'Skincare',
        items: '(Jars, Bottles, Droppers)',
    },
    {
        name: 'Makeup',
        items: '(Compacts, Lipsticks, Mascaras)',
    }
];


function ParallaxSection({ children, src, alt, hint, overlay = true, className, settingKey }: { children: React.ReactNode, src: string, alt: string, hint: string, overlay?: boolean, className?: string, settingKey?: any }) {
    const ref = useRef(null);
    const { user } = useAuth();
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });
    const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

    return (
        <section ref={ref} className={`py-16 md:py-24 relative overflow-hidden ${className}`}>
             {user && settingKey && (
                <ImageEditDialog
                    settingKey={settingKey}
                    currentImageUrl={src}
                    triggerClassName="absolute top-4 right-4 z-20 h-9 w-9 rounded-full"
                />
            )}
             <div className="absolute inset-0 z-0">
                <motion.div className="absolute inset-0" style={{ y }}>
                    <Image
                        src={src}
                        alt={alt}
                        fill
                        className="object-cover"
                        data-ai-hint={hint}
                    />
                </motion.div>
                {overlay && <div className="absolute inset-0 bg-black/60" />}
           </div>
           <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {children}
           </div>
        </section>
    )
}


export function OurSolutionsClient({ settings }: { settings: FrontendSettings }) {
  const { user } = useAuth();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  
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
         <ParallaxSection
            src={settings.heroImageUrl || "https://idicdhrghiqmqtocapwq.supabase.co/storage/v1/object/public/Kemas%20green%20jurney/Hero%20image/Black%20and%20White%20Modern%20Travel%20Agency%20Presentation.jpg"}
            alt="Lush green pine tree branches"
            hint="pine tree"
            className="h-[70vh] text-primary-foreground flex items-center justify-center"
            overlay={true}
            settingKey="heroImageUrl"
        >
            <motion.div 
                className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-left"
                variants={heroTextContainer}
                initial="hidden"
                animate="show"
            >
                <motion.h1 variants={heroTextItem} className="text-5xl md:text-7xl font-extrabold tracking-tight">FROM PRODUCTS TO SOLUTIONS</motion.h1>
            </motion.div>
        </ParallaxSection>

        <section className="relative py-16 md:py-24 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <p className="mt-4 text-lg">
                We are taking serious measures to reduce carbon emissions and petrochemical packaging, providing better solutions for Beauty Brands and the planet. In accordance with the Kyoto Protocol in reducing greenhouse effect and in order to help preserve the environment and the sustainability of the habitat, we at KEMAS have taken serious measures towards reducing carbon emission, reducing petrochemical packaging while providing the best solutions to the Beauty Brands. The measures we took is not just in the greener packaging solutions but also a better manufacturing standard that contributes to less emission being emitted to the environment. We think that mother earth is under threat as well as the future generation.
              </p>
              <p className="mt-4 text-lg font-bold text-center">
                The time to act is now. So here is our journey...
              </p>
            </div>
          </div>
        </section>

        <ParallaxSection
            src={settings.solutionsProductCategoryImageUrl || "https://images.pexels.com/photos/2533266/pexels-photo-2533266.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"}
            alt="Cosmetic products and raw material"
            hint="cosmetic products material"
            overlay={false}
            className="text-primary"
            settingKey="solutionsProductCategoryImageUrl"
        >
            <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="md:col-start-2">
                    <div className="space-y-6 md:text-right bg-background/90 md:bg-transparent p-6 md:p-0 rounded-lg md:rounded-none">
                        <h2 className="text-3xl md:text-4xl font-extrabold relative pb-4">
                           PRODUCTS BY
                            <br />
                             CATEGORY
                            <span className="absolute bottom-0 right-0 w-24 h-1 bg-primary"></span>
                        </h2>
                        <div className="space-y-4 text-foreground">
                            {productCategories.map((category) => (
                                <div key={category.name}>
                                    <h3 className="text-2xl font-bold">{category.name}</h3>
                                    <p className="text-muted-foreground">{category.items}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </ParallaxSection>

        <ParallaxSection
            src={settings.solutionsGreenInnovationImageUrl || "https://idicdhrghiqmqtocapwq.supabase.co/storage/v1/object/public/Kemas%_20green%20jurney/Home/Web%20Kemas%20GREEN%20JOURNEY%20DESIGN%203.jpg"}
            alt="Cosmetic packaging"
            hint="cosmetic packaging"
            overlay={false}
            className="text-primary"
            settingKey="solutionsGreenInnovationImageUrl"
        >
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="space-y-8 bg-background/90 md:bg-transparent p-6 md:p-0 rounded-lg md:rounded-none">
                <h2 className="text-4xl md:text-5xl font-extrabold relative pb-4">
                    BASED ON<br />
                    GREEN INNOVATION
                    <span className="absolute bottom-0 left-0 w-24 h-1 bg-primary"></span>
                </h2>

                <ul className="space-y-6 text-lg text-muted-foreground">
                    {innovations.map((item, index) => (
                        <li key={index} className="flex">
                            <span className="text-primary font-bold mr-2">•</span>
                            <span><strong className="text-foreground">{item.title}:</strong> "{item.description}"</span>
                        </li>
                    ))}
                </ul>
              </div>
              <div>
                {/* This div is intentionally left empty to push the text content to the left side on medium screens and up */}
              </div>
            </div>
        </ParallaxSection>

        <ParallaxSection
            src={settings.solutionsDecorationImageUrl || "https://idicdhrghiqmqtocapwq.supabase.co/storage/v1/object/public/Kemas%_20green%20jurney/Home/Web%20Kemas%20GREEN%20JOURNEY%20DESIGN%205.jpg"}
            alt="Decoration capabilities"
            hint="cosmetic products"
            overlay={false}
            className="text-primary"
            settingKey="solutionsDecorationImageUrl"
        >
            <div className="grid md:grid-cols-2 gap-16 items-center">
                <div>
                     <div className="bg-background text-foreground p-8 md:p-12 shadow-2xl max-w-md">
                        <div className="space-y-4">
                            <h2 className="text-3xl md:text-4xl font-extrabold text-primary relative pb-4">
                                DECORATION CAPABILITIES:
                                <span className="absolute bottom-0 left-0 w-24 h-1 bg-primary"></span>
                            </h2>
                            <p className="text-base text-muted-foreground">
                                Featuring Metal Anodization and Spray Lines
                                capabilities as an aesthetic added value that
                                remains environmentally friendly (due to the
                                lacquer waste capture system).
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </ParallaxSection>
        {isMounted && <GreenJourneyForm />}
      </main>
  );
}
