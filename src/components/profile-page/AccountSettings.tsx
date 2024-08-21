"use client";

import Image from "next/image";
import GradientBorder from "../ui/gradient-border";
import { shimmer, toBase64 } from "@/lib/utils";
import { Button } from "../ui/button";
import { Envelope, Lock, User } from "@phosphor-icons/react/dist/ssr";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import ProfileSideInfo from "./ProfileSideInfo";

const formSchema = z.object({
  full_name: z.string().min(2, { message: "Full name cannot be empty." }),

  email: z
    .string()
    .min(1, { message: "Email cannot be empty." })
    .email({ message: "Invalid email address." }),

  password: z
    .string()
    .min(8, { message: "Password must contain at least 8 characters." })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter.",
    })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter.",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Password must contain at least one special character.",
    }),
});

const AccountSettings = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: "Sohail Hussain",
      email: "sohailhussain@gmail.com",
      password: "Sohail435%*$",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    console.log(values);
  }
  return (
    <ProfileSideInfo>
      <div className="w-full md:w-[70%] md:mx-auto lg:w-full lg:mx-0">
        <h2 className="font-extrabold text-[24px] lg:text-[32px] ps-[12px]">
          Account Settings
        </h2>
        <div className="flex flex-col lg:flex-row gap-8 mt-[34px] items-start lg:mt-[36px]">
          <div className="flex flex-col mx-auto lg:mx-0 gap-4 items-center justify-center w-fit">
            <GradientBorder className="rounded-full p-[3px] w-fit">
              <div className="bg-black rounded-full p-[6px]">
                <Image
                  src={"/person3.jpg"}
                  width={500}
                  height={500}
                  className="size-[216px] w-[140px] h-[140px] sm:w-[216px] sm:h-[216px] object-cover object-top rounded-full"
                  placeholder={`data:image/svg+xml;base64,${toBase64(
                    shimmer(1200, 1800)
                  )}`}
                  alt="DP"
                />
              </div>
            </GradientBorder>
            <Button
              variant="secondary"
              className=" font-extrabold w-[100%] md:py-[12px] py-[8px] px-[12px] text-base md:px-[25px]"
            >
              Change Photo Profile
            </Button>
          </div>
          <div className="w-full">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className=" w-full">
                <FormField
                  control={form.control}
                  name="full_name"
                  render={({ field }) => (
                    <FormItem className="relative mb-6">
                      <FormLabel className="text-[12px] text-[#8F8F8F] absolute left-3 top-3">
                        FULL NAME
                      </FormLabel>
                      <User
                        className="absolute right-3 translate-y-[0.9rem]"
                        size={20}
                      />
                      <FormControl>
                        <Input
                          placeholder="Enter Fullname"
                          className="pt-11 pb-5 font-bold text-base placeholder:font-normal"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="relative mb-6">
                      <FormLabel className="text-[12px] text-[#8F8F8F] absolute left-3 top-3">
                        EMAIL
                      </FormLabel>
                      <Envelope
                        className="absolute right-3 translate-y-[0.9rem]"
                        size={20}
                      />
                      <FormControl>
                        <Input
                          placeholder="youremail@example.com"
                          className="pt-11 pb-5 text-base font-bold placeholder:font-normal"
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
                    <FormItem className="relative mb-2">
                      <FormLabel className="text-[12px] text-[#8F8F8F] absolute left-3 top-3 z-10">
                        PASSWORD
                      </FormLabel>
                      <Lock
                        className="absolute right-3 translate-y-[0.9rem] z-10"
                        size={20}
                      />
                      <FormControl>
                        <PasswordInput
                          placeholder="Input password"
                          className="pt-11 pb-5 base font-bold placeholder:font-normal"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <button className="opacity-70 md:text-sm pt-2 text-[12px] font-extrabold hover:opacity-100 underline translate-y-[-0.4rem]">
                  Want to change your password?
                </button>
                <div className="flex justify-start lg:justify-end">
                  <Button
                    type="submit"
                    disabled
                    className="w-full md:mt-[32px] mt-[57px] md:px-[30.5px] md:py-[12px] font-extrabold text-base md:w-fit"
                  >
                    Update Changes
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </ProfileSideInfo>
  );
};

export default AccountSettings;
