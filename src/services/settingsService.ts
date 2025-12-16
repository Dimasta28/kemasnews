
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

export interface FooterSettings {
  copyrightText: string;
  facebookUrl: string;
  instagramUrl: string;
  linkedinUrl: string;
  footerLogoUrl: string;
}

export interface FrontendSettings {
  lightModeLogoUrl: string;
  darkModeLogoUrl: string;
  homepageBanner: BannerSettings;
  sidebarBanner: BannerSettings;
  dropdownLinks: NavigationLink[];
  privacyPolicy: string;
  ogTitle: string;
  ogDescription: string;
  ogImageUrl: string;
  heroImageUrl: string;
  heroPostIds: string[];
  footer: FooterSettings;
  solutionsProductCategoryImageUrl: string;
  solutionsGreenInnovationImageUrl: string;
  solutionsDecorationImageUrl: string;
  greenFootprintWaterImageUrl: string;
  greenFootprintEnergyImageUrl: string;
  greenFootprintWasteImageUrl: string;
  greenFootprintLimexImageUrl: string;
  greenFootprintRecycledImageUrl: string;
}

const SETTINGS_DOC_ID = 'frontend';

// Get settings from Firestore
export async function getFrontendSettings(): Promise<FrontendSettings> {
  const settingsDocRef = doc(db, 'settings', SETTINGS_DOC_ID);
  const docSnap = await getDoc(settingsDocRef);

  const defaults: FrontendSettings = {
    lightModeLogoUrl: 'https://www.kemaspkg.com/wp-content/uploads/2024/04/logo-baru-kemas-2023-01.png',
    darkModeLogoUrl: 'https://kemaspkg.com/media/wp-content/uploads/2024/04/logo-baru-kemas-2023-03.png',
    heroImageUrl: 'https://idicdhrghiqmqtocapwq.supabase.co/storage/v1/object/public/Kemas%20green%20jurney/Home/Web%20Kemas%20GREEN%20JOURNEY%20DESIGN%202.jpg',
    homepageBanner: {
      imageUrl: 'https://placehold.co/1200x450.png',
      title: 'Homepage Banner Title',
      description: 'Engaging description for the homepage banner.',
      buttonText: 'Explore Now',
      buttonLink: '#',
    },
    sidebarBanner: {
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
    ],
    privacyPolicy: `<h1>Who we are</h1><p>PT KEMAS is a fully integrated Global Beauty Packaging manufacturer with factories located in Jakarta – Indonesia, with sales office around the world. Since 1980, Kemas has built itself a reputation for delivering high-quality components and service to its customers around the world.</p><p>Our factory and equipment are built with ‘QUALITY’ in mind. Utilizing European and Japanese technology, we have incorporated state-of-the-art injection molding machines, metal manufacturing facilities, in-house workshops, dedicated in-house products, process, and automation engineers, automation assembly, and unique decoration capabilities.</p><h2>Comments</h2><p>When visitors leave comments on the site we collect the data shown in the comments form, and also the visitor’s IP address and browser user agent string to help spam detection.</p><p>An anonymized string created from your email address (also called a hash) may be provided to the Gravatar service to see if you are using it. After approval of your comment, your profile picture is visible to the public in the context of your comment.</p><h2>Media</h2><p>If you upload images to the website, you should avoid uploading images with embedded location data (EXIF GPS) included. Visitors to the website can download and extract any location data from images on the website.</p><h2>Cookies</h2><p>If you leave a comment on our site you may opt-in to saving your name, email address and website in cookies. These are for your convenience so that you do not have to fill in your details again when you leave another comment. These cookies will last for one year.</p><p>If you visit our login page, we will set a temporary cookie to determine if your browser accepts cookies. This cookie contains no personal data and is discarded when you close your browser.</p><p>When you log in, we will also set up several cookies to save your login information and your screen display choices. Login cookies last for two days, and screen options cookies last for a year. If you select “Remember Me”, your login will persist for two weeks. If you log out of your account, the login cookies will be removed.</p><p>If you edit or publish an article, an additional cookie will be saved in your browser. This cookie includes no personal data and simply indicates the post ID of the article you just edited. It expires after 1 day.</p><h2>Embedded content from other websites</h2><p>Articles on this site may include embedded content (e.g. videos, images, articles, etc.). Embedded content from other websites behaves in the exact same way as if the visitor has visited the other website.</p><p>These websites may collect data about you, use cookies, embed additional third-party tracking, and monitor your interaction with that embedded content, including tracking your interaction with the embedded content if you have an account and are logged in to that website.</p><h2>How long we retain your data</h2><p>If you leave a comment, the comment and its metadata are retained indefinitely. This is so we can recognize and approve any follow-up comments automatically instead of holding them in a moderation queue.</p><p>For users that register on our website (if any), we also store the personal information they provide in their user profile. All users can see, edit, or delete their personal information at any time (except they cannot change their username). Website administrators can also see and edit that information.</p><h2>What rights you have over your data</h2><p>If you have an account on this site, or have left comments, you can request to receive an exported file of the personal data we hold about you, including any data you have provided to us. You can also request that we erase any personal data we hold about you. This does not include any data we are obliged to keep for administrative, legal, or security purposes.</p><h2>Where we send your data</h2><p>Visitor comments may be checked through an automated spam detection service.</p>`,
    ogTitle: 'Wellcome | Pt Kemas Indah Maju',
    ogDescription: 'Since 1980, KEMAS delivers premium plastic & metal cosmetic packaging with European & Japanese tech.',
    ogImageUrl: 'https://ddujuwmrnfufdqnvgaqb.supabase.co/storage/v1/object/public/catalogimage2025tes//logo%20kemas%20%20(3).png',
    heroPostIds: [],
    footer: {
      copyrightText: '© 2025 PT. Kemas. All Rights Reserved.',
      facebookUrl: '#',
      instagramUrl: '#',
      linkedinUrl: '#',
      footerLogoUrl: 'https://kemaspkg.com/media/wp-content/uploads/2024/04/logo-baru-kemas-2023-03.png',
    },
    solutionsProductCategoryImageUrl: "https://images.pexels.com/photos/2533266/pexels-photo-2533266.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    solutionsGreenInnovationImageUrl: "https://idicdhrghiqmqtocapwq.supabase.co/storage/v1/object/public/Kemas%_20green%20jurney/Home/Web%20Kemas%20GREEN%20JOURNEY%20DESIGN%203.jpg",
    solutionsDecorationImageUrl: "https://idicdhrghiqmqtocapwq.supabase.co/storage/v1/object/public/Kemas%_20green%20jurney/Home/Web%20Kemas%20GREEN%20JOURNEY%20DESIGN%205.jpg",
    greenFootprintWaterImageUrl: 'https://picsum.photos/seed/water-recycling/800/600',
    greenFootprintEnergyImageUrl: 'https://picsum.photos/seed/energy-efficiency/800/600',
    greenFootprintWasteImageUrl: 'https://picsum.photos/seed/waste-management/800/600',
    greenFootprintLimexImageUrl: 'https://picsum.photos/seed/limex/800/600',
    greenFootprintRecycledImageUrl: 'https://picsum.photos/seed/recycled/800/600',
  };

  if (docSnap.exists()) {
    return { ...defaults, ...docSnap.data() };
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
