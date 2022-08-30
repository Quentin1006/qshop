import { MapPin } from 'lucide-react';
import { type ShippingAddress, type User } from 'qshop-sdk';
import { navigationMenuTriggerStyle } from '../ui/navigation-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

export type ShippingAddressTabProps = {
  shippingAddress?: Pick<ShippingAddress, 'zipCode' | 'city'>;
  client?: Pick<User, 'lastname'>;
};

function Tab({ shippingAddress, client }: ShippingAddressTabProps) {
  const isValidAddress = shippingAddress?.city && shippingAddress?.zipCode;
  const isValidClient = client?.lastname;

  return (
    <div className="flex items-end">
      <MapPin size={24} className="pb-2 text-background" />
      <div className="flex flex-col items-start">
        <div className="text-xs font-thin">
          {isValidClient ? `Livraison à ${client.lastname}` : 'Aucun lieu de livraison'}
        </div>
        <div>
          {isValidAddress ? `${shippingAddress.city} ${shippingAddress.zipCode}` : "Mettre à jour l'emplacement"}
        </div>
      </div>
    </div>
  );
}

export function ShippingAddress() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={cn(navigationMenuTriggerStyle(), 'hidden h-fit py-2 lg:flex')}>
          <Tab />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>Make changes to your profile here. Click save when you're done.</DialogDescription>
        </DialogHeader>
        Main Content
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
