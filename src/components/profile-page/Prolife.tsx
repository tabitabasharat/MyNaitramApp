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
      <h2 className="font-extrabold text-[20px] ps-[12px] sm:ps-[0px] lg:text-[32px]">Profile</h2>
      <div className="flex flex-col lg:flex-row gap-[24px] md:gap-[32px] mt-[34px] justify-center items-center md:mt-[36px]">
        <div className="flex flex-col items-center justify-center lg:mx-0 md:gap-[16px] gap-[32px] w-fit">
          <GradientBorder className="rounded-full p-[3px] w-fit">
            <div className="bg-black rounded-full p-[6px]">
              <Image
                src={'/person3.jpg'}
                width={216}
                height={216}
                className=" w-[156px] h-[156px] sm:w-[216px] sm:h-[216px] object-cover object-top rounded-full"
                placeholder={`data:image/svg+xml;base64,${toBase64(
                  shimmer(1200, 1800),
                )}`}
                alt="DP"
              />
            </div>
          </GradientBorder>
          <Button variant="secondary" className="text-[#13FF7A] rounded-[200px] px-[10] py-[25px] md:p-[12px] bg-[#FFFFFF0F] text-base font-extrabold w-[100%] md:w-[250px]">
          Top User
          </Button>
        </div>
        <div className='w-full'>
            <h2 className='text-[28px] font-extrabold text-center sm:text-start leading-[31.36px] mb-[24px] md:mb-[33px]'>
            Sohail Hussain
            </h2>
            {/* <div className="border border-[#0FFF7730] rounded-lg gradient-slate flex justify-evenly items-center w-full  mt-5">
            <div className="flexc flex-col items-center justify-center py-[16px] font-bold text-center">
              <p className="text-[18px]">32</p>
              <p className="text-[12px] opacity-50">ATTENDED</p>
            </div>
            <div className="w-px h-8 bg-white/20"></div>
            <div className="flexc flex-col items-center py-[16px] justify-center font-bold text-center">
              <p className="text-[18px]">251</p>
              <p className="text-[12px] opacity-50">EVENTS</p>
            </div>
          </div> */}
            <div className='flex divide-x divide-[#292929] bg-[#0F0F0F] rounded-[6.89px] justify-center py-[13.77px] w-[100%] xl:w-[428px] border border-[#0FFF7752]'>
              <div className='flex flex-col items-center justify-center w-full'>
                <h2 className='font-normal md:text-[20px] text-[24px] mb-0'>60</h2>
                <p className='text-[#A6A6A6] md:text-[8px] text-[10px] mt-[8px] md:mt-[6.89px] font-normal mb-0'>ATTENDEES</p>
              </div>
              <div className='flex flex-col items-center justify-center w-full'>
                <h2 className='font-normal md:text-[20px] text-[24px] mb-0'>324</h2>
                <p className='text-[#A6A6A6] md:text-[8px] text-[10px] mt-[8px] md:mt-[6.89px] font-normal mb-0'>FOLLOWING</p>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
