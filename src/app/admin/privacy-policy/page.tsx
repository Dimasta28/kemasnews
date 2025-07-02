
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import {
  getFrontendSettings,
  updateFrontendSettings,
  type FrontendSettings,
} from '@/services/settingsService';
import { Skeleton } from '@/components/ui/skeleton';
import RichTextEditor from '@/components/quill-editor';

export default function PrivacyPolicyAdminPage() {
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    async function fetchSettings() {
      setIsLoading(true);
      try {
        const currentSettings = await getFrontendSettings();
        setContent(currentSettings.privacyPolicy || '');
      } catch (error) {
        console.error('Failed to fetch settings:', error);
        toast({
          variant: 'destructive',
          title: 'Failed to load content',
        });
      } finally {
        setIsLoading(false);
      }
    }
    fetchSettings();
  }, [toast]);

  const handleSaveChanges = async () => {
    setIsSaving(true);
    try {
      await updateFrontendSettings({ privacyPolicy: content });
      toast({
        title: 'Success!',
        description: 'Privacy Policy has been updated.',
      });
    } catch (error) {
      console.error('Failed to save settings:', error);
      toast({
        variant: 'destructive',
        title: 'Failed to save',
        description: 'An error occurred while saving the privacy policy.',
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <Skeleton className="h-7 w-56" />
            <Skeleton className="h-4 w-72" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-[400px] w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Privacy Policy</h1>
          <p className="text-muted-foreground">Edit the content for your privacy policy page.</p>
        </div>
        <Button onClick={handleSaveChanges} disabled={isSaving}>
          {isSaving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Page Content</CardTitle>
          <CardDescription>
            Use the editor below to make changes to your privacy policy.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <RichTextEditor
                value={content}
                onChange={setContent}
            />
        </CardContent>
      </Card>
      <div className="flex justify-end">
        <Button onClick={handleSaveChanges} disabled={isSaving}>
          {isSaving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </div>
  );
}
