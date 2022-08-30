import { Rating, type RatingProps } from '@/components/ui/rating';

import { Button } from '@/components/ui/button';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { BasicLink } from '@/components/ui/basic-link';
import { Progress } from '@/components/ui/progress';

export type RatingPanelProps = Omit<RatingProps, 'max'> & {
  productId: string | number;
  votes: number | string;
  max?: number;
  distribution?: Record<number, number>;
  displayRate?: boolean;
};

export default function RatingPanel({
  productId,
  displayRate = false,
  rate,
  size,
  className,
  distribution = {},
  votes,
  max = 5,
}: RatingPanelProps) {
  const sanitizedRate = rate.toFixed(1).replace('.', ',');
  return (
    <>
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="link" className="h-fit px-0 py-1">
            {displayRate ? <div>{sanitizedRate}</div> : null}
            <Rating {...{ rate, size, className, max }} />
          </Button>
        </HoverCardTrigger>
        <HoverCardContent>
          <div className="flex items-center pb-1">
            <Rating {...{ rate, size, className, max }} />
            <div className="px-2 text-lg font-bold">
              {sanitizedRate} sur {max}
            </div>
          </div>
          <div className="text-sm text-slate-600">{votes} évaluations</div>
          <div className="js-distribution py-2">
            {Object.entries(distribution)
              .sort(([key1], [key2]) => Number(key2) - Number(key1))
              .map(([key, value]) => (
                <BasicLink key={key} href="#" className="flex w-[300px] items-center gap-4 pt-2">
                  <div className=" flex-0 text-sm">{key} étoiles</div>
                  <Progress value={value} className="flex-1" />
                  <div className="flex-0">{value}%</div>
                </BasicLink>
              ))}
          </div>
          <hr className="border-slate-400" />
          <BasicLink className="flex w-full justify-center pt-4" href={`/products/${productId}#comments`}>
            Voir les commentaires clients
          </BasicLink>
        </HoverCardContent>
      </HoverCard>
    </>
  );
}
