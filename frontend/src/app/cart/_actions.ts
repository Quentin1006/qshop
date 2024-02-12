'use server';

import { revalidateTag } from 'next/cache';
import { fetchWithAuth } from '@/services/main';
import { type BasketItem } from 'qshop-sdk';

export const updateBasketItem = async (basketId: string, body: Partial<BasketItem>) => {
  const res = await fetchWithAuth(`http://localhost:8088/basket/${basketId}/update-item`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to update basket item');
  }
  revalidateTag('basket');
};

export const deleteBasketItem = async (basketId: string, id: number) => {
  const res = await fetchWithAuth(`http://localhost:8088/basket/${basketId}/delete-item`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id }),
  });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to delete item from basket');
  }
  revalidateTag('basket');
};
