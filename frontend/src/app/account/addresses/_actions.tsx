'use server';

import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import { fetchWithAuth } from '@/services/main';

// @FIX any type
export async function createAddress(values: any) {
  console.log('createAddress', JSON.stringify(values));
  try {
    const res = await fetchWithAuth(`http://localhost:8088/addresses/create`, {
      method: 'POST',
      body: JSON.stringify(values),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('res', res, 'resStatus', res.status);
  } catch (error: any) {
    console.log('error', error);
    throw new Error(error);
  }
  // @INFO - redirect works by triggering a throw so it cannot be inside a catch
  // or it will be caught by the catch block
  revalidateTag('addresses');
  redirect('/account/addresses?created=true');
}
// @FIX any type
export async function updateAddress(addressId: number, values: any) {
  await fetchWithAuth(`http://localhost:8088/addresses/${addressId}/update`, {
    method: 'PATCH',
    body: JSON.stringify(values),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  revalidateTag('addresses');
  redirect('/account/addresses?updated=true');
}

export async function deleteAddress(addressId: number) {
  fetchWithAuth(`http://localhost:8088/addresses/${addressId}/delete`, {
    method: 'DELETE',
    next: {
      tags: ['addresses'],
    },
    headers: {
      'Content-Type': 'application/json',
    },
  });

  revalidateTag('addresses');
  redirect('/account/addresses?deleted=true');
}
