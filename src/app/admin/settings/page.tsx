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

const MOCK_LOGO_URL = 'https://ddujuwmrnfufdqnvgaqb.supabase.co/storage/v1/object/public/catalogimage2025tes/logo-baru-kemas-2023-01.png';

export default function SettingsPage() {
  const [logoUrl, setLogoUrl] = useState(MOCK_LOGO_URL);
  const { toast } = useToast();

  const handleSaveChanges = () => {
    // In a real application, you would save this URL to your database.
    // For this demo, we'll just show a success message.
    console.log('Saving new logo URL:', logoUrl);
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
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="logo-url">Logo URL</Label>
              <Input
                id="logo-url"
                type="text"
                value={logoUrl}
                onChange={(e) => setLogoUrl(e.target.value)}
                placeholder="https://example.com/logo.png"
              />
              <p className="text-sm text-muted-foreground">
                Enter the full URL for your blog's logo. It will be displayed in
                the header.
              </p>
            </div>
            <div className="grid gap-2">
              <Label>Logo Preview</Label>
              <div className="flex h-24 items-center justify-center rounded-lg border bg-muted/50 p-4">
                {logoUrl ? (
                  <Image
                    src={logoUrl}
                    alt="Logo Preview"
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
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Button onClick={handleSaveChanges}>Save Changes</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
