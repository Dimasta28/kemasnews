'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { type JobOpening } from '@/services/careerService';
import { type Department } from '@/services/departmentService';
import { JobOpeningsTable } from './job-openings-table';
import { DepartmentsTable } from './departments-table';
import { db } from '@/lib/firebase';
import { collection, query, orderBy, onSnapshot, Timestamp } from 'firebase/firestore';

interface JobOpeningsClientProps {
  initialJobOpenings: JobOpening[];
  initialDepartments: Department[];
}

export function JobOpeningsClient({ initialJobOpenings, initialDepartments }: JobOpeningsClientProps) {
  const searchParams = useSearchParams();
  const defaultTab = searchParams.get('tab') === 'departments' ? 'departments' : 'jobs';

  const [jobOpenings, setJobOpenings] = useState<JobOpening[]>(initialJobOpenings);
  const [departments, setDepartments] = useState<Department[]>(initialDepartments);

  useEffect(() => {
    // Listener for Job Openings
    const jobsCollection = collection(db, 'jobOpenings');
    const qJobs = query(jobsCollection, orderBy('createdAt', 'desc'));
    
    const unsubscribeJobs = onSnapshot(qJobs, (snapshot) => {
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

    // Listener for Departments
    const depsCollection = collection(db, 'departments');
    const qDeps = query(depsCollection, orderBy('name', 'asc'));
    const unsubscribeDeps = onSnapshot(qDeps, (snapshot) => {
      const freshDepartments = snapshot.docs.map(doc => ({
        id: doc.id,
        name: doc.data().name || '',
        slug: doc.data().slug || '',
      }));
      setDepartments(freshDepartments);
    });

    return () => {
      unsubscribeJobs();
      unsubscribeDeps();
    };
  }, []);

  return (
    <Tabs defaultValue={defaultTab}>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Recruitment</h1>
          <p className="text-muted-foreground">Manage job openings and their respective departments.</p>
        </div>
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger value="jobs" className="w-full sm:w-auto">Job Openings</TabsTrigger>
          <TabsTrigger value="departments" className="w-full sm:w-auto">Departments</TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="jobs">
        <Card>
          <CardHeader>
            <CardTitle>Job Openings</CardTitle>
            <CardDescription>Create, edit, and manage the list of available jobs.</CardDescription>
          </CardHeader>
          <CardContent>
            <JobOpeningsTable jobs={jobOpenings} />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="departments">
        <Card>
          <CardHeader>
            <CardTitle>Departments</CardTitle>
            <CardDescription>Manage the departments used to categorize job openings.</CardDescription>
          </CardHeader>
          <CardContent>
            <DepartmentsTable departments={departments} />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
