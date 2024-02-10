import { getIronSession } from 'iron-session';
import { getSession } from '@auth0/nextjs-auth0';
import { cookies, headers } from 'next/headers';
import { type Basket, type BasketItem } from 'qshop-sdk';

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

export async function fetchWithAuth(url: string, init?: RequestInit) {
  const session = await getSession();
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${session?.idToken}`,
  };
  const res = await fetch(url, { ...init, headers });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error(`Failed to fetch data | ${res.statusText} | ${res.status}`);
  }
  return await res.json();
}

// Get the authenticated session if exists
// or the iron session if not
export async function getClientIdentifier() {
  const userSession = await getSession();
  if (userSession) {
    return userSession;
  }
  return await getUnauthenticatedSession();
}

export async function getCategories() {
  const res = await fetch('http://localhost:8088/categories');
  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export async function getUserAddresses<T>() {
  const userSession = await getSession();
  if (!userSession?.user?.sub) {
    return [];
  }
  const userId = userSession.user.sub;
  return (await fetchWithAuth(`http://localhost:8088/users/${userId}/addresses`)) as Promise<T[]>;
}

export async function getBasket(basketId?: string): Promise<Basket> {
  if (!basketId) {
    const session = await getClientIdentifier();
    basketId = session.id;
  }

  const res = await fetch(`http://localhost:8088/basket/${basketId}`);
  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export const updateBasketItem = async (basketId: string, body: Partial<BasketItem>) => {
  const res = await fetch(`http://localhost:8088/basket/${basketId}/update-item`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return res.json();
};

export const deleteBasketItem = async (basketId: string, id: number) => {
  const res = await fetch(`http://localhost:8088/basket/${basketId}/delete-item`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id }),
  });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return res.json();
};
