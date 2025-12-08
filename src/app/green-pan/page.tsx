
import { SiteHeaderWrapper } from '@/components/site-header-wrapper';
import { SiteFooter } from '@/components/site-footer';
import { getFrontendSettings } from '@/services/settingsService';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Check } from 'lucide-react';
import Image from 'next/image';

export default async function GreenPanPage() {
  const settings = await getFrontendSettings();

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <SiteHeaderWrapper />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12 sm:py-20">
            <div className="max-w-4xl mx-auto text-center mb-16">
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">Our Green Plan</h1>
                <p className="mt-4 text-lg text-muted-foreground">
                    A transparent look at our actionable steps towards a more sustainable future in packaging.
                </p>
            </div>
        </div>

        <div className="space-y-16 md:space-y-24">
            {/* Section 1: Circular Economy */}
            <section className="container mx-auto">
                <div className="grid md:grid-cols-2 gap-0 items-center">
                    <div className="text-left px-4">
                        <h2 className="text-3xl font-bold mb-4">What Can KEMAS Do?</h2>
                        <h3 className="font-semibold text-xl text-primary mb-2">Circular Economy Concept</h3>
                        <p className="text-muted-foreground mb-4">
                            We are a plastic injection molding manufacturer who cares about our stakeholders. We use the Circular Economy concept as our ground in running the business.
                        </p>
                        <div className="text-xs text-muted-foreground">
                            Source: The Circular Economy: What it means for Fracking and Plastic – FracTracker Alliance
                        </div>
                    </div>
                    <div className="relative h-full min-h-[300px] md:min-h-0">
                        <Image 
                            src="https://picsum.photos/seed/circular-economy/600/400"
                            alt="Circular Economy Diagram"
                            fill
                            className="object-cover"
                            data-ai-hint="circular economy diagram"
                        />
                    </div>
                </div>
            </section>

            {/* Section 2: Green Footprint */}
            <section className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                     <div className="relative aspect-video md:order-2">
                        <Image 
                            src="https://picsum.photos/seed/green-footprint/600/400"
                            alt="KEMAS Green Footprint"
                             fill
                            className="rounded-lg object-cover shadow-lg"
                            data-ai-hint="green footprint infographic"
                        />
                    </div>
                    <div className="text-left md:order-1">
                        <h2 className="text-3xl font-bold mb-4">KEMAS Green Footprint</h2>
                        <p className="text-muted-foreground mb-4">
                            Our commitment extends to minimizing our environmental impact at every stage.
                        </p>
                        <div className="text-xs text-muted-foreground">
                            Source: Global Cosmetic News
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 3: KEMAS Journey */}
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
        </div>
        
        <div className="py-12 sm:py-20" />

      </main>
      {settings && <SiteFooter settings={settings} />}
    </div>
  );
}
