'use client';

import { useState } from 'react';
import { Construction } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

export type AddToBasketProps = {
  inStock: number;
  priceWithCurrency: string;
  productId: number;
  basketId: string;
};

export default function AddToBasket({ inStock, priceWithCurrency, productId }: AddToBasketProps) {
  const [quantity, setQuantity] = useState('1');
  const handleQuantityChange = (value: string) => {
    setQuantity(value);
  };

  const handleAddToBasket = () => {
    console.log('add to basket', { productId, quantity });
    // fetch(`http://localhost:8088/basket/${basketId}/addItem`, {
    fetch(`http://localhost:8088/basket/s-1234/addItem`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        productId,
        quantity,
      }),
    });
  };
  return (
    <>
      <h2 className="text-sm font-semibold">Une seule livraison</h2>
      <div className="tracking-wider text-red-600">{priceWithCurrency}</div>
      <div className="flex h-24 items-center gap-1 text-orange-600">
        <Construction /> Shipping block <Construction />
      </div>
      <div>
        {inStock > 20 ? (
          <div className="text-lg font-semibold text-green-700">En stock</div>
        ) : (
          <div>Plus que {inStock} restants</div>
        )}
      </div>

      <Select onValueChange={handleQuantityChange} defaultValue={'1'}>
        <SelectTrigger className="mt-2 h-fit rounded-md py-1 shadow-md">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {Array.from({ length: 20 })
            .map((val, idx) => idx + 1)
            .map((val) => (
              <SelectItem key={val} value={`${val}`} className="truncate">
                {`Quantité : ${val}`}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
      <Button
        onClick={handleAddToBasket}
        variant="tertiary"
        className="mt-4 h-fit w-full rounded-3xl py-2 text-slate-700"
      >
        Ajouter au panier
      </Button>
      <Button variant="secondary" className="mt-2 h-fit w-full rounded-3xl bg-orange-400 py-2 text-slate-700">
        Acheter cet article
      </Button>
    </>
  );
}
