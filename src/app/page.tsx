
import { SiteHeaderWrapper } from '@/components/site-header-wrapper';
import { SiteFooter } from '@/components/site-footer';
import { getFrontendSettings } from '@/services/settingsService';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

const timelineData = [
  {
    step: '1st',
    title: 'GREEN PROBLEM',
    description: '',
  },
  {
    step: '2nd',
    title: 'BRAINSTORMING',
    description: 'TOWARDS GREEN SOLUTION',
  },
  {
    step: '3rd',
    title: 'KEMAS GREEN PLAN',
    description: 'What can KEMAS do?',
  },
  {
    step: '4th',
    title: 'KEMAS PLANT GREEN FOOTPRINT',
    description: '',
  },
  {
    step: '5th',
    title: 'KEMAS PACKAGING GREEN FOOTPRINT',
    description: '',
  },
];

export default async function Home() {
  const settings = await getFrontendSettings();

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeaderWrapper />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative text-white h-[70vh] flex items-center">
            <Image
                src="https://picsum.photos/seed/green-journey/1920/1080"
                alt="Green Journey background"
                fill
                className="object-cover"
                data-ai-hint="forest nature"
                priority
            />
            <div className="absolute inset-0 bg-black/50" />
            <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="text-left">
                    <p className="text-lg font-semibold tracking-wider">PT. KEMAS INDAH MAJU</p>
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight mt-2">
                        Green Journey
                    </h1>
                    <p className="mt-6 max-w-2xl text-lg">
                        We think that mother earth is under threat as well as the future generation.
                    </p>
                    <p className="mt-2 text-lg font-bold">THE TIME TO ACT IS NOW</p>
                    <p className="mt-1 text-lg">
                        Please follow us on our green footprint journey.
                    </p>
                    <Button asChild size="lg" className="mt-8">
                        <Link href="/careers">
                        Learn More <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>

        {/* Timeline Section */}
        <section className="bg-gradient-to-br from-green-600 to-green-800 text-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 text-left">
              {timelineData.map((item, index) => (
                <div key={index} className="flex flex-col">
                  <span className="text-sm font-semibold text-green-200">{item.step}</span>
                  <h3 className="mt-2 text-lg font-bold">{item.title}</h3>
                  {item.description && (
                    <p className="mt-1 text-sm text-green-100">{item.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
      <SiteFooter settings={settings} />
    </div>
  );
}
