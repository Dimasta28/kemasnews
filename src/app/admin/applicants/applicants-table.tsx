'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { Applicant } from '@/services/applicantService';
import { ApplicantActions } from './applicant-actions';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

interface ApplicantsTableProps {
  applicants: Applicant[];
}

export function ApplicantsTable({ applicants }: ApplicantsTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Applicant</TableHead>
            <TableHead className="hidden sm:table-cell">Contact</TableHead>
            <TableHead className="hidden md:table-cell">Applied For</TableHead>
            <TableHead className="hidden lg:table-cell">Date Applied</TableHead>
            <TableHead className="text-center">Resume</TableHead>
            <TableHead><span className="sr-only">Actions</span></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicants.length > 0 ? applicants.map((applicant) => (
            <TableRow key={applicant.id}>
              <TableCell className="font-medium">{applicant.name}</TableCell>
              <TableCell className="hidden sm:table-cell text-muted-foreground">
                <div>{applicant.email}</div>
                <div>{applicant.phone}</div>
              </TableCell>
              <TableCell className="hidden md:table-cell">{applicant.jobTitle}</TableCell>
              <TableCell className="hidden lg:table-cell">{applicant.appliedAt}</TableCell>
              <TableCell className="text-center">
                <Button variant="outline" size="sm" asChild>
                  <a href={applicant.resumeUrl} target="_blank" rel="noopener noreferrer">
                    View <ExternalLink className="ml-2 h-3 w-3" />
                  </a>
                </Button>
              </TableCell>
              <TableCell className="text-right">
                <ApplicantActions applicantId={applicant.id} />
              </TableCell>
            </TableRow>
          )) : (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">No applicants found.</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
