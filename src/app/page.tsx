import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-8">
      <div className="w-full max-w-md">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              Welcome to Your New App!
            </CardTitle>
            <CardDescription className="text-center">
              This is your starting point. Begin by editing this page:
              <br />
              <code className="font-mono bg-muted px-1.5 py-1 text-sm rounded-sm mt-2 inline-block">
                src/app/page.tsx
              </code>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-center text-sm text-muted-foreground">
              What would you like to build today?
            </p>
            <Button className="w-full">
              Get Started
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
