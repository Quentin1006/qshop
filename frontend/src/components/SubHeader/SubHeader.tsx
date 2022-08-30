'use client';

import Link from 'next/link';
import { type Category } from 'qshop-sdk';
import { Menu } from 'lucide-react';
import SideMenu from './SideMenu';

import { NavigationMenu, NavigationMenuLink } from '@/components/ui/navigation-menu';

export type SubHeaderProps = {
  categories: Category[];
};

export const mapping: Record<string, string> = {
  bestsellers: 'Meilleures ventes',
  brand_new: 'Dernières Nouveautés',
  flash_sells: 'Ventes Flash',
  fashion: 'Mode',
  'high-tech': 'High-Tech',
  decoration: 'Decoration',
  miscelleanous: ' Divers',
};

export default function SubHeader({ categories }: SubHeaderProps) {
  console.log({ categories });
  return (
    <>
      <NavigationMenu className="z-0 bg-slate-700 pl-1">
        <NavigationMenuLink className="py-2" asChild>
          <SideMenu>
            <Menu size={18} className="pr-1" />
            Toutes
          </SideMenu>
        </NavigationMenuLink>

        {categories.map((cat: any) => {
          return (
            <NavigationMenuLink key={cat.id} className="py-2" asChild>
              <Link href={`/products/categories/${cat.name}`}>{mapping[cat.name]}</Link>
            </NavigationMenuLink>
          );
        })}
      </NavigationMenu>
    </>
  );
}
