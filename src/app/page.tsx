'use client';

import Image from 'next/image';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ThemeToggle } from '@/components/theme-toggle';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <Image
            src="https://www.kemaspkg.com/wp-content/uploads/2024/04/logo-baru-kemas-2023-01.png"
            alt="Kemas Logo"
            width={250}
            height={62}
            className="mx-auto block dark:hidden"
            priority
          />
          <Image
            src="https://kemaspkg.com/media/wp-content/uploads/2024/04/logo-baru-kemas-2023-03.png"
            alt="Kemas Logo"
            width={250}
            height={62}
            className="mx-auto hidden dark:block"
            priority
          />
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-1 gap-6">
            <Button variant="outline">
              <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 126 23.4 172.9 61.9l-69.8 69.8C314.1 101.3 282.8 88 248 88c-77.4 0-140.3 62.9-140.3 140.3s62.9 140.3 140.3 140.3c84.3 0 119.3-61.2 122.7-88.3h-122.7v-81.6h217.1c1.8 10.3 2.9 20.9 2.9 31.9z"></path>
              </svg>
              Google
            </Button>
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="m@example.com" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
           <Button type="submit" className="w-full">
            Login
          </Button>
          <div className="mt-2 flex w-full items-center justify-between">
            <span className="text-sm text-muted-foreground">Copyright @2025 PT. Kemas Indah Maju</span>
            <ThemeToggle />
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
