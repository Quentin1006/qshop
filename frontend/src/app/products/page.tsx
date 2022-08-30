import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'All Products',
};

export default async function Products() {
  return (
    <>
      <div>All Products </div>
    </>
  );
}
