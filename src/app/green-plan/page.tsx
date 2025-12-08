
import { SiteHeaderWrapper } from '@/components/site-header-wrapper';
import { SiteFooter } from '@/components/site-footer';
import { getFrontendSettings } from '@/services/settingsService';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Check } from 'lucide-react';
import Image from 'next/image';
import { cn } from "@/lib/utils";

export default async function GreenPlanPage() {
  const settings = await getFrontendSettings();

  const sections = [
    {
      title: 'KEMAS Green Footprint',
      subtitle: '',
      description: 'Our commitment extends to minimizing our environmental impact at every stage, from material sourcing to production and end-of-life.',
      source: 'Global Cosmetic News',
      imageUrl: 'https://picsum.photos/seed/green-footprint/600/600',
      imageAlt: 'KEMAS Green Footprint',
      imageHint: 'green footprint infographic',
    },
    {
      title: 'Technology: PCR',
      subtitle: 'Post-Consumer Recycled',
      description: 'PCR is material that has been recycled from consumer waste. It is a great way to reuse plastic and reduce the amount of new plastic being made. PCR is available in PET, PP, and PE.',
      source: '',
      imageUrl: 'https://picsum.photos/seed/pcr-tech/600/600',
      imageAlt: 'PCR Technology',
      imageHint: 'recycled plastic pellets',
    },
    {
      title: 'Technology: PIR',
      subtitle: 'Post-Industrial Recycled',
      description: 'PIR is material that has been recycled from industrial waste. It is a great way to reuse plastic and reduce the amount of new plastic being made. PIR is available in PET, PP, and PE.',
      source: '',
      imageUrl: 'https://picsum.photos/seed/pir-tech/600/600',
      imageAlt: 'PIR Technology',
      imageHint: 'industrial plastic recycling',
    },
  ];

  const heroSection = {
    title: 'What Can KEMAS Do?',
    subtitle: 'Circular Economy Concept',
    description: 'We are a plastic injection molding manufacturer who cares about our stakeholders. We use the Circular Economy concept as our ground in running the business.',
    source: 'The Circular Economy: What it means for Fracking and Plastic – FracTracker Alliance',
    imageUrl: 'https://picsum.photos/seed/circular-economy/1200/800',
    imageAlt: 'Circular Economy Diagram',
    imageHint: 'circular economy diagram',
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <SiteHeaderWrapper />
      <main className="flex-grow">
        
        {/* Hero Section */}
        <section className="relative flex items-center justify-center text-white bg-black min-h-[60vh] md:min-h-[70vh] py-20">
            <Image
                src={heroSection.imageUrl}
                alt={heroSection.imageAlt}
                fill
                className="z-0 opacity-30 object-cover"
                data-ai-hint={heroSection.imageHint}
                priority
            />
            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 tracking-tight">
                        {heroSection.title}
                    </h1>
                    <h2 className="font-semibold text-2xl md:text-3xl text-primary-foreground/80 mb-4">{heroSection.subtitle}</h2>
                    <p className="text-lg md:text-xl text-primary-foreground/90">
                       {heroSection.description}
                    </p>
                    {heroSection.source && <div className="mt-4 text-xs text-primary-foreground/60">Source: {heroSection.source}</div>}
                </div>
            </div>
        </section>

        <div className="space-y-0">
          {sections.map((section, index) => (
            <section key={index} className="relative">
              <div className="grid md:grid-cols-2 gap-0 items-center">
                <div className={cn(
                    "text-left p-8 md:p-12 lg:p-16",
                    index % 2 === 0 ? 'md:order-2' : 'md:order-1'
                  )}>
                  <h2 className="text-3xl font-bold mb-4">{section.title}</h2>
                  {section.subtitle && <h3 className="font-semibold text-xl text-primary mb-2">{section.subtitle}</h3>}
                  <p className="text-muted-foreground mb-4">
                    {section.description}
                  </p>
                  {section.source && <div className="text-xs text-muted-foreground">Source: {section.source}</div>}
                </div>
                <div className={cn(
                    "relative aspect-square",
                    index % 2 === 0 ? 'md:order-1' : 'md:order-2'
                  )}>
                  <Image 
                    src={section.imageUrl}
                    alt={section.imageAlt}
                    fill
                    className="object-cover"
                    data-ai-hint={section.imageHint}
                  />
                </div>
              </div>
            </section>
          ))}
        </div>
        
        <section className="bg-secondary py-16 md:py-24">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-4">KEMAS Journey</h2>
                    <p className="text-muted-foreground">
                        In accordance with the Kyoto Protocol in reducing greenhouse effect and in order to help preserve the environment and the sustainability of the habitat, we at KEMAS have taken serious measures towards reducing carbon emission, reducing petrochemical packaging while providing the best solutions to the Beauty Brands. The measures we took is not just in the greener packaging solutions but also a better manufacturing standard that contributes to less emission being emitted to the environment. We think that mother earth is under threat as well as the future generation.
                    </p>
                    <p className="font-bold mt-4">The time to act is now. So here is our journey…</p>
                </div>
            </div>
         </section>

      </main>
      {settings && <SiteFooter settings={settings} />}
    </div>
  );
}
