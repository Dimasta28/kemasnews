'use server';

import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, query, where, serverTimestamp } from 'firebase/firestore';

export interface Member {
  id: string;
  name: string;
  email: string;
  company: string;
  avatar: string;
  status: 'Active' | 'Inactive';
}

export async function registerMember(name: string, email: string, company: string) {
  try {
    const membersRef = collection(db, 'members');
    const q = query(membersRef, where('email', '==', email));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      return { success: false, message: 'Email already registered.' };
    }

    await addDoc(membersRef, {
      name,
      email,
      company,
      avatar: `https://placehold.co/100x100.png`,
      status: 'Active',
      createdAt: serverTimestamp(),
    });

    return { success: true, message: 'Registration successful!' };
  } catch (error) {
    console.error('Error registering member:', error);
    return { success: false, message: 'An unexpected error occurred.' };
  }
}

export async function findMemberByEmail(email: string): Promise<{ success: boolean; member?: Member; message?: string }> {
  try {
    const membersRef = collection(db, 'members');
    const q = query(membersRef, where('email', '==', email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return { success: false, message: 'No member found with this email.' };
    }

    const doc = querySnapshot.docs[0];
    const data = doc.data();
    const member: Member = {
      id: doc.id,
      name: data.name,
      email: data.email,
      company: data.company,
      avatar: data.avatar,
      status: data.status,
    };

    return { success: true, member };
  } catch (error) {
    console.error('Error finding member:', error);
    return { success: false, message: 'An unexpected error occurred.' };
  }
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
