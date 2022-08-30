'use client';

import { UserProvider } from '@auth0/nextjs-auth0/client';

import { AppProvider } from '../contexts/AppContext';

export default function Providers({ children }: any) {
  return (
    <AppProvider>
      <UserProvider>{children}</UserProvider>
    </AppProvider>
  );
}
