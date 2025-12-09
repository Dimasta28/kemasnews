
'use client';

import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { GreenJourneySubmission } from '@/services/greenJourneySubmissionService';
import { db } from '@/lib/firebase';
import { collection, onSnapshot, query, orderBy, Timestamp } from 'firebase/firestore';
import { format, parseISO } from 'date-fns';

interface SubmissionsClientProps {
  initialSubmissions: GreenJourneySubmission[];
}

export function SubmissionsClient({ initialSubmissions }: SubmissionsClientProps) {
  const [submissions, setSubmissions] = useState<GreenJourneySubmission[]>(initialSubmissions);

  useEffect(() => {
    const submissionsRef = collection(db, "greenJourneySubmissions");
    const q = query(submissionsRef, orderBy("submittedAt", "desc"));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
        const freshSubmissions = snapshot.docs.map(doc => {
            const data = doc.data();
            const date = (data.submittedAt as Timestamp)?.toDate() || new Date();
            return {
                id: doc.id,
                email: data.email,
                brandName: data.brandName,
                needs: data.needs,
                submittedAt: date.toISOString(),
            };
        });
        setSubmissions(freshSubmissions);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Green Journey Submissions</CardTitle>
        <CardDescription>
          Contacts who have shown interest in the sustainability program.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Brand Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="hidden sm:table-cell">Needs</TableHead>
              <TableHead className="text-right">Submitted At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {submissions.map((submission) => (
              <TableRow key={submission.id}>
                <TableCell className="font-medium">{submission.brandName}</TableCell>
                <TableCell>{submission.email}</TableCell>
                <TableCell className="hidden sm:table-cell">{submission.needs}</TableCell>
                <TableCell className="text-right">
                  {format(parseISO(submission.submittedAt), "dd LLL yyyy, HH:mm")}
                </TableCell>
              </TableRow>
            ))}
            {submissions.length === 0 && (
                <TableRow>
                    <TableCell colSpan={4} className="h-24 text-center">
                    No submissions found.
                    </TableCell>
                </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
