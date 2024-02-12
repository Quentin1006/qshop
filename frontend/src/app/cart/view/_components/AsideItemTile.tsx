'use client';

import Image from 'next/image';
import { type BasketItem } from 'qshop-sdk';

import { toPrice } from '@/helpers/string.helper';
import { StockDisplay } from '@/components/StockDisplay';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { deleteBasketItem, updateBasketItem } from '../../_actions';

export type AsideItemTileProps = {
  item: BasketItem;
  basketId: string;
};

const AsideItemTile = ({ item, basketId }: AsideItemTileProps) => {
  const [disabled, setDisabled] = useState(false);

  const handleMoveToBasketItem = async () => {
    setDisabled(true);
    const body: Partial<BasketItem> = {
      id: item.id,
      state: 'ACTIVE',
    };
    try {
      await updateBasketItem(basketId, body);
    } catch (error) {
      console.error('Failed to update basket item', error);
    }
    setDisabled(false);
  };

  const handleDeleteItem = async () => {
    setDisabled(true);
    try {
      await deleteBasketItem(basketId, item.id);
    } catch (error) {
      console.error('Failed to delete basket item', error);
    }
    setDisabled(false);
  };

  return (
    <div className="relative h-full w-full border border-gray-300">
      {disabled ? <div className="absolute z-10 h-full w-full bg-slate-100/40"></div> : null}
      <div className="p-2">
        <div className="flex justify-center">
          <Image src={item.product.link} alt={item.product.name} width={200} height={140} />
        </div>

        <div className="overflow-hidden overflow-ellipsis whitespace-normal line-clamp-2">{item.product.name}</div>
        <div className="font-bold">{toPrice(item.product.price.current, '€')}</div>
        <StockDisplay sku={item.product.sku} />
        <div className="flex items-center justify-center py-2">
          <Button variant="outline" size="sm" onClick={handleMoveToBasketItem}>
            Déplacer dans le panier
          </Button>
        </div>
        <div className="flex flex-col items-start gap-1">
          <Button variant="link" size="link" onClick={handleDeleteItem}>
            Supprimer
          </Button>
          <Button variant="link" size="link">
            Ajouter à la liste
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AsideItemTile;
