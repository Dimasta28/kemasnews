import { getNotifications } from '@/services/notificationService';
import { NotificationsClient } from './notifications-client';

export default async function ManageNotificationsPage() {
  const notifications = await getNotifications();

  return <NotificationsClient initialNotifications={notifications} />;
}
