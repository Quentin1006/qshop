import { Box } from '@/components/ui/box';
import { getBasket } from '@/services/main';
import BasketView from './_components/BasketItems';
import AsideItems from './_components/AsideItems';
import PriceSummary from './_components/PriceSummary';

export default async function Page() {
  const basket = await getBasket();
  const currentItems = basket.items.filter((item) => ['ACTIVE', 'INACTIVE'].includes(item.state));

  const asideItems = basket.items.filter((item) => item.state === 'ASIDE');
  return (
    <div className="h-full w-full bg-gray-300">
      <div className="mx-auto flex max-w-[1580px] gap-4 p-4">
        <div className="flex w-3/4 flex-col gap-4">
          <BasketView basketId={basket.refId} items={currentItems} />
          <AsideItems asideItems={asideItems} basketId={basket.refId} />
        </div>
        <div className="flex h-fit w-1/4 min-w-[250px] flex-col gap-4">
          <PriceSummary activeItems={currentItems} />
          <Box className="flex-col items-start">
            <h3 className="text-lg font-semibold">Associer à votre panier</h3>
          </Box>
        </div>
      </div>
    </div>
  );
}
