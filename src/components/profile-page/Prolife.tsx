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
    <div className="w-full md:w-[70%] md:px-auto lg:w-full lg:mx-0">
      <h2 className="font-bold text-[24px] ps-[12px] sm:ps-[0px] lg:text-[32px]">Profile</h2>
      <div className="flex flex-col lg:flex-row gap-[32px] mt-8 justify-center items-center lg:mt-10">
        <div className="flex flex-col items-center justify-center lg:mx-0 gap-4 w-fit">
          <GradientBorder className="rounded-full p-[3px] w-fit">
            <div className="bg-black rounded-full p-[6px]">
              <Image
                src={'/person3.jpg'}
                width={200}
                height={200}
                className="size-[216px] w-[140px] h-[140px] sm:w-[200px] sm:h-[200px] object-cover object-top rounded-full"
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
            <h2 className='text-[28px] font-bold text-center sm:text-start leading-[31.36px] mb-[33px]'>
            Sohail Hussain
            </h2>
            <div className='flex divide-x divide-[#292929] bg-[#0F0F0F] rounded-[6.89px] justify-center py-[13.77px] md:px-[76.89px] px-[82.5px] w-[100%] xl:w-[428px] border border-[#0FFF7752]'>
              <div className='flex flex-col items-center pe-[10px] sm:pe-[73px]'>
                <h2 className='font-normal text-[20px] mb-0'>60</h2>
                <p className='text-[#A6A6A6] text-[8px] font-normal mb-0'>ATTENDEES</p>
              </div>
              {/* <p className='h-[100px] border border:solid divide-x #292929'></p> */}
              <div className='flex flex-col items-center ps-[10px] sm:ps-[73px]'>
                <h2 className='font-normal text-[20px] mb-0'>324</h2>
                <p className='text-[#A6A6A6] text-[8px] font-normal mb-0'>Following</p>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
