import { Button } from '@/components/ui/button';
import { upperFirst } from '@/helpers/string.helper';
import { Plus } from 'lucide-react';
import AddressBoxActionButtons from './AddressBoxActionButtons';

import { type Address } from 'qshop-sdk';

export type AddressBoxProps = {
  address: Address;
};

export function CreateAddressBox() {
  return (
    <div className="flex min-h-[250px] flex-col items-center justify-center rounded-md border-2 border-dashed border-slate-300 text-slate-500">
      <Plus size={48} />
      <div className="text-xl">Ajouter une adresse</div>
    </div>
  );
}

export function AddressBox({ address }: AddressBoxProps) {
  return (
    <div className="flex h-full flex-col rounded-md border border-slate-300 text-sm text-slate-700">
      {address.main ? <div className="w-full border-b p-2 text-sm">Adresse par défaut</div> : null}
      <div className="flex flex-1 flex-col justify-between">
        <div className=" px-4 py-2">
          <div className="font-bold">{address.name}</div>
          <div>
            {address.number} {address.street}
          </div>
          <div>
            {address.city}, {address.zipcode}
          </div>
          <div>{upperFirst(address.country)}</div>
          <div>Numéro de téléphone: {address.contactNumber}</div>
          <Button variant="link" size="link">
            Ajouter des instructions de livraison
          </Button>
        </div>
        <AddressBoxActionButtons addressId={address.id} />
      </div>
    </div>
  );
}
