
'use server';

import { db } from '@/lib/firebase';
import {
  collection,
  getDocs,
  doc,
  getDoc
} from 'firebase/firestore';

export interface Member {
  id: string; // This will be the UID from Firebase Auth
  name: string;
  email: string;
  company: string;
  avatar: string;
  status: 'Active' | 'Inactive';
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
