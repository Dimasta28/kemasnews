
import { getGreenJourneySubmissions } from '@/services/greenJourneySubmissionService';
import { SubmissionsClient } from './submissions-client';

export default async function SubmissionsPage() {
  const initialSubmissions = await getGreenJourneySubmissions();

  return <SubmissionsClient initialSubmissions={initialSubmissions} />;
}
