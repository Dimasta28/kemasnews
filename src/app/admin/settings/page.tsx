
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { PlusCircle, Trash2 } from 'lucide-react';

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
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import {
  getFrontendSettings,
  updateFrontendSettings,
  type FrontendSettings,
  type NavigationLink,
} from '@/services/settingsService';
import { getPosts, type Post } from '@/services/postService';
import { Separator } from '@/components/ui/separator';
import { MultiSelectCombobox } from '@/components/ui/multi-select-combobox';

export default function SettingsPage() {
  const [settings, setSettings] = useState<Partial<FrontendSettings>>({});
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    async function fetchData() {
      try {
        const [currentSettings, posts] = await Promise.all([
            getFrontendSettings(),
            getPosts()
        ]);
        setSettings(currentSettings);
        setAllPosts(posts.filter(p => p.status === 'Published')); // Only allow published posts
      } catch (error) {
        console.error('Failed to fetch data:', error);
        toast({
          variant: 'destructive',
          title: 'Failed to load settings',
          description: 'Could not load current settings from the database.',
        });
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [toast]);

  const handleInputChange = (
    field: keyof Omit<FrontendSettings, 'banner' | 'dropdownLinks' | 'privacyPolicy' | 'heroPostIds'>,
    value: string
  ) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };
  
  const handleHeroPostsChange = (selectedPostIds: string[]) => {
    setSettings(prev => ({ ...prev, heroPostIds: selectedPostIds }));
  };

  const handleDropdownLinkChange = (index: number, field: keyof NavigationLink, value: string) => {
    const updatedLinks = [...(settings.dropdownLinks || [])];
    const linkToUpdate = { ...updatedLinks[index], [field]: value };
    updatedLinks[index] = linkToUpdate;
    setSettings(prev => ({...prev, dropdownLinks: updatedLinks}));
  }

  const handleAddDropdownLink = () => {
    const newLink: NavigationLink = { title: '', description: '', href: '#'};
    setSettings(prev => ({...prev, dropdownLinks: [...(prev.dropdownLinks || []), newLink]}));
  }

  const handleRemoveDropdownLink = (index: number) => {
    const updatedLinks = (settings.dropdownLinks || []).filter((_, i) => i !== index);
    setSettings(prev => ({...prev, dropdownLinks: updatedLinks}));
  }

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
        <Card>
          <CardHeader>
            <Skeleton className="h-7 w-56" />
             <Skeleton className="h-4 w-72" />
          </CardHeader>
           <CardContent>
            <Skeleton className="h-20 w-full" />
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
      <div className="flex items-center justify-between">
         <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
          <Button onClick={handleSaveChanges} disabled={isSaving}>
            {isSaving ? 'Saving...' : 'Save All Changes'}
          </Button>
      </div>
      
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

      <Card>
        <CardHeader>
          <CardTitle>Homepage Hero Section</CardTitle>
          <CardDescription>
            Select which posts to feature in the main carousel on the homepage. If none are selected, the latest 3 posts will be shown.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="grid gap-2">
                <Label htmlFor="hero-posts">Featured Posts</Label>
                 <MultiSelectCombobox
                    options={allPosts.map(post => ({ value: post.id, label: post.title }))}
                    value={settings.heroPostIds || []}
                    onChange={handleHeroPostsChange}
                    placeholder="Select posts to feature..."
                    searchPlaceholder="Search posts..."
                    emptyPlaceholder="No posts found."
                />
            </div>
        </CardContent>
      </Card>


      <Card>
        <CardHeader>
          <CardTitle>Header Dropdown Navigation</CardTitle>
          <CardDescription>
            Manage the links that appear in the "PT. Kemas" dropdown menu in the main header.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {settings.dropdownLinks?.map((link, index) => (
              <Card key={index} className="p-4 bg-muted/50">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_2fr_1fr_auto] gap-4 items-end">
                  <div className="grid gap-1.5">
                    <Label htmlFor={`link-title-${index}`}>Title</Label>
                    <Input id={`link-title-${index}`} value={link.title} onChange={(e) => handleDropdownLinkChange(index, 'title', e.target.value)} />
                  </div>
                  <div className="grid gap-1.5">
                    <Label htmlFor={`link-desc-${index}`}>Description</Label>
                    <Input id={`link-desc-${index}`} value={link.description} onChange={(e) => handleDropdownLinkChange(index, 'description', e.target.value)} />
                  </div>
                   <div className="grid gap-1.5">
                    <Label htmlFor={`link-href-${index}`}>URL (Link)</Label>
                    <Input id={`link-href-${index}`} value={link.href} onChange={(e) => handleDropdownLinkChange(index, 'href', e.target.value)} />
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => handleRemoveDropdownLink(index)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                    <span className="sr-only">Remove Link</span>
                  </Button>
                </div>
              </Card>
            ))}
            <Button variant="outline" size="sm" onClick={handleAddDropdownLink}>
              <PlusCircle className="mr-2 h-4 w-4" /> Add Link
            </Button>
          </div>
        </CardContent>
      </Card>

       <Card>
        <CardHeader>
          <CardTitle>SEO &amp; Social Sharing (Open Graph)</CardTitle>
          <CardDescription>
            Configure how your site appears when shared on social media.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="grid gap-2">
            <Label htmlFor="og-title">OG Title</Label>
            <Input
              id="og-title"
              value={settings.ogTitle || ''}
              onChange={(e) => handleInputChange('ogTitle', e.target.value)}
              placeholder="Wellcome | Pt Kemas Indah Maju"
            />
            <p className="text-sm text-muted-foreground">The main title for social shares.</p>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="og-description">OG Description</Label>
            <Textarea
              id="og-description"
              value={settings.ogDescription || ''}
              onChange={(e) => handleInputChange('ogDescription', e.target.value)}
              placeholder="Since 1980, KEMAS delivers premium plastic & metal cosmetic packaging with European & Japanese tech."
              className="min-h-24"
            />
            <p className="text-sm text-muted-foreground">A short summary (around 155 characters is best).</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 items-start">
            <div className="grid gap-2">
              <Label htmlFor="og-image-url">OG Image URL</Label>
              <Input
                id="og-image-url"
                value={settings.ogImageUrl || ''}
                onChange={(e) => handleInputChange('ogImageUrl', e.target.value)}
                placeholder="https://example.com/og-image.png"
              />
              <p className="text-sm text-muted-foreground">Recommended size: 1200x630 pixels.</p>
            </div>
            <div className="space-y-2">
              <Label>OG Image Preview</Label>
              <div className="relative aspect-[1.91/1] w-full overflow-hidden rounded-lg border bg-muted">
                <Image
                  src={settings.ogImageUrl || 'https://placehold.co/1200x630.png'}
                  alt="OG Image preview"
                  fill
                  className="object-cover"
                  data-ai-hint="social media preview"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>


      <div className="flex justify-end">
        <Button onClick={handleSaveChanges} disabled={isSaving}>
          {isSaving ? 'Saving...' : 'Save All Changes'}
        </Button>
      </div>
    </div>
  );
}
