
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { registerMember } from '@/services/memberService';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';

export default function RegisterPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== confirmPassword) {
        toast({
            variant: 'destructive',
            title: 'Registration Failed',
            description: 'Passwords do not match.',
        });
        return;
    }

    setIsSubmitting(true);

    const result = await registerMember(name, email, company, password);

    if (result.success) {
      toast({
        title: 'Registration Successful',
        description: 'You can now log in.',
      });
      router.push('/login');
    } else {
      toast({
        variant: 'destructive',
        title: 'Registration Failed',
        description: result.message,
      });
    }
    setIsSubmitting(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#EFECE9] dark:bg-[#050505]">
      <SiteHeader />
      <main className="flex-grow flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Create an Account</CardTitle>
            <CardDescription>Join our community to comment and engage.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" type="text" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="company">Company</Label>
                <Input id="company" type="text" placeholder="Your company name" value={company} onChange={(e) => setCompany(e.target.value)} required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input id="confirm-password" type="password" placeholder="••••••••" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? 'Registering...' : 'Register'}
              </Button>
              <div className="text-center text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link href="/login" className="font-semibold text-primary hover:underline">
                  Log in
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
      <SiteFooter />
    </div>
  );
}
