'use client';

import Image from 'next/image';
import { type BasketItem } from 'qshop-sdk';

import { toPrice } from '@/helpers/string.helper';
import { StockDisplay } from '@/components/StockDisplay';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { deleteBasketItem, getBasket, updateBasketItem } from '@/services/main';
import { useAppContext } from '@/contexts/AppContext';

export type AsideArticleProps = {
  item: BasketItem;
  basketId: string;
};

const AsideArticle = ({ item, basketId }: AsideArticleProps) => {
  const [disabled, setDisabled] = useState(false);
  const { setBasket } = useAppContext();

  const handleMoveToBasketItem = async () => {
    setDisabled(true);
    const body: Partial<BasketItem> = {
      id: item.id,
      state: 'ACTIVE',
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

  const handleDeleteItem = async () => {
    setDisabled(true);

    try {
      await deleteBasketItem(basketId, item.id);
      const newBasket = await getBasket(basketId);
      setBasket(newBasket);
    } catch (error) {
      console.error('Failed to delete basket item', error);
    }

    setDisabled(false);
  };

  return (
    <div className="h-full w-full border border-gray-300 p-2">
      {disabled ? <div className="absolute z-10 h-full w-full bg-slate-100/40"></div> : null}
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
  );
};

export default AsideArticle;
