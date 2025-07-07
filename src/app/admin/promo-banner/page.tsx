
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

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
  type BannerSettings,
} from '@/services/settingsService';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

export default function PromoBannerPage() {
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

  const handleSidebarBannerChange = (field: keyof BannerSettings, value: string) => {
    setSettings((prev) => ({
      ...prev,
      sidebarBanner: {
        ...(prev.sidebarBanner || { imageUrl: '', title: '', description: '', buttonText: '', buttonLink: '' }),
        [field]: value,
      },
    }));
  };

  const handleHomepageBannerChange = (field: keyof BannerSettings, value: string) => {
    setSettings((prev) => ({
      ...prev,
      homepageBanner: {
        ...(prev.homepageBanner || { imageUrl: '', title: '', description: '', buttonText: '', buttonLink: '' }),
        [field]: value,
      },
    }));
  };

  const handleSaveChanges = async () => {
    setIsSaving(true);
    try {
      await updateFrontendSettings({ 
        sidebarBanner: settings.sidebarBanner,
        homepageBanner: settings.homepageBanner
       });
      toast({
        title: 'Settings Saved!',
        description: 'Your banner changes have been successfully saved.',
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
        <div className="flex items-center justify-between">
            <Skeleton className="h-10 w-56" />
            <Skeleton className="h-10 w-32" />
        </div>
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-2xl font-bold tracking-tight">Manage Banners</h1>
            <p className="text-muted-foreground">Update the content for the promotional banners on your site.</p>
        </div>
        <Button onClick={handleSaveChanges} disabled={isSaving}>
          {isSaving ? 'Saving...' : 'Save All Changes'}
        </Button>
      </div>

      <Tabs defaultValue="homepage" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="homepage">Homepage Banner</TabsTrigger>
            <TabsTrigger value="sidebar">Sidebar Banner</TabsTrigger>
        </TabsList>
        <TabsContent value="homepage" className="mt-6">
            <Card>
                <CardHeader>
                <CardTitle>Homepage Banner</CardTitle>
                <CardDescription>
                    Manage the large promotional banner on the homepage.
                </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="space-y-4">
                        <div className="grid gap-2">
                            <Label htmlFor="h-banner-image-url">Image URL</Label>
                            <Input
                            id="h-banner-image-url"
                            value={settings.homepageBanner?.imageUrl || ''}
                            onChange={(e) => handleHomepageBannerChange('imageUrl', e.target.value)}
                            placeholder="https://placehold.co/1200x450.png"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="h-banner-title">Title</Label>
                            <Input
                            id="h-banner-title"
                            value={settings.homepageBanner?.title || ''}
                            onChange={(e) => handleHomepageBannerChange('title', e.target.value)}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="h-banner-description">Description</Label>
                            <Input
                            id="h-banner-description"
                            value={settings.homepageBanner?.description || ''}
                            onChange={(e) => handleHomepageBannerChange('description', e.target.value)}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="h-banner-button-text">Button Text</Label>
                            <Input
                            id="h-banner-button-text"
                            value={settings.homepageBanner?.buttonText || ''}
                            onChange={(e) => handleHomepageBannerChange('buttonText', e.target.value)}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="h-banner-button-link">Button Link</Label>
                            <Input
                            id="h-banner-button-link"
                            value={settings.homepageBanner?.buttonLink || ''}
                            onChange={(e) => handleHomepageBannerChange('buttonLink', e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Banner Preview</Label>
                         <div className="relative w-full aspect-[21/9] rounded-lg overflow-hidden shadow-lg border">
                            <Image
                                src={settings.homepageBanner?.imageUrl || 'https://placehold.co/1200x450.png'}
                                alt="Homepage banner preview"
                                fill
                                className="object-cover"
                                data-ai-hint="advertisement banner"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
                            <div className="absolute inset-0 flex items-center p-8">
                                <div className="max-w-md text-white">
                                    <h3 className="text-2xl font-bold leading-tight">{settings.homepageBanner?.title || 'Banner Title'}</h3>
                                    <p className="mt-2 text-base">{settings.homepageBanner?.description || 'Banner description goes here.'}</p>
                                    <Button size="lg" className="mt-6" variant="secondary">
                                        {settings.homepageBanner?.buttonText || 'Button Text'}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </CardContent>
            </Card>
        </TabsContent>
        <TabsContent value="sidebar" className="mt-6">
            <Card>
                <CardHeader>
                <CardTitle>Sidebar Banner</CardTitle>
                <CardDescription>
                    Manage the promotional banner that appears in the sidebar on post
                    pages.
                </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="space-y-4">
                    <div className="grid gap-2">
                        <Label htmlFor="banner-image-url">Image URL</Label>
                        <Input
                        id="banner-image-url"
                        value={settings.sidebarBanner?.imageUrl || ''}
                        onChange={(e) => handleSidebarBannerChange('imageUrl', e.target.value)}
                        placeholder="https://placehold.co/600x400.png"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="banner-title">Title</Label>
                        <Input
                        id="banner-title"
                        value={settings.sidebarBanner?.title || ''}
                        onChange={(e) => handleSidebarBannerChange('title', e.target.value)}
                        placeholder="Our New Collection"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="banner-description">Description</Label>
                        <Input
                        id="banner-description"
                        value={settings.sidebarBanner?.description || ''}
                        onChange={(e) => handleSidebarBannerChange('description', e.target.value)}
                        placeholder="Discover the latest..."
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="banner-button-text">Button Text</Label>
                        <Input
                        id="banner-button-text"
                        value={settings.sidebarBanner?.buttonText || ''}
                        onChange={(e) => handleSidebarBannerChange('buttonText', e.target.value)}
                        placeholder="Learn More"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="banner-button-link">Button Link</Label>
                        <Input
                        id="banner-button-link"
                        value={settings.sidebarBanner?.buttonLink || ''}
                        onChange={(e) => handleSidebarBannerChange('buttonLink', e.target.value)}
                        placeholder="/products/new-collection"
                        />
                    </div>
                    </div>

                    <div className="space-y-2">
                    <Label>Banner Preview</Label>
                    <Card className="overflow-hidden">
                        <CardContent className="p-0">
                        <Image
                            src={
                            settings.sidebarBanner?.imageUrl ||
                            'https://placehold.co/600x400.png'
                            }
                            alt="Promo banner preview"
                            width={600}
                            height={400}
                            className="h-auto w-full object-cover"
                            data-ai-hint="advertisement banner"
                        />
                        <div className="p-4">
                            <h3 className="font-semibold">
                            {settings.sidebarBanner?.title || 'Our New Collection'}
                            </h3>
                            <p className="mt-1 text-sm text-muted-foreground">
                            {settings.sidebarBanner?.description ||
                                'Discover the latest in sustainable packaging.'}
                            </p>
                            <Button size="sm" className="mt-3 w-full" asChild>
                            <Link href={settings.sidebarBanner?.buttonLink || '#'}>
                                {settings.sidebarBanner?.buttonText || 'Learn More'}
                            </Link>
                            </Button>
                        </div>
                        </CardContent>
                    </Card>
                    </div>
                </div>
                </CardContent>
            </Card>
        </TabsContent>
      </Tabs>
      
      <div className="flex justify-end mt-4">
        <Button onClick={handleSaveChanges} disabled={isSaving}>
          {isSaving ? 'Saving...' : 'Save All Changes'}
        </Button>
      </div>
    </div>
  );
}
