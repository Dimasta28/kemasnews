
'use server';

import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

export interface BannerSettings {
  imageUrl: string;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

export interface NavigationLink {
    title: string;
    description: string;
    href: string;
}

export interface FrontendSettings {
  lightModeLogoUrl: string;
  darkModeLogoUrl: string;
  banner: BannerSettings;
  dropdownLinks: NavigationLink[];
}

const SETTINGS_DOC_ID = 'frontend';

// Get settings from Firestore
export async function getFrontendSettings(): Promise<FrontendSettings> {
  const settingsDocRef = doc(db, 'settings', SETTINGS_DOC_ID);
  const docSnap = await getDoc(settingsDocRef);

  const defaults: FrontendSettings = {
    lightModeLogoUrl: 'https://www.kemaspkg.com/wp-content/uploads/2024/04/logo-baru-kemas-2023-01.png',
    darkModeLogoUrl: 'https://kemaspkg.com/media/wp-content/uploads/2024/04/logo-baru-kemas-2023-03.png',
    banner: {
      imageUrl: 'https://placehold.co/600x400.png',
      title: 'Our New Collection',
      description: 'Discover the latest in sustainable packaging.',
      buttonText: 'Learn More',
      buttonLink: '#',
    },
    dropdownLinks: [
        { href: "#", title: "About Us", description: "Get to know who we are and what we stand for." },
        { href: "#", title: "Our Story", description: "The journey behind PT. Kemas — from foundation to innovation." },
        { href: "#", title: "Vision & Mission", description: "Our long-term goals and guiding principles." },
        { href: "#", title: "Leadership Team", description: "Meet the people behind the company." },
        { href: "#", title: "Facilities & Capabilities", description: "Explore our production sites and technological edge." },
        { href: "#", title: "Certifications & Standards", description: "Our quality, safety, and sustainability accreditations." },
        { href: "#", title: "Sustainability Commitment", description: "Our quest for eco-friendlier packaging and carbon reduction." },
        { href: "#", title: "Awards & Recognition", description: "Milestones and achievements we’re proud of." },
        { href: "#", title: "News & Media", description: "Press releases, events, and media coverage." },
        { href: "#", title: "Contact Us", description: "Reach out to our team or find our locations." },
    ]
  };

  if (docSnap.exists()) {
    const data = docSnap.data();
    // By explicitly picking properties, we avoid passing non-serializable
    // data like Firestore Timestamps to client components.
    const settings: FrontendSettings = {
        lightModeLogoUrl: data.lightModeLogoUrl || defaults.lightModeLogoUrl,
        darkModeLogoUrl: data.darkModeLogoUrl || defaults.darkModeLogoUrl,
        banner: {
            ...defaults.banner,
            ...(data.banner || {}),
        },
        dropdownLinks: data.dropdownLinks && data.dropdownLinks.length > 0 ? data.dropdownLinks : defaults.dropdownLinks,
    };
    return settings;
  } else {
    // If the document doesn't exist, create it with default values
    await setDoc(settingsDocRef, { ...defaults, createdAt: serverTimestamp() });
    return defaults;
  }
}

// Update settings in Firestore
export async function updateFrontendSettings(settings: Partial<FrontendSettings>): Promise<void> {
  const settingsDocRef = doc(db, 'settings', SETTINGS_DOC_ID);
  try {
    // Using setDoc with merge: true is like an "upsert"
    await setDoc(settingsDocRef, { ...settings, updatedAt: serverTimestamp() }, { merge: true });
  } catch (error) {
    console.error("Error updating settings: ", error);
    throw new Error("Could not update settings");
  }
}
