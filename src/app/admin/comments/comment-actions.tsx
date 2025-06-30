
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MoreHorizontal } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import { updateCommentStatus, deleteComment, type Comment } from '@/services/commentService';
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

export function CommentActions({ comment }: { comment: Comment }) {
  const router = useRouter();
  const { toast } = useToast();
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusChange = async (status: 'Approved' | 'Pending' | 'Spam') => {
    setIsUpdating(true);
    try {
      await updateCommentStatus(comment.id, status);
      toast({
        title: 'Status Updated',
        description: `Comment has been marked as ${status}.`,
      });
      router.refresh();
    } catch (error) {
      console.error('Failed to update status:', error);
      toast({
        variant: 'destructive',
        title: 'Update Failed',
        description: 'An error occurred while updating the comment status.',
      });
    } finally {
        setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteComment(comment.id);
      toast({
        title: 'Comment Deleted',
        description: 'The comment has been successfully deleted.',
      });
      router.refresh();
    } catch (error) {
      console.error('Failed to delete comment:', error);
      toast({
        variant: 'destructive',
        title: 'Deletion Failed',
        description: 'An error occurred while deleting the comment.',
      });
    }
  };

  return (
    <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
            <Button aria-haspopup="true" size="icon" variant="ghost" disabled={isUpdating}>
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Toggle menu</span>
            </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                {comment.status !== 'Approved' && <DropdownMenuItem onSelect={() => handleStatusChange('Approved')}>Approve</DropdownMenuItem>}
                {comment.status !== 'Pending' && <DropdownMenuItem onSelect={() => handleStatusChange('Pending')}>Mark as Pending</DropdownMenuItem>}
                {comment.status !== 'Spam' && <DropdownMenuItem onSelect={() => handleStatusChange('Spam')}>Mark as Spam</DropdownMenuItem>}
                <DropdownMenuItem asChild>
                    <Link href={`/post/${comment.postId}#comments`}>View Post</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                    className="text-red-500 hover:!text-red-500 focus:!text-red-500" 
                    onSelect={() => setIsAlertOpen(true)}>
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
        <AlertDialogContent>
            <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
                This action cannot be undone. This will permanently delete this comment.
            </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Delete</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
  );
}
