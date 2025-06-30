"use client";

import * as React from "react";
import { Loader2 } from "lucide-react";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { deleteSocialLinkAction } from "@/app/socials/actions";

type DeleteSocialDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  socialLink: { id: string; name: string };
};

export function DeleteSocialDialog({ open, onOpenChange, socialLink }: DeleteSocialDialogProps) {
  const { toast } = useToast();
  const [isDeleting, setIsDeleting] = React.useState(false);

  async function handleDelete() {
    setIsDeleting(true);
    try {
      const result = await deleteSocialLinkAction(socialLink.id);
      if (result.success) {
        toast({ title: "Social link deleted successfully." });
        onOpenChange(false);
      } else {
        toast({ variant: "destructive", title: "Error deleting link", description: result.message });
        onOpenChange(false);
      }
    } catch (error) {
      toast({ variant: "destructive", title: "An unexpected error occurred." });
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the{' '}
            <strong>{socialLink.name}</strong> social link.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Continue
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
