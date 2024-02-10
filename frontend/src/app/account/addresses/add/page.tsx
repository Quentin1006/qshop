import { BasicLink } from '@/components/ui/basic-link';
import Title from '@/components/ui/title';

import { MapPin } from 'lucide-react';

import AddressForm from './_components/AddressForm';

async function getFakeAddress() {
  const res = await fetch('http://localhost:8088/addresses/fake');
  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function AddAddressPage() {
  const fakeAddress = await getFakeAddress();
  return (
    <div className="mx-auto w-full max-w-[980px]">
      <Title>Ajouter une nouvelle adresse</Title>
      <div className="flex items-center gap-1 text-sm">
        <MapPin />
        <BasicLink href="/account/addresses">Ou trouver un lieu de retrait près de chez vous</BasicLink>
      </div>

      <fieldset className="rounded-md border border-slate-300 p-4">
        <legend className="text-sm">Current value in the db</legend>
        <div>{fakeAddress.name}</div>
      </fieldset>

      <AddressForm />
    </div>
  );
}