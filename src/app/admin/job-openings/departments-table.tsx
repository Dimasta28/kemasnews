'use client';

import { useState } from 'react';
import { MoreHorizontal, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useToast } from '@/hooks/use-toast';
import { deleteDepartment, type Department } from '@/services/departmentService';
import { DepartmentDialog } from './department-dialog';

interface DepartmentsTableProps {
  departments: Department[];
}

export function DepartmentsTable({ departments }: DepartmentsTableProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [departmentToDelete, setDepartmentToDelete] = useState<string | null>(null);
  const { toast } = useToast();

  const handleCreate = () => {
    setSelectedDepartment(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (department: Department) => {
    setSelectedDepartment(department);
    setIsDialogOpen(true);
  };

  const confirmDelete = (id: string) => {
    setDepartmentToDelete(id);
    setIsAlertOpen(true);
  };

  const handleDelete = async () => {
    if (!departmentToDelete) return;
    try {
      await deleteDepartment(departmentToDelete);
      toast({ title: 'Success!', description: 'Department deleted.' });
    } catch (error) {
      console.error('Failed to delete department:', error);
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to delete department.' });
    }
    setIsAlertOpen(false);
    setDepartmentToDelete(null);
  };

  return (
    <>
      <div className="flex justify-end mb-4">
        <Button size="sm" onClick={handleCreate}>
          <PlusCircle className="mr-2 h-4 w-4" /> Create Department
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead><span className="sr-only">Actions</span></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {departments.length > 0 ? departments.map((department) => (
              <TableRow key={department.id}>
                <TableCell className="font-medium">{department.name}</TableCell>
                <TableCell>{department.slug}</TableCell>
                <TableCell className="text-right">
                   <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEdit(department)}>Edit</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10" onClick={() => confirmDelete(department.id)}>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            )) : (
              <TableRow>
                <TableCell colSpan={3} className="h-24 text-center">No departments found.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      <DepartmentDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        department={selectedDepartment}
      />

      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>This action cannot be undone. This will permanently delete the department.</AlertDialogDescription>
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
