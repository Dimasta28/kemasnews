
import { getCareerPageData, getJobOpenings } from '@/services/careerService';
import { CareersAdminClient } from './careers-admin-client';

export default async function ManageCareersPage() {
  // Fetch data on the server
  const [pageData, jobs] = await Promise.all([
    getCareerPageData(),
    getJobOpenings(),
  ]);

  // Pass data to the client component
  return <CareersAdminClient initialPageData={pageData} initialJobOpenings={jobs} />;
}
