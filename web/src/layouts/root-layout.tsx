import { Outlet } from 'react-router';
import { Header } from './components/header';

export function RootLayoutContainer({ children }: React.PropsWithChildren) {
  return (
    <div className="app-shell size-full grid grid-rows-[auto_1fr] grid-cols-1 grid-flow-col">
      <Header className="app-header-shell mx-5 mt-5 rounded-[28px] px-6 py-4" />

      <main className="size-full overflow-hidden px-5 pb-5 pt-4">
        {children}
      </main>
    </div>
  );
}

export default function RootLayout() {
  return (
    <RootLayoutContainer>
      <Outlet />
    </RootLayoutContainer>
  );
}
