'use server';

import { db } from '@/lib/firebase';
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  serverTimestamp,
  orderBy,
  query,
  Timestamp,
} from 'firebase/firestore';
import { getJobOpenings } from './careerService';

export interface Applicant {
  id: string;
  name: string;
  email: string;
  phone: string;
  resumeUrl: string;
  coverLetter: string;
  jobId: string;
  jobTitle: string;
  appliedAt: string; // Should be ISO string for client
}

export interface ApplicantData {
  name: string;
  email: string;
  phone: string;
  resumeUrl: string;
  coverLetter: string;
  jobId: string;
  jobTitle: string;
}

// Create a new applicant
export async function createApplicant(data: ApplicantData): Promise<{ success: boolean; message: string; }> {
  try {
    await addDoc(collection(db, 'applicants'), {
      ...data,
      appliedAt: serverTimestamp(),
    });
    return { success: true, message: 'Your application has been submitted successfully!' };
  } catch (error) {
    console.error("Error creating applicant:", error);
    return { success: false, message: 'An unexpected error occurred during submission.' };
  }
}

// Get all applicants (optimized)
export async function getApplicants(): Promise<Applicant[]> {
  const allJobs = await getJobOpenings();
  const jobTitleMap = new Map(allJobs.map(job => [job.id, job.title]));

  const applicantsCollection = collection(db, 'applicants');
  const q = query(applicantsCollection, orderBy('appliedAt', 'desc'));
  const snapshot = await getDocs(q);
  
  const applicants: Applicant[] = snapshot.docs.map((docSnapshot) => {
    const data = docSnapshot.data();
    const appliedAt = (data.appliedAt as Timestamp)?.toDate() || new Date();
    
    const jobTitle = jobTitleMap.get(data.jobId) || data.jobTitle || 'N/A';

    return {
      id: docSnapshot.id,
      name: data.name || '',
      email: data.email || '',
      phone: data.phone || '',
      resumeUrl: data.resumeUrl || '',
      coverLetter: data.coverLetter || '',
      jobId: data.jobId || '',
      jobTitle: jobTitle,
      appliedAt: appliedAt.toISOString(),
    };
  });
  return applicants;
}

// Delete an applicant
export async function deleteApplicant(id: string): Promise<void> {
  const docRef = doc(db, 'applicants', id);
  await deleteDoc(docRef);
}
