
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
        // User is signed in, fetch profile
        const profile = await getMemberProfile(firebaseUser.uid);
        setUser(profile);
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
    router.refresh();
  }, [router]);

  return { user, logout, isLoading };
}
