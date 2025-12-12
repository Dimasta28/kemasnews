
'use server';

import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp, getDocs, query, orderBy, Timestamp } from 'firebase/firestore';

export interface GreenJourneySubmission {
  id: string;
  email: string;
  brandName: string;
  needs: string;
  submittedAt: string; // ISO String
}

export async function submitGreenJourneyForm(data: Omit<GreenJourneySubmission, 'id' | 'submittedAt'>): Promise<{ success: boolean; message: string; }> {
  try {
    if (!data.email || !data.brandName || !data.needs) {
      return { success: false, message: "All fields are required." };
    }

    const submissionsRef = collection(db, 'greenJourneySubmissions');
    await addDoc(submissionsRef, {
      email: data.email,
      brandName: data.brandName,
      needs: data.needs,
      submittedAt: serverTimestamp(),
    });

    return { success: true, message: "Submission received!" };
  } catch (error) {
    console.error("Error submitting green journey form:", error);
    return { success: false, message: 'An unexpected error occurred.' };
  }
}

export async function getGreenJourneySubmissions(): Promise<GreenJourneySubmission[]> {
    try {
        const submissionsRef = collection(db, 'greenJourneySubmissions');
        const q = query(submissionsRef, orderBy('submittedAt', 'desc'));
        const querySnapshot = await getDocs(q);

        const submissions = querySnapshot.docs.map(doc => {
            const data = doc.data();
            const date = (data.submittedAt as Timestamp)?.toDate() || new Date();
            return {
                id: doc.id,
                email: data.email,
                brandName: data.brandName,
                needs: data.needs,
                submittedAt: date.toISOString(),
            };
        });

        return submissions;
    } catch (error) {
        console.error("Error fetching green journey submissions:", error);
        return [];
    }
}
