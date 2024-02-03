'use client';

import { Box } from '@/components/ui/box';
import React from 'react';
import BasketItemTile from './_components/BasketItemTile';
import { Button } from '@/components/ui/button';
import { useAppContext } from '@/contexts/AppContext';

export default function Page() {
  const { basket } = useAppContext();
  return (
    <div className="h-full w-full bg-gray-300 ">
      <div className="mx-auto flex max-w-[1580px] gap-4 p-4">
        <div className="w-3/4 ">
          <Box className="flex-col items-start justify-start">
            <h1 className="text-3xl">Votre panier</h1>
            <Button variant="link" className="p-0">
              Sélectionner tous les éléments
            </Button>
            <div className="flex w-full flex-col items-end text-slate-500">Prix</div>
            <hr className="w-full" />
            <ul className="flex w-full flex-col">
              {basket?.items?.map((item) => (
                <li key={item.id}>
                  <BasketItemTile basketId={basket.refId} item={item} />
                </li>
              ))}
            </ul>
          </Box>
        </div>
        <div className="w-1/4">
          <Box></Box>
        </div>
      </div>
    </div>
  );
}
