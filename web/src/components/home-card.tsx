import { RAGFlowAvatar } from '@/components/ragflow-avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDate } from '@/utils/date';
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

interface IProps {
  data: {
    name: string;
    description?: string;
    avatar?: string;
    update_time?: string | number;
    release_time?: number;
  };
  onClick?: () => void;
  moreDropdown: React.ReactNode;
  sharedBadge?: ReactNode;
  icon?: React.ReactNode;
  testId?: string;
}

function Time({ time }: { time: string | number | undefined }) {
  return (
    <p className="whitespace-nowrap font-mono text-[11px] tracking-[0.04em] text-text-secondary">
      {formatDate(time)}
    </p>
  );
}
export function HomeCard({
  data,
  onClick,
  moreDropdown,
  sharedBadge,
  icon,
  testId,
}: IProps) {
  const { t } = useTranslation();

  return (
    <Card
      as="article"
      data-testid={testId}
      data-agent-name={data.name}
      role="button"
      onClick={() => {
        // navigateToSearch(data?.id);
        onClick?.();
      }}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onClick?.();
        }
      }}
      tabIndex={0}
      className="group flex h-full w-full min-w-0 cursor-pointer items-start gap-4 rounded-[26px] border border-border-button/80 px-5 py-5 transition-all duration-200 ease-out hover:border-accent-primary/30 hover:shadow-[0_20px_44px_rgba(6,21,41,0.14)] focus-visible:border-accent-primary/40 focus-visible:shadow-[0_0_0_3px_rgba(77,103,255,0.14)]"
    >
      <div className="shrink-0">
        <RAGFlowAvatar
          className="h-10 w-10 rounded-xl"
          avatar={data.avatar}
          name={data.name}
        />
      </div>

      <div className="min-w-0 flex-1">
        <CardHeader
          as="header"
          className="flex min-w-0 flex-row items-center gap-2 p-0 space-y-0"
        >
          <CardTitle className="me-auto inline-flex min-w-0 flex-1 items-center gap-2">
            <h3
              className="flex-1 truncate text-base font-semibold leading-snug"
              data-testid="agent-name"
            >
              {data.name}
            </h3>

            {icon}
          </CardTitle>

          <div>{moreDropdown}</div>
        </CardHeader>

        <CardContent className="mt-3 p-0">
          <div className="flex min-w-0 flex-col justify-between gap-2">
            <div className="line-clamp-2 min-h-[44px] overflow-hidden text-[13px] leading-5 text-text-secondary">
              {data.description}
            </div>
            <div className="flex items-center justify-between gap-3">
              {data.release_time ? (
                <section className="min-w-0">
                  <div className="flex items-center gap-2 text-xs text-text-secondary">
                    {`${t('flow.lastSavedAt')}:`}
                    <Time time={data.update_time}></Time>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-text-secondary">
                    {`${t('flow.publishedAt')}:`}
                    <Time time={data.release_time}></Time>
                  </div>
                </section>
              ) : (
                <Time time={data.update_time}></Time>
              )}
              {sharedBadge}
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
