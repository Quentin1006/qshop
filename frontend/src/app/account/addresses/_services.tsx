import { fetchWithAuth, getAuthenticatedSession } from '@/services/main';
import { type Address } from 'qshop-sdk';

export async function getAddress(addressId: number) {
  const res = await fetchWithAuth(`http://localhost:8088/addresses/${addressId}`);
  return (await res.json()) as Promise<Address>;
}

export async function getUserAddresses<T>() {
  const { session } = await getAuthenticatedSession();
  if (!session?.user?.sub) {
    return [];
  }
  const userId = session.user.sub;
  const res = await fetchWithAuth(`http://localhost:8088/users/${userId}/addresses`);
  return (await res.json()) as Promise<T[]>;
}
