
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function PostsRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the new, consolidated page with the media tab active
    router.replace('/admin/media');
  }, [router]);

  return null; // Render nothing while redirecting
}
