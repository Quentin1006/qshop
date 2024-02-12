'use client';

import Image from 'next/image';
import { type BasketItem } from 'qshop-sdk';
import React from 'react';

import { SelectQuantity } from '@/components/SelectQuantity';
import { Checkbox } from '@/components/ui/checkbox';
import { toPrice } from '@/helpers/string.helper';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { updateBasketItem, deleteBasketItem } from '../../_actions';
import { StockDisplay } from '@/components/StockDisplay';

export type BasketItemProps = {
  item: BasketItem;
  basketId: string;
};

const BasketItemTile = ({ item, basketId }: BasketItemProps) => {
  const [disabled, setDisabled] = React.useState(false);

  const handleUpdateBasketItemSelection = async (isActive: boolean) => {
    setDisabled(true);
    const body: Partial<BasketItem> = {
      id: item.id,
      state: isActive ? 'ACTIVE' : 'INACTIVE',
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

  const handleQuantityChange = async (qty: number) => {
    setDisabled(true);
    const body: Partial<BasketItem> = {
      id: item.id,
      quantity: qty,
    };
    try {
      await updateBasketItem(basketId, body);
    } catch (error) {
      console.error('Failed to update basket item', error);
    }

    setDisabled(false);
  };

  const handleMoveAsideItem = async () => {
    setDisabled(true);
    const body: Partial<BasketItem> = {
      id: item.id,
      state: 'ASIDE',
    };
    try {
      await updateBasketItem(basketId, body);
    } catch (error) {
      console.error('Failed to update basket item', error);
    }

    setDisabled(false);
  };

  return (
    <>
      <div className="relative flex items-center py-6">
        {disabled ? <div className="absolute z-10 h-full w-full bg-slate-100/40"></div> : null}
        <Checkbox
          checked={item.state === 'ACTIVE'}
          disabled={disabled}
          id={String(item.id)}
          onCheckedChange={handleUpdateBasketItemSelection}
        />
        <Image src={item.product.link} alt={item.product.name} width={200} height={200} />
        <div className="flex flex-1 flex-wrap">
          <div className="w-3/4">
            <h3 className="text-xl">{item.product.name}</h3>
            <StockDisplay sku={item.product.sku} />
          </div>
          <div className="flex w-1/4 justify-end text-lg font-semibold">{toPrice(item.product.price.current, '€')}</div>
          <div className="flex w-full items-center gap-6 py-4 sm:gap-2">
            <SelectQuantity
              prefix="Qté"
              disabled={disabled}
              className="mt-0 h-fit w-fit"
              initialQty={item.quantity}
              onQtyChange={handleQuantityChange}
            />
            <Separator orientation="vertical" />
            <Button variant="link" size="link" onClick={handleDeleteItem}>
              Supprimer
            </Button>
            <Separator orientation="vertical" />
            <Button variant="link" size="link" onClick={handleMoveAsideItem}>
              Mettre de coté
            </Button>
          </div>
        </div>
      </div>
      <hr />
    </>
  );
};

export default BasketItemTile;
