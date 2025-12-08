
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
      <main className="flex-grow container mx-auto px-4 py-12 sm:py-20">
        <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">Our Green Plan</h1>
            <p className="mt-4 text-lg text-muted-foreground">
                A transparent look at our actionable steps towards a more sustainable future in packaging.
            </p>
        </div>

        <div className="space-y-16">
            <Card className="overflow-hidden">
                <CardHeader>
                    <CardTitle className="text-2xl">What Can KEMAS Do?</CardTitle>
                    <CardDescription>We are a plastic injection molding manufacturer who cares about our stakeholders</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div>
                            <h3 className="font-semibold text-lg mb-2">Circular Economy Concept</h3>
                            <p className="text-muted-foreground mb-4">
                                Circular Economy concept as our ground in running business.
                            </p>
                            <div className="text-xs text-muted-foreground">
                                Source: The Circular Economy: What it means for Fracking and Plastic – FracTracker Alliance
                            </div>
                        </div>
                        <Image 
                            src="https://picsum.photos/seed/circular-economy/600/400"
                            alt="Circular Economy Diagram"
                            width={600}
                            height={400}
                            className="rounded-lg object-cover"
                            data-ai-hint="circular economy diagram"
                        />
                    </div>
                </CardContent>
            </Card>

            <Card className="overflow-hidden">
                <CardHeader>
                    <CardTitle className="text-2xl">KEMAS Green Footprint</CardTitle>
                </CardHeader>
                 <CardContent>
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                         <Image 
                            src="https://picsum.photos/seed/green-footprint/600/400"
                            alt="KEMAS Green Footprint"
                            width={600}
                            height={400}
                            className="rounded-lg object-cover"
                            data-ai-hint="green footprint infographic"
                        />
                        <div>
                           <p className="text-muted-foreground mb-4">
                                Our commitment extends to minimizing our environmental impact at every stage.
                            </p>
                             <div className="text-xs text-muted-foreground">
                                Source: Global Cosmetic News
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">KEMAS Journey</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground max-w-prose">
                        In accordance with the Kyoto Protocol in reducing greenhouse effect and in order to help preserve the environment and the sustainability of the habitat, we at KEMAS have taken serious measures towards reducing carbon emission, reducing petrochemical packaging while providing the best solutions to the Beauty Brands. The measures we took is not just in the greener packaging solutions but also a better manufacturing standard that contributes to less emission being emitted to the environment. We think that mother earth is under threat as well as the future generation.
                    </p>
                    <p className="font-bold mt-4">The time to act is now. So here is our journey…</p>
                </CardContent>
            </Card>
        </div>
      </main>
      {settings && <SiteFooter settings={settings} />}
    </div>
  );
}
