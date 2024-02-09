'use client';

import { Box } from '@/components/ui/box';
import React, { useMemo } from 'react';
import BasketItemTile from './_components/BasketItemTile';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAppContext } from '@/contexts/AppContext';
import AsideArticle from './_components/AsideArticle';
import { TotalPrice } from './_components/TotalPrice';
import Link from 'next/link';

export default function Page() {
  const { basket } = useAppContext();
  const currentItems = basket.items.filter((item) => ['ACTIVE', 'INACTIVE'].includes(item.state));

  const asideItems = basket.items.filter((item) => item.state === 'ASIDE');
  return (
    <div className="h-full w-full bg-gray-300">
      <div className="mx-auto flex max-w-[1580px] gap-4 p-4">
        <div className="flex w-3/4 flex-col gap-4">
          <Box className="flex-col items-start justify-start">
            <h1 className="text-3xl">Votre panier</h1>
            <Button variant="link" className="p-0">
              Sélectionner tous les éléments
            </Button>
            <div className="flex w-full flex-col items-end text-slate-500">Prix</div>
            <hr className="w-full" />
            <ul className="flex w-full flex-col">
              {currentItems.map((item) => (
                <li key={item.id}>
                  <BasketItemTile basketId={basket.refId} item={item} />
                </li>
              ))}
            </ul>
            <TotalPrice className="justify-end" items={currentItems} />
          </Box>

          <Box className="flex-col items-start justify-start">
            <h2 className="text-2xl">Vos articles</h2>
            <Tabs defaultValue="aside-articles" className="w-full pt-4">
              <TabsList>
                <TabsTrigger value="aside-articles">Enregistré pour plus tard ({asideItems.length})</TabsTrigger>
                <TabsTrigger value="password">Acheter à nouveau</TabsTrigger>
              </TabsList>
              <TabsContent value="aside-articles">
                <div className={'flex flex-wrap pt-2'}>
                  {asideItems.map((item) => (
                    <div key={item.id} className="box-border p-1 sm:w-1/2 lg:w-1/3 xl:w-1/4">
                      <AsideArticle basketId={basket.refId} item={item} />
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="password">Change your password here.</TabsContent>
            </Tabs>
          </Box>
        </div>
        <div className="flex h-fit w-1/4 min-w-[250px] flex-col gap-4">
          <Box>
            <TotalPrice items={currentItems} />
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
          <Box className="flex-col items-start">
            <h3 className="text-lg font-semibold">Associer à votre panier</h3>
          </Box>
        </div>
      </div>
    </div>
  );
}
