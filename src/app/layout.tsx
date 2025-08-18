
import type {Metadata} from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from '@/components/theme-provider';
import { getFrontendSettings } from '@/services/settingsService';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const space_grotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk' });


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
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={`${inter.variable} ${space_grotesk.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
