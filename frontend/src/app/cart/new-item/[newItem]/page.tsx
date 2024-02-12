import { redirect } from 'next/navigation';
import Image from 'next/image';
import { type Product } from 'qshop-sdk';
import { BadgeCheck } from 'lucide-react';
import { Box } from '@/components/ui/box';
import OrderBox from './_components/OrderBox';

export type ProductProps = {
  params: { newItem: string };
};

async function getCartItem(itemId: string): Promise<Product> {
  const res = await fetch(`http://localhost:8088/products/${itemId}`);
  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function ({ params }: ProductProps) {
  if (!params.newItem) {
    redirect('/cart/view');
  }
  console.log({ params });
  const item = await getCartItem(params.newItem);
  console.log({ item });

  return (
    <div className="flex h-full w-full bg-gray-300">
      <div className="m-4 grid h-fit w-full grid-cols-4 grid-rows-1 gap-4">
        <div className="col-span-3 row-span-1">
          <Box>
            <div>
              <Image src={item.link} alt={item.description} width={150} height={150} />
            </div>
            <div className="flex items-center gap-2">
              <BadgeCheck className="text-green-700" />
              <div className="text-xl font-semibold">Ajouté au panier</div>
            </div>
          </Box>
        </div>
        <div className="col-span-1 row-span-1">
          <Box>
            <OrderBox />
          </Box>
        </div>
      </div>
      <div className="flex"></div>
    </div>
  );
}
