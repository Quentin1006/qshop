'use client';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '../ui/button';
import { navigationMenuTriggerStyle } from '../ui/navigation-menu';
import { cn } from '@/lib/utils';

export default function SideMenu({ children }: any) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className={cn(navigationMenuTriggerStyle(), 'py-2 hover:no-underline')} variant={'link'}>
          {children}
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Are you absolutely sure?</SheetTitle>
          <SheetDescription>
            This action cannot be undone. This will permanently delete your account and remove your data from our
            servers.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
