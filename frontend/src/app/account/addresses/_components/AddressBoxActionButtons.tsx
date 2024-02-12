'use client';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { deleteAddress } from '../_actions';
import { BasicLink } from '@/components/ui/basic-link';

export type AddressBoxActionButtonsProps = {
  addressId: number;
};

export default function AddressBoxActionButtons({ addressId }: AddressBoxActionButtonsProps) {
  const handleRemoveAddress = () => {
    deleteAddress(addressId);
  };
  return (
    <div className="flex items-center gap-2 px-4 py-2">
      <BasicLink href={`addresses/add?addressId=${addressId}`}>Modifier</BasicLink>
      <Separator orientation="vertical" className="h-4 border-slate-600" />
      <Button variant="link" size="link" onClick={handleRemoveAddress}>
        Effacer
      </Button>
    </div>
  );
}
