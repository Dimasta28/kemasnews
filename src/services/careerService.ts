'use server';

import { db } from '@/lib/firebase';
import {
  collection,
  doc,
  getDoc,
  setDoc,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  orderBy,
  query,
  Timestamp,
} from 'firebase/firestore';

export interface JobOpening {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  imageUrl?: string;
  qualifications?: string;
  createdAt: string;
}

export interface CompanyBenefit {
  title: string;
  description: string;
}

export interface CareerPageData {
  heroTitle: string;
  heroDescription: string;
  heroImageUrl: string;
  positionsTitle: string;
  positionsDescription: string;
  whyJoinTitle: string;
  whyJoinDescription: string;
  benefits: CompanyBenefit[];
}

const CAREER_PAGE_DOC_ID = 'career';

// Get all data for the career page (hero, benefits, etc.)
export async function getCareerPageData(): Promise<CareerPageData> {
  const docRef = doc(db, 'pages', CAREER_PAGE_DOC_ID);
  const docSnap = await getDoc(docRef);

  const defaults: CareerPageData = {
    heroTitle: 'Build The Future With Us',
    heroDescription: 'We\'re looking for passionate people to join our mission. Explore our open positions and find your place at PT. Kemas.',
    heroImageUrl: 'https://placehold.co/1920x1080.png',
    positionsTitle: 'Open Positions',
    positionsDescription: 'Find the role that\'s right for you. We\'re always looking for talented individuals to join our growing team.',
    whyJoinTitle: 'Why Join PT. Kemas?',
    whyJoinDescription: 'We\'re more than just a company. We\'re a community of innovators, thinkers, and creators.',
    benefits: [
      { title: 'Collaborative Culture', description: 'Work with a diverse and talented team that values open communication.' },
      { title: 'Health & Wellness', description: 'Comprehensive health insurance and wellness programs for you and your family.' },
      { title: 'Flexible Work', description: 'We offer flexible work hours and remote options to support work-life balance.' },
      { title: 'Career Growth', description: 'Opportunities for professional development, training, and career advancement.' },
    ],
  };

  if (docSnap.exists()) {
    const data = docSnap.data();
    // By explicitly picking properties, we avoid passing non-serializable
    // data like Firestore Timestamps to client components.
    const pageData: CareerPageData = {
        heroTitle: data.heroTitle || defaults.heroTitle,
        heroDescription: data.heroDescription || defaults.heroDescription,
        heroImageUrl: data.heroImageUrl || defaults.heroImageUrl,
        positionsTitle: data.positionsTitle || defaults.positionsTitle,
        positionsDescription: data.positionsDescription || defaults.positionsDescription,
        whyJoinTitle: data.whyJoinTitle || defaults.whyJoinTitle,
        whyJoinDescription: data.whyJoinDescription || defaults.whyJoinDescription,
        benefits: data.benefits && data.benefits.length > 0 ? data.benefits : defaults.benefits,
    };
    return pageData;
  } else {
    // If the document doesn't exist, create it with default values
    await setDoc(docRef, { ...defaults, createdAt: serverTimestamp() });
    return defaults;
  }
}

// Update the main career page data
export async function updateCareerPageData(data: Partial<CareerPageData>): Promise<void> {
  const docRef = doc(db, 'pages', CAREER_PAGE_DOC_ID);
  await setDoc(docRef, { ...data, updatedAt: serverTimestamp() }, { merge: true });
}

// Get all job openings
export async function getJobOpenings(): Promise<JobOpening[]> {
  const jobsCollection = collection(db, 'jobOpenings');
  const q = query(jobsCollection, orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  const jobs: JobOpening[] = snapshot.docs.map(doc => {
    const data = doc.data();
    const createdAt = (data.createdAt as Timestamp)?.toDate() || new Date();
    return {
      id: doc.id,
      title: data.title || '',
      department: data.department || '',
      location: data.location || '',
      type: data.type || '',
      imageUrl: data.imageUrl || '',
      qualifications: data.qualifications || '',
      createdAt: createdAt.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
    };
  });
  return jobs;
}

// Create a new job opening
export async function createJobOpening(jobData: Omit<JobOpening, 'id' | 'createdAt'>): Promise<string> {
  const docRef = await addDoc(collection(db, 'jobOpenings'), {
    ...jobData,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

// Update a job opening
export async function updateJobOpening(id: string, jobData: Partial<Omit<JobOpening, 'id' | 'createdAt'>>): Promise<void> {
  const docRef = doc(db, 'jobOpenings', id);
  await updateDoc(docRef, {
    ...jobData,
    updatedAt: serverTimestamp(),
  });
}

// Delete a job opening
export async function deleteJobOpening(id: string): Promise<void> {
  const docRef = doc(db, 'jobOpenings', id);
  await deleteDoc(docRef);
}
