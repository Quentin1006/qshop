import { ProductCard } from '@/components/ProductCard';
import { BasicLink } from '@/components/ui/basic-link';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Product } from 'qshop-sdk';
import { type Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Products By Category',
};

export type ProductsByCategoryProps = {
  params: { category: string };
};

async function getCategories(category: string) {
  const res = await fetch(`http://localhost:8088/products/by-categories/${category}?limit=10&offset=0`);
  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function ProductsByCategory({ params }: ProductsByCategoryProps) {
  const productsByCategory = await getCategories(params.category);

  const firstResult = productsByCategory.pageInfo.idxStart;
  const lastResult = productsByCategory.pageInfo.idxEnd;
  const total = productsByCategory.total;
  return (
    <div className="h-full flex-col">
      <div className=" flex justify-between py-1 px-2 shadow-md">
        <div className="text-sm">{`${firstResult} à ${lastResult} des ${total} résultats`}</div>
        <Select defaultValue={'ej'}>
          <SelectTrigger className="h-fit w-fit rounded-md px-2 py-0 text-[11px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {[{ id: 1, name: 'ej' }].map((cat) => (
              <SelectItem key={cat.id} value={cat.name} className="truncate">
                {`Trier par : ${cat.name}`}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex py-4">
        <div className="w-1/4 border-r bg-red-300"></div>
        <div className="flex-1 px-2 ">
          <div>
            <div className="text-xl font-semibold">Résultats</div>
            <div className="text-sm">
              <BasicLink href={'/help/xxx'}>En apprendre plus sur ces résultats.</BasicLink>
              &nbsp;Consultez la page de chaque produit pour connaître les autres options d'achat.
            </div>
          </div>

          <div className={'grid grid-cols-1 gap-2 pt-2 sm:grid-cols-3 xl:grid-cols-4'}>
            {/* <!-- Repeat the following cell as needed for an infinite grid --> */}
            {productsByCategory.data.map((product: Product) => (
              <ProductCard product={product} key={product.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
