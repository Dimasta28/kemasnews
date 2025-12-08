
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CategoriesRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the new, consolidated page with the categories tab active
    router.replace('/admin/media?tab=categories');
  }, [router]);

  return null; // Render nothing while redirecting
}
