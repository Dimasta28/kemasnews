'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DepartmentsRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the new, consolidated page with the departments tab active
    router.replace('/admin/job-openings?tab=departments');
  }, [router]);

  return null; // Render nothing while redirecting
}
