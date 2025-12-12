
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Pencil } from 'lucide-react';
import { AnimatedSection } from '@/components/animated-section';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

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

export function OurSolutionsClient() {
  const { user } = useAuth();
  
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
         <section className="relative flex items-center justify-center h-[70vh] bg-black text-white overflow-hidden">
            {user && (
                <Button asChild variant="secondary" size="icon" className="absolute top-4 right-4 z-20 h-9 w-9 rounded-full">
                    <Link href="/admin/settings">
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Change Hero Image</span>
                    </Link>
                </Button>
            )}
            <motion.div
                className="absolute inset-0 z-0"
                style={{ y: 0 }}
            >
                <Image
                    src="https://idicdhrghiqmqtocapwq.supabase.co/storage/v1/object/public/Kemas%20green%20jurney/Hero%20image/Black%20and%20White%20Modern%20Travel%20Agency%20Presentation.jpg"
                    alt="Lush green pine tree branches"
                    fill
                    className="object-cover opacity-40"
                    priority
                    data-ai-hint="pine tree"
                />
            </motion.div>
            <motion.div
                className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-left"
                variants={heroTextContainer}
                initial="hidden"
                animate="show"
            >
                <motion.h1 variants={heroTextItem} className="text-5xl md:text-7xl font-extrabold tracking-tight">FROM PRODUCTS TO SOLUTIONS</motion.h1>
            </motion.div>
        </section>

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

        <AnimatedSection className="py-16 md:py-24 relative text-primary-foreground overflow-hidden">
           <div className="absolute inset-0 z-0">
                <Image
                    src="https://images.pexels.com/photos/2533266/pexels-photo-2533266.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    alt="Cosmetic products and raw material"
                    fill
                    className="object-cover"
                    data-ai-hint="cosmetic products material"
                />
                <div className="absolute inset-0 bg-black/50" />
           </div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="md:col-start-2">
                <div className="space-y-6">
                  <h2 className="text-3xl md:text-4xl font-extrabold relative pb-2">
                      PRODUCTS BY CATEGORY
                      <span className="absolute bottom-0 left-0 w-24 h-1 bg-primary-foreground"></span>
                  </h2>
                  <div className="space-y-4">
                      {productCategories.map((category) => (
                          <div key={category.name}>
                              <h3 className="text-2xl font-bold">{category.name}</h3>
                              <p className="text-primary-foreground/80">{category.items}</p>
                          </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection className="py-16 md:py-24 relative text-primary-foreground overflow-hidden">
           <div className="absolute inset-0 z-0">
                <Image
                  src="https://idicdhrghiqmqtocapwq.supabase.co/storage/v1/object/public/Kemas%20green%20jurney/Home/Web%20Kemas%20GREEN%20JOURNEY%20DESIGN%203.jpg"
                  alt="Cosmetic packaging"
                  fill
                  className="object-cover"
                  data-ai-hint="cosmetic packaging"
                />
                <div className="absolute inset-0 bg-black/60" />
           </div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div className="relative">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-primary-foreground">
                        BASED ON<br />
                        GREEN INNOVATION
                    </h2>
                    <div className="absolute top-0 -left-4 h-full w-1 bg-primary-foreground transform -translate-x-full"></div>
                </div>

                <ul className="space-y-6 text-lg text-primary-foreground/80">
                    {innovations.map((item, index) => (
                        <li key={index} className="flex">
                            <span className="text-primary-foreground font-bold mr-2">•</span>
                            <span><strong className="text-primary-foreground">{item.title}:</strong> "{item.description}"</span>
                        </li>
                    ))}
                </ul>
              </div>
              <div>
                {/* This div is intentionally left empty to push the text content to the left side on medium screens and up */}
              </div>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection className="py-16 md:py-24 bg-secondary text-secondary-foreground">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div className="relative aspect-square rounded-lg overflow-hidden order-last md:order-first">
                        <Image
                            src="https://idicdhrghiqmqtocapwq.supabase.co/storage/v1/object/public/Kemas%20green%20jurney/Home/Web%20Kemas%20GREEN%20JOURNEY%20DESIGN%205.jpg"
                            alt="Decoration capabilities"
                            fill
                            className="object-cover"
                            data-ai-hint="cosmetic products"
                        />
                    </div>
                    <div className="space-y-8">
                        <div className="relative">
                            <h2 className="text-4xl md:text-5xl font-extrabold">
                                DECORATION CAPABILITIES
                            </h2>
                            <div className="absolute top-0 -left-4 h-full w-1 bg-primary transform -translate-x-full"></div>
                        </div>
                        <p className="text-lg">
                            Featuring Metal Anodization and Spray Lines
                            capabilities as an aesthetic added value that
                            remains environmentally friendly (due to the
                            lacquer waste capture system)
                        </p>
                    </div>
                </div>
            </div>
        </AnimatedSection>
      </main>
  );
}
