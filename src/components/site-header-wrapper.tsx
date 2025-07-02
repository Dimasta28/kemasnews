import { getFrontendSettings } from '@/services/settingsService';
import { getNotifications } from '@/services/notificationService';
import { SiteHeader } from './site-header';

export async function SiteHeaderWrapper() {
  const settings = await getFrontendSettings();
  const notifications = await getNotifications();
  return <SiteHeader settings={settings} notifications={notifications} />;
}
