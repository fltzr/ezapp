import I18nProvider from '@cloudscape-design/components/i18n';
import enMessages from '@cloudscape-design/components/i18n/messages/all.en';
import { RouterProvider } from 'react-router-dom';
import { router } from '@/routes';
import { Loader } from '@/common/components/loader/loader';

export const Providers = () => {
  // Providers logic here
  return (
    <I18nProvider messages={[enMessages]}>
      <RouterProvider
        router={router}
        fallbackElement={<Loader />}
        future={{ v7_startTransition: true }}
      />
    </I18nProvider>
  );
};
