'use client';

import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import {
  CaretLeft,
  Envelope,
  IdentificationCard,
  MapPin,
  Phone,
  User,
} from '@phosphor-icons/react/dist/ssr';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const formSchema = z.object({
  full_name: z.string().min(2, {
    message: 'Full name cannot be empty.',
  }),
  id_number: z.number().min(1, {
    message: 'ID Number cannot be empty.',
  }),
  email: z
    .string()
    .min(1, { message: 'Email cannot be empty.' })
    .email({ message: 'Invalid email address.' }),
  phone: z.number().min(1, {
    message: 'Phone Number cannot be empty.',
  }),
  address: z.string().min(1, {
    message: 'Address cannot be empty.',
  }),
});

const CompleteYourProfileModal = ({
  onNext,
  handleNext,
}: {
  onNext: () => void;
  handleNext: any;
}) => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: '',
      id_number: undefined,
      email: '',
      phone: undefined,
      address: '',
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    onNext();
    console.log(values);
  }
  return (
    <DialogContent className="sm:max-w-[550px]  lg:max-w-[650px]">
      <DialogHeader>
        <DialogTitle className="font-bold text-2xl">
          <div className="flex items-center gap-4 pb-4">
            <button
              onClick={() => handleNext('BuyTicket')}
              className="bg-white/10 p-2 w-fit rounded-full cursor-pointer"
            >
              <CaretLeft size={17} weight="bold" />
            </button>

            <p> Complete Your Profile</p>
          </div>
        </DialogTitle>
        <Separator className="scale--[1.12] bg-[#292929]" />
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="full_name"
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel className="text-[11px] text-[#8F8F8F] absolute left-3 top-3">
                  FULL NAME
                </FormLabel>
                <User
                  className="absolute right-3 translate-y-[0.9rem]"
                  size={20}
                />
                <FormControl>
                  <Input
                    placeholder="Enter fullname"
                    className="pt-10 pb-5 font-bold placeholder:font-normal"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="id_number"
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel className="text-[11px] text-[#8F8F8F] absolute left-3 top-3">
                  ID NUMBER
                </FormLabel>
                <IdentificationCard
                  className="absolute right-3 translate-y-[0.9rem]"
                  size={20}
                />
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Input your ID number"
                    className="pt-10 pb-5 font-bold placeholder:font-normal"
                    {...field}
                    onChange={(event) => field.onChange(+event.target.value)}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col md:flex-row gap-4 w-full">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="relative w-full">
                  <FormLabel className="text-[11px] text-[#8F8F8F] absolute left-3 top-5">
                    EMAIL
                  </FormLabel>
                  <Envelope
                    className="absolute right-3 translate-y-[1.2rem]"
                    size={20}
                  />
                  <FormControl>
                    <Input
                      placeholder="youremail@example.com"
                      className="pt-10 pb-5 font-bold placeholder:font-normal"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />{' '}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="relative w-full">
                  <FormLabel className="text-[11px] text-[#8F8F8F] absolute left-3 top-5">
                    PHONE NUMBER
                  </FormLabel>
                  <Phone
                    className="absolute right-3 translate-y-[1.2rem]"
                    size={20}
                  />
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="+00 000-000"
                      className="pt-10 pb-5 font-bold placeholder:font-normal"
                      {...field}
                      onChange={(event) => field.onChange(+event.target.value)}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="relative w-full">
                <FormLabel className="text-[11px] text-[#8F8F8F] absolute left-3 top-3">
                  ADDRESS
                </FormLabel>
                <MapPin
                  className="absolute right-3 translate-y-[0.9rem]"
                  size={20}
                />
                <FormControl>
                  <Input
                    placeholder="Input your address"
                    className="pt-10 pb-5 font-bold placeholder:font-normal"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <DialogFooter className="w-full mt-6 pt-4 bg-[#101010] border-t border-muted">
            <Button type="submit" className="w-fit px-8">
              Go to Payments
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
};

export default CompleteYourProfileModal;
