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

  confirm_password: z
    .string()
    .min(1, { message: "Confirm Password cannot be empty." }),
});

const ResetConfrimpass = ({
  setAuthMode,
}: {
  setAuthMode: Dispatch<SetStateAction<AuthMode>>;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
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
            Reset <span className="text-primary">Password</span>
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
        <div className="pt-6 pb-2 font-bold opacity-70">
          Enter your new password
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-4 mb-14 ">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="relative ">
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
            <FormField
              control={form.control}
              name="confirm_password"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel className="text-[13px] text-[#8F8F8F] absolute left-3 top-3 z-10">
                    CONFORM PASSWORD
                  </FormLabel>
                  <Lock
                    className="absolute right-3 translate-y-[0.9rem] z-10"
                    size={20}
                  />
                  <FormControl>
                    <PasswordInput
                      placeholder="Input password again"
                      className="pt-11 pb-5 font-bold placeholder:font-normal"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
          <DialogFooter className="w-full mt-6 pt-4 bg-[#101010] border-t border-muted">
            <Button type="submit" className="font-bold w-full">
              Submit
            </Button>
          </DialogFooter>
        </Form>
      </ScrollArea>
    </DialogContent>
  );
};

export default ResetConfrimpass;
