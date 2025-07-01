
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SiteHeaderWrapper } from '@/components/site-header-wrapper';
import { SiteFooter } from '@/components/site-footer';
import { Button } from '@/components/ui/button';

export default function RegisterPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#EFECE9] dark:bg-[#050505]">
      <SiteHeaderWrapper />
      <main className="flex-grow flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <CardTitle>Registration Disabled</CardTitle>
            <CardDescription>
              User registration is not available. Please contact an administrator
              to get an account.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
                <Link href="/login">
                    Return to Login
                </Link>
            </Button>
          </CardContent>
        </Card>
      </main>
      <SiteFooter />
    </div>
  );
}
