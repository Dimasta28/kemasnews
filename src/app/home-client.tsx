
'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SiteFooter } from '@/components/site-footer';
import type { FrontendSettings } from '@/services/settingsService';
import { Card, CardContent } from '@/components/ui/card';

// Dummy data for social proof and testimonials
const companyLogos = [
  { name: 'Company A', logo: 'https://via.placeholder.com/150x50/ffffff/000000?text=Logo+A' },
  { name: 'Company B', logo: 'https://via.placeholder.com/150x50/ffffff/000000?text=Logo+B' },
  { name: 'Company C', logo: 'https://via.placeholder.com/150x50/ffffff/000000?text=Logo+C' },
  { name: 'Company D', logo: 'https://via.placeholder.com/150x50/ffffff/000000?text=Logo+D' },
  { name: 'Company E', logo: 'https://via.placeholder.com/150x50/ffffff/000000?text=Logo+E' },
];

const benefits = [
  { title: 'Increased Efficiency', description: 'Streamline your workflows and get more done in less time.', icon: CheckCircle },
  { title: 'Actionable Insights', description: 'Gain a deeper understanding of your data to make smarter decisions.', icon: CheckCircle },
  { title: 'Seamless Collaboration', description: 'Work together with your team in real-time, no matter where you are.', icon: CheckCircle },
];

const testimonials = [
  { name: 'Jane Doe', role: 'CEO, Company A', quote: 'This product has revolutionized how we operate. Our productivity has skyrocketed!', avatar: 'https://i.pravatar.cc/150?img=1' },
  { name: 'John Smith', role: 'Lead Developer, Company B', quote: 'Incredibly easy to integrate and has saved us countless hours of development time.', avatar: 'https://i.pravatar.cc/150?img=2' },
];


export default function HomeClient({ settings }: { settings: FrontendSettings | null }) {
    if (!settings) {
        // Render a loading state or a fallback if settings are not available
        return (
            <div className="flex h-screen items-center justify-center">
                <p>Loading...</p>
            </div>
        );
    }
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 md:py-32 text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground">
                The Future of Your Business Starts Here
              </h1>
              <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground">
                Unlock unparalleled growth with our innovative solutions. We empower teams to achieve more by simplifying complexity.
              </p>
              <div className="mt-8">
                <Button size="lg" asChild>
                  <Link href="/register">
                    Get Started Free <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Social Proof Section */}
        <section className="py-12 bg-secondary/50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-center text-sm font-semibold text-muted-foreground tracking-wider uppercase">
              Trusted by the world's best companies
            </h3>
            <div className="mt-6 grid grid-cols-2 gap-8 md:grid-cols-5 items-center">
              {companyLogos.map((company) => (
                <div key={company.name} className="col-span-1 flex justify-center">
                  <Image
                    className="h-10 w-auto object-contain"
                    src={company.logo}
                    alt={company.name}
                    width={150}
                    height={40}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 md:py-28">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Focus on What Matters</h2>
                    <p className="mt-3 max-w-2xl mx-auto text-lg text-muted-foreground">Stop wasting time on manual tasks. Here’s how we help.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-12">
                    {benefits.map((benefit, index) => (
                        <div key={index} className="text-center">
                            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-primary-foreground mx-auto">
                                <benefit.icon className="h-6 w-6" />
                            </div>
                            <h3 className="mt-5 text-xl font-semibold">{benefit.title}</h3>
                            <p className="mt-2 text-base text-muted-foreground">{benefit.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 md:py-28 bg-secondary/50">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="space-y-12">
                    {testimonials.map((testimonial, index) => (
                        <Card key={index} className="overflow-hidden">
                            <CardContent className="p-8 text-center">
                                <Image
                                    className="h-16 w-16 rounded-full mx-auto"
                                    src={testimonial.avatar}
                                    alt=""
                                    width={64}
                                    height={64}
                                />
                                <blockquote className="mt-6">
                                    <p className="text-xl font-medium text-foreground">&ldquo;{testimonial.quote}&rdquo;</p>
                                </blockquote>
                                <footer className="mt-6">
                                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                                    <div className="text-muted-foreground">{testimonial.role}</div>
                                </footer>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20 md:py-28 text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
              Ready to Dive In?
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              Start your free trial today. No credit card required.
            </p>
            <div className="mt-8">
              <Button size="lg" asChild>
                <Link href="/register">
                  Claim Your Free Trial <ArrowRight className="ml-2 h-5 w-5" />
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
