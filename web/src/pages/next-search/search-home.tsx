import { Input } from '@/components/originui/input';
import Spotlight from '@/components/spotlight';
import message from '@/components/ui/message';
import { APP_NAME, APP_TAGLINE, APP_TECH_LABEL } from '@/constants/branding';
import { IUserInfo } from '@/interfaces/database/user-setting';
import { cn } from '@/lib/utils';
import { Search } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import './index.less';

export default function SearchPage({
  isSearching,
  setIsSearching,
  searchText,
  setSearchText,
  userInfo,
  canSearch,
}: {
  isSearching: boolean;
  setIsSearching: Dispatch<SetStateAction<boolean>>;
  searchText: string;
  setSearchText: Dispatch<SetStateAction<string>>;
  userInfo?: IUserInfo;
  canSearch?: boolean;
}) {
  const { t } = useTranslation();

  return (
    <section className="relative mt-[15vh] flex w-full items-center justify-center transition-all">
      <div className="relative z-10 flex w-[780px] flex-col items-center justify-center px-8 pt-8 text-transparent">
        <div className="lab-badge mb-4">{APP_TECH_LABEL}</div>
        <h1
          className={cn('page-title-gradient text-center text-4xl font-bold')}
        >
          {APP_NAME}
        </h1>
        <p className="mt-4 max-w-2xl text-center text-sm text-text-secondary">
          {APP_TAGLINE}
        </p>

        <div className="surface-card sticky mt-8 flex h-[240px] w-full scale-100 justify-center rounded-[28px] border border-border-button p-6 text-xl text-primary">
          {!isSearching && <Spotlight className="z-0" />}

          <div className="flex w-2/3 flex-col items-center justify-center">
            {!isSearching && (
              <>
                <p className="mb-4 text-text-primary transition-opacity">
                  你好，欢迎进入知识检索中心
                </p>
                <p className="mb-10 text-text-secondary transition-opacity">
                  {userInfo && (
                    <>
                      {t('search.welcomeBack')}, {userInfo.nickname}
                    </>
                  )}
                </p>
              </>
            )}

            <div className="relative w-full">
              <Input
                placeholder={t('search.searchGreeting')}
                className="delay-700 w-full rounded-full bg-bg-base px-4 py-7 pr-10 text-lg text-text-primary"
                value={searchText}
                onKeyUp={(e) => {
                  if (e.key === 'Enter') {
                    if (canSearch === false) {
                      message.warning(t('search.chooseDataset'));
                      return;
                    }
                    setIsSearching(!isSearching);
                  }
                }}
                onChange={(e) => {
                  if (canSearch === false) {
                    message.warning(t('search.chooseDataset'));
                    return;
                  }
                  setSearchText(e.target.value || '');
                }}
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 w-12 -translate-y-1/2 transform rounded-full bg-[linear-gradient(135deg,rgb(var(--accent-primary))_0%,#5668ff_100%)] p-2 text-bg-base shadow"
                onClick={() => {
                  if (canSearch === false) {
                    message.warning(t('search.chooseDataset'));
                    return;
                  }
                  setIsSearching(!isSearching);
                }}
              >
                <Search size={22} className="m-auto" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
