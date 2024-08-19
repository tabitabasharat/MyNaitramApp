// components/LiveAccntSetting.js
"use client";
import { useState } from "react";
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
import upload from "../../assets/material-symbols_upload.svg"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Textarea } from "../ui/textarea";



const formSchema = z.object({
  facebook: z.string().min(2, { message: "Full name cannot be empty." }),
  linkedIn: z.string().min(2, { message: "Full name cannot be empty." }),
  insta: z.string().min(2, { message: "Full name cannot be empty." }),
  telegram: z
    .string()
    .min(1, { message: "Email cannot be empty." })
    .email({ message: "Invalid email address." }),
});

const Helpcenter = ({
  className,
  setPopupOpen,
}: {
  className?: string;
  setPopupOpen?: any;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      facebook: "Enter Subject",
      insta: "Vorem ipsum dolor sit amet consectetur",
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
  const [activeDiv, setActiveDiv] = useState(0);

  const handleClick = (index:any) => {
    setActiveDiv(index);
  };

  return (
    <div className="w-full md:w-[70%] md:mx-auto lg:w-full lg:mx-0">
      <h2 className="font-bold text-[24px] lg:text-[32px] mb-[24px] sm:mb-[53px] md:text-[16px] ps-[12px]">
        Help Center
      </h2>
      <div className="flex gap-[8px]">
      {['General', 'Account', 'Login'].map((text, index) => (
        <div
          key={index}
          className={`text-sm font-bold p-[12px] rounded-[44px] border w-[92px] text-center cursor-pointer ${
            activeDiv === index
              ? 'text-green-500 border-green-500 bg-[#1A1A1A]'
              : 'text-[#E6E6E6] border-[#FFFFFF0F] gradient-slate'
          }`}
          onClick={() => handleClick(index)}
        >
          {text}
        </div>
      ))}
    </div>
      <div className="flex flex-col lg:flex-col gap-6 md:gap-8 mt-[22px] lg:mt-10">
        <div className="w-full">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className=" w-full">
              <FormField
                control={form.control}
                name="facebook"
                render={({ field }) => (
                  <FormItem className="relative mb-[12px] md:mb-[20px]">
                    <FormLabel className="text-[12px] text-[#8F8F8F] font-bold absolute left-3 top-3">
                      SUBJECT
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter Subject"
                        className="pt-11 pb-5 text-[#D9D9D9] text-base placeholder:font-normal"
                        {...field}
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
                  <FormItem className="relative mb-[12px] md:mb-[20px]">
                    <FormLabel className="text-[12px] text-[#8F8F8F] font-bold absolute left-3 top-3">
                      DESCRIPTION
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Vorem ipsum dolor sit amet consectetur"
                        className="pt-[36px] pb-5 h-[136px] text-[#D9D9D9] text-base placeholder:font-normal"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                  {/* <UserGear size={20} weight="bold" /> */}
                  <p className="text-sm md:text-base font-bold mb-0">
                  Attachments
                  </p>
                </div>
                <Image src={upload} className="sm:w-[28px] sm:h-[28px] w-[16px] h-[16px]"/>
                {/* <CaretRight size={15} weight="bold" /> */}
              </Link>

              <div className="flex justify-start sm:w-[200px] mt-[50px]">
                <Button
                  type="submit"
                  disabled
                  className="w-full p-[12px] sm:w-[200px] text-sm md:text-base "
                >
                  Submit
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Helpcenter;
