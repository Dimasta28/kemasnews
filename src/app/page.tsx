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
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push('/admin/dashboard');
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <Card className="w-full max-w-sm">
        <form onSubmit={handleSubmit}>
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
        </form>
      </Card>
    </div>
  );
}
