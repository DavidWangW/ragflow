import { cn } from '@/lib/utils';

/**
 * Basic page container:
 * - Full size
 * - Padding x=2.5rem top=0.75rem
 * - Auto scrollbar
 */
export function PageContainer({
  className,
  ...props
}: React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) {
  return (
    <div
      className={cn(
        'page-surface size-full px-6 py-6 overflow-auto',
        className,
      )}
      {...props}
    />
  );
}
