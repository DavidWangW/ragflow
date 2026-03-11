import { APP_NAME } from '@/constants/branding';
import { useFetchAppConf } from '@/hooks/logic-hooks';
import { RefreshCcw } from 'lucide-react';
import { PropsWithChildren } from 'react';
import { RAGFlowAvatar } from './ragflow-avatar';
import { Button } from './ui/button';

type EmbedContainerProps = {
  title: string;
  avatar?: string;
  handleReset?(): void;
} & PropsWithChildren;

export function EmbedContainer({
  title,
  avatar,
  children,
  handleReset,
}: EmbedContainerProps) {
  const appConf = useFetchAppConf();

  return (
    <section className="h-[100vh] flex justify-center items-center">
      <div className="hidden xl:flex gap-3 absolute left-6 top-8 items-center">
        <div className="brand-mark flex size-12 items-center justify-center">
          <img src="/logo.svg" alt={APP_NAME} className="size-8" />
        </div>
        <div className="min-w-0">
          <div className="brand-title truncate">{appConf.appName}</div>
          <div className="brand-subtitle truncate">Embedded Experience</div>
        </div>
      </div>
      <div className="page-surface w-full h-full md:w-[80vw] md:h-auto border-0 rounded-none md:rounded-[28px] overflow-hidden">
        <div className="flex justify-between items-center border-b border-border-button p-4 relative">
          <div className="flex gap-2 items-center absolute left-1/2 -translate-x-1/2 md:static md:left-auto md:translate-x-0">
            <RAGFlowAvatar
              avatar={avatar}
              name={title}
              isPerson
              className="size-5 md:size-10"
            />
            <div className="md:text-xl text-foreground">{title}</div>
          </div>
          <div className="flex md:hidden items-center">
            <img src="/logo.svg" alt={APP_NAME} className="h-6" />
          </div>
          <Button
            variant={'secondary'}
            className="text-sm text-foreground cursor-pointer"
            onClick={handleReset}
          >
            <div className="flex gap-1 items-center">
              <RefreshCcw size={14} />
              <span className="hidden text-lg md:inline-block">Reset</span>
            </div>
          </Button>
        </div>
        {children}
      </div>
    </section>
  );
}
