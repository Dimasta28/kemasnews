
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { SiteFooter } from '@/components/site-footer';
import type { FrontendSettings } from '@/services/settingsService';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';
import type { GreenJourneyPageData } from '@/services/greenJourneyService';
import { HeroSection } from './_components/hero-section';
import { SocialProofSection } from './_components/social-proof-section';
import { ProblemSection } from './_components/problem-section';
import { SolutionSection } from './_components/solution-section';
import { ImpactSection } from './_components/impact-section';
import { CertificationsSection } from './_components/certifications-section';
import { CtaSection } from './_components/cta-section';
import { JourneyTimelineSection } from './_components/journey-timeline-section';
import { ResourcesSection } from './_components/resources-section';

interface GreenJourneyClientPageProps {
  pageData: GreenJourneyPageData | null;
  settings: FrontendSettings | null;
  error?: string | null;
}

export function GreenJourneyClientPage({ pageData, settings, error }: GreenJourneyClientPageProps) {
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

    return (
        <>
            <main>
                <HeroSection data={pageData.hero} />
                <SocialProofSection logos={pageData.socialProofLogos} />
                <ProblemSection data={pageData.problem} />
                <SolutionSection data={pageData.solution} />
                <ImpactSection data={pageData.impact} />
                <JourneyTimelineSection steps={pageData.journeyTimeline} />
                <CertificationsSection certifications={pageData.certifications} />
                <ResourcesSection resources={pageData.resources} />
                <CtaSection data={pageData.cta} />
            </main>
            <SiteFooter settings={settings} />
        </>
    );
}
