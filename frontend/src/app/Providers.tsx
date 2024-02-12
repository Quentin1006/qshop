'use client';

import { UserProvider } from '@auth0/nextjs-auth0/client';

import { AppProvider, AppProviderProps } from '../contexts/AppContext';

export type ProviderProps = {
  children: React.ReactNode;
  initialAppContext: AppProviderProps;
};

export default function Providers({ children, initialAppContext }: ProviderProps) {
  return (
    <AppProvider {...initialAppContext}>
      <UserProvider>{children}</UserProvider>
    </AppProvider>
  );
}
