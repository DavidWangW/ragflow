import { useFetchKnowledgeBaseConfiguration } from '@/hooks/use-knowledge-request';
import { KnowledgeBaseProvider } from '@/pages/dataset/contexts/knowledge-base-context';

import { Outlet } from 'react-router';
import { SideBar } from './sidebar';

export default function DatasetWrapper() {
  const { data, loading } = useFetchKnowledgeBaseConfiguration();

  return (
    <KnowledgeBaseProvider knowledgeBase={data} loading={loading}>
      <article className="size-full grid grid-cols-[280px_1fr] grid-rows-1 gap-5 overflow-hidden pt-1">
        <SideBar />

        <Outlet />
      </article>
    </KnowledgeBaseProvider>
  );
}
