
import { getDepartments } from '@/services/departmentService';
import { DepartmentsClient } from './departments-client';

export default async function DepartmentsPage() {
  const initialDepartments = await getDepartments();
  return <DepartmentsClient initialDepartments={initialDepartments} />;
}
