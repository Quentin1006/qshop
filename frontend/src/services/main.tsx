import { getIronSession } from 'iron-session';
import { getSession as getAuth0Session } from '@auth0/nextjs-auth0';
import { cookies, headers } from 'next/headers';
import { type Basket, type BasketItem } from 'qshop-sdk';

export async function getSession() {
  return (await getAuth0Session()) || (await getUnauthenticatedSession());
}

export async function getUnauthenticatedSession() {
  let session = await getIronSession<{ id: string | null }>(cookies(), {
    password: process.env.SESSION_SECRET!,
    cookieName: process.env.COOKIE_NAME!,
  });

  console.log('getUnauthenticatedSession > session.id', session.id);

  if (!session.id) {
    const newSessionId = headers().get('x-id-session');
    session.id = newSessionId;
    console.log('if not session id > session id from headers', session.id);
  }
  return session;
}

export async function getAuthenticatedSession() {
  const session = await getAuth0Session();
  if (!session?.idToken) {
    return { error: new Error('Missing idToken') };
  }
  return { session };
}

export async function fetchWithAuth(url: string, init?: RequestInit) {
  const { error, session } = await getAuthenticatedSession();

  if (error) {
    throw new Error('Failed to fetch data', error);
  }

  const headers = new Headers({
    'Content-Type': 'application/json',
  });

  if (session?.idToken) {
    headers.append('Authorization', `Bearer ${session.idToken}`);
  }

  const res = await fetch(url, { ...init, headers });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error(
      `Failed to fetch ${res.url} | ${res.statusText} | ${res.status} | ${JSON.stringify(await res.json())}`,
    );
  }
  return res;
}

// Get the authenticated session if exists
// or the iron session if not
export async function getClientIdentifier() {
  const { session } = await getAuthenticatedSession();
  if (session) {
    return session.user.sub;
  }
  return (await getUnauthenticatedSession()).id;
}

export async function getCategories() {
  const res = await fetch('http://localhost:8088/categories', { next: { tags: ['categories'] } });
  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export async function getBasket(basketId?: string): Promise<Basket> {
  if (!basketId) {
    basketId = await getClientIdentifier();
  }

  const res = await fetch(`http://localhost:8088/basket/${basketId}`, {
    next: {
      tags: ['basket'],
    },
  });
  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return res.json();
}
