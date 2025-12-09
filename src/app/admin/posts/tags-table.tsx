
'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

// This is a placeholder. You'd fetch and display real tags in a real app.
const mockTags = [
  { name: 'sustainability', count: 12 },
  { name: 'packaging', count: 8 },
  { name: 'innovation', count: 15 },
  { name: 'eco-friendly', count: 10 },
  { name: 'materials', count: 5 },
];

export function TagsTable({ tags }: { tags: any[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead className="text-right">Post Count</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {mockTags.length > 0 ? (
          mockTags.map((tag) => (
            <TableRow key={tag.name}>
              <TableCell className="font-medium capitalize">{tag.name}</TableCell>
              <TableCell className="text-right">{tag.count}</TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={2} className="h-24 text-center">
              No tags found. Start adding tags to your posts.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
