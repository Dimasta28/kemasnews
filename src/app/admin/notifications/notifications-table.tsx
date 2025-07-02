'use client';

import { useState } from 'react';
import { MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useToast } from '@/hooks/use-toast';
import { deleteNotification, type Notification } from '@/services/notificationService';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface NotificationsGridProps {
  notifications: Notification[];
  onEdit: (notification: Notification) => void;
  onDelete: () => void;
}

export function NotificationsTable({ notifications, onEdit, onDelete }: NotificationsGridProps) {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [notificationToDelete, setNotificationToDelete] = useState<string | null>(null);
  const { toast } = useToast();

  const confirmDelete = (id: string) => {
    setNotificationToDelete(id);
    setIsAlertOpen(true);
  };

  const handleDelete = async () => {
    if (!notificationToDelete) return;
    try {
      await deleteNotification(notificationToDelete);
      toast({ title: 'Success!', description: 'Notification deleted.' });
      onDelete();
    } catch (error) {
      console.error('Failed to delete notification:', error);
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to delete notification.' });
    }
    setIsAlertOpen(false);
    setNotificationToDelete(null);
  };

  if (notifications.length === 0) {
    return (
      <div className="flex items-center justify-center h-48 rounded-lg border border-dashed">
        <p className="text-muted-foreground">No notifications found.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notifications.map((notification) => (
          <Card key={notification.id} className="flex flex-col">
            <CardHeader>
              <div className="flex justify-between items-start gap-4">
                <CardTitle className="text-lg leading-snug">{notification.title}</CardTitle>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onEdit(notification)}>Edit</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10" onClick={() => confirmDelete(notification.id)}>Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="flex-grow space-y-3">
              <p className="text-sm text-muted-foreground">{notification.description}</p>
              <Separator />
              <div className="space-y-2 text-sm">
                 <div className="flex justify-between items-center">
                   <span className="font-medium text-muted-foreground">Link:</span>
                   <a href={notification.link} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline truncate ml-2 max-w-[150px]">{notification.link}</a>
                 </div>
                 <div className="flex justify-between items-center">
                   <span className="font-medium text-muted-foreground">Status:</span>
                   <Badge variant={notification.read ? "outline" : "secondary"}>
                     {notification.read ? 'Read' : 'Unread'}
                   </Badge>
                 </div>
                 <div className="flex justify-between items-center">
                   <span className="font-medium text-muted-foreground">Created:</span>
                   <span className="text-muted-foreground">{notification.createdAt}</span>
                 </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>This action cannot be undone. This will permanently delete the notification.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
