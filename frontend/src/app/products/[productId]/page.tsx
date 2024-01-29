import { type ProductDetails } from 'qshop-sdk';
import Image from 'next/image';
import { BasicLink } from '@/components/ui/basic-link';
import { toPrice } from '@/helpers/string.helper';
import { ProductEvaluation } from '@/components/ProductEvaluation';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Button } from '@/components/ui/button';
import { Dot, MessageSquareText } from 'lucide-react';
import AddToBasket from './AddToBasket';

export type ProductProps = {
  params: { productId: string };
};

export const dynamic = 'force-dynamic';

async function getProductDetails(productId: string): Promise<ProductDetails> {
  console.log(`http://localhost:8088/products/${productId}/details`);
  const res = await fetch(`http://localhost:8088/products/${productId}/details`);
  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function ({ params }: ProductProps) {
  const pDetails = await getProductDetails(params.productId);
  return (
    <>
      <div className="banner h-16 w-full"></div>
      <div className="flex px-2">
        <div className="product-images w-1/3">
          <Image className="w-full" alt={pDetails.description} src={pDetails.link} width={300} height={500} />
        </div>
        <div className="product-info w-1/2 px-2">
          <h1 className="text-2xl">
            {pDetails.name} | {pDetails.description}
          </h1>
          <div>
            <BasicLink className="text-sm" href={`/stores/${pDetails.store.id}`}>
              Visiter la boutique {pDetails.store.name}
            </BasicLink>
          </div>

          <ProductEvaluation
            productId={Number(params.productId)}
            rate={pDetails.rate.value}
            votes={pDetails.rate.votes}
          />
          <div className="pb-2 text-xs text-slate-500">Plus de x achetés au cours du mois dernier</div>
          <hr />

          <div className="flex flex-col pt-2 text-sm">
            <div className="flex w-full">
              <div className="w-[100px] text-right">Prix conseillé :</div>
              <div className="flex pl-2 text-slate-500">
                <div className="pr-2 tracking-wider line-through">{toPrice(pDetails.price.raw, '€')}</div>
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Button variant="link" className="h-fit px-0 py-0 text-inherit hover:no-underline">
                      Détails
                    </Button>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-[400px]">
                    <div>
                      Le prix conseillé est le prix de vente conseillé par le fabricant ou l'importateur du produit et
                      fourni par le fabricant, un fournisseur ou un vendeur tiers. Amazon affiche le prix conseillé en
                      tant que prix de référence à des fins de comparaison lorsque le prix de vente du produit appliqué
                      sur Amazon.fr ou par au moins un distributeur était supérieur ou égal à ce prix conseillé au cours
                      des 90 derniers jours.
                    </div>
                    <BasicLink href="/help/customer/price">Plus d'informations</BasicLink>
                  </HoverCardContent>
                </HoverCard>
              </div>
            </div>
            <div className="flex w-full items-center">
              <div className="w-[100px] text-right">Prix :</div>
              <div className="flex pl-2">
                <div className=" pr-2 text-lg font-medium tracking-wider text-red-600">
                  {toPrice(pDetails.price.current, '€')}
                </div>
              </div>
            </div>
          </div>

          <hr />
          <div className="caracteristics pt-2">
            <h2 className="text-lg font-semibold">A propos de cet article</h2>
            <ul>
              {pDetails.caracteristics.map((carac) => (
                <li key={carac} className="flex text-sm">
                  <Dot /> {carac}
                </li>
              ))}
            </ul>
            <BasicLink href="" className="flex py-3 text-sm">
              <MessageSquareText />
              Signaler un problème avec ce produit
            </BasicLink>
            <hr />
          </div>
        </div>
        <div className="order-panel border-bg-slate-500 w-1/6 min-w-[220px] rounded-md border p-2">
          <AddToBasket
            priceWithCurrency={toPrice(pDetails.price.current, '€')}
            inStock={pDetails.inStock}
            productId={pDetails.id}
          />
        </div>
      </div>
    </>
  );
}
