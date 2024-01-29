/* eslint-disable @next/next/no-head-element */
import Providers from './Providers';

import { getIronSession } from 'iron-session';
import { getSession } from '@auth0/nextjs-auth0';
import { cookies, headers } from 'next/headers';

import Header from '@/components/Header/Header';
import Footer from '@/components/Footer';
import { BasketPanel } from '@/components/BasketPanel';
import { SubHeader } from '@/components/SubHeader';

import '@/styles/globals.css';

async function getUnauthenticatedSession() {
  let session = await getIronSession<any>(cookies(), {
    password: process.env.SESSION_SECRET!,
    cookieName: process.env.COOKIE_NAME!,
  });

  if (!session.id) {
    const newSessionId = headers().get('x-id-session');
    session = { id: newSessionId };
    console.log('if not session id', { session });
  }
  return session;
}

// Get the authenticated session if exists
// or the iron session if not
async function getClientIdentifier() {
  const userSession = await getSession();
  if (userSession) {
    return userSession;
  }
  console.log({ userSession });
  return await getUnauthenticatedSession();
}

async function getCategories() {
  const res = await fetch('http://localhost:8088/categories');
  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

async function getBasket(id: string) {
  const res = await fetch(`http://localhost:8088/basket/${id}`);
  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getClientIdentifier();
  console.log('in rootLayout', { session });
  const basket = await getBasket(session.id);
  console.log('in rootLayout', { basket });
  const categories = await getCategories();
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <Providers>
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
        </body>
      </Providers>
    </html>
  );
}
