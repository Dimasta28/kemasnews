
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Link from 'next/link';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { auth } from '@/lib/firebase';
import { useAuth } from '@/hooks/use-auth';

function LoginLoadingScreen() {
    return (
        <div className="flex min-h-screen w-full flex-col items-center justify-center bg-background p-4">
             <div className="flex flex-col items-center gap-2">
                 <svg
                    className="animate-spin h-8 w-8 text-primary"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    ></circle>
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                </svg>
                <p className="text-sm text-muted-foreground">Checking login status...</p>
            </div>
        </div>
    );
}

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { user, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // If the auth state is not loading and a user is found, redirect them.
    if (!isLoading && user) {
      router.replace('/admin/dashboard');
    }
  }, [user, isLoading, router]);


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({
        title: 'Login Successful',
        description: `Welcome back!`,
      });
      router.replace('/admin/dashboard');
    } catch (error: any)
      {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Login Failed',
        description: 'Invalid email or password. Please try again.',
      });
    } finally {
        setIsSubmitting(false);
    }
  };

  // While loading the auth state, or if the user is already logged in,
  // show a loading screen to prevent the form from flashing.
  if (isLoading || user) {
    return <LoginLoadingScreen />;
  }

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-background p-4">
        <div className="mb-8">
            <Link href="/" aria-label="Back to home">
                <Image
                    src="https://kemaspkg.com/media/wp-content/uploads/2024/04/logo-baru-kemas-2023-03.png"
                    alt="Kemas Logo"
                    width={180}
                    height={45}
                    className="hidden dark:block"
                    priority
                />
                <Image
                    src="https://www.kemaspkg.com/wp-content/uploads/2024/04/logo-baru-kemas-2023-01.png"
                    alt="Kemas Logo"
                    width={180}
                    height={45}
                    className="block dark:hidden"
                    priority
                />
            </Link>
        </div>
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>Log In</CardTitle>
            <CardDescription>Enter your email and password to log in.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <div className="flex flex-col gap-2 pt-2">
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? 'Logging in...' : 'Log In'}
                </Button>
                <Button variant="outline" className="w-full" asChild>
                    <Link href="/">Back to Home</Link>
                </Button>
              </div>
              <div className="text-center text-sm text-muted-foreground">
                Access is restricted to authorized users.
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
  );
}
