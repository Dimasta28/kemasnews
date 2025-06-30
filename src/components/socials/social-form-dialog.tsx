"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { createSocialLinkAction, updateSocialLinkAction } from "@/app/socials/actions";
import type { SocialLink } from "@/lib/posts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const availableIcons = ["Github", "Linkedin", "Twitter", "Facebook", "Instagram", "Youtube", "Rss", "Mail", "Globe", "ExternalLink"];

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  url: z.string().url("Please enter a valid URL."),
  icon: z.string().min(1, "Please select an icon."),
});

type SocialFormValues = z.infer<typeof formSchema>;

type SocialFormDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  socialLink?: SocialLink;
};

export function SocialFormDialog({ open, onOpenChange, socialLink }: SocialFormDialogProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const isEditMode = !!socialLink;

  const form = useForm<SocialFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: socialLink?.name || "",
      url: socialLink?.url || "",
      icon: socialLink?.icon || "",
    },
  });

  React.useEffect(() => {
    form.reset({
      name: socialLink?.name || "",
      url: socialLink?.url || "",
      icon: socialLink?.icon || "",
    });
  }, [socialLink, form, open]);

  async function onSubmit(values: SocialFormValues) {
    setIsSubmitting(true);
    try {
      const result = isEditMode
        ? await updateSocialLinkAction(socialLink!.id, values)
        : await createSocialLinkAction(values);
      
      if (result.success) {
        toast({ title: `Social Link ${isEditMode ? 'updated' : 'created'} successfully.` });
        onOpenChange(false);
      } else {
        toast({ variant: "destructive", title: "Error", description: result.message });
      }
    } catch (error) {
      toast({ variant: "destructive", title: "An unexpected error occurred." });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isEditMode ? "Edit Social Link" : "Create New Social Link"}</DialogTitle>
          <DialogDescription>
            {isEditMode ? "Update the social link details." : "Enter details for the new social link."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., GitHub" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://github.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="icon"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Icon</FormLabel>
                   <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an icon" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {availableIcons.map((iconName) => (
                        <SelectItem key={iconName} value={iconName}>
                          {iconName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="button" variant="ghost" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isEditMode ? "Save Changes" : "Create"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
