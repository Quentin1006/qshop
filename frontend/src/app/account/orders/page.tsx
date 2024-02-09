import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Page() {
  return (
    <div className="m-auto h-full w-full max-w-[1000px]">
      <h1 className="py-4 text-3xl">Vos commandes</h1>
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
    </div>
  );
}
