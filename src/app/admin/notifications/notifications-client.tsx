'use client';

import { useState, useCallback } from 'react';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getNotifications, type Notification } from '@/services/notificationService';
import { useToast } from '@/hooks/use-toast';
import { NotificationsTable } from './notifications-table';
import { NotificationDialog } from './notification-dialog';

interface NotificationsClientProps {
  initialNotifications: Notification[];
}

export function NotificationsClient({ initialNotifications }: NotificationsClientProps) {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
  const { toast } = useToast();

  const refreshNotifications = useCallback(async () => {
    try {
      const freshNotifications = await getNotifications();
      setNotifications(freshNotifications);
    } catch (error) {
      toast({ variant: 'destructive', title: 'Error', description: 'Could not refresh notifications.' });
    }
  }, [toast]);
  
  const handleCreate = () => {
    setSelectedNotification(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (notification: Notification) => {
    setSelectedNotification(notification);
    setIsDialogOpen(true);
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Manage Notifications</CardTitle>
            <CardDescription>Create, edit, and delete notifications that appear in the site header.</CardDescription>
          </div>
          <Button size="sm" onClick={handleCreate} className="gap-1">
            <PlusCircle className="h-4 w-4" /> Create Notification
          </Button>
        </CardHeader>
        <CardContent>
          <NotificationsTable 
            notifications={notifications}
            onEdit={handleEdit}
            onDelete={refreshNotifications}
          />
        </CardContent>
      </Card>

      <NotificationDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onNotificationSaved={refreshNotifications}
        notification={selectedNotification}
      />
    </>
  );
}
