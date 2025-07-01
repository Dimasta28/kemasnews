
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Image from 'next/image';
import { Building, MapPin, Users, Heart, Coffee, Shield } from 'lucide-react';

const jobOpenings = [
  {
    title: 'Senior Frontend Developer',
    department: 'Engineering',
    location: 'Jakarta, Indonesia',
    type: 'Full-time',
  },
  {
    title: 'Product Manager',
    department: 'Product',
    location: 'Remote',
    type: 'Full-time',
  },
  {
    title: 'UI/UX Designer',
    department: 'Design',
    location: 'Bandung, Indonesia',
    type: 'Contract',
  },
  {
    title: 'Backend Engineer (Go)',
    department: 'Engineering',
    location: 'Jakarta, Indonesia',
    type: 'Full-time',
  },
    {
    title: 'Digital Marketing Specialist',
    department: 'Marketing',
    location: 'Remote',
    type: 'Full-time',
  },
    {
    title: 'HR Generalist',
    department: 'Human Resources',
    location: 'Jakarta, Indonesia',
    type: 'Full-time',
  },
];

const companyBenefits = [
    {
        icon: Users,
        title: 'Collaborative Culture',
        description: 'Work with a diverse and talented team that values open communication.'
    },
    {
        icon: Heart,
        title: 'Health & Wellness',
        description: 'Comprehensive health insurance and wellness programs for you and your family.'
    },
    {
        icon: Coffee,
        title: 'Flexible Work',
        description: 'We offer flexible work hours and remote options to support work-life balance.'
    },
    {
        icon: Shield,
        title: 'Career Growth',
        description: 'Opportunities for professional development, training, and career advancement.'
    }
]

export default function CareersPage() {
  return (
    <div className="bg-[#EFECE9] dark:bg-[#050505] text-[#050505] dark:text-[#EFECE9]">
      <SiteHeader />
      <main>
        {/* Hero Section */}
        <section className="relative h-[60vh] flex items-center justify-center text-center text-white bg-black">
            <Image
                src="https://placehold.co/1920x1080.png"
                alt="Our team at work"
                layout="fill"
                objectFit="cover"
                className="z-0 opacity-40"
                data-ai-hint="office team collaboration"
                priority
            />
            <div className="relative z-10 max-w-3xl p-8">
                <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4">
                    Build The Future With Us
                </h1>
                <p className="text-lg md:text-xl text-gray-200">
                    We're looking for passionate people to join our mission. Explore our open positions and find your place at PT. Kemas.
                </p>
            </div>
        </section>

        {/* Job Listings Section */}
        <section id="open-positions" className="py-16 md:py-24">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground">Open Positions</h2>
                    <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
                        Find the role that's right for you. We're always looking for talented individuals to join our growing team.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {jobOpenings.map((job, index) => (
                        <Card key={index} className="bg-card/80 hover:shadow-2xl transition-shadow duration-300">
                            <CardHeader>
                                <CardTitle>{job.title}</CardTitle>
                                <CardDescription>{job.type}</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center text-sm text-muted-foreground gap-2">
                                    <Building className="h-4 w-4" />
                                    <span>{job.department}</span>
                                </div>
                                <div className="flex items-center text-sm text-muted-foreground gap-2">
                                    <MapPin className="h-4 w-4" />
                                    <span>{job.location}</span>
                                </div>
                                <Button className="w-full mt-4">View Details</Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
        
        {/* Why Join Us Section */}
        <section className="py-16 md:py-24 bg-card/60">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground">Why Join PT. Kemas?</h2>
                    <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
                        We're more than just a company. We're a community of innovators, thinkers, and creators.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {companyBenefits.map((benefit, index) => {
                        const Icon = benefit.icon;
                        return (
                            <div key={index} className="text-center p-6 bg-background/50 rounded-lg">
                                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mx-auto mb-4">
                                    <Icon className="h-8 w-8" />
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
      <SiteFooter />
    </div>
  );
}
