import { getUserAddresses } from './_services';
import { Address } from 'qshop-sdk';

import { CreateAddressBox, AddressBox } from './_components/AddressBox';
import Title from '@/components/ui/title';
import Notification from '@/components/ui/notification';
import Link from 'next/link';

export type AddressPageProps = {
  searchParams: {
    created?: string;
    updated?: string;
    deleted?: string;
  };
};

export default async function AddressPage({ searchParams }: AddressPageProps) {
  const addresses = await getUserAddresses<Address>();
  const { created, updated, deleted } = searchParams;

  return (
    <div className="mx-auto w-full max-w-[980px] p-4">
      {created && <Notification content="Votre adresse a été créée avec succès." />}
      {updated && <Notification content="Votre adresse a été mis à jour avec succès." />}
      {deleted && <Notification content="Votre adresse a été supprimée avec succès." />}

      <Title>Vos Adresses</Title>
      <ul className="grid grid-cols-1 gap-4 py-4 sm:grid-cols-2 md:grid-cols-3">
        <li className="row-span-1 w-full">
          <Link href="addresses/add">
            <CreateAddressBox />
          </Link>
        </li>
        {addresses.map((address) => (
          <li className="row-span-1 w-full" key={address.id}>
            <AddressBox address={address} />
          </li>
        ))}
      </ul>
    </div>
  );
}
