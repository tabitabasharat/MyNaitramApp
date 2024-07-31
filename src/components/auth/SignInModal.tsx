'use client';

import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
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

import ufo from '@/assets/ufo.png';
import metamask from '@/assets/metamask.svg';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Envelope, GoogleLogo, Lock } from '@phosphor-icons/react/dist/ssr';
import { Separator } from '@/components/ui/separator';

import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/ui/password-input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AuthMode } from '@/types/types';
import { Dispatch, SetStateAction } from 'react';
import { signin } from '@/lib/middleware/signin';
import { useAppDispatch } from '@/lib/hooks';
import { useState,useEffect } from 'react';

const formSchema = z.object({
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

const SignInModal = ({
  setAuthMode,
}: {
  setAuthMode: Dispatch<SetStateAction<AuthMode>>;
}) => {
  const dispatch = useAppDispatch();
  const [loader,setLoader]=useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // async function login() {
  
  //   setLoader(true);
  //   try {
  //     const data = {
  //       email: email,
  //       password: password,
  //     };
  //     dispatch(signin(data)).then((res:any) => {
  //       if (res?.payload?.status === 200) {
  //         setLoader(false);
  //         console.log("login res", res?.payload?.data);
  //         localStorage.setItem("_id", res?.payload?.data?.id);
  //         localStorage.setItem("token", res?.payload?.token);
  //         localStorage.setItem("role", res?.payload?.data?.role);
  //         localStorage.setItem("name", res?.payload?.data?.fullname);


  //         SuccessToast("Signed In Successfully");
  //         navigate("/Dashboard");
  //         // localStorage.setItem("profileupdate", res?.payload?.data?.profileUpdate);

  //         if (res?.payload?.data?.profileUpdate) {
  //           navigate("/Dashboard");
  //         } else {
  //           navigate("/Profile");
  //         }
  //       } else {
  //         setLoader(false);
  //         ErrorToast(res?.payload?.message);
  //       }
  //     });
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // }


  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    console.log(values);
  }
  return (
    <DialogContent className="sm:max-w-md lg:max-w-[600px] pb-4 pt-0">
      <ScrollArea className="max-h-[90vh]">
        <DialogHeader className="relative overflow-hidden pt-4">
          <DialogTitle className="font-bold text-2xl">
            Sign <span className="text-primary">In</span>
          </DialogTitle>
          <Image
            src={ufo}
            width={100}
            height={100}
            className="absolute right-0 scale-[2]"
            alt="ufo"
          />
          <Separator className="scale-x-[1.09] bg-[#292929]" />
        </DialogHeader>

        <Button
          variant="secondary"
          className="w-full flex items-center gap-1 mt-5"
        >
          <GoogleLogo size={22} weight="fill" /> Sign in with Google
        </Button>
        {/* <Button variant="secondary" className="w-full items-center gap-1 mt-3">
          <Image src={metamask} width={22} height={22} alt="ufo" />
          Sign in with Metamask
        </Button> */}
        <div className="flex items-center justify-between gap-4 mt-5 mb-5">
          <Separator className="bg-[#292929] w-[45%]" />
          <p className="font-bold">OR</p>
          <Separator className="bg-[#292929] w-[45%]" />
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel className="text-[13px] text-[#8F8F8F] absolute left-3 top-3">
                    EMAIL
                  </FormLabel>
                  <Envelope
                    className="absolute right-3 translate-y-[0.9rem]"
                    size={20}
                  />
                  <FormControl>
                    <Input
                      placeholder="youremail@example.com"
                      className="pt-11 pb-5 font-bold placeholder:font-normal"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel className="text-[13px] text-[#8F8F8F] absolute left-3 top-3 z-10">
                    PASSWORD
                  </FormLabel>
                  <Lock
                    className="absolute right-3 translate-y-[0.9rem] z-10"
                    size={20}
                  />
                  <FormControl>
                    <PasswordInput
                      placeholder="Input password"
                      className="pt-11 pb-5 font-bold placeholder:font-normal"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <button className="opacity-70 font-bold hover:opacity-100 underline translate-y-[-0.4rem]">
              Forgot your password?
            </button>
            <DialogFooter className="w-full mt-6 pt-4 bg-[#101010] border-t border-muted">
              <Button type="submit" className="font-bold w-full">
                Log In
              </Button>
            </DialogFooter>
            <p className="font-bold text-center">
              Don't have an account?{' '}
              <span
                onClick={() => {
                  setAuthMode('SIGNUP');
                }}
                className="underline cursor-pointer hover:opacity-60 duration-300"
              >
                Sign up now
              </span>
            </p>
          </form>
        </Form>
      </ScrollArea>
    </DialogContent>
  );
};

export default SignInModal;
