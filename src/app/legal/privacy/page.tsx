import type { Metadata } from 'next';

import { PrivacyContent } from './PrivacyContent';

export const metadata: Metadata = {
  title: 'Privacy',
  description:
    'What Agent Tea collects, why, where it lives, and how to ask for it to be deleted.',
};

export default function PrivacyPage() {
  return <PrivacyContent />;
}
