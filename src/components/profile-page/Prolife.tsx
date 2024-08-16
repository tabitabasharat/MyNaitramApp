'use client';

import Image from 'next/image';
import GradientBorder from '../ui/gradient-border';
import { shimmer, toBase64 } from '@/lib/utils';
import { Button } from '../ui/button';
import { Envelope, Lock, User } from '@phosphor-icons/react/dist/ssr';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/ui/password-input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

const formSchema = z.object({
  full_name: z.string().min(2, { message: 'Full name cannot be empty.' }),

  email: z
    .string()
    .min(1, { message: 'Email cannot be empty.' })
    .email({ message: 'Invalid email address.' }),

  password: z
    .string()
    .min(8, { message: 'Password must contain at least 8 characters.' })
    .regex(/[a-z]/, {
      message: 'Password must contain at least one lowercase letter.',
    })
    .regex(/[A-Z]/, {
      message: 'Password must contain at least one uppercase letter.',
    })
    .regex(/[0-9]/, { message: 'Password must contain at least one number.' })
    .regex(/[^a-zA-Z0-9]/, {
      message: 'Password must contain at least one special character.',
    }),
});

const Profile = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: 'Sohail Hussain',
      email: 'sohailhussain@gmail.com',
      password: 'Sohail435%*$',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    console.log(values);
  }
  return (
    <div className="w-full md:w-[70%] md:mx-auto lg:w-full lg:mx-0">
      <h2 className="font-bold text-[24px] lg:text-[32px]">Profile</h2>
      <div className="flex flex-col lg:flex-row gap-8 mt-8  lg:mt-10">
        <div className="flex flex-col mx-auto lg:mx-0 gap-4 w-fit">
          <GradientBorder className="rounded-full p-[3px] w-fit">
            <div className="bg-black rounded-full p-[6px]">
              <Image
                src={'/person3.jpg'}
                width={500}
                height={500}
                className="size-[216px] object-cover object-top rounded-full"
                placeholder={`data:image/svg+xml;base64,${toBase64(
                  shimmer(1200, 1800),
                )}`}
                alt="DP"
              />
            </div>
          </GradientBorder>
          <Button variant="secondary" className="text-[#13FF7A] rounded-[200px] p-[12px] bg-[#FFFFFF0F] text-base font-bold w-[250px]">
          Top User
          </Button>
        </div>
        <div>
            <h2 className='tex-[28px] font-bold leading-[31.36px] mb-[33px]'>
            Sohail Hussain
            </h2>
        </div>
      </div>
    </div>
  );
};

export default Profile;
