import { useMemo } from 'react';

import { toPrice } from '@/helpers/string.helper';
import { type BasketItem } from 'qshop-sdk';
import { cn } from '@/lib/utils';

export type TotalPriceProps = {
  items: BasketItem[];
  className?: string;
};

export function TotalPrice({ items, className }: TotalPriceProps) {
  const nbCurrentItems = useMemo(() => items.reduce((acc, item) => acc + item.quantity, 0), [items]);
  const totalPrice = useMemo(
    () =>
      toPrice(
        items.reduce((acc, item) => acc + item.quantity * item.product.price.current, 0),
        '€',
      ),
    [items],
  );
  const articleSyntax = nbCurrentItems > 1 ? 'articles' : 'article';
  return (
    <div className={cn('inline-flex w-full justify-center gap-2 pt-2 text-xl', className)}>
      Sous-total ({nbCurrentItems} {articleSyntax}): <span className="font-bold">{totalPrice}</span>
    </div>
  );
}
