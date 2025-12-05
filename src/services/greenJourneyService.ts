
'use server';

import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

export interface HeroSection {
  tagline: string;
  description: string;
  ctaText: string;
  videoUrl: string;
}

export interface SocialProofLogo {
  name: string;
  logoUrl: string;
}

export interface ProblemStat {
    value: string;
    label: string;
}

export interface ProblemSection {
    title: string;
    description: string;
    stats: ProblemStat[];
}

export interface Innovation {
    title: string;
    description: string;
}

export interface SolutionSection {
    title: string;
    description: string;
    innovations: Innovation[];
}

export interface ImpactMetric {
    value: string;
    label: string;
}

export interface ImpactSection {
    title: string;
    description: string;
    metrics: ImpactMetric[];
}

export interface JourneyStep {
    title: string;
    description: string;
}

export interface Certification {
    name: string;
    logoUrl: string;
    description: string;
}

export interface CtaSection {
    title: string;
    description: string;
}

export interface Resource {
    title: string;
    description: string;
    link: string;
}

export interface GreenJourneyPageData {
  hero: HeroSection;
  socialProofLogos: SocialProofLogo[];
  problem: ProblemSection;
  solution: SolutionSection;
  impact: ImpactSection;
  journeyTimeline: JourneyStep[];
  certifications: Certification[];
  cta: CtaSection;
  resources: Resource[];
}

const GREEN_JOURNEY_DOC_ID = 'green-journey';

// Get all data for the green journey page
export async function getGreenJourneyPageData(): Promise<GreenJourneyPageData> {
  const docRef = doc(db, 'pages', GREEN_JOURNEY_DOC_ID);
  const docSnap = await getDoc(docRef);

  const defaults: GreenJourneyPageData = {
    hero: {
        tagline: "From Waste to Worth",
        description: "Join us on a mission to reshape the future of packaging, one sustainable choice at a time.",
        ctaText: "Explore Our Impact",
        videoUrl: "https://videos.pexels.com/video-files/3214533/3214533-hd_1920_1080_25fps.mp4",
    },
    socialProofLogos: [
        { name: "Brand A", logoUrl: "https://via.placeholder.com/150x50/ffffff/000000?text=Logo+A" },
        { name: "Brand B", logoUrl: "https://via.placeholder.com/150x50/ffffff/000000?text=Logo+B" },
        { name: "Brand C", logoUrl: "https://via.placeholder.com/150x50/ffffff/000000?text=Logo+C" },
        { name: "Brand D", logoUrl: "https://via.placeholder.com/150x50/ffffff/000000?text=Logo+D" },
        { name: "Brand E", logoUrl: "https://via.placeholder.com/150x50/ffffff/000000?text=Logo+E" },
    ],
    problem: {
        title: "The Plastic Problem is Real. The Time to Act is Now.",
        description: "Every year, millions of tons of plastic waste pollute our ecosystems. The beauty industry plays a significant role, but together, we can lead the change.",
        stats: [
            { value: "8M Tons", label: "of plastic enter oceans annually" },
            { value: "91%", label: "of plastic is never recycled" },
            { value: "40%", label: "of plastic is single-use" },
        ]
    },
    solution: {
        title: "Innovation-Driven Sustainable Solutions",
        description: "We're pioneering the next generation of eco-friendly packaging without compromising on quality or aesthetics. Our solutions are designed for a circular economy.",
        innovations: [
            { title: "Recyclable Mono-Materials", description: "Creating premium packaging from a single, fully recyclable polymer." },
            { title: "Refillable Systems", description: "Designing elegant and user-friendly refill formats that reduce waste by up to 80%." },
            { title: "Bio-Based Polymers", description: "Utilizing materials derived from renewable resources like sugarcane and corn." },
        ]
    },
    impact: {
        title: "Our Collective Impact, Quantified",
        description: "By partnering with us, brands are making a measurable difference for the planet. Here's what we've achieved together so far.",
        metrics: [
            { value: "1,200 Tons", label: "Virgin Plastic Saved" },
            { value: "5,500 Tons", label: "CO2 Emissions Reduced" },
            { value: "30M Liters", label: "Water Conserved" },
            { value: "95%", label: "Recyclability Rate Achieved" },
        ]
    },
    journeyTimeline: [],
    certifications: [
        { name: "ISO 9001", logoUrl: "https://picsum.photos/seed/iso9001/100/100", description: "Quality Management" },
        { name: "ISO 14001", logoUrl: "https://picsum.photos/seed/iso14001/100/100", description: "Environmental Management" },
        { name: "FSC", logoUrl: "https://picsum.photos/seed/fsc/100/100", description: "Sustainable Forestry" },
    ],
    cta: {
        title: "Ready to Start Your Green Journey?",
        description: "Let's collaborate to create beautiful, sustainable packaging that resonates with today's conscious consumer. Tell us about your project, and our experts will get in touch."
    },
    resources: [],
  };

  if (docSnap.exists()) {
    const data = docSnap.data();
    // Merge fetched data with defaults to ensure all fields are present
    const pageData: GreenJourneyPageData = {
        hero: { ...defaults.hero, ...data.hero },
        socialProofLogos: data.socialProofLogos?.length ? data.socialProofLogos : defaults.socialProofLogos,
        problem: { ...defaults.problem, ...data.problem, stats: data.problem?.stats?.length ? data.problem.stats : defaults.problem.stats },
        solution: { ...defaults.solution, ...data.solution, innovations: data.solution?.innovations?.length ? data.solution.innovations : defaults.solution.innovations },
        impact: { ...defaults.impact, ...data.impact, metrics: data.impact?.metrics?.length ? data.impact.metrics : defaults.impact.metrics },
        journeyTimeline: data.journeyTimeline?.length ? data.journeyTimeline : defaults.journeyTimeline,
        certifications: data.certifications?.length ? data.certifications : defaults.certifications,
        cta: { ...defaults.cta, ...data.cta },
        resources: data.resources?.length ? data.resources : defaults.resources,
    };
    return pageData;
  } else {
    // If the document doesn't exist, create it with default values
    await setDoc(docRef, { ...defaults, createdAt: serverTimestamp() });
    return defaults;
  }
}
