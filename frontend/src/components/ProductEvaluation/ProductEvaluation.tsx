import { formatNumber, toFloat } from '@/helpers/string.helper';
import RatingPanel from './RatingPanel';
import { ChevronDown } from 'lucide-react';
import { BasicLink } from '../ui/basic-link';

export type ProductEvaluationProps = {
  productId: number;
  votes: number;
  rate: number;
};

export default function ProductEvaluation({ productId, votes, rate }: ProductEvaluationProps) {
  return (
    <div className="flex items-center">
      <RatingPanel
        productId={productId}
        votes={formatNumber(votes)}
        rate={rate}
        size={18}
        className="text-orange-500"
        // @TODO: Replace with actual data
        distribution={{ 5: 69, 4: 20, 3: 6, 2: 1, 1: 4 }}
      />
      <ChevronDown size={14} />
      <BasicLink href={`/products/${productId}#comments`} className="px-1 text-sm">
        {formatNumber(votes)}
      </BasicLink>
    </div>
  );
}
