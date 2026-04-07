import { CardSineLineContainer } from '@/components/card-singleline-container';
import { EmptyCardType } from '@/components/empty/constant';
import { EmptyAppCard } from '@/components/empty/empty';
import { HomeIcon } from '@/components/svg-icon';
import { Segmented, SegmentedValue } from '@/components/ui/segmented';
import { Routes } from '@/routes';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { Agents } from './agent-list';
import { SeeAllAppCard } from './application-card';
import { ChatList } from './chat-list';
import { MemoryList } from './memory-list';
import { SearchList } from './search-list';

const IconMap = {
  [Routes.Chats]: 'chats',
  [Routes.Searches]: 'searches',
  [Routes.Agents]: 'agents',
  [Routes.Memories]: 'memory',
};

const EmptyTypeMap = {
  [Routes.Chats]: EmptyCardType.Chat,
  [Routes.Searches]: EmptyCardType.Search,
  [Routes.Agents]: EmptyCardType.Agent,
  [Routes.Memories]: EmptyCardType.Memory,
};

const SectionMetaMap = {
  [Routes.Chats]: {
    eyebrow: 'Interaction Studio',
    description: '围绕统一知识底座快速发起问答会话，沉淀可复用结论与上下文。',
    highlights: ['多轮问答', '知识检索', '结论沉淀'],
  },
  [Routes.Searches]: {
    eyebrow: 'Retrieval Workspace',
    description: '面向复杂工业资料执行结构化检索、事实定位与结果归纳。',
    highlights: ['深度检索', '结果归纳', '证据追踪'],
  },
  [Routes.Agents]: {
    eyebrow: 'Flow Orchestration',
    description: '将知识库、工具与自动化流程连接为可执行的智能体能力。',
    highlights: ['流程编排', '工具调用', '协同自动化'],
  },
  [Routes.Memories]: {
    eyebrow: 'Context Memory',
    description: '持续保存关键上下文与组织经验，让知识工作保持连续性。',
    highlights: ['长期记忆', '上下文追踪', '经验复用'],
  },
};

export function Applications() {
  const [val, setVal] = useState(Routes.Chats);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [listLength, setListLength] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleNavigate = useCallback(
    ({ isCreate }: { isCreate?: boolean }) => {
      if (isCreate) {
        navigate(val + '?isCreate=true');
      } else {
        navigate(val);
      }
    },
    [navigate, val],
  );

  const options = useMemo(
    () => [
      { value: Routes.Chats, label: t('header.chat') },
      { value: Routes.Searches, label: t('header.search') },
      { value: Routes.Agents, label: t('header.flow') },
      { value: Routes.Memories, label: t('header.memories') },
    ],
    [t],
  );

  const handleChange = (path: SegmentedValue) => {
    setVal(path as Routes);
    setListLength(0);
    setLoading(true);
  };
  const activeMeta = SectionMetaMap[val as keyof typeof SectionMetaMap];

  return (
    <section className="surface-card rounded-[30px] border border-border-button px-6 py-6 md:px-8 md:py-7">
      <header className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div className="max-w-3xl space-y-4">
          <div className="lab-badge w-fit">{activeMeta.eyebrow}</div>

          <div className="flex items-start gap-4">
            <div className="mt-1 flex size-12 shrink-0 items-center justify-center rounded-[18px] border border-border-button bg-[linear-gradient(135deg,rgba(77,103,255,0.16),rgba(0,190,180,0.12))] shadow-[0_16px_30px_rgba(0,112,214,0.12)]">
              <HomeIcon
                name={`${IconMap[val as keyof typeof IconMap]}`}
                width={24}
              />
            </div>

            <div>
              <h2 className="text-[1.75rem] font-semibold leading-8 text-text-primary">
                {options.find((x) => x.value === val)?.label}
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-text-secondary">
                {activeMeta.description}
              </p>
            </div>
          </div>
        </div>

        <Segmented
          buttonSize="sm"
          className="w-full xl:w-auto"
          itemClassName="rounded-full px-4 font-medium"
          options={options}
          value={val}
          onChange={handleChange}
        />
      </header>

      <div className="mb-5 flex flex-wrap gap-2">
        {activeMeta.highlights.map((item) => (
          <span key={item} className="info-pill">
            {item}
          </span>
        ))}
      </div>

      {/* <div className="flex flex-wrap gap-4"> */}
      <CardSineLineContainer>
        {val === Routes.Agents && (
          <Agents
            setListLength={(length: number) => setListLength(length)}
            setLoading={(loading: boolean) => setLoading(loading)}
          />
        )}
        {val === Routes.Chats && (
          <ChatList
            setListLength={(length: number) => setListLength(length)}
            setLoading={(loading: boolean) => setLoading(loading)}
          />
        )}
        {val === Routes.Searches && (
          <SearchList
            setListLength={(length: number) => setListLength(length)}
            setLoading={(loading: boolean) => setLoading(loading)}
          />
        )}
        {val === Routes.Memories && (
          <MemoryList
            setListLength={(length: number) => setListLength(length)}
            setLoading={(loading: boolean) => setLoading(loading)}
          />
        )}
        {listLength > 0 && (
          <SeeAllAppCard click={() => handleNavigate({ isCreate: false })} />
        )}
      </CardSineLineContainer>

      {listLength <= 0 && !loading && (
        <EmptyAppCard
          type={EmptyTypeMap[val as keyof typeof EmptyTypeMap]}
          onClick={() => handleNavigate({ isCreate: true })}
        />
      )}
      {/* </div> */}
    </section>
  );
}
