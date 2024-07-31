"use client";

import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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

import ufo from "@/assets/ufo.png";
import metamask from "@/assets/metamask.svg";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Envelope, GoogleLogo, Lock } from "@phosphor-icons/react/dist/ssr";
import { Separator } from "@/components/ui/separator";

import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AuthMode } from "@/types/types";
import { Dispatch, SetStateAction } from "react";

import "./AccountVerificationModal.css";

const formSchema = z.object({
  textbox: z
    .string()
    .min(1, { message: "Input cannot be empty." })
    .max(1, { message: "Only one character or number is allowed." })
    .regex(/^[a-zA-Z0-9]$/, {
      message: "Invalid input. Only letters and numbers are allowed.",
    }),
  textbox1: z
    .string()
    .min(1, { message: "Input cannot be empty." })
    .regex(/^[a-zA-Z0-9]+$/, {
      message: "Invalid input. Only letters and numbers are allowed.",
    }),
  textbox2: z
    .string()
    .min(1, { message: "Input cannot be empty." })
    .regex(/^[a-zA-Z0-9]+$/, {
      message: "Invalid input. Only letters and numbers are allowed.",
    }),
  textbox3: z
    .string()
    .min(1, { message: "Input cannot be empty." })
    .regex(/^[a-zA-Z0-9]+$/, {
      message: "Invalid input. Only letters and numbers are allowed.",
    }),
});

const AccountVerificationModal = ({
  setAuthMode,
}: {
  setAuthMode: Dispatch<SetStateAction<AuthMode>>;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      textbox: "",
      textbox1: "",
      textbox2: "",
      textbox3: "",
    },
  });

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
            Account <span className="text-primary">Verification</span>
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

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="input-stlying">
              <FormField
                control={form.control}
                name="textbox"
                render={({ field }) => (
                  <FormItem className="relative">
                    {/* <FormLabel className="text-[13px] text-[#8F8F8F] absolute left-3 top-3">
                    EMAIL
                  </FormLabel> */}
                    {/* <Envelope
                    className="absolute right-3 translate-y-[0.9rem]"
                    size={20}
                  /> */}
                    <FormControl>
                      <Input
                        placeholder=""
                        className="accnt-verification-input font-bold placeholder:font-normal"
                        {...field}
                      />
                    </FormControl>
                    {/* <FormMessage /> */}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="textbox1"
                render={({ field }) => (
                  <FormItem className="relative">
                    {/* <FormLabel className="text-[13px] text-[#8F8F8F] absolute left-3 top-3">
                    EMAIL
                  </FormLabel> */}
                    {/* <Envelope
                    className="absolute right-3 translate-y-[0.9rem]"
                    size={20}
                  /> */}
                    <FormControl>
                      <Input
                        placeholder=""
                        className="accnt-verification-input font-bold placeholder:font-normal"
                        {...field}
                      />
                    </FormControl>
                    {/* <FormMessage /> */}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="textbox2"
                render={({ field }) => (
                  <FormItem className="relative">
                    {/* <FormLabel className="text-[13px] text-[#8F8F8F] absolute left-3 top-3">
                    EMAIL
                  </FormLabel> */}
                    {/* <Envelope
                    className="absolute right-3 translate-y-[0.9rem]"
                    size={20}
                  /> */}
                    <FormControl>
                      <Input
                        placeholder=""
                        className="accnt-verification-input font-bold placeholder:font-normal"
                        {...field}
                      />
                    </FormControl>
                    {/* <FormMessage /> */}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="textbox3"
                render={({ field }) => (
                  <FormItem className="relative">
                    {/* <FormLabel className="text-[13px] text-[#8F8F8F] absolute left-3 top-3">
                    EMAIL
                  </FormLabel> */}
                    {/* <Envelope
                    className="absolute right-3 translate-y-[0.9rem]"
                    size={20}
                  /> */}
                    <FormControl>
                      <Input
                        placeholder=""
                        className="accnt-verification-input font-bold placeholder:font-normal"
                        {...field}
                      />
                    </FormControl>
                    {/* <FormMessage /> */}
                  </FormItem>
                )}
              />
            </div>
            {/* <FormField
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
            /> */}
            <button className="opacity-70 font-bold hover:opacity-100 underline translate-y-[-0.4rem]">
              Didn't receive the code? Request again
            </button>
            <DialogFooter className="w-full mt-6 pt-4 bg-[#101010] border-t border-muted">
              <Button type="submit" className="font-bold w-full">
                Verify
              </Button>
            </DialogFooter>
            {/* <p className="font-bold text-center">
              Don't have an account?{" "}
              <span
                onClick={() => {
                  setAuthMode("SIGNUP");
                }}
                className="underline cursor-pointer hover:opacity-60 duration-300"
              >
                Sign up now
              </span>
            </p> */}
          </form>
        </Form>
      </ScrollArea>
    </DialogContent>
  );
};

export default AccountVerificationModal;
