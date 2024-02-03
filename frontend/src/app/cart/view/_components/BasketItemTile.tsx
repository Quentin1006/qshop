'use client';

import Image from 'next/image';
import { type BasketItem } from 'qshop-sdk';
import React from 'react';

import { SelectQuantity } from '@/components/SelectQuantity';
import { Checkbox } from '@/components/ui/checkbox';
import { toPrice } from '@/helpers/string.helper';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { getBasket, updateBasketItem } from '@/services/main';
import { useAppContext } from '@/contexts/AppContext';

export type BasketItemProps = {
  item: BasketItem;
  basketId: string;
};

const BasketItemTile = ({ item, basketId }: BasketItemProps) => {
  const [disabled, setDisabled] = React.useState(false);
  const { setBasket } = useAppContext();
  const handleUpdateBasketItemSelection = async (isActive: boolean) => {
    setDisabled(true);
    const body: Partial<BasketItem> = {
      id: item.id,
      state: isActive ? 'ACTIVE' : 'ASIDE',
    };
    try {
      await updateBasketItem(basketId, body);
      const newBasket = await getBasket(basketId);
      setBasket(newBasket);
    } catch (error) {
      console.error('Failed to update basket item', error);
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
      const newBasket = await getBasket(basketId);
      setBasket(newBasket);
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
            {item.product.sku ? (
              <p className="text-sm text-green-700">En stock</p>
            ) : (
              <p className="text-sm text-red-700">En rupture de stock</p>
            )}
          </div>
          <div className="flex w-1/4 justify-end text-lg font-semibold">{toPrice(item.product.price.current, '€')}</div>
          <div className="flex w-full items-center gap-6 py-4">
            <SelectQuantity
              prefix="Qté"
              disabled={disabled}
              className="mt-0 h-fit w-fit"
              initialQty={item.quantity}
              onQtyChange={handleQuantityChange}
            />
            <Separator orientation="vertical" />
            <Button variant="link" size="link">
              Supprimer
            </Button>
            <Separator orientation="vertical" />
            <Button variant="link" size="link">
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
