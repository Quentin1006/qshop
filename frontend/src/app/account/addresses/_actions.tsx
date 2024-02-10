'use server';

import { getSession } from '@auth0/nextjs-auth0';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { fetchWithAuth } from '@/services/main';

export async function sendForm(values: any) {
  console.log('sendForm', JSON.stringify(values));
  const userSession = await getSession();
  if (!userSession?.user?.sub) {
    return [];
  }
  const response = await fetch('http://localhost:8088/addresses/fake/create', {
    method: 'POST',
    body: JSON.stringify(values),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const json = await response.json();

  revalidatePath('/account/addresses');
  redirect('/account/addresses?created=true');
}

export async function deleteAddress(addressId: string) {
  const userSession = await getSession();
  if (!userSession?.user?.sub) {
    return [];
  }
  fetchWithAuth(`http://localhost:8088/addresses/${addressId}/delete`, {
    method: 'DELETE',

    headers: {
      'Content-Type': 'application/json',
    },
  });

  revalidatePath('/account/addresses');
  redirect('/account/addresses?deleted=true');
}
