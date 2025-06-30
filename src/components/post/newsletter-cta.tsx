"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Mail } from "lucide-react";

export function NewsletterCta() {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    console.log("Newsletter signup:", email);
    toast({
      title: "Subscribed!",
      description: "Thanks for subscribing to our newsletter.",
    });
    e.currentTarget.reset();
  };

  return (
    <Card className="bg-primary/10 border-primary/20">
      <CardHeader className="text-center">
        <div className="mx-auto bg-primary/20 rounded-full p-3 w-fit">
            <Mail className="h-6 w-6 text-primary" />
        </div>
        <CardTitle className="mt-2">Stay Up to Date</CardTitle>
        <CardDescription>
          Subscribe to our newsletter to get the latest articles delivered straight to your inbox.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
          <Input 
            type="email" 
            name="email"
            placeholder="Enter your email" 
            required 
            className="flex-grow bg-background"
          />
          <Button type="submit" className="sm:w-auto">Subscribe</Button>
        </form>
      </CardContent>
    </Card>
  );
}
