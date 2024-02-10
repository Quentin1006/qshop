import { getUserAddresses } from '@/services/main';
import { Address } from 'qshop-sdk';

import { CreateAddressBox, AddressBox } from './_components/AddressBox';
import Title from '@/components/ui/title';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function AddressPage() {
  const addresses = await getUserAddresses<Address>();
  return (
    <div className="mx-auto w-full max-w-[980px] p-4">
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
