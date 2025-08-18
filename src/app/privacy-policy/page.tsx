
import { getFrontendSettings } from '@/services/settingsService';
import { SiteHeaderWrapper } from '@/components/site-header-wrapper';
import { SiteFooter } from '@/components/site-footer';
import { PrivacyPolicyClientContent } from './privacy-policy-client-content';

export default async function PrivacyPolicyPage() {
  let settings = null;
  let error = null;

  try {
    settings = await getFrontendSettings();
  } catch (e: any) {
    console.error("Failed to fetch settings for privacy policy:", e.message);
    error = e.message;
  }
  
  return (
    <div className="bg-[#EFECE9] dark:bg-[#050505] text-[#050505] dark:text-[#EFECE9]">
        <SiteHeaderWrapper />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
            <h1 className="text-2xl md:text-5xl font-extrabold leading-tight mb-8 text-foreground">
                Privacy Policy
            </h1>
            <PrivacyPolicyClientContent 
                content={settings?.privacyPolicy || ''} 
                error={error}
            />
        </main>
        {settings && <SiteFooter settings={settings} />}
    </div>
  );
}
