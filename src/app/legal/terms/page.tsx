import type { Metadata } from 'next';

import { TermsContent } from './TermsContent';

export const metadata: Metadata = {
  title: 'Terms',
  description:
    'The rules of the road for using Agent Tea — lightweight, plain English.',
};

export default function TermsPage() {
  return <TermsContent />;
}
