
'use client';

import { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowRight, CheckCircle, Leaf, Recycle, Zap, Download, Send, PlayCircle } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { SiteFooter } from '@/components/site-footer';
import type { FrontendSettings } from '@/services/settingsService';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';
import { type GreenJourneyPageData, type ImpactMetric, type JourneyStep, type Resource } from '@/services/greenJourneyService';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface GreenJourneyClientPageProps {
  pageData: GreenJourneyPageData | null;
  settings: FrontendSettings | null;
  error?: string | null;
}

export function GreenJourneyClientPage({ pageData, settings, error }: GreenJourneyClientPageProps) {
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (error || !pageData || !settings) {
        return (
            <>
                <main className="flex-grow flex items-center justify-center p-4 min-h-[70vh]">
                    <Alert variant="destructive" className="max-w-2xl">
                    <Terminal className="h-4 w-4" />
                    <AlertTitle>Could Not Load Page Content</AlertTitle>
                    <AlertDescription>
                        <p>There was an error loading the content for the Green Journey page.</p>
                        <p className="mt-2 font-mono text-xs bg-muted p-2 rounded">{error || 'Page data is unavailable.'}</p>
                        <Link href="/" className="text-sm mt-4 inline-block underline">Return to homepage</Link>
                    </AlertDescription>
                    </Alert>
                </main>
                {settings && <SiteFooter settings={settings} />}
            </>
        )
    }

    const handleContactSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSubmitting(true);
        // Here you would typically handle form submission, e.g., send to an API endpoint.
        // For this example, we'll just simulate a delay and show a toast.
        await new Promise(resolve => setTimeout(resolve, 1500));
        toast({
            title: 'Message Sent!',
            description: 'Thank you for reaching out. We will get back to you shortly.',
        });
        (event.target as HTMLFormElement).reset();
        setIsSubmitting(false);
    }

    return (
        <>
            <main>
                {/* Hero Section */}
                <section className="relative h-[80vh] flex items-center justify-center text-center text-white bg-black overflow-hidden">
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute z-0 w-auto min-w-full min-h-full max-w-none opacity-40 object-cover"
                    >
                        <source src={pageData.hero.videoUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    <div className="relative z-10 max-w-3xl p-8">
                        <h1 className="text-4xl md:text-7xl font-extrabold leading-tight mb-4 tracking-tight">
                            {pageData.hero.tagline}
                        </h1>
                        <p className="text-base md:text-xl text-gray-200">
                           {pageData.hero.description}
                        </p>
                        <Button asChild size="lg" className="mt-8">
                            <Link href="#impact">
                                {pageData.hero.ctaText} <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                    </div>
                </section>

                {/* Social Proof Section */}
                <section className="py-12 bg-secondary/30">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-center text-sm font-semibold text-muted-foreground tracking-wider uppercase">
                           Trusted by leading global brands
                        </h2>
                        <div className="mt-6 grid grid-cols-2 gap-8 md:grid-cols-6 lg:grid-cols-5">
                             {pageData.socialProofLogos.map((logo, index) => (
                                <div key={index} className="col-span-1 flex justify-center lg:col-span-1">
                                    <Image
                                        className="h-10 w-auto object-contain"
                                        src={logo.logoUrl}
                                        alt={logo.name}
                                        width={158}
                                        height={48}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Problem Section */}
                <section className="py-16 md:py-24 bg-background">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground">{pageData.problem.title}</h2>
                        <p className="text-lg text-muted-foreground mt-4">{pageData.problem.description}</p>
                        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                            {pageData.problem.stats.map((stat, index) => (
                                <div key={index} className="p-6 bg-card rounded-lg shadow-sm">
                                    <h3 className="text-4xl font-extrabold text-primary">{stat.value}</h3>
                                    <p className="mt-2 text-muted-foreground">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Solution Section */}
                <section className="py-16 md:py-24 bg-secondary/30">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-foreground">{pageData.solution.title}</h2>
                            <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">{pageData.solution.description}</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                           {pageData.solution.innovations.map((item, index) => (
                            <Card key={index} className="bg-card/75 backdrop-blur-lg flex flex-col">
                                <CardHeader className="flex-row items-start gap-4">
                                     <div className="bg-primary/10 p-3 rounded-full">
                                        <Leaf className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-lg">{item.title}</CardTitle>
                                        <CardDescription>{item.description}</CardDescription>
                                    </div>
                                </CardHeader>
                            </Card>
                           ))}
                        </div>
                         <div className="mt-12 text-center">
                            <Button asChild size="lg" variant="outline">
                                <Link href="#">
                                    Try Our Eco-Configurator <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </section>

                {/* Impact Section */}
                <section id="impact" className="py-16 md:py-24 bg-background">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                         <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-foreground">{pageData.impact.title}</h2>
                            <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">{pageData.impact.description}</p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {pageData.impact.metrics.map((metric, index) => (
                                <Card key={index} className="text-center p-6">
                                     <h3 className="text-4xl font-extrabold text-primary">{metric.value}</h3>
                                    <p className="mt-2 text-muted-foreground">{metric.label}</p>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Certifications Section */}
                <section className="py-16 bg-secondary/30">
                     <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-3xl font-bold text-foreground">Certified Commitment to Excellence</h2>
                                <p className="mt-4 text-muted-foreground">Our operations are backed by globally recognized standards, ensuring quality, safety, and environmental responsibility in everything we do.</p>
                            </div>
                             <div className="grid grid-cols-3 gap-8">
                                {pageData.certifications.map((cert, index) => (
                                    <div key={index} className="flex flex-col items-center text-center">
                                        <div className="relative h-20 w-20">
                                        <Image src={cert.logoUrl} alt={cert.name} fill className="object-contain" />
                                        </div>
                                        <p className="mt-2 text-xs text-muted-foreground">{cert.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Contact & CTA Section */}
                <section className="py-16 md:py-24 bg-background">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                         <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-foreground">{pageData.cta.title}</h2>
                            <p className="text-lg text-muted-foreground mt-4">{pageData.cta.description}</p>
                        </div>
                        <Card>
                            <CardContent className="p-8">
                                <form onSubmit={handleContactSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="name">Full Name</Label>
                                            <Input id="name" name="name" placeholder="e.g., John Doe" required />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="email">Email Address</Label>
                                            <Input id="email" name="email" type="email" placeholder="e.g., john.doe@example.com" required />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="needs">Your Needs</Label>
                                        <Textarea id="needs" name="needs" placeholder="Tell us about your packaging requirements..." className="min-h-[120px]" required />
                                    </div>
                                     <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                                        {isSubmitting ? 'Sending...' : 'Let\'s Build Your Green Packaging'} <Send className="ml-2 h-4 w-4"/>
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </section>

            </main>
            <SiteFooter settings={settings} />
        </>
    );
}
