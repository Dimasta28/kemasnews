'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { type JobOpening } from '@/services/careerService';
import { JobOpeningsTable } from './job-openings-table';
import { db } from '@/lib/firebase';
import { collection, query, orderBy, onSnapshot, Timestamp } from 'firebase/firestore';

interface JobOpeningsClientProps {
  initialJobOpenings: JobOpening[];
}

export function JobOpeningsClient({ initialJobOpenings }: JobOpeningsClientProps) {
  const [jobOpenings, setJobOpenings] = useState<JobOpening[]>(initialJobOpenings);

  useEffect(() => {
    const jobsCollection = collection(db, 'jobOpenings');
    const q = query(jobsCollection, orderBy('createdAt', 'desc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const freshJobs: JobOpening[] = snapshot.docs.map(doc => {
        const data = doc.data();
        const createdAt = (data.createdAt as Timestamp)?.toDate() || new Date();
        return {
          id: doc.id,
          title: data.title || '',
          department: data.department || '',
          location: data.location || '',
          type: data.type || '',
          imageUrl: data.imageUrl || '',
          qualifications: data.qualifications || '',
          createdAt: createdAt.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }),
        };
      });
      setJobOpenings(freshJobs);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Job Openings</CardTitle>
        <CardDescription>Manage the list of available jobs. Create new positions or edit existing ones.</CardDescription>
      </CardHeader>
      <CardContent>
        <JobOpeningsTable jobs={jobOpenings} />
      </CardContent>
    </Card>
  );
}
