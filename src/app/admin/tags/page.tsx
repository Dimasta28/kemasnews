
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function TagsRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the new, consolidated page with the tags tab active
    router.replace('/admin/media?tab=tags');
  }, [router]);

  return null; // Render nothing while redirecting
}
