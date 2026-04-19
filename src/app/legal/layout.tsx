import { TeaHomeBadge } from '@/components/shared/TeaHomeBadge';

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main
      className="min-h-screen px-6 pb-16 pt-24 text-slate-100 sm:px-10 sm:pt-28"
      style={{
        background:
          'linear-gradient(145deg, var(--tea-bg-deep) 0%, var(--tea-bg-mid) 45%, var(--tea-bg-glow) 100%)',
      }}
    >
      <TeaHomeBadge />
      <article className="mx-auto max-w-2xl">{children}</article>
    </main>
  );
}
