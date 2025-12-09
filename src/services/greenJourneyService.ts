
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
    iconName: string;
}

export interface SolutionSection {
    title: string;
    description: string;
    ctaText: string;
    ctaLink: string;
    innovations: Innovation[];
}

export interface ImpactMetric {
    value: number;
    label: string;
    prefix?: string;
    suffix?: string;
    iconName: string;
}

export interface ImpactSection {
    title: string;
    description: string;
    metrics: ImpactMetric[];
}

export interface JourneyStep {
    year: string;
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
    buttonText: string;
}

export interface Resource {
    title: string;
    description: string;
    link: string;
    iconName: string;
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

const GREEN_JOURNEY_DOC_ID = 'green-journey-data';

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
        { name: "L'Oréal", logoUrl: "https://picsum.photos/seed/loreal/158/48" },
        { name: "Unilever", logoUrl: "https://picsum.photos/seed/unilever/158/48" },
        { name: "P&G", logoUrl: "https://picsum.photos/seed/pg/158/48" },
        { name: "Estée Lauder", logoUrl: "https://picsum.photos/seed/estee/158/48" },
        { name: "Shiseido", logoUrl: "https://picsum.photos/seed/shiseido/158/48" },
    ],
    problem: {
        title: "GREEN PROBLEM",
        description: "Climate change includes both global warming driven by human-induced emissions of greenhouse gases and the resulting large-scale shifts in weather patterns. Though there have been previous periods of climatic change, since the mid-20th century humans have had an unprecedented impact on Earth's climate system and caused change on a global scale. And it's becoming more real at this point, the melt of arctic ice, big flood in Germany, Greece forest fire are fine examples of how these incidents are threatening human life.",
        stats: []
    },
    solution: {
        title: "Innovation-Driven Sustainable Solutions",
        description: "We're pioneering the next generation of eco-friendly packaging without compromising on quality or aesthetics. Our solutions are designed for a circular economy.",
        ctaText: "Try Our Eco-Configurator",
        ctaLink: "#",
        innovations: [
            { title: "Recyclable Mono-Materials", description: "Creating premium packaging from a single, fully recyclable polymer.", iconName: "Recycle" },
            { title: "Refillable Systems", description: "Designing elegant and user-friendly refill formats that reduce waste by up to 80%.", iconName: "Replace" },
            { title: "Bio-Based Polymers", description: "Utilizing materials derived from renewable resources like sugarcane and corn.", iconName: "Leaf" },
        ]
    },
    impact: {
        title: "Powering The Future With The Renew",
        description: "By partnering with us, brands are making a measurable difference for the planet. Here's what we've achieved together so far.",
        metrics: [
            { value: 6561, label: "Team members", iconName: 'Recycle' },
            { value: 600, label: "Completed Projects", iconName: 'Briefcase' },
            { value: 250, label: "Winning award", iconName: 'Award' },
            { value: 590, label: "Clients Review", iconName: 'Star' },
        ]
    },
    journeyTimeline: [
        { year: "2018", title: "First 100% PCR PET Bottle", description: "Launched our first packaging solution made entirely from Post-Consumer Recycled PET." },
        { year: "2020", title: "Solar Power Transition", description: "Our main manufacturing facility transitioned to be powered 50% by solar energy." },
        { year: "2022", title: "Refillable Systems Patent", description: "Patented a new lock-and-load refillable system, reducing plastic use by 70% per unit." },
        { year: "2024", title: "Water Recycling Program", description: "Implemented a closed-loop water system, recycling 90% of water used in production." },
    ],
    certifications: [
        { name: "ISO 9001", logoUrl: "https://picsum.photos/seed/iso9001/100/100", description: "Quality Management" },
        { name: "ISO 14001", logoUrl: "https://picsum.photos/seed/iso14001/100/100", description: "Environmental Management" },
        { name: "FSC", logoUrl: "https://picsum.photos/seed/fsc/100/100", description: "Sustainable Forestry" },
    ],
    cta: {
        title: "Ready to Start Your Green Journey?",
        description: "Let's collaborate to create beautiful, sustainable packaging that resonates with today's conscious consumer. Tell us about your project, and our experts will get in touch.",
        buttonText: "Let's Build Your Green Packaging",
    },
    resources: [
        { title: "2024 Sustainability Report", description: "An in-depth look at our goals, progress, and future plans.", link: "#", iconName: "Book" },
        { title: "Mono-Material Design Guide", description: "Technical specifications and best practices for recyclable packaging.", link: "#", iconName: "FileText" },
        { title: "Lifecycle Analysis Whitepaper", description: "Comparative data on the environmental impact of different materials.", link: "#", iconName: "Download" },
    ],
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
