import { Card, CardContent } from '@/components/ui/card';
import {
  APP_NAME,
  APP_SUBTITLE,
  APP_TAGLINE,
  APP_TECH_LABEL,
} from '@/constants/branding';
import { ArrowRight, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

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
    <section className="surface-card relative overflow-hidden rounded-[32px] border border-border-button px-8 py-10 md:px-10 md:py-12">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(68,214,255,0.18),transparent_30%),radial-gradient(circle_at_12%_20%,rgba(77,103,255,0.14),transparent_26%)]" />
      <div className="absolute inset-0 opacity-70 [background-image:linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="relative flex max-w-4xl flex-col gap-4">
        <span className="lab-badge w-fit">{APP_SUBTITLE}</span>

        <div className="text-sm font-semibold uppercase tracking-[0.24em] text-text-secondary">
          {APP_TECH_LABEL}
        </div>

        <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
          <span className="font-semibold text-text-primary">
            {t('header.welcome')}{' '}
          </span>
          <span className="page-title-gradient font-bold">{APP_NAME}</span>
        </h1>

        <p className="max-w-3xl text-base leading-7 text-text-secondary md:text-lg">
          {APP_TAGLINE}
        </p>
      </div>
    </section>
  );
}
