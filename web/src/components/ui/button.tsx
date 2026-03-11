import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';
import { LucideLoader2, Plus } from 'lucide-react';
import { Link, LinkProps } from 'react-router';

const buttonVariants = cva(
  cn(
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm transition-colors outline-0',
    'disabled:pointer-events-none disabled:opacity-50 rounded border-0.5 border-transparent',
    '[&_svg]:pointer-events-none [&_svg:not([class*="size-"])]:size-4 shrink-0 [&_svg]:shrink-0',
  ),
  {
    variants: {
      variant: {
        // Solid variant series:
        // Button has its own background color, may have borders
        default:
          'bg-[linear-gradient(135deg,rgb(var(--accent-primary))_0%,#4d67ff_100%)] text-white shadow-[0_14px_34px_rgba(26,102,255,0.22)] hover:brightness-110 focus-visible:brightness-110',

        secondary: `
          bg-bg-card text-text-primary border border-border-button
          hover:text-text-primary hover:bg-bg-component hover:border-border-default
          focus-visible:text-text-primary focus-visible:bg-bg-component focus-visible:border-border-default
        `,

        highlighted: `
          bg-[linear-gradient(135deg,rgb(var(--accent-primary))_0%,#4d67ff_100%)] text-white border border-white/10
          hover:brightness-110 focus-visible:brightness-110
        `,

        accent: `
          bg-[linear-gradient(135deg,rgb(var(--accent-primary))_0%,#2ac7ff_100%)] text-white
          hover:brightness-110 focus-visible:brightness-110
        `,

        destructive: `
          bg-state-error text-white shadow-xs
          hover:bg-state-error/90 focus-visible:ring-state-error/20 dark:focus-visible:ring-state-error/40
        `,

        // Outline variant series
        // Button has transparent or greyish background, may have borders
        outline: `
          text-text-secondary bg-bg-input border border-border-button shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]
          hover:text-text-primary hover:bg-bg-card hover:border-border-default
          focus-visible:text-text-primary focus-visible:bg-bg-card focus-visible:border-border-default
        `,

        dashed: `
          text-text-secondary border-border-button border-dashed
          hover:text-text-primary hover:bg-border-button hover:border-border-default
          focus-visible:text-text-primary focus-visible:bg-border-button focus-visible:border-border-button
        `,

        icon: 'bg-transparent text-foreground hover:bg-transparent/80',

        transparent: `
          text-text-secondary bg-transparent border border-border-button
          hover:text-text-primary hover:bg-bg-card
          focus-visible:text-text-primary focus-visible:bg-bg-card focus-visible:border-border-default
        `,

        danger: `
          bg-transparent border border-state-error text-state-error
          hover:bg-state-error/10 focus-visible:bg-state-error/10
        `,

        // Ghost variant series
        // Button has transparent background, without borders
        ghost: `
          text-text-secondary
          hover:bg-bg-card focus-visible:bg-bg-card
          hover:text-text-primary focus-visible:text-text-primary
        `,

        delete: `
          text-text-secondary
          hover:bg-state-error-5 hover:text-state-error
          focus-visible:text-state-error focus-visible:bg-state-error-5
        `,

        link: 'text-primary underline-offset-4 hover:underline',

        // Static
        // Button has no interaction transitions
        static: '',
      },
      size: {
        auto: '',

        xl: 'h-12 rounded-2xl px-5',
        lg: 'h-10 rounded-xl px-4',
        default: 'h-8 rounded-lg px-3',
        sm: 'h-7 rounded-md px-2',
        xs: 'h-6 rounded-md px-1',

        'icon-xl': 'size-12 rounded-2xl',
        'icon-lg': 'size-10 rounded-xl',
        icon: 'size-8 rounded-lg',
        'icon-sm': 'size-7 rounded-md',
        'icon-xs': 'size-6 rounded-md',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export type ButtonVariants = VariantProps<typeof buttonVariants>;

export type ButtonProps<IsAnchor extends boolean = false> = {
  asChild?: boolean;
  asLink?: boolean;
  loading?: boolean;
  block?: boolean;
  disabled?: boolean;
  dot?: boolean;
} & ButtonVariants &
  (IsAnchor extends true
    ? LinkProps
    : React.ButtonHTMLAttributes<HTMLButtonElement>);

const Button = React.forwardRef(
  <IsAnchor extends boolean = false>(
    {
      children,
      className,
      variant,
      size,
      dot = false,
      asChild = false,
      asLink = false,
      loading = false,
      disabled = false,
      block = false,
      ...props
    }: ButtonProps<IsAnchor>,
    ref: React.ForwardedRef<
      IsAnchor extends true ? HTMLAnchorElement : HTMLButtonElement
    >,
  ) => {
    const Comp = asChild ? Slot : asLink ? Link : 'button';

    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, className }),
          { 'w-full': block },
          { relative: dot },
        )}
        // @ts-ignore
        ref={ref as React.RefObject<HTMLButtonElement | HTMLAnchorElement>}
        disabled={loading || disabled}
        {...props}
      >
        <>
          {dot && (
            <span className="absolute size-[6px] rounded-full -right-[3px] -top-[3px] bg-state-error animate" />
          )}
          {loading && <LucideLoader2 className="animate-spin" />}
          {children}
        </>
      </Comp>
    );
  },
);

Button.displayName = 'Button';

export const ButtonLoading = Button;

ButtonLoading.displayName = 'ButtonLoading';

export { Button, buttonVariants };

export const BlockButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function BlockButton({ children, className, ...props }, ref) {
    return (
      <Button
        variant={'outline'}
        ref={ref}
        className={cn('w-full border-dashed border-input-border', className)}
        {...props}
      >
        <Plus /> {children}
      </Button>
    );
  },
);
