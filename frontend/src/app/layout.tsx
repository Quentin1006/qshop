/* eslint-disable @next/next/no-head-element */
import Providers from './Providers';

import Header from '@/components/Header/Header';
import Footer from '@/components/Footer';
import { BasketPanel } from '@/components/BasketPanel';
import { SubHeader } from '@/components/SubHeader';
import { Toaster } from '@/components/ui/sonner';

import { getBasket, getCategories, getClientIdentifier } from '@/services/main';

import '@/styles/globals.css';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getClientIdentifier();
  console.log('in rootLayout', { session });
  const basket = await getBasket();
  console.log('in rootLayout', { basket });
  const categories = await getCategories();
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <Providers
        initialAppContext={{
          initialBasket: basket,
        }}
      >
        <body>
          <div className="page">
            <div className="main">
              <div className="main-content">
                <Header categories={categories} user={session?.user} cartItemsCount={basket?.items.length} />
                <SubHeader categories={categories} />
                {children}
              </div>
              <div className="footer">
                <Footer />
              </div>
            </div>

            <div className="basket-panel">
              <BasketPanel />
            </div>
          </div>
          <Toaster />
        </body>
      </Providers>
    </html>
  );
}
