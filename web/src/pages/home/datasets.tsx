import { CardSineLineContainer } from '@/components/card-singleline-container';
import { EmptyCardType } from '@/components/empty/constant';
import { EmptyAppCard } from '@/components/empty/empty';
import { RenameDialog } from '@/components/rename-dialog';
import { HomeIcon } from '@/components/svg-icon';
import { CardSkeleton } from '@/components/ui/skeleton';
import { useNavigatePage } from '@/hooks/logic-hooks/navigate-hooks';
import { useFetchNextKnowledgeListByPage } from '@/hooks/use-knowledge-request';
import { useTranslation } from 'react-i18next';
import { DatasetCard } from '../datasets/dataset-card';
import { useRenameDataset } from '../datasets/use-rename-dataset';
import { SeeAllAppCard } from './application-card';

const datasetHighlights = ['实验资料', '工艺标准', '设备说明'];

export function Datasets() {
  const { t } = useTranslation();
  const { kbs, loading } = useFetchNextKnowledgeListByPage();
  const {
    datasetRenameLoading,
    initialDatasetName,
    onDatasetRenameOk,
    datasetRenameVisible,
    hideDatasetRenameModal,
    showDatasetRenameModal,
  } = useRenameDataset();
  const { navigateToDatasetList } = useNavigatePage();

  return (
    <section className="surface-card rounded-[30px] border border-border-button px-6 py-6 md:px-8 md:py-7">
      <header className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div className="max-w-3xl space-y-4">
          <div className="lab-badge w-fit">Knowledge Base Hub</div>

          <div className="flex items-start gap-4">
            <div className="mt-1 flex size-12 shrink-0 items-center justify-center rounded-[18px] border border-border-button bg-[linear-gradient(135deg,rgba(0,190,180,0.12),rgba(77,103,255,0.16))] shadow-[0_16px_30px_rgba(0,112,214,0.12)]">
              <HomeIcon name="datasets" width={24} />
            </div>

            <div>
              <h2 className="mb-2.5 text-[1.75rem] font-semibold leading-8 text-text-primary">
                {t('header.dataset')}
              </h2>
              <p className="max-w-2xl text-sm leading-6 text-text-secondary">
                面向实验文档、工艺标准、设备说明与知识沉淀的统一数字化知识资产入口。
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="info-pill">
            {loading ? '同步中' : `${kbs?.length ?? 0} 个知识库`}
          </span>
          {datasetHighlights.map((item) => (
            <span key={item} className="info-pill">
              {item}
            </span>
          ))}
        </div>
      </header>

      <div>
        {loading ? (
          <div className="flex-1">
            <CardSkeleton />
          </div>
        ) : (
          <>
            {kbs?.length > 0 && (
              <CardSineLineContainer>
                {kbs?.slice(0, 6).map((dataset) => (
                  <DatasetCard
                    key={dataset.id}
                    dataset={dataset}
                    showDatasetRenameModal={showDatasetRenameModal}
                  ></DatasetCard>
                ))}
                {
                  <SeeAllAppCard
                    click={() => navigateToDatasetList({ isCreate: false })}
                  ></SeeAllAppCard>
                }
              </CardSineLineContainer>
            )}
            {kbs?.length <= 0 && (
              <EmptyAppCard
                type={EmptyCardType.Dataset}
                onClick={() => navigateToDatasetList({ isCreate: true })}
              />
            )}
          </>
          // </div>
        )}
      </div>

      {datasetRenameVisible && (
        <RenameDialog
          hideModal={hideDatasetRenameModal}
          onOk={onDatasetRenameOk}
          initialName={initialDatasetName}
          loading={datasetRenameLoading}
        />
      )}
    </section>
  );
}
