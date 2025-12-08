
import { SiteHeaderWrapper } from '@/components/site-header-wrapper';
import { SiteFooter } from '@/components/site-footer';
import { getFrontendSettings } from '@/services/settingsService';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default async function Home() {
  const settings = await getFrontendSettings();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <SiteHeaderWrapper />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative text-white h-[80vh] flex items-center justify-center text-center">
            <Image
                src="https://picsum.photos/seed/nature-leaves/1920/1080"
                alt="Lush green leaves background"
                fill
                className="object-cover"
                data-ai-hint="nature leaves"
                priority
            />
            <div className="absolute inset-0 bg-black/60" />
            <div className="relative z-10 max-w-4xl p-8">
                <div className="flex justify-center items-center mb-4">
                    {/* Placeholder for the abstract white circles */}
                    <div className="relative w-16 h-16 mr-4">
                        <div className="absolute top-0 left-0 w-12 h-12 bg-white rounded-full opacity-90"></div>
                        <div className="absolute top-0 right-0 w-6 h-6 bg-white rounded-full opacity-90"></div>
                    </div>
                </div>
                <h1 className="text-5xl md:text-8xl font-extrabold tracking-tighter">
                    KEMAS<br />GREEN JOURNEY
                </h1>
                <p className="mt-6 max-w-2xl mx-auto text-lg leading-relaxed">
                    We think that mother earth is under threat as well as the future generation.
                    <br />
                    <span className="font-bold">THE TIME TO ACT IS NOW</span>
                    <br />
                    Please follow us on our green footprint journey.
                </p>
                <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button asChild size="lg" variant="secondary" className="w-full sm:w-auto">
                        <Link href="/green-pan">
                            Get Started
                        </Link>
                    </Button>
                     <Button asChild size="lg" variant="outline" className="w-full sm:w-auto bg-transparent border-white text-white hover:bg-white hover:text-black">
                        <Link href="/green-pan">
                            Learn More
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
      </main>
      <SiteFooter settings={settings} />
    </div>
  );
}
