import { CardSineLineContainer } from '@/components/card-singleline-container';
import { EmptyCardType } from '@/components/empty/constant';
import { EmptyAppCard } from '@/components/empty/empty';
import { RenameDialog } from '@/components/rename-dialog';
import { HomeIcon } from '@/components/svg-icon';
import { CardSkeleton } from '@/components/ui/skeleton';
import { APP_SUBTITLE } from '@/constants/branding';
import { useNavigatePage } from '@/hooks/logic-hooks/navigate-hooks';
import { useFetchNextKnowledgeListByPage } from '@/hooks/use-knowledge-request';
import { useTranslation } from 'react-i18next';
import { DatasetCard } from '../datasets/dataset-card';
import { useRenameDataset } from '../datasets/use-rename-dataset';
import { SeeAllAppCard } from './application-card';

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
    <section className="surface-card rounded-[28px] border border-border-button px-6 py-6">
      <header className="mb-5 flex items-end justify-between gap-4">
        <div>
          <div className="lab-badge mb-3 w-fit">{APP_SUBTITLE}</div>
          <h2 className="leading-8 text-2xl font-semibold mb-2.5">
            <HomeIcon imgClass="me-2.5" name="datasets" width={24} />
            {t('header.dataset')}
          </h2>
          <p className="text-sm text-text-secondary">
            面向实验文档、工艺标准、设备说明与知识沉淀的统一数字化知识资产入口。
          </p>
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
