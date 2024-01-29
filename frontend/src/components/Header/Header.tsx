'use client';

import HeaderConnect from './HeaderConnect';
import * as React from 'react';

import Image from 'next/image';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';

import { Search, ShoppingCart } from 'lucide-react';

import { ShippingAddress } from './ShippingAddress';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Category } from 'qshop-sdk';
import { upperFirst } from '@/helpers/string.helper';

type HeaderProps = {
  cartItemsCount?: number;
  categories: Category[];
  user?: any;
};

export default ({ cartItemsCount, categories, user }: HeaderProps) => {
  return (
    <header className="flex bg-primary px-1">
      <div className="w-auto py-1">
        <NavigationMenu>
          <NavigationMenuLink className="p-0" asChild>
            <a href="/">
              <Image src="/logo-qshop-long.png" alt="logo-qshop" width={150} height={50} />
            </a>
          </NavigationMenuLink>
          <NavigationMenuLink className="p-0" asChild>
            <ShippingAddress />
          </NavigationMenuLink>
        </NavigationMenu>
      </div>

      <form className="flex w-auto flex-1 items-center px-1">
        <Select>
          <SelectTrigger className="w-[220px] rounded-tr-none rounded-br-none bg-slate-300 px-1 text-[11px]">
            <SelectValue placeholder="Toutes nos catégories" />
          </SelectTrigger>
          <SelectContent>
            {(categories || []).map((cat) => (
              <SelectItem key={cat.id} value={cat.name} className="truncate">
                {upperFirst(cat.name)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input type="text" placeholder="Rechercher sur Qshop.fr" className="rounded-none" />
        <Button type="submit" className="rounded-bl-none rounded-tl-none" variant="tertiary">
          <Search />
        </Button>
      </form>

      <div className="flex w-auto items-center">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem className="flex align-middle">
              <NavigationMenuTrigger className="flex py-2">
                <HeaderConnect user={user} />
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className=" flex flex-col p-3 md:w-[400px] lg:w-[500px]">
                  <div className="js-login-group w-full pb-2">
                    <div className="flex w-full flex-col items-center justify-center pb-2">
                      <NavigationMenuLink
                        asChild
                        className="text-tertiary-foreground hover:text-tertiary-foreground bg-tertiary px-6 py-1 hover:bg-tertiary/80"
                      >
                        <a href="/api/auth/login">Identifiez-Vous</a>
                      </NavigationMenuLink>
                      <div className="pt-1 text-xs">
                        Nouveau client ?{' '}
                        <a href="/api/auth/login" className="font-bold text-primary">
                          cliquez ici
                        </a>
                      </div>
                    </div>
                    <hr />
                  </div>
                  <div className="flex">
                    <div className="border-r-1 flex w-1/2 pl-2">
                      <h3 className="font-bold">Vos listes d'envies</h3>
                    </div>
                    <div className="flex w-1/2 pl-2">
                      <h3 className="font-bold">Votre compte</h3>
                    </div>
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="https://github.com/radix-ui" className="flex flex-col items-start py-2">
                <div className="text-xs font-thin">Retours</div>
                <div>et commandes</div>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem className="relative">
              <NavigationMenuLink href="https://github.com/radix-ui">
                <div className="absolute left-4 top-0.5 flex h-[20px] w-[20px] items-center justify-center text-lg text-orange-600">
                  {cartItemsCount}
                </div>
                <ShoppingCart />
                Panier
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuIndicator />
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
};
