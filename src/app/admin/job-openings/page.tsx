import { getJobOpenings } from '@/services/careerService';
import { JobOpeningsClient } from './job-openings-client';

export default async function ManageJobOpeningsPage() {
  const initialJobOpenings = await getJobOpenings();

  return <JobOpeningsClient initialJobOpenings={initialJobOpenings} />;
}
