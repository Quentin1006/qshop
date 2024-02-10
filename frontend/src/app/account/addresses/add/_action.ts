'use server';

import { revalidatePath } from 'next/cache';

export async function sendForm(values: any) {
  // const rawFormData = Object.fromEntries(formData.entries());
  console.log('sendForm', JSON.stringify(values));
  const response = await fetch('http://localhost:8088/addresses/fake/create', {
    method: 'POST',
    body: JSON.stringify(values),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const json = await response.json();

  revalidatePath('/account/addresses/add');
}
