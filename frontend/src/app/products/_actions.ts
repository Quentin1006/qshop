'use server';

import { fetchWithAuth } from '@/services/main';
import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

export type HandleAddToBasketInput = {
  productId: number;
  quantity: number;
  basketId: string;
};
export async function addToBasket({ productId, quantity, basketId }: HandleAddToBasketInput) {
  console.log('add to basket', { productId, quantity });
  await fetchWithAuth(`http://localhost:8088/basket/${basketId}/add-item`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      productId,
      quantity,
    }),
  });
  revalidateTag('basket');
  redirect(`/cart/new-item/${productId}`);
}
