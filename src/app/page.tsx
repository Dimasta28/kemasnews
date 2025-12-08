
import { SiteHeaderWrapper } from '@/components/site-header-wrapper';
import { SiteFooter } from '@/components/site-footer';
import { getFrontendSettings } from '@/services/settingsService';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

export default async function Home() {
  const settings = await getFrontendSettings();

  return (
    <div className="flex flex-col min-h-screen bg-[#EFECE9] dark:bg-[#050505]">
      <SiteHeaderWrapper />
      <main className="flex-grow">
        <section className="relative flex items-center h-screen bg-black text-white overflow-hidden">
          <Image
            src="https://images.pexels.com/photos/3214533/pexels-photo-3214533.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Nature background"
            fill
            className="z-0 object-cover opacity-40"
            priority
          />
          <div className="relative z-10 max-w-4xl mx-auto text-left px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight">KEMAS GREEN JOURNEY</h1>
            <p className="mt-4 text-lg max-w-2xl">
              From Waste to Worth: Join us on a mission to reshape the future of packaging, one sustainable choice at a time.
            </p>
            <div className="mt-8 flex gap-4">
              <Button asChild size="lg">
                <Link href="#">
                  Get Started
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="#">
                  Learn More <ArrowRight className="ml-2" />
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
