import { PageContainer } from '@/layouts/components/page-container';
import { Applications } from './applications';
import { NextBanner } from './banner';
import { Datasets } from './datasets';

const Home = () => {
  return (
    <PageContainer className="pb-10">
      <article className="mx-auto flex w-full max-w-[1480px] flex-col gap-8">
        <header>
          <NextBanner />
        </header>

        <Datasets />
        <Applications />
      </article>
    </PageContainer>
  );
};

export default Home;
