
'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, User as FirebaseUser, signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';

// Simplified user interface. No longer tied to a "Member" profile.
export interface AuthUser {
  id: string;
  email: string;
  name: string;
  avatar: string;
}

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        // User is signed in. Create a user object directly from Firebase Auth data.
        setUser({
          id: firebaseUser.uid,
          email: firebaseUser.email || '',
          name: firebaseUser.displayName || 'KEMAS',
          avatar: firebaseUser.photoURL || `https://placehold.co/100x100.png`,
        });
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
