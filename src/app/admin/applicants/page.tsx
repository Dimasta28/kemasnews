import { getApplicants } from '@/services/applicantService';
import { ApplicantsClient } from './applicants-client';

export default async function ApplicantsPage() {
  const initialApplicants = await getApplicants();
  return <ApplicantsClient initialApplicants={initialApplicants} />;
}
