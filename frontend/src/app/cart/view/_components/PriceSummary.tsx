'use client';

import { Button } from '@/components/ui/button';

import { TotalPrice } from './TotalPrice';
import { Box } from '@/components/ui/box';
import Link from 'next/link';
import { type BasketItem } from 'qshop-sdk';

export type PriceSummaryProps = {
  activeItems: BasketItem[];
};

export default function PriceSummary({ activeItems }: PriceSummaryProps) {
  return (
    <Box>
      <TotalPrice items={activeItems} />
      <Link href="/cart/view" className="w-full px-3">
        <Button
          onClick={() => {
            console.log('jej');
          }}
          variant="tertiary"
          className="mt-4 h-fit w-full rounded-xl py-2 text-slate-700"
        >
          Aller au panier
        </Button>
      </Link>
    </Box>
  );
}
