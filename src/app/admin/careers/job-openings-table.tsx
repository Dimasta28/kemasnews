
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { MoreHorizontal, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { useToast } from '@/hooks/use-toast';
import { deleteJobOpening, type JobOpening } from '@/services/careerService';
import { JobOpeningDialog } from './job-opening-dialog';

interface JobOpeningsTableProps {
  initialJobs: JobOpening[];
  onJobsChange: () => void;
}

export function JobOpeningsTable({ initialJobs, onJobsChange }: JobOpeningsTableProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<JobOpening | null>(null);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [jobToDelete, setJobToDelete] = useState<string | null>(null);
  const { toast } = useToast();

  const handleCreate = () => {
    setSelectedJob(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (job: JobOpening) => {
    setSelectedJob(job);
    setIsDialogOpen(true);
  };

  const confirmDelete = (id: string) => {
    setJobToDelete(id);
    setIsAlertOpen(true);
  };

  const handleDelete = async () => {
    if (!jobToDelete) return;
    try {
      await deleteJobOpening(jobToDelete);
      toast({ title: 'Success!', description: 'Job opening deleted.' });
      onJobsChange(); // Refresh the list from parent
    } catch (error) {
      console.error('Failed to delete job:', error);
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to delete job.' });
    }
    setIsAlertOpen(false);
    setJobToDelete(null);
  };

  return (
    <>
      <div className="flex justify-end mb-4">
        <Button size="sm" onClick={handleCreate}>
          <PlusCircle className="mr-2 h-4 w-4" /> Create Job
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Date Created</TableHead>
              <TableHead><span className="sr-only">Actions</span></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {initialJobs.length > 0 ? initialJobs.map((job) => (
              <TableRow key={job.id}>
                <TableCell>
                  <Image
                    src={job.imageUrl || 'https://placehold.co/64x64.png'}
                    alt={job.title}
                    width={64}
                    height={64}
                    className="rounded-md object-cover"
                    data-ai-hint="office workspace"
                  />
                </TableCell>
                <TableCell className="font-medium">{job.title}</TableCell>
                <TableCell>{job.department}</TableCell>
                <TableCell>{job.location}</TableCell>
                <TableCell>{job.type}</TableCell>
                <TableCell>{job.createdAt}</TableCell>
                <TableCell className="text-right">
                   <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEdit(job)}>Edit</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10" onClick={() => confirmDelete(job.id)}>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            )) : (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">No job openings found.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      <JobOpeningDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onJobSaved={onJobsChange}
        job={selectedJob}
      />

      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>This action cannot be undone. This will permanently delete the job opening.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
