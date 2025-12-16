
'use client';

import { useState } from 'react';
import { Pencil } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { updateFrontendSettings, type FrontendSettings } from '@/services/settingsService';

interface ImageEditDialogProps {
  settingKey: keyof FrontendSettings | string; // Allow string for dynamic keys like posts.id.featuredImage
  currentImageUrl: string;
  triggerClassName?: string;
  onSave?: (newUrl: string) => Promise<void>;
}

export function ImageEditDialog({
  settingKey,
  currentImageUrl,
  triggerClassName,
  onSave,
}: ImageEditDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [newImageUrl, setNewImageUrl] = useState(currentImageUrl);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const handleSave = async () => {
    setIsSaving(true);
    try {
      if (onSave) {
        await onSave(newImageUrl);
      } else {
        await updateFrontendSettings({ [settingKey]: newImageUrl } as Partial<FrontendSettings>);
      }
      
      toast({
        title: 'Success!',
        description: 'Image URL has been updated.',
      });
      
      // Use a soft refresh (re-validation) instead of a hard reload if possible.
      // For now, a reload is the simplest way to see changes everywhere.
      window.location.reload(); 
      setIsOpen(false);

    } catch (error) {
      console.error('Failed to save image URL:', error);
      toast({
        variant: 'destructive',
        title: 'Save Failed',
        description: 'An error occurred while saving the new image URL.',
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" size="icon" className={triggerClassName}>
          <Pencil className="h-4 w-4" />
          <span className="sr-only">Change Image</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Image URL</DialogTitle>
          <DialogDescription>
            Enter the new URL for the image. The page will refresh to show the change.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="image-url" className="text-right">
              Image URL
            </Label>
            <Input
              id="image-url"
              value={newImageUrl}
              onChange={(e) => setNewImageUrl(e.target.value)}
              className="col-span-3"
              placeholder="https://example.com/image.png"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
