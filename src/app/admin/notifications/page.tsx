import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getNotifications } from '@/services/notificationService';
import { NotificationsTable } from './notifications-table';

export default async function ManageNotificationsPage() {
  const notifications = await getNotifications();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage Notifications</CardTitle>
        <CardDescription>Create, edit, and delete notifications that appear in the site header.</CardDescription>
      </CardHeader>
      <CardContent>
        <NotificationsTable initialNotifications={notifications} />
      </CardContent>
    </Card>
  );
}
