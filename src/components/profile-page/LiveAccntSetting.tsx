// components/LiveAccntSetting.js
"use client";

import Image from "next/image";
import GradientBorder from "../ui/gradient-border";
import { shimmer, toBase64 } from "@/lib/utils";
import { Button } from "../ui/button";
import {
  TelegramLogo,
  LinkedinLogo,
  InstagramLogo,
  FacebookLogo,
  Chats,
  UserGear,
} from "@phosphor-icons/react";
import { Input } from "@/components/ui/input";
import AccountSidebarLink from "@/components/reusable-components/AccountSidebarLink";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { CaretRight } from "@phosphor-icons/react/dist/ssr";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState,useEffect } from "react";
import { useAppDispatch,useAppSelector } from "@/lib/hooks";

const formSchema = z.object({
  facebook: z.string().min(2, { message: "Full name cannot be empty." }),
  linkedIn: z.string().min(2, { message: "Full name cannot be empty." }),
  insta: z.string().min(2, { message: "Full name cannot be empty." }),
  telegram: z
    .string()
    .min(1, { message: "Email cannot be empty." })
    .email({ message: "Invalid email address." }),

  //   password: z
  //     .string()
  //     .min(8, { message: "Password must contain at least 8 characters." })
  //     .regex(/[a-z]/, {
  //       message: "Password must contain at least one lowercase letter.",
  //     })
  //     .regex(/[A-Z]/, {
  //       message: "Password must contain at least one uppercase letter.",
  //     })
  //     .regex(/[0-9]/, { message: "Password must contain at least one number." })
  //     .regex(/[^a-zA-Z0-9]/, {
  //       message: "Password must contain at least one special character.",
  //     }),
});

const LiveAccntSetting = ({
  className,
  setPopupOpen,
}: {
  className?: string;
  setPopupOpen?: any;
}) => {

  const dispatch = useAppDispatch();
  const [fbUrl,setFbUrl] = useState("");
  const [instaUrl,setinstaUrl] = useState("");
  const [linkedinUrl,setlinkedinUrl] = useState("");
  const [telegramUrl,settelegramUrl] = useState("");



  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      facebook: "Sohail Hussain",
      insta: "sohailhussain00",
      linkedIn: "sohailhussain",
      telegram: "sohailhussain@gmail.com",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    console.log(values);
  }
  const pathname = usePathname();
  return (
    <div className="w-full md:w-[70%] md:mx-auto lg:w-full lg:mx-0">
      <h2 className="font-bold text-[24px] lg:text-[32px] ps-[12px]">
        Live Activity Settings
      </h2>
      <div className="flex flex-col lg:flex-col gap-6 md:gap-8 mt-8 lg:mt-10">
        <Link
          href="/profile/privacy-policy"
          onClick={() => {
            if (setPopupOpen) {
              setPopupOpen(false);
            }
          }}
          className={cn(
            "gradient-slate border border-muted w-full flex justify-between rounded-lg items-center  px-4 md:px-3 py-2.5 md:py-5 hover:border-[#13FF7A] duration-300",
            {
              "border-[#13FF7A]": pathname.startsWith(
                "/profile/privacy-policy"
              ),
            }
          )}
        >
          <div className="flex gap-2 items-center">
            <UserGear size={20} weight="bold"/>
            <p className="text-sm md:text-base font-bold mb-0">
            Preview my Personal Social Profile
            </p>
          </div>
          <CaretRight size={15} weight="bold" />
        </Link>
        <div className="w-full">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className=" w-full">
              <FormField
                control={form.control}
                name="facebook"
                render={({ field }) => (
                  <FormItem className="relative mb-4 md:mb-6">
                    <FormLabel className="text-[13px] text-[#8F8F8F] absolute left-3 top-3">
                      FACEBOOK
                    </FormLabel>
                    <FacebookLogo
                      className="absolute right-3 translate-y-[0.9rem]"
                      size={20}
                    />
                    <FormControl>
                      <Input
                        placeholder="Enter Fullname"
                        className="pt-11 pb-5 font-bold placeholder:font-normal"
                        {...field}
                        onChange={(e) => {
                          setFbUrl(e.target.value);
                          field.onChange(e);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="insta"
                render={({ field }) => (
                  <FormItem className="relative mb-4 md:mb-6">
                    <FormLabel className="text-[13px] text-[#8F8F8F] absolute left-3 top-3">
                      INSTAGRAM
                    </FormLabel>
                    <InstagramLogo
                      className="absolute right-3 translate-y-[0.9rem]"
                      size={20}
                    />
                    <FormControl>
                      <Input
                        placeholder="Enter Fullname"
                        className="pt-11 pb-5 font-bold placeholder:font-normal"
                        {...field}
                        onChange={(e) => {
                          setinstaUrl(e.target.value);
                          field.onChange(e);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="linkedIn"
                render={({ field }) => (
                  <FormItem className="relative mb-4 md:mb-6">
                    <FormLabel className="text-[13px] text-[#8F8F8F] absolute left-3 top-3">
                      LINKEDIN
                    </FormLabel>
                    <LinkedinLogo
                      className="absolute right-3 translate-y-[0.9rem]"
                      size={20}
                    />
                    <FormControl>
                      <Input
                        placeholder="Enter Fullname"
                        className="pt-11 pb-5 font-bold placeholder:font-normal"
                        {...field}
                        onChange={(e) => {
                          setlinkedinUrl(e.target.value);
                          field.onChange(e);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="telegram"
                render={({ field }) => (
                  <FormItem className="relative mb-[44px] md:mb-8">
                    <FormLabel className="text-[13px] text-[#8F8F8F] absolute left-3 top-3">
                      TELEGRAM
                    </FormLabel>
                    <TelegramLogo
                      className="absolute right-3 translate-y-[0.9rem]"
                      size={20}
                    />
                    <FormControl>
                      <Input
                        placeholder="youremail@example.com"
                        className="pt-11 pb-5 font-bold placeholder:font-normal"
                        {...field}
                        onChange={(e) => {
                          settelegramUrl(e.target.value);
                          field.onChange(e);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-start lg:justify-start">
                <Button type="submit" disabled className="w-full text-sm md:text-base md:w-fit">
                  Update Changes
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LiveAccntSetting;
