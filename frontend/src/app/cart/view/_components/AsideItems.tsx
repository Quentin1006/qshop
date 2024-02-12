import { Box } from '@/components/ui/box';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { type BasketItem } from 'qshop-sdk';
import AsideItemTile from './AsideItemTile';

export type AsideItemsProps = {
  asideItems: BasketItem[];
  basketId: string;
};

export default function AsideItems({ asideItems, basketId }: AsideItemsProps) {
  return (
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
                <AsideItemTile basketId={basketId} item={item} />
              </div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="password">Change your password here.</TabsContent>
      </Tabs>
    </Box>
  );
}
