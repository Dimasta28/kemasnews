import { SiteHeaderWrapper } from '@/components/site-header-wrapper';
import { SiteFooter } from '@/components/site-footer';
import { getFrontendSettings } from '@/services/settingsService';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';

export default async function GreenPanPage() {
  const settings = await getFrontendSettings();

  const greenPlanSteps = [
    "Reduce carbon footprint in our manufacturing processes.",
    "Increase the use of recycled and recyclable materials.",
    "Innovate on refillable and reusable packaging solutions.",
    "Optimize energy and water consumption in all facilities.",
    "Partner with suppliers who share our sustainability commitment.",
    "Achieve zero-waste-to-landfill status by 2030."
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#EFECE9] dark:bg-[#050505]">
      <SiteHeaderWrapper />
      <main className="flex-grow container mx-auto px-4 py-12 sm:py-20">
        <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold text-foreground tracking-tight">Our Green Plan</h1>
            <p className="mt-4 text-lg text-muted-foreground">
                A transparent look at our actionable steps towards a more sustainable future in packaging.
            </p>
        </div>

        <Card className="mt-12 max-w-3xl mx-auto">
            <CardHeader>
                <CardTitle>Our Key Initiatives</CardTitle>
            </CardHeader>
            <CardContent>
                <ul className="space-y-4">
                    {greenPlanSteps.map((step, index) => (
                        <li key={index} className="flex items-start gap-3">
                            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/20 text-primary flex items-center justify-center mt-1">
                                <Check className="h-4 w-4" />
                            </div>
                            <span className="text-base text-foreground">{step}</span>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>

      </main>
      {settings && <SiteFooter settings={settings} />}
    </div>
  );
}
