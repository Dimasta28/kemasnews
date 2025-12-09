
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function DialogPage() {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);

  return (
    <div className="p-8 space-y-4">
        <h1 className="text-2xl font-bold">Dialog Component Examples</h1>
        
        {/* Create Dialog */}
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogTrigger asChild>
            <Button variant="outline">Create Item</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
            <DialogTitle>Create New Item</DialogTitle>
            <DialogDescription>
                Fill in the details below to create a new item.
            </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                Name
                </Label>
                <Input id="name" defaultValue="New Gadget" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                SKU
                </Label>
                <Input id="username" defaultValue="NG-001" className="col-span-3" />
            </div>
            </div>
            <DialogFooter>
            <Button type="submit" onClick={() => setIsCreateOpen(false)}>Save changes</Button>
            </DialogFooter>
        </DialogContent>
        </Dialog>

        {/* Update Dialog */}
         <Dialog open={isUpdateOpen} onOpenChange={setIsUpdateOpen}>
        <DialogTrigger asChild>
            <Button>Update Profile</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
                Make changes to your profile here. Click save when you're done.
            </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                Name
                </Label>
                <Input id="name" defaultValue="John Doe" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                Username
                </Label>
                <Input id="username" defaultValue="@johndoe" className="col-span-3" />
            </div>
            </div>
            <DialogFooter>
                <DialogClose asChild>
                    <Button type="button" variant="secondary">
                        Close
                    </Button>
                </DialogClose>
                <Button type="submit" onClick={() => setIsUpdateOpen(false)}>Save changes</Button>
            </DialogFooter>
        </DialogContent>
        </Dialog>


        {/* Delete Confirmation Dialog */}
        <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogTrigger asChild>
            <Button variant="destructive">Delete Account</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
            <DialogHeader>
            <DialogTitle>Are you sure you want to delete?</DialogTitle>
            <DialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
            </DialogDescription>
            </DialogHeader>
            <DialogFooter className="sm:justify-end">
            <DialogClose asChild>
                <Button type="button" variant="secondary">
                Cancel
                </Button>
            </DialogClose>
             <Button type="button" variant="destructive" onClick={() => setIsDeleteOpen(false)}>
                Delete
            </Button>
            </DialogFooter>
        </DialogContent>
        </Dialog>
    </div>
  );
}

    