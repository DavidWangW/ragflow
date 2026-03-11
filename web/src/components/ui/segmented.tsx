import { cn } from '@/lib/utils';
import * as React from 'react';
import { Button, ButtonVariants } from './button';
export declare type SegmentedValue = string | number;
export declare type SegmentedRawOption = SegmentedValue;
export interface SegmentedLabeledOption {
  className?: string;
  disabled?: boolean;
  label: React.ReactNode;
  value: SegmentedRawOption;
  /**
   * html `title` property for label
   */
  title?: string;
}
declare type SegmentedOptions = (SegmentedRawOption | SegmentedLabeledOption)[];
const segmentedVariants = {
  round: {
    default: 'rounded-md',
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    xxl: 'rounded-2xl',
    xxxl: 'rounded-3xl',
    full: 'rounded-full',
  },
  size: {
    default: 'px-1 py-1',
    sm: 'px-1 py-1',
    md: 'px-2 py-1.5',
    lg: 'px-4 px-2',
    xl: 'px-5 py-2.5',
    xxl: 'px-6 py-3',
  },
  buttonSize: {
    default: 'px-2 py-1',
    md: 'px-2 py-1',
    lg: 'px-4 px-1.5',
    xl: 'px-6 py-2',
  },
};
export interface SegmentedProps extends Omit<
  React.HTMLProps<HTMLDivElement>,
  'onChange'
> {
  options: SegmentedOptions;
  defaultValue?: SegmentedValue;
  value?: SegmentedValue;
  onChange?: (value: SegmentedValue) => void;
  disabled?: boolean;
  prefixCls?: string;
  direction?: 'ltr' | 'rtl';
  motionName?: string;
  activeClassName?: string;
  itemClassName?: string;
  rounded?: keyof typeof segmentedVariants.round;
  sizeType?: keyof typeof segmentedVariants.size;
  buttonSize?: ButtonVariants['size'];
}

export const Segmented = React.forwardRef<HTMLDivElement, SegmentedProps>(
  (
    {
      options,
      value,
      onChange,
      className,
      activeClassName,
      itemClassName,
      rounded = 'default',
      sizeType = 'default',
      buttonSize = 'default',
    },
    ref,
  ) => {
    const [selectedValue, setSelectedValue] = React.useState<
      SegmentedValue | undefined
    >(value);
    React.useEffect(() => {
      setSelectedValue(value);
    }, [value]);
    const handleOnChange = (e: SegmentedValue) => {
      if (onChange) {
        onChange(e);
      }
      setSelectedValue(e);
    };
    return (
      <div
        ref={ref}
        className={cn(
          'tech-nav-shell flex items-center gap-1 p-1.5',
          segmentedVariants.round[rounded],
          segmentedVariants.size[sizeType],
          className,
        )}
      >
        {options.map((option) => {
          const isObject = typeof option === 'object';
          const actualValue = isObject ? option.value : option;

          return (
            <Button
              key={actualValue}
              type="button"
              size={buttonSize}
              variant="static"
              className={cn(
                {
                  'text-bg-base bg-[linear-gradient(135deg,rgb(var(--accent-primary))_0%,#4d67ff_100%)] shadow-[0_12px_28px_rgba(0,112,214,0.18)]':
                    selectedValue === actualValue,
                  'text-text-secondary hover:text-text-primary':
                    selectedValue !== actualValue,
                },
                itemClassName,
                activeClassName && selectedValue === actualValue
                  ? activeClassName
                  : '',
              )}
              onClick={() => handleOnChange(actualValue)}
            >
              {isObject ? option.label : option}
            </Button>
          );
        })}
      </div>
    );
  },
);

Segmented.displayName = 'Segmented';
