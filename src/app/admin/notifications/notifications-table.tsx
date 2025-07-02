'use client';

import { useState, useCallback } from 'react';
import { MoreHorizontal, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { useToast } from '@/hooks/use-toast';
import { deleteNotification, type Notification, getNotifications } from '@/services/notificationService';
import { NotificationDialog } from './notification-dialog';
import { Badge } from '@/components/ui/badge';

interface NotificationsTableProps {
  initialNotifications: Notification[];
}

export function NotificationsTable({ initialNotifications }: NotificationsTableProps) {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [notificationToDelete, setNotificationToDelete] = useState<string | null>(null);
  const { toast } = useToast();

  const refreshNotifications = useCallback(async () => {
    const freshNotifications = await getNotifications();
    setNotifications(freshNotifications);
  }, []);

  const handleCreate = () => {
    setSelectedNotification(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (notification: Notification) => {
    setSelectedNotification(notification);
    setIsDialogOpen(true);
  };

  const confirmDelete = (id: string) => {
    setNotificationToDelete(id);
    setIsAlertOpen(true);
  };

  const handleDelete = async () => {
    if (!notificationToDelete) return;
    try {
      await deleteNotification(notificationToDelete);
      toast({ title: 'Success!', description: 'Notification deleted.' });
      refreshNotifications();
    } catch (error) {
      console.error('Failed to delete notification:', error);
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to delete notification.' });
    }
    setIsAlertOpen(false);
    setNotificationToDelete(null);
  };

  return (
    <>
      <div className="flex justify-end mb-4">
        <Button size="sm" onClick={handleCreate}>
          <PlusCircle className="mr-2 h-4 w-4" /> Create Notification
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Link</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead><span className="sr-only">Actions</span></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {notifications.length > 0 ? notifications.map((notification) => (
              <TableRow key={notification.id}>
                <TableCell className="font-medium">{notification.title}</TableCell>
                <TableCell>{notification.description}</TableCell>
                <TableCell>
                  <a href={notification.link} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{notification.link}</a>
                </TableCell>
                <TableCell>
                  <Badge variant={notification.read ? "outline" : "secondary"}>
                    {notification.read ? 'Read' : 'Unread'}
                  </Badge>
                </TableCell>
                <TableCell>{notification.createdAt}</TableCell>
                <TableCell className="text-right">
                   <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEdit(notification)}>Edit</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10" onClick={() => confirmDelete(notification.id)}>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            )) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">No notifications found.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      <NotificationDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onNotificationSaved={refreshNotifications}
        notification={selectedNotification}
      />

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
