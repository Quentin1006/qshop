import { Plus } from 'lucide-react';
import { type Address } from 'qshop-sdk';

export type AddressBoxProps = {
  address: Address;
};

export function CreateAddressBox() {
  return (
    <div className="flex min-h-[220px] flex-col items-center justify-center rounded-md border-2 border-dashed border-slate-300 text-slate-500">
      <Plus size={48} />
      <div className="text-xl">Ajouter une addresse</div>
    </div>
  );
}

export function AddressBox({ address }: AddressBoxProps) {
  return (
    <div className="h-full rounded-md border border-slate-300 text-slate-500">
      {address.main ? <div className="w-full border-b p-2 text-sm">Adresse par défaut</div> : null}
      <div className=""></div>
    </div>
  );
}
