'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { BasicLink } from '@/components/ui/basic-link';
import Title from '@/components/ui/title';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { MapPin } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2).max(50),
  country: z.string().min(2).max(30),
  contactNumber: z.string().regex(/^\+[1-9]\d{1,14}$/),
  address: z.string().min(2).max(200),
  complement: z.string().min(2).max(200),
  city: z.string().min(2).max(50),
  zipcode: z.string().min(2).max(20),
  main: z.boolean(),
  shippingInstructions: z.string().min(2).max(200),
});

export default function AddAddressPage() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      country: '',
      contactNumber: '',
      address: '',
      complement: '',
      city: '',
      zipcode: '',
      main: false,
      shippingInstructions: '',
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <div className="mx-auto w-full max-w-[980px]">
      <Title>Ajouter une nouvelle adresse</Title>
      <div className="flex items-center gap-1 text-sm">
        <MapPin />
        <BasicLink href="/account/addresses">Ou trouver un lieu de retrait près de chez vous</BasicLink>
      </div>

      <div className="py-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="">
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pays/région</FormLabel>
                  <FormControl>
                    <Select defaultValue={'france'}>
                      <SelectTrigger className="rounded-md ">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[{ id: 1, name: 'ej' }].map((cat) => (
                          <SelectItem key={cat.id} value={cat.name} className="truncate">
                            {cat.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom complet (prénom et nom de famille)</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contactNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Numéro de téléphone</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Adresse</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Adresse" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="complement"
              render={({ field }) => (
                <FormItem className="mt-1">
                  <FormControl>
                    <Input {...field} placeholder="Apt, suite, unité, nom de l'entreprise (facultatif)" />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="flex">
              <div className="w-2/5">
                <FormField
                  control={form.control}
                  name="zipcode"
                  render={({ field }) => (
                    <FormItem className="m-1">
                      <FormLabel>Code Postal</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-3/5">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem className="m-1">
                      <FormLabel>Ville</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <FormField
              control={form.control}
              name="main"
              render={({ field }) => (
                <FormItem className="my-2 flex items-center gap-1">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className="space-y-0 leading-none" style={{ margin: 0 }}>
                    <FormLabel>Faire de cette adresse mon adresse par défaut</FormLabel>
                  </div>
                </FormItem>
              )}
            />

            <Button variant="tertiary" type="submit" className="mt-8">
              Ajouter une adresse
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
