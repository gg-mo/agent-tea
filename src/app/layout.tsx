import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';
import { LanguageToggle } from '@/components/shared/LanguageToggle';
import { SiteFooter } from '@/components/shared/SiteFooter';
import { I18nProvider } from '@/lib/i18n/I18nProvider';
import { getClientEnv } from '@/lib/env';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: 'Agent Tea — Your AI has tea about you.',
    template: '%s · Agent Tea',
  },
  description: 'Find out how your AI reads your style — in under two minutes.',
  openGraph: {
    title: 'Agent Tea — Your AI has tea about you.',
    description: 'Find out how your AI reads your style — in under two minutes.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Agent Tea — Your AI has tea about you.',
    description: 'Find out how your AI reads your style — in under two minutes.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fail fast on missing client-visible env values with actionable error messages.
  getClientEnv();

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <I18nProvider>
          <LanguageToggle />
          {children}
          <SiteFooter />
        </I18nProvider>
        <Analytics />
      </body>
    </html>
  );
}
