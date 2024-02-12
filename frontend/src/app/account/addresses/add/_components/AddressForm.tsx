'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { createAddress, updateAddress } from '../../_actions';
import { upperFirst } from '@/helpers/string.helper';
import { useToast } from '@/components/ui/use-toast';
import { type Address } from 'qshop-sdk';

const formSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(2).max(50),
  country: z.any(),
  contactNumber: z.string().regex(/^\+?[0-9]\d{1,14}$/),
  number: z.string(),
  street: z.string().min(2).max(200),
  complement: z.string().min(2).max(200).optional(),
  city: z.string().min(2).max(50),
  zipcode: z.string().min(2).max(20),
  main: z.any(),
  shippingInstructions: z.string().min(2).max(200).optional(),
});

export type AddressFormProps = {
  address?: Address;
};

export default function AddressForm({ address }: AddressFormProps) {
  // 1. Define your form.
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    // resolver: zodResolver(formSchema),
    defaultValues: {
      id: address?.id,
      name: address?.name ?? '',
      country: address?.country ?? '',
      contactNumber: address?.contactNumber ?? '',
      number: address?.number ?? '',
      street: address?.street ?? '',
      complement: address?.complement ?? '',
      city: address?.city ?? '',
      zipcode: address?.zipcode ?? '',
      main: address?.main ?? false,
      shippingInstructions: address?.shippingInstructions ?? '',
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log('onSubmit', values);
    try {
      const result = address?.id ? await updateAddress(address.id, values) : await createAddress(values);
      console.log('submitted', { result });
      form.reset();
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: "Votre nouvelle adresse n'a pas pu être ajoutée.",
        description: 'Merci de réessayer plus tard.',
        duration: 10_000,
      });
    }
  }
  const isDisabled = form.formState.isSubmitting;
  return (
    <div className="py-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="id"
            render={({ field }) => (
              <FormItem hidden={true}>
                <FormControl>
                  <Input {...field} disabled={isDisabled} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pays/région</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isDisabled}>
                    <SelectTrigger className="rounded-md ">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[{ id: 1, name: 'france' }].map((cat) => (
                        <SelectItem key={cat.id} value={cat.name} className="truncate">
                          {upperFirst(cat.name)}
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
                  <Input {...field} disabled={isDisabled} />
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
                  <Input {...field} disabled={isDisabled} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-end gap-2">
            <div className="w-1/5">
              <FormField
                control={form.control}
                name="number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Adresse</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="ex: 1T 1Bis..." disabled={isDisabled} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-4/5">
              <FormField
                control={form.control}
                name="street"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} placeholder="rue Théophile Gautier" disabled={isDisabled} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <FormField
            control={form.control}
            name="complement"
            render={({ field }) => (
              <FormItem className="mt-1">
                <FormControl>
                  <Input
                    {...field}
                    disabled={isDisabled}
                    placeholder="Apt, suite, unité, nom de l'entreprise (facultatif)"
                  />
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
                      <Input {...field} disabled={isDisabled} />
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
                      <Input {...field} disabled={isDisabled} />
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
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} disabled={isDisabled} />
                </FormControl>
                <div className="space-y-0 leading-none" style={{ margin: 0 }}>
                  <FormLabel>Faire de cette adresse mon adresse par défaut</FormLabel>
                </div>
              </FormItem>
            )}
          />

          <Button variant="tertiary" type="submit" className="mt-8" disabled={form.formState.isSubmitting}>
            {address?.id ? "Mettre à jour l'adresse" : 'Ajouter une adresse'}
          </Button>
        </form>
      </Form>
    </div>
  );
}
