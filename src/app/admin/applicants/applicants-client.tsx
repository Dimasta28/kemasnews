'use client';

import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { Applicant } from '@/services/applicantService';
import { ApplicantsTable } from './applicants-table';
import { db } from '@/lib/firebase';
import { collection, onSnapshot, query, orderBy, Timestamp } from 'firebase/firestore';

interface ApplicantsClientProps {
  initialApplicants: Applicant[];
}

export function ApplicantsClient({ initialApplicants }: ApplicantsClientProps) {
  const [applicants, setApplicants] = useState<Applicant[]>(initialApplicants);

  useEffect(() => {
    const q = query(collection(db, 'applicants'), orderBy('appliedAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const freshApplicants = snapshot.docs.map(doc => {
        const data = doc.data();
        const appliedAt = (data.appliedAt as Timestamp)?.toDate() || new Date();
        return {
          id: doc.id,
          name: data.name || '',
          email: data.email || '',
          phone: data.phone || '',
          resumeUrl: data.resumeUrl || '',
          coverLetter: data.coverLetter || '',
          jobId: data.jobId || '',
          jobTitle: data.jobTitle || 'N/A',
          appliedAt: appliedAt.toISOString(),
        };
      });
      setApplicants(freshApplicants);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Job Applicants</CardTitle>
        <CardDescription>
          A list of all candidates who have applied for jobs.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ApplicantsTable applicants={applicants} />
      </CardContent>
    </Card>
  );
}
