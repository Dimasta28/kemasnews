'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

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
import { useToast } from '@/hooks/use-toast';
import { getDepartment, updateDepartment } from '@/services/departmentService';
import { Skeleton } from '@/components/ui/skeleton';


export default function EditDepartmentPage() {
  const { toast } = useToast();
  const router = useRouter();
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchDepartment = async () => {
      setIsLoading(true);
      try {
        const departmentData = await getDepartment(id);
        if (departmentData) {
          setName(departmentData.name);
          setSlug(departmentData.slug);
        } else {
          toast({
            variant: 'destructive',
            title: 'Department Not Found',
            description: 'The department you are trying to edit does not exist.',
          });
          router.push('/admin/departments');
        }
      } catch (error) {
        console.error('Failed to fetch department:', error);
        toast({
          variant: 'destructive',
          title: 'Failed to Load Department',
          description: 'An error occurred while loading the department. Please try again.',
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchDepartment();
  }, [id, router, toast]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSaving || !id) return;
    setIsSaving(true);
    
    try {
      const result = await updateDepartment(id, name, slug);
      
      if (result.success) {
        toast({
            title: 'Department Updated!',
            description: 'Your department has been successfully updated.',
        });
        router.push('/admin/departments');
      } else {
        toast({
            variant: 'destructive',
            title: 'Failed to Update Department',
            description: result.message,
        });
      }
    } catch (error) {
      console.error('Failed to update department:', error);
      toast({
        variant: 'destructive',
        title: 'Failed to Update',
        description: 'An error occurred while updating your department. Please try again.',
      });
    } finally {
      setIsSaving(false);
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <Skeleton className="h-7 w-7 rounded-full" />
          <Skeleton className="h-6 w-32" />
        </div>
        <Card>
            <CardHeader>
                <Skeleton className="h-7 w-48" />
                <Skeleton className="h-4 w-64" />
            </CardHeader>
            <CardContent>
                <div className="grid gap-6">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                </div>
            </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" className="h-7 w-7" asChild>
            <Link href="/admin/departments">
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
            Edit Department
          </h1>
          <div className="hidden items-center gap-2 md:ml-auto md:flex">
            <Button variant="outline" size="sm" type="button" onClick={() => router.push('/admin/departments')}>
              Cancel
            </Button>
            <Button size="sm" type="submit" disabled={isSaving}>
              {isSaving ? 'Updating...' : 'Update Department'}
            </Button>
          </div>
        </div>
        <Card>
            <CardHeader>
            <CardTitle>Department Details</CardTitle>
            <CardDescription>
                Edit the details for your department.
            </CardDescription>
            </CardHeader>
            <CardContent>
            <div className="grid gap-6">
                <div className="grid gap-3">
                <Label htmlFor="name">Name</Label>
                <Input
                    id="name"
                    type="text"
                    className="w-full"
                    placeholder="Enter department name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                </div>
                <div className="grid gap-3">
                <Label htmlFor="slug">Slug</Label>
                <Input
                    id="slug"
                    type="text"
                    className="w-full"
                    placeholder="department-slug"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    required
                />
                <p className="text-sm text-muted-foreground">
                    This is the URL-friendly version of the name. It is usually all lowercase and contains only letters, numbers, and hyphens.
                </p>
                </div>
            </div>
            </CardContent>
        </Card>
        <div className="flex items-center justify-center gap-2 md:hidden">
          <Button variant="outline" size="sm" type="button" onClick={() => router.push('/admin/departments')}>
            Cancel
          </Button>
          <Button size="sm" type="submit" disabled={isSaving}>
            {isSaving ? 'Updating...' : 'Update Department'}
          </Button>
        </div>
      </div>
    </form>
  );
}
