'use client';

import { Box } from '@/components/ui/box';
import { Button } from '@/components/ui/button';
import BasketItemTile from './BasketItemTile';
import { TotalPrice } from './TotalPrice';
import { type BasketItem } from 'qshop-sdk';

export type BasketItemsProps = {
  basketId: string;
  items: BasketItem[];
};

export default function BasketItems({ basketId, items }: BasketItemsProps) {
  return (
    <Box className="flex-col items-start justify-start">
      <h1 className="text-3xl">Votre panier</h1>
      <Button variant="link" className="p-0">
        Sélectionner tous les éléments
      </Button>
      <div className="flex w-full flex-col items-end text-slate-500">Prix</div>
      <hr className="w-full" />
      <ul className="flex w-full flex-col">
        {items.map((item) => (
          <li key={item.id}>
            <BasketItemTile basketId={basketId} item={item} />
          </li>
        ))}
      </ul>
      <TotalPrice className="justify-end" items={items} />
    </Box>
  );
}
