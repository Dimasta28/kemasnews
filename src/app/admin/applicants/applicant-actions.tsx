'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MoreHorizontal } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import { deleteApplicant } from '@/services/applicantService';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export function ApplicantActions({ applicantId }: { applicantId: string }) {
  const router = useRouter();
  const { toast } = useToast();
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteApplicant(applicantId);
      toast({
        title: 'Applicant Deleted',
        description: 'The applicant record has been successfully deleted.',
      });
      // router.refresh(); No need, onSnapshot will handle it
    } catch (error) {
      console.error('Failed to delete applicant:', error);
      toast({
        variant: 'destructive',
        title: 'Failed to Delete',
        description: 'An error occurred while deleting the applicant.',
      });
    }
  };

  return (
    <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
            <Button aria-haspopup="true" size="icon" variant="ghost">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Toggle menu</span>
            </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem 
                    className="text-destructive focus:text-destructive focus:bg-destructive/10" 
                    onSelect={() => setIsAlertOpen(true)}>
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
        <AlertDialogContent>
            <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
                This action cannot be undone. This will permanently delete this applicant's data.
            </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Continue</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
  );
}
