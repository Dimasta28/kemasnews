'use client';

import { useState } from 'react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const MOCK_LIGHT_LOGO_URL =
  'https://www.kemaspkg.com/wp-content/uploads/2024/04/logo-baru-kemas-2023-01.png';
const MOCK_DARK_LOGO_URL =
  'https://kemaspkg.com/media/wp-content/uploads/2024/04/logo-baru-kemas-2023-03.png';

export default function SettingsPage() {
  const [lightModeLogoUrl, setLightModeLogoUrl] =
    useState(MOCK_LIGHT_LOGO_URL);
  const [darkModeLogoUrl, setDarkModeLogoUrl] = useState(MOCK_DARK_LOGO_URL);
  const { toast } = useToast();

  const handleSaveChanges = () => {
    // In a real application, you would save these URLs to your database.
    // For this demo, we'll just show a success message.
    console.log('Saving new light mode logo URL:', lightModeLogoUrl);
    console.log('Saving new dark mode logo URL:', darkModeLogoUrl);
    toast({
      title: 'Settings Saved!',
      description: 'Your changes have been successfully saved.',
    });
  };

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Frontend Settings</CardTitle>
          <CardDescription>
            Manage the appearance of your main blog page.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-8">
            {/* Light Mode Logo Section */}
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="logo-url-light">Light Mode Logo URL</Label>
                <Input
                  id="logo-url-light"
                  type="text"
                  value={lightModeLogoUrl}
                  onChange={(e) => setLightModeLogoUrl(e.target.value)}
                  placeholder="https://example.com/logo-light.png"
                />
                <p className="text-sm text-muted-foreground">
                  Enter the full URL for your blog&apos;s logo in light mode.
                </p>
              </div>
              <div className="grid gap-2">
                <Label>Light Mode Logo Preview</Label>
                <div className="flex h-24 items-center justify-center rounded-lg border bg-muted/50 p-4">
                  {lightModeLogoUrl ? (
                    <Image
                      src={lightModeLogoUrl}
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

            {/* Dark Mode Logo Section */}
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="logo-url-dark">Dark Mode Logo URL</Label>
                <Input
                  id="logo-url-dark"
                  type="text"
                  value={darkModeLogoUrl}
                  onChange={(e) => setDarkModeLogoUrl(e.target.value)}
                  placeholder="https://example.com/logo-dark.png"
                />
                <p className="text-sm text-muted-foreground">
                  Enter the full URL for your blog&apos;s logo in dark mode.
                </p>
              </div>
              <div className="grid gap-2">
                <Label>Dark Mode Logo Preview</Label>
                <div className="flex h-24 items-center justify-center rounded-lg border bg-background p-4">
                  {darkModeLogoUrl ? (
                    <Image
                      src={darkModeLogoUrl}
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
        <CardFooter className="border-t px-6 py-4">
          <Button onClick={handleSaveChanges}>Save Changes</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
