import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { CopyToClipboardWithText } from '@/components/copy-to-clipboard';
import { APP_NAME } from '@/constants/branding';
import { useTranslate } from '@/hooks/common-hooks';

const BackendServiceApi = ({ show }: { show(): void }) => {
  const { t } = useTranslate('chat');

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-4">
          <CardTitle>{APP_NAME} API</CardTitle>
          <Button onClick={show}>{t('apiKey')}</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2">
          <b className="font-semibold">{t('backendServiceApi')}</b>
          <CopyToClipboardWithText
            text={location.origin}
          ></CopyToClipboardWithText>
        </div>
      </CardContent>
    </Card>
  );
};

export default BackendServiceApi;
