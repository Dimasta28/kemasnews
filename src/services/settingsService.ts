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

export interface FrontendSettings {
  lightModeLogoUrl: string;
  darkModeLogoUrl: string;
  banner: BannerSettings;
}

const SETTINGS_DOC_ID = 'frontend';

// Get settings from Firestore
export async function getFrontendSettings(): Promise<FrontendSettings> {
  const settingsDocRef = doc(db, 'settings', SETTINGS_DOC_ID);
  const docSnap = await getDoc(settingsDocRef);

  if (docSnap.exists()) {
    // Merge fetched data with defaults to prevent errors if some fields are missing
    const data = docSnap.data();
    const defaults = {
      lightModeLogoUrl: 'https://www.kemaspkg.com/wp-content/uploads/2024/04/logo-baru-kemas-2023-01.png',
      darkModeLogoUrl: 'https://kemaspkg.com/media/wp-content/uploads/2024/04/logo-baru-kemas-2023-03.png',
      banner: {
        imageUrl: 'https://placehold.co/600x400.png',
        title: 'Our New Collection',
        description: 'Discover the latest in sustainable packaging.',
        buttonText: 'Learn More',
        buttonLink: '#',
      },
    };
    return {
      ...defaults,
      ...data,
      banner: {
        ...defaults.banner,
        ...(data.banner || {}),
      },
    } as FrontendSettings;
  } else {
    // Return default settings if document doesn't exist
    return {
      lightModeLogoUrl: 'https://www.kemaspkg.com/wp-content/uploads/2024/04/logo-baru-kemas-2023-01.png',
      darkModeLogoUrl: 'https://kemaspkg.com/media/wp-content/uploads/2024/04/logo-baru-kemas-2023-03.png',
      banner: {
        imageUrl: 'https://placehold.co/600x400.png',
        title: 'Our New Collection',
        description: 'Discover the latest in sustainable packaging.',
        buttonText: 'Learn More',
        buttonLink: '#',
      },
    };
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
