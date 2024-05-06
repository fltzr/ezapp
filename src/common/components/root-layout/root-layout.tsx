import { Outlet } from 'react-router-dom';
import { AppLayout } from '@cloudscape-design/components';
import { useAppLayoutStore } from '@/store/use-app-layout-store';
import { Navigation } from '@/common/components/navigation/sidenav';
import { Notifications } from '@/common/components/notification/notification';
import { Header } from '@/common/components/header/header';
import { useClearNotifications } from '@/common/hooks/use-clear-notifications';

const RootLayout = () => {
  const appLayoutStore = useAppLayoutStore();

  useClearNotifications();

  return (
    <>
      <Header />
      <AppLayout
        stickyNotifications
        contentType={appLayoutStore.contentLayout}
        headerSelector='#h'
        navigation={<Navigation />}
        navigationOpen={appLayoutStore.isNavigationOpen}
        tools={appLayoutStore.toolsContent ?? undefined}
        toolsOpen={appLayoutStore.isToolsOpen}
        toolsHide={appLayoutStore.toolsContent === undefined}
        splitPanel={appLayoutStore.splitPanelContent}
        splitPanelOpen={appLayoutStore.isSplitPanelOpen}
        notifications={<Notifications />}
        content={<Outlet />}
        onNavigationChange={({ detail: { open } }) => {
          appLayoutStore.setNavigationOpen(open);
        }}
        onToolsChange={({ detail: { open } }) => {
          appLayoutStore.setToolsOpen(open);
        }}
        onSplitPanelToggle={({ detail: { open } }) => {
          appLayoutStore.setSplitPanelOpen(open);
        }}
      />
    </>
  );
};

export const Component = RootLayout;
