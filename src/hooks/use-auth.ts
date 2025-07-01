
'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, User as FirebaseUser, signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { getMemberProfile, type Member } from '@/services/memberService';

export interface AuthUser extends Member {}

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        // User is signed in, try to fetch the detailed profile from Firestore
        const profile = await getMemberProfile(firebaseUser.uid);
        
        if (profile) {
          // If a full profile exists, use it
          setUser(profile);
        } else {
          // If no profile exists, create a basic user object from the auth data.
          // This ensures that any authenticated user can access the admin panel.
          setUser({
            id: firebaseUser.uid,
            email: firebaseUser.email || '',
            name: firebaseUser.displayName || 'Admin',
            company: '',
            avatar: firebaseUser.photoURL || `https://placehold.co/100x100.png`,
            status: 'Active',
          });
        }
      } else {
        // User is signed out
        setUser(null);
      }
      setIsLoading(false);
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  const logout = useCallback(async () => {
    await signOut(auth);
    // After logout, always redirect to the login page.
    router.push('/login');
  }, [router]);

  return { user, logout, isLoading };
}
