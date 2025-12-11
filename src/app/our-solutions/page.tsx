
import { SiteHeaderWrapper } from '@/components/site-header-wrapper';
import { SiteFooter } from '@/components/site-footer';
import { getFrontendSettings } from '@/services/settingsService';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { AnimatedSection } from '@/components/animated-section';

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

export default async function OurSolutionsPage() {
  const settings = await getFrontendSettings();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <SiteHeaderWrapper />
      <main className="flex-grow">
         <section className="relative flex items-center justify-center h-[90vh] bg-black text-white overflow-hidden">
            <div
                className="absolute inset-0 z-0"
            >
                <Image
                    src="https://idicdhrghiqmqtocapwq.supabase.co/storage/v1/object/public/Kemas%20green%20jurney/Home/Web%20Kemas%20GREEN%20JOURNEY%20DESIGN.jpg"
                    alt="Lush green pine tree branches"
                    fill
                    className="object-cover opacity-40"
                    priority
                    data-ai-hint="pine tree"
                />
            </div>
            <div 
                className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-left"
            >
                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">FROM PRODUCTS<br/>TO SOLUTIONS:</h1>
                <p className="mt-6 text-lg max-w-3xl">
                    In accordance with the Kyoto Protocol in reducing greenhouse effect and in order to help preserve the environment and the sustainability of the habitat, we at KEMAS have taken serious measures towards reducing carbon emission, reducing petrochemical packaging while providing the best solutions to the Beauty Brands. The measures we took is not just in the greener packaging solutions but also a better manufacturing standard that contributes to less emission being emitted to the environment. We think that mother earth is under threat as well as the future generation.
                </p>
                <p className="mt-4 text-lg font-bold max-w-2xl">
                    The time to act is now. So here is our journey...
                </p>
            </div>
        </section>
        <AnimatedSection className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div className="relative">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-foreground">
                        BASED ON<br />
                        GREEN INNOVATION:
                    </h2>
                    <div className="absolute top-0 -left-4 h-full w-1 bg-primary transform -translate-x-full"></div>
                </div>
                
                <ul className="space-y-6 text-lg text-muted-foreground">
                    {innovations.map((item, index) => (
                        <li key={index} className="flex">
                            <span className="text-primary font-bold mr-2">•</span>
                            <span><strong className="text-foreground">{item.title}:</strong> "{item.description}"</span>
                        </li>
                    ))}
                </ul>
              </div>
              <div className="relative aspect-square rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="https://images.pexels.com/photos/2533266/pexels-photo-2533266.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Cosmetic packaging"
                  fill
                  className="object-cover"
                  data-ai-hint="cosmetic packaging"
                />
              </div>
            </div>
          </div>
        </AnimatedSection>
      </main>
      <SiteFooter settings={settings} />
    </div>
  );
}
