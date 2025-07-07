import { getCareerPageData } from '@/services/careerService';
import { CareersAdminClient } from './careers-admin-client';

export default async function ManageCareersPage() {
  // Fetch data on the server
  const pageData = await getCareerPageData();

  // Pass data to the client component
  return <CareersAdminClient initialPageData={pageData} />;
}
