import { Card, CardContent } from '@/components/ui/card';
import { APP_NAME, APP_TAGLINE, APP_TECH_LABEL } from '@/constants/branding';
import { ArrowRight, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const heroHighlights = ['统一知识接入', '实验资料治理', '智能问答协作'];

const heroPanels = [
  {
    eyebrow: 'Knowledge Base',
    title: '多源文档沉淀',
    description: '将实验记录、工艺标准与设备资料沉淀为统一知识资产。',
  },
  {
    eyebrow: 'Search',
    title: '结构化检索',
    description: '在复杂工业资料中快速定位可复用结论与证据。',
  },
  {
    eyebrow: 'AI Workflow',
    title: '持续协同问答',
    description: '连接知识库、搜索与智能体能力，形成闭环工作台。',
  },
];

function BannerCard() {
  return (
    <Card className="w-auto border-none h-3/4">
      <CardContent className="p-4">
        <span className="inline-block bg-backgroundCoreWeak rounded-sm px-1 text-xs">
          System
        </span>
        <div className="flex mt-1 gap-4">
          <span className="text-lg truncate">Setting up your LLM</span>
          <ArrowRight />
        </div>
      </CardContent>
    </Card>
  );
}

export function Banner() {
  return (
    <section className="bg-[url('@/assets/banner.png')] bg-cover h-28 rounded-2xl  my-8 flex gap-8 justify-between">
      <div className="h-full text-3xl font-bold items-center inline-flex ml-6">
        Welcome to RAGFlow
      </div>
      <div className="flex justify-between items-center gap-4 mr-5">
        <BannerCard></BannerCard>
        <BannerCard></BannerCard>
        <BannerCard></BannerCard>
        <button
          type="button"
          className="relative p-1 hover:bg-white/10 rounded-full transition-colors"
        >
          <X className="w-6 h-6 text-white" />
        </button>
      </div>
    </section>
  );
}

export function NextBanner() {
  const { t } = useTranslation();
  return (
    <section className="surface-card relative overflow-hidden rounded-[36px] border border-border-button px-6 py-7 md:px-8 md:py-8 xl:px-10 xl:py-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(68,214,255,0.2),transparent_28%),radial-gradient(circle_at_8%_18%,rgba(77,103,255,0.18),transparent_24%),linear-gradient(135deg,rgba(255,255,255,0.05),rgba(255,255,255,0))]" />
      <div className="absolute inset-0 opacity-60 [background-image:linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:26px_26px]" />

      <div className="relative grid gap-6 xl:grid-cols-[minmax(0,1.5fr)_360px]">
        <div className="flex flex-col gap-6">
          <div className="space-y-4">
            <div className="lab-badge w-fit">{APP_TECH_LABEL}</div>

            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accent-primary/90">
                Industrial Knowledge Workspace
              </p>

              <h1 className="max-w-4xl text-4xl font-semibold leading-tight md:text-5xl xl:text-[3.4rem]">
                <span className="font-semibold text-text-primary">
                  {t('header.welcome')}{' '}
                </span>
                <span className="page-title-gradient font-bold">
                  {APP_NAME}
                </span>
              </h1>

              <p className="max-w-3xl text-base leading-7 text-text-secondary md:text-lg">
                {APP_TAGLINE}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {heroHighlights.map((item) => (
              <span key={item} className="info-pill">
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-3 xl:grid-cols-1">
          {heroPanels.map((panel) => (
            <div
              key={panel.eyebrow}
              className="rounded-[24px] border border-white/35 bg-white/70 p-5 shadow-[0_18px_42px_rgba(7,17,33,0.08)] backdrop-blur-md dark:border-white/10 dark:bg-white/5"
            >
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text-secondary">
                {panel.eyebrow}
              </div>
              <div className="mt-3 text-lg font-semibold text-text-primary">
                {panel.title}
              </div>
              <p className="mt-2 text-sm leading-6 text-text-secondary">
                {panel.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
