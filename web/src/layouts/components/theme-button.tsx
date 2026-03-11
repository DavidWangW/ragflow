import { LucideMoon, LucideSun } from 'lucide-react';

import { useTheme } from '@/components/theme-provider';
import { Button } from '@/components/ui/button';
import { ThemeEnum } from '@/constants/common';

export default function ThemeButton() {
  const { setTheme, theme } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon-lg"
      className="tech-theme-toggle relative"
      onClick={() =>
        setTheme(theme === ThemeEnum.Dark ? ThemeEnum.Light : ThemeEnum.Dark)
      }
    >
      {theme === ThemeEnum.Light ? <LucideSun /> : <LucideMoon />}
    </Button>
  );
}
