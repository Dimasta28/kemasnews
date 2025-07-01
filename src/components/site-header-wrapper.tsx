import { getFrontendSettings } from '@/services/settingsService';
import { SiteHeader } from './site-header';

export async function SiteHeaderWrapper() {
  const settings = await getFrontendSettings();
  return <SiteHeader settings={settings} />;
}
