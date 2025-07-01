
'use server';

import { db, auth } from '@/lib/firebase';
import {
  collection,
  getDocs,
  query,
  serverTimestamp,
  doc,
  setDoc,
  getDoc
} from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export interface Member {
  id: string; // This will be the UID from Firebase Auth
  name: string;
  email: string;
  company: string;
  avatar: string;
  status: 'Active' | 'Inactive';
}

// Refactored to use Firebase Auth
export async function registerMember(name: string, email: string, company: string, password: string): Promise<{ success: boolean; message: string; }> {
  try {
    // Step 1: Create user in Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Step 2: Create a corresponding member document in Firestore
    const membersRef = doc(db, 'members', user.uid); // Use user.uid as the document ID
    await setDoc(membersRef, {
      name,
      email,
      company,
      avatar: `https://placehold.co/100x100.png`,
      status: 'Active',
      createdAt: serverTimestamp(),
    });

    return { success: true, message: 'Registration successful!' };
  } catch (error: any) {
    console.error('Error registering member:', error);
    // Provide more specific error messages
    if (error.code === 'auth/email-already-in-use') {
        return { success: false, message: 'This email address is already in use.' };
    }
    if (error.code === 'auth/weak-password') {
        return { success: false, message: 'The password is too weak. It should be at least 6 characters.' };
    }
    return { success: false, message: 'An unexpected error occurred during registration.' };
  }
}

// New function to get member profile data from Firestore
export async function getMemberProfile(uid: string): Promise<Member | null> {
    const memberDocRef = doc(db, 'members', uid);
    const docSnap = await getDoc(memberDocRef);
    if (docSnap.exists()) {
        const data = docSnap.data();
        return {
            id: docSnap.id,
            name: data.name,
            email: data.email,
            company: data.company,
            avatar: data.avatar,
            status: data.status,
        } as Member;
    }
    return null;
}

export async function getMembers(): Promise<Member[]> {
    const membersCol = collection(db, 'members');
    const memberSnapshot = await getDocs(membersCol);
    const memberList = memberSnapshot.docs.map(doc => {
        const data = doc.data();
        return {
            id: doc.id,
            name: data.name || '',
            email: data.email || '',
            company: data.company || '',
            avatar: data.avatar || 'https://placehold.co/100x100.png',
            status: data.status || 'Active',
        } as Member;
    });
    return memberList;
}
