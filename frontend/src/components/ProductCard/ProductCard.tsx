import { type Product } from 'qshop-sdk';
import Image from 'next/image';

import { BasicLink } from '@/components/ui/basic-link';

import { toFloat } from '@/helpers/string.helper';
import Price from '@/components/ui/price';

import { ProductEvaluation } from '../ProductEvaluation';

export type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="border border-gray-200">
      <div className="card-image relative flex justify-center py-6">
        <div className="overlay absolute top-0 bottom-0 left-0 right-0 bg-black" style={{ opacity: 0.03 }}></div>
        <Image alt={product.name} src={product.link} width={350} height={700} />
      </div>
      <div className="card-text p-3">
        <BasicLink href={`/products/${product.id}`} className="text-black">
          <div className="overflow-hidden overflow-ellipsis whitespace-normal line-clamp-4">
            {product.name} | {product.description}
          </div>
        </BasicLink>
        <div className="rating-wrapper flex items-center">
          <ProductEvaluation productId={product.id} votes={product.rate.votes} rate={product.rate.value} />
        </div>
        <div className="text-sm text-slate-500">Plus de x achetés au cours du mois dernier</div>
        <Price value={toFloat(product.price.current)} />
      </div>
    </div>
  );
}
