
'use client';

import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { getCareerPageData, updateCareerPageData, getJobOpenings, type CareerPageData, type JobOpening, type CompanyBenefit } from '@/services/careerService';
import { JobOpeningsTable } from './job-openings-table';
import { PlusCircle, Trash2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface CareersAdminClientProps {
  initialPageData: CareerPageData;
  initialJobOpenings: JobOpening[];
}

export function CareersAdminClient({ initialPageData, initialJobOpenings }: CareersAdminClientProps) {
  const [data, setData] = useState<Partial<CareerPageData>>(initialPageData);
  const [jobOpenings, setJobOpenings] = useState<JobOpening[]>(initialJobOpenings);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const refreshData = useCallback(async () => {
    try {
      const [pageData, jobs] = await Promise.all([
        getCareerPageData(),
        getJobOpenings(),
      ]);
      setData(pageData);
      setJobOpenings(jobs);
    } catch (error) {
      console.error('Failed to refresh career data:', error);
      toast({
        variant: 'destructive',
        title: 'Failed to refresh data',
      });
    }
  }, [toast]);

  const handleInputChange = (field: keyof Omit<CareerPageData, 'benefits'>, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const handleBenefitChange = (index: number, field: keyof CompanyBenefit, value: string) => {
    const updatedBenefits = [...(data.benefits || [])];
    const benefitToUpdate = { ...updatedBenefits[index], [field]: value };
    updatedBenefits[index] = benefitToUpdate;
    setData((prev) => ({ ...prev, benefits: updatedBenefits }));
  };

  const handleAddBenefit = () => {
    const newBenefit: CompanyBenefit = { icon: 'Star', title: '', description: '' };
    setData(prev => ({ ...prev, benefits: [...(prev.benefits || []), newBenefit] }));
  };
  
  const handleRemoveBenefit = (index: number) => {
    const updatedBenefits = (data.benefits || []).filter((_, i) => i !== index);
    setData(prev => ({ ...prev, benefits: updatedBenefits }));
  };

  const handleSaveChanges = async () => {
    setIsSaving(true);
    try {
      await updateCareerPageData(data);
      toast({
        title: 'Success!',
        description: 'Career page content has been updated.',
      });
    } catch (error) {
      console.error('Failed to save changes:', error);
      toast({
        variant: 'destructive',
        title: 'Failed to save',
        description: 'An error occurred while saving your changes.',
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Manage Careers Page</h1>
          <p className="text-muted-foreground">Update the content displayed on the public careers page.</p>
        </div>
        <Button onClick={handleSaveChanges} disabled={isSaving}>
          {isSaving ? 'Saving...' : 'Save All Changes'}
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Hero Section</CardTitle>
          <CardDescription>The main title and introductory text at the top of the page.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="heroTitle">Hero Title</Label>
            <Input id="heroTitle" value={data.heroTitle || ''} onChange={(e) => handleInputChange('heroTitle', e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="heroDescription">Hero Description</Label>
            <Textarea id="heroDescription" value={data.heroDescription || ''} onChange={(e) => handleInputChange('heroDescription', e.target.value)} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Job Openings</CardTitle>
           <CardDescription>Manage the list of available jobs.</CardDescription>
        </CardHeader>
        <CardContent>
          <JobOpeningsTable initialJobs={jobOpenings} onJobsChange={refreshData} />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Why Join Us Section</CardTitle>
          <CardDescription>Highlight the benefits and culture of your company.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="whyJoinTitle">Section Title</Label>
              <Input id="whyJoinTitle" value={data.whyJoinTitle || ''} onChange={(e) => handleInputChange('whyJoinTitle', e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="whyJoinDescription">Section Description</Label>
              <Input id="whyJoinDescription" value={data.whyJoinDescription || ''} onChange={(e) => handleInputChange('whyJoinDescription', e.target.value)} />
            </div>
          </div>
          <Separator />
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <Label>Company Benefits</Label>
               <Button variant="outline" size="sm" onClick={handleAddBenefit}>
                <PlusCircle className="mr-2 h-4 w-4" /> Add Benefit
              </Button>
            </div>
            <div className="space-y-4">
              {data.benefits?.map((benefit, index) => (
                <Card key={index} className="p-4 bg-muted/50">
                  <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_auto] gap-4 items-end">
                    <div className="grid gap-1.5">
                      <Label htmlFor={`benefit-icon-${index}`}>Icon Name</Label>
                      <Input id={`benefit-icon-${index}`} value={benefit.icon} onChange={(e) => handleBenefitChange(index, 'icon', e.target.value)} placeholder="e.g., Users" />
                    </div>
                     <div className="grid gap-1.5">
                      <Label htmlFor={`benefit-title-${index}`}>Title</Label>
                      <Input id={`benefit-title-${index}`} value={benefit.title} onChange={(e) => handleBenefitChange(index, 'title', e.target.value)} />
                    </div>
                     <div className="grid gap-1.5">
                      <Label htmlFor={`benefit-desc-${index}`}>Description</Label>
                      <Input id={`benefit-desc-${index}`} value={benefit.description} onChange={(e) => handleBenefitChange(index, 'description', e.target.value)} />
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => handleRemoveBenefit(index)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                      <span className="sr-only">Remove Benefit</span>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
         <Button onClick={handleSaveChanges} disabled={isSaving}>
          {isSaving ? 'Saving...' : 'Save All Changes'}
        </Button>
      </div>
    </div>
  );
}
