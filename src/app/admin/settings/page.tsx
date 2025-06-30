'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import {
  getFrontendSettings,
  updateFrontendSettings,
  type FrontendSettings,
} from '@/services/settingsService';

export default function SettingsPage() {
  const [settings, setSettings] = useState<Partial<FrontendSettings>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    async function fetchSettings() {
      try {
        const currentSettings = await getFrontendSettings();
        setSettings(currentSettings);
      } catch (error) {
        console.error('Failed to fetch settings:', error);
        toast({
          variant: 'destructive',
          title: 'Failed to load settings',
          description: 'Could not load current settings from the database.',
        });
      } finally {
        setIsLoading(false);
      }
    }
    fetchSettings();
  }, [toast]);

  const handleInputChange = (
    field: keyof FrontendSettings,
    value: string
  ) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveChanges = async () => {
    setIsSaving(true);
    try {
      await updateFrontendSettings(settings);
      toast({
        title: 'Settings Saved!',
        description: 'Your changes have been successfully saved.',
      });
    } catch (error) {
      console.error('Failed to save settings:', error);
      toast({
        variant: 'destructive',
        title: 'Failed to Save',
        description: 'An error occurred while saving your settings.',
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
            <Skeleton className="h-7 w-48" />
            <Skeleton className="h-4 w-64" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-40 w-full" />
          </CardContent>
        </Card>
        <div className="flex justify-start">
          <Skeleton className="h-10 w-32" />
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>General Settings</CardTitle>
          <CardDescription>
            Manage the general appearance of your blog.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-8">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="logo-url-light">Light Mode Logo URL</Label>
                <Input
                  id="logo-url-light"
                  type="text"
                  value={settings.lightModeLogoUrl || ''}
                  onChange={(e) =>
                    handleInputChange('lightModeLogoUrl', e.target.value)
                  }
                  placeholder="https://example.com/logo-light.png"
                />
                <p className="text-sm text-muted-foreground">
                  Enter the full URL for your blog&apos;s logo in light mode.
                </p>
              </div>
              <div className="grid gap-2">
                <Label>Light Mode Logo Preview</Label>
                <div className="flex h-24 items-center justify-center rounded-lg border bg-muted/50 p-4">
                  {settings.lightModeLogoUrl ? (
                    <Image
                      src={settings.lightModeLogoUrl}
                      alt="Light Mode Logo Preview"
                      width={150}
                      height={50}
                      className="object-contain"
                      data-ai-hint="logo company"
                    />
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      Enter a URL to see a preview.
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="logo-url-dark">Dark Mode Logo URL</Label>
                <Input
                  id="logo-url-dark"
                  type="text"
                  value={settings.darkModeLogoUrl || ''}
                  onChange={(e) =>
                    handleInputChange('darkModeLogoUrl', e.target.value)
                  }
                  placeholder="https://example.com/logo-dark.png"
                />
                <p className="text-sm text-muted-foreground">
                  Enter the full URL for your blog&apos;s logo in dark mode.
                </p>
              </div>
              <div className="grid gap-2">
                <Label>Dark Mode Logo Preview</Label>
                <div className="flex h-24 items-center justify-center rounded-lg border bg-background p-4">
                  {settings.darkModeLogoUrl ? (
                    <Image
                      src={settings.darkModeLogoUrl}
                      alt="Dark Mode Logo Preview"
                      width={150}
                      height={50}
                      className="object-contain"
                      data-ai-hint="logo company dark"
                    />
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      Enter a URL to see a preview.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-start">
        <Button onClick={handleSaveChanges} disabled={isSaving}>
          {isSaving ? 'Saving...' : 'Save All Changes'}
        </Button>
      </div>
    </div>
  );
}
