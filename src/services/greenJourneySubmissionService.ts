
'use server';

import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export interface GreenJourneySubmission {
  email: string;
  brandName: string;
  needs: string;
}

export async function submitGreenJourneyForm(data: GreenJourneySubmission): Promise<{ success: boolean; message: string; }> {
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
