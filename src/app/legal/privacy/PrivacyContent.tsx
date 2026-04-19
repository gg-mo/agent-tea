'use client';

import { useI18n } from '@/lib/i18n/I18nProvider';

export function PrivacyContent() {
  const { lang, t } = useI18n();
  return (
    <>
      <p className="tea-eyebrow text-cyan-200/85">
        {lang === 'zh' ? '隐私说明' : 'Privacy notice'}
      </p>
      <h1 className="tea-display mt-3 text-[2.25rem] leading-[1.1] text-white sm:text-[2.75rem]">
        {lang === 'zh' ? '人话版。' : 'The short, plain-English version.'}
      </h1>
      <p className="mt-3 text-xs uppercase tracking-widest text-slate-400">
        {t('legal.lastUpdated')} {t('legal.updatedDate')}
      </p>

      <div className="mt-10 space-y-8 text-[1rem] leading-[1.75] text-slate-200/90">
        {lang === 'zh' ? <PrivacyZh /> : <PrivacyEn />}
      </div>
    </>
  );
}

function PrivacyEn() {
  return (
    <>
      <section>
        <h2 className="text-lg font-semibold text-white">What Agent Tea is</h2>
        <p className="mt-2">
          Agent Tea is a for-fun personality snapshot. You (or your chatbot)
          answer 32 Likert questions, and we build a four-letter &ldquo;type&rdquo;
          based on the responses. That&rsquo;s it. We are not a psychological
          assessment, and nothing here is medical, diagnostic, or HR-grade.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-white">What we collect</h2>
        <ul className="mt-2 space-y-2 list-disc pl-5">
          <li>
            <strong>Your answers.</strong> The 1–5 values for each question,
            tied to a random session ID we generate for you.
          </li>
          <li>
            <strong>A referral code,</strong> if you arrived via a share link.
            Stored in your browser&rsquo;s <code>localStorage</code> so we can
            credit the person who sent you.
          </li>
          <li>
            <strong>Basic usage events</strong> (page views, button clicks,
            copy-quote, share-card opens) — no keystrokes, no mouse tracking.
          </li>
          <li>
            <strong>Privacy-friendly analytics</strong> via Vercel Analytics
            (aggregate visit counts, country, device class). No cookies set
            for advertising.
          </li>
          <li>
            <strong>If you sign in,</strong> an email address via Supabase Auth
            so you can reopen past reveals.
          </li>
        </ul>
        <p className="mt-3">
          We do <em>not</em> collect the free-text you paste during a session
          (the encoded payload is parsed for numeric answers only and then the
          raw string is dropped).
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-white">Where it lives</h2>
        <p className="mt-2">
          Sessions and answers are stored in Supabase (Postgres, hosted in the
          EU/US depending on project region). The site is served via Vercel.
          Both are standard managed infrastructure providers acting as
          processors on our behalf.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-white">How long we keep it</h2>
        <p className="mt-2">
          While Agent Tea is live, we generally keep session data so your
          result link keeps working. If you want a specific session or your
          whole account removed, email us and we&rsquo;ll take care of it.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-white">Your choices</h2>
        <p className="mt-2">
          You can clear your referral by clearing site storage. You can ask us
          to delete a specific session (send us the session ID) or your
          account. If you&rsquo;re in the EU/UK, you also have the usual GDPR
          rights: access, correction, deletion, objection.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-white">Contact</h2>
        <p className="mt-2">
          Email{' '}
          <a
            href="mailto:happyhhour123@gmail.com"
            className="text-cyan-200 underline-offset-4 hover:underline"
          >
            happyhhour123@gmail.com
          </a>{' '}
          for anything privacy-related. We read everything, even the grumpy
          ones.
        </p>
      </section>
    </>
  );
}

function PrivacyZh() {
  return (
    <>
      <section>
        <h2 className="text-lg font-semibold text-white">Agent Tea 是什么</h2>
        <p className="mt-2">
          Agent Tea 是一个纯娱乐的人格小测试。你（或者你的聊天机器人）回答
          32 道 1–5 分的题，我们根据你的回答给出一个四字母「类型」。就这么简单。
          这不是心理评估，也不是任何医学、诊断、HR 意义上的工具。
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-white">我们收集什么</h2>
        <ul className="mt-2 space-y-2 list-disc pl-5">
          <li>
            <strong>你的答案。</strong>每道题的 1–5 分，绑定到一个我们为你随机生成的
            session ID。
          </li>
          <li>
            <strong>推荐码（referral code）。</strong>如果你是通过别人分享的链接进来的，
            我们会把推荐码存在你浏览器的 <code>localStorage</code> 里，方便给介绍人一个小小的功劳。
          </li>
          <li>
            <strong>基本使用事件</strong>（页面浏览、按钮点击、复制引用、打开分享卡片）——
            不记录按键，不追踪鼠标轨迹。
          </li>
          <li>
            <strong>对隐私友好的访问量统计</strong>（用 Vercel Analytics，聚合后的访问次数、国家、设备类型）。
            不为广告目的投放 cookie。
          </li>
          <li>
            <strong>如果你登录了，</strong>会用 Supabase Auth 保存你的邮箱，
            方便你回来查看之前的结果。
          </li>
        </ul>
        <p className="mt-3">
          我们<em>不</em>保留你粘进来的那段原文（那段编码只会被解析成数字答案，原字符串用完就丢）。
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-white">数据存哪</h2>
        <p className="mt-2">
          Session 和答案存在 Supabase（Postgres，根据项目区域部署在欧盟 / 美国）。
          站点由 Vercel 托管。两者都是标准的托管基础设施，以「处理者」身份替我们处理数据。
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-white">保留多久</h2>
        <p className="mt-2">
          Agent Tea 在线期间，我们一般会保留你的 session 数据，保证结果链接能持续打开。
          如果你想删除某个 session 或整个账户，发邮件给我们就好。
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-white">你的选择</h2>
        <p className="mt-2">
          清除站点存储就能清掉推荐码。你也可以让我们删除某个特定 session（把 session ID 发给我们）
          或整个账户。如果你在欧盟 / 英国，你还享有常规的 GDPR 权利：访问、更正、删除、反对。
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-white">联系方式</h2>
        <p className="mt-2">
          隐私相关的事情请发邮件至{' '}
          <a
            href="mailto:happyhhour123@gmail.com"
            className="text-cyan-200 underline-offset-4 hover:underline"
          >
            happyhhour123@gmail.com
          </a>
          。我们每封都会看，哪怕是骂人的。
        </p>
      </section>
    </>
  );
}
