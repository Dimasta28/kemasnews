
'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@/components/ui/table';

interface TagsTableProps {
  tags: any[];
}

export function TagsTable({ tags }: TagsTableProps) {
  return (
    <div className="rounded-md border">
       <Table>
          <TableBody>
             <TableRow>
                <TableCell colSpan={4} className="h-48 text-center">
                    <h3 className="font-semibold">Coming Soon</h3>
                    <p className="text-muted-foreground">Tag management is currently under development.</p>
                </TableCell>
              </TableRow>
          </TableBody>
        </Table>
    </div>
  );
}
