import { ProductsCarousel } from '@/components/ProductsCarousel';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export const dynamic = 'force-dynamic';

const CustomCard = ({ size, className }: any) => {
  return (
    <Card className={cn(className, 'h-full')}>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      {!size ? (
        <>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </>
      ) : null}
    </Card>
  );
};

export default function Home() {
  return (
    <div className="flex w-full justify-between bg-gray-300">
      {/* div tag and width is important for slider */}
      <div className="mx-auto w-full max-w-[1480px]">
        <div className="w-full">
          <ProductsCarousel />
          <div className="relative z-10 grid grid-cols-3 grid-rows-6 gap-5 p-5 ">
            <CustomCard className="col-span-1 row-span-2 shadow-md" />
            <CustomCard className="col-span-1 row-span-2 shadow-md" />
            <CustomCard className="col-span-1 row-span-2" />
            <CustomCard className="col-span-2 row-span-2" />
            <CustomCard className="col-span-1 row-span-1" size={1} />
            <CustomCard className="col-span-1 row-span-1" size={1} />
            <CustomCard className="col-span-1 row-span-2" />
            <CustomCard className="col-span-1 row-span-2" />
            <CustomCard className="col-span-1 row-span-2" />
          </div>
        </div>
      </div>
    </div>
  );
}
