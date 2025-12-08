
import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { getFrontendSettings } from '@/services/settingsService';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getFrontendSettings();

  const title = settings.ogTitle || 'PT Kemas Indah Maju';
  const description = settings.ogDescription || 'A modern blog for PT Kemas Indah Maju.';

  return {
    title: {
      default: title,
      template: `%s | ${title}`,
    },
    description: description,
    openGraph: {
      title: title,
      description: description,
      images: [
        {
          url: settings.ogImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: 'website',
      siteName: title,
    },
    twitter: {
        card: 'summary_large_image',
        title: title,
        description: description,
        images: [settings.ogImageUrl],
    }
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/led6pcw.css" />
      </head>
      <body className="antialiased">
          {children}
          <Toaster />
      </body>
    </html>
  );
}
