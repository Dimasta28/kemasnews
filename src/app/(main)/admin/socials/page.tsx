import { SocialsTable } from "@/components/admin/socials-table";
import { getSocialLinks } from "@/lib/posts";

export default async function AdminSocialsPage() {
  const socialLinks = await getSocialLinks();

  return <SocialsTable socialLinks={socialLinks} />;
}
