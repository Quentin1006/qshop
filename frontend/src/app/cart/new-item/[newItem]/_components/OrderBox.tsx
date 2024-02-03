'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useAppContext } from '@/contexts/AppContext';
import Price from '@/components/ui/price';

export type OrderBoxProps = {};

const OrderBox: React.FC<OrderBoxProps> = (props) => {
  const { basket } = useAppContext();
  const price = useMemo(() => {
    return basket?.items?.reduce((acc, item) => {
      return acc + item.product.price.current * item.quantity;
    }, 0);
  }, [basket?.items]);

  return (
    <div>
      <div className="flex h-fit items-center gap-2">
        <h3 className="text-xl font-semibold">Sous-total du panier :</h3>
        <Price value={price} />
      </div>
      <Link href="/order">
        <Button
          onClick={() => {
            console.log('jej');
          }}
          variant="tertiary"
          className="mt-4 h-fit w-full rounded-xl py-2 text-slate-700"
        >
          Passer la commande ({basket?.items?.length} articles)
        </Button>
      </Link>

      <Link href="/cart/view">
        <Button
          onClick={() => {
            console.log('jej');
          }}
          variant="outline"
          className="mt-4 h-fit w-full rounded-xl py-2 text-slate-700"
        >
          Aller au panier
        </Button>
      </Link>
    </div>
  );
};

export default OrderBox;
