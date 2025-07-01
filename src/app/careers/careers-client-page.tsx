
'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Building, MapPin, Calendar } from 'lucide-react';
import { DynamicIcon } from '@/components/ui/dynamic-icon';
import { Separator } from '@/components/ui/separator';
import { type CareerPageData, type JobOpening } from '@/services/careerService';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

interface CareersClientPageProps {
  initialPageData: CareerPageData;
  initialJobOpenings: JobOpening[];
}

export function CareersClientPage({ initialPageData, initialJobOpenings }: CareersClientPageProps) {
    const [selectedDepartment, setSelectedDepartment] = useState('All');

    const departments = useMemo(() => {
        const uniqueDepartments = [...new Set(initialJobOpenings.map(job => job.department))];
        return ['All', ...uniqueDepartments];
    }, [initialJobOpenings]);

    const filteredJobs = useMemo(() => {
        if (selectedDepartment === 'All') {
            return initialJobOpenings;
        }
        return initialJobOpenings.filter(job => job.department === selectedDepartment);
    }, [initialJobOpenings, selectedDepartment]);


    return (
        <main>
            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-center justify-center text-center text-white bg-black">
                <Image
                    src={initialPageData.heroImageUrl}
                    alt="Our team at work"
                    fill
                    className="z-0 opacity-40 object-cover"
                    data-ai-hint="office team collaboration"
                    priority
                />
                <div className="relative z-10 max-w-3xl p-8">
                    <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4">
                        {initialPageData.heroTitle}
                    </h1>
                    <p className="text-lg md:text-xl text-gray-200">
                        {initialPageData.heroDescription}
                    </p>
                </div>
            </section>

            {/* Job Listings Section */}
            <section id="open-positions" className="py-16 md:py-24">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground">{initialPageData.positionsTitle || 'Open Positions'}</h2>
                        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
                            {initialPageData.positionsDescription || 'Find the role that\'s right for you.'}
                        </p>
                    </div>

                    {/* Department Filter */}
                    {departments.length > 1 && (
                        <div className="flex justify-center mb-10">
                            <ToggleGroup
                                type="single"
                                defaultValue="All"
                                value={selectedDepartment}
                                onValueChange={(value) => {
                                    if (value) setSelectedDepartment(value);
                                }}
                                className="flex-wrap justify-center gap-2"
                            >
                                {departments.map((department) => (
                                    <ToggleGroupItem key={department} value={department} aria-label={`Filter by ${department}`}>
                                        {department}
                                    </ToggleGroupItem>
                                ))}
                            </ToggleGroup>
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredJobs.length > 0 ? filteredJobs.map((job) => (
                            <Card key={job.id} className="bg-card/80 hover:shadow-2xl transition-shadow duration-300 flex flex-col overflow-hidden">
                                {job.imageUrl && (
                                    <div className="relative w-full h-48">
                                        <Image
                                            src={job.imageUrl}
                                            alt={job.title}
                                            fill
                                            className="object-cover"
                                            data-ai-hint="office workspace job"
                                        />
                                    </div>
                                )}
                                <CardHeader>
                                    <CardTitle>{job.title}</CardTitle>
                                    <CardDescription>{job.type}</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4 flex-grow flex flex-col">
                                    <div className="space-y-2">
                                        <div className="flex items-center text-sm text-muted-foreground gap-2">
                                            <Building className="h-4 w-4 flex-shrink-0" />
                                            <span>{job.department}</span>
                                        </div>
                                        <div className="flex items-center text-sm text-muted-foreground gap-2">
                                            <MapPin className="h-4 w-4 flex-shrink-0" />
                                            <span>{job.location}</span>
                                        </div>
                                        <div className="flex items-center text-sm text-muted-foreground gap-2">
                                            <Calendar className="h-4 w-4 flex-shrink-0" />
                                            <span>{job.createdAt}</span>
                                        </div>
                                    </div>
                                    {job.qualifications && (
                                        <div className="pt-4 mt-auto">
                                            <Separator className="my-2" />
                                            <h4 className="font-semibold text-sm mt-4 mb-2">Qualifications</h4>
                                            <div className="text-sm text-muted-foreground space-y-2 whitespace-pre-wrap">
                                                {job.qualifications}
                                            </div>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        )) : (
                            <div className="col-span-full text-center text-muted-foreground py-10">
                                <p>There are currently no open positions for the selected department.</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>
            
            {/* Why Join Us Section */}
            <section className="py-16 md:py-24 bg-card/60">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground">{initialPageData.whyJoinTitle}</h2>
                        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
                            {initialPageData.whyJoinDescription}
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {initialPageData.benefits.map((benefit, index) => {
                            return (
                                <div key={index} className="text-center p-6 bg-background/50 rounded-lg">
                                    <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mx-auto mb-4">
                                        <DynamicIcon name={benefit.icon} className="h-8 w-8" />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                                    <p className="text-muted-foreground">{benefit.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </main>
    );
}
