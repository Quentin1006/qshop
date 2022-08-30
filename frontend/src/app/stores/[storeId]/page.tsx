import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Store',
};

export type StorePageProps = {
  params: { storeId: string };
};

async function getStore(storeId: string) {
  const res = await fetch(`http://localhost:8088/products/${storeId}/details`);
  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function StorePage({ params }: StorePageProps) {
  const { storeId } = params;
  const store = await getStore(storeId);
  return (
    <>
      <div>StoreId = {storeId} </div>
      <div>Name = {store.name}</div>
    </>
  );
}
