import { BasicLink } from '@/components/ui/basic-link';
import Title from '@/components/ui/title';

import { MapPin } from 'lucide-react';

import AddressForm from './_components/AddressForm';
import { getAddress } from '../_services';

export type AddAddressPageProps = {
  searchParams: {
    addressId?: number;
  };
};
export default async function AddAddressPage({ searchParams }: AddAddressPageProps) {
  let address;
  if (searchParams.addressId) {
    address = await getAddress(searchParams.addressId);
  }
  return (
    <div className="mx-auto w-full max-w-[880px] p-4">
      <Title>Ajouter une nouvelle adresse</Title>
      <div className="flex items-center gap-1 text-sm">
        <MapPin />
        <BasicLink href="/account/addresses">Ou trouver un lieu de retrait près de chez vous</BasicLink>
      </div>
      <AddressForm address={address} />
    </div>
  );
}
