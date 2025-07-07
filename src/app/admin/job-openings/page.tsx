import { getJobOpenings } from '@/services/careerService';
import { getDepartments } from '@/services/departmentService';
import { JobOpeningsClient } from './job-openings-client';

export default async function ManageJobOpeningsPage() {
  const [initialJobOpenings, initialDepartments] = await Promise.all([
    getJobOpenings(),
    getDepartments()
  ]);

  return <JobOpeningsClient 
            initialJobOpenings={initialJobOpenings} 
            initialDepartments={initialDepartments} 
        />;
}
