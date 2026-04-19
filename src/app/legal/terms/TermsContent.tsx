'use client';

import { useI18n } from '@/lib/i18n/I18nProvider';

export function TermsContent() {
  const { lang, t } = useI18n();
  return (
    <>
      <p className="tea-eyebrow text-orange-200/85">
        {lang === 'zh' ? '使用条款' : 'Terms of use'}
      </p>
      <h1 className="tea-display mt-3 text-[2.25rem] leading-[1.1] text-white sm:text-[2.75rem]">
        {lang === 'zh' ? '基本规则。' : 'Rules of the road.'}
      </h1>
      <p className="mt-3 text-xs uppercase tracking-widest text-slate-400">
        {t('legal.lastUpdated')} {t('legal.updatedDate')}
      </p>

      <div className="mt-10 space-y-8 text-[1rem] leading-[1.75] text-slate-200/90">
        {lang === 'zh' ? <TermsZh /> : <TermsEn />}
      </div>
    </>
  );
}

function TermsEn() {
  return (
    <>
      <section>
        <h2 className="text-lg font-semibold text-white">What this is</h2>
        <p className="mt-2">
          Agent Tea is a piece of internet entertainment. You tell us (or let
          your chatbot tell us) how you collaborate with AI, and we return a
          playful four-letter type. Treat the result as a conversation
          starter, not a verdict on your personality, employability, or soul.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-white">What you agree to</h2>
        <ul className="mt-2 space-y-2 list-disc pl-5">
          <li>
            Use the site for its obvious purpose. Don&rsquo;t try to break,
            scrape, or flood it.
          </li>
          <li>
            Don&rsquo;t submit content that impersonates someone else, is
            abusive toward a real person, or breaks any law where you live.
          </li>
          <li>
            You&rsquo;re at least 13 years old (or the local minimum age for
            online services, whichever is higher).
          </li>
          <li>
            Share links are public by design — anyone with the link can view
            the reveal. Don&rsquo;t paste information you don&rsquo;t want
            attached to a link.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-white">Not advice</h2>
        <p className="mt-2">
          Nothing Agent Tea generates is mental-health, medical, legal,
          financial, or employment advice. We are explicitly not a hiring or
          evaluation tool and should not be used to make decisions about
          other people.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-white">No guarantees</h2>
        <p className="mt-2">
          The site is provided &ldquo;as is.&rdquo; We try to keep it up and
          accurate, but we don&rsquo;t promise it will be bug-free,
          uninterrupted, or perfectly correct. To the extent the law allows,
          we&rsquo;re not liable for indirect, incidental, or consequential
          damages from using it.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-white">Changes</h2>
        <p className="mt-2">
          We may update these terms as the product evolves. The &ldquo;last
          updated&rdquo; date at the top reflects the current version.
          Continued use after changes means you accept the new version.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-white">Contact</h2>
        <p className="mt-2">
          Questions or complaints:{' '}
          <a
            href="mailto:happyhhour123@gmail.com"
            className="text-cyan-200 underline-offset-4 hover:underline"
          >
            happyhhour123@gmail.com
          </a>
          .
        </p>
      </section>
    </>
  );
}

function TermsZh() {
  return (
    <>
      <section>
        <h2 className="text-lg font-semibold text-white">这是个啥</h2>
        <p className="mt-2">
          Agent Tea 是一个网络娱乐小玩意儿。你告诉我们（或者让你的聊天机器人告诉我们）
          你是怎么跟 AI 协作的，我们给你返回一个好玩的四字母类型。
          把结果当做聊天话题就好，别把它当做对你人格、能力或灵魂的最终判决。
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-white">你同意</h2>
        <ul className="mt-2 space-y-2 list-disc pl-5">
          <li>按常规方式使用本站。不要尝试破坏、抓取或刷爆它。</li>
          <li>不要提交冒充他人、对真实人物进行人身攻击、或在你所在地违法的内容。</li>
          <li>你至少已年满 13 岁（或者当地在线服务的最低年龄，取较高者）。</li>
          <li>
            分享链接默认是公开的 —— 拿到链接的任何人都能看到结果。
            不要粘贴你不希望被公开的内容。
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-white">不是专业建议</h2>
        <p className="mt-2">
          Agent Tea 生成的任何内容都不构成心理、医疗、法律、财务或雇佣方面的建议。
          我们明确不是招聘或评估工具，也不应该用来对别人做决定。
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-white">不作担保</h2>
        <p className="mt-2">
          本站按「现状」提供。我们会尽量让它稳定、准确，但不承诺它完全没有 bug、
          不中断或完全正确。在法律允许的范围内，因使用本站产生的任何间接、附带或衍生损失，
          我们不承担责任。
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-white">条款变更</h2>
        <p className="mt-2">
          随着产品演化，我们可能会更新这些条款。顶部的「最后更新」日期代表当前版本。
          在更新后继续使用，即代表你接受新版本。
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-white">联系方式</h2>
        <p className="mt-2">
          有问题或投诉请联系：{' '}
          <a
            href="mailto:happyhhour123@gmail.com"
            className="text-cyan-200 underline-offset-4 hover:underline"
          >
            happyhhour123@gmail.com
          </a>
          。
        </p>
      </section>
    </>
  );
}
